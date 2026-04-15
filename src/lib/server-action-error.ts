/**
 * Detecta si un error es causado por un Server Action no encontrado en el servidor.
 * Esto ocurre cuando el cliente tiene cacheado un bundle JS antiguo (vía Service Worker)
 * y el servidor ya tiene una versión nueva con IDs de acciones diferentes.
 *
 * Cuando se detecta, se activa el Service Worker nuevo automáticamente y se recarga.
 */
export function isStaleServerActionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes('was not found on the server') ||
    error.message.includes('failed-to-find-server-action') ||
    error.message.includes('Server Action') && error.message.includes('not found')
  );
}

/**
 * Si el error es de Server Action desincronizado, fuerza la actualización del SW
 * y recarga la página. Retorna `true` si manejó el error, `false` si no aplica.
 */
export function handleStaleServerActionError(error: unknown): boolean {
  if (!isStaleServerActionError(error)) return false;

  console.warn('[SW] Server Action desincronizado detectado — activando actualización...');

  if (typeof window !== 'undefined') {
    const forceUpdate = (window as any).__swForceUpdate;
    if (typeof forceUpdate === 'function') {
      forceUpdate();
      // El reload ocurrirá automáticamente cuando el controllerchange dispare
    } else {
      // Sin SW disponible: recargar directamente
      window.location.reload();
    }
  }

  return true;
}
