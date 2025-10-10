
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval, ExternalWorker, AnexoAltura } from '@/types';
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
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// ✅ Helper function to handle different date formats
const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  
  // If it's a Firestore Timestamp
  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate();
  }
  
  // If it's already a Date object
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  // If it's a string (ISO format)
  if (typeof dateValue === 'string') {
    return new Date(dateValue);
  }
  
  return null;
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
        <div className="font-semibold text-gray-800 break-words">{value || 'No especificado'}</div>
    </div>
);

const RadioCheck: React.FC<{ label: string, value?: string | boolean }> = ({ label, value }) => {
    let checkValue: string;
    if (value === true || value === 'si') {
        checkValue = 'si';
    } else if (value === false || value === 'no') {
        checkValue = 'no';
    } else {
        checkValue = 'na';
    }

    return (
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span className="text-xs flex-1">{label}</span>
            <div className="flex gap-2 items-center text-xs font-mono">
                <span className={checkValue === 'si' ? 'font-bold text-black' : 'text-gray-400'}>SI</span>
                <span className={checkValue === 'no' ? 'font-bold text-black' : 'text-gray-400'}>NO</span>
                <span className={checkValue === 'na' ? 'font-bold text-black' : 'text-gray-400'}>NA</span>
            </div>
        </div>
    );
};

type SignatureRole = 'solicitante' | 'autorizante' | 'mantenimiento' | 'sst';
const signatureRoles: { [key in SignatureRole]: string } = {
  solicitante: 'QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)',
  autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  sst: 'AREA SST (si aplica)',
};


export default function PermitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
          createdAt: parseFirestoreDate(data.createdAt),
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
  
  const handleExportToPDF = async () => {
    const header = headerRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;

    if (!header || !content || !footer) return;

    toast({
        title: 'Generando PDF...',
        description: 'Este proceso puede tardar un momento.',
    });

    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // 10mm margin

        // 1. Render Header
        const headerCanvas = await html2canvas(header, { scale: 2, useCORS: true });
        const headerImgData = headerCanvas.toDataURL('image/png');
        const headerHeight = (headerCanvas.height * (pdfWidth - 2 * margin)) / headerCanvas.width;

        // 2. Render Footer
        const footerCanvas = await html2canvas(footer, { scale: 2, useCORS: true });
        const footerImgData = footerCanvas.toDataURL('image/png');
        const footerHeight = (footerCanvas.height * (pdfWidth - 2 * margin)) / footerCanvas.width;

        // 3. Render Content
        const contentCanvas = await html2canvas(content, { scale: 2, useCORS: true, windowWidth: content.scrollWidth, windowHeight: content.scrollHeight });
        const contentImgData = contentCanvas.toDataURL('image/png');
        const contentImgHeight = (contentCanvas.height * (pdfWidth - 2 * margin)) / contentCanvas.width;
        
        const contentPrintableHeight = pdfHeight - headerHeight - footerHeight - (2 * margin);
        let contentPosition = 0;
        let pageCount = 0;

        while (contentPosition < contentImgHeight) {
            if (pageCount > 0) {
                pdf.addPage();
            }
            
            // Add header to each page
            pdf.addImage(headerImgData, 'PNG', margin, margin, pdfWidth - 2 * margin, headerHeight);

            // Add content slice for the current page
            const pageContentHeight = Math.min(contentPrintableHeight, contentImgHeight - contentPosition);
            pdf.addImage(
                contentImgData,
                'PNG',
                margin, // x
                margin + headerHeight, // y
                pdfWidth - 2 * margin, // width
                contentImgHeight, // height
                undefined,
                'FAST',
                0, // rotation
                0, // x on canvas
                contentPosition * (contentCanvas.width / (pdfWidth - 2 * margin)), // y on canvas
                contentCanvas.width, // width on canvas
                pageContentHeight * (contentCanvas.width / (pdfWidth - 2 * margin)) // height on canvas
            );
            
            contentPosition += pageContentHeight;

            // Add footer to each page
            pdf.addImage(footerImgData, 'PNG', margin, pdfHeight - footerHeight - margin, pdfWidth - 2 * margin, footerHeight);
            
            pageCount++;
        }
        
        pdf.save(`permiso_${permit?.number || permitId.substring(0,8)}.pdf`);

        toast({
            title: 'PDF Generado Exitosamente',
            description: 'El documento se ha descargado.',
        });

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Error al Generar PDF',
            description: error.message || 'No se pudo generar el documento.',
        });
    }
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
        const updateData: { [key: string]: any } = {
            [signaturePath]: signatureDataUrl,
            [`${userNamePath}`]: currentUser.displayName,
            [`${userIdPath}`]: currentUser.uid,
        };

        if (type === 'firmaApertura') {
            updateData[statusPath] = 'aprobado';
            updateData[signedAtPath] = new Date().toISOString();
        }

        await updateDoc(docRef, updateData);

        toast({ title: 'Permiso Firmado', description: `Has firmado como ${signatureRoles[role]}`});
        setIsSignatureDialogOpen(false);
        setSigningRole(null);
      } catch (e: any) {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: { [signaturePath]: '...' }
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        toast({ variant: 'destructive', title: 'Error al firmar', description: 'No tienes permiso para realizar esta acción.' });
      }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };
  
  const canSign = (role: SignatureRole, type: 'firmaApertura' | 'firmaCierre') => {
      if(!currentUser || !permit || !permit.approvals) return false;
      
      const approval = permit.approvals[role];
      const isCorrectRole = currentUser.role === role;
      
      if (type === 'firmaApertura') {
          // Can sign for opening if user is the correct role, it's pending, and there's no opening signature yet
          return isCorrectRole && approval?.status === 'pendiente' && !approval?.firmaApertura;
      }
       if (type === 'firmaCierre') {
          // Can sign for closing if user is correct role, opening is signed, and no closing signature yet
          const allOpeningSignaturesDone = permit.approvals.solicitante?.firmaApertura && permit.approvals.autorizante?.firmaApertura;
          return isCorrectRole && allOpeningSignaturesDone && !approval?.firmaCierre && (permit.status === 'en_ejecucion' || permit.status === 'aprobado');
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

 const hazards = [
    { id: 'ruido', label: 'Ruido' },
    { id: 'vibracion', label: 'Vibración' },
    { id: 'temperatura', label: 'Temperatura' },
    { id: 'radiacion', label: 'Radiación' },
    { id: 'iluminacion', label: 'Deficiencia / Exceso de iluminación' },
    { id: 'desnivel', label: 'Diferencias de nivel (Huecos y desnivel)' },
    { id: 'quimicos', label: 'Contacto con sustancias químicas' },
    { id: 'biologicos', label: 'Contacto con animales, virus, bacteria' },
    { id: 'carga_fisica', label: 'Carga física (manipulación manual)' },
    { id: 'electrica', label: 'Contacto con energía eléctrica A/M/B' },
    { id: 'hidraulica', label: 'Contacto con energía hidráulica' },
    { id: 'neumatica', label: 'Contacto con energía neumática' },
    { id: 'mecanica', label: 'Contacto con energía mecánica (atrap)' },
    { id: 'termica', label: 'Contacto con energía térmica' },
    { id: 'confinados', label: 'Espacios confinados' },
    { id: 'altura', label: 'Caídas de altura' },
    { id: 'caliente', label: 'Trabajo en caliente' },
    { id: 'izaje', label: 'Izaje de cargas' },
    { id: 'transito', label: 'Tránsito' },
    { id: 'fenomenos_naturales', label: 'Fenómenos naturales' },
    { id: 'incendio', label: 'Incendio / Explosión' },
    { id: 'emisiones', label: 'Emisiones / Vertimientos' },
    { id: 'residuos', label: 'Residuos Peligrosos' },
    { id: 'otros_riesgos', label: 'Otros riesgos (Cuales):' },
  ];

  const ppe = {
    "Ropa": [
      { id: 'overol_trabajo', label: 'Overol de trabajo' },
      { id: 'overol_ignifugo', label: 'Overol Ignifugo, Categoria:' },
      { id: 'peto', label: 'Peto' },
      { id: 'manguillas', label: 'Manguillas' },
      { id: 'polainas', label: 'Polainas' },
      { id: 'otro_ropa', label: 'Otro (Cual):' },
    ],
    "Protección de pies y piernas": [
      { id: 'botas_seguridad', label: 'Botas de seguridad con puntera' },
      { id: 'botas_dielectricas', label: 'Botas dieléctricas' },
      { id: 'otro_pies', label: 'Otro (Cual):' },
    ],
     "Protección auditiva": [
      { id: 'tipo_insercion', label: 'Tipo Inserción' },
      { id: 'tipo_copa', label: 'Tipo copa' },
    ],
    "Protección respiratoria": [
      { id: 'respirador_cartuchos', label: 'Respirador con cartuchos para:' },
      { id: 'mascarilla_desechable', label: 'Mascarilla desechable para:' },
      { id: 'otro_respiratoria', label: 'Otro (Cual):' },
    ],
    "Protección cabeza": [
        { id: 'casco', label: 'Casco Tipo_Clase_ SIN_CON_Barbuque' },
        { id: 'chavo', label: 'Chavo en tela o carnaza' },
    ],
    "Protección facial y ocular": [
        { id: 'careta_lente_neutro', label: 'Careta lente neutro' },
        { id: 'monogafas', label: 'Monogafas / Gafas' },
        { id: 'gafas_oxicorte', label: 'Gafas de oxicorte' },
        { id: 'careta_soldador', label: 'Careta de soldador' },
        { id: 'careta_dielectrica', label: 'Careta de dieléctrica, clase:' },
        { id: 'otro_facial', label: 'Otro (Cual):' },
    ],
    "Barrera/Señales de advertencia": [
        { id: 'senalizacion', label: 'Señalización' },
        { id: 'barandas', label: 'Barandas' },
        { id: 'delimitacion', label: 'Delimitación Perimetral' },
        { id: 'control_acceso', label: 'Control de acceso' },
    ],
    "Guantes": [
        { id: 'proteccion_mecanica', label: 'Protección mecánica:' },
        { id: 'proteccion_dielectrica_guantes', label: 'Protección dieléctrica:' },
        { id: 'proteccion_quimica', label: 'Protección química' },
        { id: 'otro_guantes', label: 'Otro (Cual):' },
    ],
    "Otros": [
        { id: 'tapete_dielectrico', label: 'Tapete dieléctrico' },
        { id: 'pertiga_dielectrica', label: 'Pértiga dieléctrica' },
        { id: 'otro_otros', label: 'Otro (Cual):' },
    ]
  }

  const ppeSystems = [
      { id: 'arnes', label: 'Arnés, Tipo:' },
      { id: 'mosqueton', label: 'Mosquetón' },
      { id: 'eslinga', label: 'Eslinga, Tipo:' },
      { id: 'linea_vida', label: 'Línea de vida, Tipo:' },
      { id: 'freno_arrestador', label: 'Freno/Arrestador' },
      { id: 'punto_anclaje', label: 'Punto de anclaje (Cual):' },
      { id: 'autoretractil', label: 'Autoretráctil' },
      { id: 'tie_off', label: 'Tie-off' },
      { id: 'baranda_rodapies', label: 'Baranda con rodapiés' },
      { id: 'sistema_acceso', label: 'Sistema de acceso (Cual):' },
      { id: 'tripode', label: 'Tripode / pescante' },
      { id: 'otro_sistemas', label: 'Otro (Cual):' },
  ];
  
  const emergencyQuestions = [
    {id: 'potenciales', label: 'A.- Las emergencias potenciales que pueden ocurrir'},
    {id: 'procedimientos', label: 'B.- Los procedimientos establecidos para tales situaciones.'},
    {id: 'rutas_evacuacion', label: 'C.- Rutas de Evacuación'},
    {id: 'puntos_encuentro', label: 'D.- Puntos de encuentro'},
    {id: 'equipos_emergencia', label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo'},
    {id: 'brigadistas', label: 'F.- Ubicación de Brigadistas cercanos'},
  ];

  const getWorkTypesString = (types: string[]): string => {
    const workTypesMap: {[key: string]: string} = {
        'altura': 'Trabajo en Alturas',
        'confinado': 'Espacios Confinados',
        'energia': 'Control de Energías',
        'izaje': 'Izaje de Cargas',
        'caliente': 'Trabajo en Caliente',
        'excavacion': 'Excavaciones',
        'general': 'Trabajo General'
    };
    if (!Array.isArray(types) || types.length === 0) return workTypesMap['general'];
    return types.map(key => workTypesMap[key] || key).join(', ');
  }

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

        {/* Permit Document Wrapper for PDF generation */}
        <div className="max-w-4xl mx-auto w-full bg-white p-8 shadow-lg rounded-lg border font-sans">
             <header ref={headerRef} className="flex justify-between items-start pb-4 border-b-4 border-primary">
                <div>
                     <Logo textOnly />
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-gray-800">PERMISO DE TRABAJO</h1>
                    <p className="font-mono text-gray-600 mt-2">N°: {permit.number || permit.id.substring(0, 10)}</p>
                    {permit.createdAt && (
                      <p className="text-sm text-gray-500 mt-1">
                        Creado: {format(permit.createdAt, "dd/MM/yyyy HH:mm")}
                      </p>
                    )}
                </div>
            </header>
            
            <main ref={contentRef} className="print:p-0">
                <div className="my-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800 print:hidden">
                    <p><strong>Marque dentro de los cuadros SI/NO/NA según el caso. Si alguna de las verificaciones a las preguntas es "NO", NO SE DEBERA INICIAR EL TRABAJO HASTA TANTO NO SE SOLUCIONE LA SITUACIÓN, SI ES N/A REALICE SU JUSTIFICACIÓN EN OBSERVACIONES.</strong></p>
                </div>
                
                <div className="space-y-6 mt-6">
                    <Section title="INFORMACIÓN GENERAL- Aplica a todos los Permisos">
                        <div className="space-y-4">
                            <Field label="Tipo(s) de Trabajo" value={getWorkTypesString(permit.workType)} fullWidth/>
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

                    {permit.generalInfo?.tools && permit.generalInfo.tools.length > 0 && (
                      <Section title="HERRAMIENTAS Y EQUIPOS">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {permit.generalInfo.tools.map((tool: Tool, index: number) => (
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
                    )}
                    
                    <Section title="Verificaciones Previas">
                        <RadioCheck label="REUNIÓN DE INICIO" value={permit.generalInfo?.reunionInicio} />
                        <RadioCheck label="ATS Verificar el correcto diligenciamiento del ATS en el sitio de trabajo" value={permit.generalInfo?.atsVerificado} />
                    </Section>
                    
                    {permit.anexoAltura && (
                      <Collapsible className="space-y-6 mt-6 border rounded-lg">
                        <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-600">ANEXO 1 - TRABAJOS EN ALTURA</h3>
                            <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="A.- Altura de trabajo:" value={permit.anexoAltura.alturaTrabajo} />
                                <Field label="B.- Coordinador TSA" value={permit.anexoAltura.coordinadorTSA?.toUpperCase()} />
                                <Field label="C.- Auxiliar TSA" value={permit.anexoAltura.auxiliarTSA?.toUpperCase()} />
                                <Field label="D.- Elaboración ATS y procedimientos" value={permit.anexoAltura.elaboracionATS?.toUpperCase()} />
                            </div>
                            <Field label="Requerimiento de claridad o espacio libre de caída" value={permit.anexoAltura.claridadEspacioLibre} fullWidth/>
                            <Field label="Observaciones / Supervisión" value={permit.anexoAltura.observaciones} fullWidth/>
                        </CollapsibleContent>
                      </Collapsible>
                    )}


                    <Section title="Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control estén implementadas">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {hazards.map(hazard => (
                              <RadioCheck key={hazard.id} label={hazard.label} value={permit.hazards?.[hazard.id]} />
                          ))}
                        </div>
                    </Section>
                    
                    <Section title="EPP - SEÑALIZACION (Verificar)">
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {Object.entries(ppe).map(([sectionTitle, sectionItems]) => (
                                <div key={sectionTitle}>
                                   <h4 className="font-bold mb-2 text-gray-600 text-sm">{sectionTitle}</h4>
                                   <div className="space-y-1">
                                    {sectionItems.map(item => (
                                         <RadioCheck key={item.id} label={item.label} value={permit.ppe?.[item.id]} />
                                    ))}
                                   </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    <Section title="Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {ppeSystems.map(system => (
                              <RadioCheck key={system.id} label={system.label} value={permit.ppeSystems?.[system.id]} />
                          ))}
                        </div>
                    </Section>

                    <Section title="Notificación y Emergencias">
                        <RadioCheck label="El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados" value={permit.emergency?.notification} />
                         <div className="mt-4 space-y-1">
                          {emergencyQuestions.map(item => (
                              <RadioCheck key={item.id} label={item.label} value={permit.emergency?.[item.id]} />
                          ))}
                        </div>
                    </Section>
                    
                    <Section title="Trabajadores Ejecutantes">
                      {permit.workers && permit.workers.length > 0 ? (
                        <div className="border rounded-md">
                          {(permit.workers as ExternalWorker[]).map((worker, index) => (
                            <Collapsible key={index} className="border-b last:border-b-0">
                                <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 flex justify-between items-center cursor-pointer group">
                                    <div className="grid grid-cols-3 gap-4 text-left flex-1">
                                        <Field label="Nombre" value={worker.nombre} />
                                        <Field label="Cédula" value={worker.cedula} />
                                        <Field label="Rol" value={worker.rol} />
                                    </div>
                                    <ChevronDown className="h-5 w-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform ml-4"/>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="p-4 bg-gray-50/50 border-t">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <Field label="EPS" value={worker.eps} />
                                            <Field label="ARL" value={worker.arl} />
                                            <Field label="Fondo de Pensiones" value={worker.pensiones} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <Field label="Certificado Aptitud Médica" value={worker.tsaTec?.toUpperCase() || 'N/A'} />
                                            <Field label="Entrenamiento / Capacitación" value={worker.entrenamiento?.toUpperCase() || 'N/A'} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Field label="Firma Apertura" value={
                                                worker.firmaApertura ? <Image src={worker.firmaApertura} alt="Firma Apertura" width={120} height={60} className="bg-white rounded border" /> : 'Pendiente'
                                            }/>
                                            <Field label="Firma Cierre" value={
                                                worker.firmaCierre ? <Image src={worker.firmaCierre} alt="Firma Cierre" width={120} height={60} className="bg-white rounded border" /> : 'Pendiente'
                                            }/>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No se agregaron trabajadores externos.</p>
                      )}
                    </Section>

                     <Section title="Autorizaciones">
                         <p className="text-xs text-muted-foreground mb-4">He tenido conocimiento de la actividad que se realizará en mi área a cargo, valido las recomendaciones descritas en el cuerpo del PERMISO DE TRABAJO Y ATS, realicé inspección de seguridad del área donde se realizará el trabajo (incluir áreas o actividades vecinas), Alerté sobre los riesgos específicos del lugar donde se realizará el trabajo. Se garantizar que las recomendaciones de SST descritas y consignadas serán cumplidas. Verifiqué las buenas condiciones de los equipos y herramientas que serán utilizados. Me aseguré que las personas implicadas están calificadas para la ejecución del servicio y conocen las reglas de seguridad aplicables al trabajo, los procedimientos, normas, políticas aplicables, el plan de emergencias.</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {permit.approvals && (Object.keys(signatureRoles) as SignatureRole[]).map(role => {
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
                                                        <div className="text-center text-xs mt-1">Firmado el {approval.signedAt ? format(new Date(approval.signedAt), "dd/MM/yyyy 'a las' HH:mm") : 'N/A'}</div>
                                                      </div>
                                                  ) : 'Pendiente'
                                                } />
                                                <Field label="Firma Cierre" value={
                                                  approval?.firmaCierre ? (
                                                      <div className="bg-gray-100 p-2 rounded-md">
                                                        <Image src={approval.firmaCierre} alt={`Firma de ${approval.userName}`} width={150} height={75} className="mx-auto"/>
                                                      </div>
                                                  ) : 'Pendiente'
                                                } />
                                            </div>

                                            <div className="flex flex-col gap-2 mt-4">
                                                {canSign(role, 'firmaApertura') && (
                                                    <Button size="sm" className="w-full" onClick={() => openSignatureDialog(role, 'firmaApertura')}>
                                                        <SignatureIcon className="mr-2 h-4 w-4"/>
                                                        Firmar Apertura
                                                    </Button>
                                                )}
                                                 {canSign(role, 'firmaCierre') && (
                                                    <Button size="sm" className="w-full" variant="secondary" onClick={() => openSignatureDialog(role, 'firmaCierre')}>
                                                        <SignatureIcon className="mr-2 h-4 w-4"/>
                                                        Firmar Cierre
                                                    </Button>
                                                )}
                                            </div>
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
                                {permit.closure?.seguimientoCaliente && (
                                  <Field label="Seguimiento trabajo en caliente" value={
                                      <div className="flex gap-2">
                                          <Input value={permit.closure.seguimientoCaliente.hora1 || ''} readOnly className="text-xs"/>
                                          <Input value={permit.closure.seguimientoCaliente.hora2 || ''} readOnly className="text-xs"/>
                                          <Input value={permit.closure.seguimientoCaliente.hora3 || ''} readOnly className="text-xs"/>
                                      </div>
                                  }/>
                                )}
                                <RadioCheck label="Se retiraron todos los dispositivos de bloqueo(candados y tarjetas)." value={permit.closure?.dispositivosRetirados}/>
                                 <Field label="Fecha de Cierre" value={permit.closure?.fechaCierre ? format(new Date(permit.closure.fechaCierre), 'dd/yyyy') : 'Pendiente'}/>
                                 <Field label="Hora de Cierre" value={permit.closure?.horaCierre || 'Pendiente'}/>
                            </div>
                        </div>
                     </Section>
                </div>
            </main>
            
            <footer ref={footerRef} className="mt-12 pt-4 border-t text-right text-xs text-gray-500 print:text-xs">
                <p>Código: DN-FR-SST-016</p>
                <p>Versión: 05</p>
            </footer>
        </div>
        
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

    