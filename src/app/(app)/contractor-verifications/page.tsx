'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useContractorVerifications } from '@/hooks/use-contractor-verifications';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import type { ContractorVerification, VerificationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import {
  PlusCircle, Search, Loader2, FileX, Filter,
  ArrowUp, ArrowDown, ArrowUpDown, ClipboardCheck,
  Building2, MapPin, User, Calendar, HelpCircle,
  CheckCircle2, XCircle, AlertTriangle, MinusCircle,
  ShieldCheck, FileText, BarChart2, ClipboardList,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

// ── Configuración visual ───────────────────────────────────────────────────────

const STATUS_CONFIG: Record<VerificationStatus, { label: string; color: string }> = {
  DRAFT:       { label: 'Borrador',     color: 'bg-gray-100 text-gray-700' },
  IN_PROGRESS: { label: 'En Progreso',  color: 'bg-blue-100 text-blue-800' },
  COMPLETED:   { label: 'Completado',   color: 'bg-green-100 text-green-800' },
  CLOSED:      { label: 'Cerrado',      color: 'bg-slate-100 text-slate-700' },
  CANCELLED:   { label: 'Cancelado',    color: 'bg-red-100 text-red-700' },
};

const TAB_STATUSES: { key: VerificationStatus | 'todos'; label: string }[] = [
  { key: 'IN_PROGRESS', label: 'En Progreso' },
  { key: 'DRAFT',       label: 'Borradores'  },
  { key: 'COMPLETED',   label: 'Completados' },
  { key: 'CLOSED',      label: 'Cerrados'    },
  { key: 'todos',       label: 'Todos'       },
];

type SortDir = 'asc' | 'desc';

const parseDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

// ── Componente principal ───────────────────────────────────────────────────────

export default function ContractorVerificationsPage() {
  const { user } = useUser();
  const router = useRouter();
  const { verifications, loading } = useContractorVerifications(user);
  const { canCreateVerification, isAdmin } = useVerificationPermissions(user);

  const [activeTab, setActiveTab] = useState<VerificationStatus | 'todos'>('todos');
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [helpOpen, setHelpOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>('fecha');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Tipos de riesgo únicos presentes en los registros (para el filtro)
  const riskTypeOptions = useMemo(() => {
    const seen = new Map<string, string>();
    verifications.forEach(v => {
      if (!seen.has(v.riskTypeId)) seen.set(v.riskTypeId, v.riskTypeName);
    });
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, [verifications]);

  const filtered = useMemo(() => {
    return verifications.filter(v => {
      const matchTab = activeTab === 'todos' || v.status === activeTab;
      const matchRisk = filterRisk === 'all' || v.riskTypeId === filterRisk;

      const s = search.toLowerCase();
      const matchSearch = !s ||
        v.companyName?.toLowerCase().includes(s) ||
        v.plantName?.toLowerCase().includes(s) ||
        v.city?.toLowerCase().includes(s) ||
        v.riskTypeName?.toLowerCase().includes(s) ||
        v.createdByName?.toLowerCase().includes(s) ||
        v.templateName?.toLowerCase().includes(s);

      return matchTab && matchRisk && matchSearch;
    });
  }, [verifications, activeTab, filterRisk, search]);

  const sorted = useMemo(() => {
    if (!sortColumn) return filtered;
    return [...filtered].sort((a, b) => {
      let result = 0;
      switch (sortColumn) {
        case 'empresa': result = a.companyName.localeCompare(b.companyName); break;
        case 'riesgo':  result = a.riskTypeName.localeCompare(b.riskTypeName); break;
        case 'planta':  result = a.plantName.localeCompare(b.plantName); break;
        case 'cumplimiento': result = a.compliancePercentage - b.compliancePercentage; break;
        case 'fecha': {
          const fa = parseDate(a.verificationDate)?.getTime() || 0;
          const fb = parseDate(b.verificationDate)?.getTime() || 0;
          result = fa - fb;
          break;
        }
      }
      return sortDir === 'asc' ? result : -result;
    });
  }, [filtered, sortColumn, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortDir('desc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortColumn !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  const countByTab = (tab: VerificationStatus | 'todos') =>
    tab === 'todos' ? verifications.length : verifications.filter(v => v.status === tab).length;

  // ── Render ────────────────────────────────────────────────────────────────────
  const renderList = (items: ContractorVerification[]) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="h-60 flex flex-col items-center justify-center text-center">
          <FileX className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="font-semibold">No se encontraron verificaciones</p>
          <p className="text-sm text-muted-foreground mt-1">
            {search ? `Sin resultados para "${search}".` : 'No hay verificaciones en este estado.'}
          </p>
          {canCreateVerification && !search && (
            <Button variant="outline" size="sm" className="mt-4"
              onClick={() => router.push('/contractor-verifications/create')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva verificación
            </Button>
          )}
        </div>
      );
    }

    return (
      <>
        {/* Móvil: tarjetas */}
        <div className="md:hidden space-y-3">
          {items.map(v => {
            const statusCfg = STATUS_CONFIG[v.status];
            const fecha = parseDate(v.verificationDate);
            const pct = v.compliancePercentage;

            return (
              <Card key={v.id}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => router.push(`/contractor-verifications/${v.id}`)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{v.riskTypeName}</p>
                      <p className="text-xs text-muted-foreground truncate">{v.templateName}</p>
                    </div>
                    <Badge className={cn('ml-2 text-xs flex-shrink-0', statusCfg.color)}>
                      {statusCfg.label}
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{v.companyName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{v.plantName} · {v.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span>{fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : '—'}</span>
                    </div>
                  </div>

                  {v.totalItems > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#f59e0b',
                          }} />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Desktop: tabla */}
        <div className="rounded-md border hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('riesgo')}>
                  <div className="flex items-center gap-1">Tipo de Riesgo <SortIcon col="riesgo" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('empresa')}>
                  <div className="flex items-center gap-1">Empresa / Contratista <SortIcon col="empresa" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('planta')}>
                  <div className="flex items-center gap-1">Planta / Ciudad <SortIcon col="planta" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('fecha')}>
                  <div className="flex items-center gap-1">Fecha <SortIcon col="fecha" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('cumplimiento')}>
                  <div className="flex items-center gap-1">Cumplimiento <SortIcon col="cumplimiento" /></div>
                </TableHead>
                {isAdmin && <TableHead>Creado por</TableHead>}
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(v => {
                const statusCfg = STATUS_CONFIG[v.status];
                const fecha = parseDate(v.verificationDate);
                const pct = v.compliancePercentage;

                return (
                  <TableRow key={v.id} className="hover:bg-muted/50">
                    <TableCell>
                      <p className="font-medium text-sm">{v.riskTypeName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{v.templateName}</p>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{v.companyName}</TableCell>
                    <TableCell>
                      <p className="text-sm">{v.plantName}</p>
                      <p className="text-xs text-muted-foreground">{v.city}</p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : '—'}
                    </TableCell>
                    <TableCell>
                      {v.totalItems > 0 ? (
                        <div className="flex items-center gap-2 min-w-[90px]">
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
                    {isAdmin && (
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <User className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate max-w-[120px]">{v.createdByName}</span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge className={cn('text-xs', statusCfg.color)}>{statusCfg.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm"
                        onClick={() => router.push(`/contractor-verifications/${v.id}`)}>
                        Ver detalles
                      </Button>
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
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            Verificación Contratistas
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Listas de verificación para contratistas por tipo de riesgo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setHelpOpen(true)}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Ayuda
          </Button>
          {canCreateVerification && (
            <Button onClick={() => router.push('/contractor-verifications/create')} size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva verificación
            </Button>
          )}
        </div>
      </div>

      {/* ── Modal de Ayuda ───────────────────────────────────────────────────── */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              ¿Cómo funciona Verificación de Contratistas?
            </DialogTitle>
            <DialogDescription>
              Módulo para evaluar el cumplimiento de requisitos de seguridad de contratistas según el tipo de actividad de riesgo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">

            {/* Flujo de trabajo */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-foreground">Flujo del proceso</h3>
              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    icon: ShieldCheck,
                    title: 'Seleccionar Tipo de Riesgo',
                    desc: 'Elige el tipo de actividad que va a realizar el contratista (Trabajo en Alturas, Espacios Confinados, Izaje de Cargas, etc.).',
                    color: 'bg-blue-100 text-blue-700',
                  },
                  {
                    step: '2',
                    icon: FileText,
                    title: 'Seleccionar Plantilla',
                    desc: 'Escoge la plantilla de verificación activa para ese tipo de riesgo. Las plantillas contienen los requisitos legales y técnicos a evaluar.',
                    color: 'bg-purple-100 text-purple-700',
                  },
                  {
                    step: '3',
                    icon: ClipboardList,
                    title: 'Registrar Datos Generales',
                    desc: 'Ingresa la empresa, planta, ciudad, fecha, ubicación y descripción de la actividad a verificar.',
                    color: 'bg-indigo-100 text-indigo-700',
                  },
                  {
                    step: '4',
                    icon: BarChart2,
                    title: 'Diligenciar el Checklist',
                    desc: 'Evalúa cada ítem con una de las 4 calificaciones: C (Cumple), NC (No Cumple), OM (Oportunidad de Mejora) o NA (No Aplica). Los ítems NC requieren un plan de acción.',
                    color: 'bg-amber-100 text-amber-700',
                  },
                  {
                    step: '5',
                    icon: ClipboardCheck,
                    title: 'Cerrar la Verificación',
                    desc: 'Al completar todos los ítems, puedes cerrar la verificación. El sistema calcula automáticamente el porcentaje de cumplimiento (excluyendo los NA).',
                    color: 'bg-green-100 text-green-700',
                  },
                ].map(item => (
                  <div key={item.step} className="flex gap-3">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm', item.color)}>
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sistema de calificación */}
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-sm mb-3">Sistema de calificación</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', code: 'C — Cumple', desc: 'El requisito se cumple satisfactoriamente.' },
                  { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', code: 'NC — No Cumple', desc: 'El requisito NO se cumple. Requiere plan de acción.' },
                  { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', code: 'OM — Oportunidad Mejora', desc: 'Se cumple pero hay aspectos a mejorar.' },
                  { icon: MinusCircle, color: 'text-gray-400', bg: 'bg-gray-50', code: 'NA — No Aplica', desc: 'El ítem no aplica para la actividad. Se excluye del cálculo.' },
                ].map(r => (
                  <div key={r.code} className={cn('rounded-md p-2.5 flex gap-2 items-start', r.bg)}>
                    <r.icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', r.color)} />
                    <div>
                      <p className={cn('font-bold text-xs', r.color)}>{r.code}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-sm mb-3">Permisos por rol</h3>
              <div className="space-y-2 text-xs">
                {[
                  { role: 'Administrador', color: 'bg-slate-700', perms: 'Acceso completo: crear, editar, ver todas las verificaciones, gestionar plantillas y tipos de riesgo.' },
                  { role: 'Asesor ARL', color: 'bg-blue-600', perms: 'Puede crear verificaciones y ver/editar únicamente las que él mismo creó.' },
                  { role: 'Líder SST', color: 'bg-purple-600', perms: 'Puede crear y ver las verificaciones de su planta asignada.' },
                ].map(r => (
                  <div key={r.role} className="flex gap-2 items-start">
                    <span className={cn('px-2 py-0.5 rounded-full text-white font-medium text-[11px] flex-shrink-0', r.color)}>
                      {r.role}
                    </span>
                    <p className="text-muted-foreground">{r.perms}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota plantillas */}
            {isAdmin && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                <span className="font-semibold">Como administrador</span> puedes gestionar plantillas y tipos de riesgo desde{' '}
                <button
                  className="underline font-medium"
                  onClick={() => { setHelpOpen(false); router.push('/contractor-verifications/templates'); }}
                >
                  Plantillas Contratistas
                </button>{' '}
                en el menú de Administración.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Card principal */}
      <Card className="min-w-0 overflow-hidden shadow-sm border-gray-200">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as any); setCurrentPage(1); }}>

            {/* Tabs de estado */}
            <div className="flex flex-col border-b">
              <div className="px-4 pt-4 overflow-x-auto">
                <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6 border-b rounded-none">
                  {TAB_STATUSES.filter(t => t.key === 'todos' || countByTab(t.key) > 0).map(t => (
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
              <div className="p-4 flex flex-col md:flex-row gap-3 bg-muted/20">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por empresa, planta, ciudad, riesgo..."
                    className="w-full pl-9 h-10 bg-background text-sm"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <Select value={filterRisk} onValueChange={v => { setFilterRisk(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full md:w-[200px] h-10 bg-background text-sm">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Tipo de riesgo" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los riesgos</SelectItem>
                    {riskTypeOptions.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contenido de tabs — solo renderizar los que existen */}
            {TAB_STATUSES.filter(t => t.key === 'todos' || countByTab(t.key) > 0).map(t => (
              <TabsContent key={t.key} value={t.key} className="mt-0 outline-none">
                <div className="min-h-[300px] p-4">
                  {renderList(paginated)}
                </div>
                {!loading && sorted.length > 0 && (
                  <div className="p-4 border-t">
                    <DataTablePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      totalRows={sorted.length}
                      onPageChange={setCurrentPage}
                      onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
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
