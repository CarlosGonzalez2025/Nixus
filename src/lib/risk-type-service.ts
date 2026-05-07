import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  query, orderBy, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { RiskType } from '@/types';

const COL = 'riskTypes';

export async function getRiskTypes(): Promise<RiskType[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('name', 'asc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as RiskType));
}

export async function createRiskType(
  data: { code: string; name: string; description?: string },
  createdBy: string,
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    isActive: true,
    createdBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateRiskType(
  id: string,
  data: Partial<Pick<RiskType, 'code' | 'name' | 'description' | 'isActive'>>,
): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
}
