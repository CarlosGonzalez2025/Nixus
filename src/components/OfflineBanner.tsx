'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, CloudUpload } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { getPendingCount } from '@/lib/offline-queue';
import { cn } from '@/lib/utils';

interface OfflineBannerProps {
  /** Número de operaciones que se están sincronizando (para mostrar spinner). */
  syncingCount?: number;
  /** true cuando el hook useOfflineSync está procesando la cola. */
  isSyncing?: boolean;
  /** true cuando la sincronización acaba de terminar (para mostrar check breve). */
  justSynced?: boolean;
}

export function OfflineBanner({ syncingCount = 0, isSyncing = false, justSynced = false }: OfflineBannerProps) {
  const isOnline = useOnlineStatus();
  const [pendingCount, setPendingCount] = useState(0);
  const [showSyncedMsg, setShowSyncedMsg] = useState(false);

  // Refrescar contador de pendientes cuando cambia el estado de conexión
  useEffect(() => {
    let mounted = true;
    getPendingCount().then((n) => { if (mounted) setPendingCount(n); });
    return () => { mounted = false; };
  }, [isOnline, isSyncing]);

  // Mostrar mensaje "Sincronizado" por 3 segundos al terminar
  useEffect(() => {
    if (justSynced) {
      setShowSyncedMsg(true);
      const t = setTimeout(() => setShowSyncedMsg(false), 3000);
      return () => clearTimeout(t);
    }
  }, [justSynced]);

  // Sin conexión → banner rojo prominente
  if (!isOnline) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={cn(
          'fixed top-0 left-0 right-0 z-[9998]',
          'flex items-center justify-center gap-2.5 px-4 py-2.5',
          'bg-red-600 text-white text-sm font-medium shadow-lg',
          'animate-in slide-in-from-top duration-300'
        )}
      >
        <WifiOff className="h-4 w-4 flex-shrink-0" />
        <span>
          Sin conexión — modo offline activo.
          {pendingCount > 0 && (
            <span className="ml-1 opacity-90">
              {pendingCount} {pendingCount === 1 ? 'operación pendiente' : 'operaciones pendientes'} de sincronizar.
            </span>
          )}
        </span>
      </div>
    );
  }

  // Sincronizando → banner azul con spinner
  if (isSyncing && syncingCount > 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed top-0 left-0 right-0 z-[9998]',
          'flex items-center justify-center gap-2.5 px-4 py-2.5',
          'bg-nixus text-white text-sm font-medium shadow-lg',
          'animate-in slide-in-from-top duration-300'
        )}
      >
        <RefreshCw className="h-4 w-4 flex-shrink-0 animate-spin" />
        <span>
          Sincronizando {syncingCount} {syncingCount === 1 ? 'operación pendiente' : 'operaciones pendientes'}…
        </span>
      </div>
    );
  }

  // Recién sincronizado → banner verde momentáneo
  if (showSyncedMsg) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed top-0 left-0 right-0 z-[9998]',
          'flex items-center justify-center gap-2.5 px-4 py-2.5',
          'bg-emerald-600 text-white text-sm font-medium shadow-lg',
          'animate-in slide-in-from-top duration-300'
        )}
      >
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        <span>Conexión restaurada — operaciones sincronizadas correctamente.</span>
      </div>
    );
  }

  // Hay pendientes pero ya hay conexión (esperando procesamiento)
  if (pendingCount > 0 && isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed top-0 left-0 right-0 z-[9998]',
          'flex items-center justify-center gap-2.5 px-4 py-2.5',
          'bg-amber-500 text-white text-sm font-medium shadow-lg',
          'animate-in slide-in-from-top duration-300'
        )}
      >
        <CloudUpload className="h-4 w-4 flex-shrink-0" />
        <span>
          Conexión restaurada — enviando {pendingCount} {pendingCount === 1 ? 'notificación pendiente' : 'notificaciones pendientes'}…
        </span>
      </div>
    );
  }

  return null;
}
