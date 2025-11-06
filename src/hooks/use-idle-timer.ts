
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface UseIdleTimerOptions {
  timeout?: number;
  promptBeforeIdle?: number;
  onIdle?: () => void;
  onActive?: () => void;
  onPrompt?: () => void;
  events?: (keyof DocumentEventMap)[];
  debounce?: number;
  disabled?: boolean;
}

export function useIdleTimer({
  timeout = 30 * 60 * 1000,
  promptBeforeIdle = 0,
  onIdle,
  onActive,
  onPrompt,
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
  
  const idleTimeout = useRef<NodeJS.Timeout>();
  const promptTimeout = useRef<NodeJS.Timeout>();
  const eventDebounce = useRef<NodeJS.Timeout>();
  
  const isIdleRef = useRef(false);
  const isPromptedRef = useRef(false);

  const handleIdle = () => {
    isIdleRef.current = true;
    isPromptedRef.current = false;
    onIdle?.();
    logout();
    router.push('/login?reason=timeout');
  };

  const handlePrompt = () => {
    isPromptedRef.current = true;
    onPrompt?.();
  };

  const reset = useCallback(() => {
    if (disabled) return;
    
    // Clear existing timers
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    if (promptTimeout.current) clearTimeout(promptTimeout.current);

    // If was idle or prompted, call onActive
    if (isIdleRef.current || isPromptedRef.current) {
      onActive?.();
    }

    isIdleRef.current = false;
    isPromptedRef.current = false;

    // Set new timers
    idleTimeout.current = setTimeout(handleIdle, timeout);
    if (promptBeforeIdle > 0) {
      promptTimeout.current = setTimeout(handlePrompt, timeout - promptBeforeIdle);
    }
  }, [disabled, timeout, promptBeforeIdle, onActive]);


  const handleEvent = useCallback(() => {
    if (disabled) return;

    if (eventDebounce.current) {
      clearTimeout(eventDebounce.current);
    }

    eventDebounce.current = setTimeout(() => {
      reset();
    }, debounce);
  }, [disabled, debounce, reset]);

  useEffect(() => {
    if (disabled) {
      // Clean up if disabled
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (promptTimeout.current) clearTimeout(promptTimeout.current);
      if (eventDebounce.current) clearTimeout(eventDebounce.current);
      return;
    }

    reset();

    events.forEach(event => {
      document.addEventListener(event, handleEvent, { capture: true });
    });

    return () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (promptTimeout.current) clearTimeout(promptTimeout.current);
      if (eventDebounce.current) clearTimeout(eventDebounce.current);

      events.forEach(event => {
        document.removeEventListener(event, handleEvent, { capture: true });
      });
    };
  }, [disabled, reset, handleEvent, events]);

  const getRemainingTime = useCallback(() => {
    // This would require a more complex implementation to be accurate
    return 0;
  }, []);

  const isIdle = () => isIdleRef.current;

  return {
    reset,
    getRemainingTime,
    isIdle
  };
}
