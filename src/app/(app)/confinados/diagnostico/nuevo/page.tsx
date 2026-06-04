'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useDynamicLists } from '@/hooks/use-dynamic-lists';
import { createDiagnostico } from '@/lib/confinados-service';
import {
  calcDiagnosticoScore,
  ACTIVIDADES_LISTA,
  DETALLE_ACTIVIDAD_LISTA,
  ALTURA_OPCIONES,
  DESARROLLADO_POR_OPCIONES,
  TIPO_EJECUCION_OPCIONES,
  ACTIVIDADES_ALTO_RIESGO,
  FACILIDADES_OPCIONES,
  MEDIDAS_PREVENCION_OPCIONES,
  EQUIPOS_ITEMS,
  RESULT_LABELS,
  type DiagnosticoConfinado,
  type DiagnosticoResultados,
} from '@/types/confinados';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft, Loader2, Save, ClipboardList, BarChart2,
  Info, Eraser, CheckCircle2, PenLine,
} from 'lucide-react';

// ── Zod schema ─────────────────────────────────────────────────────────────────

const schema = z.object({
  empresa: z.string().min(1, 'Empresa requerida'),
  planta:  z.string().min(1, 'Planta requerida'),
  fecha:   z.string().min(1, 'Fecha requerida'),
});

type FormSchema = z.infer<typeof schema>;

// ── CheckboxGroup ──────────────────────────────────────────────────────────────

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  cols?: 1 | 2 | 3;
  disabled?: boolean;
}

function CheckboxGroup({ options, selected, onChange, cols = 2, disabled }: CheckboxGroupProps) {
  const toggle = (val: string) =>
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  return (
    <div className={cn('grid gap-2', {
      'grid-cols-1':                cols === 1,
      'grid-cols-1 sm:grid-cols-2': cols === 2,
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': cols === 3,
    })}>
      {options.map(opt => (
        <label
          key={opt}
          className={cn(
            'flex items-start gap-2 text-sm rounded-md p-2 border border-transparent',
            'hover:bg-muted/50 hover:border-border cursor-pointer transition-colors',
            selected.includes(opt) && 'bg-violet-50 border-violet-200',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Checkbox
            checked={selected.includes(opt)}
            onCheckedChange={() => !disabled && toggle(opt)}
            className="mt-0.5 flex-shrink-0"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ── SelectField ────────────────────────────────────────────────────────────────

interface SelectFieldProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

function SelectField({
  value, onChange, options, placeholder = 'Seleccionar…', disabled, loading,
}: SelectFieldProps) {
  return (
    <Select value={value ?? ''} onValueChange={onChange} disabled={disabled || loading}>
      <SelectTrigger className="h-10 text-sm">
        {loading
          ? <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Cargando…
            </span>
          : <SelectValue placeholder={placeholder} />}
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 ? (
          <div className="px-3 py-2 text-xs text-muted-foreground">
            Sin opciones registradas
          </div>
        ) : (
          options.map(opt => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

// ── FieldRow ───────────────────────────────────────────────────────────────────

function FieldRow({ label, required, description, children }: {
  label: string; required?: boolean; description?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {children}
    </div>
  );
}

// ── InlineSignaturePad ────────────────────────────────────────────────────────

interface InlineSignaturePadProps {
  value: string;          // current base64 data-url ('' = empty)
  onChange: (v: string) => void;
  label: string;
  disabled?: boolean;
}

function InlineSignaturePad({ value, onChange, label, disabled }: InlineSignaturePadProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasStroke, setHasStroke] = useState(false);

  // Init / resize canvas
  const initCanvas = useCallback(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width  = container.offsetWidth;
    canvas.height = 160;
    const ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = '#1e1e1e';
    ctx.lineWidth   = 2;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
      const t = e.nativeEvent.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    const m = e.nativeEvent as MouseEvent;
    return { x: m.clientX - rect.left, y: m.clientY - rect.top };
  };

  const onStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (disabled) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!drawing || disabled) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasStroke(true);
  };

  const onEnd = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasStroke) return;
    // Composite onto white background → JPEG ~10-20 KB
    const out   = document.createElement('canvas');
    out.width   = canvas.width;
    out.height  = canvas.height;
    const ctx2  = out.getContext('2d')!;
    ctx2.fillStyle = '#ffffff';
    ctx2.fillRect(0, 0, out.width, out.height);
    ctx2.drawImage(canvas, 0, 0);
    onChange(out.toDataURL('image/jpeg', 0.6));
  };

  // ── Signed state ──────────────────────────────────────────────────────────
  if (value) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-between px-3 py-2 bg-green-50 border-b border-green-200">
          <div className="flex items-center gap-1.5 text-green-700 text-xs font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Firma capturada
          </div>
          <Button
            type="button" variant="ghost" size="sm"
            className="h-6 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onChange('')}
            disabled={disabled}
          >
            <Eraser className="mr-1 h-3 w-3" /> Volver a firmar
          </Button>
        </div>
        <div className="p-2">
          <img src={value} alt={`Firma ${label}`} className="max-h-24 w-full object-contain" />
        </div>
      </div>
    );
  }

  // ── Drawing state ─────────────────────────────────────────────────────────
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 px-3 py-1.5 border-b flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <PenLine className="h-3 w-3" /> Dibuje la firma en el recuadro
        </span>
        <Button
          type="button" variant="ghost" size="sm"
          className="h-6 text-xs text-muted-foreground"
          onClick={clear} disabled={disabled || !hasStroke}
        >
          <Eraser className="mr-1 h-3 w-3" /> Limpiar
        </Button>
      </div>
      <div ref={containerRef} className="bg-white">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair touch-none block"
          style={{ height: 160 }}
          onMouseDown={onStart} onMouseMove={onMove}
          onMouseUp={onEnd}    onMouseLeave={onEnd}
          onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
        />
      </div>
      <div className="px-3 py-2 border-t bg-muted/20 flex justify-end">
        <Button
          type="button" size="sm"
          onClick={save}
          disabled={disabled || !hasStroke}
          className="bg-violet-600 hover:bg-violet-700 text-white h-8 text-xs"
        >
          <Save className="mr-1.5 h-3 w-3" /> Guardar firma
        </Button>
      </div>
    </div>
  );
}

// ── Score Panel ────────────────────────────────────────────────────────────────

function ScorePanel({ resultados }: { resultados: DiagnosticoResultados }) {
  const MAX  = 14;
  const score = resultados.sumaTotal;
  const pct   = score != null ? Math.round((score / MAX) * 100) : null;

  const keys: (keyof DiagnosticoResultados)[] = [
    'identificacionPeligros', 'permisosDeTrabajo', 'gestionMedidasPrevencion',
    'monitoreoDeLaAtmosfera', 'procedimientoEspaciosConfinados',
    'manejoEnergiasPeligrosas', 'planDeEmergencias',
  ];

  const shortLabel = (k: keyof DiagnosticoResultados) =>
    RESULT_LABELS[k]
      .replace('Identificación de peligros y valoración de riesgos', 'Ident. peligros')
      .replace('Procedimiento para el manejo de espacios confinados', 'Procedimiento')
      .replace('Gestión de medidas de prevención', 'Gestión medidas')
      .replace('Monitoreo de la atmósfera', 'Monitoreo atm.')
      .replace('Manejo de energías peligrosas', 'Energías pelig.')
      .replace('Plan de emergencias', 'Plan emerg.')
      .replace('Permisos de trabajo', 'Permisos');

  return (
    <Card className="border-violet-200 bg-violet-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-violet-600" />
          Resultados calculados
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            Se actualizan automáticamente
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('text-3xl font-bold tabular-nums',
            score == null ? 'text-muted-foreground' :
            score >= 10 ? 'text-green-600' : score >= 6 ? 'text-amber-600' : 'text-red-600',
          )}>
            {score != null ? score : '—'}
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-1">Suma total / {MAX}</div>
            {pct != null && (
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={cn('h-full rounded-full transition-all', {
                  'bg-green-500': pct >= 71,
                  'bg-amber-500': pct >= 43 && pct < 71,
                  'bg-red-500':   pct < 43,
                })} style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
          {pct != null && (
            <span className={cn('text-sm font-semibold',
              pct >= 71 ? 'text-green-600' : pct >= 43 ? 'text-amber-600' : 'text-red-600',
            )}>{pct}%</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {keys.map(k => {
            const val = resultados[k];
            return (
              <div key={k} className={cn('rounded-lg p-2 text-center border',
                val == null ? 'bg-muted/30 border-muted text-muted-foreground' :
                val === 2   ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200',
              )}>
                <div className={cn('text-lg font-bold tabular-nums',
                  val == null ? 'text-muted-foreground' :
                  val === 2   ? 'text-green-600' : 'text-red-500',
                )}>{val != null ? val : '—'}</div>
                <div className="text-[10px] leading-tight mt-0.5 text-muted-foreground">
                  {shortLabel(k)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

// Names declared outside the component to keep the array reference stable
const LIST_NAMES = ['empresas', 'plantas', 'procesos'] as const;

export default function DiagnosticoNuevoPage() {
  const router    = useRouter();
  const { user }  = useUser();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // ── Dynamic lists from Firestore ──────────────────────────────────────────
  const { lists, loading: loadingLists } = useDynamicLists(LIST_NAMES as any);

  // ── Multi-select local state ───────────────────────────────────────────────
  const [desarrolladaPor,       setDesarrolladaPor]      = useState<string[]>([]);
  const [actividadesAltoRiesgo, setActividadesAltoRiesgo] = useState<string[]>([]);
  const [facilidades,           setFacilidades]          = useState<string[]>([]);
  const [medidasPrevencion,     setMedidasPrevencion]    = useState<string[]>([]);
  const [equipoValues,          setEquipoValues]         = useState<Record<string, string[]>>({});

  // ── Signatures ─────────────────────────────────────────────────────────────
  const [firmaSST,          setFirmaSST]          = useState('');
  const [firmaResponsable,  setFirmaResponsable]  = useState('');

  const setEquipo = useCallback((field: string, vals: string[]) => {
    setEquipoValues(prev => ({ ...prev, [field]: vals }));
  }, []);

  // ── Form ──────────────────────────────────────────────────────────────────
  const {
    register, handleSubmit, watch, setValue,
    formState: { errors },
  } = useForm<FormSchema & Partial<DiagnosticoConfinado>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fecha:                       format(new Date(), 'yyyy-MM-dd'),
      evaluadaEnIPER:              '',
      tipoEspacioConfinado:        '',
      gradoPeligrosidad:           '',
      monitoreoPrevioIngreso:      '',
      cuentaConProcedimiento:      '',
      metodologiaBloqueoEnergias:  '',
      tieneAltoRiesgoAdicional:    '',
      alturaPromedio:              '',
      tipoEjecucion:               '',
      eventosAccidentesPrevios:    '',
      clienteAceptaInfo:           '',
      actividadAnalizada:          '',
      detalleActividad:            '',
      empresa:                     '',
      planta:                      '',
      proceso:                     '',
    },
  });

  const watchedValues = watch();

  // ── Live score calculation ─────────────────────────────────────────────────
  const scoreInput = useMemo((): Partial<DiagnosticoConfinado> => ({
    evaluadaEnIPER:             watchedValues.evaluadaEnIPER,
    medidasPrevencion,
    monitoreoPrevioIngreso:     watchedValues.monitoreoPrevioIngreso,
    cuentaConProcedimiento:     watchedValues.cuentaConProcedimiento,
    metodologiaBloqueoEnergias: watchedValues.metodologiaBloqueoEnergias,
    equipoPrimerosAuxilios:     equipoValues['equipoPrimerosAuxilios'] ?? [],
  }), [
    watchedValues.evaluadaEnIPER,
    watchedValues.monitoreoPrevioIngreso,
    watchedValues.cuentaConProcedimiento,
    watchedValues.metodologiaBloqueoEnergias,
    medidasPrevencion,
    equipoValues,
  ]);

  const resultados = useMemo(() => calcDiagnosticoScore(scoreInput), [scoreInput]);

  // ── Build payload ─────────────────────────────────────────────────────────
  const buildPayload = (
    formData: any,
    statusVal: 'borrador' | 'completado',
  ): Omit<DiagnosticoConfinado, 'id' | 'createdAt' | 'updatedAt'> => ({
    ...formData,
    desarrolladaPor,
    actividadesAltoRiesgo,
    facilidades,
    medidasPrevencion,
    ...Object.fromEntries(
      EQUIPOS_ITEMS.map(e => [e.field as string, equipoValues[e.field as string] ?? []]),
    ),
    // Signatures
    firmaSST:         firmaSST         || undefined,
    firmaResponsable: firmaResponsable || undefined,
    createdById:   user!.uid,
    createdByName: user!.displayName || user!.email || 'Desconocido',
    status:        statusVal,
  });

  const onSubmit = async (formData: any) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const id = await createDiagnostico(buildPayload(formData, 'completado'));
      toast({ title: 'Diagnóstico guardado' });
      router.push(`/confinados/diagnostico/${id}`);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message ?? 'No se pudo guardar.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const saveDraft = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const id = await createDiagnostico(
        buildPayload({ ...watch(), empresa: watch('empresa') ?? '', planta: watch('planta') ?? '' }, 'borrador'),
      );
      toast({ title: 'Borrador guardado' });
      router.push(`/confinados/diagnostico/${id}`);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const tieneAltoRiesgo = watchedValues.tieneAltoRiesgoAdicional === 'Si';

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <button
            onClick={() => router.push('/confinados/diagnostico')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="h-3 w-3" /> Diagnóstico
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-violet-600" />
            Nuevo Diagnóstico
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Complete el checklist de evaluación para el espacio confinado.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={saveDraft} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Guardar borrador
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving
              ? <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              : <Save className="mr-2 h-3 w-3" />}
            Guardar completo
          </Button>
        </div>
      </div>

      {/* Score Panel */}
      <ScorePanel resultados={resultados} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={['grupo1', 'grupo2', 'grupo3', 'grupo4', 'grupo5']}
          className="space-y-3"
        >

          {/* ── GRUPO 1 – Datos Generales ─────────────────────────────────── */}
          <AccordionItem value="grupo1" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                Datos Generales
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <FieldRow label="Fecha" required>
                  <Input type="date" {...register('fecha')} className="h-10 text-sm" />
                  {errors.fecha && (
                    <p className="text-xs text-red-500 mt-1">{errors.fecha.message}</p>
                  )}
                </FieldRow>

                {/* Empresa — dynamic list */}
                <FieldRow label="Empresa" required>
                  <SelectField
                    value={watchedValues.empresa ?? ''}
                    onChange={v => setValue('empresa', v)}
                    options={lists.empresas ?? []}
                    loading={loadingLists}
                    placeholder="Seleccionar empresa…"
                  />
                  {errors.empresa && (
                    <p className="text-xs text-red-500 mt-1">{errors.empresa.message}</p>
                  )}
                </FieldRow>

                {/* Planta — dynamic list */}
                <FieldRow label="Planta" required>
                  <SelectField
                    value={watchedValues.planta ?? ''}
                    onChange={v => setValue('planta', v)}
                    options={lists.plantas ?? []}
                    loading={loadingLists}
                    placeholder="Seleccionar planta…"
                  />
                  {errors.planta && (
                    <p className="text-xs text-red-500 mt-1">{errors.planta.message}</p>
                  )}
                </FieldRow>

                {/* Proceso — dynamic list */}
                <FieldRow label="Proceso">
                  <SelectField
                    value={watchedValues.proceso ?? ''}
                    onChange={v => setValue('proceso', v)}
                    options={lists.procesos ?? []}
                    loading={loadingLists}
                    placeholder="Seleccionar proceso…"
                  />
                </FieldRow>

              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 2 – Descripción de la Actividad ────────────────────── */}
          <AccordionItem value="grupo2" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                Descripción de la Actividad Analizada
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-4 space-y-5">

              <FieldRow label="Por favor describe la actividad analizada">
                <SelectField
                  value={watchedValues.actividadAnalizada ?? ''}
                  onChange={v => setValue('actividadAnalizada', v)}
                  options={ACTIVIDADES_LISTA}
                  placeholder="Seleccionar actividad…"
                />
              </FieldRow>

              {/* ← NOW a dropdown too */}
              <FieldRow label="Por favor describe en detalle la actividad analizada">
                <SelectField
                  value={watchedValues.detalleActividad ?? ''}
                  onChange={v => setValue('detalleActividad', v)}
                  options={DETALLE_ACTIVIDAD_LISTA}
                  placeholder="Seleccionar detalle de actividad…"
                />
              </FieldRow>

              <FieldRow label="En el caso de que la actividad se ejecute en alturas, ¿cuál es la altura promedio?">
                <SelectField
                  value={watchedValues.alturaPromedio ?? ''}
                  onChange={v => setValue('alturaPromedio', v)}
                  options={ALTURA_OPCIONES}
                  placeholder="Seleccionar altura…"
                />
              </FieldRow>

              <FieldRow label="¿Esta actividad es desarrollada por?">
                <CheckboxGroup
                  options={DESARROLLADO_POR_OPCIONES}
                  selected={desarrolladaPor}
                  onChange={setDesarrolladaPor}
                  cols={3}
                />
              </FieldRow>

              <FieldRow label="De acuerdo con el flujograma de la ejecución de la actividad, la actividad es:">
                <SelectField
                  value={watchedValues.tipoEjecucion ?? ''}
                  onChange={v => setValue('tipoEjecucion', v)}
                  options={TIPO_EJECUCION_OPCIONES}
                  placeholder="Seleccionar tipo…"
                />
              </FieldRow>

              <FieldRow label="Además del trabajo en espacios confinados, ¿esta actividad cuenta con algún alto riesgo adicional?">
                <SelectField
                  value={watchedValues.tieneAltoRiesgoAdicional ?? ''}
                  onChange={v => setValue('tieneAltoRiesgoAdicional', v)}
                  options={['Si', 'No']}
                  placeholder="Seleccionar…"
                />
              </FieldRow>

              {tieneAltoRiesgo && (
                <FieldRow label="Seleccione las actividades de alto riesgo que se ejecutan">
                  <CheckboxGroup
                    options={ACTIVIDADES_ALTO_RIESGO}
                    selected={actividadesAltoRiesgo}
                    onChange={setActividadesAltoRiesgo}
                    cols={2}
                  />
                </FieldRow>
              )}

              <FieldRow
                label="Describe los medios de entrada y salida del espacio confinado"
                description="Incluir forma de comunicación."
              >
                <textarea
                  {...register('medidasDeEntradaSalida')}
                  rows={2}
                  placeholder="Ej.: Escotilla superior de 60 cm, escalera tipo gato, radio de comunicación…"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </FieldRow>

              <FieldRow
                label="Describe el espacio de trabajo"
                description="Dimensiones, redes presentes, etc."
              >
                <textarea
                  {...register('descripcionEspacio')}
                  rows={2}
                  placeholder="Ej.: Tanque cilíndrico 2 m diámetro × 4 m alto, tubería de agua a 2 m del fondo…"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </FieldRow>

            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 3 – Facilidades y Evaluación ───────────────────────── */}
          <AccordionItem value="grupo3" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                Facilidades y Evaluación del Espacio Confinado
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-4 space-y-5">

              <FieldRow label="El espacio confinado cuenta con facilidades tales como:">
                <CheckboxGroup
                  options={FACILIDADES_OPCIONES}
                  selected={facilidades}
                  onChange={setFacilidades}
                  cols={2}
                />
              </FieldRow>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FieldRow
                  label="¿La actividad ha sido evaluada en la matriz IPER?"
                  description="Si = 2 pts | No = 0 pts"
                >
                  <SelectField
                    value={watchedValues.evaluadaEnIPER ?? ''}
                    onChange={v => setValue('evaluadaEnIPER', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>

                <FieldRow label="El tipo de espacio confinado es:">
                  <SelectField
                    value={watchedValues.tipoEspacioConfinado ?? ''}
                    onChange={v => setValue('tipoEspacioConfinado', v)}
                    options={['Tipo 1', 'Tipo 2']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>

                <FieldRow label="El grado de peligrosidad es:">
                  <SelectField
                    value={watchedValues.gradoPeligrosidad ?? ''}
                    onChange={v => setValue('gradoPeligrosidad', v)}
                    options={['Grado A', 'Grado B', 'Grado C']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>
              </div>

              <FieldRow
                label="¿Qué medidas de prevención se utilizan para la ejecución de la actividad?"
                description="Si selecciona solo 'Permiso de trabajo' → puntúa en Permisos. Si lo combina con otras → puntúa en Gestión de medidas."
              >
                <CheckboxGroup
                  options={MEDIDAS_PREVENCION_OPCIONES}
                  selected={medidasPrevencion}
                  onChange={setMedidasPrevencion}
                  cols={2}
                />
              </FieldRow>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FieldRow
                  label="¿Antes del ingreso se realiza monitoreo de la atmósfera?"
                  description="Si = 2 pts | No = 0 pts"
                >
                  <SelectField
                    value={watchedValues.monitoreoPrevioIngreso ?? ''}
                    onChange={v => setValue('monitoreoPrevioIngreso', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>

                <FieldRow
                  label="¿La actividad cuenta con un procedimiento que defina las medidas de seguridad?"
                  description="Si = 2 pts | No = 0 pts"
                >
                  <SelectField
                    value={watchedValues.cuentaConProcedimiento ?? ''}
                    onChange={v => setValue('cuentaConProcedimiento', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>

                <FieldRow
                  label="¿Se cuenta y aplica metodología para el bloqueo de energías peligrosas?"
                  description="Si = 2 pts | No = 0 pts"
                >
                  <SelectField
                    value={watchedValues.metodologiaBloqueoEnergias ?? ''}
                    onChange={v => setValue('metodologiaBloqueoEnergias', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>
              </div>

            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 4 – Equipos y EPP ───────────────────────────────────── */}
          <AccordionItem value="grupo4" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">4</span>
                Checklist de Equipos y EPP
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
                <Info className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                <span>
                  Marque <strong>"Se utiliza"</strong> para indicar que el equipo está presente y activo.
                  Esta selección aporta puntos al cálculo de resultados.
                </span>
              </div>

              <div className="space-y-4">
                {EQUIPOS_ITEMS.map(({ field, label, opts }) => (
                  <div key={field as string} className="border rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-3">{label}</h4>
                    <CheckboxGroup
                      options={opts}
                      selected={equipoValues[field as string] ?? []}
                      onChange={vals => setEquipo(field as string, vals)}
                      cols={3}
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 5 – Firma y Cierre ──────────────────────────────────── */}
          <AccordionItem value="grupo5" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">5</span>
                Firma y Cierre
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6 pt-4 space-y-6">

              {/* Preguntas de cierre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="¿Se han presentado accidentes en este espacio en el último año?">
                  <SelectField
                    value={watchedValues.eventosAccidentesPrevios ?? ''}
                    onChange={v => setValue('eventosAccidentesPrevios', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>

                <FieldRow label="¿El cliente acepta todo lo relacionado en el diagnóstico?">
                  <SelectField
                    value={watchedValues.clienteAceptaInfo ?? ''}
                    onChange={v => setValue('clienteAceptaInfo', v)}
                    options={['Si', 'No']}
                    placeholder="Seleccionar…"
                  />
                </FieldRow>
              </div>

              <Separator />

              {/* Firmas en dos columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ── SST ── */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <PenLine className="h-4 w-4 text-violet-600" />
                    Asesor SST
                  </h4>
                  <FieldRow label="Nombre del SST">
                    <Input
                      placeholder="Nombre completo del asesor SST"
                      {...register('nombreSST')}
                      className="h-10 text-sm"
                    />
                  </FieldRow>
                  <FieldRow label="Firma del SST">
                    <InlineSignaturePad
                      label="SST"
                      value={firmaSST}
                      onChange={setFirmaSST}
                    />
                  </FieldRow>
                </div>

                {/* ── Persona Responsable ── */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <PenLine className="h-4 w-4 text-violet-600" />
                    Persona Responsable
                  </h4>
                  <FieldRow label="Nombre de la persona responsable">
                    <Input
                      placeholder="Nombre completo del responsable"
                      {...register('nombreResponsable')}
                      className="h-10 text-sm"
                    />
                  </FieldRow>
                  <FieldRow label="Firma de la persona responsable">
                    <InlineSignaturePad
                      label="Responsable"
                      value={firmaResponsable}
                      onChange={setFirmaResponsable}
                    />
                  </FieldRow>
                </div>

              </div>

            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Bottom actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button" variant="outline"
            onClick={() => router.push('/confinados/diagnostico')}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button type="button" variant="outline" onClick={saveDraft} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar borrador
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : <Save className="mr-2 h-4 w-4" />}
            Guardar diagnóstico
          </Button>
        </div>
      </form>
    </div>
  );
}
