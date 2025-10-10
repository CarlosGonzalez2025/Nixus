
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval } from '@/types';
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
  Signature as SignatureIcon,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Siren,
  FileDown,
  Wrench,
  Check,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/use-user';
import { format } from 'date-fns';
import { Logo } from '@/components/logo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';


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

const Section: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={className}>
      <h3 className="text-sm font-bold uppercase text-gray-500 border-b-2 border-gray-300 pb-1 mb-3">{title}</h3>
      <div className="text-sm">
        {children}
      </div>
    </div>
);

const Field: React.FC<{ label: string, value?: React.ReactNode, fullWidth?: boolean }> = ({label, value, fullWidth}) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 break-words">{value || 'No especificado'}</p>
    </div>
);

const RadioCheck: React.FC<{ label: string, value?: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
        <span className="text-xs flex-1">{label}</span>
        <div className="flex gap-2 items-center text-xs font-mono">
            <span className={value === 'si' ? 'font-bold text-black' : 'text-gray-400'}>SI</span>
            <span className={value === 'no' ? 'font-bold text-black' : 'text-gray-400'}>NO</span>
            <span className={value === 'na' ? 'font-bold text-black' : 'text-gray-400'}>NA</span>
        </div>
    </div>
);

type SignatureRole = 'solicitante' | 'autorizante' | 'mantenimiento' | 'sst';
const signatureRoles: { [key in SignatureRole]: string } = {
  solicitante: 'QUIEN SOLICITA (JEFES Y DUELOS DE AREA)',
  autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  sst: 'AREA SST (si aplica)',
};


export default function PermitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const permitContentRef = useRef<HTMLDivElement>(null);

  const [permit, setPermit] = useState<Permit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [signingRole, setSigningRole] = useState<{role: SignatureRole, type: 'firmaApertura' | 'firmaCierre'} | null>(null);


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
  
  const handleExportToPDF = () => {
    const input = permitContentRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pdfHeight = pdfWidth / ratio;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`permiso_${permitId.substring(0,8)}.pdf`);
    });
  };

  const openSignatureDialog = (role: SignatureRole, signatureType: 'firmaApertura' | 'firmaCierre') => {
      setSigningRole({role, type: signatureType});
      setIsSignatureDialogOpen(true);
  }

  const handleSaveSignature = async (signatureDataUrl: string) => {
      if (!permit || !currentUser || !signingRole) return;
      
      const { role, type } = signingRole;
      const docRef = doc(db, 'permits', permit.id);
      
      const signaturePath = `approvals.${role}.${type}`;
      const statusPath = `approvals.${role}.status`;
      const userIdPath = `approvals.${role}.userId`;
      const userNamePath = `approvals.${role}.userName`;
      const signedAtPath = `approvals.${role}.signedAt`;

      try {
        await updateDoc(docRef, {
            [signaturePath]: signatureDataUrl,
            [statusPath]: 'aprobado',
            [userIdPath]: currentUser.uid,
            [userNamePath]: currentUser.displayName,
            [signedAtPath]: new Date().toISOString(),
        });
        toast({ title: 'Permiso Firmado', description: `Has firmado como ${signatureRoles[role]}`});
        setIsSignatureDialogOpen(false);
        setSigningRole(null);
      } catch (e: any) {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        toast({ variant: 'destructive', title: 'Error al firmar', description: e.message });
      }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };
  
  const canSign = (role: SignatureRole, type: 'firmaApertura' | 'firmaCierre') => {
      if(!currentUser || !permit) return false;
      const approval = permit.approvals[role];
      if (type === 'firmaApertura') {
          return currentUser.role === role && approval?.status === 'pendiente' && !approval?.firmaApertura;
      }
       if (type === 'firmaCierre') {
          // Add logic for closing signature if needed
          return false;
      }
      return false;
  }


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
    return null;
  }

  const ppeSections = [
    { title: "Ropa", ids: ['overol_trabajo', 'overol_ignifugo', 'peto', 'manguillas', 'polainas', 'otro_ropa'] },
    { title: "Protección de pies y piernas", ids: ['botas_seguridad', 'botas_dielectricas', 'otro_pies'] },
    { title: "Protección auditiva", ids: ['tipo_insercion', 'tipo_copa'] },
    { title: "Protección respiratoria", ids: ['respirador_cartuchos', 'mascarilla_desechable', 'otro_respiratoria'] },
    { title: "Protección cabeza", ids: ['casco', 'chavo'] },
    { title: "Protección facial y ocular", ids: ['careta_lente_neutro', 'monogafas', 'gafas_oxicorte', 'careta_soldador', 'careta_dielectrica', 'otro_facial'] },
    { title: "Barrera/Señales de advertencia", ids: ['senalizacion', 'barandas', 'delimitacion', 'control_acceso'] },
    { title: "Guantes", ids: ['proteccion_mecanica', 'proteccion_dielectrica_guantes', 'proteccion_quimica', 'otro_guantes'] },
    { title: "Otros", ids: ['tapete_dielectrico', 'pertiga_dielectrica', 'otro_otros'] }
  ];

  return (
    <div className="flex flex-1 flex-col bg-gray-100 p-4 md:p-8">
        {/* Action Bar */}
        <div className="max-w-4xl mx-auto w-full mb-4">
            <div className="flex justify-between items-center">
                 <Button variant="ghost" onClick={() => router.push('/permits')} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al listado
                </Button>
                <div className="flex gap-2">
                     <Button onClick={handleExportToPDF} variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar a PDF
                    </Button>
                </div>
            </div>
        </div>

        {/* Permit Document */}
        <main ref={permitContentRef} className="max-w-4xl mx-auto w-full bg-white p-8 shadow-lg rounded-lg border font-sans">
            <header className="flex justify-between items-start pb-4 border-b-4 border-primary">
                <div>
                     <Logo textOnly />
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-gray-800">PERMISO DE TRABAJO</h1>
                    <p className="font-mono text-gray-600 mt-2">ID: {permit.id}</p>
                </div>
            </header>

            <div className="my-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800">
                <p><strong>Marque dentro de los cuadros SI/NO/NA según el caso. Si alguna de las verificaciones a las preguntas es "NO", NO SE DEBERA INICIAR EL TRABAJO HASTA TANTO NO SE SOLUCIONE LA SITUACIÓN, SI ES N/A REALICE SU JUSTIFICACIÓN EN OBSERVACIONES.</strong></p>
            </div>
            
            <div className="space-y-6 mt-6">
                <Section title="INFORMACIÓN GENERAL- Aplica a todos los Permisos">
                    <div className="space-y-4">
                        <Field label="El trabajo se LIMITA a lo siguiente (Tipo y Alcance del Trabajo - Descripción y Área/Equipo):" value={permit.generalInfo?.workDescription} fullWidth/>
                        <Field label="Causales para la suspensión del Permiso:" value={permit.generalInfo?.suspensionCauses} fullWidth/>
                        <Field label="Descripción o procedimiento de la teras a realizar:" value={permit.generalInfo?.procedure} fullWidth/>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className={`h-4 w-4 ${permit.generalInfo?.isEmergencyExtension ? 'text-green-500' : 'text-gray-300'}`} />
                            <span className="text-sm font-medium">Extensión Emergencia</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <Field label="Válido Desde:" value={permit.generalInfo?.validFrom ? format(new Date(permit.generalInfo.validFrom), "dd/MM/yyyy HH:mm") : undefined}/>
                           <Field label="Válido Hasta:" value={permit.generalInfo?.validUntil ? format(new Date(permit.generalInfo.validUntil), "dd/MM/yyyy HH:mm") : undefined}/>
                        </div>
                    </div>
                </Section>

                <Section title="HERRAMIENTAS Y EQUIPOS">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {permit.generalInfo?.tools?.map((tool: Tool, index: number) => (
                             <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <span className="text-xs flex-1">{tool.name}</span>
                                <div className="flex gap-2 items-center text-xs font-mono">
                                    <span className={tool.status === 'B' ? 'font-bold text-black' : 'text-gray-400'}>B</span>
                                    <span className={tool.status === 'M' ? 'font-bold text-black' : 'text-gray-400'}>M</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section title="Verificaciones Previas">
                    <RadioCheck label="REUNIÓN DE INICIO" value={permit.generalInfo?.reunionInicio} />
                    <RadioCheck label="ATS Verificar el correcto diligenciamiento del ATS en el sitio de trabajo" value={permit.generalInfo?.atsVerificado} />
                </Section>

                <Section title="Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control estén implementadas">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(permit.hazards || {}).map(([key, value]) => (
                          <RadioCheck key={key} label={key.replace(/_/g, ' ')} value={value as string} />
                      ))}
                    </div>
                </Section>
                
                <Section title="EPP - SEÑALIZACION (Verificar)">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {ppeSections.map(section => (
                            <div key={section.title}>
                               <h4 className="font-bold mb-2 text-gray-600 text-sm">{section.title}</h4>
                               <div className="space-y-1">
                                {section.ids.map(id => permit.ppe && permit.ppe[id] && (
                                     <RadioCheck key={id} label={id.replace(/_/g, ' ')} value={permit.ppe[id]} />
                                ))}
                               </div>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section title="Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(permit.ppeSystems || {}).map(([key, value]) => (
                          <RadioCheck key={key} label={key.replace(/_/g, ' ')} value={value as string} />
                      ))}
                    </div>
                </Section>

                <Section title="Notificación y Emergencias">
                    <RadioCheck label="El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados" value={permit.emergency?.notification ? 'si' : 'no'} />
                     <div className="mt-4 space-y-1">
                      {Object.entries(permit.emergency || {}).filter(([key]) => key !== 'notification').map(([key, value]) => (
                          <RadioCheck key={key} label={key.replace(/_/g, ' ')} value={value as string} />
                      ))}
                    </div>
                </Section>
                
                <Section title="Trabajadores Ejecutantes">
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
                </Section>

                 <Section title="Autorizaciones">
                     <p className="text-xs text-muted-foreground mb-4">He tenido conocimiento de la actividad que se realizará en mi área a cargo, valido las recomendaciones descritas en el cuerpo del PERMISO DE TRABAJO Y ATS, realicé inspección de seguridad del área donde se realizará el trabajo (incluir áreas o actividades vecinas), Alerté sobre los riesgos específicos del lugar donde se realizará el trabajo. Se garantizar que las recomendaciones de SST descritas y consignadas serán cumplidas. Verifiqué las buenas condiciones de los equipos y herramientas que serán utilizados. Me aseguré que las personas implicadas están calificadas para la ejecución del servicio y conocen las reglas de seguridad aplicables al trabajo, los procedimientos, normas, políticas aplicables, el plan de emergencias.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(Object.keys(signatureRoles) as SignatureRole[]).map(role => {
                            const approval = permit.approvals[role];
                            return (
                                <Card key={role} className="flex flex-col">
                                    <CardHeader className="bg-gray-100 p-3">
                                        <CardTitle className="text-sm">{signatureRoles[role]}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                        <div>
                                            <Field label="Área" value={approval?.area || 'N/A'} />
                                            <Field label="Nombre" value={approval?.userName || 'Pendiente'} />
                                            <Field label="Firma Apertura" value={
                                              approval?.firmaApertura ? (
                                                  <div className="bg-gray-100 p-2 rounded-md">
                                                    <Image src={approval.firmaApertura} alt={`Firma de ${approval.userName}`} width={150} height={75} className="mx-auto"/>
                                                    <p className="text-center text-xs mt-1">Firmado el {format(new Date(approval.signedAt!), "dd/MM/yyyy 'a las' HH:mm")}</p>
                                                  </div>
                                              ) : 'Pendiente'
                                            } />
                                            <Field label="Firma Cierre" value={approval?.firmaCierre ? 'Firmado' : 'Pendiente'} />
                                        </div>

                                        {canSign(role, 'firmaApertura') && (
                                            <Button size="sm" className="w-full mt-4" onClick={() => openSignatureDialog(role, 'firmaApertura')}>
                                                <SignatureIcon className="mr-2 h-4 w-4"/>
                                                Firmar Apertura
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                     </div>
                 </Section>
                 
                 <Section title="Emisión, Revalidación y Cierre">
                    <p className="text-xs text-muted-foreground mb-4">Para trabajo en caliente el cierre del permiso se debe hacer minimo 2 horas posterior a la terminación de la tarea y se deben inspeccionar el lugar 30 min, 60 min y 2 horas posterior a la culminación de la tarea.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <RadioCheck label="Se informo al responsable del área sobre la culminación de las actividades." value={permit.closure?.informeCulminacion}/>
                             <RadioCheck label="Área se encuentra despejada, ordenada, demarcación retirada." value={permit.closure?.areaDespejada}/>
                             <RadioCheck label="Se evidencia partículas o material encendido que pueda generar riesgo de fuego incipiente" value={permit.closure?.evidenciaParticulas}/>
                             <RadioCheck label="Se continua con la labor de manera normal." value={permit.closure?.continuaLabor}/>
                        </div>
                        <div className="space-y-2">
                            <Field label="Seguimiento trabajo en caliente" value={
                                <div className="flex gap-2">
                                    <Input value={permit.closure?.seguimientoCaliente?.hora1 || ''} readOnly className="text-xs"/>
                                    <Input value={permit.closure?.seguimientoCaliente?.hora2 || ''} readOnly className="text-xs"/>
                                    <Input value={permit.closure?.seguimientoCaliente?.hora3 || ''} readOnly className="text-xs"/>
                                </div>
                            }/>
                            <RadioCheck label="Se retiraron todos los dispositivos de bloqueo(candados y tarjetas)." value={permit.closure?.dispositivosRetirados}/>
                             <Field label="Fecha de Cierre" value={permit.closure?.fechaCierre ? format(new Date(permit.closure.fechaCierre), 'dd/MM/yyyy') : 'Pendiente'}/>
                             <Field label="Hora de Cierre" value={permit.closure?.horaCierre || 'Pendiente'}/>
                        </div>
                    </div>
                 </Section>

            </div>
            
            <footer className="mt-12 pt-4 border-t text-right text-xs text-gray-500">
                <p>Código: DN-FR-SST-016</p>
                <p>Versión: 05</p>
            </footer>
        </main>
        
        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Firmar Permiso de Trabajo</DialogTitle>
                    <DialogDescription>
                        {signingRole && `Está firmando como ${signatureRoles[signingRole.role]}. Su firma quedará registrada.`}
                    </DialogDescription>
                </DialogHeader>
                <SignaturePad onSave={handleSaveSignature} />
            </DialogContent>
        </Dialog>
    </div>
  );
}
