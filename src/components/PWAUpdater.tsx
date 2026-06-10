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
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pointer-events-none animate-in slide-in-from-bottom-4 fade-in duration-300 sm:inset-x-auto sm:right-4 sm:justify-end"
    >
      <div className="pointer-events-auto bg-nixus text-nixus-foreground rounded-xl shadow-2xl ring-2 ring-white/30 p-4 flex items-center gap-4 w-full max-w-md sm:max-w-sm">
        <div className="flex-shrink-0 bg-white/20 rounded-full p-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base leading-tight">Nueva versión disponible</p>
          <p className="text-sm opacity-90 mt-0.5">
            Actualiza para obtener las últimas mejoras
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-stretch gap-2 flex-shrink-0">
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="text-nixus-foreground hover:bg-white/20 px-2"
            aria-label="Descartar"
          >
            <X className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleUpdate}
            size="sm"
            className="bg-white text-nixus font-bold hover:bg-white/90 shadow-md px-4"
          >
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}
