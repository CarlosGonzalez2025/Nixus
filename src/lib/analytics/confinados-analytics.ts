/**
 * confinados-analytics.ts
 *
 * Motor de análisis para el módulo Confinados.
 * Implementa: estadística descriptiva, K-Means clustering, regresión lineal,
 * detección de anomalías (Z-score) y motor de recomendaciones basado en reglas.
 *
 * Todos los cómputos se ejecutan en el cliente (browser) vía useMemo.
 * Compatible con el tipo DiagnosticoConfinado y su campo `resultados`.
 */

import type { DiagnosticoConfinado, DiagnosticoResultados } from '@/types/confinados';

// ── Constantes ──────────────────────────────────────────────────────────────────

export const SCORE_KEYS = [
  'identificacionPeligros',
  'permisosDeTrabajo',
  'gestionMedidasPrevencion',
  'monitoreoDeLaAtmosfera',
  'procedimientoEspaciosConfinados',
  'manejoEnergiasPeligrosas',
  'planDeEmergencias',
] as const;

export type ScoreKey = typeof SCORE_KEYS[number];

export const SCORE_LABELS: Record<ScoreKey, string> = {
  identificacionPeligros:           'Identificación\nde Peligros',
  permisosDeTrabajo:                'Permisos\nde Trabajo',
  gestionMedidasPrevencion:         'Gestión Medidas\nPrevención',
  monitoreoDeLaAtmosfera:           'Monitoreo\nAtmósfera',
  procedimientoEspaciosConfinados:  'Procedimiento\nEC',
  manejoEnergiasPeligrosas:         'Energías\nPeligrosas',
  planDeEmergencias:                'Plan de\nEmergencias',
};

export const SCORE_LABELS_SHORT: Record<ScoreKey, string> = {
  identificacionPeligros:           'Peligros',
  permisosDeTrabajo:                'Permisos',
  gestionMedidasPrevencion:         'Gestión',
  monitoreoDeLaAtmosfera:           'Monitoreo',
  procedimientoEspaciosConfinados:  'Procedimiento',
  manejoEnergiasPeligrosas:         'Energías',
  planDeEmergencias:                'Emergencias',
};

export const MAX_TOTAL_SCORE = 14;

// ── Tipos de resultado ─────────────────────────────────────────────────────────

export interface ScoreRecord {
  id:       string;
  empresa:  string;
  planta:   string;
  fecha:    string;
  scores:   Record<ScoreKey, number>; // 0 or 2 per dimension
  total:    number;                    // 0-14
  pct:      number;                    // 0-100
}

export interface DimStats {
  key:      ScoreKey;
  label:    string;
  mean:     number;  // 0-100 %
  median:   number;
  stdDev:   number;
  compliant: number; // % de records con score=2
}

export interface ClusterGroup {
  id:       number;
  label:    'Alto Riesgo' | 'Riesgo Medio' | 'Cumple';
  color:    string;
  count:    number;
  pct:      number;   // % del total
  avgTotal: number;   // avg pct
  centroid: Record<ScoreKey, number>; // avg per dimension (0-100)
  members:  ScoreRecord[];
}

export interface TrendPoint {
  period:   string;  // "YYYY-MM"
  label:    string;  // "Oct 2024"
  count:    number;
  avgPct:   number;
  movAvg3?: number;  // 3-month moving average
  predicted?: number; // linear regression prediction
}

export interface TrendAnalysis {
  points:    TrendPoint[];
  slope:     number;   // % per month
  r2:        number;   // R² of fit
  direction: 'Mejorando' | 'Estable' | 'Deteriorando';
  forecast3m: number;  // predicted avg in 3 months
}

export interface OrgStat {
  empresa:    string;
  count:      number;
  avgPct:     number;
  riskLevel:  'alto' | 'medio' | 'cumple';
  dims:       Record<ScoreKey, number>; // avg per dim (0-100)
}

export interface AnomalyRecord {
  record:     ScoreRecord;
  zScore:     number;
  type:       'critical' | 'outlier_high';
  reason:     string;
  weakDims:   ScoreKey[];
}

export interface Recommendation {
  priority:   1 | 2 | 3;
  dimension:  ScoreKey | 'general';
  title:      string;
  insight:    string;
  action:     string;
  impact:     'Alto' | 'Medio' | 'Bajo';
  affectedPct: number; // % of records affected
}

export interface KPIs {
  total:          number;
  avgPct:         number;
  medianPct:      number;
  stdDev:         number;
  highRisk:       number; // count ≤50%
  mediumRisk:     number; // count 50-70%
  lowRisk:        number; // count >70%
  highRiskPct:    number;
  mediumRiskPct:  number;
  lowRiskPct:     number;
  empresas:       number;
  plantas:        number;
  p25:            number;
  p75:            number;
}

export interface AnalyticsResult {
  kpis:            KPIs;
  dimStats:        DimStats[];
  clusters:        ClusterGroup[];
  trend:           TrendAnalysis;
  orgStats:        OrgStat[];
  anomalies:       AnomalyRecord[];
  recommendations: Recommendation[];
  records:         ScoreRecord[];
  computedAt:      number;
}

// ── Utilidades estadísticas ────────────────────────────────────────────────────

function mean(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function median(arr: number[]): number {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function stdDev(arr: number[], mu?: number): number {
  if (arr.length < 2) return 0;
  const m = mu ?? mean(arr);
  return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
}

function percentile(arr: number[], p: number): number {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  return sorted[lo] + (idx - lo) * (sorted[hi] - sorted[lo]);
}

function euclidean(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
}

function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number } {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: mean(y), r2: 0 };
  const sumX   = x.reduce((a, b) => a + b, 0);
  const sumY   = y.reduce((a, b) => a + b, 0);
  const sumXY  = x.reduce((s, xi, i) => s + xi * y[i], 0);
  const sumXX  = x.reduce((s, xi) => s + xi * xi, 0);
  const denom  = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n, r2: 0 };
  const slope     = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const yMean     = sumY / n;
  const ssTot     = y.reduce((s, yi) => s + (yi - yMean) ** 2, 0);
  const ssRes     = x.reduce((s, xi, i) => s + (y[i] - (slope * xi + intercept)) ** 2, 0);
  const r2        = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);
  return { slope, intercept, r2 };
}

// ── K-Means (K-Means++ initialization) ────────────────────────────────────────

function kMeansCluster(points: number[][], k: number, maxIter = 150): number[] {
  const n = points.length;
  if (n === 0) return [];
  if (n <= k) return points.map((_, i) => i % k);

  // K-Means++ initialization
  const centroids: number[][] = [];
  const seed = Math.floor(n * 0.37); // deterministic seed
  centroids.push([...points[seed]]);

  for (let c = 1; c < k; c++) {
    const dists = points.map(p =>
      Math.min(...centroids.map(ct => euclidean(p, ct))) ** 2,
    );
    const total = dists.reduce((a, b) => a + b, 0);
    if (total === 0) { centroids.push([...points[c]]); continue; }
    let r = total * 0.618; // golden ratio for determinism
    let picked = 0;
    for (let j = 0; j < n; j++) {
      r -= dists[j];
      if (r <= 0) { picked = j; break; }
    }
    centroids.push([...points[picked]]);
  }

  let assignments = new Array(n).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    const newAss = points.map(p => {
      let best = 0, bestDist = Infinity;
      centroids.forEach((c, i) => {
        const d = euclidean(p, c);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    });

    const converged = newAss.every((a, i) => a === assignments[i]);
    assignments = newAss;
    if (converged) break;

    // Update centroids
    for (let i = 0; i < k; i++) {
      const memberPts = points.filter((_, j) => assignments[j] === i);
      if (!memberPts.length) continue;
      const d = memberPts[0].length;
      for (let dim = 0; dim < d; dim++) {
        centroids[i][dim] = mean(memberPts.map(p => p[dim]));
      }
    }
  }

  return assignments;
}

// ── Extractor: DiagnosticoConfinado → ScoreRecord ──────────────────────────────

function toScoreRecord(d: DiagnosticoConfinado): ScoreRecord | null {
  const r = d.resultados;
  if (!r) return null;

  const scores = {} as Record<ScoreKey, number>;
  for (const k of SCORE_KEYS) {
    scores[k] = r[k as keyof DiagnosticoResultados] as number ?? 0;
  }
  const total = r.sumaTotal ?? Object.values(scores).reduce((s, v) => s + v, 0);
  const pct   = Math.round((total / MAX_TOTAL_SCORE) * 100 * 100) / 100;

  const fechaRaw = d.fecha || '';
  const fechaNorm = fechaRaw.length >= 10 ? fechaRaw.slice(0, 10) : fechaRaw;

  return {
    id:      d.id ?? Math.random().toString(),
    empresa: d.empresa?.trim() || 'Sin empresa',
    planta:  d.planta?.trim()  || 'Sin planta',
    fecha:   fechaNorm,
    scores,
    total:   total ?? 0,
    pct,
  };
}

// ── Análisis de dimensiones ────────────────────────────────────────────────────

function computeDimStats(records: ScoreRecord[]): DimStats[] {
  return SCORE_KEYS.map(key => {
    const vals = records.map(r => (r.scores[key] / 2) * 100); // 0 or 100
    const compliant = vals.filter(v => v === 100).length / (vals.length || 1) * 100;
    return {
      key,
      label:     SCORE_LABELS_SHORT[key],
      mean:      Math.round(mean(vals) * 10) / 10,
      median:    median(vals),
      stdDev:    Math.round(stdDev(vals) * 10) / 10,
      compliant: Math.round(compliant * 10) / 10,
    };
  });
}

// ── Clustering ─────────────────────────────────────────────────────────────────

function computeClusters(records: ScoreRecord[]): ClusterGroup[] {
  if (records.length < 3) return [];

  // Feature vector: normalized score per dimension
  const points = records.map(r =>
    SCORE_KEYS.map(k => r.scores[k] / 2), // 0 or 1
  );

  const K = 3;
  const assignments = kMeansCluster(points, K);

  // Compute per-cluster stats
  const groups: ClusterGroup[] = [];
  for (let i = 0; i < K; i++) {
    const members = records.filter((_, j) => assignments[j] === i);
    if (!members.length) continue;
    const avgTotal = mean(members.map(m => m.pct));
    const centroid = {} as Record<ScoreKey, number>;
    SCORE_KEYS.forEach(k => {
      centroid[k] = Math.round(mean(members.map(m => (m.scores[k] / 2) * 100)));
    });
    groups.push({ id: i, label: 'Riesgo Medio', color: '', count: members.length, pct: 0, avgTotal, centroid, members });
  }

  // Sort by avgTotal ASC and assign labels
  groups.sort((a, b) => a.avgTotal - b.avgTotal);
  const labels: ClusterGroup['label'][] = ['Alto Riesgo', 'Riesgo Medio', 'Cumple'];
  const colors = ['#ef4444', '#f59e0b', '#22c55e'];
  groups.forEach((g, i) => {
    g.label  = labels[i];
    g.color  = colors[i];
    g.pct    = Math.round((g.count / records.length) * 100 * 10) / 10;
    g.avgTotal = Math.round(g.avgTotal * 10) / 10;
  });

  return groups;
}

// ── Tendencia temporal ─────────────────────────────────────────────────────────

function computeTrend(records: ScoreRecord[]): TrendAnalysis {
  // Group by YYYY-MM
  const byMonth = new Map<string, number[]>();
  for (const r of records) {
    const key = r.fecha.slice(0, 7); // "YYYY-MM"
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(r.pct);
  }

  const periods = [...byMonth.keys()].sort();
  if (periods.length < 2) {
    return {
      points: periods.map(p => ({
        period: p, label: fmtPeriod(p),
        count: byMonth.get(p)!.length,
        avgPct: Math.round(mean(byMonth.get(p)!)),
      })),
      slope: 0, r2: 0, direction: 'Estable', forecast3m: mean(records.map(r => r.pct)),
    };
  }

  const points: TrendPoint[] = periods.map(p => ({
    period:  p,
    label:   fmtPeriod(p),
    count:   byMonth.get(p)!.length,
    avgPct:  Math.round(mean(byMonth.get(p)!) * 10) / 10,
  }));

  // Moving average (window = 3)
  for (let i = 0; i < points.length; i++) {
    if (i >= 2) {
      points[i].movAvg3 = Math.round(
        mean([points[i-2].avgPct, points[i-1].avgPct, points[i].avgPct]) * 10,
      ) / 10;
    }
  }

  // Linear regression
  const x = points.map((_, i) => i);
  const y = points.map(p => p.avgPct);
  const { slope, intercept, r2 } = linearRegression(x, y);

  points.forEach((p, i) => {
    p.predicted = Math.round((slope * i + intercept) * 10) / 10;
  });

  const direction: TrendAnalysis['direction'] =
    slope > 0.5  ? 'Mejorando'    :
    slope < -0.5 ? 'Deteriorando' : 'Estable';

  const forecast3m = Math.min(100, Math.max(0,
    Math.round((slope * (points.length + 2) + intercept) * 10) / 10,
  ));

  return { points, slope: Math.round(slope * 100) / 100, r2: Math.round(r2 * 100) / 100, direction, forecast3m };
}

function fmtPeriod(yyyyMM: string): string {
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const [y, m] = yyyyMM.split('-');
  return `${months[+m - 1] ?? m} ${y}`;
}

// ── Estadísticas por organización ─────────────────────────────────────────────

function computeOrgStats(records: ScoreRecord[]): OrgStat[] {
  const byOrg = new Map<string, ScoreRecord[]>();
  for (const r of records) {
    if (!byOrg.has(r.empresa)) byOrg.set(r.empresa, []);
    byOrg.get(r.empresa)!.push(r);
  }

  return [...byOrg.entries()]
    .map(([empresa, recs]) => {
      const avgPct = Math.round(mean(recs.map(r => r.pct)) * 10) / 10;
      const dims = {} as Record<ScoreKey, number>;
      SCORE_KEYS.forEach(k => {
        dims[k] = Math.round(mean(recs.map(r => (r.scores[k] / 2) * 100)));
      });
      return {
        empresa,
        count: recs.length,
        avgPct,
        riskLevel: (avgPct <= 50 ? 'alto' : avgPct <= 70 ? 'medio' : 'cumple') as OrgStat['riskLevel'],
        dims,
      };
    })
    .sort((a, b) => a.avgPct - b.avgPct);
}

// ── Detección de anomalías (Z-Score) ──────────────────────────────────────────

function detectAnomalies(records: ScoreRecord[]): AnomalyRecord[] {
  if (records.length < 5) return [];
  const totals = records.map(r => r.pct);
  const mu     = mean(totals);
  const sigma  = stdDev(totals, mu);
  if (sigma === 0) return [];

  const result: AnomalyRecord[] = [];
  for (const r of records) {
    const z = (r.pct - mu) / sigma;
    const weakDims = SCORE_KEYS.filter(k => r.scores[k] === 0);

    if (z < -2) {
      result.push({
        record:   r,
        zScore:   Math.round(z * 100) / 100,
        type:     'critical',
        reason:   `Puntaje crítico (${r.pct.toFixed(1)}%) — ${Math.abs(Math.round(z * 10) / 10)}σ por debajo del promedio`,
        weakDims,
      });
    } else if (z > 2) {
      result.push({
        record:   r,
        zScore:   Math.round(z * 100) / 100,
        type:     'outlier_high',
        reason:   `Puntaje excepcional (${r.pct.toFixed(1)}%) — puede ser datos incompletos`,
        weakDims,
      });
    }
  }
  return result.sort((a, b) => a.zScore - b.zScore);
}

// ── Motor de recomendaciones ───────────────────────────────────────────────────

const DIM_RECOMMENDATIONS: Record<ScoreKey, { title: string; action: string }> = {
  identificacionPeligros: {
    title:  'Brecha en Identificación de Peligros (IPER)',
    action: 'Implementar evaluación sistemática en la matriz IPER para todos los espacios confinados. Priorizar espacios Grado A y B.',
  },
  permisosDeTrabajo: {
    title:  'Déficit en Permisos de Trabajo',
    action: 'Establecer obligatoriedad del Permiso de Trabajo como control único para espacios confinados. Capacitar al personal solicitante.',
  },
  gestionMedidasPrevencion: {
    title:  'Gestión Incompleta de Medidas Preventivas',
    action: 'Integrar el Permiso de Trabajo con otras medidas de control (ATS, LOTO). Verificar que los controles combinados estén formalizados.',
  },
  monitoreoDeLaAtmosfera: {
    title:  'Monitoreo Atmosférico Deficiente',
    action: 'Adquirir o gestionar monitores de atmósfera multigas. Establecer protocolo de monitoreo previo y continuo durante la intervención.',
  },
  procedimientoEspaciosConfinados: {
    title:  'Falta de Procedimiento Documentado',
    action: 'Desarrollar o actualizar el procedimiento de seguridad para espacios confinados conforme a la norma GTC 34 y resoluciones vigentes.',
  },
  manejoEnergiasPeligrosas: {
    title:  'Bloqueo de Energías Peligrosas (LOTO) Incompleto',
    action: 'Implementar el programa LOTO (Lock-Out/Tag-Out). Capacitar en identificación y bloqueo de energías: eléctrica, mecánica, hidráulica y química.',
  },
  planDeEmergencias: {
    title:  'Plan de Emergencias sin Componentes Básicos',
    action: 'Garantizar equipo de primeros auxilios activo en cada intervención. Incluir trípode de rescate y comunicación como requisitos mínimos.',
  },
};

function generateRecommendations(
  records: ScoreRecord[],
  dimStats: DimStats[],
): Recommendation[] {
  const recs: Recommendation[] = [];
  const total = records.length;

  // Sort dims by compliance ascending (worst first)
  const sorted = [...dimStats].sort((a, b) => a.compliant - b.compliant);

  sorted.forEach((dim, idx) => {
    const nonCompliant = total - Math.round((dim.compliant / 100) * total);
    if (dim.compliant >= 95) return; // no recommendation needed

    const priority: 1 | 2 | 3 = idx < 2 ? 1 : idx < 4 ? 2 : 3;
    const impact: Recommendation['impact'] =
      dim.compliant < 50 ? 'Alto' : dim.compliant < 75 ? 'Medio' : 'Bajo';

    const tmpl = DIM_RECOMMENDATIONS[dim.key];
    recs.push({
      priority,
      dimension:  dim.key,
      title:      tmpl.title,
      insight:    `Solo el ${dim.compliant.toFixed(1)}% de los espacios cumple con este criterio (${nonCompliant} de ${total} registros en déficit).`,
      action:     tmpl.action,
      impact,
      affectedPct: Math.round((nonCompliant / total) * 100),
    });
  });

  // General recommendation if > 30% are high risk
  const highRiskPct = (records.filter(r => r.pct <= 50).length / total) * 100;
  if (highRiskPct > 30) {
    recs.unshift({
      priority:   1,
      dimension:  'general',
      title:      'Programa de Intervención Urgente',
      insight:    `El ${highRiskPct.toFixed(1)}% de los espacios evaluados está en nivel de riesgo alto (≤50%). Se requiere intervención sistémica.`,
      action:     'Diseñar un plan de mejora trimestral con metas por organización. Establecer indicadores de seguimiento mensual y auditorías cruzadas.',
      impact:     'Alto',
      affectedPct: Math.round(highRiskPct),
    });
  }

  return recs.slice(0, 8);
}

// ── Función principal ──────────────────────────────────────────────────────────

export function analyzeConfinados(data: DiagnosticoConfinado[]): AnalyticsResult {
  const records = data
    .map(toScoreRecord)
    .filter((r): r is ScoreRecord => r !== null && !isNaN(r.pct));

  if (records.length === 0) {
    return {
      kpis:            { total: 0, avgPct: 0, medianPct: 0, stdDev: 0, highRisk: 0, mediumRisk: 0, lowRisk: 0, highRiskPct: 0, mediumRiskPct: 0, lowRiskPct: 0, empresas: 0, plantas: 0, p25: 0, p75: 0 },
      dimStats:        [],
      clusters:        [],
      trend:           { points: [], slope: 0, r2: 0, direction: 'Estable', forecast3m: 0 },
      orgStats:        [],
      anomalies:       [],
      recommendations: [],
      records:         [],
      computedAt:      Date.now(),
    };
  }

  const pcts        = records.map(r => r.pct);
  const highRisk    = records.filter(r => r.pct <= 50).length;
  const mediumRisk  = records.filter(r => r.pct > 50 && r.pct <= 70).length;
  const lowRisk     = records.filter(r => r.pct > 70).length;
  const empresasSet = new Set(records.map(r => r.empresa));
  const plantasSet  = new Set(records.map(r => r.planta));

  const kpis: KPIs = {
    total:          records.length,
    avgPct:         Math.round(mean(pcts) * 100) / 100,
    medianPct:      Math.round(median(pcts) * 10) / 10,
    stdDev:         Math.round(stdDev(pcts) * 10) / 10,
    highRisk,
    mediumRisk,
    lowRisk,
    highRiskPct:    Math.round((highRisk    / records.length) * 100 * 10) / 10,
    mediumRiskPct:  Math.round((mediumRisk  / records.length) * 100 * 10) / 10,
    lowRiskPct:     Math.round((lowRisk     / records.length) * 100 * 10) / 10,
    empresas:       empresasSet.size,
    plantas:        plantasSet.size,
    p25:            Math.round(percentile(pcts, 25) * 10) / 10,
    p75:            Math.round(percentile(pcts, 75) * 10) / 10,
  };

  const dimStats    = computeDimStats(records);
  const clusters    = computeClusters(records);
  const trend       = computeTrend(records);
  const orgStats    = computeOrgStats(records);
  const anomalies   = detectAnomalies(records);
  const recommendations = generateRecommendations(records, dimStats);

  return {
    kpis, dimStats, clusters, trend, orgStats,
    anomalies, recommendations, records,
    computedAt: Date.now(),
  };
}
