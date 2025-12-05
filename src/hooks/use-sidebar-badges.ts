'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from './use-user';

export function useSidebarBadges() {
  const { user } = useUser();
  const [pendingPermits, setPendingPermits] = useState(0);

  useEffect(() => {
    if (!user) {
      setPendingPermits(0);
      return;
    }

    // Query para contar permisos pendientes de revisar/aprobar
    const q = query(
      collection(db, 'permits'),
      where('status', 'in', ['pendiente_revision', 'pendiente_aprobacion'])
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Filtrar solo los que tienen el usuario como aprobador pendiente
        const pending = snapshot.docs.filter(doc => {
          const data = doc.data();
          const approvals = data.approvals || {};
          return approvals[user.uid]?.status === 'pending';
        });
        setPendingPermits(pending.length);
      },
      (error) => {
        console.error('Error al escuchar permisos pendientes:', error);
        setPendingPermits(0);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    pendingPermits,
  };
}