'use client';

import { useEffect } from 'react';

// Desregistra cualquier Service Worker activo en modo desarrollo.
// En producción este componente no hace nada (process.env es evaluado en build time).
export function SwDevCleanup() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }, []);

  return null;
}
