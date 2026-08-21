'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  collection, doc, query, orderBy, onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PlanTrabajo, TareaPlanTrabajo } from '@/types/work-plan';

const COL = 'workPlans';

/** Lista de planes en tiempo real, ordenada por fecha de creación descendente. */
export function useWorkPlans() {
  const [plans, setPlans] = useState<PlanTrabajo[]>([]);
  const [loading, setLoading] = useState(true);
  const unsubRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    let cancelled = false;
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
    try {
      const unsub = onSnapshot(
        q,
        snap => {
          if (cancelled) return;
          setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() } as PlanTrabajo)));
          setLoading(false);
        },
        err => {
          if (cancelled) return;
          console.error('[useWorkPlans]', err);
          setLoading(false);
        },
      );
      unsubRef.current = unsub;
    } catch (err) {
      console.error('[useWorkPlans] setup error:', err);
      if (!cancelled) setLoading(false);
    }
    return () => {
      cancelled = true;
      unsubRef.current?.();
      unsubRef.current = null;
    };
  }, []);

  return { plans, loading };
}

/**
 * Cumplimiento consolidado del plan de trabajo para el dashboard: agrega TODAS las
 * actividades de los planes de una vigencia (por defecto la más reciente con datos).
 *
 * `enabled` existe porque `workPlans` es de acceso exclusivo de administradores
 * (firestore.rules): con otro rol el hook no abre ninguna suscripción y así se evita
 * un permission-denied ruidoso en el dashboard.
 */
export function useWorkPlanCompliance(enabled: boolean, year?: number) {
  const [plans, setPlans] = useState<PlanTrabajo[]>([]);
  const [plansLoading, setPlansLoading] = useState(enabled);
  const [tasksByPlan, setTasksByPlan] = useState<Record<string, TareaPlanTrabajo[]>>({});
  const [tasksLoading, setTasksLoading] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setPlans([]);
      setTasksByPlan({});
      setPlansLoading(false);
      return;
    }
    let cancelled = false;
    setPlansLoading(true);
    const unsub = onSnapshot(
      query(collection(db, COL), orderBy('createdAt', 'desc')),
      snap => {
        if (cancelled) return;
        setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() } as PlanTrabajo)));
        setPlansLoading(false);
      },
      err => {
        if (cancelled) return;
        console.error('[useWorkPlanCompliance:plans]', err);
        setPlansLoading(false);
      },
    );
    return () => { cancelled = true; unsub(); };
  }, [enabled]);

  const availableYears = useMemo(
    () => Array.from(new Set(plans.map(p => p.year).filter(Boolean))).sort((a, b) => b - a),
    [plans],
  );

  /** Vigencia solicitada si existe; si no, la más reciente con planes. */
  const targetYear = useMemo(() => {
    if (availableYears.length === 0) return undefined;
    return year && availableYears.includes(year) ? year : availableYears[0];
  }, [availableYears, year]);

  const targetPlans = useMemo(
    () => plans.filter(p => p.year === targetYear),
    [plans, targetYear],
  );

  // Clave estable para no reabrir suscripciones cuando cambia el objeto pero no los ids.
  const planIdsKey = useMemo(
    () => targetPlans.map(p => p.id).sort().join(','),
    [targetPlans],
  );

  useEffect(() => {
    if (!enabled || !planIdsKey) {
      setTasksByPlan({});
      setTasksLoading(false);
      return;
    }
    let cancelled = false;
    const ids = planIdsKey.split(',');
    const pending = new Set(ids);
    setTasksLoading(true);

    const settle = (id: string) => {
      pending.delete(id);
      if (!cancelled && pending.size === 0) setTasksLoading(false);
    };

    const unsubs = ids.map(id => onSnapshot(
      collection(db, COL, id, 'tasks'),
      snap => {
        if (cancelled) return;
        setTasksByPlan(prev => ({
          ...prev,
          [id]: snap.docs.map(d => ({ id: d.id, ...d.data() } as TareaPlanTrabajo)),
        }));
        settle(id);
      },
      err => {
        if (cancelled) return;
        console.error('[useWorkPlanCompliance:tasks]', err);
        settle(id);
      },
    ));

    return () => { cancelled = true; unsubs.forEach(u => u()); };
  }, [enabled, planIdsKey]);

  // Solo las tareas de los planes vigentes: descarta residuos de vigencias anteriores.
  const tasks = useMemo(
    () => targetPlans.flatMap(p => tasksByPlan[p.id] ?? []),
    [targetPlans, tasksByPlan],
  );

  return {
    plans: targetPlans,
    tasks,
    availableYears,
    targetYear,
    loading: plansLoading || tasksLoading,
  };
}

/** Detalle de un plan + sus tareas en tiempo real (ambos servidos desde IndexedDB offline). */
export function useWorkPlanDetail(planId: string | undefined) {
  const [plan, setPlan] = useState<PlanTrabajo | null>(null);
  const [tasks, setTasks] = useState<TareaPlanTrabajo[]>([]);
  const [planLoading, setPlanLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (!planId) {
      setPlanLoading(false);
      setTasksLoading(false);
      return;
    }
    let cancelled = false;

    const unsubPlan = onSnapshot(
      doc(db, COL, planId),
      snap => {
        if (cancelled) return;
        setPlan(snap.exists() ? ({ id: snap.id, ...snap.data() } as PlanTrabajo) : null);
        setPlanLoading(false);
      },
      err => {
        if (cancelled) return;
        console.error('[useWorkPlanDetail:plan]', err);
        setPlanLoading(false);
      },
    );

    const q = query(collection(db, COL, planId, 'tasks'), orderBy('orderIndex', 'asc'));
    const unsubTasks = onSnapshot(
      q,
      snap => {
        if (cancelled) return;
        setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() } as TareaPlanTrabajo)));
        setTasksLoading(false);
      },
      err => {
        if (cancelled) return;
        console.error('[useWorkPlanDetail:tasks]', err);
        setTasksLoading(false);
      },
    );

    return () => {
      cancelled = true;
      unsubPlan();
      unsubTasks();
    };
  }, [planId]);

  return { plan, tasks, loading: planLoading || tasksLoading };
}
