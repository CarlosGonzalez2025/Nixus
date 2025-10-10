
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/lib/errors';
import {
  Loader2,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  Shield,
  Users,
  Signature,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  ListChecks,
  Siren,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import { format } from 'date-fns';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  pendiente_revision: 'secondary',
  aprobado: 'default',
  rechazado: 'destructive',
  cerrado: 'outline',
  en_ejecucion: 'default',
};

const getStatusInfo = (status: string): { text: string; icon: React.ElementType; color: string } => {
  const statusInfo: { [key: string]: { text: string; icon: React.ElementType; color: string } } = {
    borrador: { text: 'Borrador', icon: Clock, color: 'text-gray-500' },
    pendiente_revision: { text: 'Pendiente de Revisión', icon: Clock, color: 'text-yellow-500' },
    aprobado: { text: 'Aprobado', icon: CheckCircle, color: 'text-green-500' },
    en_ejecucion: { text: 'En Ejecución', icon: AlertTriangle, color: 'text-purple-500' },
    suspendido: { text: 'Suspendido', icon: XCircle, color: 'text-orange-500' },
    cerrado: { text: 'Cerrado', icon: CheckCircle, color: 'text-blue-500' },
    rechazado: { text: 'Rechazado', icon: XCircle, color: 'text-red-500' },
  };
  return statusInfo[status] || { text: status, icon: FileText, color: 'text-gray-500' };
};

const workTypes: { [key: string]: {name: string, icon: string} } = {
  altura: { name: 'Trabajo en Alturas', icon: '⬆️' },
  confinado: { name: 'Espacios Confinados', icon: '📦' },
  energia: { name: 'Control de Energías', icon: '⚡' },
  izaje: { name: 'Izaje de Cargas', icon: '🏗️' },
  caliente: { name: 'Trabajo en Caliente', icon: '🔥' },
  excavacion: { name: 'Excavaciones', icon: '⛏️' }
};

export default function PermitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [permit, setPermit] = useState<Permit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!permitId) {
      setError('ID de permiso no válido.');
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'permits', permitId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPermit({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
        } as Permit);
        setError(null);
      } else {
        setError('No se encontró el permiso de trabajo.');
        setPermit(null);
      }
      setLoading(false);
    }, (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'get',
      } satisfies SecurityRuleContext);
      
      errorEmitter.emit('permission-error', permissionError);
      setError('No tiene permisos para ver este documento.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [permitId]);
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  if (loading || userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Cargando detalles del permiso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center">
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error al Cargar el Permiso</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>
    );
  }

  if (!permit) {
    return null; // Should be covered by error state
  }

  const statusInfo = getStatusInfo(permit.status);

  return (
    <div className="flex flex-1 flex-col bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push('/permits')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al listado
          </Button>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                      <p className="text-sm font-medium text-primary">Permiso de Trabajo #{permit.id.substring(0, 8)}</p>
                      <CardTitle className="text-3xl mt-1">{workTypes[permit.workType]?.name || permit.workType}</CardTitle>
                      <CardDescription className="mt-2">
                        Creado el {permit.createdAt ? format(new Date(permit.createdAt), "dd/MM/yyyy 'a las' HH:mm") : 'N/A'}
                      </CardDescription>
                  </div>
                  <div className="flex-shrink-0">
                      <Badge className={`px-4 py-2 text-base ${statusInfo.color} bg-opacity-10`} variant={statusVariant[permit.status]}>
                          <statusInfo.icon className="mr-2 h-5 w-5" />
                          {statusInfo.text}
                      </Badge>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground font-semibold">Vigencia Desde</p>
                        <p>{permit.generalInfo?.validFrom ? format(new Date(permit.generalInfo.validFrom), "dd/MM/yyyy HH:mm") : 'No especificado'}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground font-semibold">Vigencia Hasta</p>
                        <p>{permit.generalInfo?.validUntil ? format(new Date(permit.generalInfo.validUntil), "dd/MM/yyyy HH:mm") : 'No especificado'}</p>
                    </div>
                     <div className="col-span-2">
                        <p className="text-muted-foreground font-semibold">Área de Trabajo</p>
                        <p>{permit.generalInfo?.workArea || 'No especificado'}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']} className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-none">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    Información General
                  </div>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent className="p-6 pt-0">
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-muted-foreground">Descripción del Trabajo</h4>
                        <p className="text-sm">{permit.generalInfo?.workDescription || 'No especificado'}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-muted-foreground">Procedimiento Paso a Paso</h4>
                        <p className="text-sm whitespace-pre-wrap">{permit.generalInfo?.procedure || 'No especificado'}</p>
                    </div>
                 </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-primary" />
                        Peligros y Controles
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                  {permit.hazards && Object.keys(permit.hazards).length > 0 ? (
                    <ul className="space-y-3">
                      {Object.entries(permit.hazards).map(([name, data]: [string, any]) => (
                        <li key={name} className="p-3 border rounded-md bg-gray-50">
                          <p className="font-semibold">{name}</p>
                          <p className="text-xs mt-1"><strong>Estado:</strong> <Badge variant={data.status === 'si' ? 'default' : data.status === 'no' ? 'destructive' : 'secondary'}>{data.status || 'N/A'}</Badge></p>
                          <p className="text-sm text-muted-foreground mt-2"><strong>Control:</strong> {data.controls || 'No especificado'}</p>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-muted-foreground">No se especificaron peligros.</p>}
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <ListChecks className="h-6 w-6 text-primary" />
                        Anexos y Listas de Verificación
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                  {permit.annexes && permit.annexes.length > 0 ? (
                     <div className="flex flex-wrap gap-3">
                        {permit.annexes.map((annexId: string) => {
                             const type = workTypes[annexId];
                             if (!type) return null;
                             return (
                               <Badge key={annexId} className="px-4 py-2 text-sm">
                                   <span className="mr-2">{type.icon}</span>
                                   {type.name}
                               </Badge>
                             );
                        })}
                     </div>
                  ) : <p className="text-muted-foreground">No se seleccionaron anexos.</p>}
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-primary" />
                        Equipos de Protección Personal (EPP)
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                   {permit.ppe && Object.keys(permit.ppe).length > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(permit.ppe).filter(([, data]: [string, any]) => data.required).map(([name, data]: [string, any]) => (
                        <li key={name} className="p-3 border rounded-md bg-gray-50 flex justify-between items-center">
                          <p className="font-semibold">{name}</p>
                          {data.verified ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-muted-foreground">No se requirieron EPP específicos.</p>}
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="item-5" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Siren className="h-6 w-6 text-primary" />
                        Plan de Emergencias
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                   {permit.emergency && Object.keys(permit.emergency).length > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(permit.emergency).map(([question, answer]: [string, any]) => (
                        <li key={question} className="p-3 border rounded-md bg-gray-50 flex justify-between items-center">
                          <p className="font-semibold text-sm flex-1">{question}</p>
                           <Badge variant={answer === 'si' ? 'default' : 'destructive'} className="uppercase">{answer}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-muted-foreground">No se completó el plan de emergencias.</p>}
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-primary" />
                        Trabajadores Ejecutantes
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                  {permit.workers && permit.workers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {permit.workers.map((worker, index) => (
                        <Card key={index} className="p-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    {worker.foto && <AvatarImage src={worker.foto} />}
                                    <AvatarFallback>{getInitials(worker.nombre)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{worker.nombre}</p>
                                    <p className="text-sm text-muted-foreground">C.C. {worker.cedula}</p>
                                    <p className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block mt-1">{worker.rol}</p>
                                </div>
                            </div>
                        </Card>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground">No se agregaron trabajadores externos.</p>}
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="item-7" className="border-none">
            <Card>
               <CardHeader className="p-0">
                <AccordionTrigger className="flex items-center justify-between w-full p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Signature className="h-6 w-6 text-primary" />
                        Firmas y Aprobaciones
                    </div>
                </AccordionTrigger>
               </CardHeader>
              <AccordionContent className="p-6 pt-0">
                <div className="space-y-4">
                  {Object.entries(permit.approvals || {}).map(([role, approval]: [string, any]) => (
                    <div key={role} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                        <div>
                            <p className="font-bold capitalize text-gray-700">{role.replace('_', ' ')}</p>
                            <p className="text-sm text-muted-foreground">{approval.userName || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                            {approval.status === 'aprobado' ? (
                                <p className="font-semibold text-sm text-green-600 flex items-center gap-2"><CheckCircle size={16}/> Firmado</p>
                            ) : (
                                <p className="font-semibold text-sm text-yellow-600 flex items-center gap-2"><Clock size={16}/> Pendiente</p>
                            )}
                            <p className="text-xs text-gray-500">{approval.signedAt ? format(new Date(approval.signedAt), "dd/MM/yyyy") : ''}</p>
                        </div>
                    </div>
                  ))}
                  {!permit.approvals?.lider_tarea && <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 opacity-60"><div><p className="font-bold capitalize text-gray-700">Líder de la Tarea</p></div><p className="font-semibold text-sm text-yellow-600 flex items-center gap-2"><Clock size={16}/> Pendiente</p></div>}
                  {!permit.approvals?.autorizante && <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 opacity-60"><div><p className="font-bold capitalize text-gray-700">Autorizante</p></div><p className="font-semibold text-sm text-yellow-600 flex items-center gap-2"><Clock size={16}/> Pendiente</p></div>}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
          
           {currentUser?.role === 'autorizante' && permit.status === 'pendiente_revision' && (
                <Card className="mt-6 bg-yellow-50 border-yellow-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-yellow-800"><UserCheck/>Acciones de Aprobación</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-yellow-700 mb-4">Como autorizante, puedes aprobar o rechazar este permiso.</p>
                        <div className="flex gap-4">
                            <Button className="flex-1" variant="destructive"><XCircle className="mr-2"/> Rechazar</Button>
                            <Button className="flex-1" style={{backgroundColor: 'hsl(var(--accent))'}}><CheckCircle className="mr-2"/> Aprobar Permiso</Button>
                        </div>
                    </CardContent>
                </Card>
           )}

        </Accordion>
      </div>
    </div>
  );
}
