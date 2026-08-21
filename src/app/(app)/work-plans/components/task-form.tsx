'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { createTask, updateTask } from '@/lib/work-plan-service';
import type { TareaPlanTrabajo } from '@/types/work-plan';
import {
  PHVA_OPTIONS, PHVA_CONFIG, RESOURCE_OPTIONS, RESOURCE_CONFIG,
  FREQUENCY_OPTIONS, TASK_STATUS_OPTIONS, TASK_STATUS_CONFIG,
  HAZARD_OPTIONS, HAZARD_TRANSVERSAL,
} from './constants';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const schema = z.object({
  activity: z.string().min(1, 'La actividad es obligatoria'),
  phva: z.enum(['Planear', 'Hacer', 'Verificar', 'Actuar']),
  // Texto libre validado contra el catálogo: permite conservar valores heredados de
  // importaciones antiguas sin romper el formulario en modo edición.
  hazard: z.string().min(1, 'El peligro es obligatorio'),
  resourceType: z.enum(['Financiero', 'Administrativo', 'Tecnico', 'Humano']),
  responsibleName: z.string().min(1, 'El responsable es obligatorio'),
  responsibleRole: z.string().optional().default(''),
  frequency: z.enum(['Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual', 'Puntual']),
  status: z.enum(['Pendiente', 'En Progreso', 'Completado', 'Cancelado', 'Reprogramado']),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  task?: TareaPlanTrabajo | null; // si viene, modo edición
}

export function TaskForm({ open, onOpenChange, planId, task }: Props) {
  const { toast } = useToast();
  const isEdit = !!task;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: '', phva: 'Planear', hazard: HAZARD_TRANSVERSAL, resourceType: 'Administrativo',
      responsibleName: '', responsibleRole: '', frequency: 'Mensual', status: 'Pendiente',
    },
  });

  useEffect(() => {
    if (!open) return;
    if (task) {
      form.reset({
        activity: task.activity ?? '',
        phva: task.phva ?? 'Planear',
        hazard: task.hazard?.trim() || HAZARD_TRANSVERSAL,
        resourceType: task.resourceType ?? 'Administrativo',
        responsibleName: task.responsibleName ?? '',
        responsibleRole: task.responsibleRole ?? '',
        frequency: task.frequency ?? 'Mensual',
        status: task.status ?? 'Pendiente',
      });
    } else {
      form.reset({
        activity: '', phva: 'Planear', resourceType: 'Administrativo',
        responsibleName: '', responsibleRole: '', frequency: 'Mensual', status: 'Pendiente',
      });
    }
  }, [open, task]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEdit && task) {
        await updateTask(planId, task.id, values);
        toast({ title: 'Actividad actualizada' });
      } else {
        await createTask(planId, values);
        toast({ title: 'Actividad creada', description: 'Se inicializó con 12 meses vacíos.' });
      }
      onOpenChange(false);
    } catch (err: any) {
      console.error('[TaskForm]', err);
      toast({ title: 'Error', description: err?.message ?? 'No se pudo guardar la actividad.', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar actividad' : 'Nueva actividad'}</DialogTitle>
          <DialogDescription>
            Define la actividad, su etapa PHVA, recurso, responsable y frecuencia.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="activity" render={({ field }) => (
              <FormItem>
                <FormLabel>Actividad</FormLabel>
                <FormControl><Textarea rows={2} placeholder="Descripción de la actividad…" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="hazard" render={({ field }) => (
              <FormItem>
                <FormLabel>Peligro / programa</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Seleccione el peligro" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {/* Un valor heredado fuera del catálogo se conserva como opción
                        para que editar la actividad no lo borre en silencio. */}
                    {(HAZARD_OPTIONS.includes(field.value) ? HAZARD_OPTIONS : [field.value, ...HAZARD_OPTIONS])
                      .map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Permite medir el % de cumplimiento del plan por peligro y compararlo con los hallazgos.
                  Use «{HAZARD_TRANSVERSAL}» para actividades que no pertenecen a un programa específico.
                </p>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="phva" render={({ field }) => (
                <FormItem>
                  <FormLabel>Etapa PHVA</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {PHVA_OPTIONS.map(o => <SelectItem key={o} value={o}>{PHVA_CONFIG[o].label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="resourceType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurso</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {RESOURCE_OPTIONS.map(o => <SelectItem key={o} value={o}>{RESOURCE_CONFIG[o].label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="responsibleName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <FormControl><Input placeholder="Nombre completo" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="responsibleRole" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl><Input placeholder="Cargo / rol" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="frequency" render={({ field }) => (
                <FormItem>
                  <FormLabel>Frecuencia</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {FREQUENCY_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.map(o => <SelectItem key={o} value={o}>{TASK_STATUS_CONFIG[o].label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-nixus hover:bg-nixus/90 text-nixus-foreground">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? 'Guardar' : 'Crear actividad'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
