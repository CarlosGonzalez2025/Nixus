'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  CheckCircle,
  FilePlus,
  FileSignature,
  FileX,
  PlayCircle,
  PauseCircle,
  Lock,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';

const FlowStep = ({
  step,
  title,
  role,
  description,
  icon,
  badgeText,
  badgeColor,
  isLast = false,
}: {
  step: number;
  title: string;
  role: string;
  description: string;
  icon: React.ElementType;
  badgeText: string;
  badgeColor: string;
  isLast?: boolean;
}) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-border" style={{ minHeight: '4rem' }} />
        )}
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-semibold text-primary">Paso {step}</p>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground mb-2">{role}</p>
        <p className="text-sm mb-3">{description}</p>
        <Badge className={badgeColor}>
          Estado del Permiso: {badgeText}
        </Badge>
      </div>
    </div>
  );
};

export default function GuidePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Image
          src="https://i.postimg.cc/jShP2K6k/Whats-App-Image-2025-10-20-at-10-43-48-AM.jpg"
          alt="Guide Icon"
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guía de Flujo de Trabajo</h1>
          <p className="text-muted-foreground">
            Entienda el ciclo de vida de un Permiso de Trabajo, paso a paso.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ciclo de Vida de un Permiso de Trabajo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <FlowStep
            step={1}
            title="Creación del Permiso"
            role="Rol: Solicitante / Líder de Tarea"
            description="El usuario completa el formulario de 'Nuevo Permiso' con toda la información requerida (riesgos, EPP, trabajadores, etc.). Al enviarlo, el permiso se crea y se notifica a los aprobadores."
            icon={FilePlus}
            badgeText="Pendiente de Revisión"
            badgeColor="bg-yellow-100 text-yellow-800"
          />

          <FlowStep
            step={2}
            title="Proceso de Aprobación (Firmas)"
            role="Rol: Solicitante / Autorizante / Mantenimiento / SST"
            description="Los responsables (Solicitante, Autorizante, etc.) deben ingresar al detalle del permiso y firmar digitalmente en la sección de 'Autorizaciones' para validar el permiso."
            icon={FileSignature}
            badgeText="Pendiente de Revisión"
            badgeColor="bg-yellow-100 text-yellow-800"
          />

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-center mb-4">Posibles Decisiones del Aprobador</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <h5 className="font-bold">Aprobación del Permiso</h5>
                    <p className="text-xs text-muted-foreground">
                      Una vez que todas las firmas requeridas son obtenidas, un usuario con rol 'Autorizante' o 'Admin' presiona el botón 'Aprobar'.
                    </p>
                    <p className="text-xs font-bold mt-2">
                        Nuevo Estado: <span className="text-green-600">Aprobado</span>
                    </p>
                  </div>
                </div>
                 <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                  <FileX className="h-8 w-8 text-red-500" />
                  <div>
                    <h5 className="font-bold">Rechazo del Permiso</h5>
                    <p className="text-xs text-muted-foreground">
                     Si el permiso no es seguro o está incompleto, un aprobador puede 'Rechazarlo', dejando un comentario con el motivo.
                    </p>
                     <p className="text-xs font-bold mt-2">
                        Nuevo Estado: <span className="text-red-600">Rechazado</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <FlowStep
            step={3}
            title="Inicio del Trabajo"
            role="Rol: Líder de Tarea / Admin"
            description="Con el permiso ya 'Aprobado', el líder de la tarea presiona 'Iniciar Ejecución' justo antes de comenzar las labores en el sitio."
            icon={PlayCircle}
            badgeText="En Ejecución"
            badgeColor="bg-purple-100 text-purple-800"
          />

           <FlowStep
            step={4}
            title="Suspensión (Opcional)"
            role="Rol: Líder SST / Admin"
            description="Si durante la ejecución se detecta una condición insegura, el Líder SST o un Admin pueden 'Suspender' el permiso temporalmente hasta que se corrijan las condiciones."
            icon={PauseCircle}
            badgeText="Suspendido"
            badgeColor="bg-orange-100 text-orange-800"
          />

          <FlowStep
            step={5}
            title="Cierre del Permiso"
            role="Rol: Líder de Tarea / Admin"
            description="Una vez finalizado el trabajo y asegurado el área, el líder de la tarea o un Admin deben presionar 'Cerrar Permiso'. Los responsables también deben añadir su firma de cierre."
            icon={Lock}
            badgeText="Cerrado"
            badgeColor="bg-blue-100 text-blue-800"
            isLast={true}
          />

        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-green-600" />
            Notificaciones por WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Al momento de crear un nuevo permiso de trabajo, el sistema enviará automáticamente una notificación por WhatsApp a los supervisores o aprobadores configurados. Para recibir estas notificaciones, asegúrate de haber configurado tu número en la sección <span className="font-bold text-primary">Notificaciones WhatsApp</span> en tu perfil de usuario.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
