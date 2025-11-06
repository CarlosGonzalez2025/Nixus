
'use client';
import { useState, useEffect } from 'react';
import { useIdleTimer } from '@/hooks/use-idle-timer';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle } from 'lucide-react';

interface IdleTimerProviderProps {
  children: React.ReactNode;
  timeout?: number; // en minutos
  warningTime?: number; // en minutos antes del timeout
}

export function IdleTimerProvider({ 
  children, 
  timeout = 30, // 30 minutos por defecto
  warningTime = 5 // 5 minutos de advertencia
}: IdleTimerProviderProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(warningTime * 60); // en segundos

  const timeoutMs = timeout * 60 * 1000;
  const warningTimeMs = warningTime * 60 * 1000;

  const { reset, isIdle, getRemainingTime } = useIdleTimer({
    timeout: timeoutMs,
    promptBeforeIdle: warningTimeMs,
    disabled: !user,
    onIdle: () => {
      console.log('User is idle, logging out.');
    },
    onActive: () => {
      setShowWarning(false);
      setCountdown(warningTime * 60);
      console.log('User is active again.');
    },
    onPrompt: () => {
      setShowWarning(true);
      toast({
        title: "Sesión por expirar",
        description: `Tu sesión expirará en ${warningTime} minutos por inactividad.`,
        duration: 5000,
      });
      setCountdown(warningTime * 60);
    }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (showWarning && user) {
      interval = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showWarning, user]);


  const handleContinueSession = () => {
    setShowWarning(false);
    reset(); 
    
    toast({
      title: "Sesión extendida",
      description: "Tu sesión ha sido extendida exitosamente.",
      duration: 3000,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {children}
      
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Sesión por Expirar
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <div>
                  Tu sesión expirará automáticamente por inactividad.
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Tiempo restante: {formatTime(countdown)}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  Haz clic en "Continuar Sesión" para mantener tu sesión activa.
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogAction
              onClick={handleContinueSession}
              style={{ backgroundColor: 'hsl(188, 75%, 43%)', color: 'white' }}
              className="hover:opacity-90"
            >
              Continuar Sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
