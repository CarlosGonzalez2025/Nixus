'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

// ─── Config de campos auditables ────────────────────────────────────────────

export type AuditFieldType = 'empresa' | 'ciudad' | 'planta' | 'area';

interface CollectionConfig {
  id: string;
  displayName: string;
  fieldPath: string; // soporta "nivel1.nivel2"
}

const AUDIT_CONFIG: Record<AuditFieldType, { masterListId: string; label: string; collections: CollectionConfig[] }> = {
  empresa: {
    masterListId: 'empresas',
    label: 'Empresa',
    collections: [
      { id: 'users',                   displayName: 'Usuarios',              fieldPath: 'empresa' },
      { id: 'permits',                 displayName: 'Permisos',              fieldPath: 'generalInfo.empresa' },
      { id: 'hallazgos',               displayName: 'Hallazgos',             fieldPath: 'empresa' },
      { id: 'contractorVerifications', displayName: 'Verif. Contratistas',   fieldPath: 'empresa' },
    ],
  },
  ciudad: {
    masterListId: 'ciudades',
    label: 'Ciudad',
    collections: [
      { id: 'users',     displayName: 'Usuarios',  fieldPath: 'ciudad' },
      { id: 'permits',   displayName: 'Permisos',  fieldPath: 'generalInfo.ciudad' },
      { id: 'hallazgos', displayName: 'Hallazgos', fieldPath: 'ciudad' },
    ],
  },
  planta: {
    masterListId: 'plantas',
    label: 'Planta',
    collections: [
      { id: 'users',                   displayName: 'Usuarios',            fieldPath: 'planta' },
      { id: 'permits',                 displayName: 'Permisos',            fieldPath: 'generalInfo.planta' },
      { id: 'hallazgos',               displayName: 'Hallazgos',           fieldPath: 'planta' },
      { id: 'contractorVerifications', displayName: 'Verif. Contratistas', fieldPath: 'planta' },
    ],
  },
  area: {
    masterListId: 'areas',
    label: 'Área',
    collections: [
      { id: 'users',     displayName: 'Usuarios',  fieldPath: 'area' },
      { id: 'permits',   displayName: 'Permisos',  fieldPath: 'generalInfo.areaEspecifica' },
      { id: 'hallazgos', displayName: 'Hallazgos', fieldPath: 'area' },
    ],
  },
};

// ─── Tipos de retorno ────────────────────────────────────────────────────────

export interface AuditCollectionPresence {
  collectionId: string;
  displayName: string;
  count: number;
}

export interface AuditEntry {
  value: string;
  isInMaster: boolean; // false = huérfano
  totalDocs: number;
  collections: AuditCollectionPresence[];
}

export interface AuditResult {
  field: AuditFieldType;
  label: string;
  masterList: string[];
  entries: AuditEntry[];
  scannedAt: string;
  totalOrphans: number;
  totalNoData: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getNestedValue(data: Record<string, any>, fieldPath: string): string | undefined {
  const parts = fieldPath.split('.');
  let current: any = data;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return typeof current === 'string' && current.trim() !== '' ? current.trim() : undefined;
}

// ─── Server Actions ───────────────────────────────────────────────────────────

export async function scanAuditField(
  field: AuditFieldType
): Promise<{ result?: AuditResult; error?: string }> {
  try {
    const config = AUDIT_CONFIG[field];

    // 1. Cargar lista maestra
    const masterSnap = await adminDb.collection('dynamic_lists').doc(config.masterListId).get();
    const masterList: string[] = masterSnap.exists ? (masterSnap.data()?.items ?? []) : [];
    const masterSet = new Set(masterList.map(v => v.toLowerCase().trim()));

    // 2. Escanear colecciones
    type ValueData = {
      totalDocs: number;
      collections: Map<string, { count: number; displayName: string }>;
    };
    const valueMap = new Map<string, ValueData>();

    for (const coll of config.collections) {
      const snapshot = await adminDb.collection(coll.id).get();
      for (const doc of snapshot.docs) {
        const val = getNestedValue(doc.data(), coll.fieldPath);
        if (!val) continue;

        if (!valueMap.has(val)) {
          valueMap.set(val, { totalDocs: 0, collections: new Map() });
        }
        const entry = valueMap.get(val)!;
        entry.totalDocs++;

        if (!entry.collections.has(coll.id)) {
          entry.collections.set(coll.id, { count: 0, displayName: coll.displayName });
        }
        entry.collections.get(coll.id)!.count++;
      }
    }

    // 3. Construir entradas
    const entries: AuditEntry[] = [];

    for (const [value, data] of valueMap.entries()) {
      const isInMaster = masterSet.has(value.toLowerCase().trim());
      entries.push({
        value,
        isInMaster,
        totalDocs: data.totalDocs,
        collections: Array.from(data.collections.entries()).map(([collId, c]) => ({
          collectionId: collId,
          displayName: c.displayName,
          count: c.count,
        })),
      });
    }

    // 4. Agregar ítems del maestro sin documentos
    for (const masterItem of masterList) {
      const exists = entries.some(e => e.value.toLowerCase().trim() === masterItem.toLowerCase().trim());
      if (!exists) {
        entries.push({ value: masterItem, isInMaster: true, totalDocs: 0, collections: [] });
      }
    }

    // 5. Ordenar: huérfanos con docs primero, luego por total desc
    entries.sort((a, b) => {
      if (a.isInMaster !== b.isInMaster) return a.isInMaster ? 1 : -1;
      return b.totalDocs - a.totalDocs;
    });

    return {
      result: {
        field,
        label: config.label,
        masterList,
        entries,
        scannedAt: new Date().toISOString(),
        totalOrphans: entries.filter(e => !e.isInMaster && e.totalDocs > 0).length,
        totalNoData: entries.filter(e => e.isInMaster && e.totalDocs === 0).length,
      },
    };
  } catch (error: any) {
    console.error('Error scanning audit field:', error);
    return { error: error.message || 'Error al escanear la base de datos' };
  }
}

export async function renameAuditValue(
  field: AuditFieldType,
  oldValue: string,
  newValue: string,
  addToMasterList: boolean
): Promise<{ success?: boolean; updatedCount?: number; error?: string }> {
  try {
    const config = AUDIT_CONFIG[field];
    const newValueTrimmed = newValue.trim();
    if (!newValueTrimmed) return { error: 'El nuevo valor no puede estar vacío' };

    let totalUpdated = 0;

    for (const coll of config.collections) {
      const snapshot = await adminDb.collection(coll.id).get();

      const toUpdate = snapshot.docs.filter(doc => {
        const val = getNestedValue(doc.data(), coll.fieldPath);
        return val === oldValue;
      });

      if (toUpdate.length === 0) continue;

      // Batch writes en chunks de 499
      const CHUNK = 499;
      for (let i = 0; i < toUpdate.length; i += CHUNK) {
        const chunk = toUpdate.slice(i, i + CHUNK);
        const batch = adminDb.batch();
        for (const doc of chunk) {
          batch.update(doc.ref, { [coll.fieldPath]: newValueTrimmed });
        }
        await batch.commit();
        totalUpdated += chunk.length;
      }
    }

    // Agregar a lista maestra si se solicitó
    if (addToMasterList) {
      const masterRef = adminDb.collection('dynamic_lists').doc(config.masterListId);
      const masterDoc = await masterRef.get();
      const currentItems: string[] = masterDoc.exists ? (masterDoc.data()?.items ?? []) : [];
      if (!currentItems.includes(newValueTrimmed)) {
        await masterRef.set(
          { items: FieldValue.arrayUnion(newValueTrimmed), updatedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    }

    revalidatePath('/admin/audit');
    revalidatePath('/admin/lists');

    return { success: true, updatedCount: totalUpdated };
  } catch (error: any) {
    console.error('Error renaming audit value:', error);
    return { error: error.message || 'Error al renombrar el valor' };
  }
}
