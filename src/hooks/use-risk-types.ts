'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { RiskType } from '@/types';

export function useRiskTypes() {
  const [riskTypes, setRiskTypes] = useState<RiskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'riskTypes'), orderBy('name', 'asc')),
      (snap) => {
        setRiskTypes(snap.docs.map(d => ({ id: d.id, ...d.data() } as RiskType)));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, []);

  const activeRiskTypes = riskTypes.filter(r => r.isActive);

  return { riskTypes, activeRiskTypes, loading };
}
