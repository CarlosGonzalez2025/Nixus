'use client';

import { useState, useEffect, useRef } from 'react';
import {
  collection, query, orderBy, onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { DiagnosticoAltura } from '@/types/alturas';

const COL = 'diagnosticosAlturas';

export function useDiagnosticosAlturas() {
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticoAltura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unsubRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    let cancelled = false;
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'));

    try {
      const unsub = onSnapshot(
        q,
        { includeMetadataChanges: false },
        snap => {
          if (cancelled) return;
          setDiagnosticos(
            snap.docs.map(d => ({ id: d.id, ...d.data() } as DiagnosticoAltura)),
          );
          setLoading(false);
          setError(null);
        },
        err => {
          if (cancelled) return;
          console.warn('[useDiagnosticosAlturas]', err.message);
          setDiagnosticos([]);
          setLoading(false);
          setError(null);
        },
      );

      unsubRef.current = unsub;
    } catch (err: any) {
      if (!cancelled) {
        console.warn('[useDiagnosticosAlturas] setup error:', err.message);
        setLoading(false);
      }
    }

    return () => {
      cancelled = true;
      unsubRef.current?.();
      unsubRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { diagnosticos, loading, error };
}
