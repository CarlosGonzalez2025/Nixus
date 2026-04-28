'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { collection, onSnapshot, query, orderBy, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Hallazgo, HallazgoEstado } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    PlusCircle, Search, Loader2, FileX,
    AlertTriangle, Timer, Shield, Hash,
    Filter, Trash2, ArrowUp, ArrowDown, ArrowUpDown, Download,
} from 'lucide-react';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

// ─── Config visual ─────────────────────────────────────────────────────────────
const CLASE_CONFIG = {
    A: { label: 'Clase A', color: 'bg-red-100 text-red-800', dot: 'bg-red-500', icon: AlertTriangle },
    B: { label: 'Clase B', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500', icon: Timer },
    C: { label: 'Clase C', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', icon: Shield },
};

const ESTADO_CONFIG: Record<HallazgoEstado, { label: string; color: string }> = {
    Pendiente:    { label: 'Pendiente',    color: 'bg-yellow-100 text-yellow-800' },
    'En Progreso':{ label: 'En Progreso',  color: 'bg-purple-100 text-purple-800' },
    Completado:   { label: 'Completado',   color: 'bg-green-100 text-green-800'  },
    Cerrado:      { label: 'Cerrado',      color: 'bg-blue-100 text-blue-800'    },
};

const INTERVENCION_COLOR: Record<string, string> = {
    Inmediata: 'bg-red-100 text-red-800',
    Pronta:    'bg-amber-100 text-amber-800',
    Posterior: 'bg-blue-100 text-blue-800',
};

const parseDate = (v: any): Date | null => {
    if (!v) return null;
    if (typeof v.toDate === 'function') return v.toDate();
    if (v instanceof Date) return v;
    return null;
};

type TabEstado = 'Pendiente' | 'En Progreso' | 'Completado' | 'Cerrado' | 'todos';
type SortDir = 'asc' | 'desc';

const tabEstados: { key: TabEstado; label: string }[] = [
    { key: 'Pendiente',    label: 'Pendientes'   },
    { key: 'En Progreso',  label: 'En Progreso'  },
    { key: 'Completado',   label: 'Completados'  },
    { key: 'Cerrado',      label: 'Cerrados'     },
    { key: 'todos',        label: 'Todos'        },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HallazgosPage() {
    const { user } = useUser();
    const { toast } = useToast();
    const router = useRouter();

    const [hallazgos, setHallazgos] = useState<Hallazgo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterClase, setFilterClase] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<TabEstado>('Pendiente');

    // DataTable state
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    // Reset page on filter/tab change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filterClase, search]);

    // ── Firestore ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!db || !user) return;

        const constraints: any[] = [orderBy('createdAt', 'desc')];
        if (user.role !== 'admin') {
            if (user.role === 'asesor_arl') {
                constraints.unshift(where('createdBy', '==', user.uid));
            } else if (user.role === 'lider_sst' && user.planta) {
                constraints.unshift(where('planta', '==', user.planta));
            } else if (user.empresa) {
                constraints.unshift(where('empresaId', '==', user.empresa));
            }
        }

        const unsub = onSnapshot(
            query(collection(db, 'hallazgos'), ...constraints),
            (snap) => {
                setHallazgos(snap.docs.map(d => ({ id: d.id, ...d.data() } as Hallazgo)));
                setLoading(false);
            },
            (err) => {
                console.error(err);
                toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar los hallazgos.' });
                setLoading(false);
            }
        );

        return () => unsub();
    }, [user, toast]);

    // ── Filter ────────────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return hallazgos.filter(h => {
            const estado = h.cumplimientoEstado || 'Pendiente';
            const matchTab = activeTab === 'todos' || estado === activeTab;
            const matchClase = filterClase === 'all' || h.clase === filterClase;

            let matchEmpresaPlanta = true;
            if (user?.role === 'asesor_arl') {
                matchEmpresaPlanta = h.createdBy === user.uid;
            } else if (user?.role === 'lider_sst') {
                const matchEmpresa = !user.empresa || !h.empresaId || h.empresaId === user.empresa;
                const matchPlanta  = !user.planta  || h.planta === user.planta;
                matchEmpresaPlanta = matchEmpresa && matchPlanta;
            } else if (user?.role === 'autorizante') {
                const matchEmpresa = !user.empresa || !h.empresaId || h.empresaId === user.empresa;
                const matchPlanta  = !user.planta  || !h.planta   || h.planta === user.planta;
                matchEmpresaPlanta = matchEmpresa && matchPlanta;
            }

            const s = search.toLowerCase();
            const matchSearch = !s ||
                h.hallazgo?.toLowerCase().includes(s) ||
                h.empresa?.toLowerCase().includes(s) ||
                h.planta?.toLowerCase().includes(s) ||
                h.frenteTrabajo?.toLowerCase().includes(s) ||
                h.area?.toLowerCase().includes(s) ||
                h.reportadoPorNombre?.toLowerCase().includes(s) ||
                String(h.numero).includes(s);

            return matchTab && matchClase && matchEmpresaPlanta && matchSearch;
        });
    }, [hallazgos, activeTab, filterClase, search, user]);

    // ── Sort ──────────────────────────────────────────────────────────────────
    const sorted = useMemo(() => {
        if (!sortColumn) return filtered;
        return [...filtered].sort((a, b) => {
            let result = 0;
            switch (sortColumn) {
                case 'numero':
                    result = (a.numero ?? 0) - (b.numero ?? 0);
                    break;
                case 'hallazgo':
                    result = (a.hallazgo || '').localeCompare(b.hallazgo || '');
                    break;
                case 'clase':
                    result = (a.clase || '').localeCompare(b.clase || '');
                    break;
                case 'empresa':
                    result = (a.empresa || a.frenteTrabajo || '').localeCompare(b.empresa || b.frenteTrabajo || '');
                    break;
                case 'reportador':
                    result = (a.reportadoPorNombre || '').localeCompare(b.reportadoPorNombre || '');
                    break;
                case 'fecha': {
                    const fa = parseDate(a.fechaVisita || a.fechaIdentificacion)?.getTime() || 0;
                    const fb = parseDate(b.fechaVisita || b.fechaIdentificacion)?.getTime() || 0;
                    result = fa - fb;
                    break;
                }
                case 'cumplimiento':
                    result = (a.porcentajeCumplimientoTotal ?? a.porcentajeCumplimiento ?? 0) -
                             (b.porcentajeCumplimientoTotal ?? b.porcentajeCumplimiento ?? 0);
                    break;
            }
            return sortDir === 'asc' ? result : -result;
        });
    }, [filtered, sortColumn, sortDir]);

    const totalPages = Math.ceil(sorted.length / pageSize);
    const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            if (sortDir === 'asc') setSortDir('desc');
            else { setSortColumn(null); setSortDir('asc'); }
        } else {
            setSortColumn(column);
            setSortDir('asc');
        }
        setCurrentPage(1);
    };

    const SortIcon = ({ col }: { col: string }) => {
        if (sortColumn !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
        return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que deseas eliminar este registro de hallazgo? Esta acción no se puede deshacer.')) {
            try {
                await deleteDoc(doc(db, 'hallazgos', id));
                toast({ title: 'Éxito', description: 'Registro eliminado correctamente.' });
            } catch (err) {
                console.error(err);
                toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar el registro.' });
            }
        }
    };

    // ── Excel export ──────────────────────────────────────────────────────────
    const handleExportExcel = () => {
        if (sorted.length === 0) {
            toast({ variant: 'destructive', title: 'Sin datos', description: 'No hay hallazgos para exportar.' });
            return;
        }

        const rows = sorted.map(h => {
            const fecha = parseDate(h.fechaVisita || h.fechaIdentificacion);
            const fechaCierre = parseDate(h.fechaCierre);
            const fechaMedida = parseDate(h.fechaMedidaImplementada);
            const fechaSeguimiento = parseDate(h.fechaSeguimiento1);

            return {
                'ID Sistema': h.id,
                'Número': h.numero,
                'Hallazgo': h.hallazgo || 'N/A',
                'Descripción': h.descripcion || 'N/A',
                'Acción Inmediata': h.accionInmediata || 'N/A',
                'Clase': `Clase ${h.clase}`,
                'Intervención': h.intervencion || 'N/A',
                'Estado': h.cumplimientoEstado || 'Pendiente',
                '% Cumplimiento': h.porcentajeCumplimientoTotal ?? h.porcentajeCumplimiento ?? 0,
                
                // Ubicación
                'Empresa': h.empresa || h.frenteTrabajo || 'N/A',
                'Planta': h.planta || 'N/A',
                'Área': h.area || 'N/A',
                'Frente de Trabajo': h.frenteTrabajo || 'N/A',
                'Tipo de Actividad': h.tipoActividad || 'N/A',
                'Peligro Inspeccionado': h.peligroInspeccionado || 'N/A',
                'Geolocalización (Lat)': h.geolocalizacion?.lat || 'N/A',
                'Geolocalización (Lng)': h.geolocalizacion?.lng || 'N/A',

                // Personas
                'Reportado Por': h.reportadoPorNombre || 'N/A',
                'Cargo Reportador': h.reportadoPorCargo || 'N/A',
                'Responsable Plan de Acción': h.responsable || 'N/A',
                
                // Fechas
                'Fecha Visita/Identificación': fecha ? format(fecha, 'dd/MM/yyyy HH:mm:ss', { locale: es }) : 'N/A',
                'Fecha Medida Implementada': fechaMedida ? format(fechaMedida, 'dd/MM/yyyy', { locale: es }) : 'N/A',
                'Fecha Seguimiento': fechaSeguimiento ? format(fechaSeguimiento, 'dd/MM/yyyy', { locale: es }) : 'N/A',
                'Fecha Cierre': fechaCierre ? format(fechaCierre, 'dd/MM/yyyy', { locale: es }) : 'N/A',
                'Última Actualización': h.updatedAt ? format(parseDate(h.updatedAt) || new Date(), 'dd/MM/yyyy HH:mm:ss', { locale: es }) : 'N/A',

                'Observación': h.observacion || 'N/A',
                
                // Evidencias
                'Evidencias Antes (URLs)': (h.evidenciasFotograficas || []).join('\n') || 'N/A',
                'Evidencias Después/Cierre (URLs)': (h.evidenciasPlanAccion || []).join('\n') || 'N/A',
                
                // Firmas URLs (si existen)
                'Firma Reportador URL': h.firmaReportador || 'N/A',
                'Firma Responsable URL': h.firmaResponsable || 'N/A',
            };
        });

        const ws = XLSX.utils.json_to_sheet(rows);
        const colWidths = Object.keys(rows[0] ?? {}).map(key => ({
            wch: Math.max(key.length, ...rows.map(r => String((r as any)[key] ?? '').length)) + 2,
        }));
        ws['!cols'] = colWidths;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Hallazgos');
        XLSX.writeFile(wb, `hallazgos_${new Date().toISOString().split('T')[0]}.xlsx`);

        toast({ title: '✅ Exportación exitosa', description: `${sorted.length} hallazgos exportados.` });
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const countByTab = (tab: TabEstado) => {
        if (tab === 'todos') return hallazgos.length;
        return hallazgos.filter(h => (h.cumplimientoEstado || 'Pendiente') === tab).length;
    };

    const canCreate = user?.role === 'solicitante' || user?.role === 'lider_sst' ||
                      user?.role === 'admin' || user?.role === 'asesor_arl';

    // ── Render list ───────────────────────────────────────────────────────────
    const renderList = (items: Hallazgo[]) => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-60">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            );
        }

        if (items.length === 0 && filtered.length === 0) {
            return (
                <div className="h-60 text-center flex flex-col justify-center items-center">
                    <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">No se encontraron hallazgos</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {search
                            ? `No hay resultados para "${search}" en esta categoría.`
                            : 'No hay hallazgos con el estado seleccionado.'}
                    </p>
                    {canCreate && !search && (
                        <Button variant="outline" size="sm" className="mt-4"
                            onClick={() => router.push('/hallazgos/crear')}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Registrar primer hallazgo
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <>
                {/* ── Móvil: tarjetas ── */}
                <div className="md:hidden space-y-3">
                    {items.map(h => {
                        const claseCfg = CLASE_CONFIG[h.clase] || CLASE_CONFIG.C;
                        const estado = (h.cumplimientoEstado || 'Pendiente') as HallazgoEstado;
                        const estadoCfg = ESTADO_CONFIG[estado];
                        const fecha = parseDate(h.fechaVisita || h.fechaIdentificacion);
                        const pct = h.porcentajeCumplimientoTotal ?? h.porcentajeCumplimiento;

                        return (
                            <Card key={h.id}
                                className="hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => router.push(`/hallazgos/${h.id}`)}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <Hash className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                            <span className="font-semibold text-primary text-sm">{h.numero}</span>
                                            <Badge className={cn('text-xs ml-1', claseCfg.color)}>
                                                {claseCfg.label}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={cn('text-xs flex-shrink-0', estadoCfg.color)}>
                                                {estadoCfg.label}
                                            </Badge>
                                            {user?.role === 'admin' && (
                                                <Button variant="ghost" size="icon"
                                                    className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                    onClick={(e) => handleDelete(h.id, e)}>
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm font-medium line-clamp-2 mb-2">{h.hallazgo}</p>

                                    <div className="flex flex-wrap gap-1 mb-2">
                                        <Badge className={cn('text-xs', INTERVENCION_COLOR[h.intervencion] || '')}>
                                            {h.intervencion}
                                        </Badge>
                                    </div>

                                    {pct !== undefined && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                                <div className="h-full rounded-full"
                                                    style={{
                                                        width: `${Math.min(pct, 100)}%`,
                                                        background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#f59e0b',
                                                    }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                                        <span className="truncate max-w-[55%]">
                                            {h.empresa || h.frenteTrabajo} · {h.area}
                                        </span>
                                        <span>{fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : '—'}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* ── Desktop: tabla ── */}
                <div className="rounded-md border hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    className="w-14 cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('numero')}
                                >
                                    <div className="flex items-center gap-1"># <SortIcon col="numero" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('hallazgo')}
                                >
                                    <div className="flex items-center gap-1">Hallazgo <SortIcon col="hallazgo" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('clase')}
                                >
                                    <div className="flex items-center gap-1">Clase / Intervención <SortIcon col="clase" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('empresa')}
                                >
                                    <div className="flex items-center gap-1">Empresa / Área <SortIcon col="empresa" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('reportador')}
                                >
                                    <div className="flex items-center gap-1">Reportado por <SortIcon col="reportador" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('fecha')}
                                >
                                    <div className="flex items-center gap-1">Fecha <SortIcon col="fecha" /></div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-muted/50"
                                    onClick={() => handleSort('cumplimiento')}
                                >
                                    <div className="flex items-center gap-1">Cumplimiento <SortIcon col="cumplimiento" /></div>
                                </TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map(h => {
                                const claseCfg = CLASE_CONFIG[h.clase] || CLASE_CONFIG.C;
                                const estado = (h.cumplimientoEstado || 'Pendiente') as HallazgoEstado;
                                const estadoCfg = ESTADO_CONFIG[estado];
                                const fecha = parseDate(h.fechaVisita || h.fechaIdentificacion);
                                const pct = h.porcentajeCumplimientoTotal ?? h.porcentajeCumplimiento;

                                return (
                                    <TableRow key={h.id} className="hover:bg-muted/50">
                                        <TableCell className="font-medium text-primary">{h.numero}</TableCell>
                                        <TableCell>
                                            <p className="font-medium max-w-[260px] truncate">{h.hallazgo}</p>
                                            <Badge className={cn('text-xs mt-1', estadoCfg.color)}>
                                                {estadoCfg.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge className={cn('text-xs w-fit', claseCfg.color)}>
                                                    {claseCfg.label}
                                                </Badge>
                                                <Badge className={cn('text-xs w-fit', INTERVENCION_COLOR[h.intervencion] || '')}>
                                                    {h.intervencion}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-sm font-medium">{h.empresa || h.frenteTrabajo}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {h.planta ? `${h.planta} · ` : ''}{h.area}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-sm">{h.reportadoPorNombre}</TableCell>
                                        <TableCell className="text-sm">
                                            {fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : '—'}
                                        </TableCell>
                                        <TableCell>
                                            {pct !== undefined ? (
                                                <div className="flex items-center gap-2 min-w-[80px]">
                                                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                                        <div className="h-full rounded-full"
                                                            style={{
                                                                width: `${Math.min(pct, 100)}%`,
                                                                background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#f59e0b',
                                                            }} />
                                                    </div>
                                                    <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm"
                                                    onClick={() => router.push(`/hallazgos/${h.id}`)}>
                                                    Detalles
                                                </Button>
                                                {user?.role === 'admin' && (
                                                    <Button variant="outline" size="sm"
                                                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700 w-9 p-0"
                                                        onClick={(e) => handleDelete(h.id, e)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </>
        );
    };

    // ── JSX ───────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Gestión de Hallazgos</h1>
                    <p className="text-muted-foreground text-sm">Registro y seguimiento de hallazgos de seguridad.</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={handleExportExcel}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                    </Button>
                    {canCreate && (
                        <Button onClick={() => router.push('/hallazgos/crear')} size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nuevo Hallazgo
                        </Button>
                    )}
                </div>
            </div>

            {/* Card principal con tabs y filtros */}
            <Card className="min-w-0 overflow-hidden shadow-sm border-gray-200">
                <CardContent className="p-0 sm:p-0">
                    <Tabs value={activeTab} onValueChange={v => setActiveTab(v as TabEstado)}>
                        <div className="flex flex-col border-b">
                            {/* Tabs de estado */}
                            <div className="px-4 pt-4 overflow-x-auto">
                                <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6 border-b rounded-none">
                                    {tabEstados.map(t => (
                                        <TabsTrigger key={t.key} value={t.key}
                                            className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-1 pb-2 text-xs sm:text-sm">
                                            {t.label}
                                            {countByTab(t.key) > 0 && (
                                                <span className="ml-1.5 text-[10px] font-bold bg-muted rounded-full px-1.5 py-0.5 tabular-nums">
                                                    {countByTab(t.key)}
                                                </span>
                                            )}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {/* Filtros */}
                            <div className="p-4 flex flex-col md:flex-row gap-4 bg-muted/20">
                                <div className="relative flex-1 min-w-0">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar por número, hallazgo, empresa, área..."
                                        className="w-full pl-9 h-10 bg-background text-sm"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Select value={filterClase} onValueChange={setFilterClase}>
                                        <SelectTrigger className="w-full md:w-[180px] h-10 bg-background text-sm">
                                            <div className="flex items-center gap-2">
                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                <SelectValue placeholder="Clase" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas las clases</SelectItem>
                                            <SelectItem value="A">Clase A — Inmediata</SelectItem>
                                            <SelectItem value="B">Clase B — Pronta</SelectItem>
                                            <SelectItem value="C">Clase C — Posterior</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {tabEstados.map(t => (
                            <TabsContent key={t.key} value={t.key} className="mt-0 outline-none">
                                <div className="min-h-[400px]">
                                    {renderList(paginated)}
                                </div>
                                {!loading && filtered.length > 0 && (
                                    <div className="p-4 border-t">
                                        <DataTablePagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            pageSize={pageSize}
                                            totalRows={filtered.length}
                                            onPageChange={setCurrentPage}
                                            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
                                        />
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
