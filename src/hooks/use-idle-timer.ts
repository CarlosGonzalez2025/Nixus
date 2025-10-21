import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface UseIdleTimerOptions {
  timeout?: number; // en milisegundos
  onIdle?: () => void;
  onActive?: () => void;
  events?: string[];
  debounce?: number;
  disabled?: boolean;
}

export function useIdleTimer({
  timeout = 30 * 60 * 1000, // 30 minutos por defecto
  onIdle,
  onActive,
  events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'keydown'
  ],
  debounce = 500,
  disabled = false
}: UseIdleTimerOptions = {}) {
  const { logout } = useAuth();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const debounceRef = useRef<NodeJS.Timeout>();
  const isIdleRef = useRef(false);

  const reset = useCallback(() => {
    if (disabled) return;

    // Limpiar timeouts existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Si estaba inactivo, marcar como activo
    if (isIdleRef.current) {
      isIdleRef.current = false;
      onActive?.();
    }

    // Configurar nuevo timeout para inactividad
    timeoutRef.current = setTimeout(() => {
      isIdleRef.current = true;
      onIdle?.();
      
      // Auto logout después de inactividad
      logout();
      router.push('/login?reason=timeout');
    }, timeout);
  }, [disabled, timeout, onIdle, onActive, logout, router]);

  const handleEvent = useCallback(() => {
    if (disabled) return;

    // Debounce para evitar demasiadas llamadas
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      reset();
    }, debounce);
  }, [disabled, debounce, reset]);

  useEffect(() => {
    if (disabled) return;

    // Inicializar timer
    reset();

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, handleEvent, true);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      events.forEach(event => {
        document.removeEventListener(event, handleEvent, true);
      });
    };
  }, [disabled, reset, handleEvent, events]);

  const getRemainingTime = useCallback(() => {
    if (!timeoutRef.current) return 0;
    return timeout; // En una implementación completa, calcularías el tiempo restante
  }, [timeout]);

  const isIdle = () => isIdleRef.current;

  return {
    reset,
    getRemainingTime,
    isIdle
  };
}