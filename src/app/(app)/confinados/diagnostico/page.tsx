'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useDiagnosticos } from '@/hooks/use-diagnosticos';
import type { DiagnosticoConfinado } from '@/types/confinados';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  PlusCircle, Search, Loader2, FileX, ArrowLeft,
  MapPin, Calendar, User, Upload,
  ArrowUp, ArrowDown, ArrowUpDown, ClipboardList,
} from 'lucide-react';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

// ── Helpers ───────────────────────────────────────────────────────────────────

const parseDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

const scoreColor = (score: number | undefined) => {
  if (score == null) return 'text-muted-foreground';
  if (score >= 10) return 'text-green-600 font-semibold';
  if (score >= 6)  return 'text-amber-600 font-semibold';
  return 'text-red-600 font-semibold';
};

type SortDir = 'asc' | 'desc';

// ── Main component ─────────────────────────────────────────────────────────────

export default function DiagnosticoListPage() {
  const router = useRouter();
  const { diagnosticos, loading } = useDiagnosticos();

  const [search, setSearch]       = useState('');
  const [sortCol, setSortCol]     = useState<string>('fecha');
  const [sortDir, setSortDir]     = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]   = useState(25);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    if (!s) return diagnosticos;
    return diagnosticos.filter(d =>
      d.empresa?.toLowerCase().includes(s) ||
      d.planta?.toLowerCase().includes(s) ||
      d.contratista?.toLowerCase().includes(s) ||
      d.actividadAnalizada?.toLowerCase().includes(s) ||
      d.createdByName?.toLowerCase().includes(s),
    );
  }, [diagnosticos, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let r = 0;
      if (sortCol === 'empresa') r = (a.empresa ?? '').localeCompare(b.empresa ?? '');
      else if (sortCol === 'planta')  r = (a.planta ?? '').localeCompare(b.planta ?? '');
      else if (sortCol === 'puntaje') r = (a.resultados?.sumaTotal ?? 0) - (b.resultados?.sumaTotal ?? 0);
      else {
        const fa = parseDate(a.createdAt)?.getTime() ?? 0;
        const fb = parseDate(b.createdAt)?.getTime() ?? 0;
        r = fa - fb;
      }
      return sortDir === 'asc' ? r : -r;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages  = Math.ceil(sorted.length / pageSize);
  const paginated   = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  // ── Empty state ────────────────────────────────────────────────────────────

  if (!loading && diagnosticos.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">
        <PageHeader router={router} />
        <div className="flex flex-col items-center justify-center h-60 gap-4">
          <FileX className="h-12 w-12 text-muted-foreground" />
          <p className="font-semibold text-center">No hay inventarios registrados</p>
          <p className="text-sm text-muted-foreground text-center">
            Crea el primer inventario o importa registros desde Excel.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push('/confinados/diagnostico/importar')}>
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <Button size="sm" onClick={() => router.push('/confinados/diagnostico/nuevo')}>
              <PlusCircle className="mr-2 h-4 w-4" /> Nuevo inventario
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      <PageHeader router={router} />

      {/* Search bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por empresa, planta, actividad…"
            className="pl-9 h-10 bg-background text-sm"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
          {loading ? 'Cargando…' : `${sorted.length} registro${sorted.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Table */}
      <Card className="min-w-0 overflow-hidden shadow-sm border-gray-200">
        <CardContent className="p-0">

          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center text-center gap-2">
              <FileX className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-semibold">Sin resultados para &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="md:hidden divide-y">
                {paginated.map(d => {
                  const fecha = parseDate(d.createdAt);
                  const score = d.resultados?.sumaTotal;
                  return (
                    <div
                      key={d.id}
                      className="p-4 hover:bg-muted/40 cursor-pointer transition-colors"
                      onClick={() => router.push(`/confinados/diagnostico/${d.id}`)}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <p className="font-semibold text-sm truncate flex-1 pr-2">{d.empresa}</p>
                        {score != null && (
                          <span className={cn('text-sm tabular-nums flex-shrink-0', scoreColor(score))}>
                            {score}/14
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 flex-shrink-0" />{d.planta}
                        </div>
                        {d.actividadAnalizada && (
                          <p className="truncate">{d.actividadAnalizada}</p>
                        )}
                        {fecha && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            {format(fecha, 'dd/MM/yyyy', { locale: es })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('empresa')}>
                        <div className="flex items-center gap-1">Empresa <SortIcon col="empresa" /></div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('planta')}>
                        <div className="flex items-center gap-1">Planta <SortIcon col="planta" /></div>
                      </TableHead>
                      <TableHead>Actividad analizada</TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('fecha')}>
                        <div className="flex items-center gap-1">Fecha <SortIcon col="fecha" /></div>
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('puntaje')}>
                        <div className="flex items-center gap-1">Puntaje <SortIcon col="puntaje" /></div>
                      </TableHead>
                      <TableHead>Creado por</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map(d => {
                      const fecha = parseDate(d.createdAt);
                      const score = d.resultados?.sumaTotal;
                      return (
                        <TableRow key={d.id} className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => router.push(`/confinados/diagnostico/${d.id}`)}>
                          <TableCell className="font-medium text-sm">{d.empresa}</TableCell>
                          <TableCell className="text-sm">{d.planta}</TableCell>
                          <TableCell className="text-sm max-w-[220px]">
                            <span className="truncate block">{d.actividadAnalizada ?? '—'}</span>
                          </TableCell>
                          <TableCell className="text-sm whitespace-nowrap">
                            {fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : (d.fecha ?? '—')}
                          </TableCell>
                          <TableCell>
                            <span className={cn('text-sm tabular-nums', scoreColor(score))}>
                              {score != null ? `${score} / 14` : '—'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate max-w-[120px]">{d.createdByName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                            <Button variant="outline" size="sm"
                              onClick={() => router.push(`/confinados/diagnostico/${d.id}`)}>
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {sorted.length > pageSize && (
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Shared header component ───────────────────────────────────────────────────

function PageHeader({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <div>
        <button
          onClick={() => router.push('/confinados')}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
        >
          <ArrowLeft className="h-3 w-3" /> Confinados
        </button>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-violet-600" />
          Inventario – Espacios Confinados
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Checklist de evaluación de riesgos, facilidades, equipos y EPP.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm"
          onClick={() => router.push('/confinados/diagnostico/importar')}>
          <Upload className="mr-2 h-4 w-4" /> Importar
        </Button>
        <Button size="sm"
          onClick={() => router.push('/confinados/diagnostico/nuevo')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo inventario
        </Button>
      </div>
    </div>
  );
}
