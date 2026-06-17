'use client';

import { useState, useEffect, useRef } from 'react';
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
