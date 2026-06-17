'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { TareaPlanTrabajo, ProgresoMensual } from '@/types/work-plan';
import { updateTask, deleteTask } from '@/lib/work-plan-service';
import { TaskForm } from './task-form';
import { MonthlyMatrix } from './monthly-matrix';
import {
  PHVA_CONFIG, RESOURCE_CONFIG, TASK_STATUS_CONFIG, progressColor,
} from './constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus, Pencil, Trash2, Lock, ListChecks, CalendarRange,
} from 'lucide-react';

interface Props {
  planId: string;
  tasks: TareaPlanTrabajo[];
  readOnly: boolean;
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', progressColor(pct))} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium tabular-nums w-9 text-right">{pct}%</span>
    </div>
  );
}

export function TaskList({ planId, tasks, readOnly }: Props) {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TareaPlanTrabajo | null>(null);
  const [deleting, setDeleting] = useState<TareaPlanTrabajo | null>(null);

  const openNew = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (t: TareaPlanTrabajo) => { setEditing(t); setFormOpen(true); };

  const handleMatrixChange = async (task: TareaPlanTrabajo, next: ProgresoMensual[]) => {
    try {
      await updateTask(planId, task.id, { monthlyProgress: next });
    } catch (err: any) {
      console.error('[TaskList:matrix]', err);
      toast({ title: 'Error', description: 'No se pudo actualizar la matriz.', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await deleteTask(planId, deleting.id);
      toast({ title: 'Actividad eliminada' });
    } catch (err: any) {
      console.error('[TaskList:delete]', err);
      toast({ title: 'Error', description: 'No se pudo eliminar la actividad.', variant: 'destructive' });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Cabecera */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-nixus" />
          Actividades <span className="text-muted-foreground font-normal">({tasks.length})</span>
        </h2>
        {readOnly ? (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <Lock className="mr-1 h-3 w-3" /> Plan cerrado — solo lectura
          </Badge>
        ) : (
          <Button size="sm" onClick={openNew} className="bg-nixus hover:bg-nixus/90 text-nixus-foreground">
            <Plus className="mr-1.5 h-4 w-4" /> Nueva actividad
          </Button>
        )}
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-10 flex flex-col items-center text-center gap-2 text-muted-foreground">
            <CalendarRange className="h-8 w-8" />
            <p className="text-sm">No hay actividades en este plan todavía.</p>
            {!readOnly && (
              <Button variant="outline" size="sm" onClick={openNew}>
                <Plus className="mr-1.5 h-4 w-4" /> Agregar la primera actividad
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop: tabla */}
          <Card className="hidden lg:block overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Actividad</TableHead>
                    <TableHead className="min-w-[140px]">Responsable</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="min-w-[120px]">Cumplimiento</TableHead>
                    <TableHead className="min-w-[360px]">Planeación / Ejecución mensual</TableHead>
                    {!readOnly && <TableHead className="text-right">Acciones</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(t => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-snug">{t.activity}</p>
                          <Badge variant="outline" className={cn('text-[10px]', PHVA_CONFIG[t.phva]?.className)}>
                            {PHVA_CONFIG[t.phva]?.label ?? t.phva}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{t.responsibleName || '—'}</p>
                        {t.responsibleRole && <p className="text-xs text-muted-foreground">{t.responsibleRole}</p>}
                        <p className="text-[11px] text-muted-foreground">{t.frequency}</p>
                      </TableCell>
                      <TableCell className="text-sm">{RESOURCE_CONFIG[t.resourceType]?.label ?? t.resourceType}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('text-[10px]', TASK_STATUS_CONFIG[t.status]?.className)}>
                          {TASK_STATUS_CONFIG[t.status]?.label ?? t.status}
                        </Badge>
                      </TableCell>
                      <TableCell><ProgressBar pct={t.totalProgress ?? 0} /></TableCell>
                      <TableCell>
                        <MonthlyMatrix
                          monthlyProgress={t.monthlyProgress ?? []}
                          readOnly={readOnly}
                          onChange={next => handleMatrixChange(t, next)}
                        />
                      </TableCell>
                      {!readOnly && (
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => setDeleting(t)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Móvil/tablet: tarjetas */}
          <div className="grid gap-3 lg:hidden">
            {tasks.map(t => (
              <Card key={t.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{t.activity}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className={cn('text-[10px]', PHVA_CONFIG[t.phva]?.className)}>
                          {PHVA_CONFIG[t.phva]?.label ?? t.phva}
                        </Badge>
                        <Badge variant="outline" className={cn('text-[10px]', TASK_STATUS_CONFIG[t.status]?.className)}>
                          {TASK_STATUS_CONFIG[t.status]?.label ?? t.status}
                        </Badge>
                      </div>
                    </div>
                    {!readOnly && (
                      <div className="flex shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => setDeleting(t)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.responsibleName || '—'}</span>
                    {t.responsibleRole && ` · ${t.responsibleRole}`}
                    {' · '}{RESOURCE_CONFIG[t.resourceType]?.label ?? t.resourceType}
                    {' · '}{t.frequency}
                  </div>

                  <ProgressBar pct={t.totalProgress ?? 0} />

                  <div className="overflow-x-auto -mx-1 px-1">
                    <MonthlyMatrix
                      monthlyProgress={t.monthlyProgress ?? []}
                      readOnly={readOnly}
                      onChange={next => handleMatrixChange(t, next)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Diálogo crear/editar */}
      {!readOnly && (
        <TaskForm open={formOpen} onOpenChange={setFormOpen} planId={planId} task={editing} />
      )}

      {/* Confirmación de borrado */}
      <AlertDialog open={!!deleting} onOpenChange={o => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar actividad?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará «{deleting?.activity}» del plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
