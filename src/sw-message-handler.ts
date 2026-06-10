// @ts-nocheck
/**
 * Fragmento de Service Worker personalizado.
 * Compilado e incluido en el sw.js generado por @ducanh2912/next-pwa.
 * (ts-nocheck: este archivo se ejecuta en contexto SW, no DOM)
 *
 * Maneja:
 * 1. SKIP_WAITING — activa la nueva versión del SW cuando el usuario hace clic en "Actualizar".
 * 2. push         — muestra notificación nativa del dispositivo al recibir Web Push.
 * 3. notificationclick — abre la URL del permiso al tocar la notificación.
 */

// ── 1. Actualización controlada del SW ──────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Al activarse la nueva versión, tomar control inmediato de las pestañas ya
// abiertas. Sin esto, el SW recién activado no controla la página actual y el
// evento 'controllerchange' del cliente no se dispara de forma fiable, por lo
// que el botón "Actualizar" parecería no hacer nada.
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// ── 2. Recepción de notificaciones push ─────────────────────────────────────
self.addEventListener('push', (event) => {
  let payload = { title: 'SGTC Móvil', body: 'Tienes una nueva notificación', url: '/', icon: '/icon-192.png', badge: '/icon-96x96.png' };
  try {
    if (event.data) {
      payload = { ...payload, ...event.data.json() };
    }
  } catch (_) { /* datos no JSON → usar defaults */ }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body:    payload.body,
      icon:    payload.icon,
      badge:   payload.badge,
      data:    { url: payload.url },
      vibrate: [200, 100, 200],
    })
  );
});

// ── 3. Clic en la notificación → abrir / enfocar la URL del permiso ──────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
