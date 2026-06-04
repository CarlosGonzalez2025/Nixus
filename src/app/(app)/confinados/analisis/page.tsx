'use client';

import { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2,
  BarChart2, Loader2, Activity, Lightbulb, Filter, X, Brain,
  ShieldAlert, Users, Wrench,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDiagnosticos } from '@/hooks/use-diagnosticos';
import {
  analyzeConfinados, SCORE_LABELS_SHORT, SCORE_KEYS,
} from '@/lib/analytics/confinados-analytics';
import type { DiagnosticoConfinado } from '@/types/confinados';
import { cn } from '@/lib/utils';

// ── Palette ──────────────────────────────────────────────────────────────────

const CHART_PALETTE = ['#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#8b5cf6', '#0ea5e9'];
const GRADO_COLORS: Record<string, string> = {
  'Grado A': '#ef4444',
  'Grado B': '#f59e0b',
  'Grado C': '#22c55e',
};

// ── Additional stats ──────────────────────────────────────────────────────────

interface AdditionalStats {
  tipoEspacio: { name: string; value: number }[];
  gradoPeligrosidad: { name: string; value: number }[];
  desarrolladaPor: { name: string; value: number }[];
  equiposCriticos: { name: string; pct: number }[];
  iperRate: number;
  altoRiesgoAdicionalRate: number;
  completadoRate: number;
}

const EQUIPO_FIELDS: { key: keyof DiagnosticoConfinado; name: string }[] = [
  { key: 'sistemaVentilacionMecanica', name: 'Ventilación Mecánica' },
  { key: 'tripodeEquipoRescate',       name: 'Trípode / Rescate' },
  { key: 'equipoComunicacion',         name: 'Comunicación' },
  { key: 'autoContenido',              name: 'Equipo Autocontenido' },
  { key: 'sistemaProteccionCaidas',    name: 'Protección Caídas' },
  { key: 'arnesCuerpoCompleto',        name: 'Arnés Cuerpo Completo' },
];

function computeAdditionalStats(data: DiagnosticoConfinado[]): AdditionalStats {
  const n = data.length || 1;

  const countMap = <K extends string>(items: K[]) =>
    items.reduce<Record<string, number>>((acc, v) => { acc[v] = (acc[v] ?? 0) + 1; return acc; }, {});

  const toEntries = (map: Record<string, number>) =>
    Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const tipoEspacio = toEntries(
    countMap(data.map(d => d.tipoEspacioConfinado || 'Sin especificar')),
  );

  const gradoPeligrosidad = toEntries(
    countMap(data.map(d => d.gradoPeligrosidad || 'Sin especificar')),
  );

  const devFlat = data.flatMap(d => d.desarrolladaPor ?? []).filter(Boolean);
  const desarrolladaPor = toEntries(countMap(devFlat)).slice(0, 7);

  const equiposCriticos = EQUIPO_FIELDS.map(({ key, name }) => {
    const withEquip = data.filter(d => {
      const arr = d[key] as string[] | undefined;
      return arr?.some(v => v.toLowerCase().includes('utiliza'));
    }).length;
    return { name, pct: Math.round((withEquip / n) * 100) };
  });

  const iperRate         = Math.round((data.filter(d => d.evaluadaEnIPER === 'Si').length / n) * 100);
  const altoRiesgoAdicionalRate = Math.round((data.filter(d => d.tieneAltoRiesgoAdicional === 'Si').length / n) * 100);
  const completadoRate   = Math.round((data.filter(d => d.status === 'completado').length / n) * 100);

  return { tipoEspacio, gradoPeligrosidad, desarrolladaPor, equiposCriticos, iperRate, altoRiesgoAdicionalRate, completadoRate };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon: Icon, color, badge }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; badge?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={cn('p-2 rounded-lg', color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          {badge}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p>
          {sub && <p className="text-[11px] text-muted-foreground/80 mt-1">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function MiniBar({ pct, level }: { pct: number; level: 'alto' | 'medio' | 'cumple' }) {
  const color = level === 'alto' ? 'bg-red-500' : level === 'medio' ? 'bg-amber-500' : 'bg-green-500';
  return (
    <div className="h-1.5 bg-muted rounded-full">
      <div className={cn('h-1.5 rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

function RiskBadge({ level }: { level: 'alto' | 'medio' | 'cumple' }) {
  const map = {
    alto:   'bg-red-100 text-red-700 border-red-200',
    medio:  'bg-amber-100 text-amber-700 border-amber-200',
    cumple: 'bg-green-100 text-green-700 border-green-200',
  };
  const labels = { alto: 'Alto Riesgo', medio: 'Riesgo Medio', cumple: 'Cumple' };
  return <Badge variant="outline" className={cn('text-[10px]', map[level])}>{labels[level]}</Badge>;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ConfinadosAnalisisPage() {
  const [filterEmpresa, setFilterEmpresa] = useState('all');
  const [filterPlanta,  setFilterPlanta]  = useState('all');
  const [filterYear,    setFilterYear]    = useState('all');
  const [filterStatus,  setFilterStatus]  = useState('all');

  const { diagnosticos, loading } = useDiagnosticos();

  const opts = useMemo(() => ({
    empresas: [...new Set(diagnosticos.map(d => d.empresa).filter(Boolean))].sort() as string[],
    plantas:  [...new Set(diagnosticos.map(d => d.planta).filter(Boolean))].sort()  as string[],
    years:    [...new Set(diagnosticos.map(d => d.fecha?.slice(0, 4)).filter(Boolean))].sort().reverse() as string[],
  }), [diagnosticos]);

  const filtered = useMemo(() => diagnosticos.filter(d => {
    if (filterEmpresa !== 'all' && d.empresa !== filterEmpresa) return false;
    if (filterPlanta  !== 'all' && d.planta  !== filterPlanta)  return false;
    if (filterYear    !== 'all' && d.fecha?.slice(0, 4) !== filterYear) return false;
    if (filterStatus  !== 'all' && d.status !== filterStatus)   return false;
    return true;
  }), [diagnosticos, filterEmpresa, filterPlanta, filterYear, filterStatus]);

  const analytics    = useMemo(() => analyzeConfinados(filtered), [filtered]);
  const extraStats   = useMemo(() => computeAdditionalStats(filtered), [filtered]);

  const hasFilters = filterEmpresa !== 'all' || filterPlanta !== 'all' || filterYear !== 'all' || filterStatus !== 'all';

  function resetFilters() {
    setFilterEmpresa('all'); setFilterPlanta('all');
    setFilterYear('all');    setFilterStatus('all');
  }

  // ── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Cargando datos de análisis...</p>
        </div>
      </div>
    );
  }

  // ── Chart data ─────────────────────────────────────────────────────────────

  const { kpis, trend, clusters, orgStats, anomalies, recommendations, dimStats } = analytics;

  const riskPieData = [
    { name: 'Alto Riesgo (≤50%)',    value: kpis.highRisk,   color: '#ef4444' },
    { name: 'Riesgo Medio (50–70%)', value: kpis.mediumRisk, color: '#f59e0b' },
    { name: 'Cumple (>70%)',          value: kpis.lowRisk,    color: '#22c55e' },
  ].filter(d => d.value > 0);

  const dimBarData = dimStats.map(d => ({
    name:     SCORE_LABELS_SHORT[d.key],
    cumple:   d.compliant,
    noCumple: parseFloat((100 - d.compliant).toFixed(1)),
  }));

  const radarData = dimStats.map(d => ({
    subject:  SCORE_LABELS_SHORT[d.key],
    value:    d.compliant,
    fullMark: 100,
  }));

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-600" />
            Análisis — Espacios Confinados
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Estadística descriptiva, clustering K-Means, regresión lineal y detección de anomalías.
          </p>
        </div>
        {hasFilters && (
          <Button variant="outline" size="sm" onClick={resetFilters} className="self-start shrink-0">
            <X className="h-3 w-3 mr-1" /> Limpiar filtros
          </Button>
        )}
      </div>

      {/* Filters ──────────────────────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />

            <Select value={filterEmpresa} onValueChange={setFilterEmpresa}>
              <SelectTrigger className="h-8 w-44 text-xs">
                <SelectValue placeholder="Organización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las organizaciones</SelectItem>
                {opts.empresas.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={filterPlanta} onValueChange={setFilterPlanta}>
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="Planta / Sede" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las sedes</SelectItem>
                {opts.plantas.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="h-8 w-24 text-xs">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los años</SelectItem>
                {opts.years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
              </SelectContent>
            </Select>

            {hasFilters && (
              <Badge variant="secondary" className="text-xs font-normal">
                {filtered.length} de {diagnosticos.length} registros
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Empty state ──────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <Card className="flex-1">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <BarChart2 className="h-12 w-12 text-muted-foreground/30" />
            <div>
              <p className="font-medium text-muted-foreground">Sin datos para analizar</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {hasFilters
                  ? 'No hay registros que coincidan con los filtros aplicados.'
                  : 'Crea diagnósticos en el módulo de Diagnóstico para ver el análisis aquí.'}
              </p>
            </div>
            {hasFilters && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="h-3 w-3 mr-1" /> Limpiar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPI Row ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
              label="Total registros analizados"
              value={kpis.total}
              sub={`${kpis.empresas} org. · ${kpis.plantas} sede${kpis.plantas !== 1 ? 's' : ''} · ${extraStats.completadoRate}% completados`}
              icon={Activity}
              color="bg-violet-600"
            />
            <KpiCard
              label="Cumplimiento promedio"
              value={`${kpis.avgPct.toFixed(1)}%`}
              sub={`Mediana ${kpis.medianPct.toFixed(1)}% · σ ${kpis.stdDev.toFixed(1)} · P25–P75: ${kpis.p25.toFixed(0)}%–${kpis.p75.toFixed(0)}%`}
              icon={BarChart2}
              color="bg-blue-600"
              badge={
                trend.points.length >= 2 ? (
                  <Badge variant="outline" className={cn('text-[10px]', {
                    'text-green-600 border-green-200': trend.direction === 'Mejorando',
                    'text-red-600   border-red-200':   trend.direction === 'Deteriorando',
                    'text-gray-500':                    trend.direction === 'Estable',
                  })}>
                    {trend.direction === 'Mejorando'    && <TrendingUp   className="h-2.5 w-2.5 mr-0.5 inline" />}
                    {trend.direction === 'Deteriorando' && <TrendingDown className="h-2.5 w-2.5 mr-0.5 inline" />}
                    {trend.direction === 'Estable'      && <Minus        className="h-2.5 w-2.5 mr-0.5 inline" />}
                    {trend.direction}
                  </Badge>
                ) : null
              }
            />
            <KpiCard
              label="Alto Riesgo (≤50%)"
              value={kpis.highRisk}
              sub={`${kpis.highRiskPct.toFixed(1)}% del total — requieren intervención`}
              icon={AlertTriangle}
              color="bg-red-500"
            />
            <KpiCard
              label="Cumplen (>70%)"
              value={kpis.lowRisk}
              sub={`${kpis.lowRiskPct.toFixed(1)}% del total · ${kpis.mediumRisk} en riesgo medio`}
              icon={CheckCircle2}
              color="bg-green-600"
            />
          </div>

          {/* Risk Distribution + Clusters ────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Donut */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Distribución de Riesgo</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 px-4 pb-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie
                        data={riskPieData} cx="50%" cy="50%"
                        innerRadius={52} outerRadius={80}
                        paddingAngle={3} dataKey="value"
                      >
                        {riskPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <RechartsTooltip formatter={(v: number) => [`${v} registros`]} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex-1 space-y-3 w-full">
                    {[
                      { label: 'Alto Riesgo',  count: kpis.highRisk,   pct: kpis.highRiskPct,   level: 'alto'  as const, color: 'bg-red-500'   },
                      { label: 'Riesgo Medio', count: kpis.mediumRisk, pct: kpis.mediumRiskPct, level: 'medio' as const, color: 'bg-amber-500' },
                      { label: 'Cumple',        count: kpis.lowRisk,    pct: kpis.lowRiskPct,    level: 'cumple' as const, color: 'bg-green-500' },
                    ].map(r => (
                      <div key={r.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className={cn('h-2 w-2 rounded-full', r.color)} />
                            <span className="font-medium">{r.label}</span>
                          </span>
                          <span className="text-muted-foreground">{r.count} ({r.pct.toFixed(1)}%)</span>
                        </div>
                        <MiniBar pct={r.pct} level={r.level} />
                      </div>
                    ))}
                    <Separator />
                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div><p className="text-muted-foreground">P25</p><p className="font-semibold">{kpis.p25.toFixed(1)}%</p></div>
                      <div><p className="text-muted-foreground">Mediana</p><p className="font-semibold">{kpis.medianPct.toFixed(1)}%</p></div>
                      <div><p className="text-muted-foreground">P75</p><p className="font-semibold">{kpis.p75.toFixed(1)}%</p></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* K-Means Clusters */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Segmentación K-Means (ML)</CardTitle>
                  <Badge variant="outline" className="text-[10px]">K=3 · K-Means++</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3 px-4 pb-4">
                {clusters.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-10 text-center">
                    Se necesitan mínimo 3 registros para ejecutar el clustering.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {clusters.map(cl => (
                      <div key={cl.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cl.color }} />
                            <span className="font-semibold">{cl.label}</span>
                          </span>
                          <span className="text-muted-foreground">
                            {cl.count} registros · avg {cl.avgTotal.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-2 rounded-full" style={{ width: `${cl.pct}%`, backgroundColor: cl.color }} />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {SCORE_KEYS.map(k => (
                            <span
                              key={k}
                              className={cn('text-[10px] px-1.5 py-0.5 rounded-sm', {
                                'bg-green-100 text-green-700': cl.centroid[k] >= 80,
                                'bg-amber-100 text-amber-700': cl.centroid[k] >= 40 && cl.centroid[k] < 80,
                                'bg-red-100   text-red-700':   cl.centroid[k] < 40,
                              })}
                            >
                              {SCORE_LABELS_SHORT[k]}: {cl.centroid[k]}%
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Dimension Performance: Bar + Radar ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Horizontal stacked bar */}
            <Card className="lg:col-span-3">
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Cumplimiento por Dimensión SST</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 px-2 pb-4">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={dimBarData} layout="vertical" margin={{ top: 0, right: 55, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={88} tick={{ fontSize: 10 }} />
                    <RechartsTooltip
                      formatter={(v: number, name: string) => [
                        `${v.toFixed(1)}%`,
                        name === 'cumple' ? 'Cumple' : 'No cumple',
                      ]}
                    />
                    <Bar dataKey="cumple"   name="Cumple"     stackId="a" fill="#22c55e" />
                    <Bar dataKey="noCumple" name="No cumple"  stackId="a" fill="#fee2e2" radius={[0, 4, 4, 0]}
                      label={{ position: 'right', formatter: (v: number) => v > 2 ? `${v.toFixed(0)}%` : '', fontSize: 10, fill: '#6b7280' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 justify-center text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-green-500 inline-block" /> Cumple</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-3 rounded bg-red-100  inline-block border border-red-200" /> No cumple</span>
                </div>
              </CardContent>
            </Card>

            {/* Radar */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Perfil Radar</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 px-1 pb-4">
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} tickCount={4} />
                    <Radar
                      name="Cumplimiento"
                      dataKey="value"
                      stroke="#7c3aed"
                      fill="#7c3aed"
                      fillOpacity={0.22}
                    />
                    <RechartsTooltip formatter={(v: number) => [`${v.toFixed(1)}%`, 'Cumplimiento']} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Trend Analysis ──────────────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-0 pt-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <CardTitle className="text-sm font-semibold flex-1">
                  Tendencia Temporal de Cumplimiento
                </CardTitle>
                <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                  <Badge
                    variant="outline"
                    className={cn('text-xs', {
                      'text-green-600 border-green-200': trend.direction === 'Mejorando',
                      'text-red-600   border-red-200':   trend.direction === 'Deteriorando',
                      'text-gray-500':                   trend.direction === 'Estable',
                    })}
                  >
                    {trend.direction === 'Mejorando'    && <TrendingUp   className="h-3 w-3 mr-0.5 inline" />}
                    {trend.direction === 'Deteriorando' && <TrendingDown className="h-3 w-3 mr-0.5 inline" />}
                    {trend.direction === 'Estable'      && <Minus        className="h-3 w-3 mr-0.5 inline" />}
                    {trend.direction}
                  </Badge>
                  <span>Pendiente: <strong>{trend.slope > 0 ? '+' : ''}{trend.slope.toFixed(2)}%/mes</strong></span>
                  <span>R²: <strong>{trend.r2.toFixed(2)}</strong></span>
                  <span>Pronóstico 3m: <strong>{trend.forecast3m.toFixed(1)}%</strong></span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3 px-2 pb-4">
              {trend.points.length < 2 ? (
                <p className="text-xs text-muted-foreground py-10 text-center">
                  Se necesitan al menos 2 meses de datos para mostrar la tendencia.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trend.points} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <RechartsTooltip
                      formatter={(v: number, name: string) => {
                        const labels: Record<string, string> = {
                          avgPct: 'Promedio real', movAvg3: 'Media móvil (3m)', predicted: 'Regresión lineal',
                        };
                        return [v != null ? `${v.toFixed(1)}%` : '—', labels[name] ?? name];
                      }}
                    />
                    <Legend iconSize={8} formatter={v => {
                      const l: Record<string, string> = { avgPct: 'Promedio real', movAvg3: 'Media móvil 3m', predicted: 'Regresión lineal' };
                      return <span className="text-xs">{l[v] ?? v}</span>;
                    }} />
                    <Line type="monotone" dataKey="avgPct"    stroke="#7c3aed" strokeWidth={2}   dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="movAvg3"   stroke="#2563eb" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
                    <Line type="monotone" dataKey="predicted" stroke="#94a3b8" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Space Classification + Equipment ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Space type + grade */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Clasificación de Espacios</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 px-2 pb-4 space-y-4">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground px-2 mb-1">Por Tipo</p>
                  <ResponsiveContainer width="100%" height={110}>
                    <BarChart data={extraStats.tipoEspacio} margin={{ top: 0, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                      <RechartsTooltip formatter={(v: number) => [v, 'Registros']} />
                      <Bar dataKey="value" name="Registros" radius={[4, 4, 0, 0]}>
                        {extraStats.tipoEspacio.map((_, i) => <Cell key={i} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <Separator />
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground px-2 mb-1">Por Grado de Peligrosidad</p>
                  <ResponsiveContainer width="100%" height={110}>
                    <BarChart data={extraStats.gradoPeligrosidad} margin={{ top: 0, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                      <RechartsTooltip formatter={(v: number) => [v, 'Registros']} />
                      <Bar dataKey="value" name="Registros" radius={[4, 4, 0, 0]}>
                        {extraStats.gradoPeligrosidad.map((e, i) => (
                          <Cell key={i} fill={GRADO_COLORS[e.name] ?? CHART_PALETTE[i % CHART_PALETTE.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Equipment + protocol indicators */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Equipos Críticos y Protocolos</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 px-4 pb-4 space-y-2.5">
                {extraStats.equiposCriticos.map(e => (
                  <div key={e.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{e.name}</span>
                      <span className={cn('font-semibold', {
                        'text-red-600':   e.pct < 50,
                        'text-amber-600': e.pct >= 50 && e.pct < 80,
                        'text-green-600': e.pct >= 80,
                      })}>{e.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div
                        className={cn('h-1.5 rounded-full transition-all', {
                          'bg-red-500':   e.pct < 50,
                          'bg-amber-500': e.pct >= 50 && e.pct < 80,
                          'bg-green-500': e.pct >= 80,
                        })}
                        style={{ width: `${e.pct}%` }}
                      />
                    </div>
                  </div>
                ))}

                <Separator className="my-1" />

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-violet-50 border border-violet-100 p-2">
                    <p className="text-lg font-bold text-violet-700">{extraStats.iperRate}%</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Evaluados en IPER</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 border border-amber-100 p-2">
                    <p className="text-lg font-bold text-amber-600">{extraStats.altoRiesgoAdicionalRate}%</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Alto riesgo adicional</p>
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-100 p-2">
                    <p className="text-lg font-bold text-green-600">{extraStats.completadoRate}%</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">Completados</p>
                  </div>
                </div>

                {extraStats.desarrolladaPor.length > 0 && (
                  <>
                    <Separator className="my-1" />
                    <p className="text-[11px] font-medium text-muted-foreground">Actividad desarrollada por</p>
                    <div className="space-y-1">
                      {extraStats.desarrolladaPor.slice(0, 5).map(d => (
                        <div key={d.name} className="flex items-center gap-2 text-xs">
                          <span className="flex-1 truncate text-muted-foreground" title={d.name}>{d.name}</span>
                          <span className="font-medium shrink-0">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Org Comparison Table ────────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Comparativa por Organización</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 px-0 pb-0 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground">
                    <th className="text-left py-2 pl-4 pr-3 font-medium">Organización</th>
                    <th className="text-center py-2 px-2 font-medium">N</th>
                    <th className="text-left py-2 px-3 font-medium w-36">Cumplimiento</th>
                    <th className="text-center py-2 px-2 font-medium">Nivel</th>
                    {SCORE_KEYS.map(k => (
                      <th key={k} className="text-center py-2 px-1 font-medium min-w-10 whitespace-nowrap">
                        {SCORE_LABELS_SHORT[k]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orgStats.map((org, idx) => (
                    <tr key={org.empresa} className={cn('border-b hover:bg-muted/30', { 'bg-red-50/30': org.riskLevel === 'alto' })}>
                      <td className="py-2 pl-4 pr-3 font-medium max-w-40 truncate" title={org.empresa}>{org.empresa}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{org.count}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full min-w-16">
                            <div
                              className={cn('h-1.5 rounded-full', {
                                'bg-red-500':   org.riskLevel === 'alto',
                                'bg-amber-500': org.riskLevel === 'medio',
                                'bg-green-500': org.riskLevel === 'cumple',
                              })}
                              style={{ width: `${org.avgPct}%` }}
                            />
                          </div>
                          <span className="font-semibold w-10 text-right shrink-0">{org.avgPct.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center"><RiskBadge level={org.riskLevel} /></td>
                      {SCORE_KEYS.map(k => (
                        <td key={k} className="py-2 px-1 text-center">
                          <span className={cn('font-medium', {
                            'text-green-600': org.dims[k] >= 80,
                            'text-amber-600': org.dims[k] >= 40 && org.dims[k] < 80,
                            'text-red-600':   org.dims[k] < 40,
                          })}>
                            {org.dims[k]}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {orgStats.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">Sin datos de organizaciones.</p>
              )}
            </CardContent>
          </Card>

          {/* Anomalies + Recommendations ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Anomalies */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Detección de Anomalías</CardTitle>
                  <Badge variant="outline" className="text-[10px]">Z-Score · ±2σ</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3 px-4 pb-4">
                {anomalies.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                    <p className="text-xs text-muted-foreground">No se detectaron anomalías estadísticas.<br />Todos los registros están dentro de ±2σ.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {anomalies.map((a, i) => (
                      <div
                        key={i}
                        className={cn('rounded-lg p-3 border text-xs space-y-1', {
                          'border-red-200 bg-red-50':     a.type === 'critical',
                          'border-amber-200 bg-amber-50': a.type === 'outlier_high',
                        })}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold">{a.record.empresa} · {a.record.planta}</span>
                          <Badge className={cn('text-[10px] shrink-0', {
                            'bg-red-100 text-red-700':     a.type === 'critical',
                            'bg-amber-100 text-amber-700': a.type === 'outlier_high',
                          })}>
                            {a.type === 'critical' ? 'Crítico' : 'Outlier+'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{a.reason}</p>
                        <p className="text-muted-foreground">{a.record.fecha}</p>
                        {a.weakDims.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {a.weakDims.map(d => (
                              <span key={d} className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm text-[10px]">
                                {SCORE_LABELS_SHORT[d]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold">Recomendaciones Prioritarias</CardTitle>
              </CardHeader>
              <CardContent className="pt-3 px-4 pb-4">
                {recommendations.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                    <p className="text-xs text-muted-foreground">Todos los criterios superan el umbral ≥95%.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className={cn('rounded-lg p-3 border text-xs space-y-1', {
                          'border-red-200   bg-red-50':   rec.priority === 1,
                          'border-amber-200 bg-amber-50': rec.priority === 2,
                          'border-blue-200  bg-blue-50':  rec.priority === 3,
                        })}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold">{rec.title}</span>
                          <Badge className={cn('text-[10px] shrink-0', {
                            'bg-red-100    text-red-700':    rec.impact === 'Alto',
                            'bg-amber-100  text-amber-700':  rec.impact === 'Medio',
                            'bg-blue-100   text-blue-700':   rec.impact === 'Bajo',
                          })}>
                            {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{rec.insight}</p>
                        <div className="flex items-start gap-1 pt-0.5">
                          <Lightbulb className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{rec.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </>
      )}
    </div>
  );
}
