'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { createWorkPlan, updateWorkPlan } from '@/lib/work-plan-service';
import type { PlanTrabajo } from '@/types/work-plan';
import { PLAN_STATUS_OPTIONS, PLAN_STATUS_CONFIG, parseDate } from './constants';
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
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional().default(''),
  year: z.coerce.number().int().min(2020, 'Año mínimo 2020').max(2050, 'Año máximo 2050'),
  version: z.coerce.number().int().min(1, 'La versión inicia en 1'),
  centroCosto: z.string().optional(),
  status: z.enum(['Borrador', 'Aprobado', 'En Ejecución', 'Cerrado']),
  startDate: z.string().min(1, 'La fecha de inicio es obligatoria'),
  endDate: z.string().min(1, 'La fecha de fin es obligatoria'),
}).refine(
  v => new Date(v.endDate) >= new Date(v.startDate),
  { message: 'La fecha de fin debe ser igual o posterior a la de inicio', path: ['endDate'] },
);

type FormValues = z.infer<typeof schema>;

const toInputDate = (v: any): string => {
  const d = parseDate(v);
  return d ? format(d, 'yyyy-MM-dd') : '';
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: PlanTrabajo | null; // si viene, modo edición
}

export function WorkPlanForm({ open, onOpenChange, plan }: Props) {
  const { toast } = useToast();
  const { user } = useUser();
  const isEdit = !!plan;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', description: '', year: new Date().getFullYear(), version: 1,
      centroCosto: '', status: 'Borrador', startDate: '', endDate: '',
    },
  });

  useEffect(() => {
    if (!open) return;
    if (plan) {
      form.reset({
        name: plan.name ?? '',
        description: plan.description ?? '',
        year: plan.year ?? new Date().getFullYear(),
        version: plan.version ?? 1,
        centroCosto: plan.centroCosto ?? '',
        status: plan.status ?? 'Borrador',
        startDate: toInputDate(plan.startDate),
        endDate: toInputDate(plan.endDate),
      });
    } else {
      const y = new Date().getFullYear();
      form.reset({
        name: '', description: '', year: y, version: 1, centroCosto: '',
        status: 'Borrador',
        startDate: `${y}-01-01`, endDate: `${y}-12-31`,
      });
    }
  }, [open, plan]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        name: values.name,
        description: values.description ?? '',
        year: Number(values.year),
        version: Number(values.version),
        centroCosto: values.centroCosto || undefined,
        status: values.status,
        startDate: new Date(`${values.startDate}T00:00:00`),
        endDate: new Date(`${values.endDate}T00:00:00`),
        empresaId: plan?.empresaId ?? user?.empresa ?? '',
        createdByName: plan?.createdByName ?? user?.displayName ?? user?.email ?? '',
      };

      if (isEdit && plan) {
        await updateWorkPlan(plan.id, payload);
        toast({ title: 'Plan actualizado', description: 'Los cambios se guardaron correctamente.' });
      } else {
        await createWorkPlan(payload, user?.uid ?? '');
        toast({ title: 'Plan creado', description: 'El plan de trabajo se creó correctamente.' });
      }
      onOpenChange(false);
    } catch (err: any) {
      console.error('[WorkPlanForm]', err);
      toast({ title: 'Error', description: err?.message ?? 'No se pudo guardar el plan.', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar plan de trabajo' : 'Nuevo plan de trabajo'}</DialogTitle>
          <DialogDescription>
            Define la vigencia, el periodo y el estado del plan anual SST.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del plan</FormLabel>
                <FormControl><Input placeholder="Plan Anual de Trabajo SST 2026" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl><Textarea rows={3} placeholder="Objetivo y alcance del plan…" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem>
                  <FormLabel>Vigencia (año)</FormLabel>
                  <FormControl><Input type="number" min={2020} max={2050} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="version" render={({ field }) => (
                <FormItem>
                  <FormLabel>Versión</FormLabel>
                  <FormControl><Input type="number" min={1} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="startDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Inicio</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="endDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Fin</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="centroCosto" render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de costo <span className="text-muted-foreground text-xs">(opcional)</span></FormLabel>
                  <FormControl><Input placeholder="CC-001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {PLAN_STATUS_OPTIONS.map(s => (
                        <SelectItem key={s} value={s}>{PLAN_STATUS_CONFIG[s].label}</SelectItem>
                      ))}
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
                {isEdit ? 'Guardar cambios' : 'Crear plan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
