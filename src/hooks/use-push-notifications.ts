'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';

type PushState = 'unsupported' | 'default' | 'granted' | 'denied' | 'loading';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export function usePushNotifications() {
  const { user } = useUser();
  const [state, setState] = useState<PushState>('loading');

  // Detectar soporte y estado actual al montar
  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('unsupported');
      return;
    }
    setState(Notification.permission as PushState);
  }, []);

  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!user?.uid) return false;
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) { console.error('[Push] VAPID public key no configurada'); return false; }

    setState('loading');
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState('denied');
        return false;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, subscription: subscription.toJSON() }),
      });

      setState('granted');
      return true;
    } catch (err) {
      console.error('[Push] Error al suscribirse:', err);
      setState(Notification.permission as PushState);
      return false;
    }
  }, [user?.uid]);

  const unsubscribe = useCallback(async (): Promise<void> => {
    if (!user?.uid) return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;

      await fetch('/api/push/subscribe', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, endpoint: subscription.endpoint }),
      });
      await subscription.unsubscribe();
      setState('default');
    } catch (err) {
      console.error('[Push] Error al desuscribirse:', err);
    }
  }, [user?.uid]);

  return { state, subscribe, unsubscribe };
}
