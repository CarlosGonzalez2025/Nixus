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

const RadioCheck: React.FC<{ label: string, value?: string | boolean, onValueChange?: (value: 'si' | 'no' | 'na') => void, readOnly?: boolean }> = ({ label, value, onValueChange, readOnly = false }) => {
    let checkValue: 'si' | 'no' | 'na';
    if (value === true || value === 'si') {
        checkValue = 'si';
    } else if (value === false || value === 'no') {
        checkValue = 'no';
    } else {
        checkValue = 'na';
    }

    const baseClasses = "flex justify-between items-center p-2 rounded-md";
    const readOnlyClasses = "bg-gray-50";
    const interactiveClasses = "bg-white border";

    const getOptionClasses = (option: 'si' | 'no' | 'na') => {
      const base = "cursor-pointer";
      const selected = "font-bold text-black";
      const unselected = "text-gray-400";
      return `${base} ${checkValue === option ? selected : unselected}`;
    }

    return (
        <div className={`${baseClasses} ${readOnly ? readOnlyClasses : interactiveClasses}`}>
            <span className="text-xs flex-1">{label}</span>
            <RadioGroup value={checkValue} onValueChange={onValueChange as any} className="flex gap-2 items-center text-xs font-mono" disabled={readOnly}>
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="si" id={`${label}-si`} />
                    <Label htmlFor={`${label}-si`} className={getOptionClasses('si')}>SI</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="no" id={`${label}-no`} />
                    <Label htmlFor={`${label}-no`} className={getOptionClasses('no')}>NO</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="na" id={`${label}-na`} />
                    <Label htmlFor={`${label}-na`} className={getOptionClasses('na')}>NA</Label>
                </div>
            </RadioGroup>
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
  
  // ✨ NUEVO: Estado para controlar la acción de cierre o cancelación
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
  
  // ✨ CORRECCIÓN: Función de PDF mejorada
  // ✅ Función handleExportToPDF corregida
// Coloca esto en tu componente PermitDetailPage

const handleExportToPDF = async () => {
  if (!permit) {
    toast({ variant: 'destructive', title: 'Error', description: 'Datos del permiso no disponibles.' });
    return;
  }

  toast({
    title: 'Generando PDF...',
    description: 'Por favor, espere un momento.',
  });
  
  // ✨ IMPORTANTE: Reemplaza esta variable con tu imagen Base64 válida
  // Debe comenzar con: data:image/png;base64,iVBORw0KGgo...
  const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA50AAAL9CAYAAACorwKkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAMsAAADLAAShkWtsAAP+lSURBVHhe7N15eNxneS/899/37SGxpdlXSXb2QNhaWmhpC6WlpW/bc15aWnq6nHMgmtGMvMXOHrIQdgKBAAlJSKyZkR1nh1CWsBUIKYQlbAkk1mprmX3R7Ov3ve7nmZHknxRHXsaW7O/nuu5LttaRNJrr953nee77/wIRERERERFRl/xfxlcQERERERERnSwMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydRERERERE1DUMnURERERERNQ1DJ1ERERERETUNQydREREtIoWgOaR1WroQvvlYi1/P/k4IiKiJQydREREZ7FWq4ZK/ieoLHwf1YVvoZ7/KprFr6Oe/jSK03+L/NRfozj1VyhO/zkKU29FSdVbUJ76U1Xyf/22v0Rx8m9QnvGhlf8aGgtPop77JurZ76Caf6YdSImI6GzE0ElERHQWaDULqJd+hUbpF6im7kb50D+jeujdqB7+e2DujcD8a4DYRUBsCxDzoDXvBA7ZgWkbcMgKHLIAh83AtJQVmLLpkn/L26ct+v+H3cD8ViB6ITB3CTD3amD2D1CfeRcqM/+I4uF/RnF+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2TZrVizN6qKETNmeOy/bU/f4MK+riLJt11Wv+t8v+rNZMTXhsxFmzec2W24bJX+fHWpFdqhNg6NZfV0Ip41twAffZhOac7vtKO11onaXU1d/M/eegfCd5yL+9bci893/wtyvPo3sH3ajkoujWsqhVi1Zv41ERETrHkMnERGtC7VKAcX5CEpzYRSGH0Ty8Q8h+ehFmPv+fyP3zbch/fXXYu6e81G4qxPlO70o3+VD5U4JdLIC2ViFNOdEs0M25LQab2+c0fQi39hSq2c5fchpyTlK2eIqZbbQmi2zEixdyOvqqgvFA2NI6m/XFUw35va6MLfXaWZjNs511rcBy9bY6l1u4A4nqnf6ULxzM3JfOw+Zu9+A7EPvQvp7/4XEYzuR+vlVyD53K4qpMRTnw6iVctZvERER0XGJoZOIiNa1armAXHwY87N/QH72d8g/8WGkv9eD6Lf+D+Lf/k9kv/XXyD3wZmTvuwC5e1+B/Ne3IHtnO7J7fcjv9aG414PKXjdqsqK4xwYM2VDb3YLiLtnKK4FSVh0XbeXVku29sjXWhfxtznrodKJ8hxOlITuKe9tQvMNUaa8LhaEOZPdsQuHOM1C85zzk73kVsve+AaWH/hzzD/3fiH/7XxB5+D+QeKwP87/6AHJTv0A2/Cxy8SAqRW6TJSKiExtDJxERHddKiWHkp3+FudEfYS74feTHfoDCEx/A/CP/jeTD/47Yg/+A6H1/gdi9f47k/X+O9L1/ivl734ryQ29B4YE3ofTgn6D8zTeieP9rULzvVSjpy9eicN8bkfvGm1F86A0ofutNmH/gDUh848+Q+MbbEL//bYjd/3bE7nsHkg/+PXLfeS8KP+hG/umvIht6FHOhH2Ju4hfIzz7FLrJERHTSY+gkIqITVA21ahW1agXVStlUtYxarYpyPoXs5OPIT/0UhanHkZ/8MeZGf4DUyPcOVGHm1yinhpGd+hGy0z9FLvyk+VhV83EWqgLUqovaJREREdFiDJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DQMnURERERERNQ0DJ1ERERERETUNAydRERERERE1DT/H8erJQdKuGbFAAAAAElFTkSuQmCC";

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
        doc.addImage(logoBase64, 'PNG', margin, yPos, 30, 20);
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
          valAut?.nombre || '',
          safeFormat(valAut?.fecha, 'dd/MM/yy'),
          valRes?.nombre || '',
          safeFormat(valRes?.fecha, 'dd/MM/yy')
        ];
      });
      
      autoTable(doc, {
        startY: yPos,
        head: [
          [
            { content: 'DÍA', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
            { content: 'AUTORIDAD DEL ÁREA', colSpan: 2, styles: { halign: 'center' } },
            { content: 'RESPONSABLE', colSpan: 2, styles: { halign: 'center' } }
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
    if (!permit) return;
    setIsStatusChanging(true);
    try {
      const result = await updatePermitStatus(permit.id, newStatus, reason, permit.closure);
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
        return status === 'aprobado' && (role === 'lider_tarea' || role === 'admin');
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
    setDailyValidationName('');
    // ✨ CORRECCIÓN: Usar formato de fecha y hora
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
                if (isValid(startDate) && isValid(endDate)) {
                    durationInDays = differenceInCalendarDays(endDate, startDate) + 1;
                }
            } catch (e) {
                console.error("Error parsing dates for daily validation:", e);
            }
        }

        const renderRows = (type: 'autoridad' | 'responsable') => {
            return Array.from({ length: durationInDays }, (_, i) => {
                const v = validationData?.[type]?.[i];
                // ✨ CORRECCIÓN: Lógica de firma diferenciada por rol
                let canSignValidation = false;
                let tooltipContent = "No tienes permiso para firmar.";
                
                if (type === 'autoridad') {
                    canSignValidation = isApproved && (currentUser?.role === 'autorizante' || currentUser?.role === 'admin') && !v?.firma;
                    tooltipContent = "Solo un Autorizante o Administrador puede firmar.";
                } else if (type === 'responsable') {
                    canSignValidation = isApproved && currentUser?.uid === permit.createdBy && !v?.firma;
                    tooltipContent = "Solo el creador del permiso puede firmar.";
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
                        <h4 className="font-semibold">Autoridad del Área</h4>
                        <p className="text-xs text-muted-foreground">Entiendo las condiciones y responsabilidad.</p>
                        <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>{renderRows('autoridad')}</TableBody>
                        </Table>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold">Responsable del Trabajo</h4>
                        <p className="text-xs text-muted-foreground">Entiendo las condiciones y responsabilidad.</p>
                        <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>{renderRows('responsable')}</TableBody>
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
                                                  readOnly 
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
                                        <div key={item.id} className="flex items-center gap-2 text-xs">
                                            {(permit.anexoATS?.epp as any)?.[item.id] ? 
                                                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                                                <XCircle className="h-4 w-4 text-red-500" />
                                            }
                                            <span>{item.label} {(permit.anexoATS?.epp as any)?.[`${item.id}_spec`]}</span>
                                        </div>
                                    ))
                                )}
                                </div>
                            </Section>
                             <Section title="3. Justificación de Uso" className="mt-6">
                                {justificacionOptions.map(item => (
                                    <div key={item.id} className="flex items-center gap-2 text-xs">
                                    {(permit.anexoATS?.justificacion as any)?.[item.id] ?
                                            <CheckCircle className="h-4 w-4 text-green-500" /> :
                                            <XCircle className="h-4 w-4 text-red-500" />
                                        }
                                        <span>{item.label}</span>
                                    </div>
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
                                     <div key={e.id} className="flex items-center gap-2 text-xs">
                                         {(permit.anexoAltura?.tipoEstructura as any)?.[e.id] ? 
                                          <CheckCircle className="h-4 w-4 text-green-500" /> : 
                                          <XCircle className="h-4 w-4 text-red-500" />}
                                         <span>{e.label} {(e.id === 'otros' && (permit.anexoAltura.tipoEstructura as any).otrosCual) ? `: ${(permit.anexoAltura.tipoEstructura as any).otrosCual}` : ''}</span>
                                     </div>
                                 ))}
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                               {anexoAlturaAspectos.map(aspect => (
                                 <RadioCheck key={aspect.id} label={aspect.label} value={(permit.anexoAltura?.aspectosSeguridad as any)?.[aspect.id]} readOnly />
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

                {/* ✨ CORRECCIÓN: Sección de Cancelación y Cierre ahora es funcional */}
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
                                            <RadioCheck label="¿Se canceló el trabajo?" value={permit.closure?.cancelado || 'na'} onValueChange={(val) => handleClosureFieldChange('cancelado', val)} />
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
                                            <RadioCheck label="¿Se terminó el trabajo?" value={permit.closure?.terminado || 'na'} onValueChange={(val) => handleClosureFieldChange('terminado', val)} />
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
