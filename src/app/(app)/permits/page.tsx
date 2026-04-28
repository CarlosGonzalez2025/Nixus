
'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  PlusCircle, Search, Loader2, FileX, Filter, Edit,
  ArrowUp, ArrowDown, ArrowUpDown, Download,
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  collection, onSnapshot, query, orderBy, where,
  QueryConstraint, Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/hooks/use-user';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    borrador: 'bg-gray-100 text-gray-800',
    pendiente_revision: 'bg-yellow-100 text-yellow-800',
    aprobado: 'bg-green-100 text-green-800',
    en_ejecucion: 'bg-purple-100 text-purple-800',
    suspendido: 'bg-orange-100 text-orange-800',
    cerrado: 'bg-blue-100 text-blue-800',
    rechazado: 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: string) => {
  const statusText: { [key: string]: string } = {
    borrador: 'Borrador',
    pendiente_revision: 'Pendiente de Revisión',
    aprobado: 'Aprobado',
    en_ejecucion: 'En Ejecución',
    suspendido: 'Suspendido',
    cerrado: 'Cerrado',
    rechazado: 'Rechazado',
  };
  return statusText[status] || status;
};

const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (typeof dateValue.toDate === 'function') return dateValue.toDate();
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') return new Date(dateValue);
  return null;
};

const getWorkTypeLabels = (permit: Permit): string[] => {
  const types = permit.selectedWorkTypes || {};
  const labels: string[] = [];
  if (types.alturas) labels.push('Alturas');
  if (types.confinado) labels.push('Confinados');
  if (types.energia) labels.push('Energías');
  if (types.izaje) labels.push('Izaje');
  if (types.excavacion) labels.push('Excavaciones');
  if (types.general) labels.push('General');
  return labels;
};

const getWorkTypeBadges = (permit: Permit): JSX.Element[] => {
  const config: { key: keyof typeof permit.selectedWorkTypes; label: string; cls: string }[] = [
    { key: 'alturas', label: 'Alturas', cls: 'bg-blue-100 text-blue-800' },
    { key: 'confinado', label: 'Confinados', cls: 'bg-purple-100 text-purple-800' },
    { key: 'energia', label: 'Energías', cls: 'bg-yellow-100 text-yellow-800' },
    { key: 'izaje', label: 'Izaje', cls: 'bg-green-100 text-green-800' },
    { key: 'excavacion', label: 'Excavaciones', cls: 'bg-orange-100 text-orange-800' },
    { key: 'general', label: 'General', cls: 'bg-gray-100 text-gray-800' },
  ];
  const types = permit.selectedWorkTypes || {};
  return config
    .filter(c => types[c.key])
    .map(c => (
      <Badge key={c.key} className={`${c.cls} text-xs`}>
        {c.label}
      </Badge>
    ));
};

// ─── Types ──────────────────────────────────────────────────────────────────

type UnifiedPermitStatus =
  | 'borrador'
  | 'pendiente_revision'
  | 'activos'
  | 'cerrado'
  | 'rechazado'
  | 'suspendido';

const permitStatuses: { key: UnifiedPermitStatus; label: string }[] = [
  { key: 'borrador', label: 'Borrador' },
  { key: 'pendiente_revision', label: 'Pendiente' },
  { key: 'activos', label: 'Activos' },
  { key: 'cerrado', label: 'Cerrado' },
  { key: 'rechazado', label: 'Rechazado' },
  { key: 'suspendido', label: 'Suspendido' },
];

type SortDir = 'asc' | 'desc';

// ─── Component ──────────────────────────────────────────────────────────────

export default function PermitsPage() {
  const { user, loading: userLoading } = useUser();
  const [allPermits, setAllPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<UnifiedPermitStatus>('pendiente_revision');
  const [workTypeFilter, setWorkTypeFilter] = useState<string>('all');
  const { toast } = useToast();

  // DataTable state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // ── Reset page on filter change ──────────────────────────────────────────
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, workTypeFilter, searchTerm]);

  // ── Firestore subscription ───────────────────────────────────────────────
  useEffect(() => {
    if (userLoading) { setLoading(true); return; }
    if (!user) { setAllPermits([]); setLoading(false); return; }

    const permitsCollection = collection(db, 'permits');
    let unsubscribers: Unsubscribe[] = [];

    if (user.role === 'lider_sst') {
      const sstConstraints: QueryConstraint[] = user.planta
        ? [where('generalInfo.planta', '==', user.planta), orderBy('createdAt', 'desc')]
        : [orderBy('createdAt', 'desc')];

      const unsub = onSnapshot(query(permitsCollection, ...sstConstraints), (snapshot) => {
        let data = snapshot.docs.map(doc => {
          const d = doc.data();
          return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
        });
        if (user.empresa) {
          data = data.filter(p => !p.generalInfo?.empresa || p.generalInfo.empresa === user.empresa);
        }
        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      });
      unsubscribers.push(unsub);

    } else if (user.role === 'mantenimiento') {
      const unsub = onSnapshot(
        query(permitsCollection, where('controlEnergia', '==', true)),
        (snapshot) => {
          const data = snapshot.docs
            .map(doc => {
              const d = doc.data();
              return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
            })
            .filter(p =>
              p.status === 'pendiente_revision' &&
              p.approvals?.mantenimiento?.status === 'pendiente' &&
              p.approvals?.solicitante?.status === 'aprobado' &&
              (!user.planta || p.generalInfo?.planta === user.planta),
            )
            .sort((a, b) =>
              (parseFirestoreDate(b.createdAt)?.getTime() || 0) -
              (parseFirestoreDate(a.createdAt)?.getTime() || 0),
            );
          setAllPermits(data);
          setLoading(false);
        },
        () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
          setLoading(false);
        },
      );
      unsubscribers.push(unsub);

    } else {
      const finalQuery: QueryConstraint[] = [];
      if (user.role === 'solicitante') {
        finalQuery.push(where('createdBy', '==', user.uid));
      } else {
        finalQuery.push(orderBy('createdAt', 'desc'));
      }

      const unsub = onSnapshot(query(permitsCollection, ...finalQuery), (snapshot) => {
        let data = snapshot.docs.map(doc => {
          const d = doc.data();
          return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
        });

        if (user.role === 'solicitante') {
          data = data.sort(
            (a, b) =>
              (parseFirestoreDate(b.createdAt)?.getTime() || 0) -
              (parseFirestoreDate(a.createdAt)?.getTime() || 0),
          );
        }

        if (user.role === 'autorizante') {
          data = data.filter(p => {
            const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || p.generalInfo.empresa === user.empresa;
            const matchPlanta = !user.planta || !p.generalInfo?.planta || p.generalInfo.planta === user.planta;
            return matchEmpresa && matchPlanta;
          });
        }

        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        toast({ variant: 'destructive', title: 'Error al cargar permisos', description: 'No se pudieron obtener los datos.' });
        setLoading(false);
      });
      unsubscribers.push(unsub);
    }

    return () => unsubscribers.forEach(u => u());
  }, [user, userLoading, toast]);

  // ── Filtered data ────────────────────────────────────────────────────────
  const filteredPermits = useMemo(() => {
    return allPermits.filter(permit => {
      let matchesStatus =
        activeTab === 'activos'
          ? permit.status === 'aprobado' || permit.status === 'en_ejecucion'
          : permit.status === activeTab;
      if (!matchesStatus) return false;

      if (workTypeFilter !== 'all') {
        const types = permit.selectedWorkTypes || {};
        const map: Record<string, keyof typeof types> = {
          alturas: 'alturas', confinados: 'confinado', energia: 'energia',
          izaje: 'izaje', excavaciones: 'excavacion', general: 'general',
        };
        if (!types[map[workTypeFilter] ?? workTypeFilter]) return false;
      }

      const s = searchTerm.toLowerCase();
      if (!s) return true;
      return (
        (permit.number || permit.id).toLowerCase().includes(s) ||
        (permit.user?.displayName || '').toLowerCase().includes(s) ||
        (permit.generalInfo?.areaEspecifica || '').toLowerCase().includes(s) ||
        (permit.generalInfo?.planta || '').toLowerCase().includes(s)
      );
    });
  }, [allPermits, activeTab, searchTerm, workTypeFilter]);

  // ── Sorted data ──────────────────────────────────────────────────────────
  const sortedPermits = useMemo(() => {
    if (!sortColumn) return filteredPermits;
    return [...filteredPermits].sort((a, b) => {
      let result = 0;
      switch (sortColumn) {
        case 'numero':
          result = (a.number || a.id).localeCompare(b.number || b.id);
          break;
        case 'area':
          result = (a.generalInfo?.areaEspecifica || '').localeCompare(b.generalInfo?.areaEspecifica || '');
          break;
        case 'planta':
          result = (a.generalInfo?.planta || '').localeCompare(b.generalInfo?.planta || '');
          break;
        case 'solicitante':
          result = (a.user?.displayName || '').localeCompare(b.user?.displayName || '');
          break;
        case 'fecha':
          result =
            (parseFirestoreDate(a.createdAt)?.getTime() || 0) -
            (parseFirestoreDate(b.createdAt)?.getTime() || 0);
          break;
      }
      return sortDir === 'asc' ? result : -result;
    });
  }, [filteredPermits, sortColumn, sortDir]);

  const totalPages = Math.ceil(sortedPermits.length / pageSize);
  const paginatedPermits = sortedPermits.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        setSortColumn(null);
        setSortDir('asc');
      }
    } else {
      setSortColumn(column);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortColumn !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === 'asc'
      ? <ArrowUp className="h-3 w-3" />
      : <ArrowDown className="h-3 w-3" />;
  };

  // ── Excel export ─────────────────────────────────────────────────────────
  const handleExportExcel = () => {
    if (sortedPermits.length === 0) {
      toast({ variant: 'destructive', title: 'Sin datos', description: 'No hay permisos para exportar.' });
      return;
    }

    const rows = sortedPermits.map(p => {
      // Flatten worker photos and signatures
      const workerPhotos = (p.workers || [])
        .map(w => `${w.nombre} (${w.cedula}): ${w.foto || 'Sin foto'}`)
        .filter(Boolean)
        .join('\n');

      const workTypes = getWorkTypeLabels(p).join(', ');

      return {
        'ID Sistema': p.id,
        'Número': p.number || `Borrador: ${p.id.substring(0, 8)}`,
        'Estado': getStatusText(p.status),
        'Creado Por (UID)': p.createdBy,
        'Fecha Creación': p.createdAt
          ? format(parseFirestoreDate(p.createdAt) || new Date(0), 'dd/MM/yyyy HH:mm:ss', { locale: es })
          : 'N/A',
        'Tipos de Trabajo': workTypes || 'N/A',
        
        // General Info
        'Empresa': p.generalInfo?.empresa || 'N/A',
        'Planta': p.generalInfo?.planta || 'N/A',
        'Ciudad': p.generalInfo?.ciudad || 'N/A',
        'Área Específica': p.generalInfo?.areaEspecifica || 'N/A',
        'Proceso': p.generalInfo?.proceso || 'N/A',
        'Contrato': p.generalInfo?.contrato || 'N/A',
        'Descripción del Trabajo': p.generalInfo?.workDescription || 'N/A',
        'N° Trabajadores': p.generalInfo?.numTrabajadores || 'N/A',
        'Validez Desde': p.generalInfo?.validFrom || 'N/A',
        'Validez Hasta': p.generalInfo?.validUntil || 'N/A',
        
        // User Info
        'Solicitante (Nombre)': p.user?.displayName || 'N/A',
        'Solicitante (Email)': p.user?.email || 'N/A',

        // Approvals
        'Aprobación Solicitante': p.approvals?.solicitante?.status || 'pendiente',
        'Aprobación Autorizante': p.approvals?.autorizante?.status || 'pendiente',
        'Aprobación Lider SST': p.approvals?.lider_sst?.status || 'pendiente',
        'Aprobación Mantenimiento': p.approvals?.mantenimiento?.status || 'pendiente',
        'Aprobación Coordinador Alturas': p.approvals?.coordinador_alturas?.status || 'pendiente',
        'Aprobación Supervisor Confinado': p.approvals?.supervisor_confinado?.status || 'pendiente',

        'Nombre Autorizante': p.approvals?.autorizante?.userName || 'N/A',
        'Fecha Autorizante': p.approvals?.autorizante?.signedAt || 'N/A',
        'Nombre Lider SST': p.approvals?.lider_sst?.userName || 'N/A',
        'Fecha Lider SST': p.approvals?.lider_sst?.signedAt || 'N/A',

        // Closure
        'Fecha Cierre': p.closure?.fechaCierre || 'N/A',
        'Hora Cierre': p.closure?.horaCierre || 'N/A',
        'Observaciones Cierre': p.closure?.observacionesCierre || 'N/A',
        'Área Despejada': p.closure?.areaDespejada || 'N/A',
        'Continua Labor': p.closure?.continuaLabor || 'N/A',

        // Photos & Files
        'URLs Fotos Trabajadores': workerPhotos || 'N/A',
        'Firma Apertura Solicitante URL': p.solicitanteFirmaApertura || 'N/A',
      };
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const colWidths = Object.keys(rows[0] ?? {}).map(key => ({
      wch: Math.max(key.length, ...rows.map(r => String((r as any)[key]).length)) + 2,
    }));
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Permisos');
    XLSX.writeFile(wb, `permisos_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({ title: '✅ Exportación exitosa', description: `${sortedPermits.length} permisos exportados.` });
  };

  // ── Render ───────────────────────────────────────────────────────────────
  const getPermitDisplayNumber = (permit: Permit) =>
    permit.status === 'borrador'
      ? `Borrador #${permit.id.substring(0, 8)}`
      : permit.number || `ID: ${permit.id.substring(0, 8)}`;

  const renderPermitList = (permits: Permit[]) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (permits.length === 0 && filteredPermits.length === 0) {
      return (
        <div className="h-60 text-center flex flex-col justify-center items-center">
          <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 font-semibold">No se encontraron permisos</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? `No hay resultados para "${searchTerm}" en esta categoría.`
              : 'No hay permisos con el estado seleccionado.'}
          </p>
        </div>
      );
    }

    return (
      <>
        {/* ── Móvil: tarjetas ── */}
        <div className="md:hidden space-y-3">
          {permits.map((permit) => (
            <Link
              key={permit.id}
              href={permit.status === 'borrador' ? `/permits/create?edit=${permit.id}` : `/permits/${permit.id}`}
              className="block"
            >
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-primary truncate">
                        {getPermitDisplayNumber(permit)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permit.generalInfo?.areaEspecifica || 'N/A'} • {permit.generalInfo?.planta || 'N/A'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(permit.status)}>
                      {getStatusText(permit.status)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {getWorkTypeBadges(permit)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-3 border-t">
                    <span>{permit.user?.displayName || 'N/A'}</span>
                    <span>
                      {permit.createdAt
                        ? format(parseFirestoreDate(permit.createdAt) || new Date(0), 'dd/MM/yyyy', { locale: es })
                        : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ── Desktop: tabla ── */}
        <div className="rounded-md border hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('numero')}
                >
                  <div className="flex items-center gap-1">Número <SortIcon col="numero" /></div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('area')}
                >
                  <div className="flex items-center gap-1">Área / Planta <SortIcon col="area" /></div>
                </TableHead>
                <TableHead>Tipo de Trabajo</TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('solicitante')}
                >
                  <div className="flex items-center gap-1">Solicitante <SortIcon col="solicitante" /></div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('fecha')}
                >
                  <div className="flex items-center gap-1">Creado <SortIcon col="fecha" /></div>
                </TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permits.map((permit) => (
                <TableRow key={permit.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link
                      href={permit.status === 'borrador' ? `/permits/create?edit=${permit.id}` : `/permits/${permit.id}`}
                      className="hover:underline text-primary"
                    >
                      {getPermitDisplayNumber(permit)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{permit.generalInfo?.areaEspecifica || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{permit.generalInfo?.planta || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {getWorkTypeBadges(permit).slice(0, 3)}
                      {getWorkTypeBadges(permit).length > 3 && (
                        <Badge className="bg-gray-100 text-gray-600 text-xs">
                          +{getWorkTypeBadges(permit).length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{permit.user?.displayName || 'N/A'}</TableCell>
                  <TableCell className="text-sm">
                    {permit.createdAt
                      ? format(parseFirestoreDate(permit.createdAt) || new Date(0), 'dd/MM/yyyy HH:mm', { locale: es })
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {permit.status === 'borrador' ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/permits/create?edit=${permit.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Continuar
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/permits/${permit.id}`}>Ver Detalles</Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permisos de Trabajo</h1>
          <p className="text-muted-foreground">Gestione todos sus permisos de trabajo aquí.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          {(user?.role === 'solicitante' || user?.role === 'admin') && (
            <Button asChild>
              <Link href="/permits/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Permiso
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0 sm:p-0">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UnifiedPermitStatus)}>
            <div className="flex flex-col border-b">
              {/* Tabs de estado */}
              <div className="px-4 pt-4">
                <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6 border-b rounded-none">
                  {permitStatuses.map(status => (
                    <TabsTrigger 
                      key={status.key} 
                      value={status.key} 
                      className="capitalize whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-1 pb-2"
                    >
                      {status.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Filtros de búsqueda */}
              <div className="p-4 flex flex-col md:flex-row gap-4 bg-muted/20">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por número, área, planta, solicitante..."
                    className="w-full pl-9 h-10 bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                    <SelectTrigger className="w-full md:w-[200px] h-10 bg-background">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Tipo de riesgo" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los riesgos</SelectItem>
                      <SelectItem value="alturas">Trabajo en Alturas</SelectItem>
                      <SelectItem value="confinados">Espacios Confinados</SelectItem>
                      <SelectItem value="energia">Control de Energías</SelectItem>
                      <SelectItem value="izaje">Izaje de Cargas</SelectItem>
                      <SelectItem value="excavaciones">Excavaciones</SelectItem>
                      <SelectItem value="general">Trabajo General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {permitStatuses.map(status => (
              <TabsContent key={status.key} value={status.key} className="mt-0 outline-none">
                <div className="min-h-[400px]">
                  {renderPermitList(paginatedPermits)}
                </div>
                {!loading && filteredPermits.length > 0 && (
                  <div className="p-4 border-t">
                    <DataTablePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      totalRows={filteredPermits.length}
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
