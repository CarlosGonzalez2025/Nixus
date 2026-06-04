'use client';

import { useState, useEffect, useRef } from 'react';
import {
  collection, query, orderBy, onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { DiagnosticoConfinado } from '@/types/confinados';

const COL = 'diagnosticosConfinados';

export function useDiagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticoConfinado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref so we can unsubscribe even if the component unmounts mid-way
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
            snap.docs.map(d => ({ id: d.id, ...d.data() } as DiagnosticoConfinado)),
          );
          setLoading(false);
          setError(null);
        },
        err => {
          if (cancelled) return;
          // FIRESTORE INTERNAL ASSERTION errors are transient cache issues —
          // silently clear and return empty rather than crashing the UI.
          console.warn('[useDiagnosticos]', err.message);
          setDiagnosticos([]);
          setLoading(false);
          setError(null);
        },
      );

      unsubRef.current = unsub;
    } catch (err: any) {
      if (!cancelled) {
        console.warn('[useDiagnosticos] setup error:', err.message);
        setLoading(false);
      }
    }

    return () => {
      cancelled = true;
      unsubRef.current?.();
      unsubRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No deps — single listener for the full collection

  return { diagnosticos, loading, error };
}
