'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

export function PWAUpdater() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  // Solo recargar en controllerchange si fue el usuario quien pidió la actualización.
  // Sin esta guardia, la primera activación del SW (sin SW previo) causaría un
  // reload automático inesperado.
  const userConsentedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const handleControllerChange = () => {
      if (userConsentedRef.current) {
        window.location.reload();
      }
    };

    const attachWaitingWorkerListeners = (registration: ServiceWorkerRegistration) => {
      // Si ya hay un SW esperando al montar, mostrarlo de inmediato
      if (registration.waiting && navigator.serviceWorker.controller) {
        setWaitingWorker(registration.waiting);
        setShowUpdate(true);
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
            setShowUpdate(true);
          }
        });
      });
    };

    const initServiceWorker = async () => {
      try {
        // next-pwa (register: true) ya maneja el registro del SW automáticamente
        // vía el script swe-worker inyectado. Usamos ready para obtener el
        // registro existente en lugar de crear uno duplicado.
        const registration = await navigator.serviceWorker.ready;

        attachWaitingWorkerListeners(registration);

        // Chequear actualizaciones cada 30 minutos
        intervalId = setInterval(() => {
          registration.update();
        }, 30 * 60 * 1000);

        // Chequear al recuperar visibilidad (el usuario vuelve a la pestaña/app)
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            registration.update();
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Exponer función global para forzar activación desde otros módulos
        // (usada cuando un Server Action falla por desincronización de versiones)
        (window as any).__swForceUpdate = () => {
          const waiting = registration.waiting;
          if (waiting) {
            userConsentedRef.current = true;
            waiting.postMessage({ type: 'SKIP_WAITING' });
          } else {
            registration.update();
          }
        };

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      } catch (error) {
        console.error('Error al obtener el registro del Service Worker:', error);
      }
    };

    initServiceWorker();

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      if (intervalId !== null) clearInterval(intervalId);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      delete (window as any).__swForceUpdate;
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      userConsentedRef.current = true;
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
