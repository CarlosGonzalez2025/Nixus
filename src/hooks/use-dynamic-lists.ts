'use client';

import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ListName = 'areas' | 'plantas' | 'procesos' | 'contratos' | 'empresas' | 'ciudades';

type ListsState = Partial<Record<ListName, string[]>>;

/**
 * Fetches one or more dynamic_lists documents in real-time.
 * Returns sorted arrays; empty array while loading or on error.
 */
export function useDynamicLists(names: ListName[]) {
  const [lists, setLists]     = useState<ListsState>({});
  const [loading, setLoading] = useState(true);
  const unsubs = useRef<Unsubscribe[]>([]);

  useEffect(() => {
    // cleanup previous subscriptions
    unsubs.current.forEach(u => u());
    unsubs.current = [];

    const pending = new Set(names);

    const subs = names.map(name => {
      const ref = doc(db, 'dynamic_lists', name);
      return onSnapshot(
        ref,
        snap => {
          const items: string[] = snap.exists()
            ? [...(snap.data().items ?? [])].sort()
            : [];
          setLists(prev => ({ ...prev, [name]: items }));
          pending.delete(name);
          if (pending.size === 0) setLoading(false);
        },
        err => {
          console.warn(`[useDynamicLists] ${name}:`, err.message);
          setLists(prev => ({ ...prev, [name]: [] }));
          pending.delete(name);
          if (pending.size === 0) setLoading(false);
        },
      );
    });

    unsubs.current = subs;
    return () => subs.forEach(u => u());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join(',')]);

  return { lists, loading };
}
