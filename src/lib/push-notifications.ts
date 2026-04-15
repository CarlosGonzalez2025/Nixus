import webpush from 'web-push';
import { adminDb } from '@/lib/firebase-admin';

let vapidConfigured = false;

function ensureVapidConfigured() {
  if (vapidConfigured) return;
  const publicKey  = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject    = process.env.VAPID_SUBJECT || 'mailto:nixus@sistedigital.net';
  if (!publicKey || !privateKey) {
    console.warn('[Push] Claves VAPID no configuradas — notificaciones push desactivadas');
    return;
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  icon?: string;
}

/**
 * Envía una notificación Web Push a todos los dispositivos suscritos del usuario.
 * Elimina automáticamente suscripciones expiradas o inválidas.
 */
export async function sendPushToUser(userId: string, payload: PushPayload): Promise<void> {
  ensureVapidConfigured();
  if (!vapidConfigured) return;

  const snap = await adminDb
    .collection('push_subscriptions')
    .where('userId', '==', userId)
    .get();

  if (snap.empty) return;

  const data = JSON.stringify({
    title: payload.title,
    body:  payload.body,
    url:   payload.url  || '/',
    icon:  payload.icon || '/icon-192.png',
    badge: '/icon-96x96.png',
  });

  const sends = snap.docs.map(async (docSnap) => {
    const { subscription } = docSnap.data();
    try {
      await webpush.sendNotification(subscription as webpush.PushSubscription, data);
    } catch (err: any) {
      // 410 Gone o 404 = suscripción caducada → borrar
      if (err.statusCode === 410 || err.statusCode === 404) {
        await docSnap.ref.delete();
      } else {
        console.error(`[Push] Error enviando a ${docSnap.id}:`, err.message);
      }
    }
  });

  await Promise.allSettled(sends);
}
