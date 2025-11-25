
'use client';

import { useEffect, useState, useRef, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval, ExternalWorker, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, PermitStatus, UserRole, AnexoATS, PruebaGasesPeriodica, AnexoExcavaciones, ValidacionDiaria, AutorizacionPersona, User } from '@/types';
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
  PlayCircle,
  PauseCircle,
  Lock,
  Edit,
  HeartPulse,
  BookUser,
  ShieldCheck,
  Circle,
  MessageSquare,
  Info,
  FileX,
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
import { format, differenceInCalendarDays, parseISO, isValid } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { updatePermitStatus, addSignatureAndNotify, addDailyValidationSignature, addWorkerSignature } from '../actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


// ✅ Helper function to handle different date formats (CORREGIDO)
const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate();
  }
  if (dateValue instanceof Date) {
    return dateValue;
  }
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return null;
};

// ✅ Helper seguro para formatear fechas (NUEVO)
const safeFormat = (date: any, fmt: string): string => {
  const parsedDate = parseFirestoreDate(date);
  return parsedDate && isValid(parsedDate) ? format(parsedDate, fmt) : 'N/A';
};


const getStatusInfo = (status: string): { text: string; icon: React.ElementType; color: string; bgColor: string } => {
    const statusInfo: { [key: string]: { text: string; icon: React.ElementType; color: string, bgColor: string } } = {
        borrador: { text: 'Borrador', icon: Clock, color: 'text-gray-600', bgColor: 'bg-gray-100' },
        pendiente_revision: { text: 'Pendiente de Revisión', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
        aprobado: { text: 'Aprobado', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
        en_ejecucion: { text: 'En Ejecución', icon: PlayCircle, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        suspendido: { text: 'Suspendido', icon: PauseCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
        cerrado: { text: 'Cerrado', icon: Lock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        rechazado: { text: 'Rechazado', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    };
    return statusInfo[status] || { text: status, icon: FileText, color: 'text-gray-500', bgColor: 'bg-gray-100' };
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

// ✨ CORRECCIÓN: Nuevo componente RadioCheck con íconos
const RadioCheck: React.FC<{ label: string, value?: string | boolean, spec?: string, onValueChange?: (value: any) => void }> = ({ label, value, spec, onValueChange }) => {
    let status: 'si' | 'no' | 'na';
    if (value === true || value === 'si') {
        status = 'si';
    } else if (value === false || value === 'no') {
        status = 'no';
    } else {
        status = 'na';
    }

    const iconMap = {
        si: <CheckCircle className="h-5 w-5 text-green-500" />,
        no: <XCircle className="h-5 w-5 text-red-500" />,
        na: <Circle className="h-5 w-5 text-gray-400" />,
    };

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <span className="text-xs flex-1 pr-2">{label}</span>
            <div className="flex items-center gap-2">
                {spec && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">{spec}</span>}
                {onValueChange ? (
                    <RadioGroup value={status} onValueChange={onValueChange} className="flex gap-2">
                        <RadioGroupItem value="si" /> <Label>Sí</Label>
                        <RadioGroupItem value="no" /> <Label>No</Label>
                        <RadioGroupItem value="na" /> <Label>N/A</Label>
                    </RadioGroup>
                ) : (
                    iconMap[status]
                )}
            </div>
        </div>
    );
};


type SignatureRole = 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas';
const signatureRoles: { [key in SignatureRole]: string } = {
  coordinador_alturas: 'COORDINADOR (ANEXO)',
  solicitante: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  mantenimiento: 'MANTENIMIENTO (SI APLICA)',
  lider_sst: 'Firma SST',
  autorizante: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)',
};

const signatureConsents: { [key in SignatureRole]?: string } = {
    solicitante: "Al firmar, confirma que la información del permiso, ATS y anexos es correcta. El permiso se enviará para autorización y ya no podrá ser modificado.",
    coordinador_alturas: "Al firmar como Coordinador de Trabajos en Alturas, manifiesto que entiendo el trabajo que se va a realizar y sus peligros, se han verificado las condiciones y formulado las medidas de prevención necesarias.",
};


export default function PermitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = params.id as string;
  
  const [permit, setPermit] = useState<Permit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [signingRole, setSigningRole] = useState<{role: SignatureRole | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', type: 'firmaApertura' | 'firmaCierre'} | null>(null);
  const [signerName, setSignerName] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [signatureObservation, setSignatureObservation] = useState("");

  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  
  const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = useState(false);
  
  const [isDailyValidationSignatureOpen, setIsDailyValidationSignatureOpen] = useState(false);
  const [isDailyValidationSigning, setIsDailyValidationSigning] = useState(false);
  const [dailyValidationTarget, setDailyValidationTarget] = useState<{anexo: string, type: 'autoridad' | 'responsable', index: number} | null>(null);
  const [dailyValidationName, setDailyValidationName] = useState('');
  const [dailyValidationDate, setDailyValidationDate] = useState('');

  const [isWorkerSignatureOpen, setIsWorkerSignatureOpen] = useState(false);
  const [workerSignatureTarget, setWorkerSignatureTarget] = useState<{ index: number; type: 'firmaApertura' | 'firmaCierre'; } | null>(null);
  
  const [isClosureDialogOpen, setIsClosureDialogOpen] = useState(false);
  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");


  const atsPeligros = [
    { seccion: 'LOCATIVOS', id: 'superficies_irregulares', label: 'Superficies irregulares' },
    { seccion: 'LOCATIVOS', id: 'superficies_deslizantes', label: 'Superficies deslizantes' },
    { seccion: 'LOCATIVOS', id: 'diferencia_nivel', label: 'Superficies con diferencia de nivel' },
    { seccion: 'LOCATIVOS', id: 'techos_mal_estado', label: 'Techos, muros, pisos o paredes en mas estado' },
    { seccion: 'LOCATIVOS', id: 'espacios_reducidos', label: 'Espacios reducidos de trabjo' },
    { seccion: 'FÍSICOS', id: 'deficiencia_iluminacion', label: 'Deficiencia de iluminación' },
    { seccion: 'FÍSICOS', id: 'exceso_iluminacion', label: 'Exceso de iluminación' },
    { seccion: 'FÍSICOS', id: 'ruido_intermitente', label: 'Ruido (Intermitente/Continuo/Impacto)' },
    { seccion: 'FÍSICOS', id: 'contacto_superficies_calientes', label: 'Contacto con superficies calientes' },
    { seccion: 'FÍSICOS', id: 'exposicion_soldadura', label: 'Exposición a arco de soldadura' },
    { seccion: 'QUÍMICOS', id: 'gases_humos_vapores', label: 'Gases, humos, vapores y neblinas' },
    { seccion: 'QUÍMICOS', id: 'material_particulado', label: 'Material particulado' },
    { seccion: 'QUÍMICOS', id: 'contacto_sustancias_peligrosas', label: 'Uso o contacto con materiales o sustancias peligrosas' },
    { seccion: 'QUÍMICOS', id: 'derrame_productos_quimicos', label: 'Derrame o fugas de Productos Químicos' },
    { seccion: 'MECÁNICOS', id: 'proyeccion_particulas', label: 'Proyección de particulas y frecmentos' },
    { seccion: 'MECÁNICOS', id: 'mecanismos_movimiento', label: 'Mecanismos en movimiento' },
    { seccion: 'MECÁNICOS', id: 'manejo_herramientas', label: 'Manejo de herrramienta o equipos electricos' },
    { seccion: 'MECÁNICOS', id: 'movimiento_equipos_pesados', label: 'Movimiento de equipos de trabajo pesado en sitio' },
    { seccion: 'MECÁNICOS', id: 'exposicion_vibraciones', label: 'Exposición a vibraciones por equipos' },
    { seccion: 'BIOLÓGICOS', id: 'exposicion_vectores', label: 'Exposición a vectores transmisión de enfermedades' },
    { seccion: 'BIOLÓGICOS', id: 'contaminacion_biologica', label: 'Contaminación biológica' },
    { seccion: 'VIAL', id: 'accidente_incidente_vial', label: 'Accidente o incidente vial' },
    { seccion: 'VIAL', id: 'atropellamiento_personas', label: 'Atropellamiento a personas' },
    { seccion: 'BIOMECÁNICOS', id: 'carga_estatica', label: 'Carga Estática (Posturas inadecuadas, prolongadas, forzadas, antigravitación)' },
    { seccion: 'BIOMECÁNICOS', id: 'carga_dinamica', label: 'Carga Dinámica (Esfuerzos, Movilización de cargas, Movimientos repetitivos / repetidos)' },
    { seccion: 'AMBIENTALES', id: 'generacion_residuos', label: 'Generación de residuos escombros' },
    { seccion: 'AMBIENTALES', id: 'consumo_agua', label: 'Consumo de agua en grandes cantidades' },
    { seccion: 'AMBIENTALES', id: 'mezcla_concreto', label: 'Mezcla de concreto en suelo' },
    { seccion: 'AMBIENTALES', id: 'emisiones_material_particulado', label: 'Emisiones de material particulado' },
 ];

 const anexoAlturaAspectos = [
    { id: 'afiliacionVigente', label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL? '},
    { id: 'procedimientoActividad', label: 'B. SE CUENTA CON EL PROCEDIMIENTO DE LA ACTIVIDAD A EJECUTAR?' },
    { id: 'medidasPrevencion', label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
    { id: 'conocenMedidas', label: 'D. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?'},
    { id: 'entrenadosCertificados', label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR   TRABAJOS EN ALTURA?'},
    { id: 'elementosProteccionCertificados', label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO E CERTIFICADOS?' },
    { id: 'sistemaAseguramientoVerificado', label: 'G. SE VERIFICO EL SISTEMA DE ASEGURAMIENTO DE LA ESCALERA , ANDAMIO O PLATAFORMA A UNA ESTRUCTURA FIJA' },
    { id: 'estadoElementosVerificado', label: 'H. SE VERIFICO EL ESTADO DE: ESLINGAS, ARNES, CASCO, MOSQUETONES, CASCO, Y DEMAS ELEMENTOS NECESARIOS PARA REALIZAR EL TRABAJO.' },
    { id: 'puntosAnclajeCertificados', label: 'I. LOS PUNTOS DE ANCLAJE Y DEMAS ELEMENTOS CUMPLEN CON LA RESISTENCIA DE 5000 LBS POR PERSONA Y ESTAN CERTIFICADOS?' },
    { id: 'areaDelimitada', label: 'J. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO' },
    { id: 'personalSaludable', label: 'K. EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD PARA LA ACTIVIDAD?.' },
    { id: 'equiposAccesoBuenEstado', label: 'L. SE CUENTA CON TODOS LOS EQUIPOS Y SISTEMAS DE ACCESO PARA TRABJO EN ALTURAS EN BUEN ESTADO?' },
    { id: 'espacioCaidaLibreSuficiente', label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR CHE LA PERSONA SE GOLPEE CONTRA EL NIVEL INFERIOR.' },
    { id: 'equiposEmergenciaDisponibles', label: 'N. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS EN EL AREA Y PLAN DE EMERGENCIAS PARA RESCATE EN ALTURAS?' },
    { id: 'eppSeleccionadosCorrectamente', label: 'O. ESTÁN LOS ELEMENTOS DE PROTECCIÓN PERSONAL SELECCIONADOS TENIENDO EN CUENTA LOS RIESGOS Y REQUERIMIENTOS DE LA TAREA?' },
    { id: 'plataformaSoportaCarga', label: 'P.LA PLATAFORMA O ESTRUCTURA SOPORTA LA CARGA DE TRABAJO, ES FIRME Y SE EVITA LA CAÍDA DE OBJETOS O HERRAMIENTAS?' },
    { id: 'supervisorConstante', label: 'Q.EXISTE UN SUPERVISOR O ACOMPAÑANTE CONSTASTE DURANTE EL TRABAJO' },
    { id: 'andamiosCompletos', label: 'R. EN CASO DE TRABAJOS SOBRE ANDAMIOS, ESTOS ESTAN COMPLETOS Y ADECUADAMENTE ARMADOS (RODAPIES, BARANDAS, ETC.)' },
    { id: 'condicionesClimaticasAdecuadas', label: 'S.LAS CONDICIONES CLIMATICAS SON ADECUADAS PARA REALIZAR EL TRABAJO' },
    { id: 'metodoSubirHerramientasSeguro', label: 'T.EL METODO DE SUBIR HERRAMIENTAS ES SEGURO' },
    { id: 'sistemasRestriccion', label: 'U. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE RESTRICCIÓN' },
    { id: 'sistemasPosicionamiento', label: 'V. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE POSICIONAMIENTO' },
];

  useEffect(() => {
    if (!permitId) {
      setError('ID de permiso no válido.');
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    const docRef = doc(db, 'permits', permitId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (isMounted) {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPermit({
            id: docSnap.id,
            ...data,
          } as Permit);
          setError(null);
        } else {
          setError('No se encontró el permiso de trabajo.');
          setPermit(null);
        }
        setLoading(false);
      }
    }, (serverError) => {
      if (isMounted) {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError('No tiene permisos para ver este documento o ha ocurrido un error.');
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [permitId]);
  
  const handleExportToPDF = async () => {
    if (!permit) {
      toast({ variant: 'destructive', title: 'Error', description: 'Datos del permiso no disponibles.' });
      return;
    }
  
    toast({
      title: 'Generando PDF...',
      description: 'Por favor, espere un momento.',
    });
    
    const logoBase64 = "DEJA ESTE CAMPO ASÍ PARA AGREGARLO MANUALMENTE";
  
    try {
      const doc = new jsPDF('p', 'mm', 'letter');
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10;
      let yPos = margin;
  
      // Colores corporativos
      const italcolOrange = [239, 123, 0];
  
      // ===== FUNCIONES HELPER =====
      
      const checkPageBreak = (neededHeight: number) => {
        if (yPos + neededHeight > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
      };
  
      const drawHeader = (title: string, code = "DN-FR-SST-016", version = "04") => {
        // Logo
        try {
          if (logoBase64 !== "DEJA ESTE CAMPO ASÍ PARA AGREGARLO MANUALMENTE") {
            doc.addImage(logoBase64, 'PNG', margin, yPos, 30, 20);
          } else {
             doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
             doc.rect(margin, yPos, 30, 20, 'F');
          }
        } catch (e) {
          console.error('Error al cargar logo:', e);
          doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
          doc.rect(margin, yPos, 30, 20, 'F');
        }
  
        // Título
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(title.toUpperCase(), pageWidth / 2, yPos + 12, { align: 'center' });
  
        // Código y versión
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Código: ${code}`, pageWidth - margin, yPos + 8, { align: 'right' });
        doc.text(`Versión: ${version}`, pageWidth - margin, yPos + 13, { align: 'right' });
  
        // Línea separadora naranja
        doc.setDrawColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
        doc.setLineWidth(1);
        doc.line(margin, yPos + 26, pageWidth - margin, yPos + 26);
        
        yPos += 30;
      };
  
      const drawSectionTitle = (title: string) => {
        checkPageBreak(12);
        doc.setFillColor(italcolOrange[0], italcolOrange[1], italcolOrange[2]);
        doc.rect(margin, yPos, pageWidth - (2 * margin), 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(title.toUpperCase(), pageWidth / 2, yPos + 4, { align: 'center' });
        yPos += 8;
        doc.setTextColor(0, 0, 0);
      };
      
      const drawSignatureBox = (roleTitle: string, approval: any, x: number, y: number, width: number, height: number) => {
        doc.rect(x, y, width, height);
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.text(roleTitle, x + 2, y + 3);
        
        if (approval?.status === 'aprobado') {
          doc.setFont('helvetica', 'normal');
          doc.text(approval.userName || '', x + 2, y + 8);
          
          // Intentar agregar firma
          if (approval.firmaApertura) {
            try {
              doc.addImage(approval.firmaApertura, 'PNG', x + 5, y + 10, 40, 15);
            } catch (e) {
              console.error(`Error adding signature for ${roleTitle}:`, e);
              doc.setFontSize(5);
              doc.text('[Firma no disponible]', x + 5, y + 15);
            }
          }
          
          doc.setFontSize(6);
          doc.text(safeFormat(approval.signedAt, 'dd/MM/yy HH:mm'), x + 2, y + 28);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6);
          doc.text('Pendiente', x + 2, y + 15);
        }
      };
  
      const drawDailyValidationTable = (validationData: any, permitDuration: number) => {
          checkPageBreak(50);
          drawSectionTitle("VALIDACIÓN DIARIA");
  
          const bodyData = Array.from({ length: permitDuration }, (_, idx) => {
              const valRes = validationData?.responsable?.[idx];
              const valAut = validationData?.autoridad?.[idx];
              return [
                  `DÍA ${idx + 1}`,
                  valRes?.nombre || '',
                  safeFormat(valRes?.fecha, 'dd/MM/yy'),
                  valAut?.nombre || '',
                  safeFormat(valAut?.fecha, 'dd/MM/yy')
              ];
          });
  
          autoTable(doc, {
              startY: yPos,
              head: [
                  [
                      { content: 'DÍA', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
                      { content: 'RESPONSABLE DEL TRABAJO', colSpan: 2, styles: { halign: 'center' } },
                      { content: 'AUTORIDAD DEL ÁREA', colSpan: 2, styles: { halign: 'center' } }
                  ],
                  ['NOMBRE', 'FECHA', 'NOMBRE', 'FECHA']
              ],
              body: bodyData,
              theme: 'grid',
              styles: { fontSize: 7, cellPadding: 1 },
              headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
      };
  
      // Calcular duración del permiso
      let permitDuration = 1;
      if (permit.generalInfo?.validFrom && permit.generalInfo?.validUntil) {
        try {
          const startDate = parseISO(permit.generalInfo.validFrom);
          const endDate = parseISO(permit.generalInfo.validUntil);
          if (isValid(startDate) && isValid(endDate)) {
            permitDuration = differenceInCalendarDays(endDate, startDate) + 1;
          }
        } catch (e) {
          console.error("Error parsing dates:", e);
        }
      }
  
      // ===== CONTENIDO DEL PDF =====
  
      // ENCABEZADO
      drawHeader('PERMISO DE TRABAJO');
  
      // ✅ INFORMACIÓN GENERAL - COMPLETO
      autoTable(doc, {
        startY: yPos,
        body: [
          [
            { content: 'Fecha Expedición:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            safeFormat(permit.createdAt, 'dd/MM/yyyy'),
            { content: 'Planta:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.generalInfo?.planta || ''
          ],
          [
            { content: 'Empresa:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.generalInfo?.empresa || '',
            { content: 'Solicitante:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.user?.displayName || ''
          ],
          [
            { content: 'Contrato:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.generalInfo?.contrato || '',
            { content: 'Área Específica:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.generalInfo?.areaEspecifica || ''
          ],
          [
            { content: 'Proceso:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.generalInfo?.proceso || '',
            { content: 'Número Permiso:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            permit.number || permit.id.substring(0, 8)
          ],
          [
            { content: 'Válido Desde:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            safeFormat(permit.generalInfo?.validFrom, 'dd/MM/yy HH:mm'),
            { content: 'Válido Hasta:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            safeFormat(permit.generalInfo?.validUntil, 'dd/MM/yy HH:mm')
          ],
          [
            { content: 'Tipos de Trabajo:', colSpan: 3, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
            getWorkTypesString(permit)
          ]
        ],
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: { 0: { cellWidth: 40 }, 2: { cellWidth: 40 } }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
  
      // ✅ ALCANCE
      autoTable(doc, {
        startY: yPos,
        head: [[{ content: 'DESCRIPCIÓN DEL TRABAJO (ALCANCE)', styles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' } }]],
        body: [[permit.generalInfo?.workDescription || 'No especificado']],
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 2, lineColor: [0, 0, 0], lineWidth: 0.1 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
  
      // ✅ ATS - PELIGROS IDENTIFICADOS
      if (permit.anexoATS?.peligros) {
        drawSectionTitle('ANÁLISIS DE TRABAJO SEGURO (ATS) - PELIGROS IDENTIFICADOS');
        const activeRisks = atsPeligros.filter(p => (permit.anexoATS?.peligros as any)?.[p.id] === 'si');
        
        if (activeRisks.length > 0) {
          const risksBySection = activeRisks.reduce((acc, r) => {
            if (!acc[r.seccion]) acc[r.seccion] = [];
            acc[r.seccion].push(r.label);
            return acc;
          }, {} as Record<string, string[]>);
  
          const riskRows = Object.entries(risksBySection).flatMap(([section, risks]) => [
            [{ content: `${section}:`, styles: { fontStyle: 'bold', fillColor: [245, 245, 245] }, colSpan: 2 }],
            ...risks.map(risk => [`✓ ${risk}`, ''])
          ]);
  
          autoTable(doc, {
            startY: yPos,
            body: riskRows,
            theme: 'grid',
            styles: { fontSize: 6, cellPadding: 1 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
      }
  
      // ✅ EPP REQUERIDOS - DETALLADO
      if (permit.anexoATS?.epp) {
        drawSectionTitle('EQUIPOS DE PROTECCIÓN PERSONAL (EPP)');
        
        const eppData: Record<string, string[]> = {};
        Object.entries(permit.anexoATS.epp).forEach(([key, value]) => {
          if (value === true || value === 'si') {
            const category = Object.entries(eppOptions).find(([_, items]) => 
              items.some(item => item.id === key)
            )?.[0] || 'Otros';
            
            if (!eppData[category]) eppData[category] = [];
            
            const itemLabel = Object.entries(eppOptions)
              .flatMap(([_, items]) => items)
              .find(item => item.id === key)?.label || key;
            
            const spec = (permit.anexoATS.epp as any)[`${key}_spec`];
            eppData[category].push(spec ? `${itemLabel} - ${spec}` : itemLabel);
          }
        });
  
        if (Object.keys(eppData).length > 0) {
          const eppRows = Object.entries(eppData).flatMap(([category, items]) => [
            [{ content: `${category}:`, styles: { fontStyle: 'bold', fillColor: [245, 245, 245] }, colSpan: 2 }],
            ...items.map(item => [`• ${item}`, ''])
          ]);
  
          autoTable(doc, {
            startY: yPos,
            body: eppRows,
            theme: 'grid',
            styles: { fontSize: 6, cellPadding: 1 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
      }
  
      // ✅ JUSTIFICACIÓN DE USO
      if (permit.anexoATS?.justificacion) {
        drawSectionTitle('JUSTIFICACIÓN DE USO DEL PERMISO');
        const justSelected = justificacionOptions.find(j => 
          (permit.anexoATS?.justificacion as any)?.[j.id] === 'si'
        );
        
        if (justSelected) {
          autoTable(doc, {
            startY: yPos,
            body: [[justSelected.label]],
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 2 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
      }
  
      // ✅ PERSONAL AUTORIZADO
      if (permit.workers && permit.workers.length > 0) {
        drawSectionTitle('PERSONAL AUTORIZADO');
        const workerRows = permit.workers.map(w => [
          `${w.nombre}\nC.C. ${w.cedula}`,
          w.rol === 'Otro' ? w.otroRol : w.rol,
          (w.eps ? 'EPS ' : '') + (w.arl ? 'ARL ' : '') + (w.pensiones ? 'AFP' : ''),
          (w.entrenamiento?.tec ? 'TEC' : w.entrenamiento?.tsa ? 'TSA' : 'Otro'),
          w.firmaApertura ? 'FIRMADO' : 'PENDIENTE'
        ]);
        
        autoTable(doc, {
          startY: yPos,
          head: [['NOMBRE / CÉDULA', 'ROL', 'AFILIACIÓN', 'ENTRENAMIENTO', 'FIRMA APERTURA']],
          body: workerRows,
          theme: 'grid',
          headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 7 },
          styles: { fontSize: 6, cellPadding: 1.5 }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
      }
  
      // ✅ AUTORIZACIONES
      checkPageBreak(40);
      drawSectionTitle('AUTORIZACIONES Y FIRMAS APERTURA');
      const sigBoxW = (pageWidth - (2 * margin)) / 3;
      const sigBoxH = 35;
      
      drawSignatureBox('SOLICITANTE', permit.approvals?.solicitante, margin, yPos, sigBoxW, sigBoxH);
      drawSignatureBox('AUTORIZANTE', permit.approvals?.autorizante, margin + sigBoxW, yPos, sigBoxW, sigBoxH);
      drawSignatureBox('SST', permit.approvals?.lider_sst, margin + 2 * sigBoxW, yPos, sigBoxW, sigBoxH);
      yPos += sigBoxH + 5;
  
      // ===== ANEXOS DINÁMICOS =====
  
      // ✅ ANEXO 1: TRABAJO EN ALTURAS (SOLO SI ESTÁ SELECCIONADO)
      if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
        checkPageBreak(100);
        drawSectionTitle('ANEXO 1 - TRABAJO EN ALTURAS');
        
        // Información general
        autoTable(doc, {
          startY: yPos,
          body: [
            [
              { content: 'Altura Aproximada (m):', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              permit.anexoAltura.alturaAproximada || 'N/A'
            ],
            [
              { content: 'Tipo de Estructura:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              Object.keys(permit.anexoAltura.tipoEstructura || {})
                .filter(k => (permit.anexoAltura?.tipoEstructura as any)[k])
                .map(k => {
                  const label = anexoAlturaEstructuras.find(e => e.id === k)?.label || k;
                  if (k === 'otros') {
                    const cual = (permit.anexoAltura?.tipoEstructura as any).otrosCual;
                    return cual ? `${label} - ${cual}` : label;
                  }
                  return label;
                })
                .join(', ')
            ]
          ],
          theme: 'grid',
          styles: { fontSize: 7, cellPadding: 1.5 },
          columnStyles: { 0: { cellWidth: 50 } }
        });
        yPos = (doc as any).lastAutoTable.finalY + 3;
        
        // Aspectos de seguridad
        const alturaChecks = anexoAlturaAspectos.map(asp => [
          asp.label,
          (permit.anexoAltura?.aspectosSeguridad as any)?.[asp.id] === 'si' ? '✓ SÍ' : '✗ NO'
        ]);
        
        autoTable(doc, {
          startY: yPos,
          head: [['REQUISITOS DE SEGURIDAD', 'CUMPLE']],
          body: alturaChecks,
          theme: 'grid',
          styles: { fontSize: 6, cellPadding: 1 },
          headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
          columnStyles: { 1: { halign: 'center', cellWidth: 20 } }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
  
        // Validación diaria
        if (permit.anexoAltura.validacion?.responsable?.length || permit.anexoAltura.validacion?.autoridad?.length) {
          drawDailyValidationTable(permit.anexoAltura.validacion, permitDuration);
        }
  
        // Firma del Coordinador de Alturas
        if (permit.approvals?.coordinador_alturas?.status === 'aprobado') {
          checkPageBreak(15);
          drawSectionTitle('FIRMA COORDINADOR DE TRABAJOS EN ALTURAS');
          drawSignatureBox('COORDINADOR', permit.approvals.coordinador_alturas, margin, yPos, pageWidth - 2 * margin, 30);
          yPos += 35;
        }
      }
  
      // ✅ ANEXO 2: ESPACIOS CONFINADOS (SOLO SI ESTÁ SELECCIONADO)
      if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
        checkPageBreak(80);
        drawSectionTitle('ANEXO 2 - ESPACIOS CONFINADOS');
  
        // Pruebas de gases iniciales
        autoTable(doc, {
          startY: yPos,
          head: [['PARÁMETRO', 'VALOR', 'LÍMITE PERMISIBLE', 'CUMPLE']],
          body: [
            ['LEL (%)', permit.anexoConfinado.resultadosPruebasGases?.lel || '-', '0%', (permit.anexoConfinado.resultadosPruebasGases?.lel === '0%') ? '✓' : '✗'],
            ['O2 (%)', permit.anexoConfinado.resultadosPruebasGases?.o2 || '-', '19.5-22%', ((permit.anexoConfinado.resultadosPruebasGases?.o2 || '').includes('19.5') || (permit.anexoConfinado.resultadosPruebasGases?.o2 || '').includes('22')) ? '✓' : '?'],
            ['H2S (PPM)', permit.anexoConfinado.resultadosPruebasGases?.h2s || '-', '0-10', '?'],
            ['CO (PPM)', permit.anexoConfinado.resultadosPruebasGases?.co || '-', '0-25', '?']
          ],
          theme: 'grid',
          headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 7 },
          styles: { halign: 'center', fontSize: 6, cellPadding: 1 }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
  
        // Pruebas periódicas
        if (permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.length) {
          autoTable(doc, {
            startY: yPos,
            head: [['HORA', 'LEL %', 'O2 %', 'H2S ppm', 'CO ppm']],
            body: permit.anexoConfinado.pruebasGasesPeriodicas.pruebas.map(p => [
              p.hora, p.lel, p.o2, p.h2s, p.co
            ]),
            theme: 'grid',
            headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontSize: 7 },
            styles: { halign: 'center', fontSize: 6, cellPadding: 1 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
  
        // Validación diaria
        if (permit.anexoConfinado.validacion?.responsable?.length || permit.anexoConfinado.validacion?.autoridad?.length) {
          drawDailyValidationTable(permit.anexoConfinado.validacion, permitDuration);
        }
      }
  
      // ✅ ANEXO 3: CONTROL DE ENERGÍAS (SOLO SI ESTÁ SELECCIONADO)
      if (permit.selectedWorkTypes?.energia && permit.anexoEnergias) {
        checkPageBreak(40);
        drawSectionTitle('ANEXO 3 - CONTROL DE ENERGÍAS');
  
        const energiasActivas = Object.entries(permit.anexoEnergias.energiasPeligrosas || {})
          .filter(([_, value]) => value)
          .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim());
  
        if (energiasActivas.length > 0) {
          autoTable(doc, {
            startY: yPos,
            head: [['TIPOS DE ENERGÍA IDENTIFICADOS']],
            body: energiasActivas.map(e => [e]),
            theme: 'grid',
            headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
            styles: { fontSize: 7, cellPadding: 1 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
  
        // Método de control
        if (permit.anexoEnergias.metodosControl) {
          autoTable(doc, {
            startY: yPos,
            body: [
              ['Método Seleccionado:', Object.keys(permit.anexoEnergias.metodosControl).filter(k => (permit.anexoEnergias?.metodosControl as any)[k]).join(', ')]
            ],
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 1.5 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
  
        // Información de voltaje si aplica
        if (permit.anexoEnergias.sistemaElectrico?.tensionNominal) {
          autoTable(doc, {
            startY: yPos,
            body: [
              ['Tensión Nominal Sistema:', permit.anexoEnergias.sistemaElectrico.tensionNominal],
              ['Tensión Personal Expuesto:', permit.anexoEnergias.sistemaElectrico.tensionPersonal || '-'],
              ['Distancia de Seguridad:', permit.anexoEnergias.sistemaElectrico.distanciaSeguridad || '-']
            ],
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 1 }
          });
          yPos = (doc as any).lastAutoTable.finalY + 5;
        }
      }
  
      // ✅ ANEXO 4: IZAJE DE CARGAS (SOLO SI ESTÁ SELECCIONADO)
      if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
        checkPageBreak(60);
        drawSectionTitle('ANEXO 4 - IZAJE DE CARGAS');
  
        autoTable(doc, {
          startY: yPos,
          body: [
            [
              { content: 'Acción:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              Object.entries(permit.anexoIzaje.informacionGeneral.accion || {})
                .filter(([, v]) => v)
                .map(([k]) => k)
                .join(', ')
            ],
            [
              { content: 'Rango de Peso:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {})
                .filter(([, v]) => v)
                .map(([k]) => k.replace('menor', '< ').replace('mas', '> ').replace('entre', '')).join(', ') + ' kg'
            ],
            [
              { content: 'Equipo a Utilizar:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {})
                .filter(([, v]) => v)
                .map(([k]) => k.replace(/([A-Z])/g, ' $1').toUpperCase()).join(', ')
            ]
          ],
          theme: 'grid',
          styles: { fontSize: 7, cellPadding: 1.5 },
          columnStyles: { 0: { cellWidth: 50 } }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
  
        // Validación diaria
        if (permit.anexoIzaje.validacion?.responsable?.length || permit.anexoIzaje.validacion?.autoridad?.length) {
          drawDailyValidationTable(permit.anexoIzaje.validacion, permitDuration);
        }
      }
  
      // ✅ ANEXO 5: EXCAVACIONES (SOLO SI ESTÁ SELECCIONADO)
      if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
        checkPageBreak(60);
        drawSectionTitle('ANEXO 5 - EXCAVACIONES');
  
        autoTable(doc, {
          startY: yPos,
          body: [
            [
              { content: 'Profundidad:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              permit.anexoExcavaciones.informacionGeneral.profundidad || 'N/A'
            ],
            [
              { content: 'Ancho:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              permit.anexoExcavaciones.informacionGeneral.ancho || 'N/A'
            ],
            [
              { content: 'Largo:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
              permit.anexoExcavaciones.informacionGeneral.largo || 'N/A'
            ]
          ],
          theme: 'grid',
          styles: { fontSize: 7, cellPadding: 1.5 },
          columnStyles: { 0: { cellWidth: 30 } }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
  
        // Validación diaria
        if (permit.anexoExcavaciones.validacion?.responsable?.length || permit.anexoExcavaciones.validacion?.autoridad?.length) {
          drawDailyValidationTable(permit.anexoExcavaciones.validacion, permitDuration);
        }
      }
  
      // ✅ CIERRE Y CANCELACIÓN (SI APLICA)
      if (permit.closure && (permit.closure.terminado || permit.closure.cancelado)) {
        checkPageBreak(50);
        drawSectionTitle('CIERRE O CANCELACIÓN DEL PERMISO');
  
        if (permit.closure.cancelado) {
          autoTable(doc, {
            startY: yPos,
            body: [
              [{ content: 'CANCELACIÓN', styles: { fontStyle: 'bold', fillColor: [255, 200, 200] } }],
              ['Razón:', permit.closure.razonCancelacion || 'No especificado'],
              ['Cancelado por:', permit.closure.canceladoPor?.nombre || 'N/A'],
              ['Fecha:', safeFormat(permit.closure.canceladoPor?.fecha, 'dd/MM/yy HH:mm')]
            ],
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 1.5 }
          });
        } else {
          autoTable(doc, {
            startY: yPos,
            body: [
              [{ content: 'CIERRE', styles: { fontStyle: 'bold', fillColor: [200, 220, 255] } }],
              ['Observaciones:', permit.closure.observacionesCierre || 'No especificado'],
              ['Responsable:', permit.closure.responsable?.nombre || 'N/A'],
              ['Autoridad:', permit.closure.autoridad?.nombre || 'N/A'],
              ['Fecha Cierre:', safeFormat(permit.closure.responsable?.fecha, 'dd/MM/yy HH:mm')]
            ],
            theme: 'grid',
            styles: { fontSize: 7, cellPadding: 1.5 }
          });
        }
        yPos = (doc as any).lastAutoTable.finalY + 5;
      }
  
      // FOOTER EN TODAS LAS PÁGINAS
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150);
        doc.text(
          `Página ${i} de ${totalPages} | Documento: DN-FR-SST-016 V04`,
          pageWidth / 2,
          pageHeight - 8,
          { align: 'center' }
        );
      }
  
      // GUARDAR PDF
      doc.save(`Permiso_Italcol_${permit.number || permit.id.substring(0, 6)}.pdf`);
      
      toast({
        title: '✓ PDF Generado',
        description: 'Se ha descargado el formato oficial completo.',
        className: 'bg-green-100'
      });
  
    } catch (error: any) {
      console.error('Error al generar el PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Error al Generar PDF',
        description: error.message || 'No se pudo generar el PDF.'
      });
    }
  };
 
  const openDailyValidationSignatureDialog = (anexo: string, type: 'autoridad' | 'responsable', index: number) => {
    if (!currentUser) return;
    setDailyValidationTarget({ anexo, type, index });
    const name = type === 'responsable' ? permit?.user?.displayName : permit?.approvals?.autorizante?.userName;
    setDailyValidationName(name || currentUser.displayName || '');
    setDailyValidationDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setIsDailyValidationSignatureOpen(true);
  };
  

  const openSignatureDialog = (role: SignatureRole | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', signatureType: 'firmaApertura' | 'firmaCierre') => {
      if(!currentUser) return;
      setSigningRole({role, type: signatureType});
      setSignatureObservation(""); // Limpiar observaciones anteriores
      if (role === 'coordinador_alturas' || role.startsWith('cierre_') || role === 'cancelacion') {
          setSignerName('');
      } else {
          setSignerName(currentUser?.displayName || '');
      }
      setIsSignatureDialogOpen(true);
  }

  const handleSaveSignature = async (signatureDataUrl: string) => {
    if (!permit || !currentUser || !signingRole) return;
    
    const isSpecialSignature = signingRole.role === 'coordinador_alturas' || signingRole.role.startsWith('cierre_') || signingRole.role === 'cancelacion';
    if (isSpecialSignature && !signerName.trim()) {
        toast({
            variant: 'destructive',
            title: 'Nombre Requerido',
            description: 'Por favor, ingrese el nombre.',
        });
        return;
    }

    setIsSigning(true);

    try {
        const simpleUser = {
            uid: currentUser.uid,
            displayName: isSpecialSignature ? signerName : currentUser.displayName || null,
            role: currentUser.role,
            empresa: currentUser.empresa || 'N/A'
        };
        
        const result = await addSignatureAndNotify(
            permit.id,
            signingRole.role,
            signingRole.type,
            signatureDataUrl,
            simpleUser,
            signatureObservation
        );

        if (result.success) {
            toast({
                title: 'Firma Registrada',
                description: `${simpleUser.displayName} ha firmado exitosamente.`,
            });
            setIsSignatureDialogOpen(false);
            setSigningRole(null);
            setSignerName('');
            setSignatureObservation('');
        } else {
            throw new Error(result.error || 'No se pudo guardar la firma.');
        }
    } catch (e: any) {
        toast({
            variant: 'destructive',
            title: 'Error al firmar',
            description: e.message || 'Ocurrió un error inesperado.',
        });
    } finally {
        setIsSigning(false);
    }
  }

  const handleChangeStatus = async (newStatus: PermitStatus, reason?: string) => {
    if (!permit || !currentUser || !currentUser.role) return;
    setIsStatusChanging(true);
    try {
      const result = await updatePermitStatus(permit.id, newStatus, { uid: currentUser.uid, displayName: currentUser.displayName, role: currentUser.role }, reason);
      if (result.success) {
        toast({
          title: 'Estado Actualizado',
          description: `El permiso ahora está ${getStatusInfo(newStatus).text}.`,
          className: 'bg-green-100 dark:bg-green-900',
        });
        if(isRejectionDialogOpen) setIsRejectionDialogOpen(false);
        if(rejectionReason) setRejectionReason("");
        if(isClosureDialogOpen) setIsClosureDialogOpen(false);
        if(isCancellationDialogOpen) setIsCancellationDialogOpen(false);
      } else {
        throw new Error(result.error || 'No se pudo actualizar el estado.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error.message,
      });
    } finally {
      setIsStatusChanging(false);
    }
  };


  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };
  
  const isSSTSignatureRequired = permit?.isSSTSignatureRequired;
  
  const canSign = (role: SignatureRole): { can: boolean; reason?: string } => {
    if (!currentUser || !permit || !permit.approvals) return { can: false, reason: 'Cargando datos...' };
    const { status, approvals, selectedWorkTypes, createdBy } = permit;

    if (['rechazado', 'cerrado', 'suspendido'].includes(status)) {
        return { can: false, reason: `El permiso está ${status}.` };
    }
    
    // Permitir firmar si está pendiente o incluso si ya está en ejecución (para firmas secundarias)
    if (status !== 'pendiente_revision' && status !== 'borrador' && status !== 'en_ejecucion') {
         return { can: false, reason: 'Las firmas de apertura ya están cerradas.' };
    }
    
    const { solicitante, autorizante, mantenimiento, lider_sst, coordinador_alturas } = approvals;
    const hasSigned = (approval: Partial<Approval> | undefined) => approval?.status === 'aprobado';

    const hasCorrectRole = (targetRole: UserRole | UserRole[]) => {
      if (currentUser.role === 'admin') return true;
      if (Array.isArray(targetRole)) {
          return targetRole.includes(currentUser.role!);
      }
      return currentUser.role === targetRole;
    }
    
    const isCreator = currentUser.uid === createdBy;

    if (hasSigned((permit.approvals as any)[role])) {
        return { can: false, reason: 'Ya has firmado.' };
    }
    
    switch (role) {
        case 'coordinador_alturas':
            if (!selectedWorkTypes?.alturas) return { can: false, reason: 'No se requiere para este trabajo.' };
            if (!isCreator && !hasCorrectRole('admin')) return { can: false, reason: 'Solo el creador del permiso puede gestionar esta firma.' };
            return { can: true };

        case 'solicitante':
            if (!isCreator && !hasCorrectRole('admin')) return { can: false, reason: 'Solo el creador del permiso puede firmar.' };
            if (selectedWorkTypes?.alturas && !hasSigned(coordinador_alturas)) {
                return { can: false, reason: 'Esperando firma del Coordinador de Trabajos en Alturas.' };
            }
            return { can: true };
        
        case 'lider_sst':
            if (!isSSTSignatureRequired) return { can: false, reason: 'Firma de SST no requerida para esta tarea.' };
            if (!hasCorrectRole('lider_sst')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(solicitante)) return { can: false, reason: 'Esperando firma del Solicitante.' };
            return { can: true };

        case 'autorizante':
            if (!hasCorrectRole('autorizante')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(solicitante)) return { can: false, reason: 'Esperando firma del Solicitante.' };
            return { can: true };

        case 'mantenimiento':
            if (!permit.controlEnergia) return { can: false, reason: 'No se requiere para este trabajo.' };
            if (!hasCorrectRole('mantenimiento')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(autorizante)) return { can: false, reason: 'Esperando firma del Autorizante.' };
            return { can: true };

        default:
            return { can: false, reason: 'Rol de firma no reconocido.' };
    }
  };


  const getClosureStatus = () => {
    if (!permit) return { can: false, reasons: ['Cargando permiso...'] };
    const reasons: string[] = [];
  
    // Condición 1: Rol de usuario
    if (currentUser?.role !== 'lider_tarea' && currentUser?.role !== 'admin') {
      // Esta condición ya está en canChangeStatus, pero la mantenemos por claridad
    }
  
    // Condición 2: Estado del permiso
    if (permit.status !== 'en_ejecucion' && permit.status !== 'suspendido') {
      reasons.push(`El permiso debe estar 'En Ejecución' o 'Suspendido' (actual: ${getStatusInfo(permit.status).text}).`);
    }
  
    // Condición 3: Todas las firmas de cierre de trabajadores deben estar completas
    // SOLO si el permiso tiene trabajadores y está en proceso de cierre
    if (permit.status === 'en_ejecucion' || permit.status === 'suspendido') {
      const workersNeedingClosureSignature = permit.workers?.filter(w => !w.firmaCierre) || [];
      if (workersNeedingClosureSignature.length > 0) {
        reasons.push(`Faltan firmas de cierre de ${workersNeedingClosureSignature.length} trabajador(es).`);
      }
    }
  
    // Condición 4: El responsable y la autoridad deben firmar el cierre final.
    if (!permit.closure?.responsable?.firma) {
      reasons.push('Falta la firma de cierre del Responsable del Trabajo.');
    }
    if (!permit.closure?.autoridad?.firma) {
      reasons.push('Falta la firma de cierre de la Autoridad del Área.');
    }
  
    // Condición 5: Todas las firmas diarias deben estar completas.
    const checkDailyValidations = (anexoData: any, anexoName: string) => {
      if (!anexoData?.validacion) return;
      let duration = 1;
      if (permit.generalInfo?.validFrom && permit.generalInfo?.validUntil) {
        try {
          duration = differenceInCalendarDays(parseISO(permit.generalInfo.validUntil), parseISO(permit.generalInfo.validFrom)) + 1;
        } catch (e) { /* ignore */ }
      }
  
      for (let i = 0; i < duration; i++) {
        if (!anexoData.validacion.responsable?.[i]?.firma) {
          reasons.push(`Falta validación diaria del Responsable (Día ${i + 1}) en ${anexoName}.`);
        }
        if (!anexoData.validacion.autoridad?.[i]?.firma) {
          reasons.push(`Falta validación diaria de la Autoridad (Día ${i + 1}) en ${anexoName}.`);
        }
      }
    };
  
    if (permit.selectedWorkTypes?.alturas) checkDailyValidations(permit.anexoAltura, 'Anexo Alturas');
    if (permit.selectedWorkTypes?.confinado) checkDailyValidations(permit.anexoConfinado, 'Anexo Confinado');
    if (permit.selectedWorkTypes?.izaje) checkDailyValidations(permit.anexoIzaje, 'Anexo Izaje');
    if (permit.selectedWorkTypes?.excavacion) checkDailyValidations(permit.anexoExcavaciones, 'Anexo Excavaciones');
    
    return {
      can: reasons.length === 0,
      reasons: reasons,
    };
  };

    const canChangeStatus = (newStatus: 'cerrado' | 'en_ejecucion'): boolean => {
      if (!currentUser || !permit) return false;
      const hasRole = currentUser.role === 'lider_tarea' || currentUser.role === 'admin';
      
      if (newStatus === 'en_ejecucion') {
          return hasRole && permit.status === 'aprobado';
      }

      if (newStatus === 'cerrado') {
          // La lógica detallada está en getClosureStatus, aquí solo verificamos rol y estado base.
          return hasRole && (permit.status === 'en_ejecucion' || permit.status === 'suspendido');
      }

      return false;
    };


  const handleOpenClosureDialog = () => {
    if (!permit) return;
    const { user, approvals } = permit;

    // Pre-rellenar nombres
    const responsableName = user?.displayName || '';
    const autoridadName = approvals?.autorizante?.userName || '';
    
    const updates: Partial<Permit['closure']> = { ...permit.closure };
    if (!updates.responsable) updates.responsable = {};
    if (!updates.autoridad) updates.autoridad = {};
    
    let needsUpdate = false;
    if (updates.responsable.nombre !== responsableName) {
      updates.responsable.nombre = responsableName;
      needsUpdate = true;
    }
    if (updates.autoridad.nombre !== autoridadName) {
      updates.autoridad.nombre = autoridadName;
      needsUpdate = true;
    }

    if (needsUpdate) {
      setPermit(prev => prev ? ({ ...prev, closure: { ...prev.closure, ...updates } }) : null);
    }

    setIsClosureDialogOpen(true);
  };
  
  const handleOpenCancellationDialog = () => {
      setCancellationReason(""); // Limpiar razón anterior
      setIsCancellationDialogOpen(true);
  };
  
  const handleConfirmCancellation = async () => {
      if (!cancellationReason.trim()) {
          toast({ variant: 'destructive', title: 'Motivo Requerido', description: 'Debe especificar un motivo para la cancelación.' });
          return;
      }
      // Se utiliza la misma acción de firma, pero con un rol especial
      if (!permit || !currentUser) return;
      setIsSigning(true);
      try {
        const result = await addSignatureAndNotify(permit.id, 'cancelacion', 'firmaCierre', '', { uid: currentUser.uid, displayName: currentUser.displayName, role: currentUser.role }, cancellationReason);
        if(result.success) {
            await handleChangeStatus('rechazado', `Cancelado: ${cancellationReason}`);
            setIsCancellationDialogOpen(false);
        } else {
            throw new Error(result.error);
        }
      } catch (e: any) {
          toast({ variant: 'destructive', title: 'Error al Cancelar', description: e.message });
      } finally {
          setIsSigning(false);
      }
  };

  const handleSaveDailyValidationSignature = async (signature: string) => {
    if (!permit || !dailyValidationTarget || !dailyValidationName.trim() || !dailyValidationDate || !currentUser) {
        toast({ variant: 'destructive', title: 'Faltan datos', description: 'Por favor, complete nombre y fecha.' });
        return;
    }

    setIsDailyValidationSigning(true);
    try {
        const result = await addDailyValidationSignature(
            permit.id,
            dailyValidationTarget.anexo,
            dailyValidationTarget.type,
            dailyValidationTarget.index,
            {
                dia: dailyValidationTarget.index + 1,
                nombre: dailyValidationName,
                fecha: dailyValidationDate,
                firma: signature,
            },
            currentUser as User
        );

        if (result.success) {
            toast({ title: 'Validación Diaria Guardada' });
        } else {
            throw new Error(result.error);
        }
    } catch (e: any) {
        toast({ variant: 'destructive', title: 'Error al Guardar', description: e.message });
    } finally {
        setIsDailyValidationSigning(false);
        setIsDailyValidationSignatureOpen(false);
        setDailyValidationTarget(null);
        setDailyValidationName('');
        setDailyValidationDate('');
    }
  };

  const openWorkerSignatureDialog = (index: number, type: 'firmaApertura' | 'firmaCierre') => {
    setWorkerSignatureTarget({ index, type });
    setIsWorkerSignatureOpen(true);
  };

  const handleSaveWorkerSignature = async (signature: string) => {
    if (!permit || workerSignatureTarget === null) return;
    
    setIsSigning(true);
    try {
      const result = await addWorkerSignature(
        permit.id,
        workerSignatureTarget.index,
        workerSignatureTarget.type,
        signature
      );
      if (result.success) {
        toast({ title: 'Firma de trabajador guardada.' });
        setIsWorkerSignatureOpen(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error al guardar firma', description: error.message });
    } finally {
      setIsSigning(false);
    }
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
      <div className="flex flex-col h-screen items-center justify-center text-center p-4">
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
  
  const statusInfo = getStatusInfo(permit.status);
  const canBeCancelled = ['pendiente_revision', 'aprobado', 'en_ejecucion'].includes(permit.status) && (currentUser?.role === 'admin' || currentUser?.role === 'autorizante' || currentUser?.role === 'lider_sst');
  const closureStatus = getClosureStatus();

  const getWorkTypesString = (permit: Permit): string => {
    const workTypes: string[] = [];
    if (!permit.selectedWorkTypes) return 'Trabajo General';

    if (permit.selectedWorkTypes.alturas) workTypes.push('Trabajo en Alturas');
    if (permit.selectedWorkTypes.confinado) workTypes.push('Espacios Confinados');
    if (permit.selectedWorkTypes.energia) workTypes.push('Control de Energías');
    if (permit.selectedWorkTypes.izaje) workTypes.push('Izaje de Cargas');
    if (permit.selectedWorkTypes.excavacion) workTypes.push('Excavaciones');
    if (permit.selectedWorkTypes.general) workTypes.push('Trabajo General');
    
    return workTypes.length > 0 ? workTypes.join(', ') : 'Trabajo General';
  };

 

 const atsPeligrosAgrupados = atsPeligros.reduce((acc, peligro) => {
    if (!acc[peligro.seccion]) {
        acc[peligro.seccion] = [];
    }
    acc[peligro.seccion].push(peligro);
    return acc;
 }, {} as {[key: string]: typeof atsPeligros});

 const eppOptions = {
    'Protección Cabeza, Visual, Auditiva y Respiratoria': [
      { id: 'casco_seguridad', label: 'Casco de seguridad', type: 'custom_casco' },
      { id: 'gafas_seguridad', label: 'Gafas de seguridad', type: 'boolean' },
      { id: 'gafas_oxicorte', label: 'Gafas de oxicorte', type: 'boolean' },
      { id: 'monogafas', label: 'Monogafas', type: 'boolean' },
      { id: 'careta_soldador', label: 'Careta de soldador', type: 'boolean' },
      { id: 'careta_proteccion_total', label: 'Careta de protección total', type: 'boolean' },
      { id: 'gafas_antisalpicaduras', label: 'Gafas antisalpicaduras', type: 'boolean' },
      { id: 'visor_careta', label: 'Visor / careta para', type: 'text' },
      { id: 'careta_arco_electrico', label: 'Careta arco eléctrico clase', type: 'text' },
      { id: 'protector_auditivo', label: 'Protector auditivo tipo:', type: 'select', selectOptions: ['Copa', 'Inserción'] },
      { id: 'mascarilla_filtro', label: 'Mascarilla con filtro', type: 'text' },
      { id: 'chavo_en_tela_o_carnaza', label: 'Chavo en tela o carnaza', type: 'boolean' },
      { id: 'mascarilla_material_particulado', label: 'Mascarilla material particulado', type: 'boolean' },
    ],
    'Protección Corporal, Manos y Pies': [
      { id: 'overol_trabajo', label: 'Overol de trabajo', type: 'boolean' },
      { id: 'overol_ignifugo', label: 'Overol ignífugo clase', type: 'text' },
      { id: 'chaleco_reflectivo', label:'Chaleco reflectivo', type: 'boolean' },
      { id: 'chaqueta_cuero_carnaza', label: 'Chaqueta de cuero o carnaza', type: 'boolean' },
      { id: 'delantal_cuero_carnaza', label: 'Delantal de cuero o carnaza', type: 'boolean' },
      { id: 'delantal_pvc', label: 'Delantal de PVC', type: 'boolean' },    
      { id: 'polainas', label: 'Polainas', type: 'boolean' },
      { id: 'guante_dielectrico', label: 'Guante dieléctrico clase (guantín, guante dieléctrico, protección mecánica)', type: 'text' },
      { id: 'guante_caucho_nitrilo', label: 'Guante de caucho y/o nitrilo', type: 'boolean' },
      { id: 'guante_cuero_carnaza', label: 'Guante de cuero o carnaza', type: 'boolean' },
      { id: 'guante_vaqueta_anticorte', label: 'Guante de vaqueta o Anticorte', type: 'boolean' },
      { id: 'guante_temperatura', label: 'Guante temperatura', type: 'boolean' },
      { id: 'botas_seguridad', label: 'Botas de seguridad', type: 'boolean' },
      { id: 'botas_caucho_seguridad', label: 'Botas de caucho de seguridad', type: 'boolean' },
      { id: 'botas_dielectricas', label: 'Botas dieléctricas', type: 'boolean' },
      { id: 'proteccion_metatarso', label: 'Protección Metatarso', type: 'boolean' },
    ],
    'Protección Contra Caídas y Equipos Especiales': [
      { id: 'arnes', label: 'Arnés', type: 'text' },
      { id: 'mosqueton', label: 'Mosquetón', type: 'boolean' },
      { id: 'punto_de_anclaje', label: 'Punto de anclaje (cual)', type: 'text' },
      { id: 'eslinga', label: 'Eslinga tipo/absorbedor', type: 'text' },
      { id: 'linea_vida', label: 'Línea de vida', type: 'text' },
      { id: 'adaptador_anclaje', label: 'Adaptador de anclaje', type: 'text' },
      { id: 'aire_respirable', label: 'Aire respirable (compresor o cilindro)', type: 'boolean' },
      { id: 'tapete_dielectrico', label: 'Tapete dieléctrico clase', type: 'text' },
      { id: 'senalizacion', label: 'Señalización', type: 'boolean' },
      { id: 'barandas', label: 'Barandas', type: 'boolean' },
      { id: 'delimitacion_perimetral', label: 'Delimitación perímetro', type: 'boolean' },
      { id: 'control_acceso', label: 'Control acceso', type: 'boolean' },
      { id: 'otro_epp', label: 'Otro:', type: 'text' },
    ],
};
  
  const justificacionOptions = [
    { id: 'rutinario_3_meses', label: 'TRABAJO RUTINARIO REALIZADO 1 VEZ CADA 3 MESES' },
    { id: 'no_rutinario_emergencia', label: 'TRABAJO NO RUTINARIO (EMERGENCIA)' },
    { id: 'rutinario_sin_procedimiento', label: 'TRABAJO RUTINARIO QUE NO POSEE UN PROCEDIMIENTO SEGURO DE TRABAJO O INDICACIÓN CORRECTA DE RIESGOS O MEDIDAS PREVENTIVAS' },
    { id: 'no_rutinario_planeado', label: 'TRABAJO NO RUTINARIO (PLANEADO)' },
    { id: 'rutinario_condicion_especifica', label: 'TRABAJO RUTINARIO QUE POR UNA CONDICIÓN ESPECÍFICA/TEMPORAL, NO ES POSIBLE APLICAR UN PROCEDIMIENTO DE FORMA INTEGRAL' },
  ];
  
    const anexoAlturaEstructuras = [
      { id: 'escaleraCuerpo', label: 'Escalera de un cuerpo' },
      { id: 'escaleraDosCuerpos', label: 'Escalera de dos cuerpos o mas' },
      { id: 'andamioTubular', label: 'Andamio Tubular Certificado' },
      { id: 'andamioColgante', label: 'Andamio Colgante' },
      { id: 'plataforma', label: 'Plataforma' },
      { id: 'manLift', label: 'Man Lift o Camion Canasta' },
      { id: 'otros', label: 'Otros' },
    ];
    
    const emergenciasItems = [
        { id: 'notificacion', label: 'NOTIFICACIÓN: El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados del trabajo a realizar' },
        { id: 'recordarVerificar', label: 'EMERGENCIAS: Recordar y verificar' },
        { id: 'potenciales', label: 'A.- Las emergencias potenciales que pueden ocurrir' },
        { id: 'procedimientos', label: 'B.- Los procedimientos establecidos para tales situaciones.' },
        { id: 'rutasEvacuacion', label: 'C.- Rutas de Evacuación' },
        { id: 'puntosEncuentro', label: 'D.- Puntos de encuentro' },
        { id: 'equiposEmergencia', label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo' },
        { id: 'ubicacionBrigadistas', label: 'F.- Ubicación de Brigadistas cercanos' },
    ];
    
    
    const SignatureCard: React.FC<{ role: SignatureRole }> = ({ role }) => {
        const approval = permit.approvals?.[role as keyof typeof permit.approvals];
        const { can, reason } = canSign(role);
        const consentText = signatureConsents[role];

        const SignButton = () => (
            <Button onClick={() => openSignatureDialog(role, 'firmaApertura')} disabled={!can || isSigning} className="flex-1">
                {isSigning ? <Loader2 className="animate-spin" /> : <SignatureIcon className="mr-2"/>} Firmar Apertura
            </Button>
        );
        
        const roleNames: { [key in UserRole]: string } = {
          solicitante: 'Solicitante',
          autorizante: 'Autorizante',
          lider_tarea: 'Líder de Tarea',
          ejecutante: 'Ejecutante',
          lider_sst: 'Líder SST',
          admin: 'Administrador',
          mantenimiento: 'Mantenimiento'
        };

        const getRoleDisplayName = () => {
            if (role === 'coordinador_alturas') {
                return 'Coordinador de Trabajo en Alturas';
            }
            if (approval?.userRole) {
                return roleNames[approval.userRole] || approval.userRole;
            }
            return null;
        };

        return (
            <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase text-gray-500">{signatureRoles[role]}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between gap-4">
                <div className="flex-grow">
                {approval?.status === 'aprobado' ? (
                    <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-bold text-sm">Aprobado</span>
                    </div>
                     <div className="text-xs space-y-1 mt-2">
                       <p>Por: <span className="font-semibold">{approval.userName}</span></p>
                       {getRoleDisplayName() && <p>Rol: <span className="font-semibold">{getRoleDisplayName()}</span></p>}
                       {approval.userEmpresa && <p>Empresa: <span className="font-semibold">{approval.userEmpresa}</span></p>}
                       <p>Fecha: {safeFormat(approval.signedAt, 'dd/MM/yy HH:mm')}</p>
                    </div>
                    {approval.firmaApertura && <Image src={approval.firmaApertura} alt={`Firma ${role}`} width={120} height={60} className="rounded border mt-2" />}
                     {approval.comments && (
                        <div className="mt-2 pt-2 border-t border-dashed">
                            <p className="text-xs font-semibold text-gray-600 flex items-center gap-1"><MessageSquare size={12}/> Observaciones:</p>
                            <p className="text-xs text-gray-500 italic">«{approval.comments}»</p>
                        </div>
                     )}
                    </div>
                ) : (
                    <div className="space-y-2">
                    <div className="flex items-center gap-2 text-yellow-600">
                        <Clock className="h-5 w-5" />
                        <span className="font-bold text-sm">Pendiente de Firma</span>
                    </div>
                    {consentText && can && (
                        <p className="text-xs text-muted-foreground mt-2 border-l-2 border-primary pl-2">
                        {consentText}
                        </p>
                    )}
                    </div>
                )}
                </div>
                <div className="flex flex-wrap gap-2">
                {can ? <SignButton /> : (
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <div className="w-full">
                            <Button disabled className="w-full flex-1">
                            <SignatureIcon className="mr-2"/> Firmar Apertura
                            </Button>
                        </div>
                        </TooltipTrigger>
                        {reason && <TooltipContent><p>{reason}</p></TooltipContent>}
                    </Tooltip>
                    </TooltipProvider>
                )}
                {role === 'solicitante' && permit.status === 'borrador' && (
                    <Button variant="outline" onClick={() => router.push(`/permits/create?edit=${permit.id}`)} className="flex-1">
                    <Edit className="mr-2"/> Modificar
                    </Button>
                )}
                </div>
            </CardContent>
            </Card>
        );
    };

    const DailyValidationTable: React.FC<{ anexoName: string; validationData?: { autoridad: ValidacionDiaria[], responsable: ValidacionDiaria[] } }> = ({ anexoName, validationData }) => {
        let durationInDays = 1;
        if (permit.generalInfo?.validFrom && permit.generalInfo?.validUntil) {
            try {
                const startDate = parseISO(permit.generalInfo.validFrom);
                const endDate = parseISO(permit.generalInfo.validUntil);
                durationInDays = differenceInCalendarDays(endDate, startDate) + 1;
            } catch (e) {
                console.error("Error parsing dates for daily validation:", e);
            }
        }

        const renderRows = (type: 'responsable' | 'autoridad') => {
            return Array.from({ length: durationInDays }, (_, i) => {
                const v = validationData?.[type]?.[i];
                let canSignValidation = false;
                let tooltipContent = "No tienes permiso para firmar.";
                
                if (permit.status === 'en_ejecucion' || permit.status === 'suspendido') {
                    if (type === 'autoridad') {
                        canSignValidation = (currentUser?.role === 'autorizante' || currentUser?.role === 'admin') && !v?.firma;
                        tooltipContent = "Solo un Autorizante o Administrador puede firmar.";
                    } else if (type === 'responsable') {
                        canSignValidation = (currentUser?.uid === permit.createdBy || currentUser?.role === 'lider_tarea') && !v?.firma;
                        tooltipContent = "Solo el creador o líder de la tarea puede firmar.";
                    }
                } else {
                    tooltipContent = "El permiso no está en ejecución.";
                }

                return (
                    <TableRow key={`${type}-${i}`}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{v?.nombre || 'N/A'}</TableCell>
                        <TableCell>
                            {v?.firma ? (
                                <Image src={v.firma} alt="Firma" width={60} height={30} className="border rounded" />
                            ) : (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDailyValidationSignatureDialog(anexoName, type, i)}
                                                disabled={!canSignValidation}
                                            >
                                                <SignatureIcon className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        {!canSignValidation && <TooltipContent><p>{tooltipContent}</p></TooltipContent>}
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </TableCell>
                        <TableCell>{safeFormat(v?.fecha, 'dd/MM/yy HH:mm')}</TableCell>
                    </TableRow>
                );
            });
        };

        return (
            <Section title="Validación Diaria">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold">Responsable del Trabajo</h4>
                        <p className="text-xs text-muted-foreground">Entiendo las condiciones y responsabilidad.</p>
                        <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>{renderRows('responsable')}</TableBody>
                        </Table>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold">Autoridad del Área</h4>
                        <p className="text-xs text-muted-foreground">Entiendo las condiciones y responsabilidad.</p>
                        <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>{renderRows('autoridad')}</TableBody>
                        </Table>
                    </div>
                </div>
            </Section>
        );
    };
  
    return (
      <div className="flex flex-1 flex-col bg-gray-50/50">
        
        {/* Header con acciones */}
        <div className="bg-white p-4 md:p-6 shadow-md sticky top-0 z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
             <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft />
                <span className="hidden sm:inline">Volver a la Lista</span>
             </Button>
             
             <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: statusInfo.bgColor }}>
                <statusInfo.icon className="h-6 w-6" style={{ color: statusInfo.color }} />
                <span className="font-bold text-sm" style={{ color: statusInfo.color }}>{statusInfo.text}</span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 flex-1">
                 {canChangeStatus('en_ejecucion') && (
                     <Button onClick={() => handleChangeStatus('en_ejecucion')}>
                         <PlayCircle className="mr-2"/>Iniciar Ejecución
                     </Button>
                 )}
                 {(permit.status === 'en_ejecucion' || permit.status === 'suspendido') && (
    <TooltipProvider>
        <Tooltip open={closureStatus.can && canChangeStatus('cerrado') ? false : undefined}>
            <TooltipTrigger asChild>
                <div>
                    <Button 
                        onClick={handleOpenClosureDialog}
                        disabled={!closureStatus.can || !canChangeStatus('cerrado')}
                    >
                        <Lock className="mr-2"/>Cerrar Permiso
                    </Button>
                </div>
            </TooltipTrigger>
            {(!closureStatus.can || !canChangeStatus('cerrado')) && (
                <TooltipContent side="bottom" className="max-w-xs">
                    {!canChangeStatus('cerrado') ? (
                        <>
                            <p className="font-semibold">Sin permisos para cerrar</p>
                            <p className="text-xs mt-1">Solo Líder de Tarea o Administrador pueden cerrar permisos.</p>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold">Requisitos pendientes para el cierre:</p>
                            <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                                {closureStatus.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                            </ul>
                        </>
                    )}
                </TooltipContent>
            )}
        </Tooltip>
    </TooltipProvider>
)}
                 <Button variant="outline" onClick={handleExportToPDF}><FileDown className="mr-2"/>Exportar a PDF</Button>
                 {canBeCancelled && (
                    <Button variant="destructive" onClick={handleOpenCancellationDialog}>
                        <FileX className="mr-2"/>Cancelar Permiso
                    </Button>
                 )}
            </div>
          </div>
        </div>

        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-8">
                
                {/* Cabecera del Permiso */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-start pb-6 border-b">
                    <div className="col-span-2 lg:col-span-1 flex items-center justify-center">
                        <Image src="https://i.postimg.cc/VsZBSkmH/Italcol.png" alt="Logo" width={150} height={75} />
                    </div>
                    <div className="col-span-2 lg:col-span-3 text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">FORMATO DE PERMISO DE TRABAJO</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-left">
                            <Field label="Código" value="SST-FOR-12" />
                            <Field label="Versión" value="4" />
                            <Field label="Fecha Vigencia" value="23-01-2023" />
                        </div>
                    </div>
                </div>

                {/* Sección de Información General */}
                <Section title="Información General">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <Field label="Número de Permiso" value={<span className="font-bold text-primary">{permit.number || permit.id.substring(0,8)}</span>} />
                        <Field label="Solicitante" value={permit.user?.displayName} />
                        <Field label="Fecha Creación" value={safeFormat(permit.createdAt, 'dd/MM/yyyy HH:mm')} />
                        <Field label="Área Específica" value={permit.generalInfo?.areaEspecifica} />
                        <Field label="Planta" value={permit.generalInfo?.planta} />
                        <Field label="Proceso" value={permit.generalInfo?.proceso} />
                        <Field label="Empresa" value={permit.generalInfo?.empresa} />
                        <Field label="Contrato" value={permit.generalInfo?.contrato} />
                        <Field label="Validez Desde" value={permit.generalInfo?.validFrom ? format(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'} />
                        <Field label="Validez Hasta" value={permit.generalInfo?.validUntil ? format(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'} />
                         <div className="md:col-span-2 lg:col-span-3">
                            <Field label="Tipos de Trabajo" value={<span className="font-semibold text-primary">{getWorkTypesString(permit)}</span>} />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                           <Field label="Descripción de la Tarea" value={<p className="text-sm whitespace-pre-wrap">{permit.generalInfo?.workDescription}</p>} />
                        </div>
                    </div>
                </Section>
                
                 {/* Anexo ATS */}
                <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold">
                        <span className="flex items-center gap-2"><Shield size={16} /> Análisis de Trabajo Seguro (ATS)</span>
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6 border border-t-0 rounded-b-lg p-4">
                        <Section title="1. Identificación de Peligros, Riesgos y Controles">
                            <div className="space-y-4">
                            {Object.entries(atsPeligrosAgrupados).map(([seccion, peligros]) => (
                                <div key={seccion}>
                                    <h4 className="font-semibold text-gray-600 mb-2">{seccion}</h4>
                                    <div className="pl-4 space-y-1">
                                        {peligros.map(peligro => (
                                            <RadioCheck 
                                              key={peligro.id} 
                                              label={peligro.label} 
                                              value={(permit.anexoATS?.peligros as any)?.[peligro.id]} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </div>
                        </Section>
                        <Section title="2. EPP Requeridos" className="mt-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                                {Object.entries(permit.anexoATS?.epp || {}).map(([key, value]) => {
                                    if (value !== true && value !== 'si' && !key.endsWith('_spec') && !key.endsWith('_tipo') && !key.startsWith('casco_seguridad_')) return null;
                                    if (key.endsWith('_spec') || key.endsWith('_tipo') || key.startsWith('casco_seguridad_')) return null;

                                    const itemDef = Object.values(eppOptions).flat().find(item => item.id === key);
                                    if (!itemDef) return <RadioCheck key={key} label={key} value={true} />;
                                    
                                    let spec = '';
                                    const eppData = permit.anexoATS?.epp as any;
                                    if (itemDef.type === 'text') spec = eppData[`${key}_spec`];
                                    else if (itemDef.type === 'select') spec = eppData[`${key}_tipo`];
                                    else if (itemDef.type === 'custom_casco') spec = [eppData.casco_seguridad_tipo, eppData.casco_seguridad_clase, eppData.casco_seguridad_barbuquejo].filter(Boolean).join(', ');

                                    return <RadioCheck key={key} label={itemDef.label} value={true} spec={spec || undefined} />;
                                })}
                            </div>
                        </Section>
                         <Section title="3. Justificación de Uso" className="mt-6">
                            {justificacionOptions.map(item => (
                                <RadioCheck 
                                    key={item.id}
                                    label={item.label}
                                    value={(permit.anexoATS?.justificacion as any)?.[item.id]}
                                />
                            ))}
                        </Section>
                    </CollapsibleContent>
                </Collapsible>

                {/* Manejo de Emergencias */}
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-red-50 px-4 py-3 text-left text-sm font-semibold">
                       <span className="flex items-center gap-2 text-red-800"><Siren size={16} /> Manejo de Emergencias</span>
                       <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 border border-t-0 rounded-b-lg p-4">
                        {emergenciasItems.map(item => (
                            <RadioCheck 
                              key={item.id} 
                              label={item.label} 
                              value={(permit.eppEmergencias?.emergencias as any)?.[item.id]} 
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>


                {/* ANEXO ALTURA */}
                {permit.selectedWorkTypes?.alturas && permit.anexoAltura && (
                    <Collapsible defaultOpen>
                       <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-blue-50 px-4 py-3 text-left text-sm font-semibold">
                          <span className="flex items-center gap-2 text-blue-800"><AlertTriangle size={16} /> Anexo: Trabajo en Alturas</span>
                          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-blue-100 space-y-6">
                           <Section title="Información General del Anexo">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Tarea a Realizar" value={permit.anexoAltura.tareaRealizar?.nombre} />
                                    <Field label="Descripción de la Tarea" value={<p className="text-sm whitespace-pre-wrap">{permit.anexoAltura.tareaRealizar?.descripcion}</p>} />
                                    <Field label="Altura Aproximada" value={`${permit.anexoAltura.alturaAproximada || 'N/A'} metros`} />
                                    <Field label="Contacto de Emergencia" value={`${permit.anexoAltura.emergencia?.contacto || 'N/A'} - ${permit.anexoAltura.emergencia?.telefono || 'N/A'}`} />
                                </div>
                            </Section>

                           <Section title="Estructura y Aspectos de Seguridad">
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                 {anexoAlturaEstructuras.map(e => (
                                     <RadioCheck 
                                        key={e.id}
                                        label={e.label}
                                        value={(permit.anexoAltura?.tipoEstructura as any)?.[e.id]}
                                        spec={e.id === 'otros' ? (permit.anexoAltura.tipoEstructura as any).otrosCual : undefined}
                                     />
                                 ))}
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                               {anexoAlturaAspectos.map(aspect => (
                                 <RadioCheck key={aspect.id} label={aspect.label} value={(permit.anexoAltura?.aspectosSeguridad as any)?.[aspect.id]} />
                               ))}
                             </div>
                           </Section>

                            <Section title="Precauciones y Controles Específicos">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    {Object.entries(permit.anexoAltura.precauciones || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />
                                    ))}
                                </div>
                            </Section>

                            <Section title="Afectaciones">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    <RadioCheck label="¿Produce riesgos para otras áreas?" value={permit.anexoAltura.afectaciones?.riesgoOtrasAreas} />
                                    <RadioCheck label="¿Otras áreas producen riesgo a este trabajo?" value={permit.anexoAltura.afectaciones?.otrasAreasRiesgo} />
                                    <RadioCheck label="¿Personal notificado?" value={permit.anexoAltura.afectaciones?.personalNotificado} />
                                </div>
                                <Field label="Observaciones" value={<p className="text-sm whitespace-pre-wrap">{permit.anexoAltura.afectaciones?.observaciones}</p>} />
                            </Section>

                           <DailyValidationTable anexoName="anexoAltura" validationData={permit.anexoAltura.validacion} />
                       </CollapsibleContent>
                   </Collapsible>
                )}
                
                {/* ANEXO CONFINADO */}
                {permit.selectedWorkTypes?.confinado && permit.anexoConfinado && (
                   <Collapsible defaultOpen>
                       <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-purple-50 px-4 py-3 text-left text-sm font-semibold">
                          <span className="flex items-center gap-2 text-purple-800"><Siren size={16} /> Anexo: Espacios Confinados</span>
                          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-purple-100 space-y-6">
                            <Section title="Información General del Anexo">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Contacto de Emergencia" value={`${permit.anexoConfinado.emergencia?.contacto || 'N/A'} - ${permit.anexoConfinado.emergencia?.telefono || 'N/A'}`} />
                                </div>
                            </Section>

                            <Section title="Identificación de Peligros y Aspectos">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    {Object.entries(permit.anexoConfinado.identificacionPeligros || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} spec={key === 'procedimientoComunicacion' ? permit.anexoConfinado.procedimientoComunicacionCual : undefined} />
                                    ))}
                                </div>
                            </Section>
                            
                            <Section title="Precauciones y Controles">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoConfinado.precauciones || {}).map(([key, value]) => (
                                         <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />
                                     ))}
                                 </div>
                             </Section>
                             
                             <Section title="Requerimientos y Equipos">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoConfinado.requerimientosEquipos || {}).map(([key, value]) => (
                                         <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />
                                     ))}
                                 </div>
                             </Section>
                             
                             <Section title="Autorizaciones del Anexo">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <Field label="Autoridad del Área" value={permit.anexoConfinado.autoridadDelArea?.nombre || 'N/A'} />
                                     <Field label="Responsable del Trabajo" value={permit.anexoConfinado.responsableDelTrabajo?.nombre || 'N/A'} />
                                     <Field label="Supervisor Trabajo EC" value={permit.anexoConfinado.supervisorTrabajo?.nombre || 'N/A'} />
                                </div>
                             </Section>

                           <Section title="Resultados de Pruebas de Gases Iniciales">
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                   <Field label="LEL (0%)" value={permit.anexoConfinado.resultadosPruebasGases?.lel} />
                                   <Field label="O2 (19.5-22%)" value={permit.anexoConfinado.resultadosPruebasGases?.o2} />
                                   <Field label="H2S (0-10 PPM)" value={permit.anexoConfinado.resultadosPruebasGases?.h2s} />
                                   <Field label="CO (0-25 PPM)" value={permit.anexoConfinado.resultadosPruebasGases?.co} />
                               </div>
                           </Section>
                           <Section title="Pruebas Periódicas" className="mt-4">
                              <Table>
                                <TableHeader><TableRow><TableHead>Hora</TableHead><TableHead>LEL</TableHead><TableHead>O2</TableHead><TableHead>H2S</TableHead><TableHead>CO</TableHead><TableHead>Firma</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {permit.anexoConfinado.pruebasGasesPeriodicas?.pruebas?.map(p => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.hora}</TableCell>
                                            <TableCell>{p.lel}</TableCell>
                                            <TableCell>{p.o2}</TableCell>
                                            <TableCell>{p.h2s}</TableCell>
                                            <TableCell>{p.co}</TableCell>
                                            <TableCell>{p.firma && <Image src={p.firma} alt="Firma" width={80} height={40}/>}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                           </Section>
                           <DailyValidationTable anexoName="anexoConfinado" validationData={permit.anexoConfinado.validacion} />
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* ANEXO ENERGIAS */}
                {permit.selectedWorkTypes?.energia && permit.anexoEnergias && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-yellow-50 px-4 py-3 text-left text-sm font-semibold">
                           <span className="flex items-center gap-2 text-yellow-800"><AlertTriangle size={16} /> Anexo: Control de Energías</span>
                          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-yellow-100 space-y-6">
                           <Section title="Tipos de Energía Identificados">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).map(([key, value]) => value && <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />)}
                                </div>
                           </Section>
                           <Section title="Trabajos en Caliente">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoEnergias.trabajosEnCaliente || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} spec={key === 'otro' ? permit.anexoEnergias.trabajosEnCaliente?.otro as string : undefined}/>
                                     ))}
                                </div>
                           </Section>
                           <Section title="Procedimiento LOTO">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoEnergias.procedimientoLOTO || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string}/>
                                     ))}
                                </div>
                           </Section>
                           <Section title="Planeación de Trabajos con Energía Eléctrica">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoEnergias.planeacion || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string}/>
                                     ))}
                                </div>
                            </Section>
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* ANEXO IZAJE */}
                {permit.selectedWorkTypes?.izaje && permit.anexoIzaje && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-green-50 px-4 py-3 text-left text-sm font-semibold">
                          <span className="flex items-center gap-2 text-green-800"><AlertTriangle size={16} /> Anexo: Izaje de Cargas</span>
                          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-green-100 space-y-6">
                           <Section title="Información de la Carga y Equipo">
                                <Field label="Acción a realizar" value={Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([,v]) => v).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')} />
                                <Field label="Peso de la Carga" value={Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([,v]) => v).map(([k]) => k.replace('menor', '< ').replace('mas', '> ').replace('entre', '')).join(', ') + ' kg'} />
                                <Field label="Equipo a Utilizar" value={Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([,v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').toUpperCase()).join(', ')} />
                                <Field label="Capacidad del Equipo" value={permit.anexoIzaje.informacionGeneral.capacidadEquipo} />
                           </Section>
                           <Section title="Aspectos Requeridos para Izaje">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoIzaje.aspectosRequeridos || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />
                                     ))}
                                </div>
                            </Section>
                           <Section title="Precauciones y Controles">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoIzaje.precauciones || {}).map(([key, value]) => (
                                         <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as boolean} />
                                     ))}
                                 </div>
                             </Section>
                           <DailyValidationTable anexoName="anexoIzaje" validationData={permit.anexoIzaje.validacion} />
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* ANEXO EXCAVACIONES */}
                {permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-orange-50 px-4 py-3 text-left text-sm font-semibold">
                          <span className="flex items-center gap-2 text-orange-800"><AlertTriangle size={16} /> Anexo: Excavaciones</span>
                          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-orange-100 space-y-6">
                           <Section title="Dimensiones de la Excavación">
                                <Field label="Dimensiones Generales" value={permit.anexoExcavaciones.informacionGeneral.dimensiones} />
                                <Field label="Profundidad" value={permit.anexoExcavaciones.informacionGeneral.profundidad} />
                                <Field label="Ancho" value={permit.anexoExcavaciones.informacionGeneral.ancho} />
                                <Field label="Largo" value={permit.anexoExcavaciones.informacionGeneral.largo} />
                           </Section>
                           <Section title="Aspectos Requeridos">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    {Object.entries(permit.anexoExcavaciones.aspectosRequeridos || {}).map(([key, value]) => (
                                        <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as string} />
                                    ))}
                                </div>
                            </Section>
                            <Section title="Precauciones y Controles">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                     {Object.entries(permit.anexoExcavaciones.precauciones || {}).map(([key, value]) => (
                                         <RadioCheck key={key} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={value as boolean} />
                                     ))}
                                 </div>
                             </Section>
                           <DailyValidationTable anexoName="anexoExcavaciones" validationData={permit.anexoExcavaciones.validacion} />
                       </CollapsibleContent>
                   </Collapsible>
                )}


                {/* Sección de Personal */}
                <Section title="Personal Autorizado y Externo">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre / Cédula</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Aptitud</TableHead>
                          <TableHead>Entrenamiento</TableHead>
                          <TableHead>Seg. Social</TableHead>
                          <TableHead>Firma Apertura</TableHead>
                          <TableHead>Firma Cierre</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permit.workers?.map((worker, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <p className="font-medium">{worker.nombre}</p>
                              <p className="text-xs text-muted-foreground">C.C. {worker.cedula}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{worker.rol === 'Otro' ? worker.otroRol : worker.rol}</Badge>
                            </TableCell>
                            <TableCell>
                               <div className="flex gap-1">
                                {worker.tsaTec?.tec && <Badge variant="secondary" className="uppercase">TEC</Badge>}
                                {worker.tsaTec?.tsa && <Badge variant="secondary" className="uppercase">TSA</Badge>}
                               </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    {worker.entrenamiento?.tec && <Badge variant="secondary" className="capitalize">TEC</Badge>}
                                    {worker.entrenamiento?.tsa && <Badge variant="secondary" className="capitalize">TSA</Badge>}
                                    {worker.entrenamiento?.otro && worker.entrenamiento?.otroCual && <Badge variant="secondary" className="capitalize">{worker.entrenamiento.otroCual}</Badge>}
                                </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {worker.eps && <Badge className="bg-green-100 text-green-800 text-xs p-1">EPS</Badge>}
                                {worker.arl && <Badge className="bg-green-100 text-green-800 text-xs p-1">ARL</Badge>}
                                {worker.pensiones && <Badge className="bg-green-100 text-green-800 text-xs p-1">P</Badge>}
                              </div>
                            </TableCell>
                            <TableCell>
                              {worker.firmaApertura ? <Image src={worker.firmaApertura} alt="Firma Apertura" width={80} height={40} className="border rounded" /> : (
                                <Button size="sm" variant="outline" onClick={() => openWorkerSignatureDialog(index, 'firmaApertura')} disabled={permit.status !== 'en_ejecucion' && permit.status !== 'suspendido'}>
                                    <SignatureIcon className="mr-2 h-4 w-4" />Firmar
                                </Button>
                              )}
                            </TableCell>
                            <TableCell>
                              {worker.firmaCierre ? (
                                <Image src={worker.firmaCierre} alt="Firma Cierre" width={80} height={40} className="border rounded" />
                              ) : (
                                (permit.status === 'en_ejecucion' || permit.status === 'suspendido') && (
                                  <Button size="sm" variant="outline" onClick={() => openWorkerSignatureDialog(index, 'firmaCierre')}>
                                    <SignatureIcon className="mr-2 h-4 w-4" /> Firmar Cierre
                                  </Button>
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </Section>
                
                 {/* Sección de Firmas de Aprobación */}
                <Section title="Aprobaciones del Permiso">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {permit.selectedWorkTypes?.alturas && <SignatureCard role="coordinador_alturas" />}
                        <SignatureCard role="solicitante" />
                        {isSSTSignatureRequired && <SignatureCard role="lider_sst" />}
                        <SignatureCard role="autorizante" />
                        {permit.controlEnergia && <SignatureCard role="mantenimiento" />}
                    </div>
                </Section>

            </div>
             <footer className="text-center text-xs text-gray-400 py-4 mt-8">
                <p>Código: DN-FR-SST-016</p>
                <p>Versión: 04</p>
            </footer>
        </main>
        
        <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Firma</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {(signingRole?.role === 'coordinador_alturas' || signingRole?.role?.startsWith('cierre_') || signingRole?.role === 'cancelacion') && (
                        <div className="space-y-1">
                            <Label htmlFor="signerName">Su Nombre Completo</Label>
                            <Input 
                                id="signerName" 
                                value={signerName} 
                                onChange={(e) => setSignerName(e.target.value)} 
                                placeholder="Ingrese su nombre completo"
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <Label htmlFor="signature-observation">Observaciones (Opcional)</Label>
                        <Textarea 
                            id="signature-observation"
                            value={signatureObservation}
                            onChange={(e) => setSignatureObservation(e.target.value)}
                            placeholder="Añada comentarios si es necesario..."
                        />
                    </div>
                </div>
                <SignaturePad 
                    onSave={handleSaveSignature} 
                    isSaving={isSigning} 
                />
            </DialogContent>
        </Dialog>

        <Dialog open={isWorkerSignatureOpen} onOpenChange={setIsWorkerSignatureOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Firma de Trabajador</DialogTitle>
            </DialogHeader>
            <SignaturePad onSave={handleSaveWorkerSignature} isSaving={isSigning} />
          </DialogContent>
        </Dialog>
        
        <AlertDialog open={isSolicitanteSignAlertOpen} onOpenChange={setIsSolicitanteSignAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Firma de Solicitante</AlertDialogTitle>
                    <AlertDialogDescription>
                        {signatureConsents.solicitante} ¿Desea continuar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => openSignatureDialog('solicitante', 'firmaApertura')}>
                        Confirmar y Firmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isDailyValidationSignatureOpen} onOpenChange={setIsDailyValidationSignatureOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Validación Diaria</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Confirme las condiciones de seguridad para continuar con el trabajo hoy.</p>
              <div>
                <Label htmlFor="daily-validation-name">Nombre</Label>
                <Input id="daily-validation-name" value={dailyValidationName} onChange={(e) => setDailyValidationName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="daily-validation-date">Fecha y Hora</Label>
                <Input id="daily-validation-date" type="datetime-local" value={dailyValidationDate} onChange={(e) => setDailyValidationDate(e.target.value)} />
              </div>
            </div>
            <SignaturePad onSave={handleSaveDailyValidationSignature} isSaving={isDailyValidationSigning} />
          </DialogContent>
        </Dialog>

        <Dialog open={isClosureDialogOpen} onOpenChange={setIsClosureDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Módulo de Cierre de Permiso</DialogTitle>
                    <DialogDescription>Complete las firmas requeridas para finalizar el permiso de trabajo.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded" role="alert">
                        <p className="font-bold flex items-center gap-2"><Info size={16}/>Condiciones para el Cierre</p>
                        <ul className="list-none space-y-1 text-sm mt-2">
                            {closureStatus.reasons.length > 0 ? (
                                closureStatus.reasons.map((reason, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <XCircle size={14} className="inline mr-1 text-red-500 mt-1 flex-shrink-0"/>
                                        <span>{reason}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={14} className="inline mr-1 text-green-500 mt-1 flex-shrink-0"/>
                                    <span>Todas las condiciones para el cierre están completas.</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-4">
                       <div className="p-3 border rounded-md space-y-3">
                           <h5 className="text-sm font-semibold">Responsable del Trabajo (Solicitante)</h5>
                           <Input readOnly disabled value={permit.closure?.responsable?.nombre || ''} />
                           <Button variant="outline" size="sm" className="w-full" onClick={() => openSignatureDialog('cierre_responsable', 'firmaCierre')} disabled={!!permit.closure?.responsable?.firma}>
                             <SignatureIcon className="mr-2"/>{permit.closure?.responsable?.firma ? 'Firmado' : 'Firmar Cierre'}
                           </Button>
                           {permit.closure?.responsable?.firma && <Image src={permit.closure.responsable.firma} alt="Firma Cierre Responsable" width={100} height={50} className="border rounded mt-2"/>}
                       </div>
                       
                       <div className="p-3 border rounded-md space-y-3">
                           <h5 className="text-sm font-semibold">Autoridad del Área</h5>
                           <Input readOnly disabled value={permit.closure?.autoridad?.nombre || ''} />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-full">
                                          <Button variant="outline" size="sm" className="w-full" onClick={() => openSignatureDialog('cierre_autoridad', 'firmaCierre')} disabled={!permit.closure?.responsable?.firma || !!permit.closure?.autoridad?.firma}>
                                            <SignatureIcon className="mr-2"/>{permit.closure?.autoridad?.firma ? 'Firmado' : 'Firmar Cierre'}
                                          </Button>
                                        </div>
                                    </TooltipTrigger>
                                    {!permit.closure?.responsable?.firma && <TooltipContent><p>Debe firmar primero el Responsable del Trabajo.</p></TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
                           {permit.closure?.autoridad?.firma && <Image src={permit.closure.autoridad.firma} alt="Firma Cierre Autoridad" width={100} height={50} className="border rounded mt-2"/>}
                       </div>
                    </div>
                </div>
                <DialogFooter>
                    <TooltipProvider>
                        <Tooltip open={closureStatus.can ? false : undefined}>
                            <TooltipTrigger asChild>
                                <div className="w-full">
                                    <Button 
                                        onClick={() => handleChangeStatus('cerrado')} 
                                        disabled={!closureStatus.can || isStatusChanging}
                                        className="w-full"
                                    >
                                        {isStatusChanging ? <Loader2 className="animate-spin" /> : <Lock />} 
                                        Confirmar Cierre del Permiso
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            {!closureStatus.can && (
                                <TooltipContent side="bottom" className="max-w-xs">
                                    <p className="font-semibold">No se puede cerrar el permiso:</p>
                                    <ul className="list-disc list-inside text-xs mt-1">
                                        {closureStatus.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                                    </ul>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <AlertDialog open={isCancellationDialogOpen} onOpenChange={setIsCancellationDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Permiso de Trabajo</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción cambiará el estado del permiso a "Rechazado" y no podrá ser revertida. Por favor, especifique el motivo de la cancelación.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea 
                    value={cancellationReason}
                    onChange={e => setCancellationReason(e.target.value)}
                    placeholder="Motivo de la cancelación..."
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Volver</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmCancellation} disabled={isSigning || !cancellationReason.trim()}>
                        {isSigning ? <Loader2 className="animate-spin"/> : 'Confirmar Cancelación'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </div>
  );
}
