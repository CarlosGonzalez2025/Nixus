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

export interface HazardProgress {
  hazard: string;
  /** Actividades del plan asociadas al peligro. */
  total: number;
  /** Actividades con cumplimiento 100%. */
  executed: number;
  pending: number;
  /** Meses planeados y meses efectivamente ejecutados (base real del %). */
  plannedMonths: number;
  executedMonths: number;
  /**
   * % de cumplimiento del peligro = meses ejecutados / meses planeados.
   * Se calcula sobre meses y no sobre el promedio de actividades para que una
   * actividad mensual (12 celdas) pese más que una puntual (1 celda), que es como
   * se mide el cumplimiento del plan anual en SST.
   */
  progress: number;
}

/**
 * Cumplimiento agrupado por peligro/programa. Las actividades sin `hazard` caen en
 * el grupo que indique `fallbackLabel` para no perderlas del indicador.
 */
export function calcProgressByHazard(
  tasks: Array<Pick<TareaPlanTrabajo, 'hazard' | 'monthlyProgress' | 'totalProgress'>>,
  fallbackLabel = 'Sin asignar',
): HazardProgress[] {
  const groups = new Map<string, HazardProgress>();

  for (const t of tasks) {
    const hazard = t.hazard?.trim() || fallbackLabel;
    let g = groups.get(hazard);
    if (!g) {
      g = { hazard, total: 0, executed: 0, pending: 0, plannedMonths: 0, executedMonths: 0, progress: 0 };
      groups.set(hazard, g);
    }
    const mp = t.monthlyProgress ?? [];
    const planned = mp.filter(c => c.planned);
    g.total += 1;
    g.plannedMonths += planned.length;
    g.executedMonths += planned.filter(c => c.executed).length;
    if ((t.totalProgress || 0) >= 100) g.executed += 1;
  }

  return Array.from(groups.values())
    .map(g => ({
      ...g,
      pending: g.total - g.executed,
      progress: g.plannedMonths === 0 ? 0 : Math.round((g.executedMonths / g.plannedMonths) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}

/**
 * Cumplimiento global del plan medido en meses (misma base que `calcProgressByHazard`,
 * para que el total y el desglose por peligro sean consistentes entre sí).
 */
export function calcPlanProgressByMonths(
  tasks: Array<Pick<TareaPlanTrabajo, 'monthlyProgress'>>,
): { plannedMonths: number; executedMonths: number; progress: number } {
  let plannedMonths = 0;
  let executedMonths = 0;
  for (const t of tasks) {
    const planned = (t.monthlyProgress ?? []).filter(c => c.planned);
    plannedMonths += planned.length;
    executedMonths += planned.filter(c => c.executed).length;
  }
  return {
    plannedMonths,
    executedMonths,
    progress: plannedMonths === 0 ? 0 : Math.round((executedMonths / plannedMonths) * 100),
  };
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
