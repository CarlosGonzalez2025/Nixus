'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/use-push-notifications';

const DISMISSED_KEY = 'push_prompt_dismissed';

/**
 * Banner compacto que aparece una sola vez (hasta que el usuario lo descarta o acepta)
 * para solicitar permiso de notificaciones push nativas del dispositivo.
 *
 * Se oculta si:
 * - El navegador no soporta Push
 * - El permiso ya fue concedido o denegado previamente
 * - El usuario hace clic en "Ahora no" (se persiste en localStorage)
 */
export function PushNotificationPrompt() {
  const { state, subscribe } = usePushNotifications();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state === 'default' && localStorage.getItem(DISMISSED_KEY) !== '1') {
      // Mostrar el banner 3 segundos después de cargar para no ser intrusivo
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const handleAccept = async () => {
    setVisible(false);
    await subscribe();
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Activar notificaciones"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9997] w-[calc(100%-2rem)] max-w-sm
                 bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-xl
                 flex items-start gap-3 p-4 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex-shrink-0 mt-0.5 rounded-full bg-nixus/10 p-2">
        <Bell className="h-5 w-5 text-nixus" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">Activar notificaciones</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Recibe alertas de permisos en tu dispositivo, igual que mensajes o correos.
        </p>
        <div className="flex gap-2 mt-3">
          <Button size="sm" className="h-8 text-xs" onClick={handleAccept}>
            Activar
          </Button>
          <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={handleDismiss}>
            Ahora no
          </Button>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Cerrar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
