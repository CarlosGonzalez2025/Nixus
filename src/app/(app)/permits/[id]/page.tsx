

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
  Edit,
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
import autoTable from 'jspdf-autotable';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


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


type SignatureRole = 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst';
const signatureRoles: { [key in SignatureRole]: string } = {
  solicitante: 'QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)',
  autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  lider_sst: 'AREA SST (si aplica)',
};


export default function PermitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, loading: userLoading } = useUser();
  const permitId = Array.isArray(params.id) ? params.id[0] : params.id;
  
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
  
  const [isSolicitanteSignAlertOpen, setIsSolicitanteSignAlertOpen] = useState(false);

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
    if (!permit) return;

    toast({
        title: 'Generando PDF...',
        description: 'Este proceso puede tardar un momento.',
    });

    try {
        const doc = new jsPDF();
        let yPos = 20;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;

        // Función para añadir nueva página si es necesario
        const checkPageBreak = (height: number) => {
            if (yPos + height > pageHeight - margin) {
                doc.addPage();
                yPos = margin;
            }
        };

        // --- ENCABEZADO ---
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('FORMATO DE PERMISO DE TRABAJO', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
        yPos += 10;

        autoTable(doc, {
            body: [
                ['Código', 'SST-FOR-12', 'Versión', '4', 'Fecha Vigencia', '23-01-2023'],
            ],
            startY: yPos,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 1 },
        });
        yPos = (doc as any).lastAutoTable.finalY + 10;
        
        // --- INFORMACIÓN GENERAL ---
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('INFORMACIÓN GENERAL', margin, yPos);
        yPos += 5;
        
        const generalInfoData = [
            ['Número de Permiso', permit.number || permit.id.substring(0,8)],
            ['Solicitante', permit.user?.displayName || 'N/A'],
            ['Fecha Creación', permit.createdAt ? format(permit.createdAt, 'dd/MM/yyyy HH:mm') : 'N/A'],
            ['Área Específica', permit.generalInfo?.areaEspecifica || 'N/A'],
            ['Planta', permit.generalInfo?.planta || 'N/A'],
            ['Proceso', permit.generalInfo?.proceso || 'N/A'],
            ['Empresa', permit.generalInfo?.empresa || 'N/A'],
            ['Contrato', permit.generalInfo?.contrato || 'N/A'],
            ['Validez Desde', permit.generalInfo?.validFrom ? format(new Date(permit.generalInfo.validFrom), 'dd/MM/yyyy HH:mm') : 'N/A'],
            ['Validez Hasta', permit.generalInfo?.validUntil ? format(new Date(permit.generalInfo.validUntil), 'dd/MM/yyyy HH:mm') : 'N/A'],
            ['Tipos de Trabajo', getWorkTypesString(permit) || 'N/A'],
        ];

        autoTable(doc, {
            head: [['Campo', 'Valor']],
            body: generalInfoData,
            startY: yPos,
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] },
            didDrawPage: (data) => { yPos = data.cursor?.y || yPos; }
        });
        yPos = (doc as any).lastAutoTable.finalY + 5;
        
        checkPageBreak(20);
        doc.text('Descripción de la Tarea:', margin, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(permit.generalInfo?.workDescription || 'N/A', 180);
        doc.text(descLines, margin, yPos);
        yPos += descLines.length * 4 + 5;


        // --- PERSONAL AUTORIZADO ---
        if (permit.workers && permit.workers.length > 0) {
            checkPageBreak(30);
            doc.setFont('helvetica', 'bold');
            doc.text('PERSONAL AUTORIZADO Y EXTERNO', margin, yPos);
            yPos += 5;

            const workersBody = permit.workers.map(w => [w.nombre, w.cedula, w.rol]);
            
            autoTable(doc, {
                head: [['Nombre', 'Cédula', 'Rol']],
                body: workersBody,
                startY: yPos,
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] },
                didDrawPage: (data) => { yPos = data.cursor?.y || yPos; }
            });
            yPos = (doc as any).lastAutoTable.finalY + 10;
        }

        // --- FIRMAS DE APROBACIÓN ---
         checkPageBreak(60);
         doc.setFont('helvetica', 'bold');
         doc.text('APROBACIONES DEL PERMISO', margin, yPos);
         yPos += 8;

         let xPos = margin;
         const signatureWidth = 40;
         const signatureHeight = 20;
         const cardWidth = (doc.internal.pageSize.width - (margin * 3)) / 2;

         for (const role of Object.keys(signatureRoles) as SignatureRole[]) {
             const approval = permit.approvals?.[role as keyof typeof permit.approvals];

             doc.setFillColor(248, 249, 250);
             doc.roundedRect(xPos, yPos, cardWidth, 45, 3, 3, 'FD');
             
             let innerY = yPos + 7;

             doc.setFont('helvetica', 'bold');
             doc.setFontSize(8);
             doc.text(signatureRoles[role], xPos + 5, innerY, { maxWidth: cardWidth - 10 });
             innerY += 8;

             doc.setFont('helvetica', 'normal');
             doc.setFontSize(9);
             if (approval?.status === 'aprobado') {
                 doc.setTextColor(40, 167, 69);
                 doc.text('APROBADO', xPos + 5, innerY);
                 doc.setTextColor(0, 0, 0);
                 innerY += 5;
                 doc.text(`Por: ${approval.userName || 'N/A'}`, xPos + 5, innerY);
                 innerY += 5;
                 doc.text(`Fecha: ${approval.signedAt ? format(parseFirestoreDate(approval.signedAt)!, 'dd/MM/yy HH:mm') : 'N/A'}`, xPos + 5, innerY);
                 innerY += 5;

                 if (approval.firmaApertura) {
                    try {
                        doc.addImage(approval.firmaApertura, 'PNG', xPos + 5, innerY, signatureWidth, signatureHeight);
                    } catch (e) {
                        doc.text('[Firma no válida]', xPos + 5, innerY + 10);
                    }
                 }

             } else {
                 doc.setTextColor(255, 193, 7);
                 doc.text('PENDIENTE DE FIRMA', xPos + 5, innerY);
                 doc.setTextColor(0, 0, 0);
             }

             // Mover a la siguiente posición
             if (xPos + cardWidth + margin < doc.internal.pageSize.width - margin) {
                 xPos += cardWidth + margin;
             } else {
                 xPos = margin;
                 yPos += 55; // Siguiente fila
                 checkPageBreak(55);
             }
         }
         yPos = Math.max(yPos, (doc as any).lastAutoTable.finalY + 10);

        doc.save(`permiso_${permit?.number || permitId.substring(0,8)}.pdf`);
        
        toast({
            title: 'PDF Generado Exitosamente',
            description: 'El documento se ha descargado.',
        });

    } catch (error: any) {
        console.error("PDF Generation Error: ", error);
        toast({
            variant: 'destructive',
            title: 'Error al Generar PDF',
            description: error.message || 'No se pudo generar el documento.',
        });
    }
};

  const openSignatureDialog = (role: SignatureRole, signatureType: 'firmaApertura' | 'firmaCierre') => {
      if (role === 'solicitante' && signatureType === 'firmaApertura') {
          setIsSolicitanteSignAlertOpen(true);
      } else {
          setSigningRole({role, type: signatureType});
          setIsSignatureDialogOpen(true);
      }
  }

  const handleConfirmSolicitanteSign = () => {
    setSigningRole({role: 'solicitante', type: 'firmaApertura'});
    setIsSignatureDialogOpen(true);
    setIsSolicitanteSignAlertOpen(false);
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
  
    const canSign = (role: SignatureRole): { can: boolean; reason?: string } => {
        if (!currentUser || !permit || !permit.approvals) return { can: false, reason: 'Cargando datos...' };

        // Regla General: Nadie puede firmar si el permiso está rechazado, cerrado o suspendido.
        if (['rechazado', 'cerrado', 'suspendido'].includes(permit.status)) {
            return { can: false, reason: `El permiso está ${permit.status}.` };
        }
        
        // El permiso debe estar en revisión para nuevas firmas de apertura.
        if (permit.status !== 'pendiente_revision') {
             return { can: false, reason: 'Las firmas de apertura ya están cerradas.' };
        }

        // El usuario debe tener el rol correcto o ser admin
        let isCorrectRole = currentUser.role === 'admin';
        if (role === 'solicitante') isCorrectRole = isCorrectRole || currentUser.role === 'solicitante' || currentUser.role === 'lider_tarea';
        else isCorrectRole = isCorrectRole || currentUser.role === role;

        if (!isCorrectRole) return { can: false, reason: 'No tienes el rol requerido.' };

        const { solicitante, autorizante, mantenimiento, lider_sst } = permit.approvals;

        switch (role) {
            case 'solicitante':
                const canSignSolicitante = !solicitante?.status || solicitante.status === 'pendiente';
                return { can: canSignSolicitante, reason: canSignSolicitante ? undefined : 'Ya has firmado.' };
            
            case 'autorizante':
                if (solicitante?.status !== 'aprobado') {
                    return { can: false, reason: 'Esperando firma del Solicitante.' };
                }
                const canSignAutorizante = !autorizante?.status || autorizante.status === 'pendiente';
                return { can: canSignAutorizante, reason: canSignAutorizante ? undefined : 'Ya has firmado.' };

            case 'mantenimiento':
                if (!permit.controlEnergia) return { can: false, reason: 'No se requiere para este trabajo.' };
                if (autorizante?.status !== 'aprobado') {
                    return { can: false, reason: 'Esperando firma del Autorizante.' };
                }
                const canSignMantenimiento = !mantenimiento?.status || mantenimiento.status === 'pendiente';
                return { can: canSignMantenimiento, reason: canSignMantenimiento ? undefined : 'Ya has firmado.' };

            case 'lider_sst':
                if (solicitante?.status !== 'aprobado' || autorizante?.status !== 'aprobado') {
                    return { can: false, reason: 'Esperando firma del Solicitante y Autorizante.' };
                }
                const canSignLiderSST = !lider_sst?.status || lider_sst.status === 'pendiente';
                return { can: canSignLiderSST, reason: canSignLiderSST ? undefined : 'Ya has firmado.' };

            default:
                return { can: false, reason: 'Rol de firma no reconocido.' };
        }
    };
  
  const canChangeStatus = (targetStatus: PermitStatus) => {
    if (!currentUser || !permit) return false;
    const { role } = currentUser;
    const { status, approvals } = permit;

    if (!approvals) return false;

    // Verifica que todas las firmas requeridas estén completas
    let allRequiredSignaturesDone = 
      approvals.solicitante?.status === 'aprobado' &&
      approvals.autorizante?.status === 'aprobado';
      
    // Si es trabajo de energía, también se requiere la firma de mantenimiento
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
        { id: 'elementosProteccionCertificados', label: 'F. Están todos los elementos de protección contra caídas en buen estado y certificados?' },
        { id: 'sistemaAseguramientoVerificado', label: 'G. Se verifico el sistema de aseguramiento de la escalera , andamio o plataforma a una estructura fija' },
        { id: 'estadoElementosVerificado', label: 'H. Se verifico el estado de: eslingas, arnes, casco, mosquetones, casco, y demas elementos necesarios para realizar el trabajo.' },
        { id: 'puntosAnclajeCertificados', label: 'I. Los puntos de anclaje y demas elementos cumplen con la resistencia de 5000 lbs por persona y estan certificados?' },
        { id: 'areaDelimitada', label: 'J. Esta delimitada y señalizada el area de trabajo' },
        { id: 'personalSaludable', label: 'K. El personal que realiza el trabajo se encuentra en condiciones adecuadas de salud para la actividad?.' },
      ],
      right: [
        { id: 'equiposAccesoBuenEstado', label: 'L. Se cuenta con todos los equipos y sistemas de acceso para trabjo en alturas en buen estado?' },
        { id: 'espacioCaidaLibreSuficiente', label: 'M. El espacio de caida libre es suficiente para evitar que la persona se golpee contra el nivel inferior.' },
        { id: 'equiposEmergenciaDisponibles', label: 'N. Se cuenta con elementos para atencion de emergencias en el area y plan de emergencias para rescate en alturas?' },
        { id: 'eppSeleccionadosCorrectamente', label: 'O. Están los elementos de protección personal seleccionados teniendo en cuenta los riesgos y requerimientos de la tarea?' },
        { id: 'plataformaSoportaCarga', label: 'P.La plataforma o estructura soporta la carga de trabajo, es firme y se evita la caída de objetos o herramientas?' },
        { id: 'supervisorConstante', label: 'Q.Existe un supervisor o acompañante constaste durante el trabajo' },
        { id: 'andamiosCompletos', label: 'R. En caso de trabajos sobre andamios, estos estan completos y adecuadamente armados (rodapies, barandas, etc.)' },
        { id: 'condicionesClimaticasAdecuadas', label: 'S.Las condiciones climaticas son adecuadas para realizar el trabajo' },
        { id: 'metodoSubirHerramientasSeguro', label: 'T.El metodo de subir herramientas es seguro' },
        { id: 'sistemasRestriccion', label: 'U. En caso de requerirse se cuenta con sistemas de restricción' },
        { id: 'sistemasPosicionamiento', label: 'V. En caso de requerirse se cuenta con sistemas de posicionamiento' },
      ]
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
                 {canChangeStatus('cerrado') && (
                     <AlertDialog open={isClosureDialogOpen} onOpenChange={setIsClosureDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button style={{backgroundColor: '#007bff'}}><Lock className="mr-2"/>Cerrar Permiso</Button>
                        </AlertDialogTrigger>
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
                        <Field label="Fecha Creación" value={permit.createdAt ? format(permit.createdAt, 'dd/MM/yyyy HH:mm') : 'N/A'} />
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
                                                <div key={peligro.id} className="flex items-center gap-2 text-xs">
                                                     {(permit.anexoATS?.peligros as any)?.[peligro.id] === 'si' 
                                                         ? <CheckCircle className="h-4 w-4 text-green-500" />
                                                         : <XCircle className="h-4 w-4 text-red-500" />
                                                     }
                                                    <span>{peligro.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </Section>
                             <Section title="2. EPP Requeridos" className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(ppe).flatMap(([category, items]) => 
                                        items.map(item => (permit.anexoATS?.epp as any)?.[item.id] && (
                                            <div key={item.id} className="flex items-center gap-2 text-xs">
                                                <Check className="h-4 w-4 text-green-500" />
                                                <span>{item.label} {(permit.anexoATS?.epp as any)?.[`${item.id}_spec`]}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Section>
                             <Section title="3. Justificación de Uso" className="mt-6">
                                 {permit.anexoATS.justificacion && Object.keys(permit.anexoATS.justificacion).map(key => (
                                    <div key={key} className="flex items-center gap-2 text-xs">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span>{key.replace(/_/g, ' ')}</span>
                                    </div>
                                 ))}
                            </Section>
                        </CollapsibleContent>
                    </Collapsible>
                )}


                {/* Sección de Anexo Altura */}
                {permit.trabajoAlturas && permit.anexoAltura && (
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
                                 {anexoAlturaEstructuras.map(e => (permit.anexoAltura?.tipoEstructura as any)?.[e.id] && (
                                     <div key={e.id} className="flex items-center gap-2 text-xs">
                                         <CheckCircle className="h-4 w-4 text-green-500" />
                                         <span>{e.label} {(e.id === 'otros' && (permit.anexoAltura.tipoEstructura as any).otrosCual) ? `: ${(permit.anexoAltura.tipoEstructura as any).otrosCual}` : ''}</span>
                                     </div>
                                 ))}
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                               {anexoAlturaAspectos.left.map(aspect => (
                                 <RadioCheck key={aspect.id} label={aspect.label} value={(permit.anexoAltura?.aspectosSeguridad as any)?.[aspect.id]} readOnly />
                               ))}
                               {anexoAlturaAspectos.right.map(aspect => (
                                 <RadioCheck key={aspect.id} label={aspect.label} value={(permit.anexoAltura?.aspectosSeguridad as any)?.[aspect.id]} readOnly />
                               ))}
                             </div>
                           </Section>
                           
                           {/* Add more sections for Altura as needed */}
                       </CollapsibleContent>
                   </Collapsible>
                )}
                
                {/* Sección de Anexo Confinado */}
                {permit.espaciosConfinados && permit.anexoConfinado && (
                   <Collapsible defaultOpen>
                        <CollapsibleTrigger className="w-full">
                           <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer">
                              <h3 className="text-lg font-bold text-purple-700 flex items-center gap-2"><Siren /> Anexo de Espacios Confinados</h3>
                              <ChevronDown className="h-5 w-5" />
                           </div>
                       </CollapsibleTrigger>
                       <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg border-purple-100">
                          {/* Add Confinado sections here */}
                       </CollapsibleContent>
                   </Collapsible>
                )}


                {/* Sección de Personal */}
                <Section title="Personal Autorizado y Externo">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Firma Apertura</TableHead>
                                <TableHead>Firma Cierre</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permit.workers?.map((worker, index) => (
                                <TableRow key={index}>
                                    <TableCell>{worker.nombre}</TableCell>
                                    <TableCell>{worker.cedula}</TableCell>
                                    <TableCell><Badge variant="secondary">{worker.rol}</Badge></TableCell>
                                    <TableCell>
                                        {worker.firmaApertura ? <Image src={worker.firmaApertura} alt="Firma" width={100} height={50} className="border rounded" /> : 'Pendiente'}
                                    </TableCell>
                                     <TableCell>
                                        {worker.firmaCierre ? <Image src={worker.firmaCierre} alt="Firma" width={100} height={50} className="border rounded" /> : 'Pendiente'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </Section>

                 {/* Sección de Firmas de Aprobación */}
                <Section title="Aprobaciones del Permiso">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(Object.keys(signatureRoles) as SignatureRole[]).map(role => {
                            if (role === 'mantenimiento' && !permit.controlEnergia) {
                                return null;
                            }
                            
                            const approval = permit.approvals?.[role as keyof typeof permit.approvals];
                            const { can, reason } = canSign(role);
                            const showSolicitanteModify = role === 'solicitante' && currentUser?.role === 'solicitante' && (!approval || approval.status === 'pendiente');

                            const SignButton = () => (
                                <Button onClick={() => openSignatureDialog(role, 'firmaApertura')} disabled={!can || isSigning} className="flex-1">
                                    {isSigning ? <Loader2 className="animate-spin" /> : <SignatureIcon className="mr-2"/>} Firmar Apertura
                                </Button>
                            );

                            return (
                                <Card key={role} className="flex flex-col">
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
                                                    <p className="text-xs">
                                                        Por: <span className="font-semibold">{approval.userName}</span>
                                                    </p>
                                                    <p className="text-xs">
                                                        Fecha: {approval.signedAt ? format(parseFirestoreDate(approval.signedAt)!, 'dd/MM/yy HH:mm') : 'N/A'}
                                                    </p>
                                                    {approval.firmaApertura && <Image src={approval.firmaApertura} alt={`Firma ${role}`} width={120} height={60} className="rounded border mt-2" />}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-yellow-600">
                                                    <Clock className="h-5 w-5" />
                                                    <span className="font-bold text-sm">Pendiente de Firma</span>
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
                                            {showSolicitanteModify && (
                                                <Button variant="outline" onClick={() => router.push(`/permits/create?edit=${permit.id}`)} className="flex-1">
                                                    <Edit className="mr-2"/> Modificar
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
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
                <DialogHeader><DialogTitle>Registrar Firma</DialogTitle></DialogHeader>
                <SignaturePad onSave={handleSaveSignature} isSaving={isSigning} />
            </DialogContent>
        </Dialog>
        
        <AlertDialog open={isSolicitanteSignAlertOpen} onOpenChange={setIsSolicitanteSignAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Firma</AlertDialogTitle>
                    <AlertDialogDescription>
                        Al firmar, confirma que la información del permiso es correcta. El permiso será remitido para autorización y ya no podrá ser modificado. ¿Desea continuar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmSolicitanteSign}>
                        Confirmar y Firmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </div>
  );
}

    
    