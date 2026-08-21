import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDocs,
  serverTimestamp, writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  PlanTrabajo, TareaPlanTrabajo, ProgresoMensual, EstadoTarea,
} from '@/types/work-plan';

// ── Constantes ──────────────────────────────────────────────────────────────────

const COL = 'workPlans';
const BATCH_LIMIT = 490; // margen seguro bajo el tope de 500 ops/batch de Firestore

const tasksCol = (planId: string) => collection(db, COL, planId, 'tasks');

// ── Firestore no acepta `undefined` — limpiar recursivamente ────────────────────

function stripUndefined<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    out[k] = v;
  }
  return out as T;
}

// ── Funciones puras (sin efectos, testeables) ───────────────────────────────────

/** 12 meses (0..11) sin planear ni ejecutar. */
export function initMonthlyProgress(): ProgresoMensual[] {
  return Array.from({ length: 12 }, (_, month) => ({
    month,
    planned: false,
    executed: false,
  }));
}

/**
 * Garantiza 12 celdas ordenadas por mes (0..11) y que `executed` solo sea true si
 * `planned` es true. Rellena meses faltantes con celdas vacías.
 */
export function normalizeMonthlyProgress(mp: ProgresoMensual[] = []): ProgresoMensual[] {
  const byMonth = new Map<number, ProgresoMensual>();
  for (const cell of mp) {
    if (typeof cell?.month === 'number' && cell.month >= 0 && cell.month <= 11) {
      byMonth.set(cell.month, cell);
    }
  }
  return Array.from({ length: 12 }, (_, month) => {
    const cell = byMonth.get(month);
    const planned = !!cell?.planned;
    const executed = planned && !!cell?.executed; // E solo válido si P
    const normalized: ProgresoMensual = { month, planned, executed };
    if (cell?.evidence !== undefined) normalized.evidence = cell.evidence;
    if (cell?.comments !== undefined) normalized.comments = cell.comments;
    return normalized;
  });
}

/**
 * (meses planeados Y ejecutados / total meses planeados) * 100, redondeado.
 * Si no hay meses planeados → 0.
 */
export function calcTaskProgress(mp: ProgresoMensual[]): number {
  const planned = mp.filter(c => c.planned);
  if (planned.length === 0) return 0;
  const executed = planned.filter(c => c.executed).length;
  return Math.round((executed / planned.length) * 100);
}

/** Promedio aritmético simple de los totalProgress. Sin tareas → 0. Redondeado. */
export function calcPlanProgress(tasks: Array<Pick<TareaPlanTrabajo, 'totalProgress'>>): number {
  if (tasks.length === 0) return 0;
  const sum = tasks.reduce((acc, t) => acc + (t.totalProgress || 0), 0);
  return Math.round(sum / tasks.length);
}

/**
 * Estadísticas derivadas del totalProgress (NO del campo status) para que nunca se
 * desalineen del %. executed = tareas con totalProgress >= 100.
 */
export function calcPlanStats(
  tasks: Array<Pick<TareaPlanTrabajo, 'totalProgress'>>,
): { total: number; executed: number; pending: number } {
  const total = tasks.length;
  const executed = tasks.filter(t => (t.totalProgress || 0) >= 100).length;
  return { total, executed, pending: total - executed };
}

/**
 * Cumplimiento medido en ACTIVIDADES, no en meses.
 *
 * Un plan de trabajo SST es anual y se reporta como «actividades programadas vs.
 * ejecutadas»; expresarlo en meses se malinterpreta como avance de calendario.
 * Además, la cabecera del plan ya cuenta actividades (`executedCount` /
 * `pendingCount` vienen de `calcPlanStats`), así que esta es la única base que
 * mantiene coherente toda la pantalla.
 */
export interface ComplianceStats {
  /** Actividades programadas. */
  total: number;
  /** Actividades con cumplimiento 100%. */
  executed: number;
  /** Actividades que aún no llegan al 100%. */
  pending: number;
  /** Subconjunto de `pending` que ya arrancó (avance > 0 y < 100). */
  inProgress: number;
  /** % de cumplimiento = ejecutadas / programadas. */
  progress: number;
}

export interface HazardProgress extends ComplianceStats {
  hazard: string;
}

type TareaCumplimiento = Pick<TareaPlanTrabajo, 'totalProgress'>;

/** Cumplimiento de un conjunto de actividades. Base compartida de todos los indicadores. */
export function calcCompliance(tasks: TareaCumplimiento[]): ComplianceStats {
  const total = tasks.length;
  let executed = 0;
  let inProgress = 0;

  for (const t of tasks) {
    const avance = t.totalProgress || 0;
    if (avance >= 100) executed += 1;
    else if (avance > 0) inProgress += 1;
  }

  return {
    total,
    executed,
    pending: total - executed,
    inProgress,
    progress: total === 0 ? 0 : Math.round((executed / total) * 100),
  };
}

/**
 * Cumplimiento agrupado por peligro/programa. Las actividades sin `hazard` caen en
 * el grupo que indique `fallbackLabel` para no perderlas del indicador.
 */
export function calcProgressByHazard(
  tasks: Array<Pick<TareaPlanTrabajo, 'hazard' | 'totalProgress'>>,
  fallbackLabel = 'Sin asignar',
): HazardProgress[] {
  const groups = new Map<string, TareaCumplimiento[]>();

  for (const t of tasks) {
    const hazard = t.hazard?.trim() || fallbackLabel;
    const arr = groups.get(hazard);
    if (arr) arr.push(t);
    else groups.set(hazard, [t]);
  }

  return Array.from(groups.entries())
    .map(([hazard, items]) => ({ hazard, ...calcCompliance(items) }))
    .sort((a, b) => b.total - a.total);
}

/** Un plan en estado 'Cerrado' es de solo lectura. */
export function isPlanReadOnly(status: PlanTrabajo['status']): boolean {
  return status === 'Cerrado';
}

// ── CRUD del plan ────────────────────────────────────────────────────────────────

export async function createWorkPlan(
  data: Partial<PlanTrabajo>,
  createdBy: string,
): Promise<string> {
  const payload = stripUndefined({
    ...data,
    createdBy,
    version: data.version || 1,
    status: data.status || 'Borrador',
    tasksCount: 0,
    executedCount: 0,
    pendingCount: 0,
    progressPercentage: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const ref = await addDoc(collection(db, COL), payload);
  return ref.id;
}

export async function updateWorkPlan(
  planId: string,
  data: Partial<PlanTrabajo>,
): Promise<void> {
  const payload = stripUndefined({
    ...data,
    updatedAt: serverTimestamp(),
  });
  await updateDoc(doc(db, COL, planId), payload);
}

/**
 * Firestore NO borra subcolecciones en cascada: primero se borran todas las tareas
 * por lotes (máx ~490 ops/batch) y luego el documento padre.
 */
export async function deleteWorkPlan(planId: string): Promise<void> {
  const snap = await getDocs(tasksCol(planId));
  const docs = snap.docs;
  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const batch = writeBatch(db);
    docs.slice(i, i + BATCH_LIMIT).forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
  await deleteDoc(doc(db, COL, planId));
}

// ── CRUD de tareas (subcolección) ────────────────────────────────────────────────

export async function createTask(
  planId: string,
  data: Partial<TareaPlanTrabajo>,
): Promise<string> {
  const mp = data.monthlyProgress
    ? normalizeMonthlyProgress(data.monthlyProgress)
    : initMonthlyProgress();
  const payload = stripUndefined({
    activity: data.activity ?? '',
    phva: data.phva,
    hazard: data.hazard,
    resourceType: data.resourceType,
    responsibleName: data.responsibleName ?? '',
    responsibleRole: data.responsibleRole ?? '',
    frequency: data.frequency,
    monthlyProgress: mp,
    totalProgress: calcTaskProgress(mp),
    status: (data.status as EstadoTarea) || 'Pendiente',
    orderIndex: data.orderIndex ?? Date.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const ref = await addDoc(tasksCol(planId), payload);
  return ref.id;
}

export async function updateTask(
  planId: string,
  taskId: string,
  data: Partial<TareaPlanTrabajo>,
): Promise<void> {
  const payload: Record<string, any> = { ...data, updatedAt: serverTimestamp() };
  // Si vienen meses, normalizar y RECALCULAR el cumplimiento antes de escribir.
  if (data.monthlyProgress !== undefined) {
    const mp = normalizeMonthlyProgress(data.monthlyProgress);
    payload.monthlyProgress = mp;
    payload.totalProgress = calcTaskProgress(mp);
  }
  await updateDoc(doc(db, COL, planId, 'tasks', taskId), stripUndefined(payload));
}

export async function deleteTask(planId: string, taskId: string): Promise<void> {
  await deleteDoc(doc(db, COL, planId, 'tasks', taskId));
}

/**
 * Alta masiva por lotes. Cada tarea con 12 meses vacíos, totalProgress 0 y estado
 * 'Pendiente'. Devuelve el nº de tareas creadas.
 */
export async function importTasks(
  planId: string,
  rows: Array<Partial<TareaPlanTrabajo>>,
): Promise<number> {
  let created = 0;
  for (let i = 0; i < rows.length; i += BATCH_LIMIT) {
    const batch = writeBatch(db);
    rows.slice(i, i + BATCH_LIMIT).forEach((row, j) => {
      const ref = doc(tasksCol(planId));
      batch.set(ref, stripUndefined({
        activity: row.activity ?? '',
        phva: row.phva,
        hazard: row.hazard,
        resourceType: row.resourceType,
        responsibleName: row.responsibleName ?? '',
        responsibleRole: row.responsibleRole ?? '',
        frequency: row.frequency,
        monthlyProgress: initMonthlyProgress(),
        totalProgress: 0,
        status: 'Pendiente' as EstadoTarea,
        orderIndex: Date.now() + i + j,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }));
      created++;
    });
    await batch.commit();
  }
  return created;
}

// ── Agregados denormalizados ─────────────────────────────────────────────────────

/**
 * Un ÚNICO updateDoc que reescribe los agregados del plan. Idempotente y offline-safe
 * (sin transacciones). La página de detalle solo lo invoca cuando el valor derivado
 * difiere del almacenado, por lo que el cálculo converge sin bucles.
 */
export async function recalcPlanAggregates(
  planId: string,
  tasks: Array<Pick<TareaPlanTrabajo, 'totalProgress'>>,
): Promise<void> {
  const { total, executed, pending } = calcPlanStats(tasks);
  await updateDoc(doc(db, COL, planId), {
    tasksCount: total,
    executedCount: executed,
    pendingCount: pending,
    progressPercentage: calcPlanProgress(tasks),
    updatedAt: serverTimestamp(),
  });
}
