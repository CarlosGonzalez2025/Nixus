'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

export function PWAUpdater() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        // Verificar actualizaciones cada hora
        const interval = setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Detectar nuevo service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // Nueva versión disponible
              setWaitingWorker(newWorker);
              setShowUpdate(true);
            }
          });
        });

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    };

    registerServiceWorker();

    // Recargar cuando se active nueva versión
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-in slide-in-from-bottom">
      <div className="bg-nixus text-white rounded-lg shadow-2xl p-4 flex items-center gap-3 max-w-sm">
        <div className="flex-shrink-0">
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Nueva versión disponible</p>
          <p className="text-xs opacity-90">
            Actualiza para obtener las últimas mejoras
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleUpdate}
            size="sm"
            variant="secondary"
            className="text-xs"
          >
            Actualizar
          </Button>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
