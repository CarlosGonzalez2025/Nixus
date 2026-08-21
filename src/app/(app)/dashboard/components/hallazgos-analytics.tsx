'use client';

import { useMemo, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import type { Hallazgo } from '@/types';
import {
  ESTADO_META, HALLAZGO_ESTADOS, breakdownEstados, EJES_PELIGRO, PELIGRO_OTROS,
  PELIGRO_CATALOGO,
  coberturaPorPlanta, resumenPorPrograma, detalleOtrosPeligros, colorDePeligro,
  peligrosEstandar, esResuelto, resumenPorPersonal,
  type PlantaCobertura, type ProgramaResumen,
} from '@/lib/hallazgos-analytics';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  AlertTriangle, CheckCircle, Factory, Radar as RadarIcon, Target, ShieldAlert, Info,
} from 'lucide-react';

/** Opción de consolidado del selector de planta del radar. */
const TODAS_LAS_PLANTAS = 'Todas las plantas';

// Alto visible de la matriz: 10 filas. Las medidas son las reales del markup
// (fila ≈ 57px con nombre + subtítulo y padding; encabezado ≈ 72px con etiquetas
// a dos líneas), de modo que el corte caiga limpio entre filas.
const FILAS_VISIBLES = 10;
const ALTO_FILA = 57;
const ALTO_ENCABEZADO = 72;

// ─── Piezas reutilizables ──────────────────────────────────────────────────────

function KpiTile({
  label, value, suffix, hint, accent, icon: Icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  hint?: string;
  accent: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 flex flex-col gap-1" title={hint}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
        <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} />
      </div>
      <span className="text-2xl font-bold text-gray-900 tabular-nums leading-none mt-1">
        {value}{suffix && <span className="text-base font-semibold text-gray-400 ml-0.5">{suffix}</span>}
      </span>
      {hint && <span className="text-[11px] text-gray-400 leading-snug">{hint}</span>}
    </div>
  );
}

/** Barra de progreso con color por umbral (rojo < 50, ámbar < 80, verde ≥ 80). */
function MeterBar({ pct, className }: { pct: number; className?: string }) {
  const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626';
  return (
    <div className={cn('h-2 rounded-full bg-gray-100 overflow-hidden', className)}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

/** #rrggbb → rgba(r,g,b,alpha). Tinta solo el fondo, nunca el texto. */
function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Celda de la matriz Planta × Programa: intensidad = volumen, color = programa. */
function MatrixCell({ count, max, color }: { count: number; max: number; color: string }) {
  if (count === 0) {
    return (
      <div className="h-9 rounded-md border border-dashed border-gray-200 flex items-center justify-center"
        title="Sin hallazgos registrados para este programa">
        <span className="text-[11px] text-gray-300">—</span>
      </div>
    );
  }
  // Intensidad proporcional al volumen, con piso 0.25 para que un único hallazgo
  // siga siendo visible. El texto va sobre el fondo tintado, no atenuado con él:
  // en tintes claros se pinta oscuro para conservar el contraste.
  const ratio = max === 0 ? 1 : count / max;
  const alpha = 0.25 + ratio * 0.75;
  return (
    <div className="h-9 rounded-md flex items-center justify-center font-bold text-[13px] tabular-nums"
      style={{ backgroundColor: withAlpha(color, alpha), color: alpha >= 0.6 ? '#fff' : '#1f2937' }}>
      {count}
    </div>
  );
}

/** Fila de desempeño de un programa: % resuelto, volumen y estado del backlog. */
function ProgramaRow({ p, compact = false }: { p: ProgramaResumen; compact?: boolean }) {
  return (
    <div className={cn('space-y-1.5', p.total === 0 && 'opacity-45')}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-2 min-w-0">
          <span
            className={cn('rounded-full shrink-0', compact ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5')}
            style={{ backgroundColor: p.color }}
          />
          <span className={cn('truncate', compact ? 'text-gray-500' : 'font-medium text-gray-700')}
            title={p.programa}>
            {p.programa}
          </span>
        </span>
        <span className="shrink-0 tabular-nums text-gray-500">
          <span className="font-bold text-gray-800">{p.pctResueltos}%</span>
          <span className="mx-1.5 text-gray-300">|</span>
          {p.total} hallazgo{p.total !== 1 ? 's' : ''}
        </span>
      </div>
      <MeterBar pct={p.pctResueltos} className={compact ? 'h-1.5' : undefined} />
      {!compact && (
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span>{p.plantasCubiertas} planta{p.plantasCubiertas !== 1 ? 's' : ''}</span>
          <span>·</span>
          <span>{p.abiertos} abierto{p.abiertos !== 1 ? 's' : ''}</span>
          <span>·</span>
          <span>{p.Cerrado} cerrado{p.Cerrado !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────

export function HallazgosAnalytics({ hallazgos }: { hallazgos: Hallazgo[] }) {
  const [metricaRadar, setMetricaRadar] = useState<'volumen' | 'cierre'>('volumen');
  const [plantaRadar, setPlantaRadar] = useState<string>(TODAS_LAS_PLANTAS);

  const resumen = useMemo(() => breakdownEstados(hallazgos), [hallazgos]);
  const plantas = useMemo(() => coberturaPorPlanta(hallazgos), [hallazgos]);
  const programas = useMemo(() => resumenPorPrograma(hallazgos), [hallazgos]);
  const otros = useMemo(() => detalleOtrosPeligros(hallazgos), [hallazgos]);

  // Ejes de radar y matriz: los cinco peligros estándar, más «Otros» solo si hay
  // algo dentro. Nunca un eje por cada texto libre — eso es lo que los saturaba.
  const ejes = useMemo(
    () => EJES_PELIGRO.filter(e => e !== PELIGRO_OTROS || otros.length > 0),
    [otros.length],
  );

  // Si la planta elegida desaparece del alcance (por los filtros globales del
  // dashboard), el radar vuelve al consolidado en vez de quedarse en blanco.
  const plantaActiva = plantas.some(p => p.planta === plantaRadar) ? plantaRadar : TODAS_LAS_PLANTAS;

  // Distribución por estado — ahora con los CUATRO estados, no solo abierto/cerrado.
  const estadoData = useMemo(
    () => HALLAZGO_ESTADOS
      .map(e => ({ name: e, value: resumen[e], color: ESTADO_META[e].color, help: ESTADO_META[e].help }))
      .filter(e => e.value > 0),
    [resumen],
  );

  // Personal expuesto: solo categorías con datos, para no dibujar rebanadas vacías.
  const personalData = useMemo(
    () => resumenPorPersonal(hallazgos).filter(p => p.total > 0),
    [hallazgos],
  );

  /** % de hallazgos que involucran contratistas (foco de gestión con terceros). */
  const pctContratistas = useMemo(() => {
    const contratistas = personalData.find(p => p.categoria === 'Contratistas')?.total ?? 0;
    return resumen.total === 0 ? 0 : Math.round((contratistas / resumen.total) * 100);
  }, [personalData, resumen.total]);

  const claseData = useMemo(() => [
    { name: 'Clase A', value: hallazgos.filter(h => h.clase === 'A').length, color: '#dc2626' },
    { name: 'Clase B', value: hallazgos.filter(h => h.clase === 'B').length, color: '#d97706' },
    { name: 'Clase C', value: hallazgos.filter(h => h.clase === 'C').length, color: '#2563eb' },
  ].filter(c => c.value > 0), [hallazgos]);

  // Resueltos por planta+programa en una sola pasada, para que el radar de
  // «% resolución» no recorra la colección completa por cada celda.
  const resueltosPorCelda = useMemo(() => {
    const mapa: Record<string, number> = {};
    hallazgos.forEach(h => {
      if (!esResuelto(h)) return;
      const planta = h.planta?.trim() || 'No especificado';
      peligrosEstandar(h).forEach(p => {
        const key = `${planta}||${p}`;
        mapa[key] = (mapa[key] ?? 0) + 1;
      });
    });
    return mapa;
  }, [hallazgos]);

  // Radar de PELIGROS: un eje por peligro del catálogo. La serie se recalcula con
  // la planta elegida en el selector; «Todas las plantas» muestra el consolidado.
  // El dataKey es fijo (`valor`) para no depender del nombre de la planta: recharts
  // resuelve el dataKey como ruta de objeto y un nombre con puntos lo rompería.
  const radarData = useMemo(() => ejes.map(peligro => {
    const total = plantaActiva === TODAS_LAS_PLANTAS
      ? plantas.reduce((acc, p) => acc + (p.porPrograma[peligro] ?? 0), 0)
      : plantas.find(p => p.planta === plantaActiva)?.porPrograma[peligro] ?? 0;

    const resueltos = plantaActiva === TODAS_LAS_PLANTAS
      ? plantas.reduce((acc, p) => acc + (resueltosPorCelda[`${p.planta}||${peligro}`] ?? 0), 0)
      : resueltosPorCelda[`${plantaActiva}||${peligro}`] ?? 0;

    const pctCierre = total === 0 ? 0 : Math.round((resueltos / total) * 100);

    return {
      peligro,
      valor: metricaRadar === 'volumen' ? total : pctCierre,
      total,
      resueltos,
      pctCierre,
      color: colorDePeligro(peligro),
    };
  }), [ejes, plantaActiva, plantas, metricaRadar, resueltosPorCelda]);

  const radarColor = plantaActiva === TODAS_LAS_PLANTAS ? '#2563eb' : '#7c3aed';

  const maxMatriz = useMemo(
    () => Math.max(0, ...plantas.flatMap(p => ejes.map(c => p.porPrograma[c] ?? 0))),
    [plantas, ejes],
  );

  const claseAAbiertos = useMemo(
    () => plantas.reduce((acc, p) => acc + p.claseAAbiertos, 0),
    [plantas],
  );

  if (resumen.total === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-white border-b px-6 py-5">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Analítica de Hallazgos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[220px] flex flex-col items-center justify-center gap-3">
            <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="h-7 w-7 text-green-500" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Sin hallazgos registrados</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 min-w-0">

      {/* ── KPIs de gestión ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 min-w-0">
        <KpiTile label="Total" value={resumen.total} accent="#475569" icon={ShieldAlert}
          hint="Hallazgos en el alcance filtrado" />
        <KpiTile label="Pendientes" value={resumen.Pendiente} accent={ESTADO_META['Pendiente'].color}
          icon={AlertTriangle} hint={ESTADO_META['Pendiente'].help} />
        <KpiTile label="En Progreso" value={resumen['En Progreso']} accent={ESTADO_META['En Progreso'].color}
          icon={Target} hint={ESTADO_META['En Progreso'].help} />
        <KpiTile label="Cerrados" value={resumen.Cerrado} accent={ESTADO_META['Cerrado'].color}
          icon={CheckCircle} hint={ESTADO_META['Cerrado'].help} />
        <KpiTile label="Resolución" value={resumen.pctResueltos} suffix="%" accent="#16a34a" icon={Target}
          hint={`${resumen.resueltos} de ${resumen.total} hallazgos cerrados`} />
      </div>

      {/* ── Distribución: estado (4 estados) + clase ───────────────────────── */}
      <Card className="border-0 shadow-md overflow-hidden min-w-0">
        <CardHeader className="bg-white border-b px-4 sm:px-6 py-4 sm:py-5">
          <CardTitle className="text-base sm:text-xl text-gray-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" /> Analítica de Hallazgos
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Ciclo de vida del hallazgo, prioridad de intervención y personal expuesto.
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto min-w-0">

            {/* Estado — los 4 estados */}
            <div className="flex flex-col items-center">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Estado del cumplimiento</p>
              <div className="relative h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={estadoData} innerRadius={62} outerRadius={84} paddingAngle={3} dataKey="value" stroke="none">
                      {estadoData.map((e, i) => <Cell key={`estado-${i}`} fill={e.color} />)}
                    </Pie>
                    <RechartsTooltip
                      formatter={(v: number, n: string) => [`${v} (${Math.round((v / resumen.total) * 100)}%)`, n]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-gray-800 leading-none">{resumen.total}</span>
                  <span className="text-[10px] text-gray-400 font-medium mt-1">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5 w-full max-w-[300px]">
                {HALLAZGO_ESTADOS.map(e => (
                  <div key={e} className="flex items-center gap-2.5" title={ESTADO_META[e].help}>
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ESTADO_META[e].color }} />
                    <span className="text-sm text-gray-600 flex-1">{ESTADO_META[e].label}</span>
                    <span className="text-[11px] text-gray-400 tabular-nums">
                      {resumen.total > 0 ? Math.round((resumen[e] / resumen.total) * 100) : 0}%
                    </span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full tabular-nums">
                      {resumen[e]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4 leading-snug flex items-start gap-1.5 max-w-[300px]">
                <Info className="h-3.5 w-3.5 shrink-0 mt-px" />
                <span>
                  <strong className="text-gray-500">Abiertos</strong> = Pendiente + En Progreso.{' '}
                  <strong className="text-gray-500">Cerrado</strong> es el estado terminal: acción implementada y verificada.
                </span>
              </p>
            </div>

            {/* Clase de riesgo */}
            <div className="flex flex-col items-center">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Por clase de riesgo</p>
              <div className="relative h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={claseData} innerRadius={62} outerRadius={84} paddingAngle={3} dataKey="value" stroke="none">
                      {claseData.map((c, i) => <Cell key={`clase-${i}`} fill={c.color} />)}
                    </Pie>
                    <RechartsTooltip
                      formatter={(v: number, n: string) => [`${v} (${Math.round((v / resumen.total) * 100)}%)`, n]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-red-600 leading-none tabular-nums">{claseAAbiertos}</span>
                  <span className="text-[10px] text-gray-400 font-medium mt-1 text-center px-6">Clase A sin resolver</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5 w-full max-w-[300px]">
                {claseData.map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-sm text-gray-600 flex-1">{c.name}</span>
                    <span className="text-[11px] text-gray-400 tabular-nums">
                      {Math.round((c.value / resumen.total) * 100)}%
                    </span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full tabular-nums">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal expuesto — propio vs. contratistas */}
            <div className="flex flex-col items-center">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Personal expuesto</p>
              <div className="relative h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={personalData} innerRadius={62} outerRadius={84} paddingAngle={3} dataKey="total" nameKey="categoria" stroke="none">
                      {personalData.map((p, i) => <Cell key={`personal-${i}`} fill={p.color} />)}
                    </Pie>
                    <RechartsTooltip
                      formatter={(v: number, n: string) => [`${v} hallazgo${v !== 1 ? 's' : ''}`, n]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-gray-800 leading-none tabular-nums">{pctContratistas}%</span>
                  <span className="text-[10px] text-gray-400 font-medium mt-1 text-center px-6">Contratistas</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5 w-full max-w-[300px]">
                {personalData.map(p => (
                  <div key={p.categoria} className="flex items-center gap-2.5"
                    title={`${p.total} hallazgos · ${p.pctResueltos}% cerrados`}>
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-sm text-gray-600 flex-1 truncate">{p.categoria}</span>
                    <span className="text-[11px] text-gray-400 tabular-nums">{p.pctResueltos}% cerr.</span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full tabular-nums">
                      {p.total}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4 leading-snug max-w-[300px]">
                Un hallazgo puede exponer a personal propio y contratista a la vez, por lo que la suma
                puede superar el total.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Radar de peligros, dinámico por planta ────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 min-w-0">
        <Card className="border-0 shadow-md overflow-hidden xl:col-span-3 min-w-0">
          <CardHeader className="bg-white border-b px-4 sm:px-6 py-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
                  <RadarIcon className="h-4 w-4 text-blue-500 shrink-0" /> Radar de peligros
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Peligros estándar más «{PELIGRO_OTROS}». Cambie la planta para ver su perfil de riesgo.
                </p>
              </div>
              {/* Selector de métrica */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs shrink-0">
                {([['volumen', 'Nº hallazgos'], ['cierre', '% resolución']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setMetricaRadar(key)}
                    className={cn(
                      'px-2.5 sm:px-3 py-1.5 font-medium transition-colors whitespace-nowrap',
                      metricaRadar === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50',
                    )}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 min-w-0">
            {/* Selector de planta — gobierna la serie del radar */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Factory className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <Select value={plantaActiva} onValueChange={setPlantaRadar}>
                <SelectTrigger className="h-8 flex-1 min-w-[170px] sm:flex-none sm:w-[240px] text-xs bg-gray-50 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TODAS_LAS_PLANTAS}>
                    {TODAS_LAS_PLANTAS} ({resumen.total})
                  </SelectItem>
                  {plantas.map(p => (
                    <SelectItem key={p.planta} value={p.planta}>
                      {p.planta} ({p.total})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {plantaActiva !== TODAS_LAS_PLANTAS && (
                <Badge variant="outline" className="text-[10px] text-gray-500 font-normal">
                  {plantas.find(p => p.planta === plantaActiva)?.pctCobertura ?? 0}% de peligros cubiertos
                </Badge>
              )}
            </div>

            <div className="h-[300px] sm:h-[330px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="peligro" tick={{ fontSize: 10, fill: '#4b5563' }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={metricaRadar === 'cierre' ? [0, 100] : undefined}
                    tick={{ fontSize: 9, fill: '#9ca3af' }} />
                  <Radar
                    name={plantaActiva}
                    dataKey="valor"
                    stroke={radarColor}
                    fill={radarColor}
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ r: 3, fill: radarColor }} />
                  <RechartsTooltip
                    formatter={(v: number) => [
                      metricaRadar === 'cierre' ? `${v}%` : `${v} hallazgo${v !== 1 ? 's' : ''}`,
                      plantaActiva,
                    ]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Cifras del radar: el gráfico da la forma, la tabla da el dato exacto. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-gray-100">
              {radarData.map(r => (
                <div key={r.peligro} className={cn('flex items-center gap-2 text-xs', r.total === 0 && 'opacity-45')}>
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-gray-600 truncate flex-1 min-w-0">{r.peligro}</span>
                  <span className="tabular-nums text-gray-400 shrink-0">
                    {r.total} · <span className="font-semibold text-gray-700">{r.pctCierre}%</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-400 mt-3 leading-snug">
              {metricaRadar === 'volumen'
                ? 'Un eje corto es un vacío de cobertura: ese peligro casi no se ha inspeccionado, no significa que no haya riesgo.'
                : 'Porcentaje de hallazgos del peligro que ya fueron cerrados.'}
            </p>
          </CardContent>
        </Card>

        {/* ── Desempeño por programa ──────────────────────────────────────── */}
        <Card className="border-0 shadow-md overflow-hidden xl:col-span-2 min-w-0 flex flex-col">
          <CardHeader className="bg-white border-b px-4 sm:px-6 py-4 shrink-0">
            <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-500 shrink-0" /> Desempeño por programa
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">% de hallazgos resueltos y plantas alcanzadas.</p>
          </CardHeader>

          {/* Alto fijo + scroll interno: la tarjeta no crece con el número de
              programas, así queda alineada con el radar de al lado. */}
          <CardContent className="p-0 min-w-0">
            <div className="h-[420px] overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-4">
              {programas.every(p => p.total === 0) ? (
                <p className="text-sm text-gray-400 py-8 text-center">
                  Ningún hallazgo tiene un peligro asignado.
                </p>
              ) : (
                <>
                  {/* Los cinco estándar siempre (un 0 también informa: no se ha
                      inspeccionado); «Otros» solo si tiene contenido. */}
                  {programas
                    .filter(p => p.programa !== PELIGRO_OTROS || p.total > 0)
                    .map(p => <ProgramaRow key={p.programa} p={p} />)}

                  {/* Detalle de «Otros»: los gráficos lo agrupan en un solo eje,
                      aquí se puede ver qué se escribió realmente. */}
                  {otros.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        Detalle de «{PELIGRO_OTROS}» ({otros.length})
                      </p>
                      {otros.map(o => (
                        <ProgramaRow key={o.programa} p={o} compact />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="text-[10px] text-gray-400 px-4 sm:px-5 py-2.5 border-t border-gray-100 leading-snug">
              Un hallazgo puede abarcar varios peligros, por lo que la suma por programa puede superar el total.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Matriz Planta × Programa + ranking ─────────────────────────────── */}
      <Card className="border-0 shadow-md overflow-hidden min-w-0">
        <CardHeader className="bg-white border-b px-4 sm:px-6 py-4">
          <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
            <Factory className="h-4 w-4 text-emerald-500 shrink-0" /> Matriz de cobertura por planta
          </CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Peligros abordados en cada planta, cobertura del catálogo y avance del cierre.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {/* Doble scroll DENTRO de la tarjeta: horizontal porque la matriz es ancha,
              vertical acotado a FILAS_VISIBLES para que no crezca con el nº de plantas.
              El encabezado va `sticky` para no perder la referencia al desplazarse. */}
          <div
            className="overflow-auto max-w-full"
            style={{ maxHeight: ALTO_ENCABEZADO + FILAS_VISIBLES * ALTO_FILA }}
          >
            <table className="w-full min-w-[760px] text-sm border-separate border-spacing-0">
              <thead className="sticky top-0 z-20">
                <tr className="bg-gray-50">
                  <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-5 py-3 border-b bg-gray-50 sticky left-0 z-30">Planta</th>
                  {ejes.map(c => (
                    <th key={c} className="px-2 py-3 text-center font-semibold text-[10px] uppercase tracking-wide text-gray-500 min-w-[100px] border-b bg-gray-50">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: colorDePeligro(c) }} />
                        {c}
                      </span>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center font-semibold text-[10px] uppercase tracking-wide text-gray-500 min-w-[110px] border-b bg-gray-50">Cobertura</th>
                  <th className="px-3 py-3 text-center font-semibold text-[10px] uppercase tracking-wide text-gray-500 min-w-[130px] border-b bg-gray-50">Resolución</th>
                  <th className="px-3 py-3 text-center font-semibold text-[10px] uppercase tracking-wide text-gray-500 min-w-[80px] border-b bg-gray-50">Clase A</th>
                </tr>
              </thead>
              <tbody>
                {plantas.map(p => (
                  <PlantaRow key={p.planta} p={p} ejes={ejes} max={maxMatriz} />
                ))}
              </tbody>
            </table>
          </div>

          {plantas.length > FILAS_VISIBLES && (
            <div className="px-4 sm:px-5 py-2 border-t border-gray-100 text-[11px] text-gray-400">
              Mostrando {FILAS_VISIBLES} de {plantas.length} plantas — desplácese dentro de la tabla para ver el resto.
            </div>
          )}

          <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-gray-400">
            <span><strong className="text-gray-500">Cobertura</strong>: peligros del catálogo estándar con al menos un hallazgo (no cuenta «{PELIGRO_OTROS}»).</span>
            <span><strong className="text-gray-500">Resolución</strong>: hallazgos ya cerrados sobre el total de la planta.</span>
            <span><strong className="text-gray-500">Clase A</strong>: riesgos críticos aún sin resolver.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PlantaRow({ p, ejes, max }: { p: PlantaCobertura; ejes: string[]; max: number }) {
  // Con `border-separate` (necesario para el thead sticky) los bordes de <tr> no se
  // pintan: van en cada celda. La columna de planta queda fija al scrollear en
  // horizontal, con fondo propio para que las celdas no se transparenten debajo.
  const td = 'border-b border-gray-100 group-hover:bg-gray-50/60 transition-colors';
  return (
    <tr className="group">
      <td className={cn(td, 'px-5 py-2.5 sticky left-0 z-10 bg-white')}>
        <p className="font-medium text-gray-800 text-sm leading-tight">{p.planta}</p>
        <p className="text-[11px] text-gray-400 tabular-nums">{p.total} hallazgo{p.total !== 1 ? 's' : ''}</p>
      </td>
      {ejes.map(c => (
        <td key={c} className={cn(td, 'px-2 py-2')}>
          <MatrixCell count={p.porPrograma[c] ?? 0} max={max} color={colorDePeligro(c)} />
        </td>
      ))}
      <td className={cn(td, 'px-3 py-2')}>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-xs font-bold tabular-nums text-gray-700">{p.pctCobertura}%</span>
          <MeterBar pct={p.pctCobertura} className="w-full" />
          <span className="text-[10px] text-gray-400 tabular-nums">
            {p.programasCubiertos}/{PELIGRO_CATALOGO.length} peligros
          </span>
        </div>
      </td>
      <td className={cn(td, 'px-3 py-2')}>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-xs font-bold tabular-nums text-gray-700">{p.pctResueltos}%</span>
          <MeterBar pct={p.pctResueltos} className="w-full" />
          <span className="text-[10px] text-gray-400 tabular-nums">
            {p.abiertos} abierto{p.abiertos !== 1 ? 's' : ''} · {p.Cerrado} cerrado{p.Cerrado !== 1 ? 's' : ''}
          </span>
        </div>
      </td>
      <td className={cn(td, 'px-3 py-2 text-center')}>
        {p.claseAAbiertos > 0 ? (
          <Badge className="bg-red-100 text-red-700 border-0 tabular-nums">{p.claseAAbiertos}</Badge>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        )}
      </td>
    </tr>
  );
}
