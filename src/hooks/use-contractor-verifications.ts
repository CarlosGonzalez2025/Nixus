'use client';

import { useEffect, useState } from 'react';
import {
  collection, query, where, orderBy, onSnapshot,
  doc, getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  ContractorVerification,
  ContractorVerificationAnswer,
  ActionPlan,
  User,
} from '@/types';

// ── Lista de verificaciones con filtros por rol ────────────────────────────────

export function useContractorVerifications(user: User | null) {
  const [verifications, setVerifications] = useState<ContractorVerification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const constraints: any[] = [orderBy('createdAt', 'desc')];

    if (user.role === 'asesor_arl') {
      // Asesor ARL: solo sus propias verificaciones
      constraints.unshift(where('createdBy', '==', user.uid));
    } else if (user.role === 'lider_sst' && user.planta) {
      // Líder SST: solo verificaciones de su planta
      constraints.unshift(where('plantId', '==', user.planta));
    }
    // Admin: sin filtro adicional → ve todo

    const unsub = onSnapshot(
      query(collection(db, 'contractorVerifications'), ...constraints),
      (snap) => {
        setVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContractorVerification)));
        setLoading(false);
      },
      (err) => {
        console.error('Error cargando verificaciones:', err);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [user]);

  return { verifications, loading };
}

// ── Detalle de una verificación + sus respuestas y planes de acción ────────────

export function useVerificationDetail(verificationId: string | null) {
  const [verification, setVerification] = useState<ContractorVerification | null>(null);
  const [answers, setAnswers] = useState<ContractorVerificationAnswer[]>([]);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!verificationId) return;

    // Escuchar verificación principal
    const unsubVer = onSnapshot(
      doc(db, 'contractorVerifications', verificationId),
      (snap) => {
        if (snap.exists()) {
          setVerification({ id: snap.id, ...snap.data() } as ContractorVerification);
        }
        setLoading(false);
      },
    );

    // Escuchar respuestas
    const unsubAns = onSnapshot(
      query(
        collection(db, 'contractorVerifications', verificationId, 'answers'),
        orderBy('orderIndex', 'asc'),
      ),
      (snap) => {
        setAnswers(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContractorVerificationAnswer)));
      },
    );

    // Escuchar planes de acción
    const unsubAP = onSnapshot(
      query(
        collection(db, 'contractorVerifications', verificationId, 'actionPlans'),
        orderBy('createdAt', 'desc'),
      ),
      (snap) => {
        setActionPlans(snap.docs.map(d => ({ id: d.id, ...d.data() } as ActionPlan)));
      },
    );

    return () => {
      unsubVer();
      unsubAns();
      unsubAP();
    };
  }, [verificationId]);

  return { verification, answers, actionPlans, loading };
}

// ── Planes de acción visibles según rol ───────────────────────────────────────

export function useAllActionPlans(user: User | null) {
  const [verifications, setVerifications] = useState<ContractorVerification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const constraints: any[] = [orderBy('createdAt', 'desc')];
    if (user.role === 'asesor_arl') {
      constraints.unshift(where('createdBy', '==', user.uid));
    } else if (user.role === 'lider_sst' && user.planta) {
      constraints.unshift(where('plantId', '==', user.planta));
    }

    const unsub = onSnapshot(
      query(collection(db, 'contractorVerifications'), ...constraints),
      (snap) => {
        setVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContractorVerification)));
        setLoading(false);
      },
    );

    return () => unsub();
  }, [user]);

  return { verifications, loading };
}
