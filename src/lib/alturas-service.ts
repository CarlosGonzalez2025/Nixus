import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  orderBy, getDocs, getDoc, deleteDoc, query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { DiagnosticoAltura } from '@/types/alturas';
import { calcDiagnosticoAlturaScore } from '@/types/alturas';

const COL = 'diagnosticosAlturas';

function stripUndefined(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && typeof v.toDate !== 'function') {
      const nested = stripUndefined(v);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

export async function createDiagnosticoAltura(
  data: Omit<DiagnosticoAltura, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> {
  const resultados = calcDiagnosticoAlturaScore(data);
  const payload = stripUndefined({
    ...data,
    resultados,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const ref = await addDoc(collection(db, COL), payload);
  return ref.id;
}

export async function updateDiagnosticoAltura(
  id: string,
  data: Partial<DiagnosticoAltura>,
): Promise<void> {
  const resultados = calcDiagnosticoAlturaScore(data);
  const payload = stripUndefined({ ...data, resultados, updatedAt: serverTimestamp() });
  await updateDoc(doc(db, COL, id), payload);
}

export async function getDiagnosticoAltura(id: string): Promise<DiagnosticoAltura | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as DiagnosticoAltura;
}

export async function getDiagnosticosAlturas(): Promise<DiagnosticoAltura[]> {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as DiagnosticoAltura));
}

export async function deleteDiagnosticoAltura(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
