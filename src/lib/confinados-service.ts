import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  query, where, orderBy, getDocs, getDoc, deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { DiagnosticoConfinado } from '@/types/confinados';
import { calcDiagnosticoScore } from '@/types/confinados';

const COL = 'diagnosticosConfinados';

// ── Firestore doesn't accept `undefined` values — strip them recursively ───────

function stripUndefined(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && typeof v.toDate !== 'function') {
      const nested = stripUndefined(v);
      // Only include the nested object if it has at least one key
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

// ── Create ─────────────────────────────────────────────────────────────────────

export async function createDiagnostico(
  data: Omit<DiagnosticoConfinado, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> {
  const resultados = calcDiagnosticoScore(data);
  const payload = stripUndefined({
    ...data,
    resultados,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const ref = await addDoc(collection(db, COL), payload);
  return ref.id;
}

// ── Update ─────────────────────────────────────────────────────────────────────

export async function updateDiagnostico(
  id: string,
  data: Partial<DiagnosticoConfinado>,
): Promise<void> {
  const resultados = calcDiagnosticoScore(data);
  const payload = stripUndefined({
    ...data,
    resultados,
    updatedAt: serverTimestamp(),
  });
  await updateDoc(doc(db, COL, id), payload);
}

// ── Read single ────────────────────────────────────────────────────────────────

export async function getDiagnostico(id: string): Promise<DiagnosticoConfinado | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as DiagnosticoConfinado;
}

// ── Read list ──────────────────────────────────────────────────────────────────

export async function getDiagnosticos(
  options: { userId?: string; planta?: string } = {},
): Promise<DiagnosticoConfinado[]> {
  const constraints: Parameters<typeof query>[1][] = [orderBy('createdAt', 'desc')];
  if (options.userId) constraints.unshift(where('createdById', '==', options.userId));
  if (options.planta)  constraints.unshift(where('planta', '==', options.planta));

  const q = query(collection(db, COL), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as DiagnosticoConfinado));
}

// ── Delete ─────────────────────────────────────────────────────────────────────

export async function deleteDiagnostico(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
