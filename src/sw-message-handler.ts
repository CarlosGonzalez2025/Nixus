/**
 * Fragmento de Service Worker personalizado.
 * Este archivo es compilado e incluido en el sw.js generado por @ducanh2912/next-pwa.
 *
 * Propósito: escuchar el mensaje SKIP_WAITING que envía PWAUpdater cuando el
 * usuario hace clic en "Actualizar". Sin este listener el botón no hace nada.
 */
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
