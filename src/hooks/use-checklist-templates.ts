'use client';

import { useEffect, useState } from 'react';
import {
  collection, query, where, orderBy, onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ChecklistTemplate, ChecklistGroup } from '@/types';

export function useTemplatesByRiskType(riskTypeId: string | null) {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!riskTypeId) {
      setTemplates([]);
      return;
    }
    setLoading(true);
    const unsub = onSnapshot(
      query(
        collection(db, 'checklistTemplates'),
        where('riskTypeId', '==', riskTypeId),
        where('status', '==', 'ACTIVE'),
        orderBy('version', 'desc'),
      ),
      (snap) => {
        setTemplates(snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistTemplate)));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [riskTypeId]);

  return { templates, loading };
}

export function useAllTemplates() {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'checklistTemplates'), orderBy('name', 'asc')),
      (snap) => {
        setTemplates(snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistTemplate)));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, []);

  return { templates, loading };
}

export function useTemplateGroups(templateId: string | null) {
  const [groups, setGroups] = useState<ChecklistGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!templateId) {
      setGroups([]);
      return;
    }
    setLoading(true);
    const unsub = onSnapshot(
      query(
        collection(db, 'checklistTemplates', templateId, 'groups'),
        orderBy('orderIndex', 'asc'),
      ),
      (snap) => {
        setGroups(snap.docs.map(d => ({ id: d.id, ...d.data() } as ChecklistGroup)));
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsub();
  }, [templateId]);

  return { groups, loading };
}
