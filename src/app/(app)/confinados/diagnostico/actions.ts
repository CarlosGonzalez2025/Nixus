'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { DiagnosticoConfinado } from '@/types/confinados';
import { calcDiagnosticoScore } from '@/types/confinados';

// Firestore Admin also rejects undefined — strip recursively
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

const COL = 'diagnosticosConfinados';

// ── Save (create or update) ────────────────────────────────────────────────────

export interface SaveResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function saveDiagnostico(
  data: Omit<DiagnosticoConfinado, 'createdAt' | 'updatedAt'>,
): Promise<SaveResult> {
  if (!isAdminReady()) {
    return { success: false, error: 'Firebase Admin no disponible' };
  }

  const db = adminDb!;
  const resultados = calcDiagnosticoScore(data);
  const now = Timestamp.now();

  try {
    if (data.id) {
      const { id, ...rest } = data;
      await db.collection(COL).doc(id).update(
        stripUndefined({ ...rest, resultados, updatedAt: now }),
      );
      return { success: true, id };
    } else {
      const { id: _id, ...rest } = data;
      const ref = await db.collection(COL).add(
        stripUndefined({ ...rest, resultados, createdAt: now, updatedAt: now }),
      );
      return { success: true, id: ref.id };
    }
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Error desconocido' };
  }
}

// ── Delete ─────────────────────────────────────────────────────────────────────

export async function deleteDiagnosticoAction(id: string): Promise<SaveResult> {
  if (!isAdminReady()) {
    return { success: false, error: 'Firebase Admin no disponible' };
  }
  try {
    await adminDb!.collection(COL).doc(id).delete();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Error desconocido' };
  }
}

// ── Get single (server-side) ────────────────────────────────────────────────────

export async function getDiagnosticoServer(
  id: string,
): Promise<DiagnosticoConfinado | null> {
  if (!isAdminReady()) return null;
  const snap = await adminDb!.collection(COL).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as DiagnosticoConfinado;
}
