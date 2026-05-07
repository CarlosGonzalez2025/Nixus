import {
  collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
  query, where, orderBy, getDocs, writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ChecklistTemplate, ChecklistGroup, ChecklistItem, TemplateStatus } from '@/types';

const TEMPLATES_COL = 'checklistTemplates';
const GROUPS_SUB = 'groups';

// ── Templates ──────────────────────────────────────────────────────────────────

export async function getTemplatesByRiskType(riskTypeId: string): Promise<ChecklistTemplate[]> {
  const snap = await getDocs(
    query(
      collection(db, TEMPLATES_COL),
      where('riskTypeId', '==', riskTypeId),
      orderBy('version', 'desc'),
    ),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistTemplate));
}

export async function getActiveTemplatesByRiskType(riskTypeId: string): Promise<ChecklistTemplate[]> {
  const snap = await getDocs(
    query(
      collection(db, TEMPLATES_COL),
      where('riskTypeId', '==', riskTypeId),
      where('status', '==', 'ACTIVE'),
      orderBy('version', 'desc'),
    ),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistTemplate));
}

export async function getAllTemplates(): Promise<ChecklistTemplate[]> {
  const snap = await getDocs(
    query(collection(db, TEMPLATES_COL), orderBy('name', 'asc')),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistTemplate));
}

export async function createTemplate(
  data: {
    riskTypeId: string;
    riskTypeCode: string;
    name: string;
    description?: string;
  },
  createdBy: string,
): Promise<string> {
  const ref = await addDoc(collection(db, TEMPLATES_COL), {
    ...data,
    version: 1,
    status: 'DRAFT' as TemplateStatus,
    createdBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTemplate(
  id: string,
  data: Partial<Pick<ChecklistTemplate, 'name' | 'description' | 'status'>>,
): Promise<void> {
  await updateDoc(doc(db, TEMPLATES_COL, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTemplate(id: string): Promise<void> {
  await deleteDoc(doc(db, TEMPLATES_COL, id));
}

// ── Groups (con ítems inline como array) ──────────────────────────────────────

export async function getGroupsByTemplate(templateId: string): Promise<ChecklistGroup[]> {
  const snap = await getDocs(
    query(
      collection(db, TEMPLATES_COL, templateId, GROUPS_SUB),
      orderBy('orderIndex', 'asc'),
    ),
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistGroup));
}

export async function createGroup(
  templateId: string,
  data: { title: string; description?: string; orderIndex: number },
): Promise<string> {
  const ref = await addDoc(collection(db, TEMPLATES_COL, templateId, GROUPS_SUB), {
    ...data,
    templateId,
    isActive: true,
    items: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateGroup(
  templateId: string,
  groupId: string,
  data: Partial<Pick<ChecklistGroup, 'title' | 'description' | 'orderIndex' | 'isActive'>>,
): Promise<void> {
  await updateDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGroup(templateId: string, groupId: string): Promise<void> {
  await deleteDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId));
}

// ── Items (almacenados como array dentro del documento del grupo) ──────────────

export async function addItemToGroup(
  templateId: string,
  groupId: string,
  currentItems: ChecklistItem[],
  itemData: Omit<ChecklistItem, 'id' | 'groupId' | 'templateId' | 'createdAt' | 'updatedAt'>,
): Promise<ChecklistItem> {
  const now = new Date().toISOString();
  const newItem: ChecklistItem = {
    id: crypto.randomUUID(),
    groupId,
    templateId,
    ...itemData,
    createdAt: now as any,
    updatedAt: now as any,
  };
  const updatedItems = [...currentItems, newItem];
  await updateDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId), {
    items: updatedItems,
    updatedAt: serverTimestamp(),
  });
  return newItem;
}

export async function updateItemInGroup(
  templateId: string,
  groupId: string,
  currentItems: ChecklistItem[],
  itemId: string,
  itemData: Partial<Omit<ChecklistItem, 'id' | 'groupId' | 'templateId' | 'createdAt'>>,
): Promise<void> {
  const updatedItems = currentItems.map(item =>
    item.id === itemId
      ? { ...item, ...itemData, updatedAt: new Date().toISOString() as any }
      : item,
  );
  await updateDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId), {
    items: updatedItems,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItemFromGroup(
  templateId: string,
  groupId: string,
  currentItems: ChecklistItem[],
  itemId: string,
): Promise<void> {
  const updatedItems = currentItems.filter(item => item.id !== itemId);
  await updateDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId), {
    items: updatedItems,
    updatedAt: serverTimestamp(),
  });
}

export async function reorderGroupItems(
  templateId: string,
  groupId: string,
  reorderedItems: ChecklistItem[],
): Promise<void> {
  const withIndex = reorderedItems.map((item, i) => ({ ...item, orderIndex: i }));
  await updateDoc(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, groupId), {
    items: withIndex,
    updatedAt: serverTimestamp(),
  });
}

// Reordenar grupos en lote
export async function reorderGroups(
  templateId: string,
  groupIds: string[],
): Promise<void> {
  const batch = writeBatch(db);
  groupIds.forEach((id, i) => {
    batch.update(doc(db, TEMPLATES_COL, templateId, GROUPS_SUB, id), { orderIndex: i });
  });
  await batch.commit();
}
