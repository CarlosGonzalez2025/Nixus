
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppSetupPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('join adjective-thrown');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/14155238886?text=join%20adjective-thrown', '_blank');
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notificaciones WhatsApp</h1>
          <p className="text-muted-foreground">
            Configure su dispositivo para recibir alertas.
          </p>
        </div>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-green-600" />
            Configurar Notificaciones de WhatsApp
          </CardTitle>
          <CardDescription>
            Siga estos pasos para activar las notificaciones de nuevos permisos de trabajo en su dispositivo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Paso 1 */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                1
              </span>
              Abra WhatsApp en su teléfono
            </h3>
            <p className="text-sm text-muted-foreground ml-8">
              Inicie un nuevo chat con el número de Twilio Sandbox.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                2
              </span>
              Envíe el código de activación
            </h3>
            <div className="ml-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                Copie el siguiente código y envíelo como un mensaje al número de Twilio:
              </p>
              <div className="flex gap-2">
                <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">
                  join adjective-thrown
                </code>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    'Copiar'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                El número de destino es: <strong>+1 415 523 8886</strong>
              </p>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                3
              </span>
              Reciba la confirmación
            </h3>
            <p className="text-sm text-muted-foreground ml-8">
              Si el código es correcto, recibirá un mensaje de confirmación de Twilio en menos de 5 segundos.
            </p>
          </div>

          {/* Botón directo */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleOpenWhatsApp}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Activar con un clic
          </Button>

          {/* Advertencia */}
          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium text-amber-900">
                Nota importante
              </p>
              <p className="text-amber-800">
                La conexión con el Sandbox de Twilio expira cada 72 horas. Si deja de recibir 
                notificaciones, simplemente debe enviar el mensaje de activación nuevamente para reconectar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
