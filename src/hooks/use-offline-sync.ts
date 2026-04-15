'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import {
  getPendingEntries,
  markEntryProcessed,
  clearProcessedEntries,
  type OfflineQueueEntry,
} from '@/lib/offline-queue';
import { processOfflineQueue } from '@/app/(app)/permits/actions';

interface UseOfflineSyncResult {
  isSyncing: boolean;
  syncingCount: number;
  justSynced: boolean;
}

/**
 * Hook que procesa automáticamente la cola de notificaciones pendientes
 * cuando el dispositivo recupera la conexión.
 *
 * Flujo:
 * 1. Escucha el evento 'online' del navegador.
 * 2. Lee las entradas no procesadas de IndexedDB (offline-queue.ts).
 * 3. Llama al Server Action processOfflineQueue con los IDs de permisos.
 * 4. Marca las entradas como procesadas.
 * 5. Limpia el IndexedDB.
 * 6. Expone estado para que OfflineBanner muestre el progreso.
 */
export function useOfflineSync(): UseOfflineSyncResult {
  const isOnline = useOnlineStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncingCount, setSyncingCount] = useState(0);
  const [justSynced, setJustSynced] = useState(false);
  const isProcessingRef = useRef(false);
  const wasOfflineRef = useRef(!isOnline);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      const pending = await getPendingEntries();
      if (pending.length === 0) {
        isProcessingRef.current = false;
        return;
      }

      setIsSyncing(true);
      setSyncingCount(pending.length);

      // Agrupa entradas por permitId para evitar notificaciones duplicadas
      const byPermit = new Map<string, OfflineQueueEntry>();
      for (const entry of pending) {
        // Si hay varias entradas para el mismo permiso, usa la más reciente
        const existing = byPermit.get(entry.permitId);
        if (!existing || entry.createdAt > existing.createdAt) {
          byPermit.set(entry.permitId, entry);
        }
      }

      const uniqueEntries = Array.from(byPermit.values());

      // Llama al Server Action para enviar notificaciones en el servidor
      const result = await processOfflineQueue(
        uniqueEntries.map((e) => ({
          permitId: e.permitId,
          message: e.message,
          type: e.type,
          triggeredBy: e.triggeredBy,
        }))
      );

      if (result.success) {
        // Marcar todas las entradas procesadas (incluidas duplicadas del mismo permiso)
        for (const entry of pending) {
          await markEntryProcessed(entry.id);
        }
        await clearProcessedEntries();
        setJustSynced(true);
        setTimeout(() => setJustSynced(false), 3500);
      } else {
        console.error('[OfflineSync] Error al procesar la cola:', result.error);
      }
    } catch (error) {
      console.error('[OfflineSync] Error inesperado:', error);
    } finally {
      setIsSyncing(false);
      setSyncingCount(0);
      isProcessingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (isOnline && wasOfflineRef.current) {
      // Dispositivo acaba de reconectar — esperar 1.5s para que Firestore
      // termine de sincronizar sus escrituras pendientes antes de enviar notificaciones
      const timer = setTimeout(() => processQueue(), 1500);
      return () => clearTimeout(timer);
    }
    wasOfflineRef.current = !isOnline;
  }, [isOnline, processQueue]);

  // También procesar al montar si ya hay pendientes (ej. recarga de página con pendientes)
  useEffect(() => {
    if (isOnline) {
      getPendingEntries().then((entries) => {
        if (entries.length > 0) processQueue();
      });
    }
    // Solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isSyncing, syncingCount, justSynced };
}
