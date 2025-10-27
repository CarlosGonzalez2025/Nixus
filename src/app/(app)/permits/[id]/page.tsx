
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Tool, Approval, ExternalWorker, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, PermitStatus, UserRole, AnexoATS } from '@/types';
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
  
    const anexoAlturaSections = {
      trabajoConEscaleras: {
          title: "TRABAJO CON ESCALERAS",
          items: [
              { id: 'escaleraAdecuada', label: 'A.- La escalera es adecuada para el trabajo a realizar (dieléctrica)' },
              { id: 'inclinacionAdecuada', label: 'B.- La inclinación de la escalera es adecuada' },
              { id: 'apoyoFirme', label: 'C.- Las superficies de apoyo de la escalera son firmes y regulares' },
              { id: 'fijoParteSuperior', label: 'D.- Se fijó la escalera en la parte superior' },
              { id: 'buenEstado', label: 'E.- La escalera se encuentra en buen estado y limpia' },
              { id: 'conocenInstructivo', label: 'F.- Conocen los trabajadores el Instructivo trabajo seguro con escaleras' },
              { id: 'requiereProteccion', label: 'G.- Se requiere uso de sistema de protección contra caídas' },
              { id: 'otros', label: 'H.- Otros (Cual):' },
          ]
      },
      trabajoConAndamios: {
          title: "TRABAJO CON ANDAMIOS",
          items: [
              { id: 'terrenoFirme', label: 'A.- El terreno donde se apoya el andamio es firme' },
              { id: 'bienNivelado', label: 'B.- El andamio se encuentra bien nivelado' },
              { id: 'plataformasFijas', label: 'C.- Las plataformas de trabajo se encuentran fijas y en buen estado' },
              { id: 'instalaronRodapies', label: 'D.- Se instalaron los rodadapiés' },
              { id: 'barandasPerimetrales', label: 'E.- Se instalaron las barandas perimetrales en la plataforma de trabajo' },
              { id: 'certificadoAndamio', label: 'F.- Se cuenta con certificado del andamio' },
              { id: 'equiposAjustan', label: 'G.- Los equipos de protección se ajustan a los puntos de anclaje' },
              { id: 'aseguraronPuntos', label: 'H.- Se aseguraron todos los puntos de conexión' },
              { id: 'aseguroAndamio', label: 'I.- Se aseguró el andamio si es necesario a estructura fija' },
              { id: 'utilizaronVientos', label: 'J. Se utilizaron vientos e u otro mecanismo para asegurar el andamio' },
              { id: 'conocenInstructivoAndamios', label: 'K- Conocen los trabajadores el instructivo de trabajo seguro con andamios' },
              { id: 'otros', label: 'L.- Otros (Cual):' },
          ]
      },
      trabajoConCanastilla: {
          title: "TRABAJO CON CANASTILLA",
          items: [
              { id: 'aptoParaTrabajo', label: 'A.- El equipo se encuentra apto para el trabajo.' },
              { id: 'delimitadoIspector', label: 'B.- El área se encuentra delimitado y con inspector vial.' },
          ]
      },
      lineaDeVida: {
        title: "Línea de Vida",
        items: [
          { id: 'inspeccionada', label: 'A.- La línea de vida fue inspeccionada antes de su uso.' },
          { id: 'compatible', label: 'B.- Es compatible con los demás componentes del sistema.' },
          { id: 'instaladaCertificada', label: 'C.- La línea de vida fue instalada y certificada por personal calificado.' },
        ]
      },
      arnesCuerpoEntero: {
        title: "Arnés de Cuerpo Entero",
        items: [
            { id: 'inspeccionadoArnes', label: 'A.- Fue inspeccionado antes de su uso.' },
            { id: 'ajustadoCorrectamente', label: 'B.- Está ajustado correctamente al cuerpo del trabajador.' },
            { id: 'distribucionFuerza', label: 'C.- Distribuye la fuerza de detención de la caída.' },
            { id: 'compatibleArnes', label: 'D.- Es compatible con los demás componentes del sistema.' },
        ]
      },
      eslingas: {
          title: "Eslingas con absorbedor de choque",
          items: [
              { id: 'inspeccionadaEslinga', label: 'A.- Fue inspeccionada antes de su uso.' },
              { id: 'compatibleEslinga', label: 'B.- Es compatible con los demás componentes del sistema.' },
              { id: 'puntoAnclajeSeguro', label: 'C.- Están conectadas a un punto de anclaje seguro.' },
          ]
      },
      anclajesMoviles: {
          title: "Anclajes Móviles",
          items: [
              { id: 'inspeccionadoAnclaje', label: 'A.- Fueron inspeccionados antes de su uso.' },
              { id: 'compatiblesAnclaje', label: 'B.- Son compatibles con los demás componentes del sistema.' },
              { id: 'instaladosCorrectamente', label: 'C.- Están instalados correctamente según las especificaciones del fabricante.' },
          ]
      },
      mosquetones: {
          title: "Mosquetones",
          items: [
              { id: 'inspeccionadosMosqueton', label: 'A.- Fueron inspeccionados antes de su uso.' },
              { id: 'compatiblesMosqueton', label: 'B.- Son compatibles con los demás componentes del sistema.' },
              { id: 'cerradosAsegurados', label: 'C.- Están cerrados y asegurados correctamente.' },
          ]
      }
    };
    
    const anexoConfinadoChecklist = {
      left: [
          { id: 'A', label: 'A.- Existen los medios seguros de acceso al sitio de trabajo' },
          { id: 'B', label: 'B.- Se cuenta con vigía en la entrada al espacio' },
          { id: 'C', label: 'C.- Se cuenta con los EPP acordes a la actividad' },
          { id: 'D', label: 'D.- Se cuenta con un medio de comunicación entre los trabajadores y vigia' },
          { id: 'E', label: 'E.- Se realizó el aislamiento necesario para el control de energías peligrosas y fluidos (Anexo 3)' },
          { id: 'F', label: 'F.- Están calibrados los equipos de prueba atmosférica y se realizaron pruebas funcionales' },
          { id: 'G', label: 'G.- El área se ha delimitado para prevenir el acceso de personal no autorizado' },
          { id: 'H', label: 'H.- Se realizó la medición de la atmósfera (IPVS, combustible, explosiva, tóxica y inerte)' },
          { id: 'I', label: 'I.- Están claras las condiciones para cancelar el permiso' },
          { id: 'J', label: 'J.- Drenado y purgado' },
          { id: 'K', label: 'K.- Los equipos de iluminación y comunicación son a prueba de explosión.' },
          { id: 'L', label: 'L.- Esta disponible la ventilación forzada o mecánica' },
          { id: 'M', label: 'M.- Se cuenta con señalización de peligro acorde al trabajo a realizar.' },
          { id: 'N', label: 'N.- Los operarios del área conocen el uso del equipo autónomo' },
          { id: 'Ñ', label: 'Ñ.- Certificado de aptitud médica y validación certificado de entrenamiento.' },
          { id: 'O', label: 'O.- Están disponibles los aparatos de respiración autónoma' },
          { id: 'P', label: 'P.- Monitoreo atmosférico permanente' },
          { id: 'Q', label: 'Q.- Se recordó o acordó el código de señales para emergencia' },
          { id: 'R', label: 'R.- Se aplicó bloqueo, etiquetó y candadeo (completar Anexo 3)' }
      ],
      right: [
          { id: 'S', label: 'S.- Elaboración ATS y/o procedimientos de trabajo escritos' },
          { id: 'T', label: 'T.- Procedimiento de rescate y equipos para atender la emergencia' },
          { id: 'V', label: 'V.- Estan dsisponibles y se comunicaron las fichas de seguridad de los productos químicos' },
          { id: 'W', label: 'W.- existe olor perceptible' }
      ]
    }

    const anexoIzajeInfoGeneral = {
      accion: [
        { id: 'levantar', label: 'Levantar'},
        { id: 'trasladar', label: 'Trasladar'},
        { id: 'montar', label: 'Montar'},
        { id: 'desmontar', label: 'Desmontar'},
        { id: 'cargar', label: 'Cargar'},
        { id: 'descargar', label: 'Descargar'},
      ],
      pesoCarga: [
        { id: 'menor1000', label: 'Menor a 1000 kg'},
        { id: 'entre1000_2000', label: 'Entre 1000 kg y 2000 kg'},
        { id: 'entre2000_3000', label: 'Entre 2000 kg y 3000 kg'},
        { id: 'entre3000_4000', label: 'Entre 3000 kg y 4000 kg'},
        { id: 'entre4000_5000', label: 'Entre 4000 kg y 5000 kg'},
        { id: 'mayor5000', label: 'Mas de 5000'},
      ],
      equipoUtilizar: [
        'Puente grua', 'Camion Grus', 'Grua Movil', 'Tome Grua', 'Retro excavadora', 'Tole Handler', 'Diferenciales / Polipasto'
      ]
    };
  
    const anexoIzajeAspectos = {
      left: [
        { id: 'A', label: 'A. Está estabilizado el terreno donde se encuentra el equipo de izaje.' },
        { id: 'B', label: 'B. El operador visualiza bien la carga y la operación que va a realizar.' },
        { id: 'C', label: 'C. Se calculo tecnicamente la maniobra. (Se cuenta con plan de izaje de cargas).' },
        { id: 'D', label: 'D. Se encuentra señalizada y demarcada el área de trabajo.' },
        { id: 'E', label: 'E. Se verifico la capacidad de cargue del equipo de izaje' },
        { id: 'F', label: 'F. Se retiraron los curiosos del área de izaje y del radio del equipo de izaje.' },
        { id: 'G', label: 'G. Existe comunicación clara entre el operador, el encargado de la actividad y quienes participan en ella.' },
        { id: 'H', label: 'H. Se realizo el ATS (Analisis de Trabajo Seguro) para la ejecución de la actividad.' },
        { id: 'I', label: 'I. Se encuentran en buen estado las eslingas, aparejos y demás elementos de sujeción o accesorios de izaje. Sin uniones o hebras' },
        { id: 'J', label: 'J. Los polines para nivelación de las grúas están en buen estado.' },
        { id: 'K', label: 'K. Los polines quedan estables con respecto al terreno.' },
      ],
      right: [
        { id: 'L', label: 'L. Está dispuesta y despejada el área donde se colocarán los elementos a izar.' },
        { id: 'M', label: 'M. No existen personas bajo la carga izada.' },
        { id: 'N', label: 'N. Se evaluó el área donde se va a llevar la carga izada y el área de movimiento de la carga.' },
        { id: 'O', label: 'O. La actividad esta realizándose con la distancia de redes électricas recomendada?' },
        { id: 'P', label: 'P. Las condiciones climiticas son buenas para la realización de la actividad?' },
        { id: 'Q', label: 'Q. El equipo tiene conexión a tierra?' },
        { id: 'R', label: 'R. Se verifico que no halla ningun material que pudiera caer arriba de la carga al ser izada?' },
        { id: 'S', label: 'S. Hay un señalizador capacitado y entrenado para la actividad?' },
        { id: 'T', label: 'T. Las partes del equipo a realizar izaje se encuentran en buen estado y no evidencian soldaduras o uniones inadecuadas' },
        { id: 'U', label: 'U. Se verifico que los colaboradores estén afiliados al Sistema de Seguridad Social (EPS, ARL, AFP).' },
      ]
    };
  
    const anexoIzajePrecauciones = [
      {id: 'inspeccion', label: 'INSPECCION GRUA/APAR'},
      {id: 'carnet', label: 'CARNET DIA VIG CA ALUM'},
      {id: 'certificacion', label: 'CERTIFICACION OPERADOR RI'},
      {id: 'plan_izaje', label: 'PLAN DE IZAJE'},
      {id: 'uso_epps', label: 'USO DE EPPS'},
      {id: 'bloqueo_etiquetado', label: 'BLOQUEO Y ETIQUETADO'},
      {id: 'clima_seguro', label: 'CLIMA SEGURO'},
      {id: 'vigia', label: 'VIGIA PARA LINEAS ELECTRICA'},
      {id: 'apoyo_terreno', label: 'APOYO DEL TERRENO'},
      {id: 'comunicacion_radial', label: 'COMUNICACION RADIAL/LUMINICA'},
      {id: 'plan_rescate', label: 'PLAN DE RESCATE'},
      {id: 'senalizacion_area', label: 'SEÑALIZACION Y DEMARCACION AREA'},
      {id: 'estabilizadores', label: 'ESTABILIZADORES & TERRENO'},
    ];
    
  const anexoEnergiasTension: { id: AnexoEnergias['tensionExpuesta'], label: string }[] = [
    { id: 'muy_baja', label: 'Muy baja tensión (Tensiones menores de 25 V).' },
    { id: 'baja', label: 'Baja tensión (Tensión nominal mayor o igual 25 V y menor o igual a 1000 V).' },
    { id: 'media', label: 'Media tensión (Tensión nominal superior a 1000 V e inferior a 57,5 kV).' },
    { id: 'alta', label: 'Alta tensión (Tensiones mayores o iguales a 57,5 kV y menores o iguales a 230 kV).' },
    { id: 'extra_alta', label: 'Extra alta tensión (Tensiones superiores a 230kV).' },
  ];

  const anexoEnergiasPlaneacion = [
    { id: 'personalHabilitado', label: 'Personal habilitado, certificado de competencia laboral vigente (Conte, Conaltel, Matrícula profesional)' },
    { id: 'evaluacionViabilidad', label: 'El personal habilitado evalúa la viabilidad técnica (visita previa) y el riesgo asociado para las personas y para el sistema, cumpliendo las etapas de diagnóstico, planeación y ejecución de trabajos.' },
    { id: 'noSimultaneos', label: 'No se realizan trabajos simultáneos sin y con tensión por el mismo trabajador en la misma área de trabajo.' },
    { id: 'autorizacionMantenimiento', label: 'Autorización del área de mantenimiento' },
    { id: 'revisionInformacion', label: 'Revisión de información técnica del sistema (diagrama unifilar, planos)' },
    { id: 'procedimientoNormalizado', label: 'Se cuenta con un procedimiento normalizado para realizar la actividad y ATS' },
    { id: 'supervisionControl', label: 'Se realizar supervisión y control en el sitio de trabajo considerando en forma prioritaria la detección y el control de los riesgos, vigilando el cumplimiento estricto de las normas y procedimientos de seguridad aplicables' },
  ];

  return (
    <div className="flex flex-1 flex-col bg-gray-100 pb-16 md:pb-0">
        {/* Action Bar */}
        <div className="max-w-4xl mx-auto w-full bg-gray-100 p-4 sticky top-0 md:top-auto z-10 md:relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                 <Button variant="ghost" onClick={() => router.push('/permits')} className="justify-self-start">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
                <div className="col-span-1 md:col-span-3 flex justify-end items-center gap-2">
                     <Button onClick={handleExportToPDF} variant="outline" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        PDF
                    </Button>
                    {canChangeStatus('aprobado') && <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleChangeStatus('aprobado')} disabled={isStatusChanging}><CheckCircle className="mr-2 h-4 w-4" /> Aprobar</Button> }
                    {canChangeStatus('rechazado') && 
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setIsRejectionDialogOpen(true)} disabled={isStatusChanging}><XCircle className="mr-2 h-4 w-4" /> Rechazar</Button> 
                    }
                    {canChangeStatus('en_ejecucion') && <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => handleChangeStatus('en_ejecucion')} disabled={isStatusChanging}><PlayCircle className="mr-2 h-4 w-4" /> Iniciar Ejecución</Button>}
                    {canChangeStatus('suspendido') && <Button size="sm" variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700" onClick={() => handleChangeStatus('suspendido')} disabled={isStatusChanging}><PauseCircle className="mr-2 h-4 w-4" /> Suspender</Button>}
                    {canChangeStatus('cerrado') && <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsClosureDialogOpen(true)} disabled={isStatusChanging}><Lock className="mr-2 h-4 w-4" /> Cerrar Permiso</Button>}
                </div>
            </div>
        </div>

        {/* Permit Document Wrapper for PDF generation */}
        <div className="max-w-4xl mx-auto w-full bg-white p-4 md:p-8 shadow-lg md:rounded-lg border font-sans">
             <header ref={headerRef} className="flex justify-between items-start pb-4 border-b-4 border-primary">
                <div>
                     <Image src="https://i.postimg.cc/VsZBSkmH/Italcol.png" alt="Logo Italcol" width={120} height={40} />
                </div>
                <div className="text-right flex-shrink-0">
                    <h1 className="text-xl md:text-3xl font-bold text-gray-800">PERMISO DE TRABAJO</h1>
                    <p className="font-mono text-sm md:text-base text-gray-600 mt-2">N°: {permit.number || permit.id.substring(0, 10)}</p>
                    {permit.createdAt && (
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Creado: {format(parseFirestoreDate(permit.createdAt)!, "dd/MM/yyyy HH:mm")}
                      </p>
                    )}
                    <Badge className={`mt-2 ${statusInfo.bgColor} ${statusInfo.color} text-base`} >
                        <statusInfo.icon className="mr-2 h-4 w-4" />
                        {statusInfo.text}
                    </Badge>
                </div>
            </header>
            
            <main ref={contentRef} className="print:p-0">
                <div className="my-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800 print:hidden">
                    <p><strong>Marque dentro de los cuadros SI/NO/NA según el caso. Si alguna de las verificaciones a las preguntas es "NO", NO SE DEBERA INICIAR EL TRABAJO HASTA TANTO NO SE SOLUCIONE LA SITUACIÓN, SI ES N/A REALICE SU JUSTIFICACIÓN EN OBSERVACIONES.</strong></p>
                </div>

                {permit.anexoATS && (
                    <Collapsible className="space-y-6 mt-6 border rounded-lg" defaultOpen>
                        <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-600">ANÁLISIS DE TRABAJO SEGURO - ATS</h3>
                            <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 md:p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="ÁREA" value={permit.anexoATS.area} />
                                <Field label="SOLICITANTE" value={permit.anexoATS.solicitante} />
                                <Field label="FECHA Y HORA DE INICIO" value={permit.anexoATS.fechaInicio ? format(new Date(permit.anexoATS.fechaInicio), "dd/MM/yyyy HH:mm") : undefined} />
                                <Field label="FECHA Y HORA DE TERMINACIÓN" value={permit.anexoATS.fechaTerminacion ? format(new Date(permit.anexoATS.fechaTerminacion), "dd/MM/yyyy HH:mm") : undefined} />
                            </div>
                            <Field label="DESCRIPCIÓN DE LA TAREA" value={permit.anexoATS.descripcionTarea} fullWidth />
                            <div>
                                <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Identificación de Peligros, Riesgos y Controles</h4>
                                <div className="space-y-4">
                                    {Object.entries(atsPeligrosAgrupados).map(([seccion, peligros]) => (
                                        <div key={seccion}>
                                            <h5 className="font-semibold text-gray-600 text-xs mb-2 uppercase">{seccion}</h5>
                                            <div className="space-y-1">
                                                {peligros.map(peligro => (
                                                    <RadioCheck 
                                                        key={peligro.id} 
                                                        label={peligro.label} 
                                                        value={permit.anexoATS?.peligros?.[peligro.id]} 
                                                        readOnly 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
                
                <div className="space-y-6 mt-6">
                    <Section title="INFORMACIÓN GENERAL- Aplica a todos los Permisos">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Field label="Fecha de Expedición:" value={permit.generalInfo?.fechaExpedicion ? format(new Date(permit.generalInfo.fechaExpedicion), "dd/MM/yyyy") : undefined} />
                                <Field label="Planta:" value={permit.generalInfo?.planta} />
                                <Field label="Proceso:" value={permit.generalInfo?.proceso} />
                                <Field label="Contrato:" value={permit.generalInfo?.contrato} />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Empresa:" value={permit.generalInfo?.empresa} />
                                <Field label="Nombre del Solicitante:" value={permit.generalInfo?.nombreSolicitante} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <Field label="Duración Desde:" value={permit.generalInfo?.validFrom ? format(new Date(permit.generalInfo.validFrom), "dd/MM/yyyy HH:mm") : undefined}/>
                               <Field label="Duración Hasta:" value={permit.generalInfo?.validUntil ? format(new Date(permit.generalInfo.validUntil), "dd/MM/yyyy HH:mm") : undefined}/>
                            </div>
                            <Field label="ALCANCE. El trabajo se LIMITA a lo siguiente (Alcance del Trabajo - Descripcion y Area/Equipo):" value={permit.generalInfo?.workDescription} fullWidth/>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs text-gray-500">Equipos y/o Herramientas</h4>
                                    <div className="grid grid-cols-1 gap-1 mt-1">
                                        {permit.generalInfo?.tools?.map((tool: Tool, index: number) => (
                                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-xs">
                                                <span>{tool.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                 <Field label="No. Trabajadores" value={permit.generalInfo?.numTrabajadores} />
                            </div>
                        </div>
                    </Section>

                    
                    <Section title="Verificaciones Previas">
                        <RadioCheck label="REUNIÓN DE INICIO" value={permit.generalInfo?.reunionInicio} readOnly />
                        <RadioCheck label="ATS Verificar el correcto diligenciamiento del ATS en el sitio de trabajo" value={permit.generalInfo?.atsVerificado} readOnly />
                    </Section>
                    
                    {permit.anexoAltura && (
                      <Collapsible className="space-y-6 mt-6 border rounded-lg" defaultOpen>
                        <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-600">ANEXO 1 - TRABAJOS EN ALTURA</h3>
                            <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 md:p-6 space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="A.- Altura de trabajo:" value={permit.anexoAltura.alturaTrabajo} />
                                <Field label="B.- Coordinador TSA" value={permit.anexoAltura.coordinadorTSA?.toUpperCase()} />
                                <Field label="C.- Auxiliar TSA" value={permit.anexoAltura.auxiliarTSA?.toUpperCase()} />
                                <Field label="D.- Elaboración ATS y procedimientos" value={permit.anexoAltura.elaboracionATS?.toUpperCase()} />
                            </div>
                            <Field label="Requerimiento de claridad o espacio libre de caída" value={permit.anexoAltura.claridadEspacioLibre} fullWidth/>
                            
                            {Object.entries(anexoAlturaSections).map(([sectionKey, sectionData]) => (
                              <div key={sectionKey}>
                                <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">{sectionData.title}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                  {sectionData.items.map(item => (
                                    <RadioCheck 
                                      key={item.id} 
                                      label={item.label} 
                                      value={(permit.anexoAltura as any)?.[sectionKey]?.[item.id]} 
                                      readOnly
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}

                            <div className="mt-4">
                              <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Coordinador de Trabajos en Altura</h4>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 <Field label="Nombres y Apellidos" value={permit.anexoAltura.coordinadorTrabajosAltura?.nombres} />
                                 <Field label="Cédula" value={permit.anexoAltura.coordinadorTrabajosAltura?.cedula} />
                                 <Field label="Firma Apertura" value={
                                     permit.anexoAltura.coordinadorTrabajosAltura?.firmaApertura ? <Image src={permit.anexoAltura.coordinadorTrabajosAltura.firmaApertura} alt="Firma Coordinador" width={120} height={60} className="bg-white rounded border" /> : 'Pendiente'
                                 }/>
                               </div>
                            </div>
                            
                            <Field label="Observaciones / Supervisión" value={permit.anexoAltura.observaciones} fullWidth/>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {permit.anexoConfinado && (
                        <Collapsible className="space-y-6 mt-6 border rounded-lg" defaultOpen>
                            <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                                <h3 className="text-sm font-bold uppercase text-gray-600">ANEXO 2 - TRABAJOS EN ESPACIOS CONFINADOS</h3>
                                <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 md:p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Tipo" value={`Tipo ${permit.anexoConfinado.tipo}`} />
                                    <Field label="Grado de Peligro" value={`Grado ${permit.anexoConfinado.gradoPeligro}`} />
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Lista de Verificación</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                        {[...anexoConfinadoChecklist.left, ...anexoConfinadoChecklist.right].map(item => (
                                            <RadioCheck key={item.id} label={item.label} value={permit.anexoConfinado?.checklist?.[item.id]} readOnly />
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Mediciones Atmosféricas</h4>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Hora</TableHead>
                                                <TableHead>O2</TableHead>
                                                <TableHead>CO</TableHead>
                                                <TableHead>H2S</TableHead>
                                                <TableHead>LEL</TableHead>
                                                <TableHead>Firma</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {permit.anexoConfinado.mediciones?.map(med => (
                                                <TableRow key={med.id}>
                                                    <TableCell>{med.hora}</TableCell>
                                                    <TableCell>{med.o2}</TableCell>
                                                    <TableCell>{med.co}</TableCell>
                                                    <TableCell>{med.h2s}</TableCell>
                                                    <TableCell>{med.lel}</TableCell>
                                                    <TableCell>
                                                        {med.firma ? <Image src={med.firma} alt="Firma" width={80} height={40} className="bg-white rounded" /> : 'Pendiente'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Supervisor de Espacios Confinados</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Field label="Nombres y Apellidos" value={permit.anexoConfinado.supervisor?.nombres} />
                                        <Field label="Cédula" value={permit.anexoConfinado.supervisor?.cedula} />
                                        <Field label="Firma Apertura" value={
                                            permit.anexoConfinado.supervisor?.firmaApertura ? <Image src={permit.anexoConfinado.supervisor.firmaApertura} alt="Firma Supervisor" width={120} height={60} className="bg-white rounded border" /> : 'Pendiente'
                                        }/>
                                    </div>
                                </div>

                                <Field label="Observaciones / Supervisión" value={permit.anexoConfinado.observaciones} fullWidth />

                            </CollapsibleContent>
                        </Collapsible>
                    )}

                    {permit.anexoEnergias && (
                        <Collapsible className="space-y-6 mt-6 border rounded-lg" defaultOpen>
                            <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                                <h3 className="text-sm font-bold uppercase text-gray-600">ANEXO 3 - TRABAJOS CON ENERGÍAS</h3>
                                <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 md:p-6 space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Tensión a la cual el personal estará expuesto</h4>
                                    <Field label="Nivel de Tensión" value={anexoEnergiasTension.find(t => t.id === permit.anexoEnergias?.tensionExpuesta)?.label || 'No especificado'} />
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Planeación</h4>
                                    <div className="space-y-1">
                                        {anexoEnergiasPlaneacion.map(item => (
                                            <RadioCheck key={item.id} label={item.label} value={permit.anexoEnergias?.planeacion?.[item.id]} readOnly />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Método de trabajo</h4>
                                    <Field label="Método" value={permit.anexoEnergias.metodoTrabajo === 'con_tension' ? 'Con Tensión' : 'Sin Tensión'} />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}

                     {permit.anexoIzaje && (
                        <Collapsible className="space-y-6 mt-6 border rounded-lg" defaultOpen>
                            <CollapsibleTrigger className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center cursor-pointer group rounded-t-lg">
                                <h3 className="text-sm font-bold uppercase text-gray-600">ANEXO 4 - IZAJE DE CARGAS</h3>
                                <ChevronDown className="h-5 w-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform"/>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 md:p-6 space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Información General</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-md">
                                        <div>
                                            <h5 className="font-semibold text-xs mb-2">Acción a Realizar</h5>
                                            {anexoIzajeInfoGeneral.accion.map(item => (
                                                <div key={item.id} className="flex items-center space-x-2">
                                                    <Checkbox id={`view-izaje-accion-${item.id}`} checked={permit.anexoIzaje?.informacionGeneral?.accion?.[item.id]} disabled/>
                                                    <label htmlFor={`view-izaje-accion-${item.id}`} className="text-xs font-normal">{item.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-xs mb-2">Peso de la Carga</h5>
                                            {anexoIzajeInfoGeneral.pesoCarga.map(item => (
                                                <div key={item.id} className="flex items-center space-x-2">
                                                    <Checkbox id={`view-izaje-peso-${item.id}`} checked={permit.anexoIzaje?.informacionGeneral?.pesoCarga?.[item.id]} disabled/>
                                                    <label htmlFor={`view-izaje-peso-${item.id}`} className="text-xs font-normal">{item.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-xs mb-2">Equipo a Utilizar (Capacidad en Ton)</h5>
                                            {anexoIzajeInfoGeneral.equipoUtilizar.map(item => (
                                                <div key={item} className="flex items-center gap-2 mb-1">
                                                    <label className="flex-1 text-xs">{item}</label>
                                                    <span className="font-mono text-xs p-1 bg-gray-100 rounded w-16 text-center">{permit.anexoIzaje?.informacionGeneral?.equipoUtilizar?.[item] || 'N/A'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Aspectos Requeridos</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                      {[...anexoIzajeAspectos.left, ...anexoIzajeAspectos.right].map(item => (
                                            <RadioCheck key={item.id} label={item.label} value={permit.anexoIzaje?.aspectosRequeridos?.[item.id]} readOnly />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Precauciones y Controles Específicos</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {anexoIzajePrecauciones.map(item => (
                                            <div key={item.id} className="flex items-center space-x-2 text-xs">
                                                <Checkbox id={`view-izaje-prec-${item.id}`} checked={permit.anexoIzaje?.precauciones?.[item.id]} disabled/>
                                                <label htmlFor={`view-izaje-prec-${item.id}`} className="font-normal">{item.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase">Líder de Izaje - Proyecto</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Field label="Nombre y apellido" value={permit.anexoIzaje.liderIzaje?.nombre} />
                                        <Field label="Cédula" value={permit.anexoIzaje.liderIzaje?.cedula} />
                                        <Field label="Firma Apertura" value={
                                            permit.anexoIzaje.liderIzaje?.firmaApertura ? <Image src={permit.anexoIzaje.liderIzaje.firmaApertura} alt="Firma Lider Izaje" width={120} height={60} className="bg-white rounded border" /> : 'Pendiente'
                                        }/>
                                    </div>
                                </div>

                                <Field label="Observaciones" value={permit.anexoIzaje.observaciones} fullWidth />
                            </CollapsibleContent>
                        </Collapsible>
                    )}


                    <Section title="Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control estén implementadas">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {hazards.map(hazard => (
                              <RadioCheck key={hazard.id} label={hazard.label} value={permit.hazards?.[hazard.id]} readOnly />
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
                                         <RadioCheck key={item.id} label={item.label} value={permit.ppe?.[item.id]} readOnly />
                                    ))}
                                   </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    <Section title="Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {ppeSystems.map(system => (
                              <RadioCheck key={system.id} label={system.label} value={permit.ppeSystems?.[system.id]} readOnly />
                          ))}
                        </div>
                    </Section>

                    <Section title="Notificación y Emergencias">
                        <RadioCheck label="El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados" value={permit.emergency?.notification} readOnly />
                         <div className="mt-4 space-y-1">
                          {emergencyQuestions.map(item => (
                              <RadioCheck key={item.id} label={item.label} value={permit.emergency?.[item.id]} readOnly />
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
                                                        <div className="text-center text-xs mt-1">Firmado el {approval.signedAt ? format(parseFirestoreDate(approval.signedAt)!, "dd/MM/yyyy 'a las' HH:mm") : 'N/A'}</div>
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
                                 <RadioCheck readOnly label="Se informo al responsable del área sobre la culminación de las actividades." value={permit.closure?.informeCulminacion}/>
                                 <RadioCheck readOnly label="Área se encuentra despejada, ordenada, demarcación retirada." value={permit.closure?.areaDespejada}/>
                                 <RadioCheck readOnly label="Se evidencia partículas o material encendido que pueda generar riesgo de fuego incipiente" value={permit.closure?.evidenciaParticulas}/>
                                 <RadioCheck readOnly label="Se continua con la labor de manera normal." value={permit.closure?.continuaLabor}/>
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
                                <RadioCheck readOnly label="Se retiraron todos los dispositivos de bloqueo(candados y tarjetas)." value={permit.closure?.dispositivosRetirados}/>
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
             <DialogContent className="w-[90vw] max-w-lg">
                 <DialogHeader>
                    <DialogTitle>Firmar Permiso de Trabajo</DialogTitle>
                    <DialogDescription>
                        {signingRole && `Está firmando como ${signatureRoles[signingRole.role]}. Su firma quedará registrada.`}
                    </DialogDescription>
                </DialogHeader>
                <SignaturePad onSave={handleSaveSignature} isSaving={isSigning} />
            </DialogContent>
        </Dialog>
        
        <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rechazar Permiso de Trabajo</DialogTitle>
                    <DialogDescription>
                        Por favor, especifique el motivo del rechazo. Este motivo será registrado y visible para el solicitante.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea 
                        placeholder="Escriba aquí el motivo del rechazo..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={4}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button 
                        variant="destructive"
                        onClick={() => handleChangeStatus('rechazado', rejectionReason)}
                        disabled={!rejectionReason || isStatusChanging}
                    >
                        {isStatusChanging ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Confirmar Rechazo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog open={isClosureDialogOpen} onOpenChange={setIsClosureDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cerrar Permiso de Trabajo</DialogTitle>
                    <DialogDescription>
                        Complete las verificaciones finales antes de cerrar el permiso.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <RadioCheck 
                        label="¿Se informó al responsable del área?" 
                        value={permit.closure?.informeCulminacion} 
                        onValueChange={(v) => handleClosureFieldChange('informeCulminacion', v)}
                    />
                     <RadioCheck 
                        label="¿Área despejada y ordenada?" 
                        value={permit.closure?.areaDespejada} 
                        onValueChange={(v) => handleClosureFieldChange('areaDespejada', v)}
                    />
                    <RadioCheck 
                        label="¿Sin partículas o material encendido?" 
                        value={permit.closure?.evidenciaParticulas} 
                        onValueChange={(v) => handleClosureFieldChange('evidenciaParticulas', v)}
                    />
                     <RadioCheck 
                        label="¿Se continúa con la labor normal?" 
                        value={permit.closure?.continuaLabor} 
                        onValueChange={(v) => handleClosureFieldChange('continuaLabor', v)}
                    />
                     <RadioCheck 
                        label="¿Se retiraron dispositivos de bloqueo?" 
                        value={permit.closure?.dispositivosRetirados} 
                        onValueChange={(v) => handleClosureFieldChange('dispositivosRetirados', v)}
                    />
                    <div>
                        <label className="text-xs text-gray-500">Hora de Cierre</label>
                        <Input 
                            type="time" 
                            value={permit.closure?.horaCierre || ''}
                            onChange={(e) => handleClosureFieldChange('horaCierre', e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleChangeStatus('cerrado')}
                        disabled={isStatusChanging}
                    >
                        {isStatusChanging ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Lock className="mr-2 h-4 w-4" />}
                        Confirmar Cierre
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  );
}

    