'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useWorkPlans } from '@/hooks/use-work-plans';
import type { PlanTrabajo } from '@/types/work-plan';
import { WorkPlanForm } from './components/work-plan-form';
import {
  PLAN_STATUS_CONFIG, parseDate, progressColor,
} from './components/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  CalendarRange, Plus, Search, Loader2, FileX, Eye, Check, Clock,
} from 'lucide-react';

function periodLabel(p: PlanTrabajo): string {
  const s = parseDate(p.startDate);
  const e = parseDate(p.endDate);
  if (!s || !e) return '—';
  return `${format(s, 'dd/MM/yyyy')} – ${format(e, 'dd/MM/yyyy')}`;
}

function ProgressCell({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
        <div className={cn('h-full rounded-full', progressColor(pct))} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium tabular-nums w-9 text-right">{pct}%</span>
    </div>
  );
}

export default function WorkPlansPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  const { plans, loading } = useWorkPlans();

  const isAdmin = user?.role === 'admin';
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  // ── Guard de ruta: solo administradores ───────────────────────────────────────
  useEffect(() => {
    if (!userLoading && user && !isAdmin) {
      toast({
        title: 'Acceso denegado',
        description: 'Disponible solo para administradores.',
        variant: 'destructive',
      });
      router.replace('/dashboard');
    }
  }, [userLoading, user, isAdmin, router, toast]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    if (!s) return plans;
    return plans.filter(p =>
      p.name?.toLowerCase().includes(s) ||
      String(p.year).includes(s) ||
      p.status?.toLowerCase().includes(s) ||
      p.createdByName?.toLowerCase().includes(s),
    );
  }, [plans, search]);

  if (userLoading || !user || !isAdmin) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-nixus" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <CalendarRange className="h-6 w-6 text-nixus" />
            Plan de Trabajo Anual
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Planeación SST bajo el ciclo PHVA.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="bg-nixus hover:bg-nixus/90 text-nixus-foreground">
          <Plus className="mr-2 h-4 w-4" /> Nuevo plan
        </Button>
      </div>

      {/* Buscador */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, año, estado o creador…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-nixus" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 flex flex-col items-center text-center gap-3 text-muted-foreground">
            <FileX className="h-10 w-10" />
            <p className="text-sm">
              {search ? 'No se encontraron planes con ese criterio.' : 'Aún no hay planes de trabajo.'}
            </p>
            {!search && (
              <Button variant="outline" onClick={() => setFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Crear el primer plan
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop: tabla */}
          <Card className="hidden md:block overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Vigencia</TableHead>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Actividades</TableHead>
                    <TableHead className="min-w-[130px]">Avance</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(p => {
                    const st = PLAN_STATUS_CONFIG[p.status];
                    return (
                      <TableRow key={p.id} className="cursor-pointer" onClick={() => router.push(`/work-plans/${p.id}`)}>
                        <TableCell>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">
                            v{p.version}{p.createdByName ? ` · ${p.createdByName}` : ''}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm font-medium tabular-nums">{p.year}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{periodLabel(p)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5 text-xs">
                            <span className="font-medium text-sm">{p.tasksCount ?? 0} total</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-emerald-600">
                                <Check className="h-3 w-3" /> {p.executedCount ?? 0}
                              </span>
                              <span className="flex items-center gap-1 text-amber-600">
                                <Clock className="h-3 w-3" /> {p.pendingCount ?? 0}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><ProgressCell pct={p.progressPercentage ?? 0} /></TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('text-xs', st?.className)}>{st?.label ?? p.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); router.push(`/work-plans/${p.id}`); }}>
                            <Eye className="mr-1.5 h-4 w-4" /> Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Móvil: tarjetas */}
          <div className="grid gap-3 md:hidden">
            {filtered.map(p => {
              const st = PLAN_STATUS_CONFIG[p.status];
              return (
                <Card key={p.id} className="cursor-pointer" onClick={() => router.push(`/work-plans/${p.id}`)}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Vigencia {p.year} · v{p.version}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn('text-xs shrink-0', st?.className)}>{st?.label ?? p.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{periodLabel(p)}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-medium text-sm">{p.tasksCount ?? 0} actividades</span>
                      <span className="flex items-center gap-1 text-emerald-600"><Check className="h-3 w-3" /> {p.executedCount ?? 0}</span>
                      <span className="flex items-center gap-1 text-amber-600"><Clock className="h-3 w-3" /> {p.pendingCount ?? 0}</span>
                    </div>
                    <ProgressCell pct={p.progressPercentage ?? 0} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <WorkPlanForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
