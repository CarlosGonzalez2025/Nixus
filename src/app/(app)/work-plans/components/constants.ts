import type {
  EstadoPlanTrabajo, EtapaPHVA, TipoRecurso, EstadoTarea, FrecuenciaActividad,
} from '@/types/work-plan';
import { HALLAZGO_PELIGRO_OPTIONS } from '@/types';
import { colorDePeligro } from '@/lib/hallazgos-analytics';

// ── Meses ────────────────────────────────────────────────────────────────────────

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const MONTH_SHORT = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

// ── Estado del plan ────────────────────────────────────────────────────────────

export const PLAN_STATUS_CONFIG: Record<
  EstadoPlanTrabajo,
  { label: string; className: string }
> = {
  'Borrador':     { label: 'Borrador',     className: 'bg-slate-100 text-slate-700 border-slate-200' },
  'Aprobado':     { label: 'Aprobado',     className: 'bg-blue-100 text-blue-700 border-blue-200' },
  'En Ejecución': { label: 'En Ejecución', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  'Cerrado':      { label: 'Cerrado',      className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

export const PLAN_STATUS_OPTIONS: EstadoPlanTrabajo[] = [
  'Borrador', 'Aprobado', 'En Ejecución', 'Cerrado',
];

// ── Etapas PHVA ────────────────────────────────────────────────────────────────

export const PHVA_CONFIG: Record<EtapaPHVA, { label: string; className: string }> = {
  'Planear':   { label: 'Planear',   className: 'bg-sky-100 text-sky-700 border-sky-200' },
  'Hacer':     { label: 'Hacer',     className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  'Verificar': { label: 'Verificar', className: 'bg-violet-100 text-violet-700 border-violet-200' },
  'Actuar':    { label: 'Actuar',    className: 'bg-rose-100 text-rose-700 border-rose-200' },
};

export const PHVA_OPTIONS: EtapaPHVA[] = ['Planear', 'Hacer', 'Verificar', 'Actuar'];

// ── Tipo de recurso ──────────────────────────────────────────────────────────────

export const RESOURCE_CONFIG: Record<TipoRecurso, { label: string }> = {
  'Financiero':     { label: 'Financiero' },
  'Administrativo': { label: 'Administrativo' },
  'Tecnico':        { label: 'Técnico' },
  'Humano':         { label: 'Humano' },
};

export const RESOURCE_OPTIONS: TipoRecurso[] = [
  'Financiero', 'Administrativo', 'Tecnico', 'Humano',
];

// ── Estado de tarea ──────────────────────────────────────────────────────────────

export const TASK_STATUS_CONFIG: Record<EstadoTarea, { label: string; className: string }> = {
  'Pendiente':    { label: 'Pendiente',    className: 'bg-slate-100 text-slate-700 border-slate-200' },
  'En Progreso':  { label: 'En Progreso',  className: 'bg-amber-100 text-amber-700 border-amber-200' },
  'Completado':   { label: 'Completado',   className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'Cancelado':    { label: 'Cancelado',    className: 'bg-red-100 text-red-700 border-red-200' },
  'Reprogramado': { label: 'Reprogramado', className: 'bg-blue-100 text-blue-700 border-blue-200' },
};

export const TASK_STATUS_OPTIONS: EstadoTarea[] = [
  'Pendiente', 'En Progreso', 'Completado', 'Cancelado', 'Reprogramado',
];

// ── Peligro / programa SST ─────────────────────────────────────────────────────
// Mismo catálogo que los hallazgos + 'Transversal' para actividades que no
// pertenecen a un programa concreto (inducciones, comité paritario, etc.). Así el
// % de cumplimiento del plan es comparable con la cobertura de hallazgos.

export const HAZARD_TRANSVERSAL = 'Transversal';
/** Etiqueta para actividades anteriores al campo `hazard`. */
export const HAZARD_SIN_ASIGNAR = 'Sin asignar';

export const HAZARD_OPTIONS: string[] = [...HALLAZGO_PELIGRO_OPTIONS, HAZARD_TRANSVERSAL];

export const HAZARD_COLORS: Record<string, string> = {
  ...Object.fromEntries(HALLAZGO_PELIGRO_OPTIONS.map((p, i) => [p, colorDePeligro(p, i)])),
  [HAZARD_TRANSVERSAL]: '#64748b',
  [HAZARD_SIN_ASIGNAR]: '#cbd5e1',
};

/** Clases Tailwind del badge de peligro en tablas y tarjetas. */
export const HAZARD_BADGE_CLASS: Record<string, string> = {
  'Alturas':             'bg-blue-100 text-blue-700 border-blue-200',
  'Espacios Confinados': 'bg-violet-100 text-violet-700 border-violet-200',
  'Energías Peligrosas': 'bg-amber-100 text-amber-700 border-amber-200',
  'Izaje de Cargas':     'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Excavaciones':        'bg-orange-100 text-orange-700 border-orange-200',
  [HAZARD_TRANSVERSAL]:  'bg-slate-100 text-slate-700 border-slate-200',
  [HAZARD_SIN_ASIGNAR]:  'bg-muted text-muted-foreground border-border',
};

export const hazardLabel = (h?: string) => h?.trim() || HAZARD_SIN_ASIGNAR;

// ── Frecuencia ─────────────────────────────────────────────────────────────────

export const FREQUENCY_OPTIONS: FrecuenciaActividad[] = [
  'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual', 'Puntual',
];

// ── Helpers ──────────────────────────────────────────────────────────────────────

/** Normaliza Timestamp | Date | ISO-string → Date (o null). */
export function parseDate(value: any): Date | null {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/** Paleta de progreso por porcentaje (clases Tailwind para la barra). */
export function progressColor(pct: number): string {
  if (pct >= 100) return 'bg-emerald-500';
  if (pct >= 75)  return 'bg-green-500';
  if (pct >= 50)  return 'bg-amber-500';
  if (pct >= 25)  return 'bg-orange-500';
  return 'bg-red-500';
}
