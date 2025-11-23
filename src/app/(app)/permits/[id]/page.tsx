
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval, ExternalWorker, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, PermitStatus, UserRole, AnexoATS, PruebaGasesPeriodica, AnexoExcavaciones, ValidacionDiaria, AutorizacionPersona } from '@/types';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


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
    const parsed = new Date(dateValue);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  
  return null;
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
  lider_sst: 'SST (SI APLICA)',
  autorizante: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)',
};

const signatureConsents: { [key in SignatureRole]?: string } = {
    solicitante: "Al firmar, confirma que la información del permiso, ATS y anexos es correcta. El permiso se enviará para autorización y ya no podrá ser modificado.",
    coordinador_alturas: "Al firmar como Coordinador de Trabajos en Alturas, manifiesto que entiendo el trabajo que se va a realizar y sus peligros, se han verificado las condiciones y formulado las medidas de prevención necesarias.",
};


export default function PermitDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = params.id;
  
  const [permit, setPermit] = useState<Permit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [signingRole, setSigningRole] = useState<{role: SignatureRole | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', type: 'firmaApertura' | 'firmaCierre'} | null>(null);
  const [signerName, setSignerName] = useState('');
  const [isSigning, setIsSigning] = useState(false);

  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isClosureDialogOpen, setIsClosureDialogOpen] = useState(false);
  
  const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = useState(false);
  
  const [isDailyValidationSignatureOpen, setIsDailyValidationSignatureOpen] = useState(false);
  const [dailyValidationTarget, setDailyValidationTarget] = useState<{anexo: string, type: 'autoridad' | 'responsable', index: number} | null>(null);
  const [dailyValidationName, setDailyValidationName] = useState('');
  const [dailyValidationDate, setDailyValidationDate] = useState('');

  const [isWorkerSignatureOpen, setIsWorkerSignatureOpen] = useState(false);
  const [workerSignatureTarget, setWorkerSignatureTarget] = useState<{ index: number; type: 'firmaApertura' | 'firmaCierre'; } | null>(null);
  
  // ✨ CORRECCIÓN: Estado para controlar la acción de cierre o cancelación
  const [closureAction, setClosureAction] = useState<'cierre' | 'cancelacion' | null>(null);


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
    { id: 'espacioCaidaLibreSuficiente', label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR QUE LA PERSONA SE GOLPEE CONTRA EL NIVEL INFERIOR.' },
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

    const docRef = doc(db, 'permits', permitId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPermit({
          id: docSnap.id,
          ...data,
          createdAt: parseFirestoreDate(data.createdAt),
          closure: data.closure || {}, // Ensure closure object exists
          approvals: data.approvals || {}, // Ensure approvals object exists
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
      });
      
      errorEmitter.emit('permission-error', permissionError);
      setError('No tiene permisos para ver este documento.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [permitId]);
  
  // ✅ Función handleExportToPDF corregida
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
    
    const safeFormat = (date: any, fmt: string) => {
      const parsedDate = parseFirestoreDate(date);
      return parsedDate && isValid(parsedDate) ? format(parsedDate, fmt) : 'N/A';
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
        const valAut = validationData?.autoridad?.[idx];
        const valRes = validationData?.responsable?.[idx];
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
            { content: 'RESPONSABLE', colSpan: 2, styles: { halign: 'center' } },
            { content: 'AUTORIDAD DEL ÁREA', colSpan: 2, styles: { halign: 'center' } }
          ],
          ['NOMBRE', 'FECHA', 'NOMBRE', 'FECHA']
        ],
        body: bodyData,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1 },
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] }
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

    // INFORMACIÓN GENERAL
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
          { content: 'Duración:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
          `Desde: ${safeFormat(permit.generalInfo?.validFrom, 'dd/MM/yy HH:mm')}\nHasta: ${safeFormat(permit.generalInfo?.validUntil, 'dd/MM/yy HH:mm')}`,
          { content: 'Contrato:', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
          permit.generalInfo?.contrato || ''
        ]
      ],
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1, lineColor: [0, 0, 0], lineWidth: 0.1 },
    });
    yPos = (doc as any).lastAutoTable.finalY + 2;

    // ALCANCE
    autoTable(doc, {
      startY: yPos,
      head: [[{ content: 'ALCANCE (Descripción del Trabajo)', styles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' } }]],
      body: [[permit.generalInfo?.workDescription || '']],
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 2, lineColor: [0, 0, 0], lineWidth: 0.1 }
    });
    yPos = (doc as any).lastAutoTable.finalY + 5;

    // ATS - PELIGROS IDENTIFICADOS
    drawSectionTitle('ANÁLISIS DE TRABAJO SEGURO (ATS)');
    const activeRisks = atsPeligros.filter(p => (permit.anexoATS?.peligros as any)?.[p.id] === 'si');
    if (activeRisks.length > 0) {
      const riskRows = activeRisks.map(r => [`[X] ${r.label}`]);
      autoTable(doc, {
        startY: yPos,
        body: riskRows,
        theme: 'plain',
        styles: { fontSize: 7, cellPadding: 1 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }

    // PERSONAL AUTORIZADO
    drawSectionTitle('PERSONAL AUTORIZADO');
    const workerRows = permit.workers?.map(w => [
      w.nombre,
      w.cedula,
      w.rol,
      w.firmaApertura ? 'FIRMADO' : 'PENDIENTE'
    ]) || [];
    
    if (workerRows.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['NOMBRE', 'CÉDULA', 'ROL', 'FIRMA APERTURA']],
        body: workerRows,
        theme: 'grid',
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
        styles: { fontSize: 7 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
    }

    // AUTORIZACIONES
    checkPageBreak(40);
    drawSectionTitle('AUTORIZACIONES');
    const sigBoxW = (pageWidth - (2 * margin)) / 3;
    const sigBoxH = 30;
    
    drawSignatureBox('SOLICITANTE', permit.approvals?.solicitante, margin, yPos, sigBoxW, sigBoxH);
    drawSignatureBox('AUTORIZANTE', permit.approvals?.autorizante, margin + sigBoxW, yPos, sigBoxW, sigBoxH);
    drawSignatureBox('SST', permit.approvals?.lider_sst, margin + 2 * sigBoxW, yPos, sigBoxW, sigBoxH);
    yPos += sigBoxH + 5;

    // ANEXO ALTURA
    if (permit.selectedWorkTypes?.alturas && permit.anexoAltura) {
      checkPageBreak(100);
      drawSectionTitle('ANEXO 1 - TRABAJOS EN ALTURA');
      
      autoTable(doc, {
        startY: yPos,
        body: [
          ['Altura Aproximada:', permit.anexoAltura.alturaAproximada || 'N/A'],
          [
            'Sistema de Acceso:',
            Object.keys(permit.anexoAltura.tipoEstructura || {})
              .filter(k => (permit.anexoAltura?.tipoEstructura as any)[k])
              .join(', ')
          ]
        ],
        theme: 'grid',
        styles: { fontSize: 7, lineColor: [0, 0, 0], lineWidth: 0.1 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;
      
      // Aspectos de seguridad
      const alturaChecks = anexoAlturaAspectos.map(asp => [
        asp.label,
        (permit.anexoAltura?.aspectosSeguridad as any)?.[asp.id] === 'si' ? 'SÍ' : 'NO/NA'
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Aspectos de Seguridad', 'Cumple']],
        body: alturaChecks,
        theme: 'grid',
        styles: { fontSize: 6, cellPadding: 1 },
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
        columnStyles: { 1: { halign: 'center', cellWidth: 20 } }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;

      // Validación diaria
      if (permit.anexoAltura.validacion) {
        drawDailyValidationTable(permit.anexoAltura.validacion, permitDuration);
      }
    }

    // ANEXO CONFINADO
    if (permit.selectedWorkTypes?.confinado && permit.anexoConfinado) {
      checkPageBreak(80);
      drawSectionTitle('ANEXO 2 - ESPACIOS CONFINADOS');

      autoTable(doc, {
        startY: yPos,
        head: [['LEL %', 'O2 %', 'H2S ppm', 'CO ppm']],
        body: [[
          permit.anexoConfinado.resultadosPruebasGases?.lel || '-',
          permit.anexoConfinado.resultadosPruebasGases?.o2 || '-',
          permit.anexoConfinado.resultadosPruebasGases?.h2s || '-',
          permit.anexoConfinado.resultadosPruebasGases?.co || '-'
        ]],
        theme: 'grid',
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
        styles: { halign: 'center', fontSize: 8 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;

      if (permit.anexoConfinado.validacion) {
        drawDailyValidationTable(permit.anexoConfinado.validacion, permitDuration);
      }
    }

    // ANEXO IZAJE
    if (permit.selectedWorkTypes?.izaje && permit.anexoIzaje) {
      checkPageBreak(80);
      drawSectionTitle('ANEXO 3 - IZAJE DE CARGAS');

      autoTable(doc, {
        startY: yPos,
        body: [
          [
            'Acción:',
            Object.entries(permit.anexoIzaje.informacionGeneral.accion || {})
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(', ')
          ],
          [
            'Peso:',
            Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {})
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(', ')
          ]
        ],
        theme: 'grid',
        styles: { fontSize: 7 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30 } }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;

      if (permit.anexoIzaje.validacion) {
        drawDailyValidationTable(permit.anexoIzaje.validacion, permitDuration);
      }
    }

    // ANEXO EXCAVACIONES
    if (permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones) {
      checkPageBreak(60);
      drawSectionTitle('ANEXO 4 - EXCAVACIONES');

      autoTable(doc, {
        startY: yPos,
        body: [
          ['Profundidad:', permit.anexoExcavaciones.informacionGeneral.profundidad || 'N/A'],
          ['Ancho:', permit.anexoExcavaciones.informacionGeneral.ancho || 'N/A'],
          ['Largo:', permit.anexoExcavaciones.informacionGeneral.largo || 'N/A']
        ],
        theme: 'grid',
        styles: { fontSize: 7 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30 } }
      });
      yPos = (doc as any).lastAutoTable.finalY + 5;

      if (permit.anexoExcavaciones.validacion) {
        drawDailyValidationTable(permit.anexoExcavaciones.validacion, permitDuration);
      }
    }

    // FOOTER EN TODAS LAS PÁGINAS
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: 'right' }
      );
    }

    // GUARDAR PDF
    doc.save(`Permiso_Italcol_${permit.number || permit.id.substring(0, 6)}.pdf`);
    
    toast({
      title: '✓ PDF Generado',
      description: 'Se ha descargado el formato oficial.'
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

  const openSignatureDialog = (role: SignatureRole | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', signatureType: 'firmaApertura' | 'firmaCierre') => {
      setSigningRole({role, type: signatureType});
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
        const userToSign = {
            uid: isSpecialSignature ? 'N/A_SPECIAL' : currentUser.uid,
            displayName: isSpecialSignature ? signerName : currentUser.displayName || null,
        };

        const result = await addSignatureAndNotify(
            permit.id,
            signingRole.role,
            signingRole.type,
            signatureDataUrl,
            userToSign
        );

        if (result.success) {
            toast({
                title: 'Firma Registrada',
                description: `${userToSign.displayName} ha firmado exitosamente.`,
            });
            setIsSignatureDialogOpen(false);
            setSigningRole(null);
            setSignerName('');
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
    if (!permit || !currentUser) return;
    setIsStatusChanging(true);
    try {
      const result = await updatePermitStatus(permit.id, newStatus, { uid: currentUser.uid, displayName: currentUser.displayName }, reason, permit.closure);
      if (result.success) {
        toast({
          title: 'Estado Actualizado',
          description: `El permiso ahora está ${getStatusInfo(newStatus).text}.`,
          className: 'bg-green-100 dark:bg-green-900',
        });
        if(isRejectionDialogOpen) setIsRejectionDialogOpen(false);
        if(rejectionReason) setRejectionReason("");
        if(isClosureDialogOpen) setIsClosureDialogOpen(false);
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
  
  const canSign = (role: SignatureRole): { can: boolean; reason?: string } => {
    if (!currentUser || !permit || !permit.approvals) return { can: false, reason: 'Cargando datos...' };
    const { status, approvals, selectedWorkTypes, createdBy } = permit;

    if (['rechazado', 'cerrado', 'suspendido'].includes(status)) {
        return { can: false, reason: `El permiso está ${status}.` };
    }
    
    if (status !== 'pendiente_revision' && status !== 'borrador') {
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
        
        case 'autorizante':
            if (!hasCorrectRole('autorizante')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(solicitante)) return { can: false, reason: 'Esperando firma del Solicitante.' };
            return { can: true };

        case 'mantenimiento':
            if (!permit.controlEnergia) return { can: false, reason: 'No se requiere para este trabajo.' };
            if (!hasCorrectRole('mantenimiento')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(autorizante)) return { can: false, reason: 'Esperando firma del Autorizante.' };
            return { can: true };

        case 'lider_sst':
            if (!hasCorrectRole('lider_sst')) return { can: false, reason: 'No tienes el rol requerido.' };
            if (!hasSigned(solicitante) || !hasSigned(autorizante)) return { can: false, reason: 'Esperando firma del Solicitante y Autorizante.' };
            return { can: true };

        default:
            return { can: false, reason: 'Rol de firma no reconocido.' };
    }
  };


  const canChangeStatus = (targetStatus: PermitStatus) => {
    if (!currentUser || !permit) return false;
    const { role } = currentUser;
    const { status, approvals } = permit;

    if (!approvals) return false;

    let allRequiredSignaturesDone = 
      approvals.solicitante?.status === 'aprobado' &&
      approvals.autorizante?.status === 'aprobado';
      
    if(permit.controlEnergia){
        allRequiredSignaturesDone = allRequiredSignaturesDone && approvals.mantenimiento?.status === 'aprobado';
    }

    switch (targetStatus) {
      case 'aprobado':
        return status === 'pendiente_revision' && allRequiredSignaturesDone && (role === 'autorizante' || role === 'admin');
      case 'rechazado':
        return (status === 'pendiente_revision' || status === 'aprobado') && (role === 'autorizante' || role === 'admin' || role === 'lider_sst');
      case 'en_ejecucion':
        return status === 'aprobado' && (role === 'lider_tarea' || role === 'admin' || role === 'solicitante');
      case 'suspendido':
        return status === 'en_ejecucion' && (role === 'lider_sst' || role === 'admin');
      case 'cerrado':
        const allWorkersSignedClosure = permit.workers?.every(w => w.firmaCierre);
        if (!allWorkersSignedClosure) return false;
        return (status === 'en_ejecucion' || status === 'suspendido') && (role === 'lider_tarea' || role === 'admin');
      default:
        return false;
    }
  };

  const handleClosureFieldChange = (field: string, value: any) => {
    if (!permit) return;
    setPermit(prev => {
        if (!prev) return null;
        return {
            ...prev,
            closure: {
                ...prev.closure,
                [field]: value,
            }
        };
    });
  }

  const openDailyValidationSignatureDialog = (anexo: string, type: 'autoridad' | 'responsable', index: number) => {
    setDailyValidationTarget({ anexo, type, index });
    setDailyValidationName(currentUser?.displayName || '');
    setDailyValidationDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setIsDailyValidationSignatureOpen(true);
  };
  
  const handleSaveDailyValidationSignature = async (signature: string) => {
    if (!permit || !dailyValidationTarget || !dailyValidationName.trim() || !dailyValidationDate) {
      toast({ variant: 'destructive', title: 'Faltan datos', description: 'Por favor, complete nombre y fecha.' });
      return;
    }
    
    setIsSigning(true);
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
        }
      );

      if(result.success) {
        toast({ title: 'Validación Diaria Guardada' });
        setIsDailyValidationSignatureOpen(false);
      } else {
        throw new Error(result.error);
      }

    } catch(e: any) {
      toast({ variant: 'destructive', title: 'Error al Guardar', description: e.message });
    } finally {
      setIsSigning(false);
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
  const isApproved = ['aprobado', 'en_ejecucion', 'suspendido'].includes(permit.status);


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
    'Ropa': [
      { id: 'overol_trabajo', label: 'Overol de trabajo' },
      { id: 'overol_ignifugo', label: 'Overol Ignifugo, Categoria:' },
      { id: 'peto', label: 'Peto' },
      { id: 'manguillas', label: 'Manguillas' },
      { id: 'polainas', label: 'Polainas' },
      { id: 'otro_ropa', label: 'Otro (Cual):' },
    ],
    'Protección de pies y piernas': [
      { id: 'botas_seguridad', label: 'Botas de seguridad con puntera' },
      { id: 'botas_dielectricas', label: 'Botas dieléctricas' },
      { id: 'otro_pies', label: 'Otro (Cual):' },
    ],
    'Protección auditiva': [
      { id: 'tipo_insercion', label: 'Tipo Inserción' },
      { id: 'tipo_copa', label: 'Tipo copa' },
    ],
    'Protección respiratoria': [
      { id: 'respirador_cartuchos', label: 'Respirador con cartuchos para:' },
      { id: 'mascarilla_desechable', label: 'Mascarilla desechable para:' },
      { id: 'otro_respiratoria', label: 'Otro (Cual):' },
    ],
    'Protección cabeza': [
      { id: 'casco', label: 'Casco Tipo_Clase_ SIN_CON_Barbuquejo' },
      { id: 'chavo', label: 'Chavo en tela o carnaza' },
    ],
    'Protección facial y ocular': [
      { id: 'careta_lente_neutro', label: 'Careta lente neutro' },
      { id: 'monogafas', label: 'Monogafas / Gafas' },
      { id: 'gafas_oxicorte', label: 'Gafas de oxicorte' },
      { id: 'careta_soldador', label: 'Careta de soldador' },
      { id: 'careta_dielectrica', label: 'Careta de dieléctrica, clase:' },
      { id: 'otro_facial', label: 'Otro (Cual):' },
    ],
    'Barrera/Señales de advertencia': [
      { id: 'senalizacion', label: 'Señalización' },
      { id: 'barandas', label: 'Barandas' },
      { id: 'delimitacion', label: 'Delimitación Perimetral' },
      { id: 'control_acceso', label: 'Control de acceso' },
    ],
    'Guantes': [
      { id: 'proteccion_mecanica', label: 'Protección mecánica:' },
      { id: 'proteccion_dielectrica_guantes', label: 'Protección dieléctrica:' },
      { id: 'proteccion_quimica', label: 'Protección química' },
      { id: 'otro_guantes', label: 'Otro (Cual):' },
    ],
    'Otros': [
      { id: 'tapete_dielectrico', label: 'Tapete dieléctrico' },
      { id: 'pertiga_dielectrica', label: 'Pértiga dieléctrica' },
      { id: 'otro_otros', label: 'Otro (Cual):' },
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

    
    
    const SignatureCard: React.FC<{ role: SignatureRole }> = ({ role }) => {
      const approval = permit.approvals?.[role as keyof typeof permit.approvals];
      const { can, reason } = canSign(role);
      const consentText = signatureConsents[role];

      const SignButton = () => (
          <Button onClick={() => openSignatureDialog(role, 'firmaApertura')} disabled={!can || isSigning} className="flex-1">
              {isSigning ? <Loader2 className="animate-spin" /> : <SignatureIcon className="mr-2"/>} Firmar Apertura
          </Button>
      );

      return (
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-gray-500">{signatureRoles[role]}</CardTitle>
            {role === 'solicitante' && permit.generalInfo?.responsable && (
                <div className="text-xs text-muted-foreground pt-2 border-t">
                    <p className="font-semibold">Responsable del Trabajo:</p>
                    <p>{permit.generalInfo.responsable.nombre}</p>
                    <p>{permit.generalInfo.responsable.cargo} - {permit.generalInfo.responsable.compania}</p>
                </div>
            )}
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between gap-4">
            <div className="flex-grow">
              {approval?.status === 'aprobado' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold text-sm">Aprobado</span>
                  </div>
                  <p className="text-xs">Por: <span className="font-semibold">{approval.userName}</span></p>
                  <p className="text-xs">Fecha: {approval.signedAt ? format(parseFirestoreDate(approval.signedAt)!, 'dd/MM/yy HH:mm') : 'N/A'}</p>
                  {approval.firmaApertura && <Image src={approval.firmaApertura} alt={`Firma ${role}`} width={120} height={60} className="rounded border mt-2" />}
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

        const renderRows = (type: 'autoridad' | 'responsable') => {
            return Array.from({ length: durationInDays }, (_, i) => {
                const v = validationData?.[type]?.[i];
                let canSignValidation = false;
                let tooltipContent = "No tienes permiso para firmar.";
                
                if (type === 'autoridad') {
                    canSignValidation = isApproved && (currentUser?.role === 'autorizante' || currentUser?.role === 'admin') && !v?.firma;
                    tooltipContent = "Solo un Autorizante o Administrador puede firmar.";
                } else if (type === 'responsable') {
                    canSignValidation = isApproved && (currentUser?.uid === permit.createdBy || currentUser?.role === 'lider_tarea') && !v?.firma;
                    tooltipContent = "Solo el creador o líder de la tarea puede firmar.";
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
                        <TableCell>{v?.fecha ? format(parseFirestoreDate(v.fecha)!, 'dd/MM/yy HH:mm') : 'N/A'}</TableCell>
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
                 <Button variant="outline" onClick={handleExportToPDF}><FileDown className="mr-2"/>Exportar a PDF</Button>
                {canChangeStatus('aprobado') && (
                     <Button style={{backgroundColor: '#28a745'}} onClick={() => handleChangeStatus('aprobado')} disabled={isStatusChanging}>
                        {isStatusChanging ? <Loader2 className="animate-spin" /> : <CheckCircle className="mr-2"/>} Aprobar
                     </Button>
                 )}
                 {canChangeStatus('rechazado') && (
                    <AlertDialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><XCircle className="mr-2"/>Rechazar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Rechazar Permiso</AlertDialogTitle></AlertDialogHeader>
                            <Textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Escriba el motivo del rechazo..."/>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleChangeStatus('rechazado', rejectionReason)} disabled={!rejectionReason || isStatusChanging}>
                                {isStatusChanging ? <Loader2 className="animate-spin" /> : null} Rechazar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                 )}
                 {canChangeStatus('en_ejecucion') && (
                      <Button style={{backgroundColor: '#6f42c1'}} onClick={() => handleChangeStatus('en_ejecucion')} disabled={isStatusChanging}>
                        {isStatusChanging ? <Loader2 className="animate-spin" /> : <PlayCircle className="mr-2"/>} Iniciar Ejecución
                     </Button>
                 )}
                 {canChangeStatus('suspendido') && (
                      <Button variant="destructive" style={{backgroundColor: '#fd7e14'}} onClick={() => handleChangeStatus('suspendido')} disabled={isStatusChanging}>
                         {isStatusChanging ? <Loader2 className="animate-spin" /> : <PauseCircle className="mr-2"/>} Suspender
                     </Button>
                 )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-block">
                        <Button 
                          onClick={() => setIsClosureDialogOpen(true)} 
                          disabled={!canChangeStatus('cerrado')}
                          style={canChangeStatus('cerrado') ? {backgroundColor: '#007bff'} : {}}
                        >
                          <Lock className="mr-2"/>Cerrar Permiso
                        </Button>
                      </div>
                    </TooltipTrigger>
                    {!canChangeStatus('cerrado') && (
                      <TooltipContent>
                        <p>Todas las firmas de cierre de los trabajadores son requeridas.</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                 <AlertDialog open={isClosureDialogOpen} onOpenChange={setIsClosureDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Cerrar Permiso de Trabajo</AlertDialogTitle></AlertDialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                            <h4 className="font-semibold text-sm">Verificación de Cierre:</h4>
                            <RadioCheck label="Se ha diligenciado el informe de culminación de trabajo?" value={permit.closure.informeCulminacion} onValueChange={(val) => handleClosureFieldChange('informeCulminacion', val)} />
                            <RadioCheck label="Se ha dejado el área en condiciones seguras y ordenadas?" value={permit.closure.areaDespejada} onValueChange={(val) => handleClosureFieldChange('areaDespejada', val)} />
                            <RadioCheck label="Se ha realizado la disposición de residuos?" value={permit.closure.evidenciaParticulas} onValueChange={(val) => handleClosureFieldChange('evidenciaParticulas', val)} />
                            <RadioCheck label="Se retiraron los sistemas de bloqueo y aseguramiento de energías?" value={permit.closure.dispositivosRetirados} onValueChange={(val) => handleClosureFieldChange('dispositivosRetirados', val)} />
                            <RadioCheck label="Continúa la labor?" value={permit.closure.continuaLabor} onValueChange={(val) => handleClosureFieldChange('continuaLabor', val)} />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleChangeStatus('cerrado')} disabled={isStatusChanging}>
                                {isStatusChanging ? <Loader2 className="animate-spin" /> : null} Confirmar Cierre
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                 </AlertDialog>
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
                        <Field label="Fecha Creación" value={permit.createdAt ? format(parseFirestoreDate(permit.createdAt)!, 'dd/MM/yyyy HH:mm') : 'N/A'} />
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
                
                 {/* Sección de ATS */}
                {permit.anexoATS && (
                    <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2"><FileText /> Análisis de Trabajo Seguro (ATS)</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg">
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
                                {Object.entries(eppOptions).flatMap(([category, items]) => 
                                    items.map(item => (
                                        <RadioCheck 
                                            key={item.id}
                                            label={item.label}
                                            value={(permit.anexoATS?.epp as any)?.[item.id]}
                                            spec={(permit.anexoATS?.epp as any)?.[`${item.id}_spec`]}
                                        />
                                    ))
                                )}
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
                )}


                {/* Sección de Anexo Altura */}
                {permit.selectedWorkTypes?.alturas && permit.anexoAltura && (
                    <Collapsible defaultOpen>
                       <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2"><AlertTriangle /> Anexo de Trabajo en Alturas</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-blue-100">
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
                           {isApproved && <DailyValidationTable anexoName="anexoAltura" validationData={permit.anexoAltura.validacion} />}
                       </CollapsibleContent>
                   </Collapsible>
                )}
                
                {/* Sección de Anexo Confinado */}
                {permit.selectedWorkTypes?.confinado && permit.anexoConfinado && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2"><Siren /> Anexo de Espacios Confinados</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-purple-100">
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
                           {isApproved && <DailyValidationTable anexoName="anexoConfinado" validationData={permit.anexoConfinado.validacion} />}
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* Sección de Anexo Energias */}
                {permit.selectedWorkTypes?.energia && permit.anexoEnergias && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-yellow-700 flex items-center gap-2"><AlertTriangle /> Anexo de Control de Energías</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-yellow-100">
                           <Section title="Tipos de Energía">
                                {Object.entries(permit.anexoEnergias.energiasPeligrosas || {}).map(([key, value]) => value && <p key={key} className='capitalize'>{key.replace(/([A-Z])/g, ' $1')}</p>)}
                           </Section>
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* Sección de Anexo Izaje */}
                {permit.selectedWorkTypes?.izaje && permit.anexoIzaje && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-green-700 flex items-center gap-2"><AlertTriangle /> Anexo de Izaje de Cargas</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-green-100">
                           <Section title="Información de la Carga">
                                <Field label="Acción a realizar" value={Object.entries(permit.anexoIzaje.informacionGeneral.accion || {}).filter(([,v]) => v).map(([k]) => k).join(', ')} />
                                <Field label="Peso de la Carga" value={Object.entries(permit.anexoIzaje.informacionGeneral.pesoCarga || {}).filter(([,v]) => v).map(([k]) => k).join(', ')} />
                                <Field label="Equipo a Utilizar" value={Object.entries(permit.anexoIzaje.informacionGeneral.equipoUtilizar || {}).filter(([,v]) => v).map(([k]) => k).join(', ')} />
                           </Section>
                           {isApproved && <DailyValidationTable anexoName="anexoIzaje" validationData={permit.anexoIzaje.validacion} />}
                       </CollapsibleContent>
                   </Collapsible>
                )}
                 {/* Sección de Anexo Excavaciones */}
                {permit.selectedWorkTypes?.excavacion && permit.anexoExcavaciones && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-orange-700 flex items-center gap-2"><AlertTriangle /> Anexo de Excavaciones</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-orange-100">
                           <Section title="Dimensiones">
                                <Field label="Dimensiones" value={permit.anexoExcavaciones.informacionGeneral.dimensiones} />
                                <Field label="Profundidad" value={permit.anexoExcavaciones.informacionGeneral.profundidad} />
                                <Field label="Ancho" value={permit.anexoExcavaciones.informacionGeneral.ancho} />
                                <Field label="Largo" value={permit.anexoExcavaciones.informacionGeneral.largo} />
                           </Section>
                           {isApproved && <DailyValidationTable anexoName="anexoExcavaciones" validationData={permit.anexoExcavaciones.validacion} />}
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
                                <Button size="sm" variant="outline" onClick={() => openWorkerSignatureDialog(index, 'firmaApertura')} disabled={!isApproved || !!worker.firmaApertura}>
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
                        <SignatureCard role="autorizante" />
                        {permit.controlEnergia && <SignatureCard role="mantenimiento" />}
                        <SignatureCard role="lider_sst" />
                    </div>
                </Section>

                {/* ✨ CORRECCIÓN: Sección de Cancelación y Cierre ahora es funcional y condicional */}
                {isApproved && (
                    <Collapsible>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer mt-8">
                              <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2"><Lock /> Cancelación y Cierre</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg">
                            <div className="space-y-4">
                                <Label className="font-semibold">¿Qué acción desea realizar?</Label>
                                <RadioGroup 
                                    value={closureAction || ''} 
                                    onValueChange={(value: 'cierre' | 'cancelacion') => setClosureAction(value)} 
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cierre" id="action-cierre" />
                                        <Label htmlFor="action-cierre">Cerrar Permiso</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cancelacion" id="action-cancelacion" />
                                        <Label htmlFor="action-cancelacion">Cancelar Permiso</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            {closureAction && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t">
                                    {/* Columna de Cancelación (Condicional) */}
                                    {closureAction === 'cancelacion' && (
                                        <div className="space-y-4 p-4 border rounded-lg bg-red-50/50 border-red-100">
                                            <h4 className="font-bold text-md text-red-800">Cancelación del Trabajo</h4>
                                            <RadioCheck label="¿Se canceló el trabajo?" value={permit.closure?.cancelado} onValueChange={(val) => handleClosureFieldChange('cancelado', val)} />
                                            <Textarea placeholder="Razón de la cancelación" value={permit.closure?.razonCancelacion || ''} onChange={e => handleClosureFieldChange('razonCancelacion', e.target.value)} />
                                            <Input placeholder="Nombre de quien cancela" value={permit.closure?.canceladoPor?.nombre || ''} onChange={e => handleClosureFieldChange('canceladoPor', { ...permit.closure?.canceladoPor, nombre: e.target.value })} />
                                            <Input type="datetime-local" value={permit.closure?.canceladoPor?.fecha || ''} onChange={e => handleClosureFieldChange('canceladoPor', { ...permit.closure?.canceladoPor, fecha: e.target.value })} />
                                            <Button variant="destructive" className="w-full" onClick={() => openSignatureDialog('cancelacion', 'firmaCierre')}><SignatureIcon className="mr-2"/>Firmar Cancelación</Button>
                                            {permit.closure?.canceladoPor?.firma && <Image src={permit.closure.canceladoPor.firma} alt="Firma Cancelación" width={100} height={50} className="border rounded mt-2"/>}
                                        </div>
                                    )}
                                    
                                    {/* Columna de Cierre (Condicional) */}
                                    {closureAction === 'cierre' && (
                                        <div className="space-y-4 p-4 border rounded-lg bg-blue-50/50 border-blue-100 md:col-start-2">
                                            <h4 className="font-bold text-md text-blue-800">Cierre del Permiso</h4>
                                            <RadioCheck label="¿Se terminó el trabajo?" value={permit.closure?.terminado} onValueChange={(val) => handleClosureFieldChange('terminado', val)} />
                                            <Textarea placeholder="Observaciones de cierre" value={permit.closure?.observacionesCierre || ''} onChange={e => handleClosureFieldChange('observacionesCierre', e.target.value)} />

                                            <div className="p-3 border rounded-md space-y-3 bg-white">
                                                <h5 className="text-sm font-semibold">Autoridad del Área</h5>
                                                <Input placeholder="Nombre" value={permit.closure?.autoridad?.nombre || ''} onChange={e => handleClosureFieldChange('autoridad', { ...permit.closure?.autoridad, nombre: e.target.value })} />
                                                <Input type="datetime-local" value={permit.closure?.autoridad?.fecha || ''} onChange={e => handleClosureFieldChange('autoridad', { ...permit.closure?.autoridad, fecha: e.target.value })} />
                                                <Button variant="outline" size="sm" className="w-full" onClick={() => openSignatureDialog('cierre_autoridad', 'firmaCierre')}><SignatureIcon className="mr-2"/>Firmar Cierre</Button>
                                                {permit.closure?.autoridad?.firma && <Image src={permit.closure.autoridad.firma} alt="Firma Cierre Autoridad" width={100} height={50} className="border rounded mt-2"/>}
                                            </div>

                                            <div className="p-3 border rounded-md space-y-3 bg-white">
                                                <h5 className="text-sm font-semibold">Responsable del Trabajo</h5>
                                                <Input placeholder="Nombre" value={permit.closure?.responsable?.nombre || ''} onChange={e => handleClosureFieldChange('responsable', { ...permit.closure?.responsable, nombre: e.target.value })}/>
                                                <Input type="datetime-local" value={permit.closure?.responsable?.fecha || ''} onChange={e => handleClosureFieldChange('responsable', { ...permit.closure?.responsable, fecha: e.target.value })}/>
                                                <Button variant="outline" size="sm" className="w-full" onClick={() => openSignatureDialog('cierre_responsable', 'firmaCierre')}><SignatureIcon className="mr-2"/>Firmar Cierre</Button>
                                                {permit.closure?.responsable?.firma && <Image src={permit.closure.responsable.firma} alt="Firma Cierre Responsable" width={100} height={50} className="border rounded mt-2"/>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                )}

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
                 {(signingRole?.role === 'coordinador_alturas' || signingRole?.role?.startsWith('cierre_') || signingRole?.role === 'cancelacion') && (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {signingRole?.role === 'coordinador_alturas' ? signatureConsents.coordinador_alturas : "Confirmo que la información proporcionada para esta acción es correcta."}
                        </p>
                        <div className="space-y-1">
                            <Label htmlFor="signerName">Su Nombre Completo</Label>
                            <Input 
                                id="signerName" 
                                value={signerName} 
                                onChange={(e) => setSignerName(e.target.value)} 
                                placeholder="Ingrese su nombre completo"
                            />
                        </div>
                    </div>
                )}
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
            <SignaturePad onSave={handleSaveDailyValidationSignature} isSaving={isSigning} />
          </DialogContent>
        </Dialog>

      </div>
  );
}


    