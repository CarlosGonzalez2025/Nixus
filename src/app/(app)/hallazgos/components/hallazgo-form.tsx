'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import {
    collection, addDoc, updateDoc, doc, serverTimestamp,
    query, orderBy, limit, getDocs,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    CalendarIcon, Loader2, Send,
    ClipboardList, User, CalendarCheck,
    CheckCircle2, Clock, TrendingUp, XCircle,
    AlertTriangle, Timer, Shield, Hash, Camera, CheckSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import type { Hallazgo } from '@/types';

// ─── Schema ────────────────────────────────────────────────────────────────────
const hallazgoSchema = z.object({
    frenteTrabajo: z.string().min(1, 'El frente de trabajo es requerido'),
    centroCosto: z.string().min(1, 'El centro de costo es requerido'),
    area: z.string().min(1, 'El área es requerida'),
    tipoActividad: z.enum(['Rutinario', 'No Rutinario'], { required_error: 'Selecciona el tipo de actividad' }),
    fechaIdentificacion: z.date({ required_error: 'La fecha de identificación es requerida' }),
    peligroInspeccionado: z.string().min(1, 'El peligro inspeccionado es requerido'),
    hallazgo: z.string().min(1, 'La descripción del hallazgo es requerida'),
    evidenciasFotograficas: z.array(z.string()).optional().default([]),
    clase: z.enum(['A', 'B', 'C'], { required_error: 'Selecciona la clase del hallazgo' }),
    intervencion: z.enum(['Inmediata', 'Pronta', 'Posterior'], { required_error: 'Selecciona el tipo de intervención' }),
    descripcion: z.string().min(1, 'La descripción de recomendaciones es requerida'),
    reportadoPorNombre: z.string().min(1, 'El nombre del reportador es requerido'),
    reportadoPorCargo: z.string().min(1, 'El cargo del reportador es requerido'),
    // Plan de acción (opcional)
    fechaMedidaImplementada: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    responsable: z.string().optional(),
    fechaSeguimiento1: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimiento: z.number().min(0).max(100).optional(),
    evidenciasPlanAccion: z.array(z.string()).optional().default([]),
    fechaCierre: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimientoTotal: z.number().min(0).max(100).optional(),
    cumplimientoEstado: z.enum(['Pendiente', 'En Progreso', 'Completado', 'Cerrado']).optional(),
    observacion: z.string().optional(),
});

type FormValues = z.infer<typeof hallazgoSchema>;

interface HallazgoFormProps {
    hallazgo?: Hallazgo;
    isViewMode?: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    Pendiente: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    'En Progreso': { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    Completado: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    Cerrado: { icon: XCircle, color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20' },
};

const CLASE_CONFIG = {
    A: { label: 'Clase A', desc: 'Inmediata', color: 'text-red-600', bg: 'bg-red-500/10 border-red-500/25', icon: AlertTriangle },
    B: { label: 'Clase B', desc: 'Pronta', color: 'text-amber-600', bg: 'bg-amber-500/10 border-amber-500/25', icon: Timer },
    C: { label: 'Clase C', desc: 'Posterior', color: 'text-blue-600', bg: 'bg-blue-500/10 border-blue-500/25', icon: Shield },
};

const Req = ({ children }: { children: React.ReactNode }) => (
    <>{children}<span className="text-red-500 ml-0.5">*</span></>
);

const labelClass = 'text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block';

function DateField({
    label, field, loading, disabled,
}: {
    label: string; field: any; loading: boolean; disabled?: boolean;
}) {
    return (
        <FormItem className="flex flex-col">
            <FormLabel className={labelClass}>{label}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            disabled={loading || disabled}
                            className={cn(
                                'w-full pl-3 text-left font-normal h-10 border-border/60 hover:border-border transition-colors',
                                !field.value && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />
                            {field.value
                                ? format(field.value, 'PPP', { locale: es })
                                : <span className="text-sm">Seleccionar fecha</span>
                            }
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function HallazgoForm({ hallazgo, isViewMode = false }: HallazgoFormProps) {
    const { toast } = useToast();
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [costCenters, setCostCenters] = useState<{ id: string; name: string }[]>([]);

    // Cargar centros de costo
    useEffect(() => {
        if (!db) return;
        getDocs(query(collection(db, 'lists_cost_centers'), orderBy('name', 'asc')))
            .then(snap => setCostCenters(snap.docs.map(d => ({ id: d.id, name: d.data().name }))))
            .catch(() => { /* silencioso */ });
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(hallazgoSchema),
        defaultValues: {
            frenteTrabajo: '',
            centroCosto: '',
            area: '',
            tipoActividad: 'Rutinario',
            fechaIdentificacion: new Date(),
            peligroInspeccionado: '',
            hallazgo: '',
            evidenciasFotograficas: [],
            clase: 'C',
            intervencion: 'Posterior',
            descripcion: '',
            reportadoPorNombre: '',
            reportadoPorCargo: '',
            evidenciasPlanAccion: [],
            cumplimientoEstado: 'Pendiente',
        },
    });

    // Autocompletar nombre y cargo del usuario logueado
    useEffect(() => {
        if (user && !hallazgo) {
            form.setValue('reportadoPorNombre', user.displayName || '');
            form.setValue('reportadoPorCargo', user.area || '');
        }
    }, [user, hallazgo, form]);

    // Cargar datos al editar
    useEffect(() => {
        if (hallazgo) {
            form.reset({
                frenteTrabajo: hallazgo.frenteTrabajo,
                centroCosto: hallazgo.centroCosto,
                area: hallazgo.area,
                tipoActividad: hallazgo.tipoActividad,
                fechaIdentificacion: hallazgo.fechaIdentificacion.toDate(),
                peligroInspeccionado: hallazgo.peligroInspeccionado,
                hallazgo: hallazgo.hallazgo,
                evidenciasFotograficas: hallazgo.evidenciasFotograficas || [],
                clase: hallazgo.clase,
                intervencion: hallazgo.intervencion,
                descripcion: hallazgo.descripcion,
                reportadoPorNombre: hallazgo.reportadoPorNombre,
                reportadoPorCargo: hallazgo.reportadoPorCargo,
                fechaMedidaImplementada: hallazgo.fechaMedidaImplementada?.toDate(),
                responsable: hallazgo.responsable,
                fechaSeguimiento1: hallazgo.fechaSeguimiento1?.toDate(),
                porcentajeCumplimiento: hallazgo.porcentajeCumplimiento,
                evidenciasPlanAccion: hallazgo.evidenciasPlanAccion || [],
                fechaCierre: hallazgo.fechaCierre?.toDate(),
                porcentajeCumplimientoTotal: hallazgo.porcentajeCumplimientoTotal,
                cumplimientoEstado: hallazgo.cumplimientoEstado,
                observacion: hallazgo.observacion,
            });
        }
    }, [hallazgo, form]);

    // Auto-guardado de borrador
    useEffect(() => {
        if (hallazgo || isViewMode) return;
        const draft = localStorage.getItem('draft_hallazgo');
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                if (parsed.fechaIdentificacion) parsed.fechaIdentificacion = new Date(parsed.fechaIdentificacion);
                if (parsed.fechaMedidaImplementada) parsed.fechaMedidaImplementada = new Date(parsed.fechaMedidaImplementada);
                if (parsed.fechaSeguimiento1) parsed.fechaSeguimiento1 = new Date(parsed.fechaSeguimiento1);
                if (parsed.fechaCierre) parsed.fechaCierre = new Date(parsed.fechaCierre);
                if (!Array.isArray(parsed.evidenciasFotograficas)) parsed.evidenciasFotograficas = [];
                if (!Array.isArray(parsed.evidenciasPlanAccion)) parsed.evidenciasPlanAccion = [];
                form.reset(parsed);
                toast({ title: 'Borrador recuperado', description: 'Se restauraron los datos guardados.', duration: 4000 });
            } catch { /* ignorar */ }
        }
    }, [hallazgo, isViewMode, form, toast]);

    useEffect(() => {
        if (hallazgo || isViewMode) return;
        const sub = form.watch((value) => {
            localStorage.setItem('draft_hallazgo', JSON.stringify(value));
        });
        return () => sub.unsubscribe();
    }, [hallazgo, isViewMode, form]);

    const watchedClase = form.watch('clase');
    const watchedPct = form.watch('porcentajeCumplimiento') ?? 0;
    const watchedPctTotal = form.watch('porcentajeCumplimientoTotal') ?? 0;

    const onSubmit = async (data: FormValues) => {
        if (!db || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo obtener la información de sesión.' });
            return;
        }
        setLoading(true);

        // Firestore no acepta undefined — eliminar campos opcionales sin valor
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([, v]) => v !== undefined)
        );

        try {
            if (hallazgo) {
                await updateDoc(doc(db, 'hallazgos', hallazgo.id), {
                    ...cleanData, updatedAt: serverTimestamp(),
                });
                toast({ title: 'Hallazgo actualizado', description: 'Los cambios se guardaron correctamente.' });
                router.push('/hallazgos');
            } else {
                const snap = await getDocs(query(collection(db, 'hallazgos'), orderBy('numero', 'desc'), limit(1)));
                const lastNumero = snap.docs[0]?.data().numero || 0;
                const nextNumero = lastNumero + 1;
                await addDoc(collection(db, 'hallazgos'), {
                    ...cleanData,
                    numero: nextNumero,
                    empresaId: user.empresa || '',
                    createdBy: user.uid,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
                toast({ title: 'Hallazgo creado', description: `Hallazgo #${nextNumero} registrado correctamente.` });
                localStorage.removeItem('draft_hallazgo');
                router.push('/hallazgos');
            }
        } catch (error) {
            console.error('Error al guardar el hallazgo:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el hallazgo.' });
        } finally {
            setLoading(false);
        }
    };

    const submitLabel = hallazgo ? 'Actualizar Hallazgo' : 'Registrar Hallazgo';

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Botón guardar superior (solo en crear) */}
                {!isViewMode && !hallazgo && (
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading} className="min-w-[160px] h-9">
                            {loading
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
                                : <><Send className="mr-2 h-4 w-4" />{submitLabel}</>
                            }
                        </Button>
                    </div>
                )}

                {/* Número de hallazgo cuando se edita */}
                {hallazgo && (
                    <div className="rounded-xl border border-border/50 bg-muted/20 px-5 py-3.5 flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                            <Hash className="w-3.5 h-3.5 text-primary" />
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hallazgo</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tabular-nums">
                            #{hallazgo.numero}
                        </span>
                        <span className="ml-auto text-sm font-medium text-foreground line-clamp-1">{hallazgo.hallazgo}</span>
                    </div>
                )}

                <Accordion type="multiple" defaultValue={['general', 'evidencia', 'clasificacion', 'reportado']} className="space-y-3">

                    {/* 1. INFORMACIÓN GENERAL */}
                    <AccordionItem value="general" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10">
                                    <ClipboardList className="w-3.5 h-3.5 text-blue-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Información General</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="frenteTrabajo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Frente de Trabajo</Req></FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={loading || isViewMode} placeholder="Ej: Torre 1" className="h-10 border-border/60" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="centroCosto" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Centro de Costo</Req></FormLabel>
                                        <FormControl>
                                            {costCenters.length > 0 ? (
                                                <Select value={field.value} onValueChange={field.onChange} disabled={loading || isViewMode}>
                                                    <SelectTrigger className="h-10 border-border/60">
                                                        <SelectValue placeholder="Seleccione un centro de costo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {costCenters.map(cc => (
                                                            <SelectItem key={cc.id} value={cc.name}>{cc.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input {...field} disabled={loading || isViewMode} placeholder="Centro de costo" className="h-10 border-border/60" />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="area" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Área</Req></FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={loading || isViewMode} placeholder="Ej: Construcción" className="h-10 border-border/60" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="tipoActividad" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Tipo de Actividad</Req></FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(['Rutinario', 'No Rutinario'] as const).map(opt => (
                                                    <button key={opt} type="button"
                                                        disabled={loading || isViewMode}
                                                        onClick={() => field.onChange(opt)}
                                                        className={cn(
                                                            'h-10 rounded-lg border text-xs font-semibold transition-all duration-150',
                                                            field.value === opt
                                                                ? 'border-primary/40 bg-primary/10 text-primary'
                                                                : 'border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50'
                                                        )}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <select {...form.register('tipoActividad')} className="sr-only" tabIndex={-1} aria-hidden>
                                            <option value="Rutinario">Rutinario</option>
                                            <option value="No Rutinario">No Rutinario</option>
                                        </select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="fechaIdentificacion" render={({ field }) => (
                                    <DateField label="Fecha de Identificación *" field={field} loading={loading} disabled={isViewMode} />
                                )} />

                                <FormField control={form.control} name="peligroInspeccionado" render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel className={labelClass}><Req>Peligro Inspeccionado</Req></FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={loading || isViewMode}
                                                placeholder="Describe el peligro identificado..."
                                                rows={3} className="resize-none border-border/60 text-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. EVIDENCIA DEL HALLAZGO */}
                    <AccordionItem value="evidencia" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-violet-500/10">
                                    <Camera className="w-3.5 h-3.5 text-violet-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Evidencia del Hallazgo</span>
                                <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">ANTES</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4 space-y-4">
                            {/* Fotos de evidencia */}
                            <FormField control={form.control} name="evidenciasFotograficas" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>Evidencias Fotográficas</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            folder="hallazgos/evidencias"
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            disabled={loading || isViewMode}
                                            label="Subir fotos del hallazgo"
                                            maxFiles={8}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Descripción */}
                            <FormField control={form.control} name="hallazgo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}><Req>Descripción del Hallazgo</Req></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={loading || isViewMode}
                                            placeholder="Describe detalladamente el hallazgo identificado..."
                                            rows={4} className="resize-none border-border/60 text-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. CLASIFICACIÓN */}
                    <AccordionItem value="clasificacion" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/10">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Clasificación del Hallazgo</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4 space-y-4">
                            <FormItem>
                                <FormLabel className={labelClass}><Req>Clasificación y Prioridad</Req></FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-3 gap-2.5">
                                        {(Object.entries(CLASE_CONFIG) as [keyof typeof CLASE_CONFIG, typeof CLASE_CONFIG['A']][]).map(([key, cfg]) => {
                                            const CIcon = cfg.icon;
                                            const isSelected = watchedClase === key;
                                            return (
                                                <button key={key} type="button"
                                                    disabled={loading || isViewMode}
                                                    onClick={() => {
                                                        const interventionMap = { A: 'Inmediata', B: 'Pronta', C: 'Posterior' } as const;
                                                        form.setValue('clase', key, { shouldValidate: true });
                                                        form.setValue('intervencion', interventionMap[key], { shouldValidate: true });
                                                    }}
                                                    className={cn(
                                                        'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-150',
                                                        isSelected
                                                            ? cn(cfg.bg, cfg.color, 'shadow-sm')
                                                            : 'border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/50'
                                                    )}>
                                                    <CIcon className={cn('w-4 h-4', isSelected ? cfg.color : 'text-muted-foreground/40')} />
                                                    <span className="text-xs font-bold leading-none">{cfg.label}</span>
                                                    <span className="text-[10px] leading-none opacity-70">{cfg.desc}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </FormControl>
                                <select {...form.register('clase')} className="sr-only" tabIndex={-1} aria-hidden>
                                    <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                                </select>
                                <select {...form.register('intervencion')} className="sr-only" tabIndex={-1} aria-hidden>
                                    <option value="Inmediata">Inmediata</option>
                                    <option value="Pronta">Pronta</option>
                                    <option value="Posterior">Posterior</option>
                                </select>
                                {(form.formState.errors.clase || form.formState.errors.intervencion) && (
                                    <p className="text-sm font-medium text-destructive mt-1">Selecciona la clasificación</p>
                                )}
                            </FormItem>

                            <FormField control={form.control} name="descripcion" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}><Req>Detalle de Recomendaciones</Req></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={loading || isViewMode}
                                            placeholder="Detalla las recomendaciones o acciones correctivas..."
                                            rows={4} className="resize-none border-border/60 text-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. REPORTADO POR */}
                    <AccordionItem value="reportado" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-500/10">
                                    <User className="w-3.5 h-3.5 text-slate-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Reportado Por</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="reportadoPorNombre" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Nombre Completo</Req></FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={loading || isViewMode} placeholder="Nombre del reportador" className="h-10 border-border/60" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="reportadoPorCargo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Cargo</Req></FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={loading || isViewMode} placeholder="Cargo del reportador" className="h-10 border-border/60" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 5. PLAN DE ACCIÓN */}
                    <AccordionItem value="accion" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/10">
                                    <CalendarCheck className="w-3.5 h-3.5 text-emerald-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Plan de Acción</span>
                                <span className="text-[10px] font-semibold text-muted-foreground border border-border/60 rounded-full px-2 py-0.5 bg-muted/40">Opcional</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="fechaMedidaImplementada" render={({ field }) => (
                                    <DateField label="Fecha Medida Implementada" field={field} loading={loading} disabled={isViewMode} />
                                )} />

                                <FormField control={form.control} name="responsable" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>Responsable</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                                                <Input {...field} disabled={loading || isViewMode}
                                                    placeholder="Nombre del responsable"
                                                    className="pl-9 h-10 border-border/60" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="fechaSeguimiento1" render={({ field }) => (
                                    <DateField label="Fecha de Seguimiento" field={field} loading={loading} disabled={isViewMode} />
                                )} />

                                <FormField control={form.control} name="porcentajeCumplimiento" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>% de Cumplimiento</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <Input type="number" min="0" max="100" {...field}
                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                        disabled={loading || isViewMode} placeholder="0"
                                                        className="pr-9 h-10 border-border/60 tabular-nums" />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/60">%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                    <div className="h-full rounded-full bg-blue-500 transition-all duration-300"
                                                        style={{ width: `${Math.min(watchedPct, 100)}%` }} />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Evidencias del plan de acción — fotos "después" */}
                            <FormField control={form.control} name="evidenciasPlanAccion" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>
                                        <span className="flex items-center gap-1.5">
                                            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                                            Evidencias del Plan de Acción
                                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-1">DESPUÉS</span>
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            folder="hallazgos/plan-accion"
                                            value={field.value || []}
                                            onChange={field.onChange}
                                            disabled={loading || isViewMode}
                                            label="Subir fotos de la solución implementada"
                                            maxFiles={8}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* Fila cierre */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="fechaCierre" render={({ field }) => (
                                    <DateField label="Fecha de Cierre" field={field} loading={loading} disabled={isViewMode} />
                                )} />

                                <FormField control={form.control} name="porcentajeCumplimientoTotal" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>% de Cumplimiento Total</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <Input type="number" min="0" max="100" {...field}
                                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                        disabled={loading || isViewMode} placeholder="0"
                                                        className="pr-9 h-10 border-border/60 tabular-nums" />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/60">%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                    <div className="h-full rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${Math.min(watchedPctTotal, 100)}%`,
                                                            background: watchedPctTotal >= 80 ? '#22c55e' : watchedPctTotal >= 50 ? '#3b82f6' : '#f59e0b',
                                                        }} />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Estado del cumplimiento */}
                            <FormField control={form.control} name="cumplimientoEstado" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>Estado del Cumplimiento</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                            {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((status) => {
                                                const cfg = STATUS_CONFIG[status];
                                                const SIcon = cfg.icon;
                                                const isSelected = field.value === status;
                                                return (
                                                    <button key={status} type="button"
                                                        disabled={loading || isViewMode}
                                                        onClick={() => field.onChange(status)}
                                                        className={cn(
                                                            'flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-semibold transition-all duration-150',
                                                            isSelected
                                                                ? cn(cfg.bg, cfg.color, 'shadow-sm')
                                                                : 'border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/50'
                                                        )}>
                                                        <SIcon className={cn('w-4 h-4', isSelected ? cfg.color : 'text-muted-foreground/50')} />
                                                        <span className="leading-tight text-center">{status}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FormControl>
                                    <select {...field} className="sr-only" tabIndex={-1} aria-hidden>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Progreso">En Progreso</option>
                                        <option value="Completado">Completado</option>
                                        <option value="Cerrado">Cerrado</option>
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="observacion" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>Observación</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={loading || isViewMode}
                                            placeholder="Agrega observaciones sobre la implementación del plan..."
                                            rows={4} className="resize-none border-border/60 text-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>

                {/* Footer submit */}
                {!isViewMode && (
                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={loading} className="min-w-[180px]">
                            {loading
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
                                : <><Send className="mr-2 h-4 w-4" />{submitLabel}</>
                            }
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
}
