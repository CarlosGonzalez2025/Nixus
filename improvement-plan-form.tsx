"use client";

import { useEffect, useState } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser, useDoc, useCollection } from '@/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    CalendarIcon, Loader2, Send, Trash, FileText, ArrowLeft,
    ClipboardList, Camera, Tag, Lightbulb, User, CalendarCheck,
    CheckCircle2, Clock, TrendingUp, XCircle, AlertTriangle,
    Shield, Timer
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ImprovementPlan } from '@/types/improvement-plan';

// ─── Schema ────────────────────────────────────────────────────────────────────
const improvementPlanSchema = z.object({
    frenteTrabajo: z.string().min(1, 'El frente de trabajo es requerido'),
    centroCosto: z.string().min(1, 'El centro de costo es requerido'),
    area: z.string().min(1, 'El área es requerida'),
    tipoActividad: z.enum(['Rutinario', 'No Rutinario'], { required_error: 'Selecciona el tipo de actividad' }),
    fechaIdentificacion: z.date({ required_error: 'La fecha de identificación es requerida' }),
    peligroInspeccionado: z.string().min(1, 'El peligro inspeccionado es requerido'),
    evidenciasFotograficas: z.array(z.string().url()).min(1, 'Debe agregar al menos una evidencia fotográfica'),
    hallazgo: z.string().min(1, 'La descripción del hallazgo es requerida'),
    clase: z.enum(['A', 'B', 'C'], { required_error: 'Selecciona la clase del hallazgo' }),
    intervencion: z.enum(['Inmediata', 'Pronta', 'Posterior'], { required_error: 'Selecciona el tipo de intervención' }),
    descripcion: z.string().min(1, 'La descripción es requerida'),
    imagenesApoyo: z.array(z.string().url()).optional().default([]),
    reportadoPorNombre: z.string().min(1, 'El nombre del reportador es requerido'),
    reportadoPorCargo: z.string().min(1, 'El cargo del reportador es requerido'),
    fechaMedidaImplementada: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    responsable: z.string().optional(),
    fechaSeguimiento1: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimiento: z.number().min(0).max(100).optional(),
    fechaCierre: z.date({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimientoTotal: z.number().min(0).max(100).optional(),
    cumplimientoEstado: z.enum(['Pendiente', 'En Progreso', 'Completado', 'Cerrado']).optional(),
    observacion: z.string().optional(),
});

type FormValues = z.infer<typeof improvementPlanSchema>;

interface ImprovementPlanFormProps {
    improvementPlan?: ImprovementPlan;
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

// Label with required asterisk
const Req = ({ children }: { children: React.ReactNode }) => (
    <>{children}<span className="text-red-500 ml-0.5">*</span></>
);

// Shared label style
const labelClass = "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block";

// Date picker field
function DateField({ label, field, loading, disabled }: { label: string; field: any; loading: boolean; disabled?: boolean }) {
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



// File list item
function FileItem({ url, index, label, onRemove }: { url: string; index: number; label: string; onRemove?: () => void }) {
    const isPdf = url.toLowerCase().endsWith('.pdf');
    return (
        <div className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 bg-muted/20">
            {isPdf
                ? <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-red-500" />
                </div>
                : <img src={url} alt={`${label} ${index + 1}`} className="w-10 h-10 object-cover rounded-lg border border-border/50 flex-shrink-0" />
            }
            <a href={url} target="_blank" rel="noopener noreferrer"
                className="flex-1 text-xs font-medium text-primary hover:underline truncate">
                {label} {index + 1}
            </a>
            {onRemove && (
                <button type="button" onClick={onRemove}
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash className="h-3.5 w-3.5" />
                </button>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function ImprovementPlanForm({ improvementPlan, isViewMode = false }: ImprovementPlanFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const db = useFirestore();
    const { user } = useUser();
    const { data: userProfile } = useDoc<any>(user ? 'users' : null, user ? user.uid : null);
    const [loading, setLoading] = useState(false);

    // Fetch master list for Centros de Costo
    const costCentersQuery = query(collection(db || ({} as any), 'lists_cost_centers'), orderBy('name', 'asc'));
    const { data: costCentersData, loading: loadingCostCenters } = useCollection<{ id: string, name: string, active: boolean }>(db ? (costCentersQuery as any) : null);
    const costCenters = costCentersData || [];

    const form = useForm<FormValues>({
        resolver: zodResolver(improvementPlanSchema),
        defaultValues: {
            frenteTrabajo: '', centroCosto: '', area: '',
            tipoActividad: 'Rutinario',
            fechaIdentificacion: new Date(),
            peligroInspeccionado: '',
            evidenciasFotograficas: [],
            hallazgo: '', clase: 'C', intervencion: 'Posterior', descripcion: '',
            imagenesApoyo: [], reportadoPorNombre: '', reportadoPorCargo: '',
            cumplimientoEstado: 'Pendiente',
        },
    });

    useEffect(() => {
        if (userProfile && !improvementPlan) {
            form.setValue('reportadoPorNombre', userProfile.nombre || '');
            form.setValue('reportadoPorCargo', userProfile.cargo || '');
        }
    }, [userProfile, improvementPlan, form]);

    useEffect(() => {
        if (improvementPlan) {
            form.reset({
                frenteTrabajo: improvementPlan.frenteTrabajo,
                centroCosto: improvementPlan.centroCosto,
                area: improvementPlan.area,
                tipoActividad: improvementPlan.tipoActividad,
                fechaIdentificacion: improvementPlan.fechaIdentificacion.toDate(),
                peligroInspeccionado: improvementPlan.peligroInspeccionado,
                evidenciasFotograficas: improvementPlan.evidenciasFotograficas,
                hallazgo: improvementPlan.hallazgo,
                clase: improvementPlan.clase,
                intervencion: improvementPlan.intervencion,
                descripcion: improvementPlan.descripcion,
                imagenesApoyo: improvementPlan.imagenesApoyo || [],
                reportadoPorNombre: improvementPlan.reportadoPorNombre,
                reportadoPorCargo: improvementPlan.reportadoPorCargo,
                fechaMedidaImplementada: improvementPlan.fechaMedidaImplementada?.toDate(),
                responsable: improvementPlan.responsable,
                fechaSeguimiento1: improvementPlan.fechaSeguimiento1?.toDate(),
                porcentajeCumplimiento: improvementPlan.porcentajeCumplimiento,
                fechaCierre: improvementPlan.fechaCierre?.toDate(),
                porcentajeCumplimientoTotal: improvementPlan.porcentajeCumplimientoTotal,
                cumplimientoEstado: improvementPlan.cumplimientoEstado,
                observacion: improvementPlan.observacion,
            });
        }
    }, [improvementPlan, form]);

    // Auto-Guardado: Recuperación de borrador local
    useEffect(() => {
        if (improvementPlan || isViewMode) return;
        const draft = localStorage.getItem('draft_improvement_plan');
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                if (parsed.fechaIdentificacion) parsed.fechaIdentificacion = new Date(parsed.fechaIdentificacion);
                if (parsed.fechaMedidaImplementada) parsed.fechaMedidaImplementada = new Date(parsed.fechaMedidaImplementada);
                if (parsed.fechaSeguimiento1) parsed.fechaSeguimiento1 = new Date(parsed.fechaSeguimiento1);
                if (parsed.fechaCierre) parsed.fechaCierre = new Date(parsed.fechaCierre);
                
                form.reset(parsed);
                toast({ title: 'Borrador recuperado', description: 'Se han restaurado los datos que estabas ingresando.', duration: 5000 });
            } catch (e) {
                console.error("Error cargando el borrador", e);
            }
        }
    }, [improvementPlan, isViewMode, form, toast]);

    // Auto-Guardado: Guardar cambios al vuelo
    useEffect(() => {
        if (improvementPlan || isViewMode) return;
        const subscription = form.watch((value) => {
            localStorage.setItem('draft_improvement_plan', JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [improvementPlan, isViewMode, form]);

    const onSubmit = async (data: FormValues) => {
        if (!db || !user || !userProfile?.empresa) {
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo obtener la información del usuario.' });
            return;
        }
        setLoading(true);
        try {
            if (improvementPlan) {
                await updateDoc(doc(db, 'improvement_plans', improvementPlan.id), { ...data, updatedAt: serverTimestamp() });
                toast({ title: 'Plan actualizado', description: 'El plan de mejora se actualizó correctamente.' });
            } else {
                const q = query(collection(db, 'improvement_plans'), orderBy('numero', 'desc'), limit(1));
                const snapshot = await getDocs(q);
                const lastNumero = snapshot.docs[0]?.data().numero || 0;
                const nextNumero = lastNumero + 1;
                await addDoc(collection(db, 'improvement_plans'), {
                    ...data, numero: nextNumero, empresaId: userProfile.empresa,
                    createdBy: user.uid, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
                });
                toast({ title: 'Plan creado', description: `Plan de mejora #${nextNumero} creado correctamente.` });
                localStorage.removeItem('draft_improvement_plan');

                // Notificación por correo (no bloqueante)
                if (user?.email) {
                    try {
                        // Obtener emails de líderes SST, admins y super admins
                        const notifRoles = ['lider_sst', 'admin', 'admin_chec'];
                        const usersSnap = await getDocs(
                            query(collection(db, 'users'), where('empresa', '==', userProfile.empresa), where('role', 'in', notifRoles))
                        );
                        const roleEmails = usersSnap.docs
                            .map(d => d.data().email as string)
                            .filter(Boolean);

                        fetch('/api/emails/improvement-plan-alert', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                registradorEmail: user.email,
                                registradorNombre: data.reportadoPorNombre,
                                planNumero: nextNumero,
                                centroCosto: data.centroCosto,
                                frenteTrabajo: data.frenteTrabajo,
                                area: data.area,
                                hallazgo: data.hallazgo,
                                clase: data.clase,
                                intervencion: data.intervencion,
                                destinatarios: roleEmails,
                            }),
                        }).catch(e => console.error('Error enviando notificación de plan de mejora:', e));
                    } catch (e) {
                        console.error('Error obteniendo destinatarios para notificación:', e);
                    }
                }
            }
            router.push('/dashboard/improvement-plans');
        } catch (error) {
            console.error('Error al guardar el plan:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el plan de mejora.' });
        } finally {
            setLoading(false);
        }
    };

    const watchedStatus = form.watch('cumplimientoEstado') || 'Pendiente';
    const watchedClase = form.watch('clase');
    const watchedPct = form.watch('porcentajeCumplimiento') ?? 0;
    const watchedPctTotal = form.watch('porcentajeCumplimientoTotal') ?? 0;

    const submitLabel = improvementPlan ? 'Actualizar Plan' : 'Crear Plan';

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* ── Top nav bar ── */}
                <div className="flex items-center justify-between gap-3">
                    <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-0 hover:bg-transparent">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Volver</span>
                    </Button>

                    {!isViewMode && (
                        <Button type="submit" disabled={loading} className="min-w-[140px] h-9">
                            {loading
                                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</>
                                : <><Send className="mr-2 h-4 w-4" />{submitLabel}</>
                            }
                        </Button>
                    )}
                </div>

                {/* ── Accordion ── */}
                <Accordion type="multiple" defaultValue={['general', 'evidencia', 'clasificacion', 'reportado']} className="space-y-3">

                    {/* ── 1. INFORMACIÓN GENERAL ── */}
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
                                            <Select value={field.value} onValueChange={field.onChange} disabled={loading || isViewMode || loadingCostCenters}>
                                                <SelectTrigger className="h-10 border-border/60">
                                                    <SelectValue placeholder={loadingCostCenters ? "Cargando..." : "Seleccione un centro de costo"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {costCenters.map(cc => (
                                                        <SelectItem key={cc.id} value={cc.name}>{cc.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
                                            {/* Visual toggle */}
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
                                        <select {...field} className="sr-only" tabIndex={-1} aria-hidden>
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

                    {/* ── 2. EVIDENCIA DEL HALLAZGO ── */}
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
                            <FormField control={form.control} name="evidenciasFotograficas" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}><Req>Evidencia Fotográfica</Req></FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            {field.value?.length > 0 && (
                                                <div className="space-y-2">
                                                    {field.value.map((url, index) => (
                                                        <FileItem key={index} url={url} index={index} label="Evidencia"
                                                            onRemove={!isViewMode && !loading ? () => field.onChange(field.value.filter((_, i) => i !== index)) : undefined} />
                                                    ))}
                                                </div>
                                            )}
                                            {!isViewMode && (
                                                <FileUpload disabled={loading} value=""
                                                    onChange={(url) => { if (url) field.onChange([...field.value, url]); }}
                                                    folder="improvement-plans/evidencias"
                                                    label={field.value.length === 0 ? 'Subir Primera Evidencia' : '+ Agregar Más Evidencia'} />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="hallazgo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}><Req>Descripción del Hallazgo</Req></FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={loading || isViewMode}
                                            placeholder="Describe el hallazgo identificado..."
                                            rows={4} className="resize-none border-border/60 text-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* ── 3. CLASIFICACIÓN ── */}
                    <AccordionItem value="clasificacion" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/10">
                                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Clasificación del Hallazgo</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4 space-y-4">
                            {/* Clase visual selector */}
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
                                                        isSelected ? cn(cfg.bg, cfg.color, 'shadow-sm') : 'border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/50'
                                                    )}>
                                                    <CIcon className={cn('w-4 h-4', isSelected ? cfg.color : 'text-muted-foreground/40')} />
                                                    <span className="text-xs font-bold leading-none">{cfg.label}</span>
                                                    <span className="text-[10px] leading-none opacity-70">{cfg.desc}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </FormControl>
                                {/* Hidden selects for RHF compatibility */}
                                <select {...form.register('clase')} className="sr-only" tabIndex={-1} aria-hidden>
                                    <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                                </select>
                                <select {...form.register('intervencion')} className="sr-only" tabIndex={-1} aria-hidden>
                                    <option value="Inmediata">Inmediata</option><option value="Pronta">Pronta</option><option value="Posterior">Posterior</option>
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
                                            placeholder="Detalle de recomendaciones..."
                                            rows={4} className="resize-none border-border/60 text-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* ── 4. RECOMENDACIONES ── */}
                    <AccordionItem value="recomendaciones" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/10">
                                    <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Recomendaciones</span>
                                <span className="text-[10px] font-semibold text-muted-foreground border border-border/60 rounded-full px-2 py-0.5 bg-muted/40">Opcional</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-t-0 border-border/50 rounded-b-xl bg-card px-4 sm:px-5 pb-5 pt-4">
                            <FormField control={form.control} name="imagenesApoyo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>Imagen de Apoyo</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            {field.value?.length > 0 && (
                                                <div className="space-y-2">
                                                    {field.value.map((url, index) => (
                                                        <FileItem key={index} url={url} index={index} label="Imagen de apoyo"
                                                            onRemove={!isViewMode && !loading ? () => field.onChange(field.value!.filter((_, i) => i !== index)) : undefined} />
                                                    ))}
                                                </div>
                                            )}
                                            {!isViewMode && (
                                                <FileUpload disabled={loading} value=""
                                                    onChange={(url) => { if (url) field.onChange([...(field.value || []), url]); }}
                                                    folder="improvement-plans/apoyo"
                                                    label={!field.value?.length ? 'Subir Primera Imagen' : '+ Agregar Más Imágenes'} />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* ── 5. REPORTADO POR ── */}
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

                    {/* ── 6. PLAN DE ACCIÓN ── */}
                    <AccordionItem value="accion" className="border-0">
                        <AccordionTrigger className="rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0">
                            <div className="flex items-center gap-2.5">
                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                                    <CalendarCheck className="w-3.5 h-3.5 text-primary" />
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
                                                <Input {...field} disabled={loading || isViewMode} placeholder="Nombre del responsable" className="pl-9 h-10 border-border/60" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="fechaSeguimiento1" render={({ field }) => (
                                    <DateField label="Fecha de Seguimiento 1" field={field} loading={loading} disabled={isViewMode} />
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
                                                            background: watchedPctTotal >= 80 ? '#22c55e' : watchedPctTotal >= 50 ? '#3b82f6' : '#f59e0b'
                                                        }} />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Estado — visual radio buttons */}
                                <FormField control={form.control} name="cumplimientoEstado" render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel className={labelClass}>Estado del Cumplimiento</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map(status => {
                                                    const cfg = STATUS_CONFIG[status];
                                                    const SIcon = cfg.icon;
                                                    const isSelected = field.value === status;
                                                    return (
                                                        <button key={status} type="button"
                                                            disabled={loading || isViewMode}
                                                            onClick={() => field.onChange(status)}
                                                            className={cn(
                                                                'flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-semibold transition-all duration-150',
                                                                isSelected ? cn(cfg.bg, cfg.color) : 'border-border/50 text-muted-foreground bg-muted/20 hover:bg-muted/50'
                                                            )}>
                                                            <SIcon className={cn('w-4 h-4', isSelected ? cfg.color : 'text-muted-foreground/40')} />
                                                            <span className="leading-tight text-center">{status}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </FormControl>
                                        <select {...field} className="sr-only" tabIndex={-1} aria-hidden>
                                            <option value="">-</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En Progreso">En Progreso</option>
                                            <option value="Completado">Completado</option>
                                            <option value="Cerrado">Cerrado</option>
                                        </select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="observacion" render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel className={labelClass}>Observación</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={loading || isViewMode}
                                                placeholder="Observaciones finales sobre la implementación del plan..."
                                                rows={4} className="resize-none border-border/60 text-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* ── Bottom submit ── */}
                {!isViewMode && (
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-1 pb-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}
                            className="border-border/60 text-muted-foreground hover:text-foreground">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="min-w-[150px]">
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