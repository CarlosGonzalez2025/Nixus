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
import { createDiagnosticoAltura } from '@/lib/alturas-service';
import {
  calcDiagnosticoAlturaScore,
  ACTIVIDADES_LISTA_ALTURAS,
  DETALLE_ACTIVIDAD_LISTA_ALTURAS,
  ALTURA_PROMEDIO_OPCIONES,
  DESARROLLADO_POR_OPCIONES_ALTURAS,
  FRECUENCIA_OPCIONES,
  ACTIVIDADES_ALTO_RIESGO_ALTURAS,
  MEDIDAS_PREVENCION_OPCIONES_ALTURAS,
  ESCALERAS_ITEMS,
  ARNESES_ITEMS,
  EMERGENCIAS_ITEMS,
  EPP_OPCIONES_ALTURAS,
  RESULT_LABELS_ALTURAS,
  type DiagnosticoAltura,
  type DiagnosticoAlturaResultados,
} from '@/types/alturas';

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
  ArrowLeft, Loader2, Save, ArrowUpToLine, BarChart2,
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

function CheckboxGroup({ options, selected, onChange, cols = 2, disabled }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
  cols?: 1 | 2 | 3; disabled?: boolean;
}) {
  const toggle = (val: string) =>
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  return (
    <div className={cn('grid gap-2', {
      'grid-cols-1':                         cols === 1,
      'grid-cols-1 sm:grid-cols-2':          cols === 2,
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': cols === 3,
    })}>
      {options.map(opt => (
        <label
          key={opt}
          className={cn(
            'flex items-start gap-2 text-sm rounded-md p-2 border border-transparent',
            'hover:bg-muted/50 hover:border-border cursor-pointer transition-colors',
            selected.includes(opt) && 'bg-sky-50 border-sky-200',
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

function SelectField({ value, onChange, options, placeholder = 'Seleccionar…', disabled, loading }: {
  value: string; onChange: (v: string) => void; options: string[];
  placeholder?: string; disabled?: boolean; loading?: boolean;
}) {
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
        {options.length === 0
          ? <div className="px-3 py-2 text-xs text-muted-foreground">Sin opciones</div>
          : options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
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

// ── InlineSignaturePad ─────────────────────────────────────────────────────────

function InlineSignaturePad({ value, onChange, label, disabled }: {
  value: string; onChange: (v: string) => void; label: string; disabled?: boolean;
}) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing]   = useState(false);
  const [hasStroke, setHasStroke] = useState(false);

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
    ctx.beginPath(); ctx.moveTo(x, y);
    setDrawing(true);
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!drawing || disabled) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y); ctx.stroke();
    setHasStroke(true);
  };

  const onEnd = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasStroke) return;
    const out = document.createElement('canvas');
    out.width = canvas.width; out.height = canvas.height;
    const ctx2 = out.getContext('2d')!;
    ctx2.fillStyle = '#ffffff'; ctx2.fillRect(0, 0, out.width, out.height);
    ctx2.drawImage(canvas, 0, 0);
    onChange(out.toDataURL('image/jpeg', 0.6));
  };

  if (value) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="flex items-center justify-between px-3 py-2 bg-green-50 border-b border-green-200">
          <div className="flex items-center gap-1.5 text-green-700 text-xs font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" /> Firma capturada
          </div>
          <Button type="button" variant="ghost" size="sm"
            className="h-6 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onChange('')} disabled={disabled}>
            <Eraser className="mr-1 h-3 w-3" /> Volver a firmar
          </Button>
        </div>
        <div className="p-2">
          <img src={value} alt={`Firma ${label}`} className="max-h-24 w-full object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/30 px-3 py-1.5 border-b flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <PenLine className="h-3 w-3" /> Dibuje la firma en el recuadro
        </span>
        <Button type="button" variant="ghost" size="sm"
          className="h-6 text-xs text-muted-foreground"
          onClick={clear} disabled={disabled || !hasStroke}>
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
        <Button type="button" size="sm" onClick={save} disabled={disabled || !hasStroke}
          className="bg-sky-600 hover:bg-sky-700 text-white h-8 text-xs">
          <Save className="mr-1.5 h-3 w-3" /> Guardar firma
        </Button>
      </div>
    </div>
  );
}

// ── Score Panel ────────────────────────────────────────────────────────────────

function ScorePanel({ resultados }: { resultados: DiagnosticoAlturaResultados }) {
  const MAX   = 14;
  const score = resultados.sumaTotal;
  const pct   = score != null ? Math.round((score / MAX) * 100) : null;

  const keys = Object.keys(RESULT_LABELS_ALTURAS).filter(k => k !== 'sumaTotal') as (keyof DiagnosticoAlturaResultados)[];

  const shortLabel = (k: keyof DiagnosticoAlturaResultados) =>
    RESULT_LABELS_ALTURAS[k]
      .replace('Procedimientos para la gestión de trabajo en alturas', 'Procedimientos')
      .replace('Permisos de trabajo', 'Permisos')
      .replace('Gestión de medidas de prevención', 'Gest. medidas')
      .replace('Gestión documental', 'Documental')
      .replace('Gestión del riesgo y control operacional', 'Riesgo/Control')
      .replace('Gestión de equipos y sistemas', 'Equipos')
      .replace('Gestión de emergencias', 'Emergencias');

  return (
    <Card className="border-sky-200 bg-sky-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-sky-600" />
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
                val === 2   ? 'bg-green-50 border-green-200' :
                val === 1   ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200',
              )}>
                <div className={cn('text-lg font-bold tabular-nums',
                  val == null ? 'text-muted-foreground' :
                  val === 2   ? 'text-green-600' :
                  val === 1   ? 'text-amber-600' : 'text-red-500',
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

// ── Grupo badge ────────────────────────────────────────────────────────────────

function GroupBadge({ n }: { n: number }) {
  return (
    <span className="bg-sky-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
      {n}
    </span>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const LIST_NAMES = ['empresas', 'plantas', 'procesos'] as const;

export default function DiagnosticoAlturaNewPage() {
  const router    = useRouter();
  const { user }  = useUser();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const { lists, loading: loadingLists } = useDynamicLists(LIST_NAMES as any);

  // Multi-select state
  const [desarrolladaPor,       setDesarrolladaPor]       = useState<string[]>([]);
  const [actividadesAltoRiesgo, setActividadesAltoRiesgo] = useState<string[]>([]);
  const [medidasPrevencion,     setMedidasPrevencion]     = useState<string[]>([]);
  const [eppUtilizados,         setEppUtilizados]         = useState<string[]>([]);
  const [equipoValues,          setEquipoValues]          = useState<Record<string, string[]>>({});

  // Signatures
  const [firmaSST,         setFirmaSST]         = useState('');
  const [firmaResponsable, setFirmaResponsable] = useState('');

  const setEquipo = useCallback((field: string, vals: string[]) => {
    setEquipoValues(prev => ({ ...prev, [field]: vals }));
  }, []);

  // Form
  const {
    register, handleSubmit, watch, setValue,
    formState: { errors },
  } = useForm<FormSchema & Partial<DiagnosticoAltura>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fecha:                    format(new Date(), 'yyyy-MM-dd'),
      empresa:                  '',
      planta:                   '',
      proceso:                  '',
      actividadAnalizada:       '',
      detalleActividad:         '',
      alturaPromedio:           '',
      frecuenciaEjecucion:      '',
      tieneAltoRiesgoAdicional: '',
      evaluadaEnIPER:           '',
      cuentaConProcedimiento:   '',
      seHanPresentadoCargos:    '',
      clienteAceptaInfo:        '',
    },
  });

  const watchedValues = watch();

  // Live score
  const scoreInput = useMemo((): Partial<DiagnosticoAltura> => ({
    evaluadaEnIPER:          watchedValues.evaluadaEnIPER,
    cuentaConProcedimiento:  watchedValues.cuentaConProcedimiento,
    medidasPrevencion,
    escaleraFijaVertical:    equipoValues['escaleraFijaVertical']    ?? [],
    escaleraLlana:           equipoValues['escaleraLlana']           ?? [],
    escaleraExtension:       equipoValues['escaleraExtension']       ?? [],
    escaleraPortatil:        equipoValues['escaleraPortatil']        ?? [],
    escaleraTipoAvion:       equipoValues['escaleraTipoAvion']       ?? [],
    andamioMultidireccional: equipoValues['andamioMultidireccional'] ?? [],
    elevadorPersonas:        equipoValues['elevadorPersonas']        ?? [],
    arnesCuerpoCompleto:     equipoValues['arnesCuerpoCompleto']     ?? [],
    estingaPosicionamiento:  equipoValues['estingaPosicionamiento']  ?? [],
    estingaConAbsorbedor:    equipoValues['estingaConAbsorbedor']    ?? [],
    anclajesFijos:           equipoValues['anclajesFijos']           ?? [],
    anclajePortatil:         equipoValues['anclajePortatil']         ?? [],
    lvhFija:                 equipoValues['lvhFija']                 ?? [],
    lvhPortatil:             equipoValues['lvhPortatil']             ?? [],
    lvvFija:                 equipoValues['lvvFija']                 ?? [],
    lvvPortatil:             equipoValues['lvvPortatil']             ?? [],
    mosquetones:             equipoValues['mosquetones']             ?? [],
    lvAutorretractil:        equipoValues['lvAutorretractil']        ?? [],
    equipoRescate:           equipoValues['equipoRescate']           ?? [],
    equipoPrimerosAuxilios:  equipoValues['equipoPrimerosAuxilios']  ?? [],
  }), [watchedValues.evaluadaEnIPER, watchedValues.cuentaConProcedimiento, medidasPrevencion, equipoValues]);

  const resultados = useMemo(() => calcDiagnosticoAlturaScore(scoreInput), [scoreInput]);

  const buildPayload = (
    formData: any,
    statusVal: 'borrador' | 'completado',
  ): Omit<DiagnosticoAltura, 'id' | 'createdAt' | 'updatedAt'> => ({
    ...formData,
    desarrolladaPor,
    actividadesAltoRiesgo,
    medidasPrevencion,
    eppUtilizados,
    ...Object.fromEntries(
      [...ESCALERAS_ITEMS, ...ARNESES_ITEMS, ...EMERGENCIAS_ITEMS]
        .map(e => [e.field as string, equipoValues[e.field as string] ?? []]),
    ),
    firmaSST:         firmaSST || undefined,
    firmaResponsable: firmaResponsable || undefined,
    createdById:   user!.uid,
    createdByName: user!.displayName || user!.email || 'Desconocido',
    status:        statusVal,
  });

  const onSubmit = async (formData: any) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const id = await createDiagnosticoAltura(buildPayload(formData, 'completado'));
      toast({ title: 'Diagnóstico guardado' });
      router.push(`/alturas/diagnostico/${id}`);
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
      const id = await createDiagnosticoAltura(
        buildPayload({ ...watch(), empresa: watch('empresa') ?? '', planta: watch('planta') ?? '' }, 'borrador'),
      );
      toast({ title: 'Borrador guardado' });
      router.push(`/alturas/diagnostico/${id}`);
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
            onClick={() => router.push('/alturas/diagnostico')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="h-3 w-3" /> Diagnóstico
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ArrowUpToLine className="h-6 w-6 text-sky-600" />
            Nuevo Diagnóstico – Alturas
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Complete el checklist de evaluación para trabajo en alturas.
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

      {/* Score */}
      <ScorePanel resultados={resultados} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={['g1', 'g2', 'g3', 'g4', 'g5', 'g6']}
          className="space-y-3"
        >

          {/* ── GRUPO 1 – Datos Generales ───────────────────────────────────── */}
          <AccordionItem value="g1" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={1} /> Datos Generales
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <FieldRow label="Fecha" required>
                  <Input type="date" {...register('fecha')} className="h-10 text-sm" />
                  {errors.fecha && <p className="text-xs text-red-500 mt-1">{errors.fecha.message}</p>}
                </FieldRow>

                <FieldRow label="Empresa" required>
                  <SelectField
                    value={watchedValues.empresa ?? ''}
                    onChange={v => setValue('empresa', v)}
                    options={lists.empresas ?? []}
                    loading={loadingLists}
                    placeholder="Seleccionar empresa…"
                  />
                  {errors.empresa && <p className="text-xs text-red-500 mt-1">{errors.empresa.message}</p>}
                </FieldRow>

                <FieldRow label="Planta" required>
                  <SelectField
                    value={watchedValues.planta ?? ''}
                    onChange={v => setValue('planta', v)}
                    options={lists.plantas ?? []}
                    loading={loadingLists}
                    placeholder="Seleccionar planta…"
                  />
                  {errors.planta && <p className="text-xs text-red-500 mt-1">{errors.planta.message}</p>}
                </FieldRow>

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

          {/* ── GRUPO 2 – Información de la Actividad ───────────────────────── */}
          <AccordionItem value="g2" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={2} /> Información de la Actividad Analizada
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-4 space-y-5">

              <FieldRow label="Por favor escribe la actividad analizada">
                <SelectField
                  value={watchedValues.actividadAnalizada ?? ''}
                  onChange={v => setValue('actividadAnalizada', v)}
                  options={ACTIVIDADES_LISTA_ALTURAS}
                  placeholder="Seleccionar actividad…"
                />
              </FieldRow>

              <FieldRow label="Por favor describe en detalle la actividad analizada">
                <SelectField
                  value={watchedValues.detalleActividad ?? ''}
                  onChange={v => setValue('detalleActividad', v)}
                  options={DETALLE_ACTIVIDAD_LISTA_ALTURAS}
                  placeholder="Seleccionar detalle…"
                />
              </FieldRow>

              <FieldRow label="Cuál es la altura promedio en la que se desarrolla la actividad">
                <SelectField
                  value={watchedValues.alturaPromedio ?? ''}
                  onChange={v => setValue('alturaPromedio', v)}
                  options={ALTURA_PROMEDIO_OPCIONES}
                  placeholder="Seleccionar altura…"
                />
              </FieldRow>

              <FieldRow label="Esta actividad es desarrollada por">
                <CheckboxGroup
                  options={DESARROLLADO_POR_OPCIONES_ALTURAS}
                  selected={desarrolladaPor}
                  onChange={setDesarrolladaPor}
                  cols={3}
                />
              </FieldRow>

              <FieldRow label="De acuerdo con la frecuencia de la ejecución de la actividad analizada">
                <SelectField
                  value={watchedValues.frecuenciaEjecucion ?? ''}
                  onChange={v => setValue('frecuenciaEjecucion', v)}
                  options={FRECUENCIA_OPCIONES}
                  placeholder="Seleccionar frecuencia…"
                />
              </FieldRow>

              <FieldRow label="Además del trabajo en alturas, ¿esta actividad cuenta con algún alto riesgo adicional?">
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
                    options={ACTIVIDADES_ALTO_RIESGO_ALTURAS}
                    selected={actividadesAltoRiesgo}
                    onChange={setActividadesAltoRiesgo}
                    cols={2}
                  />
                </FieldRow>
              )}

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <FieldRow
                label="¿Qué medidas de Prevención se utilizan para la ejecución de la actividad?"
                description="Si selecciona solo 'Permiso de Trabajo' → puntúa en Permisos. Si lo combina con otras → puntúa en Gestión de medidas."
              >
                <CheckboxGroup
                  options={MEDIDAS_PREVENCION_OPCIONES_ALTURAS}
                  selected={medidasPrevencion}
                  onChange={setMedidasPrevencion}
                  cols={2}
                />
              </FieldRow>

            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 3 – Escaleras y Andamios ──────────────────────────────── */}
          <AccordionItem value="g3" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={3} /> Escaleras y Andamios
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
                <Info className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                <span>
                  Marque <strong>"Inspección y mantenimiento"</strong> para obtener el puntaje máximo en
                  <em> Gestión del riesgo y control operacional</em>.
                  <strong> "Buen estado"</strong> otorga puntaje parcial (1 pt).
                </span>
              </div>
              <div className="space-y-4">
                {ESCALERAS_ITEMS.map(({ field, label, opts }) => (
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

          {/* ── GRUPO 4 – Arneses y Sistemas de Protección ──────────────────── */}
          <AccordionItem value="g4" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={4} /> Arneses y Sistemas de Protección contra Caídas
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
                <Info className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                <span>
                  Marque <strong>"Inspección anual vigente"</strong> para el puntaje máximo en
                  <em> Gestión de equipos y sistemas</em>.
                  <strong> "Buen estado"</strong> otorga puntaje parcial (1 pt).
                </span>
              </div>
              <div className="space-y-4">
                {ARNESES_ITEMS.map(({ field, label, opts }) => (
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

          {/* ── GRUPO 5 – Equipos de Emergencia y EPP ───────────────────────── */}
          <AccordionItem value="g5" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={5} /> Equipos de Emergencia y EPP
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-md p-2">
                <Info className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                <span>
                  Marque <strong>"Se utiliza"</strong> en equipos de emergencia para el puntaje máximo en
                  <em> Gestión de emergencias</em>. <strong>"Buen estado"</strong> otorga puntaje parcial.
                </span>
              </div>

              <div className="space-y-4">
                {EMERGENCIAS_ITEMS.map(({ field, label, opts }) => (
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

              <Separator />

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-sm mb-3">Seleccione los EPP que son utilizados en la actividad</h4>
                <CheckboxGroup
                  options={EPP_OPCIONES_ALTURAS}
                  selected={eppUtilizados}
                  onChange={setEppUtilizados}
                  cols={3}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ── GRUPO 6 – Firma y Cierre ─────────────────────────────────────── */}
          <AccordionItem value="g6" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/50">
              <span className="font-semibold text-sm flex items-center gap-2">
                <GroupBadge n={6} /> Firma y Cierre
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6 pt-4 space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="¿Se han presentado cargos de alturas en el desarrollo de esta actividad?">
                  <SelectField
                    value={watchedValues.seHanPresentadoCargos ?? ''}
                    onChange={v => setValue('seHanPresentadoCargos', v)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <PenLine className="h-4 w-4 text-sky-600" /> Asesor SST
                  </h4>
                  <FieldRow label="Nombre del SST">
                    <Input placeholder="Nombre completo del asesor SST" {...register('nombreSST')} className="h-10 text-sm" />
                  </FieldRow>
                  <FieldRow label="Firma del SST">
                    <InlineSignaturePad label="SST" value={firmaSST} onChange={setFirmaSST} />
                  </FieldRow>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <PenLine className="h-4 w-4 text-sky-600" /> Persona Responsable
                  </h4>
                  <FieldRow label="Nombre de la persona responsable">
                    <Input placeholder="Nombre completo del responsable" {...register('nombreResponsable')} className="h-10 text-sm" />
                  </FieldRow>
                  <FieldRow label="Firma de la persona responsable">
                    <InlineSignaturePad label="Responsable" value={firmaResponsable} onChange={setFirmaResponsable} />
                  </FieldRow>
                </div>

              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* Bottom actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/alturas/diagnostico')} disabled={isSaving}>
            Cancelar
          </Button>
          <Button type="button" variant="outline" onClick={saveDraft} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar borrador
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Guardar diagnóstico
          </Button>
        </div>
      </form>
    </div>
  );
}
