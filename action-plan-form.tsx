"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    CalendarIcon,
    Loader2,
    Save,
    X,
    User,
    ClipboardCheck,
    TrendingUp,
    MessageSquare,
    Hash,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ImprovementPlan } from '@/types/improvement-plan';

const actionPlanSchema = z.object({
    fechaMedidaImplementada: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    responsable: z.string().optional(),
    fechaSeguimiento1: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimiento: z.number().min(0).max(100).optional(),
    fechaCierre: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimientoTotal: z.number().min(0).max(100).optional(),
    cumplimientoEstado: z.enum(['Pendiente', 'En Progreso', 'Completado', 'Cerrado']).optional(),
    observacion: z.string().optional(),
});

type ActionPlanFormValues = z.infer<typeof actionPlanSchema>;

interface ActionPlanFormProps {
    improvementPlan: ImprovementPlan;
    onClose?: () => void;
}

// Status config
const STATUS_CONFIG = {
    Pendiente: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    'En Progreso': { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    Completado: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    Cerrado: { icon: XCircle, color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20' },
};

// Reusable date field
function DatePickerField({
    label,
    field,
    loading,
    icon: Icon,
}: {
    label: string;
    field: any;
    loading: boolean;
    icon?: React.ElementType;
}) {
    return (
        <FormItem className="flex flex-col">
            <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                {label}
            </FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            disabled={loading}
                            className={cn(
                                'w-full pl-3 text-left font-normal h-10 border-border/60 hover:border-border transition-colors',
                                !field.value && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/60 flex-shrink-0" />
                            {field.value
                                ? format(field.value, 'PPP', { locale: es })
                                : <span className="text-sm">Seleccionar fecha</span>
                            }
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}

// Section wrapper
function FormSection({
    title,
    icon: Icon,
    children,
    accent = 'border-border/50',
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    accent?: string;
}) {
    return (
        <div className={`rounded-xl border ${accent} bg-card overflow-hidden`}>
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/50 bg-muted/30">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                </span>
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">{title}</span>
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}

export function ActionPlanForm({ improvementPlan, onClose }: ActionPlanFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const db = useFirestore();
    const [loading, setLoading] = useState(false);

    const form = useForm<ActionPlanFormValues>({
        resolver: zodResolver(actionPlanSchema),
        defaultValues: {
            fechaMedidaImplementada: improvementPlan.fechaMedidaImplementada?.toDate(),
            responsable: improvementPlan.responsable || '',
            fechaSeguimiento1: improvementPlan.fechaSeguimiento1?.toDate(),
            porcentajeCumplimiento: improvementPlan.porcentajeCumplimiento,
            fechaCierre: improvementPlan.fechaCierre?.toDate(),
            porcentajeCumplimientoTotal: improvementPlan.porcentajeCumplimientoTotal,
            cumplimientoEstado: improvementPlan.cumplimientoEstado || 'Pendiente',
            observacion: improvementPlan.observacion || '',
        },
    });

    const watchedStatus = form.watch('cumplimientoEstado') || 'Pendiente';
    const watchedPct = form.watch('porcentajeCumplimiento') ?? 0;
    const watchedPctTotal = form.watch('porcentajeCumplimientoTotal') ?? 0;
    const statusCfg = STATUS_CONFIG[watchedStatus as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.Pendiente;
    const StatusIcon = statusCfg.icon;

    const onSubmit = async (data: ActionPlanFormValues) => {
        if (!db) {
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo conectar con la base de datos.' });
            return;
        }
        setLoading(true);
        try {
            await updateDoc(doc(db, 'improvement_plans', improvementPlan.id), {
                ...data,
                updatedAt: serverTimestamp(),
            });
            toast({ title: 'Plan de acción actualizado', description: 'Los cambios se guardaron correctamente.' });
            if (onClose) onClose();
            else router.push('/dashboard/improvement-plans');
        } catch (error) {
            console.error('Error al actualizar el plan de acción:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el plan de acción.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Header contextual */}
                <div className="rounded-xl border border-border/50 bg-muted/20 px-5 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    <Hash className="w-3 h-3" />
                                    Plan de Acción
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tabular-nums">
                                    #{improvementPlan.numero}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                                {improvementPlan.hallazgo}
                            </p>
                        </div>
                        {/* Live status badge */}
                        <div className={cn(
                            'flex items-center gap-1.5 self-start flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold',
                            statusCfg.bg, statusCfg.color
                        )}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {watchedStatus}
                        </div>
                    </div>
                </div>

                {/* Sección 1: Implementación */}
                <FormSection title="Implementación" icon={ClipboardCheck}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fechaMedidaImplementada"
                            render={({ field }) => (
                                <DatePickerField label="Fecha Medida Implementada" field={field} loading={loading} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="responsable"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Responsable
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                                            <Input
                                                {...field}
                                                disabled={loading}
                                                placeholder="Nombre del responsable"
                                                className="pl-9 border-border/60 h-10"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>

                {/* Sección 2: Seguimiento y Cumplimiento */}
                <FormSection title="Seguimiento y Cumplimiento" icon={TrendingUp} accent="border-blue-500/15">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fechaSeguimiento1"
                            render={({ field }) => (
                                <DatePickerField label="Fecha de Seguimiento 1" field={field} loading={loading} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="porcentajeCumplimiento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        % de Cumplimiento
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                    disabled={loading}
                                                    placeholder="0"
                                                    className="pr-9 border-border/60 h-10 tabular-nums"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/60">%</span>
                                            </div>
                                            {/* Mini progress bar */}
                                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${Math.min(watchedPct, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fechaCierre"
                            render={({ field }) => (
                                <DatePickerField label="Fecha de Cierre" field={field} loading={loading} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="porcentajeCumplimientoTotal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        % de Cumplimiento Total
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                    disabled={loading}
                                                    placeholder="0"
                                                    className="pr-9 border-border/60 h-10 tabular-nums"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/60">%</span>
                                            </div>
                                            {/* Mini progress bar */}
                                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${Math.min(watchedPctTotal, 100)}%`,
                                                        background: watchedPctTotal >= 80 ? '#22c55e' : watchedPctTotal >= 50 ? '#3b82f6' : '#f59e0b'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>

                {/* Sección 3: Estado y Observaciones */}
                <FormSection title="Estado y Observaciones" icon={MessageSquare} accent="border-border/50">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="cumplimientoEstado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Estado del Cumplimiento
                                    </FormLabel>
                                    <FormControl>
                                        {/* Custom radio-style status selector */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                            {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((status) => {
                                                const cfg = STATUS_CONFIG[status];
                                                const SIcon = cfg.icon;
                                                const isSelected = field.value === status;
                                                return (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        disabled={loading}
                                                        onClick={() => field.onChange(status)}
                                                        className={cn(
                                                            'flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-semibold transition-all duration-150',
                                                            isSelected
                                                                ? cn(cfg.bg, cfg.color, 'shadow-sm ring-1', cfg.bg.replace('bg-', 'ring-').replace('/10', '/40'))
                                                                : 'border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/50'
                                                        )}
                                                    >
                                                        <SIcon className={cn('w-4 h-4', isSelected ? cfg.color : 'text-muted-foreground/50')} />
                                                        <span className="leading-tight text-center">{status}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FormControl>
                                    {/* Hidden native select for form compatibility */}
                                    <select {...field} className="sr-only" tabIndex={-1} aria-hidden>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Progreso">En Progreso</option>
                                        <option value="Completado">Completado</option>
                                        <option value="Cerrado">Cerrado</option>
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="observacion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Observación
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={loading}
                                            placeholder="Agrega observaciones finales sobre la implementación del plan..."
                                            rows={4}
                                            className="resize-none border-border/60 text-sm leading-relaxed"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </FormSection>

                {/* Footer actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-1">
                    {onClose && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                            className="border-border/60 text-muted-foreground hover:text-foreground"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-[160px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Guardar Plan de Acción
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}