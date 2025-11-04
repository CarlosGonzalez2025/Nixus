
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval, ExternalWorker, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, PermitStatus, UserRole, AnexoATS, PruebaGasesPeriodica, AnexoCaliente } from '@/types';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { updatePermitStatus, addSignatureAndNotify } from '../actions';
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
    let checkValue: string;
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
            <div className="flex gap-2 items-center text-xs font-mono">
              <span className={getOptionClasses('si')}>SI</span>
              <span className={getOptionClasses('no')}>NO</span>
              <span className={getOptionClasses('na')}>NA</span>
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
  const [isSigning, setIsSigning] = useState(false);

  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isClosureDialogOpen, setIsClosureDialogOpen] = useState(false);

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
    setIsSigning(true);

    try {
        const result = await addSignatureAndNotify(
            permit.id,
            signingRole.role,
            signingRole.type,
            signatureDataUrl,
            { uid: currentUser.uid, displayName: currentUser.displayName || null }
        );

        if (result.success) {
            toast({
                title: 'Permiso Firmado',
                description: `Has firmado como ${signatureRoles[signingRole.role]}`,
            });
            setIsSignatureDialogOpen(false);
            setSigningRole(null);
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
  
  const canSign = (role: SignatureRole, type: 'firmaApertura' | 'firmaCierre') => {
      if(!currentUser || !permit || !permit.approvals) return false;
      
      const approval = permit.approvals[role];
      const isCorrectRole = currentUser.role === role || currentUser.role === 'admin';
      
      if (type === 'firmaApertura') {
          return isCorrectRole && approval?.status === 'pendiente' && !approval?.firmaApertura && permit.status === 'pendiente_revision';
      }
       if (type === 'firmaCierre') {
          const allOpeningSignaturesDone = Object.values(permit.approvals).every(a => a.status === 'aprobado');
          return isCorrectRole && allOpeningSignaturesDone && !approval?.firmaCierre && (permit.status === 'en_ejecucion' || permit.status === 'suspendido');
      }
      return false;
  }
  
  const canChangeStatus = (targetStatus: PermitStatus) => {
    if (!currentUser || !permit) return false;
    const { role } = currentUser;
    const { status, approvals } = permit;

    if (!approvals) return false;

    const allRequiredSignaturesDone = 
      approvals.solicitante?.status === 'aprobado' &&
      approvals.autorizante?.status === 'aprobado';

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

  const getWorkTypesString = (permit: Permit): string => {
    const workTypes: string[] = [];
    
    // Primero verificar los campos booleanos nuevos
    if (permit.trabajoAlturas) workTypes.push('Trabajo en Alturas');
    if (permit.espaciosConfinados) workTypes.push('Espacios Confinados');
    if (permit.controlEnergia) workTypes.push('Control de Energías');
    if (permit.izajeCargas) workTypes.push('Izaje de Cargas');
    if (permit.trabajoCaliente) workTypes.push('Trabajo en Caliente');
    if (permit.excavaciones) workTypes.push('Excavaciones');
    if (permit.trabajoGeneral) workTypes.push('Trabajo General');
    
    // Fallback al campo workType array (compatibilidad)
    if (workTypes.length === 0 && permit.workType && Array.isArray(permit.workType)) {
      const workTypesMap: {[key: string]: string} = {
        'altura': 'Trabajo en Alturas',
        'confinado': 'Espacios Confinados',
        'energia': 'Control de Energías',
        'izaje': 'Izaje de Cargas',
        'caliente': 'Trabajo en Caliente',
        'excavacion': 'Excavaciones',
        'general': 'Trabajo General'
      };
      return permit.workType.map(key => workTypesMap[key] || key).join(', ');
    }
    
    return workTypes.length > 0 ? workTypes.join(', ') : 'Trabajo General';
  };

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
    { seccion: 'MECÁNICOS', id: 'manejo_herramientas', label: 'Manejo de herramienta o equipos eléctricos' },
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

 const atsPeligrosAgrupados = atsPeligros.reduce((acc, peligro) => {
    if (!acc[peligro.seccion]) {
        acc[peligro.seccion] = [];
    }
    acc[peligro.seccion].push(peligro);
    return acc;
 }, {} as {[key: string]: typeof atsPeligros});

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
  
    const anexoAlturaEstructuras = [
      { id: 'escaleraCuerpo', label: 'Escalera de un cuerpo' },
      { id: 'escaleraDosCuerpos', label: 'Escalera de dos cuerpos o mas' },
      { id: 'andamioTubular', label: 'Andamio Tubular Certificado' },
      { id: 'andamioColgante', label: 'Andamio Colgante' },
      { id: 'plataforma', label: 'Plataforma' },
      { id: 'manLift', label: 'Man Lift o Camion Canasta' },
      { id: 'otros', label: 'Otros' },
    ];

    const anexoAlturaAspectos = {
      left: [
        { id: 'afiliacionVigente', label: 'A. El personal ejecutante de la actividad tiene la afiliación vigente a seguridad social?' },
        { id: 'procedimientoActividad', label: 'B. Se cuenta con el procedimiento de la actividad a ejecutar?' },
        { id: 'medidasPrevencion', label: 'C. Se han determinado las medidas de prevención contra caídas?' },
        { id: 'conocenMedidas', label: 'D. Todos los ejecutantes conocen las medidas de precaución establecidas en la evaluación de riesgos?' },
        { id: 'entrenadosCertificados', label: 'E. Están los ejecutantes entrenados y se encuentran los certificados en sitio para realizar trabajos en altura?' },
        { id