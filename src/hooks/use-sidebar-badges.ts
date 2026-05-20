
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from './use-user';
import type { Permit, UserRole } from '@/types';
import { isInLiderRegionalScope } from '@/lib/role-config';

export function useSidebarBadges() {
  const { user } = useUser();
  const [pendingPermits, setPendingPermits] = useState(0);

  useEffect(() => {
    if (!user?.role) {
      setPendingPermits(0);
      return;
    }

    const { role } = user;
    const approverRoles: UserRole[] = ['admin', 'autorizante', 'lider_sst', 'mantenimiento', 'lider_regional'];

    // Only run the query for roles that can approve.
    if (!approverRoles.includes(role)) {
      setPendingPermits(0);
      return;
    }

    const queryConstraints: QueryConstraint[] = [];

    // Add specific constraints based on role to satisfy security rules.
    if (role === 'mantenimiento') {
      queryConstraints.push(where('controlEnergia', '==', true));
    } else if (role === 'admin' || role === 'lider_regional') {
      queryConstraints.push(where('status', '==', 'pendiente_revision'));
    } else if (role === 'autorizante' || role === 'lider_sst') {
      // FIX 2C: Filtrar por status en la query; empresa/planta se aplican en el callback.
      // NOTE: Firestore Security Rules v2 no soporta validación de campos anidados en queries,
      // por lo que la restricción por empresa/planta se aplica en el cliente (onSnapshot).
      queryConstraints.push(where('status', '==', 'pendiente_revision'));
    }

    const q = query(collection(db, 'permits'), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const pendingForMe = snapshot.docs.filter(doc => {
          const permit = doc.data() as Permit;

          // Client-side filter for status if it wasn't in the query (for 'mantenimiento')
          if (permit.status !== 'pendiente_revision') {
            return false;
          }

          // FIX 2C: Filtro cliente por empresa y planta para autorizante y lider_sst
          if (role === 'lider_regional') {
            if (!isInLiderRegionalScope(user, {
              empresa: permit.generalInfo?.empresa,
              planta: permit.generalInfo?.planta,
              ciudad: permit.generalInfo?.ciudad,
            })) return false;
          } else if (role === 'autorizante' || role === 'lider_sst') {
            const matchEmpresa = !user.empresa || !permit.generalInfo?.empresa || permit.generalInfo.empresa.toLowerCase() === user.empresa.toLowerCase();
            const matchPlanta  = !user.planta  || !permit.generalInfo?.planta  || permit.generalInfo.planta.toLowerCase()  === user.planta.toLowerCase();
            if (!matchEmpresa || !matchPlanta) return false;
          }

          const approvals = permit.approvals || {};

          // Check if the current user's role is a pending approver for this permit.
          const requiredApproval = approvals[role as keyof typeof approvals];

          if (requiredApproval?.status === 'pendiente') {
            // Logic to check if it's this user's turn to sign
            const isSolicitanteSigned = approvals.solicitante?.status === 'aprobado';

            // Autorizante and Lider_SST can sign after the solicitante.
            if (role === 'autorizante' || role === 'lider_sst') {
              // For SST, also check if their signature is required
              if (role === 'lider_sst' && !permit.isSSTSignatureRequired) {
                return false;
              }
              return isSolicitanteSigned;
            }

            // Mantenimiento firma después del solicitante (y antes del autorizante).
            if (role === 'mantenimiento') {
              return isSolicitanteSigned;
            }

            // For admin, the broad query is enough, but we double-check logic
            return isSolicitanteSigned;
          }

          return false;
        });

        setPendingPermits(pendingForMe.length);
      },
      (error) => {
        console.error('Error al escuchar permisos pendientes:', error.message);
        setPendingPermits(0);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return {
    pendingPermits,
  };
}
