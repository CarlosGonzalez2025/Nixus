'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, CloudUpload } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { getPendingCount } from '@/lib/offline-queue';
import { cn } from '@/lib/utils';

interface OfflineBannerProps {
  syncingCount?: number;
  isSyncing?: boolean;
  justSynced?: boolean;
}

export function OfflineBanner({ syncingCount = 0, isSyncing = false, justSynced = false }: OfflineBannerProps) {
  const isOnline = useOnlineStatus();
  const [pendingCount, setPendingCount] = useState(0);
  const [showSyncedMsg, setShowSyncedMsg] = useState(false);

  useEffect(() => {
    let mounted = true;
    getPendingCount().then((n) => { if (mounted) setPendingCount(n); });
    return () => { mounted = false; };
  }, [isOnline, isSyncing]);

  useEffect(() => {
    if (justSynced) {
      setShowSyncedMsg(true);
      const t = setTimeout(() => setShowSyncedMsg(false), 3000);
      return () => clearTimeout(t);
    }
  }, [justSynced]);

  const baseClasses = cn(
    'fixed bottom-0 left-0 right-0 z-[9998]',
    'flex items-center justify-center gap-2 px-4 py-1.5',
    'text-white text-xs font-medium shadow-[0_-2px_8px_rgba(0,0,0,0.15)]',
    'animate-in slide-in-from-bottom duration-300'
  );

  // Sin conexión → franja roja en la parte inferior
  if (!isOnline) {
    return (
      <div role="alert" aria-live="assertive" className={cn(baseClasses, 'bg-red-600')}>
        <WifiOff className="h-3.5 w-3.5 flex-shrink-0" />
        <span>
          Sin conexión — modo offline activo
          {pendingCount > 0 && (
            <span className="ml-1 opacity-90 hidden sm:inline">
              · {pendingCount} {pendingCount === 1 ? 'operación pendiente' : 'operaciones pendientes'}
            </span>
          )}
        </span>
      </div>
    );
  }

  // Sincronizando → franja azul con spinner
  if (isSyncing && syncingCount > 0) {
    return (
      <div role="status" aria-live="polite" className={cn(baseClasses, 'bg-nixus')}>
        <RefreshCw className="h-3.5 w-3.5 flex-shrink-0 animate-spin" />
        <span>
          Sincronizando {syncingCount} {syncingCount === 1 ? 'operación' : 'operaciones'}…
        </span>
      </div>
    );
  }

  // Recién sincronizado → franja verde momentánea
  if (showSyncedMsg) {
    return (
      <div role="status" aria-live="polite" className={cn(baseClasses, 'bg-emerald-600')}>
        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
        <span>Conexión restaurada — todo sincronizado</span>
      </div>
    );
  }

  // Hay pendientes y ya hay conexión
  if (pendingCount > 0 && isOnline) {
    return (
      <div role="status" aria-live="polite" className={cn(baseClasses, 'bg-amber-500')}>
        <CloudUpload className="h-3.5 w-3.5 flex-shrink-0" />
        <span>
          Enviando {pendingCount} {pendingCount === 1 ? 'notificación pendiente' : 'notificaciones pendientes'}…
        </span>
      </div>
    );
  }

  return null;
}
