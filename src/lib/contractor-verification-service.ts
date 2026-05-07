import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  query, where, orderBy, getDocs, writeBatch, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  ContractorVerification,
  ContractorVerificationAnswer,
  ChecklistGroup,
  VerificationStatus,
  VerificationResult,
} from '@/types';

const VER_COL = 'contractorVerifications';
const ANS_SUB = 'answers';

// ── Crear verificación + batch de respuestas iniciales ─────────────────────────

export async function createVerification(
  data: Omit<ContractorVerification, 'id' | 'createdAt' | 'updatedAt'>,
  groups: ChecklistGroup[],
): Promise<string> {
  // 1. Calcular totalItems
  const totalItems = groups.reduce((acc, g) => acc + g.items.filter(i => i.isActive).length, 0);

  const verRef = await addDoc(collection(db, VER_COL), {
    ...data,
    totalItems,
    compliantItems: 0,
    nonCompliantItems: 0,
    improvementItems: 0,
    notApplicableItems: 0,
    compliancePercentage: 0,
    hasFindings: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // 2. Batch write de respuestas (una por ítem activo)
  const batch = writeBatch(db);
  let batchCount = 0;
  const batches = [batch];

  for (const group of groups) {
    for (const item of group.items.filter(i => i.isActive)) {
      if (batchCount > 0 && batchCount % 490 === 0) {
        batches.push(writeBatch(db));
      }
      const currentBatch = batches[batches.length - 1];
      const ansRef = doc(collection(db, VER_COL, verRef.id, ANS_SUB));
      currentBatch.set(ansRef, {
        id: ansRef.id,
        verificationId: verRef.id,
        itemId: item.id,
        groupId: group.id,
        groupTitle: group.title,
        requisitoBaseLegal: item.requisitoBaseLegal,
        aspectoVerificar: item.aspectoVerificar,
        preguntaClave: item.preguntaClave,
        metodoVerificacion: item.metodoVerificacion,
        evidenciaObjetiva: '',
        result: null,
        observation: '',
        requiresActionPlan: false,
        evidenceUrls: [],
        orderIndex: item.orderIndex,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      batchCount++;
    }
  }

  await Promise.all(batches.map(b => b.commit()));
  return verRef.id;
}

// ── Actualizar verificación ────────────────────────────────────────────────────

export async function updateVerification(
  id: string,
  data: Partial<Omit<ContractorVerification, 'id' | 'createdAt'>>,
): Promise<void> {
  await updateDoc(doc(db, VER_COL, id), { ...data, updatedAt: serverTimestamp() });
}

// ── Actualizar respuesta individual ───────────────────────────────────────────

export async function updateAnswer(
  verificationId: string,
  answerId: string,
  data: Partial<Omit<ContractorVerificationAnswer, 'id' | 'verificationId' | 'createdAt'>>,
): Promise<void> {
  await updateDoc(doc(db, VER_COL, verificationId, ANS_SUB, answerId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ── Recalcular y actualizar estadísticas de cumplimiento ──────────────────────

export async function recalculateCompliance(
  verificationId: string,
  answers: ContractorVerificationAnswer[],
): Promise<void> {
  const compliant   = answers.filter(a => a.result === 'C').length;
  const nonCompliant = answers.filter(a => a.result === 'NC').length;
  const improvement  = answers.filter(a => a.result === 'OM').length;
  const notApplicable = answers.filter(a => a.result === 'NA').length;

  const denominator = compliant + nonCompliant + improvement;
  const pct = denominator > 0 ? Math.round((compliant / denominator) * 100) : 0;

  await updateDoc(doc(db, VER_COL, verificationId), {
    compliantItems: compliant,
    nonCompliantItems: nonCompliant,
    improvementItems: improvement,
    notApplicableItems: notApplicable,
    compliancePercentage: pct,
    hasFindings: nonCompliant > 0 || improvement > 0,
    updatedAt: serverTimestamp(),
  });
}

// ── Cerrar verificación ────────────────────────────────────────────────────────

export async function closeVerification(
  verificationId: string,
  closedBy: string,
): Promise<void> {
  await updateDoc(doc(db, VER_COL, verificationId), {
    status: 'CLOSED' as VerificationStatus,
    closedBy,
    closedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ── Leer respuestas de una verificación ───────────────────────────────────────

export async function getAnswers(verificationId: string): Promise<ContractorVerificationAnswer[]> {
  const snap = await getDocs(
    query(
      collection(db, VER_COL, verificationId, ANS_SUB),
      orderBy('orderIndex', 'asc'),
    ),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ContractorVerificationAnswer));
}

// ── Validar si una verificación puede cerrarse ─────────────────────────────────

import type { ActionPlan } from '@/types';

export function canCloseVerification(
  answers: ContractorVerificationAnswer[],
  requiredItemIds: string[],
  actionPlans: ActionPlan[] = [],
): { canClose: boolean; reason?: string } {
  const requiredUnanswered = requiredItemIds.filter(itemId => {
    const answer = answers.find(a => a.itemId === itemId);
    return !answer || answer.result === null;
  });

  if (requiredUnanswered.length > 0) {
    return {
      canClose: false,
      reason: `Hay ${requiredUnanswered.length} ítem(s) obligatorio(s) sin respuesta.`,
    };
  }

  // Cruzar NC con planes reales: un ítem NC está OK si tiene al menos un plan de acción
  const ncWithoutPlan = answers.filter(a => {
    if (a.result !== 'NC') return false;
    // Si requiresActionPlan ya fue marcado false, está OK
    if (!a.requiresActionPlan) return false;
    // Verificar que exista al menos un plan de acción para esta respuesta
    return !actionPlans.some(ap => ap.answerId === a.id);
  });

  if (ncWithoutPlan.length > 0) {
    return {
      canClose: false,
      reason: `Hay ${ncWithoutPlan.length} No Conformidad(es) sin plan de acción asociado.`,
    };
  }

  return { canClose: true };
}
