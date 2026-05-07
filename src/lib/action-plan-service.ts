import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  query, where, orderBy, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ActionPlan, ActionPlanStatus } from '@/types';

const VER_COL = 'contractorVerifications';
const AP_SUB = 'actionPlans';

export async function getActionPlansByVerification(verificationId: string): Promise<ActionPlan[]> {
  const snap = await getDocs(
    query(
      collection(db, VER_COL, verificationId, AP_SUB),
      orderBy('createdAt', 'desc'),
    ),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ActionPlan));
}

export async function createActionPlan(
  verificationId: string,
  data: Omit<ActionPlan, 'id' | 'verificationId' | 'createdAt'>,
): Promise<string> {
  const ref = await addDoc(collection(db, VER_COL, verificationId, AP_SUB), {
    ...data,
    verificationId,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateActionPlan(
  verificationId: string,
  actionPlanId: string,
  data: Partial<Omit<ActionPlan, 'id' | 'verificationId' | 'createdAt'>>,
): Promise<void> {
  await updateDoc(doc(db, VER_COL, verificationId, AP_SUB, actionPlanId), data);
}

export async function closeActionPlan(
  verificationId: string,
  actionPlanId: string,
  closedBy: string,
  closingObservation: string,
  closingEvidenceUrl?: string,
): Promise<void> {
  await updateDoc(doc(db, VER_COL, verificationId, AP_SUB, actionPlanId), {
    status: 'CLOSED' as ActionPlanStatus,
    closedBy,
    closedAt: serverTimestamp(),
    closingObservation,
    ...(closingEvidenceUrl ? { closingEvidenceUrl } : {}),
  });
}
