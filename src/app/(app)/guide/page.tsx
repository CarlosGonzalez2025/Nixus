'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Siren,
  ChevronRight,
  UserCheck,
  CalendarCheck2,
  FileCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  step: string;
  title: string;
  role: string;
  description: string;
  icon: React.ElementType;
  badgeText?: string;
  badgeColor?: string;
  isLast?: boolean;
}) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Icon className="h-6 w-6" />
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-border" style={{ minHeight: '4rem' }} />
        )}
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-semibold text-primary">Paso {step}</p>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground mb-2">{role}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        {badgeText && badgeColor && (
          <div className="mt-3">
            <Badge className={badgeColor}>
              Estado del Permiso: {badgeText}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

const SignatureFlowItem = ({
  role,
  condition,
  icon,
}: {
  role: string;
  condition: string;
  icon: React.ElementType;
}) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-3 bg-primary/10 rounded-full mb-2">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <p className="font-semibold text-sm">{role}</p>
      <p className="text-xs text-muted-foreground mt-1">{condition}</p>
    </div>
  );
};

export default function GuidePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 bg-gray-50/50">
      <div className="flex items-center gap-4">
        <Image
          src="https://i.postimg.cc/RZ16KqFY/Whats-App-Image-2026_02_05_at_10_19_08.jpg"
          alt="Guide Icon"
          width={56}
          height={56}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guía de Flujo de Trabajo</h1>
          <p className="text-muted-foreground">
            Entienda el ciclo de vida completo de un Permiso de Trabajo de Alto Riesgo.
          </p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ciclo de Vida de un Permiso de Trabajo</CardTitle>
          <CardDescription>Desde la creación hasta el cierre final, cada paso es crucial para la seguridad.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <FlowStep
            step="1"
            title="Creación y Solicitud del Permiso"
            role="Rol: Ejecutante del trabajo / Líder del equipo Ejecutante"
            description="El proceso inicia cuando un usuario completa el formulario de 'Nuevo Permiso'. Se debe llenar la información general, seleccionar los tipos de trabajo (lo que activará los anexos correspondientes), y diligenciar el ATS y las listas de verificación. Al guardar, el permiso queda en estado 'Borrador'."
            icon={FilePlus}
            badgeText="Borrador"
            badgeColor="bg-gray-100 text-gray-800"
          />

          <FlowStep
            step="2"
            title="Flujo de Firmas de Apertura (Secuencial)"
            role="Roles: Ejecutante, Coordinador Alturas, Autorizante, Mantenimiento, SST"
            description="Una vez creado el borrador, comienza el proceso de firmas. Este flujo es secuencial y condicional, lo que significa que ciertos roles deben firmar antes que otros. Al firmar, el Ejecutante del trabajo envía formalmente el permiso a revisión."
            icon={FileSignature}
            badgeText="Pendiente de Revisión"
            badgeColor="bg-yellow-100 text-yellow-800"
          />

          <Card className="bg-muted/30 border-primary/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    Orden de Firmas de Apertura
                </CardTitle>
                <CardDescription>Las firmas deben obtenerse en el siguiente orden para poder aprobar el permiso.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-stretch justify-around gap-4 text-center">
                <SignatureFlowItem role="Ejecutante del trabajo / Líder del equipo Ejecutante" condition="Siempre requerido" icon={UserCheck} />
                <ChevronRight className="h-6 w-6 text-gray-300 self-center hidden md:block" />
                <SignatureFlowItem role="Coordinador Alturas" condition="Si aplica" icon={UserCheck} />
                <ChevronRight className="h-6 w-6 text-gray-300 self-center hidden md:block" />
                <SignatureFlowItem role="Líder SST / Mantenimiento" condition="Si aplican" icon={UserCheck} />
                <ChevronRight className="h-6 w-6 text-gray-300 self-center hidden md:block" />
                <SignatureFlowItem role="Autorizante" condition="Siempre requerido" icon={UserCheck} />
              </div>
               <p className="text-xs text-muted-foreground mt-4 text-center">
                 El sistema habilita el botón de firma para cada rol solo cuando se cumple la secuencia.
              </p>
            </CardContent>
          </Card>
          
          <FlowStep
            step="3"
            title="Aprobación o Rechazo del Permiso"
            role="Rol: Autorizante"
            description="Una vez que TODAS las firmas requeridas (según los anexos seleccionados) han sido recolectadas, el 'Autorizante' tendrá la opción de 'Aprobar' el permiso. Si en cualquier punto del proceso de revisión se detecta un problema, puede 'Rechazarlo', dejando un comentario."
            icon={FileCheck}
          />
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 md:pl-16">
              <div className="flex items-start gap-3 rounded-lg border bg-green-50 p-4 border-green-200">
                <CheckCircle className="h-8 w-8 text-green-500 mt-1" />
                <div>
                  <h5 className="font-bold">Permiso Aprobado</h5>
                  <p className="text-xs text-muted-foreground">El permiso está listo para que el trabajo comience. El Ejecutante del trabajo es Notificado.</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Estado: Aprobado</Badge>
                </div>
              </div>
               <div className="flex items-start gap-3 rounded-lg border bg-red-50 p-4 border-red-200">
                <FileX className="h-8 w-8 text-red-500 mt-1" />
                <div>
                  <h5 className="font-bold">Permiso Rechazado</h5>
                  <p className="text-xs text-muted-foreground">El permiso se cancela y no puede ser ejecutado. El Ejecutante del trabajoe es notificado.</p>
                   <Badge className="mt-2 bg-red-100 text-red-800">Estado: Rechazado</Badge>
                </div>
              </div>
            </div>

          <FlowStep
            step="4"
            title="Inicio y Ejecución del Trabajo"
            role="Rol: Líder de Tarea / Ejecutante del trabajo"
            description="Con el permiso en estado 'Aprobado', el líder a cargo presiona 'Iniciar Ejecución' justo antes de comenzar las labores en el sitio. Esto indica que el trabajo está activo."
            icon={PlayCircle}
            badgeText="En Ejecución"
            badgeColor="bg-purple-100 text-purple-800"
          />

          <FlowStep
            step="5"
            title="Validación y Cierre Diario"
            role="Rol: Líder de Tarea / Autorizante"
            description="Para permisos que duran más de un día, es OBLIGATORIO realizar la validación diaria en cada anexo aplicable. Tanto el Responsable del Trabajo como la Autoridad del Área deben firmar al inicio y al final de cada jornada."
            icon={CalendarCheck2}
            badgeText="En Ejecución"
            badgeColor="bg-purple-100 text-purple-800"
          />
          
           <FlowStep
            step="6"
            title="Suspensión del Permiso (Opcional)"
            role="Rol: Líder SST"
            description="Si durante la ejecución se detecta una condición de riesgo inminente, un Líder SST puede 'Suspender' el permiso. El trabajo se detiene hasta que se corrijan las condiciones y se reactive el permiso."
            icon={PauseCircle}
            badgeText="Suspendido"
            badgeColor="bg-orange-100 text-orange-800"
          />

          <FlowStep
            step="7"
            title="Cierre Final del Permiso"
            role="Rol: Líder de Tarea"
            description="Una vez finalizado todo el trabajo y asegurado que el área está en condiciones seguras, se procede con el 'Cierre de Permiso'. Este paso requiere las firmas de cierre del Responsable y la Autoridad del Área."
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
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Al momento de crear un nuevo permiso de trabajo, el sistema enviará automáticamente una notificación por WhatsApp a los supervisores configurados para agilizar la revisión.
          </p>
          <Button asChild variant="outline">
            <Link href="/settings/whatsapp">
              Configurar Mis Notificaciones
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Siren className="h-6 w-6" />
            Cierre de Emergencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            En situaciones excepcionales donde se necesite cerrar un permiso de forma inmediata (aún si faltan firmas de cierre diario o de trabajadores), cualquier usuario autorizado puede usar el botón de "Cierre de Emergencia". El sistema le informará de las tareas pendientes y le exigirá una justificación y una firma para registrar esta acción excepcional.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}