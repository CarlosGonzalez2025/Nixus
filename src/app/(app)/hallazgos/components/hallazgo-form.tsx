'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { SignaturePad } from '@/components/ui/signature-pad';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import {
    collection, addDoc, updateDoc, doc, serverTimestamp, deleteField,
    query, orderBy, limit, getDocs, onSnapshot,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    CalendarIcon, Loader2, Send,
    ClipboardList, User, CalendarCheck,
    CheckCircle2, Clock, TrendingUp,
    AlertTriangle, Timer, Shield, Hash, Camera, CheckSquare,
    Plus, X, MapPin, Building2, Factory, Layers,
    Navigation, WifiOff, PenLine, CheckCircle, Check,
    ThumbsUp, Repeat, Network, UserCog, Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import type { Hallazgo } from '@/types';
import { HALLAZGO_PELIGRO_OPTIONS, HALLAZGO_PERSONAL_EXPUESTO_OPTIONS } from '@/types';
import { addListItem } from '@/app/(app)/admin/lists/actions';
import { notifyHallazgoCreated } from '../actions';

// ─── Schema ────────────────────────────────────────────────────────────────────
const geoSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    accuracy: z.number().optional(),
});

// Campo de fecha robusto: el autoguardado de borrador serializa con JSON.stringify,
// que convierte los Date a string ISO. Si ese string llega a validación, date-fns lo
// formatea bien (muestra la fecha) pero z.date() lo rechaza por no ser un objeto Date,
// produciendo el error "fecha requerida" aunque la fecha SÍ se vea seleccionada.
// z.preprocess convierte string/number → Date antes de validar, eliminando esa
// inconsistencia sin perder el mensaje de requerido para undefined.
const dateField = (opts?: { required_error?: string; invalid_type_error?: string }) =>
    z.preprocess(
        (v) => (typeof v === 'string' || typeof v === 'number') ? new Date(v) : v,
        z.date(opts),
    );

// Un seguimiento del plan de acción. Se pueden registrar varios por hallazgo.
const seguimientoSchema = z.object({
    fecha: dateField({ required_error: 'La fecha del seguimiento es requerida' }),
    porcentaje: z.number().min(0).max(100).optional(),
    observacion: z.string().optional(),
    evidencias: z.array(z.string()).optional().default([]),
});

const hallazgoSchema = z.object({
    empresa: z.string().min(1, 'La empresa es requerida'),
    planta: z.string().min(1, 'La planta es requerida'),
    area: z.string().min(1, 'El área es requerida'),
    tipoActividad: z.enum(['Rutinario', 'No Rutinario'], { required_error: 'Selecciona el tipo de actividad' }),
    responsabilidad: z.enum(['Directa', 'Corporativa'], { required_error: 'Selecciona la responsabilidad' }),
    tipoHallazgo: z.enum(['Positivo', 'Seguimiento'], { required_error: 'Selecciona el tipo de hallazgo' }),
    fechaVisita: dateField({ required_error: 'La fecha de visita es requerida' }),
    geolocalizacion: geoSchema.refine(v => v !== null && v !== undefined, {
        message: 'La geolocalización es requerida',
    }),
    peligroInspeccionado: z.string().min(1, 'El peligro inspeccionado es requerido'),
    personalExpuesto: z.string().min(1, 'El personal expuesto es requerido'),
    hallazgo: z.string().min(1, 'La descripción del hallazgo es requerida'),
    evidenciasFotograficas: z.array(z.string()).optional().default([]),
    clase: z.enum(['A', 'B', 'C'], { required_error: 'Selecciona la clase del hallazgo' }),
    intervencion: z.enum(['Inmediata', 'Pronta', 'Posterior'], { required_error: 'Selecciona el tipo de intervención' }),
    descripcion: z.string().min(1, 'La descripción de recomendaciones es requerida'),
    accionInmediata: z.string().optional(),
    reportadoPorNombre: z.string().min(1, 'El nombre del reportador es requerido'),
    reportadoPorCargo: z.string().min(1, 'El cargo del reportador es requerido'),
    firmaReportador: z.string().optional(),
    firmaResponsable: z.string().optional(),
    // Plan de acción (opcional)
    fechaMedidaImplementada: dateField({ invalid_type_error: 'Fecha inválida' }).optional(),
    responsable: z.string().optional(),
    // Varios seguimientos. Los campos legacy fechaSeguimiento1 / porcentajeCumplimiento
    // se derivan de este arreglo al guardar (ver onSubmit).
    seguimientos: z.array(seguimientoSchema).optional().default([]),
    evidenciasPlanAccion: z.array(z.string()).optional().default([]),
    fechaCierre: dateField({ invalid_type_error: 'Fecha inválida' }).optional(),
    porcentajeCumplimientoTotal: z.number().min(0).max(100).optional(),
    cumplimientoEstado: z.enum(['Pendiente', 'En Progreso', 'Cerrado']).optional(),
    observacion: z.string().optional(),
});

type FormValues = z.infer<typeof hallazgoSchema>;
type SeguimientoValues = z.infer<typeof seguimientoSchema>;

interface HallazgoFormProps {
    hallazgo?: Hallazgo;
    isViewMode?: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    Pendiente: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
    'En Progreso': { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    Cerrado: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
};

const CLASE_CONFIG = {
    A: { label: 'Clase A', desc: 'Inmediata', color: 'text-red-600', bg: 'bg-red-500/10 border-red-500/25', icon: AlertTriangle },
    B: { label: 'Clase B', desc: 'Pronta', color: 'text-amber-600', bg: 'bg-amber-500/10 border-amber-500/25', icon: Timer },
    C: { label: 'Clase C', desc: 'Posterior', color: 'text-blue-600', bg: 'bg-blue-500/10 border-blue-500/25', icon: Shield },
};

const Req = ({ children }: { children: React.ReactNode }) => (
    <>{children}<span className="text-red-500 ml-0.5">*</span></>
);

/** Timestamp | Date | string → Date (o undefined si no es una fecha usable). */
const toDate = (v: any): Date | undefined => {
    if (!v) return undefined;
    if (typeof v?.toDate === 'function') return v.toDate();
    const d = v instanceof Date ? v : new Date(v);
    return isNaN(d.getTime()) ? undefined : d;
};

/**
 * Seguimientos listos para el formulario. Los hallazgos anteriores a la versión
 * multi-seguimiento solo tienen `fechaSeguimiento1` / `porcentajeCumplimiento`:
 * se migran a la lista para que sigan siendo visibles y editables.
 */
function seguimientosFromHallazgo(h: Hallazgo): SeguimientoValues[] {
    if (h.seguimientos?.length) {
        return h.seguimientos
            .map(s => ({
                fecha: toDate(s.fecha) as Date,
                porcentaje: s.porcentaje,
                observacion: s.observacion || '',
                evidencias: s.evidencias || [],
            }))
            .filter(s => s.fecha instanceof Date);
    }
    const legacy = toDate(h.fechaSeguimiento1);
    if (!legacy) return [];
    return [{
        fecha: legacy,
        porcentaje: h.porcentajeCumplimiento,
        observacion: '',
        evidencias: [],
    }];
}

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

// ─── Grupo de opciones (2 botones) ─────────────────────────────────────────────
interface ToggleOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ElementType;
    /** Clases del estado seleccionado. Por defecto usa el color primario. */
    activeClass?: string;
}

function OptionToggle<T extends string>({
    options, value, onChange, disabled,
}: {
    options: ToggleOption<T>[];
    value?: T;
    onChange: (v: T) => void;
    disabled?: boolean;
}) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {options.map(opt => {
                const OIcon = opt.icon;
                const isSelected = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(opt.value)}
                        className={cn(
                            'h-10 rounded-lg border text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5',
                            isSelected
                                ? opt.activeClass || 'border-primary/40 bg-primary/10 text-primary'
                                : 'border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/50'
                        )}
                    >
                        {OIcon && <OIcon className="w-3.5 h-3.5 shrink-0" />}
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

const RESPONSABILIDAD_OPTIONS: ToggleOption<'Directa' | 'Corporativa'>[] = [
    { value: 'Directa', label: 'Directa', icon: UserCog, activeClass: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { value: 'Corporativa', label: 'Corporativa', icon: Network, activeClass: 'border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400' },
];

const TIPO_HALLAZGO_OPTIONS: ToggleOption<'Positivo' | 'Seguimiento'>[] = [
    { value: 'Positivo', label: 'Positivo', icon: ThumbsUp, activeClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { value: 'Seguimiento', label: 'Seguimiento', icon: Repeat, activeClass: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
];

// ─── Combo Select + Add New ────────────────────────────────────────────────────
type DynListName = 'empresas' | 'plantas' | 'areas';

function ComboListField({
    value, onChange, items, listName, disabled, placeholder, onItemAdded,
}: {
    value: string;
    onChange: (val: string) => void;
    items: string[];
    listName: DynListName;
    disabled?: boolean;
    placeholder?: string;
    onItemAdded: (listName: DynListName, item: string) => void;
}) {
    const { toast } = useToast();
    const [showAdd, setShowAdd] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [adding, setAdding] = useState(false);

    const handleAdd = async () => {
        const trimmed = newItem.trim();
        if (!trimmed) return;
        setAdding(true);
        try {
            const result = await addListItem(listName, trimmed);
            if (result.success) {
                onItemAdded(listName, trimmed);
                onChange(trimmed);
                setNewItem('');
                setShowAdd(false);
                toast({ title: 'Registro agregado', description: `"${trimmed}" fue agregado a la lista.` });
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.error });
            }
        } catch {
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo agregar el registro.' });
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <Select value={value} onValueChange={onChange} disabled={disabled}>
                    <SelectTrigger className="h-10 border-border/60 flex-1">
                        <SelectValue placeholder={placeholder || 'Seleccionar...'} />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                        {items.length === 0 && (
                            <div className="py-2 px-3 text-xs text-muted-foreground">Sin registros. Agrega uno nuevo.</div>
                        )}
                    </SelectContent>
                </Select>
                {!disabled && (
                    <Button type="button" variant="outline" size="icon"
                        className="h-10 w-10 flex-shrink-0 border-border/60"
                        title="Agregar nuevo registro"
                        onClick={() => setShowAdd(v => !v)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                )}
            </div>
            {showAdd && !disabled && (
                <div className="flex items-center gap-2 pl-1 pt-0.5">
                    <Input
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        placeholder="Nuevo registro..."
                        className="h-9 border-border/60 text-sm flex-1"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                        autoFocus
                    />
                    <Button type="button" size="sm" className="h-9 px-3"
                        disabled={adding || !newItem.trim()} onClick={handleAdd}>
                        {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Agregar'}
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9"
                        onClick={() => { setShowAdd(false); setNewItem(''); }}>
                        <X className="h-3.5 w-3.5" />
                    </Button>
                </div>
            )}
        </div>
    );
}

// ─── Peligro Selector ──────────────────────────────────────────────────────────
// Catálogo compartido con la importación masiva (src/types) para que ambos
// caminos guarden exactamente los mismos valores.
const PELIGRO_OPTIONS: readonly string[] = HALLAZGO_PELIGRO_OPTIONS;

function PeligroSelector({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}) {
    const parseValue = (raw: string): { selected: Set<string>; custom: string } => {
        const parts = raw.split('\n').map(p => p.trim()).filter(Boolean);
        const sel = new Set<string>();
        const customParts: string[] = [];
        parts.forEach(p => {
            if (PELIGRO_OPTIONS.includes(p)) sel.add(p);
            else customParts.push(p);
        });
        return { selected: sel, custom: customParts.join('\n') };
    };

    // El componente es 100% controlado: el estado se deriva del prop `value` en cada
    // render. Mantener copias en useState hacía que el form.reset() posterior al montaje
    // (edición de un hallazgo existente o recuperación de borrador) no se reflejara, y al
    // tocar un chip se sobrescribían los peligros ya guardados con la selección vacía.
    const { selected, custom: customText } = parseValue(value || '');
    const [showCustomManual, setShowCustomManual] = useState(false);
    const showCustom = showCustomManual || customText.length > 0;

    const buildValue = (sel: Set<string>, custom: string) => {
        const parts = [...sel];
        const trimmed = custom.trim();
        if (trimmed) parts.push(trimmed);
        return parts.join('\n');
    };

    const toggle = (label: string) => {
        if (disabled) return;
        const next = new Set(selected);
        if (next.has(label)) next.delete(label);
        else next.add(label);
        onChange(buildValue(next, customText));
    };

    const handleCustomChange = (text: string) => {
        onChange(buildValue(selected, text));
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {PELIGRO_OPTIONS.map(label => {
                    const active = selected.has(label);
                    return (
                        <button
                            key={label}
                            type="button"
                            disabled={disabled}
                            onClick={() => toggle(label)}
                            className={cn(
                                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                                active
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                                    : 'bg-muted/40 border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground',
                                disabled && 'cursor-default opacity-70'
                            )}
                        >
                            {active && <Check className="h-3 w-3 shrink-0" />}
                            {label}
                        </button>
                    );
                })}

                {/* Otros chip */}
                {!showCustom && !disabled && (
                    <button
                        type="button"
                        onClick={() => setShowCustomManual(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <Plus className="h-3 w-3 shrink-0" />
                        Otros
                    </button>
                )}
                {showCustom && disabled && customText && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400">
                        <Check className="h-3 w-3 shrink-0" />
                        Otros
                    </span>
                )}
            </div>

            {showCustom && (
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Otros peligros</span>
                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => { setShowCustomManual(false); handleCustomChange(''); }}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                    <Textarea
                        value={customText}
                        onChange={e => handleCustomChange(e.target.value)}
                        disabled={disabled}
                        placeholder="Describe el peligro específico..."
                        rows={2}
                        className="resize-none border-border/60 text-sm"
                    />
                </div>
            )}
        </div>
    );
}

// ─── Personal Expuesto Selector ───────────────────────────────────────────────
const PERSONAL_OPTIONS = HALLAZGO_PERSONAL_EXPUESTO_OPTIONS;

function PersonalExpuestoSelector({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}) {
    const parse = (raw: string): Set<string> => {
        const parts = raw.split('\n').map(p => p.trim()).filter(Boolean);
        return new Set(parts.filter(p => PERSONAL_OPTIONS.includes(p as any)));
    };

    // Igual que PeligroSelector: estado derivado del prop para que el form.reset()
    // posterior al montaje se refleje y no se pierda lo ya guardado al tocar un chip.
    const selected = parse(value || '');

    const toggle = (label: string) => {
        if (disabled) return;
        const next = new Set(selected);
        if (next.has(label)) next.delete(label);
        else next.add(label);
        onChange([...next].join('\n'));
    };

    return (
        <div className="flex flex-wrap gap-2">
            {PERSONAL_OPTIONS.map(label => {
                const active = selected.has(label);
                return (
                    <button
                        key={label}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggle(label)}
                        className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                            active
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                                : 'bg-muted/40 border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground',
                            disabled && 'cursor-default opacity-70'
                        )}
                    >
                        {active && <Check className="h-3 w-3 shrink-0" />}
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function HallazgoForm({ hallazgo, isViewMode = false }: HallazgoFormProps) {
    const { toast } = useToast();
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [sigDialog, setSigDialog] = useState<'reportador' | 'responsable' | null>(null);

    // Dynamic lists
    const [empresas, setEmpresas] = useState<string[]>([]);
    const [plantas, setPlantas] = useState<string[]>([]);
    const [areas, setAreas] = useState<string[]>([]);

    // Geolocation state
    const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [geoError, setGeoError] = useState('');

    // Cargar listas dinámicas desde dynamic_lists
    useEffect(() => {
        if (!db) return;
        const unsubs: (() => void)[] = [];

        const lists: { name: DynListName; setter: (v: string[]) => void }[] = [
            { name: 'empresas', setter: setEmpresas },
            { name: 'plantas', setter: setPlantas },
            { name: 'areas', setter: setAreas },
        ];

        lists.forEach(({ name, setter }) => {
            const unsub = onSnapshot(
                doc(db!, 'dynamic_lists', name),
                (snap) => {
                    const items: string[] = snap.data()?.items || [];
                    setter([...items].sort((a, b) => a.localeCompare(b)));
                },
                () => { /* silencioso */ }
            );
            unsubs.push(unsub);
        });

        return () => unsubs.forEach(u => u());
    }, []);

    const handleItemAdded = useCallback((listName: DynListName, item: string) => {
        // El onSnapshot actualizará la lista automáticamente
        // Solo necesitamos esta callback para sincronizar la vista
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(hallazgoSchema),
        defaultValues: {
            empresa: '',
            planta: '',
            area: '',
            tipoActividad: 'Rutinario',
            responsabilidad: undefined,
            tipoHallazgo: undefined,
            fechaVisita: new Date(),
            geolocalizacion: undefined as any,
            peligroInspeccionado: '',
            personalExpuesto: '',
            hallazgo: '',
            evidenciasFotograficas: [],
            clase: 'C',
            intervencion: 'Posterior',
            descripcion: '',
            accionInmediata: '',
            reportadoPorNombre: '',
            reportadoPorCargo: '',
            firmaReportador: '',
            firmaResponsable: '',
            seguimientos: [],
            evidenciasPlanAccion: [],
            cumplimientoEstado: 'Pendiente',
        },
    });

    // Captura automática de geolocalización
    const captureGeo = useCallback(() => {
        setGeoStatus('loading');
        setGeoError('');
        if (!navigator.geolocation) {
            setGeoError('Geolocalización no disponible en este dispositivo');
            setGeoStatus('error');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                form.setValue('geolocalizacion', {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                }, { shouldValidate: true });
                setGeoStatus('success');
            },
            (err) => {
                setGeoError(err.message || 'No se pudo obtener la ubicación');
                setGeoStatus('error');
            },
            { enableHighAccuracy: true, timeout: 15000 }
        );
    }, [form]);

    // Auto-capturar geo al crear un nuevo hallazgo
    useEffect(() => {
        if (!hallazgo && !isViewMode) {
            captureGeo();
        } else if (hallazgo?.geolocalizacion) {
            setGeoStatus('success');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            // Compatibilidad hacia atrás: si tiene los campos legacy los usamos
            const empresaVal = hallazgo.empresa || hallazgo.frenteTrabajo || '';
            const plantaVal = hallazgo.planta || hallazgo.centroCosto || '';
            const fechaVal = hallazgo.fechaVisita
                ? hallazgo.fechaVisita.toDate()
                : hallazgo.fechaIdentificacion?.toDate() || new Date();

            form.reset({
                empresa: empresaVal,
                planta: plantaVal,
                area: hallazgo.area,
                tipoActividad: hallazgo.tipoActividad,
                responsabilidad: hallazgo.responsabilidad,
                tipoHallazgo: hallazgo.tipoHallazgo,
                fechaVisita: fechaVal,
                geolocalizacion: hallazgo.geolocalizacion as any,
                peligroInspeccionado: hallazgo.peligroInspeccionado,
                personalExpuesto: hallazgo.personalExpuesto || '',
                hallazgo: hallazgo.hallazgo,
                evidenciasFotograficas: hallazgo.evidenciasFotograficas || [],
                clase: hallazgo.clase,
                intervencion: hallazgo.intervencion,
                descripcion: hallazgo.descripcion,
                accionInmediata: hallazgo.accionInmediata || '',
                reportadoPorNombre: hallazgo.reportadoPorNombre,
                reportadoPorCargo: hallazgo.reportadoPorCargo,
                firmaReportador: hallazgo.firmaReportador || '',
                firmaResponsable: hallazgo.firmaResponsable || '',
                fechaMedidaImplementada: hallazgo.fechaMedidaImplementada?.toDate(),
                responsable: hallazgo.responsable,
                seguimientos: seguimientosFromHallazgo(hallazgo),
                evidenciasPlanAccion: hallazgo.evidenciasPlanAccion || [],
                fechaCierre: hallazgo.fechaCierre?.toDate(),
                porcentajeCumplimientoTotal: hallazgo.porcentajeCumplimientoTotal,
                cumplimientoEstado: hallazgo.cumplimientoEstado,
                observacion: hallazgo.observacion,
            });
            if (hallazgo.geolocalizacion) setGeoStatus('success');
        }
    }, [hallazgo, form]);

    // Auto-guardado de borrador
    useEffect(() => {
        if (hallazgo || isViewMode) return;
        const draft = localStorage.getItem('draft_hallazgo');
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                // fechaVisita es obligatoria: garantizar siempre un Date válido. Un borrador
                // antiguo (campo ausente o serializado como string) no debe perder el default
                // ni dejar la fecha vacía.
                parsed.fechaVisita = parsed.fechaVisita ? new Date(parsed.fechaVisita) : new Date();
                if (isNaN(parsed.fechaVisita.getTime())) parsed.fechaVisita = new Date();
                if (parsed.fechaMedidaImplementada) parsed.fechaMedidaImplementada = new Date(parsed.fechaMedidaImplementada);
                if (parsed.fechaCierre) parsed.fechaCierre = new Date(parsed.fechaCierre);
                parsed.seguimientos = Array.isArray(parsed.seguimientos)
                    ? parsed.seguimientos
                        .map((s: any) => ({ ...s, fecha: toDate(s?.fecha) }))
                        .filter((s: any) => s.fecha)
                    : [];
                if (!Array.isArray(parsed.evidenciasFotograficas)) parsed.evidenciasFotograficas = [];
                if (!Array.isArray(parsed.evidenciasPlanAccion)) parsed.evidenciasPlanAccion = [];
                form.reset(parsed);
                if (parsed.geolocalizacion?.lat) setGeoStatus('success');
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
    const watchedPctTotal = form.watch('porcentajeCumplimientoTotal') ?? 0;
    const watchedGeo = form.watch('geolocalizacion');

    const seguimientosArray = useFieldArray({ control: form.control, name: 'seguimientos' });
    const watchedSeguimientos = form.watch('seguimientos') ?? [];

    const onSubmit = async (data: FormValues) => {
        if (!db || !user) {
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo obtener la información de sesión.' });
            return;
        }
        setLoading(true);

        // Seguimientos ordenados cronológicamente y sin claves undefined
        // (Firestore rechaza undefined incluso dentro de objetos anidados).
        const seguimientos = [...(data.seguimientos ?? [])]
            .filter(s => s.fecha instanceof Date)
            .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
            .map(s => ({
                fecha: s.fecha,
                ...(s.porcentaje !== undefined ? { porcentaje: s.porcentaje } : {}),
                ...(s.observacion?.trim() ? { observacion: s.observacion.trim() } : {}),
                evidencias: s.evidencias ?? [],
            }));

        // Campos legacy derivados: los consumen el PDF, la exportación y los reportes.
        const primeraFecha = seguimientos[0]?.fecha;
        const ultimoPct = [...seguimientos].reverse()
            .find(s => s.porcentaje !== undefined)?.porcentaje;

        // Firestore no acepta undefined — eliminar campos opcionales sin valor
        const cleanData = {
            ...Object.fromEntries(
                Object.entries(data).filter(([, v]) => v !== undefined && v !== '')
            ),
            seguimientos,
            ...(primeraFecha ? { fechaSeguimiento1: primeraFecha } : {}),
            ...(ultimoPct !== undefined ? { porcentajeCumplimiento: ultimoPct } : {}),
        };

        // El % legacy solo se limpia si provenía de un seguimiento que ya no existe.
        // Un hallazgo antiguo con % pero sin fecha de seguimiento conserva su valor.
        const pctVeniaDeSeguimiento =
            (hallazgo?.seguimientos?.length ?? 0) > 0 || !!hallazgo?.fechaSeguimiento1;

        try {
            if (hallazgo) {
                await updateDoc(doc(db, 'hallazgos', hallazgo.id), {
                    ...cleanData,
                    // Si se eliminaron todos los seguimientos, limpiar los campos legacy
                    ...(primeraFecha ? {} : { fechaSeguimiento1: deleteField() }),
                    ...(ultimoPct === undefined && pctVeniaDeSeguimiento
                        ? { porcentajeCumplimiento: deleteField() }
                        : {}),
                    updatedAt: serverTimestamp(),
                });
                toast({ title: 'Hallazgo actualizado', description: 'Los cambios se guardaron correctamente.' });
                router.push('/hallazgos');
            } else {
                const snap = await getDocs(query(collection(db, 'hallazgos'), orderBy('numero', 'desc'), limit(1)));
                const lastNumero = snap.docs[0]?.data().numero || 0;
                const nextNumero = lastNumero + 1;
                const newDocRef = await addDoc(collection(db, 'hallazgos'), {
                    ...cleanData,
                    numero: nextNumero,
                    empresaId: user.empresa || '',
                    createdBy: user.uid,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
                toast({ title: 'Hallazgo creado', description: `Hallazgo #${nextNumero} registrado correctamente.` });
                localStorage.removeItem('draft_hallazgo');
                // Notificar a Líderes SST en segundo plano
                notifyHallazgoCreated({
                    ...cleanData,
                    id: newDocRef.id,
                    numero: nextNumero,
                } as any).catch(err => console.error('Error enviando notificaciones:', err));
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

                                {/* Empresa */}
                                <FormField control={form.control} name="empresa" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>
                                            <span className="flex items-center gap-1.5">
                                                <Building2 className="w-3 h-3" />
                                                <Req>Empresa</Req>
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            {isViewMode ? (
                                                <Input value={field.value} disabled className="h-10 border-border/60" />
                                            ) : (
                                                <ComboListField
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    items={empresas}
                                                    listName="empresas"
                                                    placeholder="Seleccionar empresa"
                                                    disabled={loading}
                                                    onItemAdded={handleItemAdded}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Planta */}
                                <FormField control={form.control} name="planta" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>
                                            <span className="flex items-center gap-1.5">
                                                <Factory className="w-3 h-3" />
                                                <Req>Planta</Req>
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            {isViewMode ? (
                                                <Input value={field.value} disabled className="h-10 border-border/60" />
                                            ) : (
                                                <ComboListField
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    items={plantas}
                                                    listName="plantas"
                                                    placeholder="Seleccionar planta"
                                                    disabled={loading}
                                                    onItemAdded={handleItemAdded}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Área */}
                                <FormField control={form.control} name="area" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>
                                            <span className="flex items-center gap-1.5">
                                                <Layers className="w-3 h-3" />
                                                <Req>Área</Req>
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            {isViewMode ? (
                                                <Input value={field.value} disabled className="h-10 border-border/60" />
                                            ) : (
                                                <ComboListField
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    items={areas}
                                                    listName="areas"
                                                    placeholder="Seleccionar área"
                                                    disabled={loading}
                                                    onItemAdded={handleItemAdded}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Tipo de Actividad */}
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

                                {/* Tipo de Hallazgo */}
                                <FormField control={form.control} name="tipoHallazgo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Tipo de Hallazgo</Req></FormLabel>
                                        <FormControl>
                                            <OptionToggle
                                                options={TIPO_HALLAZGO_OPTIONS}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={loading || isViewMode}
                                            />
                                        </FormControl>
                                        <select {...form.register('tipoHallazgo')} className="sr-only" tabIndex={-1} aria-hidden>
                                            <option value="">Sin seleccionar</option>
                                            <option value="Positivo">Positivo</option>
                                            <option value="Seguimiento">Seguimiento</option>
                                        </select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Responsabilidad */}
                                <FormField control={form.control} name="responsabilidad" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}><Req>Responsabilidad</Req></FormLabel>
                                        <FormControl>
                                            <OptionToggle
                                                options={RESPONSABILIDAD_OPTIONS}
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={loading || isViewMode}
                                            />
                                        </FormControl>
                                        <select {...form.register('responsabilidad')} className="sr-only" tabIndex={-1} aria-hidden>
                                            <option value="">Sin seleccionar</option>
                                            <option value="Directa">Directa</option>
                                            <option value="Corporativa">Corporativa</option>
                                        </select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Fecha de Visita */}
                                <FormField control={form.control} name="fechaVisita" render={({ field }) => (
                                    <DateField label="Fecha de Visita *" field={field} loading={loading} disabled={isViewMode} />
                                )} />

                                {/* Geolocalización */}
                                <FormField control={form.control} name="geolocalizacion" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-3 h-3" />
                                                <Req>Geolocalización</Req>
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                {geoStatus === 'success' && watchedGeo?.lat ? (
                                                    <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                                                        <Navigation className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                        <span className="text-xs text-emerald-700 dark:text-emerald-400 tabular-nums flex-1 truncate">
                                                            {watchedGeo.lat.toFixed(6)}, {watchedGeo.lng.toFixed(6)}
                                                            {watchedGeo.accuracy && (
                                                                <span className="text-muted-foreground ml-1.5">±{Math.round(watchedGeo.accuracy)}m</span>
                                                            )}
                                                        </span>
                                                        {!isViewMode && (
                                                            <button type="button" onClick={captureGeo}
                                                                className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex-shrink-0">
                                                                Actualizar
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : geoStatus === 'loading' ? (
                                                    <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-border/60 bg-muted/20">
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">Obteniendo ubicación...</span>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1.5">
                                                        {geoStatus === 'error' && (
                                                            <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-red-500/30 bg-red-500/5">
                                                                <WifiOff className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                                                                <span className="text-xs text-red-600 flex-1 truncate">{geoError}</span>
                                                            </div>
                                                        )}
                                                        {!isViewMode && (
                                                            <Button type="button" variant="outline" size="sm"
                                                                className="h-9 w-full border-border/60"
                                                                onClick={captureGeo} disabled={false}>
                                                                <MapPin className="mr-2 h-3.5 w-3.5" />
                                                                Capturar ubicación
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Peligro Inspeccionado */}
                                <FormField control={form.control} name="peligroInspeccionado" render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel className={labelClass}><Req>Peligro Inspeccionado</Req></FormLabel>
                                        <FormControl>
                                            <PeligroSelector
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={loading || isViewMode}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Personal Expuesto */}
                                <FormField control={form.control} name="personalExpuesto" render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel className={labelClass}><Req>Personal Expuesto</Req></FormLabel>
                                        <FormControl>
                                            <PersonalExpuestoSelector
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled={loading || isViewMode}
                                            />
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
                                            label="Subir fotos del hallazgo (múltiples permitidas)"
                                            maxFiles={10}
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

                            <FormField control={form.control} name="accionInmediata" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClass}>Acción Inmediata</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value || ''} disabled={loading || isViewMode}
                                            placeholder="Describe la acción inmediata a tomar..."
                                            rows={3} className="resize-none border-border/60 text-sm" />
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

                            {/* Firmas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                {/* Firma Reportador */}
                                <FormField control={form.control} name="firmaReportador" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>Firma Reportador</FormLabel>
                                        <FormControl>
                                            <div className="rounded-lg border border-border/60 bg-muted/10 p-3 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                                {field.value ? (
                                                    <>
                                                        <img src={field.value} alt="Firma reportador"
                                                            className="max-h-[90px] object-contain" />
                                                        {!isViewMode && (
                                                            <button type="button"
                                                                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                                                                onClick={() => field.onChange('')}>
                                                                <X className="inline w-3 h-3 mr-1" />Eliminar firma
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    !isViewMode && (
                                                        <Button type="button" variant="outline" size="sm"
                                                            className="gap-2 h-9"
                                                            disabled={loading}
                                                            onClick={() => setSigDialog('reportador')}>
                                                            <PenLine className="h-3.5 w-3.5" />
                                                            Firmar
                                                        </Button>
                                                    )
                                                )}
                                                {isViewMode && !field.value && (
                                                    <span className="text-xs text-muted-foreground">Sin firma</span>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Firma Responsable */}
                                <FormField control={form.control} name="firmaResponsable" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={labelClass}>Firma Responsable SST</FormLabel>
                                        <FormControl>
                                            <div className="rounded-lg border border-border/60 bg-muted/10 p-3 min-h-[120px] flex flex-col items-center justify-center gap-2">
                                                {field.value ? (
                                                    <>
                                                        <img src={field.value} alt="Firma responsable"
                                                            className="max-h-[90px] object-contain" />
                                                        {!isViewMode && (
                                                            <button type="button"
                                                                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                                                                onClick={() => field.onChange('')}>
                                                                <X className="inline w-3 h-3 mr-1" />Eliminar firma
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    !isViewMode && (
                                                        <Button type="button" variant="outline" size="sm"
                                                            className="gap-2 h-9"
                                                            disabled={loading}
                                                            onClick={() => setSigDialog('responsable')}>
                                                            <PenLine className="h-3.5 w-3.5" />
                                                            Firmar
                                                        </Button>
                                                    )
                                                )}
                                                {isViewMode && !field.value && (
                                                    <span className="text-xs text-muted-foreground">Sin firma</span>
                                                )}
                                            </div>
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

                            </div>

                            {/* Seguimientos — se pueden registrar varios */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <span className={cn(labelClass, 'mb-0 flex items-center gap-1.5')}>
                                        <CalendarCheck className="w-3.5 h-3.5 text-blue-500" />
                                        Seguimientos
                                        {seguimientosArray.fields.length > 0 && (
                                            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                                                {seguimientosArray.fields.length}
                                            </span>
                                        )}
                                    </span>
                                    {!isViewMode && (
                                        <Button type="button" variant="outline" size="sm" className="h-8 border-border/60"
                                            disabled={loading}
                                            onClick={() => seguimientosArray.append({
                                                fecha: new Date(),
                                                porcentaje: undefined,
                                                observacion: '',
                                                evidencias: [],
                                            })}>
                                            <Plus className="mr-1.5 h-3.5 w-3.5" />
                                            Agregar seguimiento
                                        </Button>
                                    )}
                                </div>

                                {seguimientosArray.fields.length === 0 ? (
                                    <p className="text-xs text-muted-foreground border border-dashed border-border/60 rounded-lg px-3 py-4 text-center">
                                        {isViewMode
                                            ? 'Sin seguimientos registrados.'
                                            : 'Aún no hay seguimientos. Agrega uno para registrar el avance del plan de acción.'}
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {seguimientosArray.fields.map((item, index) => {
                                            const pct = watchedSeguimientos[index]?.porcentaje ?? 0;
                                            return (
                                                <div key={item.id}
                                                    className="rounded-xl border border-border/50 bg-muted/10 p-3 sm:p-4 space-y-3">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                                            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-500/10 tabular-nums">
                                                                {index + 1}
                                                            </span>
                                                            Seguimiento
                                                        </span>
                                                        {!isViewMode && (
                                                            <button type="button"
                                                                disabled={loading}
                                                                onClick={() => seguimientosArray.remove(index)}
                                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                                                title="Eliminar seguimiento">
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <FormField control={form.control} name={`seguimientos.${index}.fecha`} render={({ field }) => (
                                                            <DateField label="Fecha de Seguimiento *" field={field} loading={loading} disabled={isViewMode} />
                                                        )} />

                                                        <FormField control={form.control} name={`seguimientos.${index}.porcentaje`} render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className={labelClass}>% de Cumplimiento</FormLabel>
                                                                <FormControl>
                                                                    <div className="space-y-2">
                                                                        <div className="relative">
                                                                            <Input type="number" min="0" max="100"
                                                                                value={field.value ?? ''}
                                                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                                                onBlur={field.onBlur}
                                                                                name={field.name}
                                                                                ref={field.ref}
                                                                                disabled={loading || isViewMode} placeholder="0"
                                                                                className="pr-9 h-10 border-border/60 tabular-nums" />
                                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground/60">%</span>
                                                                        </div>
                                                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                                            <div className="h-full rounded-full bg-blue-500 transition-all duration-300"
                                                                                style={{ width: `${Math.min(pct, 100)}%` }} />
                                                                        </div>
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>

                                                    <FormField control={form.control} name={`seguimientos.${index}.observacion`} render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Observación del Seguimiento</FormLabel>
                                                            <FormControl>
                                                                <Textarea {...field} value={field.value || ''} disabled={loading || isViewMode}
                                                                    placeholder="Avance verificado, pendientes, compromisos..."
                                                                    rows={2} className="resize-none border-border/60 text-sm" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />

                                                    <FormField control={form.control} name={`seguimientos.${index}.evidencias`} render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Evidencias del Seguimiento</FormLabel>
                                                            <FormControl>
                                                                <FileUpload
                                                                    folder="hallazgos/seguimientos"
                                                                    value={field.value || []}
                                                                    onChange={field.onChange}
                                                                    disabled={loading || isViewMode}
                                                                    label="Subir fotos del seguimiento"
                                                                    maxFiles={5}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
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
                                            label="Subir fotos de la solución implementada (múltiples permitidas)"
                                            maxFiles={10}
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
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
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

            {/* ── Diálogo de firma ─────────────────────────────────────── */}
            <Dialog open={sigDialog !== null} onOpenChange={open => { if (!open) setSigDialog(null); }}>
                <DialogContent className="sm:max-w-[520px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <PenLine className="h-4 w-4 text-primary" />
                            {sigDialog === 'reportador' ? 'Firma del Reportador' : 'Firma del Responsable SST'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-2">
                        <SignaturePad
                            onSave={(dataUrl) => {
                                if (sigDialog === 'reportador') {
                                    form.setValue('firmaReportador', dataUrl, { shouldValidate: true });
                                } else {
                                    form.setValue('firmaResponsable', dataUrl, { shouldValidate: true });
                                }
                                setSigDialog(null);
                            }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Form>
    );
}
