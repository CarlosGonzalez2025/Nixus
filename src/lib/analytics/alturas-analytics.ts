import type { DiagnosticoAltura, DiagnosticoAlturaResultados } from '@/types/alturas';

// ── Constantes ─────────────────────────────────────────────────────────────────

export const SCORE_KEYS_ALTURAS = [
  'procedimientosGestionAlturas',
  'permisosDeTrabajo',
  'gestionMedidasPrevencion',
  'gestionDocumental',
  'gestionRiesgoControlOperacional',
  'gestionEquiposSistemas',
  'gestionEmergencias',
] as const;

export type ScoreKeyAlturas = typeof SCORE_KEYS_ALTURAS[number];

export const SCORE_LABELS_ALTURAS: Record<ScoreKeyAlturas, string> = {
  procedimientosGestionAlturas:     'Procedimientos\nGestión Alturas',
  permisosDeTrabajo:                'Permisos\nde Trabajo',
  gestionMedidasPrevencion:         'Gestión Medidas\nPrevención',
  gestionDocumental:                'Gestión\nDocumental',
  gestionRiesgoControlOperacional:  'Gestión Riesgo\nControl Op.',
  gestionEquiposSistemas:           'Gestión Equipos\ny Sistemas',
  gestionEmergencias:               'Gestión\nEmergencias',
};

export const SCORE_LABELS_SHORT_ALTURAS: Record<ScoreKeyAlturas, string> = {
  procedimientosGestionAlturas:     'Procedimientos',
  permisosDeTrabajo:                'Permisos',
  gestionMedidasPrevencion:         'Gestión Medidas',
  gestionDocumental:                'Documental',
  gestionRiesgoControlOperacional:  'Riesgo/Control',
  gestionEquiposSistemas:           'Equipos',
  gestionEmergencias:               'Emergencias',
};

export const MAX_TOTAL_SCORE_ALTURAS = 14;

// ── Tipos ──────────────────────────────────────────────────────────────────────

export interface ScoreRecordAltura {
  id:       string;
  empresa:  string;
  planta:   string;
  fecha:    string;
  scores:   Record<ScoreKeyAlturas, number>;
  total:    number;
  pct:      number;
}

export interface DimStatsAltura {
  key:       ScoreKeyAlturas;
  label:     string;
  mean:      number;
  median:    number;
  stdDev:    number;
  compliant: number;
}

export interface ClusterGroupAltura {
  id:       number;
  label:    'Alto Riesgo' | 'Riesgo Medio' | 'Cumple';
  color:    string;
  count:    number;
  pct:      number;
  avgTotal: number;
  centroid: Record<ScoreKeyAlturas, number>;
  members:  ScoreRecordAltura[];
}

export interface TrendPointAltura {
  period:     string;
  label:      string;
  count:      number;
  avgPct:     number;
  movAvg3?:   number;
  predicted?: number;
}

export interface TrendAnalysisAltura {
  points:     TrendPointAltura[];
  slope:      number;
  r2:         number;
  direction:  'Mejorando' | 'Estable' | 'Deteriorando';
  forecast3m: number;
}

export interface OrgStatAltura {
  empresa:   string;
  count:     number;
  avgPct:    number;
  riskLevel: 'alto' | 'medio' | 'cumple';
  dims:      Record<ScoreKeyAlturas, number>;
}

export interface AnomalyRecordAltura {
  record:    ScoreRecordAltura;
  zScore:    number;
  type:      'critical' | 'outlier_high';
  reason:    string;
  weakDims:  ScoreKeyAlturas[];
}

export interface RecommendationAltura {
  priority:    1 | 2 | 3;
  dimension:   ScoreKeyAlturas | 'general';
  title:       string;
  insight:     string;
  action:      string;
  impact:      'Alto' | 'Medio' | 'Bajo';
  affectedPct: number;
}

export interface KPIsAltura {
  total:         number;
  avgPct:        number;
  medianPct:     number;
  stdDev:        number;
  highRisk:      number;
  mediumRisk:    number;
  lowRisk:       number;
  highRiskPct:   number;
  mediumRiskPct: number;
  lowRiskPct:    number;
  empresas:      number;
  plantas:       number;
  p25:           number;
  p75:           number;
}

export interface AnalyticsResultAlturas {
  kpis:            KPIsAltura;
  dimStats:        DimStatsAltura[];
  clusters:        ClusterGroupAltura[];
  trend:           TrendAnalysisAltura;
  orgStats:        OrgStatAltura[];
  anomalies:       AnomalyRecordAltura[];
  recommendations: RecommendationAltura[];
  records:         ScoreRecordAltura[];
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
  const sumX  = x.reduce((a, b) => a + b, 0);
  const sumY  = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
  const sumXX = x.reduce((s, xi) => s + xi * xi, 0);
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n, r2: 0 };
  const slope     = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const yMean     = sumY / n;
  const ssTot     = y.reduce((s, yi) => s + (yi - yMean) ** 2, 0);
  const ssRes     = x.reduce((s, xi, i) => s + (y[i] - (slope * xi + intercept)) ** 2, 0);
  const r2        = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);
  return { slope, intercept, r2 };
}

function kMeansCluster(points: number[][], k: number, maxIter = 150): number[] {
  const n = points.length;
  if (n === 0) return [];
  if (n <= k) return points.map((_, i) => i % k);

  const centroids: number[][] = [];
  const seed = Math.floor(n * 0.37);
  centroids.push([...points[seed]]);

  for (let c = 1; c < k; c++) {
    const dists = points.map(p =>
      Math.min(...centroids.map(ct => euclidean(p, ct))) ** 2,
    );
    const total = dists.reduce((a, b) => a + b, 0);
    if (total === 0) { centroids.push([...points[c]]); continue; }
    let r = total * 0.618;
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

// ── Extractor ──────────────────────────────────────────────────────────────────

function toScoreRecord(d: DiagnosticoAltura): ScoreRecordAltura | null {
  const r = d.resultados;
  if (!r) return null;

  const scores = {} as Record<ScoreKeyAlturas, number>;
  for (const k of SCORE_KEYS_ALTURAS) {
    scores[k] = r[k as keyof DiagnosticoAlturaResultados] as number ?? 0;
  }
  const total = r.sumaTotal ?? Object.values(scores).reduce((s, v) => s + v, 0);
  const pct   = Math.round((total / MAX_TOTAL_SCORE_ALTURAS) * 100 * 100) / 100;

  return {
    id:      d.id ?? Math.random().toString(),
    empresa: d.empresa?.trim() || 'Sin empresa',
    planta:  d.planta?.trim()  || 'Sin planta',
    fecha:   (d.fecha || '').slice(0, 10),
    scores,
    total:   total ?? 0,
    pct,
  };
}

// ── Dimensiones ────────────────────────────────────────────────────────────────

function computeDimStats(records: ScoreRecordAltura[]): DimStatsAltura[] {
  return SCORE_KEYS_ALTURAS.map(key => {
    const vals = records.map(r => (r.scores[key] / 2) * 100);
    const compliant = vals.filter(v => v === 100).length / (vals.length || 1) * 100;
    return {
      key,
      label:     SCORE_LABELS_SHORT_ALTURAS[key],
      mean:      Math.round(mean(vals) * 10) / 10,
      median:    median(vals),
      stdDev:    Math.round(stdDev(vals) * 10) / 10,
      compliant: Math.round(compliant * 10) / 10,
    };
  });
}

// ── Clustering ─────────────────────────────────────────────────────────────────

function computeClusters(records: ScoreRecordAltura[]): ClusterGroupAltura[] {
  if (records.length < 3) return [];

  const points = records.map(r =>
    SCORE_KEYS_ALTURAS.map(k => r.scores[k] / 2),
  );

  const K = 3;
  const assignments = kMeansCluster(points, K);

  const groups: ClusterGroupAltura[] = [];
  for (let i = 0; i < K; i++) {
    const members = records.filter((_, j) => assignments[j] === i);
    if (!members.length) continue;
    const avgTotal = mean(members.map(m => m.pct));
    const centroid = {} as Record<ScoreKeyAlturas, number>;
    SCORE_KEYS_ALTURAS.forEach(k => {
      centroid[k] = Math.round(mean(members.map(m => (m.scores[k] / 2) * 100)));
    });
    groups.push({ id: i, label: 'Riesgo Medio', color: '', count: members.length, pct: 0, avgTotal, centroid, members });
  }

  groups.sort((a, b) => a.avgTotal - b.avgTotal);
  const labels: ClusterGroupAltura['label'][] = ['Alto Riesgo', 'Riesgo Medio', 'Cumple'];
  const colors = ['#ef4444', '#f59e0b', '#22c55e'];
  groups.forEach((g, i) => {
    g.label    = labels[i];
    g.color    = colors[i];
    g.pct      = Math.round((g.count / records.length) * 100 * 10) / 10;
    g.avgTotal = Math.round(g.avgTotal * 10) / 10;
  });

  return groups;
}

// ── Tendencia ──────────────────────────────────────────────────────────────────

function fmtPeriod(yyyyMM: string): string {
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const [y, m] = yyyyMM.split('-');
  return `${months[+m - 1] ?? m} ${y}`;
}

function computeTrend(records: ScoreRecordAltura[]): TrendAnalysisAltura {
  const byMonth = new Map<string, number[]>();
  for (const r of records) {
    const key = r.fecha.slice(0, 7);
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
      slope: 0, r2: 0, direction: 'Estable',
      forecast3m: mean(records.map(r => r.pct)),
    };
  }

  const points: TrendPointAltura[] = periods.map(p => ({
    period: p,
    label:  fmtPeriod(p),
    count:  byMonth.get(p)!.length,
    avgPct: Math.round(mean(byMonth.get(p)!) * 10) / 10,
  }));

  for (let i = 0; i < points.length; i++) {
    if (i >= 2) {
      points[i].movAvg3 = Math.round(
        mean([points[i-2].avgPct, points[i-1].avgPct, points[i].avgPct]) * 10,
      ) / 10;
    }
  }

  const x = points.map((_, i) => i);
  const y = points.map(p => p.avgPct);
  const { slope, intercept, r2 } = linearRegression(x, y);

  points.forEach((p, i) => {
    p.predicted = Math.round((slope * i + intercept) * 10) / 10;
  });

  const direction: TrendAnalysisAltura['direction'] =
    slope > 0.5  ? 'Mejorando'    :
    slope < -0.5 ? 'Deteriorando' : 'Estable';

  const forecast3m = Math.min(100, Math.max(0,
    Math.round((slope * (points.length + 2) + intercept) * 10) / 10,
  ));

  return { points, slope: Math.round(slope * 100) / 100, r2: Math.round(r2 * 100) / 100, direction, forecast3m };
}

// ── Stats por organización ─────────────────────────────────────────────────────

function computeOrgStats(records: ScoreRecordAltura[]): OrgStatAltura[] {
  const byOrg = new Map<string, ScoreRecordAltura[]>();
  for (const r of records) {
    if (!byOrg.has(r.empresa)) byOrg.set(r.empresa, []);
    byOrg.get(r.empresa)!.push(r);
  }

  return [...byOrg.entries()]
    .map(([empresa, recs]) => {
      const avgPct = Math.round(mean(recs.map(r => r.pct)) * 10) / 10;
      const dims = {} as Record<ScoreKeyAlturas, number>;
      SCORE_KEYS_ALTURAS.forEach(k => {
        dims[k] = Math.round(mean(recs.map(r => (r.scores[k] / 2) * 100)));
      });
      return {
        empresa,
        count: recs.length,
        avgPct,
        riskLevel: (avgPct <= 50 ? 'alto' : avgPct <= 70 ? 'medio' : 'cumple') as OrgStatAltura['riskLevel'],
        dims,
      };
    })
    .sort((a, b) => a.avgPct - b.avgPct);
}

// ── Anomalías ──────────────────────────────────────────────────────────────────

function detectAnomalies(records: ScoreRecordAltura[]): AnomalyRecordAltura[] {
  if (records.length < 5) return [];
  const totals = records.map(r => r.pct);
  const mu     = mean(totals);
  const sigma  = stdDev(totals, mu);
  if (sigma === 0) return [];

  const result: AnomalyRecordAltura[] = [];
  for (const r of records) {
    const z        = (r.pct - mu) / sigma;
    const weakDims = SCORE_KEYS_ALTURAS.filter(k => r.scores[k] === 0);

    if (z < -2) {
      result.push({
        record: r,
        zScore: Math.round(z * 100) / 100,
        type:   'critical',
        reason: `Puntaje crítico (${r.pct.toFixed(1)}%) — ${Math.abs(Math.round(z * 10) / 10)}σ por debajo del promedio`,
        weakDims,
      });
    } else if (z > 2) {
      result.push({
        record: r,
        zScore: Math.round(z * 100) / 100,
        type:   'outlier_high',
        reason: `Puntaje excepcional (${r.pct.toFixed(1)}%) — puede ser datos incompletos`,
        weakDims,
      });
    }
  }
  return result.sort((a, b) => a.zScore - b.zScore);
}

// ── Recomendaciones ────────────────────────────────────────────────────────────

const DIM_RECOMMENDATIONS_ALTURAS: Record<ScoreKeyAlturas, { title: string; action: string }> = {
  procedimientosGestionAlturas: {
    title:  'Brecha en evaluación de riesgos en alturas (IPER)',
    action: 'Incluir sistemáticamente todas las actividades en alturas dentro de la matriz IPER. Priorizar las actividades con altura superior a 6 m.',
  },
  permisosDeTrabajo: {
    title:  'Déficit en permisos de trabajo para alturas',
    action: 'Exigir el Permiso de Trabajo como control obligatorio para toda actividad en alturas. Capacitar al personal solicitante y supervisores.',
  },
  gestionMedidasPrevencion: {
    title:  'Gestión incompleta de medidas preventivas',
    action: 'Integrar el Permiso de Trabajo con controles adicionales (ATS, coordinador de alturas, vigía). Validar la combinación de controles en cada actividad.',
  },
  gestionDocumental: {
    title:  'Falta de procedimiento documentado para trabajo en alturas',
    action: 'Desarrollar procedimientos específicos conforme a la Resolución 4272/2021 y GTC 45. Validar vigencia y difusión con el personal operativo.',
  },
  gestionRiesgoControlOperacional: {
    title:  'Deficiencias en inspección de escaleras y andamios',
    action: 'Implementar programa de inspección y mantenimiento periódico de escaleras y andamios. Exigir hojas de vida y certificados vigentes para cada equipo.',
  },
  gestionEquiposSistemas: {
    title:  'Equipos de protección contra caídas sin inspección vigente',
    action: 'Establecer calendario de inspecciones anuales para arneses, estingas, anclajes y líneas de vida. Retirar de servicio los equipos sin certificación vigente.',
  },
  gestionEmergencias: {
    title:  'Plan de emergencias insuficiente para trabajo en alturas',
    action: 'Garantizar equipo de rescate activo y primeros auxilios en cada actividad en alturas. Entrenar personal en técnicas de rescate vertical según Resolución 1178/2017.',
  },
};

function generateRecommendationsAlturas(
  records: ScoreRecordAltura[],
  dimStats: DimStatsAltura[],
): RecommendationAltura[] {
  const recs: RecommendationAltura[] = [];
  const total = records.length;

  const sorted = [...dimStats].sort((a, b) => a.compliant - b.compliant);

  sorted.forEach((dim, idx) => {
    const nonCompliant = total - Math.round((dim.compliant / 100) * total);
    if (dim.compliant >= 95) return;

    const priority: 1 | 2 | 3 = idx < 2 ? 1 : idx < 4 ? 2 : 3;
    const impact: RecommendationAltura['impact'] =
      dim.compliant < 50 ? 'Alto' : dim.compliant < 75 ? 'Medio' : 'Bajo';

    const tmpl = DIM_RECOMMENDATIONS_ALTURAS[dim.key];
    recs.push({
      priority,
      dimension:   dim.key,
      title:       tmpl.title,
      insight:     `Solo el ${dim.compliant.toFixed(1)}% de los registros cumple con este criterio (${nonCompliant} de ${total} en déficit).`,
      action:      tmpl.action,
      impact,
      affectedPct: Math.round((nonCompliant / total) * 100),
    });
  });

  const highRiskPct = (records.filter(r => r.pct <= 50).length / total) * 100;
  if (highRiskPct > 30) {
    recs.unshift({
      priority:    1,
      dimension:   'general',
      title:       'Programa de intervención urgente en alturas',
      insight:     `El ${highRiskPct.toFixed(1)}% de las actividades evaluadas está en nivel de riesgo alto (≤50%). Se requiere intervención sistémica.`,
      action:      'Diseñar un plan de mejora trimestral con metas por organización. Establecer indicadores de seguimiento mensual y auditorías de alturas.',
      impact:      'Alto',
      affectedPct: Math.round(highRiskPct),
    });
  }

  return recs.slice(0, 8);
}

// ── Función principal ──────────────────────────────────────────────────────────

export function analyzeAlturas(data: DiagnosticoAltura[]): AnalyticsResultAlturas {
  const records = data
    .map(toScoreRecord)
    .filter((r): r is ScoreRecordAltura => r !== null && !isNaN(r.pct));

  if (records.length === 0) {
    return {
      kpis: {
        total: 0, avgPct: 0, medianPct: 0, stdDev: 0,
        highRisk: 0, mediumRisk: 0, lowRisk: 0,
        highRiskPct: 0, mediumRiskPct: 0, lowRiskPct: 0,
        empresas: 0, plantas: 0, p25: 0, p75: 0,
      },
      dimStats: [], clusters: [],
      trend: { points: [], slope: 0, r2: 0, direction: 'Estable', forecast3m: 0 },
      orgStats: [], anomalies: [], recommendations: [], records: [],
      computedAt: Date.now(),
    };
  }

  const pcts       = records.map(r => r.pct);
  const highRisk   = records.filter(r => r.pct <= 50).length;
  const mediumRisk = records.filter(r => r.pct > 50 && r.pct <= 70).length;
  const lowRisk    = records.filter(r => r.pct > 70).length;

  const kpis: KPIsAltura = {
    total:         records.length,
    avgPct:        Math.round(mean(pcts) * 100) / 100,
    medianPct:     Math.round(median(pcts) * 10) / 10,
    stdDev:        Math.round(stdDev(pcts) * 10) / 10,
    highRisk,
    mediumRisk,
    lowRisk,
    highRiskPct:   Math.round((highRisk    / records.length) * 100 * 10) / 10,
    mediumRiskPct: Math.round((mediumRisk  / records.length) * 100 * 10) / 10,
    lowRiskPct:    Math.round((lowRisk     / records.length) * 100 * 10) / 10,
    empresas:      new Set(records.map(r => r.empresa)).size,
    plantas:       new Set(records.map(r => r.planta)).size,
    p25:           Math.round(percentile(pcts, 25) * 10) / 10,
    p75:           Math.round(percentile(pcts, 75) * 10) / 10,
  };

  const dimStats    = computeDimStats(records);
  const clusters    = computeClusters(records);
  const trend       = computeTrend(records);
  const orgStats    = computeOrgStats(records);
  const anomalies   = detectAnomalies(records);
  const recommendations = generateRecommendationsAlturas(records, dimStats);

  return {
    kpis, dimStats, clusters, trend, orgStats,
    anomalies, recommendations, records,
    computedAt: Date.now(),
  };
}
