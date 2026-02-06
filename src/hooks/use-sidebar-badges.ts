
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from './use-user';
import type { Permit, UserRole } from '@/types';

export function useSidebarBadges() {
  const { user } = useUser();
  const [pendingPermits, setPendingPermits] = useState(0);

  useEffect(() => {
    if (!user?.role) {
      setPendingPermits(0);
      return;
    }

    const { role } = user;
    const approverRoles: UserRole[] = ['admin', 'autorizante', 'lider_sst', 'mantenimiento'];

    // Only run the query for roles that can approve.
    if (!approverRoles.includes(role)) {
      setPendingPermits(0);
      return;
    }
    
    const queryConstraints: QueryConstraint[] = [
      where('status', '==', 'pendiente_revision')
    ];
    
    // Add specific constraints based on role to satisfy security rules.
    if (role === 'mantenimiento') {
      queryConstraints.push(where('controlEnergia', '==', true));
    }

    const q = query(collection(db, 'permits'), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const pendingForMe = snapshot.docs.filter(doc => {
          const permit = doc.data() as Permit;
          const approvals = permit.approvals || {};

          // Check if the current user's role is a pending approver for this permit.
          const requiredApproval = approvals[role as keyof typeof approvals];

          if (requiredApproval?.status === 'pendiente') {
            // Logic to check if it's this user's turn to sign
            const isSolicitanteSigned = approvals.solicitante?.status === 'aprobado';
            
            // Autorizante and Lider_SST can sign after the solicitante.
            if (role === 'autorizante' || role === 'lider_sst') {
                // For SST, also check if their signature is required
                if(role === 'lider_sst' && !permit.isSSTSignatureRequired) {
                    return false;
                }
                return isSolicitanteSigned;
            }

            // Mantenimiento can sign after solicitante AND autorizante.
            if (role === 'mantenimiento') {
                const isAutorizanteSigned = approvals.autorizante?.status === 'aprobado';
                return isSolicitanteSigned && isAutorizanteSigned;
            }
            
            // For admin or any other general approver
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
