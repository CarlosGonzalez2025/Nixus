'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useWorkPlanDetail } from '@/hooks/use-work-plans';
import {
  calcPlanStats, calcPlanProgress, isPlanReadOnly,
  recalcPlanAggregates, updateWorkPlan,
} from '@/lib/work-plan-service';
import { WorkPlanForm } from '../components/work-plan-form';
import { TaskList } from '../components/task-list';
import { ExcelImport } from '../components/excel-import';
import { HazardCompliance } from '../components/hazard-compliance';
import {
  PLAN_STATUS_CONFIG, parseDate, progressColor,
} from '../components/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  CalendarRange, ArrowLeft, Loader2, Pencil, Upload, Lock,
  Check, Clock, Building2,
} from 'lucide-react';

export default function WorkPlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const planId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;

  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  const { plan, tasks, loading } = useWorkPlanDetail(planId);

  const isAdmin = user?.role === 'admin';
  const [editOpen, setEditOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const recalcInFlight = useRef(false);

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

  // ── Recálculo de agregados (offline-safe, sin transacciones) ───────────────────
  // Compara el valor derivado contra el almacenado y solo escribe si DIFIEREN.
  // Como onSnapshot refleja la escritura, el cálculo converge sin bucles.
  useEffect(() => {
    if (!plan || !planId) return;
    if (recalcInFlight.current) return;

    const { total, executed, pending } = calcPlanStats(tasks);
    const progress = calcPlanProgress(tasks);

    const differs =
      (plan.tasksCount ?? -1) !== total ||
      (plan.executedCount ?? -1) !== executed ||
      (plan.pendingCount ?? -1) !== pending ||
      (plan.progressPercentage ?? -1) !== progress;

    if (!differs) return;

    recalcInFlight.current = true;
    recalcPlanAggregates(planId, tasks)
      .catch(err => console.error('[WorkPlanDetail:recalc]', err))
      .finally(() => { recalcInFlight.current = false; });
  }, [plan, tasks, planId]);

  if (userLoading || !user || !isAdmin || loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-nixus" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-muted-foreground">
        <p className="text-sm">El plan no existe o fue eliminado.</p>
        <Button variant="outline" onClick={() => router.push('/work-plans')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista
        </Button>
      </div>
    );
  }

  const readOnly = isPlanReadOnly(plan.status);
  const st = PLAN_STATUS_CONFIG[plan.status];
  const start = parseDate(plan.startDate);
  const end = parseDate(plan.endDate);
  const pct = plan.progressPercentage ?? 0;

  const handleClosePlan = async () => {
    try {
      await updateWorkPlan(plan.id, { status: 'Cerrado' });
      toast({ title: 'Plan cerrado', description: 'El plan quedó en modo solo lectura.' });
    } catch (err: any) {
      console.error('[WorkPlanDetail:close]', err);
      toast({ title: 'Error', description: 'No se pudo cerrar el plan.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">
      {/* Volver */}
      <button
        onClick={() => router.push('/work-plans')}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="h-3 w-3" /> Planes de trabajo
      </button>

      {/* Cabecera */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          <div className="rounded-lg bg-nixus/10 p-2.5 shrink-0">
            <CalendarRange className="h-6 w-6 text-nixus" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{plan.name}</h1>
              <Badge variant="outline" className={cn('text-xs', st?.className)}>{st?.label ?? plan.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Vigencia {plan.year} · versión {plan.version}
            </p>
          </div>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
              <Upload className="mr-1.5 h-4 w-4" /> Importar Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="mr-1.5 h-4 w-4" /> Editar plan
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                  <Lock className="mr-1.5 h-4 w-4" /> Cerrar plan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Cerrar el plan de trabajo?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Al cerrar el plan quedará en modo <strong>solo lectura</strong>: no podrás crear,
                    editar ni eliminar actividades, ni modificar la matriz mensual. Esta acción es definitiva.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClosePlan} className="bg-emerald-600 hover:bg-emerald-700">
                    Cerrar plan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Tarjeta resumen */}
      <Card>
        <CardContent className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Periodo</p>
            <p className="text-sm font-medium">
              {start && end ? `${format(start, 'dd/MM/yyyy')} – ${format(end, 'dd/MM/yyyy')}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Actividades</p>
            <p className="text-sm font-medium">{plan.tasksCount ?? 0} total</p>
            <div className="flex items-center gap-3 text-xs mt-0.5">
              <span className="flex items-center gap-1 text-emerald-600"><Check className="h-3 w-3" /> {plan.executedCount ?? 0} ejecutadas</span>
              <span className="flex items-center gap-1 text-amber-600"><Clock className="h-3 w-3" /> {plan.pendingCount ?? 0} pendientes</span>
            </div>
          </div>
          {plan.centroCosto && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Centro de costo</p>
              <p className="text-sm font-medium flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-muted-foreground" /> {plan.centroCosto}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Avance general</p>
            <div className="flex items-center gap-2">
              <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div className={cn('h-full rounded-full transition-all', progressColor(pct))} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold tabular-nums w-10 text-right">{pct}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Descripción */}
      {plan.description && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Descripción</p>
            <p className="text-sm whitespace-pre-wrap">{plan.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Cumplimiento por peligro */}
      <HazardCompliance tasks={tasks} />

      {/* Lista de actividades + matriz */}
      <TaskList planId={plan.id} tasks={tasks} readOnly={readOnly} />

      {/* Diálogos */}
      {!readOnly && (
        <>
          <WorkPlanForm open={editOpen} onOpenChange={setEditOpen} plan={plan} />
          <ExcelImport open={importOpen} onOpenChange={setImportOpen} planId={plan.id} />
        </>
      )}
    </div>
  );
}
