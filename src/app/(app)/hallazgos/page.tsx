'use client';

import { useState, useEffect, useMemo } from 'react';
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
    PlusCircle, Search, Loader2, FileX, ChevronRight,
    AlertTriangle, Timer, Shield, Hash, Clock,
    TrendingUp, CheckCircle2, XCircle, Filter, Trash2,
} from 'lucide-react';

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

    useEffect(() => {
        if (!db || !user) return;

        const constraints: any[] = [orderBy('createdAt', 'desc')];
        if (user.empresa && user.role !== 'admin') {
            constraints.unshift(where('empresaId', '==', user.empresa));
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

    const filtered = useMemo(() => {
        return hallazgos.filter(h => {
            const estado = h.cumplimientoEstado || 'Pendiente';
            const matchTab = activeTab === 'todos' || estado === activeTab;
            const matchClase = filterClase === 'all' || h.clase === filterClase;
            const s = search.toLowerCase();
            const matchSearch = !s ||
                h.hallazgo?.toLowerCase().includes(s) ||
                h.empresa?.toLowerCase().includes(s) ||
                h.planta?.toLowerCase().includes(s) ||
                h.frenteTrabajo?.toLowerCase().includes(s) ||
                h.area?.toLowerCase().includes(s) ||
                h.reportadoPorNombre?.toLowerCase().includes(s) ||
                String(h.numero).includes(s);
            return matchTab && matchClase && matchSearch;
        });
    }, [hallazgos, activeTab, filterClase, search]);

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

    const countByTab = (tab: TabEstado) => {
        if (tab === 'todos') return hallazgos.length;
        return hallazgos.filter(h => (h.cumplimientoEstado || 'Pendiente') === tab).length;
    };

    const canCreate = user?.role === 'solicitante' || user?.role === 'lider_sst' || user?.role === 'admin';

    const renderList = (items: Hallazgo[]) => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-60">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            );
        }

        if (items.length === 0) {
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
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={(e) => handleDelete(h.id, e)}>
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
                                        <span className="truncate max-w-[55%]">{h.empresa || h.frenteTrabajo} · {h.area}</span>
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
                                <TableHead className="w-14">#</TableHead>
                                <TableHead>Hallazgo</TableHead>
                                <TableHead>Clase / Intervención</TableHead>
                                <TableHead>Empresa / Área</TableHead>
                                <TableHead>Reportado por</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cumplimiento</TableHead>
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
                                            <p className="text-xs text-muted-foreground">{h.planta ? `${h.planta} · ` : ''}{h.area}</p>
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

    return (
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Gestión de Hallazgos</h1>
                    <p className="text-muted-foreground text-sm">Registro y seguimiento de hallazgos de seguridad.</p>
                </div>
                {canCreate && (
                    <Button onClick={() => router.push('/hallazgos/crear')} size="sm" className="sm:h-9">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span className="hidden xs:inline">Nuevo</span> Hallazgo
                    </Button>
                )}
            </div>

            {/* Card principal con tabs y filtros */}
            <Card className="min-w-0 overflow-hidden">
                <CardContent className="p-3 sm:p-4">
                    <Tabs value={activeTab} onValueChange={v => setActiveTab(v as TabEstado)}>
                        <div className="flex flex-col gap-3">

                            {/* Tabs de estado — scroll horizontal en móvil */}
                            <div className="overflow-x-auto -mx-1 px-1">
                                <TabsList className="inline-flex w-max min-w-full sm:w-auto">
                                    {tabEstados.map(t => (
                                        <TabsTrigger key={t.key} value={t.key} className="whitespace-nowrap text-xs sm:text-sm">
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
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1 min-w-0">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar por número, hallazgo, empresa, área..."
                                        className="w-full rounded-lg bg-background pl-8 text-sm"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                                <Select value={filterClase} onValueChange={setFilterClase}>
                                    <SelectTrigger className="w-full sm:w-[160px] text-sm">
                                        <Filter className="mr-2 h-3.5 w-3.5" />
                                        <SelectValue placeholder="Clase" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas las clases</SelectItem>
                                        <SelectItem value="A">Clase A — Inmediata</SelectItem>
                                        <SelectItem value="B">Clase B — Pronta</SelectItem>
                                        <SelectItem value="C">Clase C — Posterior</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Contador */}
                            <p className="text-xs text-muted-foreground">
                                Mostrando {filtered.length} de {countByTab(activeTab)} hallazgos
                            </p>
                        </div>

                        {tabEstados.map(t => (
                            <TabsContent key={t.key} value={t.key} className="mt-3">
                                {renderList(filtered)}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
