'use client';

import { useState, useEffect } from 'react';

/**
 * Detecta en tiempo real si el dispositivo tiene conexión a internet.
 * Escucha los eventos nativos 'online' y 'offline' del navegador.
 * En SSR retorna true por defecto (el servidor siempre tiene conexión).
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Sincronizar en caso de que el estado cambiara antes de montar
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
