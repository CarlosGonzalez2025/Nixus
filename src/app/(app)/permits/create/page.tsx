
'use client';

import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { savePermitDraft, addSignatureAndNotify } from '../actions';
import { createPermitOffline, addSignatureOffline } from '@/lib/offline-permits';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { handleStaleServerActionError } from '@/lib/server-action-error';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  Shield,
  Upload,
  Camera,
  Wand2,
  Loader2,
  X,
  UserPlus,
  Signature,
  FileUp,
  Edit,
  Plus,
  Trash2,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Copy,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
import type { Permit, ExternalWorker, Tool, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, AnexoATS, PermitGeneralInfo, ValidacionDiaria, AutorizacionPersona, PruebaGasesPeriodica, JustificacionATS, EppEmergencias } from '@/types';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { PermitFormProvider, usePermitForm, validateEmergencias } from './form-context';
import { GeneralInfoStep } from './components/GeneralInfoStep';
import { AtsStep } from './components/AtsStep';
import { AnexoAlturaStep } from './components/AnexoAlturaStep';
import { AnexoConfinadoStep } from './components/AnexoConfinadoStep';
import { AnexoEnergiaStep } from './components/AnexoEnergiaStep';
import { AnexoCalienteStep } from './components/AnexoCalienteStep';
import { AnexoIzajeStep } from './components/AnexoIzajeStep';
import { AnexoExcavacionesStep } from './components/AnexoExcavacionesStep';
import { VerificacionPeligrosStep } from './components/VerificacionPeligrosStep';
import { EppEmergenciasStep, eppItems } from './components/EppEmergenciasStep';
import { WorkersStep } from './components/WorkersStep';
import { ReviewStep } from './components/ReviewStep';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const workerRoles = [
  "Trabajador autorizado",
  "Ayudante de seguridad",
  "Coordinador de TA",
  "Supervisor de EC",
  "Soldador",
  "Operador de equipo para elevación de personas",
  "Vigía",
  "Trabajador Entrante",
  "Otro"
];

const epsEntidades = [
  "Salud Total",
  "Sanitas",
  "Savia Salud",
  "Compensar",
  "Sura",
  "Nueva EPS",
  "Famisanar",
  "Coomeva",
  "Medimás",
  "Capital Salud",
  "SOS",
  "Cruz Blanca",
  "Aliansalud",
  "Coosalud",
  "Mutual Ser",
  "Emssanar",
];

const arlEntidades = [
  "AXA Colpatria",
  "Bolívar",
  "Colmena",
  "Sura",
  "Positiva",
  "Liberty",
  "Equidad",
  "Aurora",
];

const pensionEntidades = [
  "Protección",
  "Porvenir",
  "Colpensiones",
  "Colfondos",
  "Old Mutual",
  "Skandia",
];

function CreatePermitWizard() {
  const { user } = useUser();
  const { toast } = useToast();
  const isOnline = useOnlineStatus();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { state: formData, dispatch, isFormDirty } = usePermitForm();
  
  const [draftId, setDraftId] = useState<string | undefined>(undefined);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newPermitInfo, setNewPermitInfo] = useState({ id: '', number: '' });

  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<Partial<ExternalWorker> | null>(null);
  const [editingWorkerIndex, setEditingWorkerIndex] = useState<number | null>(null);
  const [otroSocialMode, setOtroSocialMode] = useState({ eps: false, arl: false, pensiones: false });
  
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<string | null>(null);
  const [signatureContext, setSignatureContext] = useState<any>(null);

  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const originalPushStateRef = useRef<typeof window.history.pushState | null>(null);
  const pendingNavArgsRef = useRef<Parameters<typeof window.history.pushState> | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Advierte al usuario si intenta cerrar o recargar la página con el formulario sucio
  useEffect(() => {
    if (!isFormDirty || showSuccessDialog) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isFormDirty, showSuccessDialog]);

  // Intercepta navegación in-app de Next.js (pushState) cuando el formulario tiene datos
  useEffect(() => {
    if (!isFormDirty || showSuccessDialog) return;

    const original = window.history.pushState.bind(window.history);
    originalPushStateRef.current = original;

    window.history.pushState = (...args: Parameters<typeof window.history.pushState>) => {
      pendingNavArgsRef.current = args;
      setShowLeaveDialog(true);
    };

    return () => {
      if (originalPushStateRef.current) {
        window.history.pushState = originalPushStateRef.current;
        originalPushStateRef.current = null;
      }
    };
  }, [isFormDirty, showSuccessDialog]);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      setIsLoadingForm(true);
      const fetchDraft = async () => {
        try {
          const docRef = doc(db, 'permits', editId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && (docSnap.data().status === 'borrador' || docSnap.data().status === 'pendiente_revision')) {
            const draftData = docSnap.data() as Permit;
            
            dispatch({ type: 'SET_ENTIRE_STATE', payload: draftData });
            
            setDraftId(editId);
          } else {
            toast({ variant: "destructive", title: "Permiso no encontrado o no editable", description: "El permiso que intenta editar no existe o ya no está en estado de borrador." });
            router.push('/permits');
          }
        } catch (error) {
          console.error("Error cargando borrador:", error);
          toast({ variant: "destructive", title: "Error al Cargar", description: "No se pudo cargar la información del permiso." });
        } finally {
          setIsLoadingForm(false);
        }
      };
      fetchDraft();
    } else {
      setIsLoadingForm(false);
    }
  }, [searchParams, dispatch, router, toast]);

  useEffect(() => {
    if (user && !isLoadingForm && !draftId) {
      dispatch({ type: 'INITIALIZE_WITH_USER', payload: user });
    }
  }, [user, isLoadingForm, draftId, dispatch]);


  const openNewWorkerDialog = () => {
    setEditingWorkerIndex(null);
    setCurrentWorker({
      email: undefined,
      nombre: '',
      cedula: '',
      rol: '',
      otroRol: '',
      eps: '',
      arl: '',
      pensiones: '',
      tsaTec: { tec: false, tsa: false },
      entrenamiento: { tec: false, tsa: false, otro: false, otroCual: '' },
      firmaApertura: '',
      firmaCierre: ''
    });
    setOtroSocialMode({ eps: false, arl: false, pensiones: false });
    setIsWorkerDialogOpen(true);
  };
  
  const openEditWorkerDialog = (worker: ExternalWorker, index: number) => {
    setEditingWorkerIndex(index);
    setCurrentWorker(worker);
    setOtroSocialMode({
      eps: !!worker.eps && !epsEntidades.includes(worker.eps),
      arl: !!worker.arl && !arlEntidades.includes(worker.arl),
      pensiones: !!worker.pensiones && !pensionEntidades.includes(worker.pensiones),
    });
    setIsWorkerDialogOpen(true);
  };

  const handleSaveWorker = () => {
    if (!currentWorker || !currentWorker.nombre || !currentWorker.cedula || !currentWorker.rol) {
      toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Nombre, cédula y rol son requeridos.',
      });
      return;
    }
    
    if (currentWorker.rol === 'Otro' && !currentWorker.otroRol?.trim()) {
      toast({
        variant: 'destructive',
        title: 'Especificación Requerida',
        description: 'Por favor, especifique el rol "Otro".',
      });
      return;
    }

    const missingSocialSecurityFields = getMissingSocialSecurityFields(currentWorker);
    if (missingSocialSecurityFields.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Seguridad Social Requerida',
        description: `Debe registrar ${missingSocialSecurityFields.join(', ')} antes de guardar el trabajador.`,
        duration: 7000,
      });
      return;
    }

    if (editingWorkerIndex !== null) {
      const updatedWorkers = [...(formData.workers || [])];
      updatedWorkers[editingWorkerIndex] = currentWorker as ExternalWorker;
      dispatch({ type: 'SET_WORKERS', payload: updatedWorkers });
      toast({ title: 'Trabajador Actualizado' });
    } else {
      dispatch({ type: 'ADD_WORKER', payload: currentWorker as ExternalWorker });
      toast({ title: 'Trabajador Agregado' });
    }

    setIsWorkerDialogOpen(false);
    setCurrentWorker(null);
    setEditingWorkerIndex(null);
  };
  
  const removeWorker = (index: number) => {
    const updatedWorkers = (formData.workers || []).filter((_, i) => i !== index);
    dispatch({ type: 'SET_WORKERS', payload: updatedWorkers });
  };
  
  const handleWorkerInputChange = (field: keyof ExternalWorker, value: any) => {
    setCurrentWorker(prev => prev ? { ...prev, [field]: value } : null);
  };

  const getMissingSocialSecurityFields = (worker: Partial<ExternalWorker>) => {
    const missing: string[] = [];
    if (!worker.eps?.trim()) missing.push('EPS');
    if (!worker.arl?.trim()) missing.push('ARL');
    if (!worker.pensiones?.trim()) missing.push('Pensión');
    return missing;
  };

  const getWorkerCountMismatch = (workers: ExternalWorker[], numTrabajadores?: string) => {
    const expectedAdditionalWorkers = Number.parseInt(numTrabajadores || '0', 10);
    if (!Number.isFinite(expectedAdditionalWorkers) || expectedAdditionalWorkers < 0) {
      return 'El número de trabajadores no es válido.';
    }

    const actualAdditionalWorkers = Math.max(0, workers.length - 1);
    if (actualAdditionalWorkers !== expectedAdditionalWorkers) {
      return `Ha especificado ${expectedAdditionalWorkers} trabajador(es) adicional(es), pero hay ${actualAdditionalWorkers} registrado(s).`;
    }

    return null;
  };

  const openSignaturePad = (target: string, context?: any) => {
    setSignatureTarget(target);
    setSignatureContext(context);
    setIsSignaturePadOpen(true);
  };

  const handleSaveSignature = (signatureDataUrl: string) => {
    if (!signatureTarget) return;

    if (signatureTarget === 'worker.firmaApertura' || signatureTarget === 'worker.firmaCierre') {
       setCurrentWorker(prev => prev ? { ...prev, [signatureTarget.split('.')[1]]: signatureDataUrl } : null);
    } else {
       dispatch({ type: 'UPDATE_SIGNATURE', payload: { target: signatureTarget, signature: signatureDataUrl, context: signatureContext }});
    }

    setIsSignaturePadOpen(false);
    setSignatureTarget(null);
    setSignatureContext(null);
  };
  
  const handleSaveDraft = async (): Promise<boolean> => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error de Autenticación' });
      return false;
    }

    setIsSavingDraft(true);
    try {
      const result = await savePermitDraft({
          userId: user.uid,
          userDisplayName: user.displayName || null,
          userEmail: user.email || null,
          userPhotoURL: user.photoURL || null,
          draftId: draftId,
          ...formData
      });

      if (result.success && result.permitId) {
        if (!draftId) {
          setDraftId(result.permitId);
        }
        toast({ title: "Borrador Guardado", description: "Tu progreso ha sido guardado." });
        return true;
      } else {
        throw new Error(result.error || 'No se pudo guardar el borrador.');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error al Guardar', description: error.message });
      return false;
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleLeaveConfirm = () => {
    if (originalPushStateRef.current) {
      window.history.pushState = originalPushStateRef.current;
      originalPushStateRef.current = null;
    }
    const args = pendingNavArgsRef.current;
    pendingNavArgsRef.current = null;
    setShowLeaveDialog(false);
    if (args) window.history.pushState(...args);
  };

  const handleSaveDraftAndLeave = async () => {
    const saved = await handleSaveDraft();
    if (saved) {
      handleLeaveConfirm();
    } else {
      setShowLeaveDialog(false);
      pendingNavArgsRef.current = null;
    }
  };

  const handleSaveAndSubmit = async () => {
    const solicitanteWorker = formData.workers?.[0];
    const firmaParaEnvio = solicitanteWorker?.firmaApertura || formData.solicitanteFirmaApertura;
    if (!user || !user.role || !firmaParaEnvio) {
      toast({ variant: 'destructive', title: 'Error', description: 'Falta la firma del solicitante o la información del usuario.' });
      return;
    }

    const normalizedWorkers = [...(formData.workers || [])];
    if (normalizedWorkers[0] && !normalizedWorkers[0].firmaApertura) {
      normalizedWorkers[0] = { ...normalizedWorkers[0], firmaApertura: firmaParaEnvio };
    }
    const normalizedFormData = {
      ...formData,
      workers: normalizedWorkers,
      solicitanteFirmaApertura: firmaParaEnvio,
    };
    const missingWorkerSignatures = normalizedWorkers.filter(w => !w.firmaApertura);
    const missingSignatureCount = !normalizedWorkers[0]?.firmaApertura
      ? Math.max(1, missingWorkerSignatures.length)
      : missingWorkerSignatures.length;
    if (missingSignatureCount > 0) {
      toast({
        variant: 'destructive',
        title: 'Faltan firmas de trabajadores',
        description: `No se puede enviar el permiso hasta completar todas las firmas de apertura. Faltan ${missingSignatureCount} firma(s).`,
        duration: 7000,
      });
      return;
    }

    const workerCountMismatch = getWorkerCountMismatch(normalizedWorkers, normalizedFormData.generalInfo.numTrabajadores);
    if (workerCountMismatch) {
      toast({
        variant: 'destructive',
        title: 'Número de Trabajadores no Coincide',
        description: workerCountMismatch,
        duration: 8000,
      });
      return;
    }

    const workersWithMissingSocialSecurity = normalizedWorkers
      .map((worker, index) => ({ worker, index, missing: getMissingSocialSecurityFields(worker) }))
      .filter(item => item.missing.length > 0);
    if (workersWithMissingSocialSecurity.length > 0) {
      const first = workersWithMissingSocialSecurity[0];
      toast({
        variant: 'destructive',
        title: 'Seguridad Social Incompleta',
        description: `${first.worker.nombre || `Trabajador ${first.index + 1}`} tiene pendiente: ${first.missing.join(', ')}.`,
        duration: 8000,
      });
      return;
    }

    setIsSubmitting(true);
    let currentPermitId = draftId;

    // ── RUTA OFFLINE ─────────────────────────────────────────────────────────
    if (!isOnline) {
      try {
        const offlineUser = { uid: user.uid, displayName: user.displayName || null, role: user.role, empresa: user.empresa };
        const nombreSolicitante = solicitanteWorker?.nombre || user.displayName || null;

        const createResult = await createPermitOffline(
          { ...normalizedFormData, status: 'pendiente_revision', createdBy: user.uid, approvals: { solicitante: { status: 'pendiente' }, autorizante: { status: 'pendiente' }, mantenimiento: { status: 'pendiente' }, lider_sst: { status: 'pendiente' }, coordinador_alturas: { status: 'pendiente' }, supervisor_confinado: { status: 'pendiente' } }, closure: {} } as any,
          offlineUser
        );

        if (!createResult.success) throw new Error(createResult.error);
        currentPermitId = createResult.permitId;
        setDraftId(currentPermitId);

        // Firmas especiales offline (coordinador alturas / supervisor confinado)
        if (normalizedFormData.selectedWorkTypes?.alturas) {
          const cw = normalizedFormData.workers?.find(w => w.rol === 'Coordinador de TA' && w.firmaApertura);
          if (cw?.firmaApertura) await addSignatureOffline(currentPermitId, 'coordinador_alturas', cw.firmaApertura, { ...offlineUser, displayName: cw.nombre || offlineUser.displayName });
        }
        if (normalizedFormData.selectedWorkTypes?.confinado) {
          const sw = normalizedFormData.workers?.find(w => w.rol === 'Supervisor de EC' && w.firmaApertura);
          if (sw?.firmaApertura) await addSignatureOffline(currentPermitId, 'supervisor_confinado', sw.firmaApertura, { ...offlineUser, displayName: sw.nombre || offlineUser.displayName });
        }

        await addSignatureOffline(currentPermitId, 'solicitante', firmaParaEnvio, { ...offlineUser, displayName: nombreSolicitante });

        toast({
          title: '¡Permiso guardado sin conexión!',
          description: `El permiso ${createResult.permitNumber} fue guardado localmente. Las notificaciones se enviarán al recuperar la señal.`,
          duration: 7000,
        });
        dispatch({ type: 'RESET_FORM' });
        router.push(`/permits/${currentPermitId}`);
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error offline', description: error.message });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // ── RUTA ONLINE (flujo original) ─────────────────────────────────────────
    try {
      // Guardar siempre el estado completo antes de registrar firmas.
      // Esto cubre borradores existentes: workers/anexos/datos quedan persistidos
      // antes de que el permiso cambie a pendiente_revision.
      const draftResult = await savePermitDraft({
        userId: user.uid,
        userDisplayName: user.displayName || null,
        userEmail: user.email || null,
        userPhotoURL: user.photoURL || null,
        draftId: currentPermitId || undefined,
        ...normalizedFormData
      });

      if (!draftResult.success || !draftResult.permitId) {
        throw new Error(draftResult.error || "No se pudo guardar el borrador actualizado.");
      }
      currentPermitId = draftResult.permitId;
      setDraftId(currentPermitId);

      // Registrar firma del Coordinador de TA si aplica
      if (normalizedFormData.selectedWorkTypes?.alturas) {
        const coordWorker = normalizedFormData.workers?.find(w => w.rol === 'Coordinador de TA' && w.firmaApertura);
        if (coordWorker?.firmaApertura) {
          await addSignatureAndNotify(
            currentPermitId,
            'coordinador_alturas',
            'firmaApertura',
            coordWorker.firmaApertura,
            { uid: user.uid, displayName: coordWorker.nombre || user.displayName || null, role: user.role, empresa: user.empresa },
            "Firma de Coordinador de Trabajo en Alturas."
          );
        }
      }

      // Registrar firma del Supervisor de EC si aplica
      if (normalizedFormData.selectedWorkTypes?.confinado) {
        const supervisorWorker = normalizedFormData.workers?.find(w => w.rol === 'Supervisor de EC' && w.firmaApertura);
        if (supervisorWorker?.firmaApertura) {
          await addSignatureAndNotify(
            currentPermitId,
            'supervisor_confinado',
            'firmaApertura',
            supervisorWorker.firmaApertura,
            { uid: user.uid, displayName: supervisorWorker.nombre || user.displayName || null, role: user.role, empresa: user.empresa },
            "Firma de Supervisor de Espacios Confinados."
          );
        }
      }

      // Ahora, intenta agregar la firma del solicitante y enviar
      const nombreSolicitante = solicitanteWorker?.nombre || user.displayName || null;
      const signatureResult = await addSignatureAndNotify(
        currentPermitId,
        'solicitante',
        'firmaApertura',
        firmaParaEnvio,
        { uid: user.uid, displayName: nombreSolicitante, role: user.role, empresa: user.empresa },
        "Firma inicial de creación de permiso."
      );

      if (signatureResult.success) {
        toast({
          title: '¡Permiso Enviado!',
          description: 'El permiso ha sido enviado para su aprobación.',
        });
        dispatch({ type: 'RESET_FORM' });
        router.push(`/permits/${currentPermitId}`);
      } else {
        // Manejar el caso específico de prerrequisito
        if (signatureResult.error && signatureResult.error.includes('Se requiere primero la firma')) {
          toast({
            title: 'Paso Adicional Requerido',
            description: signatureResult.error,
            className: 'bg-blue-100 dark:bg-blue-900',
            duration: 8000,
          });
          dispatch({ type: 'RESET_FORM' });
          router.push(`/permits/${currentPermitId}`);
        } else {
          // Es un error diferente
          throw new Error(signatureResult.error || "No se pudo enviar el permiso a revisión.");
        }
      }
    } catch (error: any) {
      // Si la app está desincronizada (Service Worker viejo), actualizar y recargar
      if (handleStaleServerActionError(error)) {
        toast({
          title: 'Actualizando la aplicación…',
          description: 'Se detectó una nueva versión. La página se recargará en unos segundos.',
          className: 'bg-blue-50 border-blue-300',
          duration: 5000,
        });
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Falló el Envío',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = {
    primary: 'hsl(var(--primary))',
    dark: 'hsl(var(--primary))', 
    success: 'hsl(var(--accent))',
  };
  
  const baseSteps = [
    { label: "Info General", condition: true },
    { label: "ATS", condition: true },
    { label: "Anexo Altura", condition: formData.selectedWorkTypes.alturas},
    { label: "Anexo Confinado", condition: formData.selectedWorkTypes.confinado},
    { label: "Anexo Energías", condition: formData.selectedWorkTypes.energia},
    { label: "Anexo Caliente", condition: formData.selectedWorkTypes.caliente},
    { label: "Anexo Izaje", condition: formData.selectedWorkTypes.izaje},
    { label: "Anexo Excavaciones", condition: formData.selectedWorkTypes.excavacion},
    { label: "Verificación Peligros", condition: false },
    { label: "Emergencias", condition: true },
    { label: "Trabajadores", condition: true },
    { label: "Revisión", condition: true }
  ];

  const steps = baseSteps.filter(s => s.condition);
  const currentStepInfo = steps[step - 1];

  const canProceed = () => {
    if (!currentStepInfo) return false;
    const currentLabel = currentStepInfo.label;

    if (currentLabel === 'Info General') { 
        const { 
            areaEspecifica, planta, proceso, contrato, 
            requiereArea, requierePlanta, requiereProceso, requiereContrato,
            nombreSolicitante, validFrom, validUntil, workDescription, 
            numTrabajadores, responsable, empresa 
        } = formData.generalInfo;
        
        const missingFields = [];

        if (requiereArea === 'si' && !areaEspecifica) missingFields.push("Área o equipo específico");
        if (requierePlanta === 'si' && !planta) missingFields.push("Planta");
        if (requiereProceso === 'si' && !proceso) missingFields.push("Proceso");
        if (requiereContrato === 'si' && !contrato) missingFields.push("Contrato");
        if (!empresa) missingFields.push("Empresa");
        if (!nombreSolicitante) missingFields.push("Nombre solicitante");
        if (!validFrom) missingFields.push("Fecha de inicio");
        if (!validUntil) missingFields.push("Fecha de fin");
        if (!workDescription?.trim()) missingFields.push("Descripción de la Tarea");
        if (!numTrabajadores) missingFields.push("No. Trabajadores");
        if (!responsable?.nombre) missingFields.push("Nombre del Responsable");
        if (!responsable?.cargo) missingFields.push("Cargo del Responsable");
        if (!responsable?.compania) missingFields.push("Compañía del Responsable");

        if (!Object.values(formData.selectedWorkTypes).some(v => v)) {
            missingFields.push("Tipo de Trabajo (al menos uno)");
        }

        if (missingFields.length > 0) {
            toast({
                variant: "destructive",
                title: "Campos Incompletos en Información General",
                description: `Por favor, complete los siguientes campos obligatorios: ${missingFields.join(', ')}.`,
                duration: 6000,
            });
            return false;
        }
    }

    if (currentLabel === 'ATS') {
        const { peligros, justificacion, epp, peligrosAdicionales } = formData.anexoATS || {};
        
        const hasPeligro = (peligros && Object.values(peligros).some(value => value === 'si')) || (peligrosAdicionales && peligrosAdicionales.length > 0);
        if (!hasPeligro) {
          toast({
              variant: "destructive",
              title: "Validación Requerida en ATS",
              description: "Debe seleccionar los peligros asociados e identificados para la actividad, para continuar.",
          });
          return false;
        }
        
        const hasEpp = epp && Object.values(epp).some(value => value === true || (typeof value === 'string' && value.trim() !== ''));
        if (!hasEpp) {
            toast({
                variant: "destructive",
                title: "Validación Requerida en ATS",
                description: "Debe seleccionar al menos un EPP requerido para continuar.",
            });
            return false;
        }

        if (!justificacion || !Object.values(justificacion).some(value => value === true)) {
            toast({
                variant: "destructive",
                title: "Validación Requerida en ATS",
                description: "Debe seleccionar al menos una 'Justificación para el uso del ATS' para continuar.",
            });
            return false;
        }
    }
    
    if (currentLabel === 'Anexo Altura') {
      const anexo = formData.anexoAltura;
      if (anexo?.tipoEstructura?.otros && !String(anexo.tipoEstructura.otrosCual ?? '').trim()) {
        toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar el otro tipo de estructura en el Anexo de Alturas." });
        return false;
      }
      if (!anexo?.afectaciones?.observaciones?.trim()) {
        toast({ variant: "destructive", title: "Campo Requerido", description: "Debe ingresar las observaciones en la sección de Afectaciones del Anexo de Alturas." });
        return false;
      }
    }

    if (currentLabel === 'Anexo Confinado') {
      const anexo = formData.anexoConfinado;
      if (anexo?.identificacionPeligros?.procedimientoComunicacion === 'si' && !anexo.procedimientoComunicacionCual?.trim()) {
        toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar cuál es el procedimiento de comunicación en el Anexo de Espacios Confinados." });
        return false;
      }
    }
    
    if (currentLabel === 'Anexo Energías') {
      const anexo = formData.anexoEnergias;
      const trabajosEnCaliente = anexo?.trabajosEnCaliente as any;
      if (trabajosEnCaliente?.otro_check && !(trabajosEnCaliente?.otro || '').trim()) {
        toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar el 'otro' aspecto en Trabajos en Caliente." });
        return false;
      }
      const energiasPeligrosas = anexo?.energiasPeligrosas as any;
      if (energiasPeligrosas?.otra_check && !(energiasPeligrosas?.otra || '').trim()) {
          toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar el 'otro' tipo de energía peligrosa." });
          return false;
      }
    }

    if (currentLabel === 'Verificación Peligros') {
        const { verificacionPeligros } = formData;
        if (!verificacionPeligros || Object.values(verificacionPeligros).every(category => !Object.values(category).some(value => value === 'si'))) {
            toast({
                variant: "destructive",
                title: "Validación Requerida en Verificación de Peligros",
                description: "Debe seleccionar 'SI' en al menos un peligro para poder continuar.",
            });
            return false;
        }
    }

    if (currentLabel === 'Emergencias') {
        const validation = validateEmergencias(formData.eppEmergencias as EppEmergencias);
        
        if (!validation.isValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            toast({
                variant: 'destructive',
                title: '🚫 No se puede continuar',
                description: validation.hasNoResponses 
                    ? 'TODAS las condiciones de emergencia (A-F) deben estar en "SI" para poder avanzar al siguiente paso.'
                    : 'Complete todos los campos requeridos de emergencias antes de continuar.',
                duration: 8000,
            });
            return false;
        }
    }

    if (currentLabel === 'Trabajadores') {
      const additionalWorkers = parseInt(formData.generalInfo.numTrabajadores || '0', 10);
      const workers = formData.workers || [];
      const solicitante = workers[0];
      const otherWorkers = workers.slice(1);

      // 1. El solicitante debe haber firmado
      if (!solicitante?.firmaApertura) {
        toast({
          variant: 'destructive',
          title: 'Firma del Ejecutante Requerida',
          description: 'El ejecutante del trabajo (solicitante) debe completar sus datos y registrar su firma antes de continuar.',
          duration: 7000,
        });
        return false;
      }

      // 2. Deben coincidir los trabajadores adicionales registrados
      if (otherWorkers.length !== additionalWorkers) {
        toast({
          variant: 'destructive',
          title: 'Número de Trabajadores no Coincide',
          description: `Ha especificado ${additionalWorkers} trabajador(es) adicional(es) pero ha registrado ${otherWorkers.length}. Ajuste la lista o el campo en Información General.`,
          duration: 8000,
        });
        return false;
      }

      // 3. Todos los trabajadores adicionales deben tener firma
      const missingSignatures = otherWorkers.filter(w => !w.firmaApertura);
      if (missingSignatures.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Faltan Firmas de Trabajadores',
          description: `Todos los trabajadores deben registrar su firma de apertura. Faltan ${missingSignatures.length} firma(s).`,
          duration: 6000,
        });
        return false;
      }

      // 4. Coordinador de TA debe estar registrado y firmado si hay trabajo en alturas
      if (formData.selectedWorkTypes?.alturas) {
        const hasCoordSigned = otherWorkers.some(w => w.rol === 'Coordinador de TA' && w.firmaApertura);
        if (!hasCoordSigned) {
          toast({
            variant: 'destructive',
            title: 'Firma del Coordinador de Alturas Requerida',
            description: 'Este permiso incluye Trabajo en Alturas. Debe registrar al Coordinador de TA en el equipo de trabajo y capturar su firma de apertura antes de continuar.',
            duration: 8000,
          });
          return false;
        }
      }

      // 5. Supervisor de EC debe estar registrado y firmado si hay espacios confinados
      if (formData.selectedWorkTypes?.confinado) {
        const hasSupervisorSigned = otherWorkers.some(w => w.rol === 'Supervisor de EC' && w.firmaApertura);
        if (!hasSupervisorSigned) {
          toast({
            variant: 'destructive',
            title: 'Firma del Supervisor de Espacios Confinados Requerida',
            description: 'Este permiso incluye Espacios Confinados. Debe registrar al Supervisor de EC en el equipo de trabajo y capturar su firma de apertura antes de continuar.',
            duration: 8000,
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleUpdateATS = useCallback((updates: Partial<AnexoATS>) => {
    dispatch({ type: 'UPDATE_ATS', payload: updates });
  }, [dispatch]);

  const handleUpdateEppEmergencias = useCallback((updates: Partial<EppEmergencias>) => {
    dispatch({ type: 'UPDATE_EPP_EMERGENCIAS', payload: updates });
  }, [dispatch]);

  const renderStepContent = () => {
    if (isLoadingForm) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (!currentStepInfo) {
        return (
            <div className="text-center p-8">
                <h3 className="text-xl font-bold">Error de Carga</h3>
                <p className="text-muted-foreground">No se pudo cargar el paso actual.</p>
            </div>
        );
    }
    const currentStepLabel = currentStepInfo.label;

    switch (currentStepLabel) {
      case "Info General":
        return <GeneralInfoStep />;
      case "ATS":
        return <AtsStep anexoATS={formData.anexoATS as AnexoATS} onUpdateATS={handleUpdateATS} />;
      case "Anexo Altura":
        return <AnexoAlturaStep />;
      case "Anexo Confinado":
        return <AnexoConfinadoStep />;
      case "Anexo Energías":
        return <AnexoEnergiaStep />;
      case "Anexo Caliente":
        return <AnexoCalienteStep />;
      case "Anexo Izaje":
        return <AnexoIzajeStep />;
      case "Anexo Excavaciones":
        return <AnexoExcavacionesStep />;
      case "Verificación Peligros":
        return <VerificacionPeligrosStep />;
      case "Emergencias":
        return <EppEmergenciasStep eppEmergencias={formData.eppEmergencias as EppEmergencias} onUpdate={handleUpdateEppEmergencias} />;
      case "Trabajadores":
        return <WorkersStep 
                  workers={formData.workers || []}
                  onAddWorker={openNewWorkerDialog}
                  onEditWorker={openEditWorkerDialog}
                  onRemoveWorker={removeWorker}
               />;
      case "Revisión":
        return <ReviewStep />;
      default:
        return (
          <div className="text-center p-8">
            <h3 className="text-xl font-bold">Paso en Construcción</h3>
            <p className="text-muted-foreground">{currentStepLabel}</p>
          </div>
        );
    }
  };

  return (
    <>
    <div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
      <header className="text-white shadow-lg sticky top-0 z-20" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <Image 
                    src="https://i.postimg.cc/RZ16KqFY/Whats-App-Image-2026-02-05_at_10_19_08.jpg"
                    alt="Crear Permiso Icon"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="hidden md:block border-l border-white border-opacity-30 pl-3">
                  <h1 className="text-xl font-bold">Nuevo Permiso de Trabajo</h1>
                  <p className="text-sm text-white text-opacity-80">
                    Paso {step} de {steps.length}: {currentStepInfo?.label}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                if (confirm('¿Está seguro de cancelar? Los cambios no guardados en el borrador actual se mantendrán.')) {
                  router.push('/dashboard');
                }
              }}
              variant="ghost"
              className="bg-white bg-opacity-20 hover:bg-opacity-30"
            >
              <X size={18} className="mr-2" />
              <span className="hidden sm:inline">Cancelar</span>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="bg-white border-b shadow-sm sticky top-[68px] md:top-[80px] z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s_info, s_idx) => {
              const s = s_idx + 1;
              return(
              <div key={s} className="flex items-center flex-1">
                <div className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm transition-all ${
                  s === step ? 'ring-4 scale-110 shadow-lg text-white' :
                  s < step ? 'text-white' :
                  'bg-gray-200 text-gray-600'
                }`}
                style={s <= step ? { backgroundColor: s === step ? colors.primary : colors.success } : {}}>
                  {s < step ? <CheckCircle size={20}/> : s_idx + 1}
                </div>
                {s < steps.length && (
                  <div className="flex-1 h-1 mx-1 md:mx-2 rounded" style={{ 
                    backgroundColor: s < step ? colors.success : '#E5E7EB' 
                  }} />
                )}
              </div>
            )})}
          </div>
          <div className="grid" style={{gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`}}>
            {steps.map((s_info, s_idx) => (
              <span key={s_idx} className="text-[10px] md:text-xs text-center font-medium" style={{ color: step === s_idx + 1 ? colors.primary : '#6B7280' }}>{s_info.label}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto p-4 pb-24 md:pb-24 w-full">
        <div key={step} className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          {renderStepContent()}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t shadow-lg z-20">
          <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 sm:gap-4">
            <Button
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting || step === 1}
              variant="outline"
              className="px-4 py-3 h-auto md:px-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            
            <Button
                onClick={handleSaveDraft}
                variant="outline"
                disabled={isSavingDraft || isSubmitting}
                className="px-4 py-3 h-auto md:px-6"
            >
                {isSavingDraft ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                Borrador
            </Button>

            {step === steps.length ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button
                            disabled={isSubmitting || (!formData.workers?.[0]?.firmaApertura && !formData.solicitanteFirmaApertura)}
                            /* firmaApertura del solicitante viene de workers[0] (WorkersStep) o como fallback de solicitanteFirmaApertura (ReviewStep) */
                            className="flex-1 py-3 h-auto bg-green-600 hover:bg-green-700 text-lg"
                        >
                            {isSubmitting ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                            <Save size={22} className="mr-2" />
                            )}
                            <span>Enviar Permiso para Autorización</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro de enviar el permiso?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Una vez enviado, el permiso cambiará a "Pendiente de Autorización" y se notificará a los autorizantes. No podrá editarlo después de este punto.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSaveAndSubmit} disabled={isSubmitting}>
                                 {isSubmitting ? 'Enviando...' : 'Sí, enviar ahora'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
              <Button
                onClick={() => {
                  if (canProceed()) {
                    setStep(step + 1);
                  }
                }}
                disabled={isSubmitting}
                className="flex-1 py-3 h-auto"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle />
                      ¡Permiso Creado Exitosamente!
                  </DialogTitle>
                  <DialogDescription>
                      El permiso N° <strong>{newPermitInfo.number}</strong> ha sido creado y enviado para revisión.
                  </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-between gap-2">
                  <Button variant="outline" onClick={() => router.push('/dashboard')}>
                      Ir al Dashboard
                  </Button>
                   <Button onClick={() => router.push(`/permits/${newPermitInfo.id}`)}>
                      Ver Detalles del Permiso
                   </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
      
        <Dialog open={isWorkerDialogOpen} onOpenChange={setIsWorkerDialogOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <UserPlus className="h-5 w-5 text-primary"/>
                        {editingWorkerIndex !== null ? 'Editar' : 'Agregar'} Trabajador
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">Complete la información del trabajador</p>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto px-1">
                    <div className="space-y-6 py-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                                <Users className="h-4 w-4"/>
                                Información Personal
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="worker-name" className="text-sm font-medium">
                                        Nombres y Apellidos <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="worker-name" 
                                        value={currentWorker?.nombre || ''} 
                                        onChange={(e) => handleWorkerInputChange('nombre', e.target.value)}
                                        placeholder="Ingrese nombre completo"
                                        className="h-10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="worker-cedula" className="text-sm font-medium">
                                        Cédula <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="worker-cedula" 
                                        value={currentWorker?.cedula || ''} 
                                        onChange={(e) => handleWorkerInputChange('cedula', e.target.value)}
                                        placeholder="Número de identificación"
                                        className="h-10"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="worker-rol" className="text-sm font-medium">
                                        Cargo/Rol <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={currentWorker?.rol || ''} onValueChange={(value) => handleWorkerInputChange('rol', value)}>
                                        <SelectTrigger id="worker-rol" className="h-10">
                                            <SelectValue placeholder="Seleccione un rol"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workerRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {currentWorker?.rol === 'Otro' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="worker-otro-rol" className="text-sm font-medium">
                                            Especifique el rol <span className="text-red-500">*</span>
                                        </Label>
                                        <Input 
                                            id="worker-otro-rol" 
                                            value={currentWorker?.otroRol || ''} 
                                            onChange={(e) => handleWorkerInputChange('otroRol', e.target.value)}
                                            placeholder="Describa el rol"
                                            className="h-10"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                                <Shield className="h-4 w-4"/>
                                Certificaciones y Entrenamiento
                            </h3>
                            
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Certificado Aptitud Médica</Label>
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="cert-tec" 
                                                checked={currentWorker?.tsaTec?.tec || false} 
                                                onCheckedChange={checked => handleWorkerInputChange('tsaTec', { ...currentWorker?.tsaTec, tec: !!checked })} 
                                            /> 
                                            <Label htmlFor="cert-tec" className="font-normal cursor-pointer">TEC</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="cert-tsa" 
                                                checked={currentWorker?.tsaTec?.tsa || false} 
                                                onCheckedChange={checked => handleWorkerInputChange('tsaTec', { ...currentWorker?.tsaTec, tsa: !!checked })} 
                                            /> 
                                            <Label htmlFor="cert-tsa" className="font-normal cursor-pointer">TSA</Label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Entrenamiento / Capacitación</Label>
                                    <div className="flex flex-wrap gap-6">
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="ent-tec" 
                                                checked={currentWorker?.entrenamiento?.tec || false} 
                                                onCheckedChange={checked => handleWorkerInputChange('entrenamiento', { ...currentWorker?.entrenamiento, tec: !!checked })} 
                                            /> 
                                            <Label htmlFor="ent-tec" className="font-normal cursor-pointer">TEC</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="ent-tsa" 
                                                checked={currentWorker?.entrenamiento?.tsa || false} 
                                                onCheckedChange={checked => handleWorkerInputChange('entrenamiento', { ...currentWorker?.entrenamiento, tsa: !!checked })} 
                                            /> 
                                            <Label htmlFor="ent-tsa" className="font-normal cursor-pointer">TSA</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox 
                                                id="ent-otro" 
                                                checked={currentWorker?.entrenamiento?.otro || false} 
                                                onCheckedChange={checked => handleWorkerInputChange('entrenamiento', { ...currentWorker?.entrenamiento, otro: !!checked })} 
                                            /> 
                                            <Label htmlFor="ent-otro" className="font-normal cursor-pointer">Otro</Label>
                                        </div>
                                    </div>
                                    {currentWorker?.entrenamiento?.otro && (
                                        <Input 
                                            placeholder="Especificar otro entrenamiento" 
                                            value={currentWorker?.entrenamiento?.otroCual || ''} 
                                            onChange={e => handleWorkerInputChange('entrenamiento', { ...currentWorker?.entrenamiento, otroCual: e.target.value })}
                                            className="mt-2 h-10"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg space-y-4">
                            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                                <FileText className="h-4 w-4"/>
                                Afiliación a Seguridad Social
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="worker-eps" className="text-sm font-medium">EPS <span className="text-destructive">*</span></Label>
                                    <Select
                                        value={otroSocialMode.eps ? '__otro__' : (currentWorker?.eps || '')}
                                        onValueChange={(value) => {
                                            if (value === '__otro__') {
                                                setOtroSocialMode(prev => ({ ...prev, eps: true }));
                                                handleWorkerInputChange('eps', '');
                                            } else {
                                                setOtroSocialMode(prev => ({ ...prev, eps: false }));
                                                handleWorkerInputChange('eps', value);
                                            }
                                        }}
                                    >
                                        <SelectTrigger id="worker-eps" className="h-10">
                                            <SelectValue placeholder="Seleccione EPS"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {epsEntidades.map(eps => (
                                                <SelectItem key={eps} value={eps}>{eps}</SelectItem>
                                            ))}
                                            <SelectItem value="__otro__">Otra EPS</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {otroSocialMode.eps && (
                                        <Input
                                            placeholder="Nombre de la EPS"
                                            value={currentWorker?.eps || ''}
                                            onChange={(e) => handleWorkerInputChange('eps', e.target.value)}
                                            className="h-10"
                                            autoFocus
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="worker-arl" className="text-sm font-medium">ARL <span className="text-destructive">*</span></Label>
                                    <Select
                                        value={otroSocialMode.arl ? '__otro__' : (currentWorker?.arl || '')}
                                        onValueChange={(value) => {
                                            if (value === '__otro__') {
                                                setOtroSocialMode(prev => ({ ...prev, arl: true }));
                                                handleWorkerInputChange('arl', '');
                                            } else {
                                                setOtroSocialMode(prev => ({ ...prev, arl: false }));
                                                handleWorkerInputChange('arl', value);
                                            }
                                        }}
                                    >
                                        <SelectTrigger id="worker-arl" className="h-10">
                                            <SelectValue placeholder="Seleccione ARL"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {arlEntidades.map(arl => (
                                                <SelectItem key={arl} value={arl}>{arl}</SelectItem>
                                            ))}
                                            <SelectItem value="__otro__">Otra ARL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {otroSocialMode.arl && (
                                        <Input
                                            placeholder="Nombre de la ARL"
                                            value={currentWorker?.arl || ''}
                                            onChange={(e) => handleWorkerInputChange('arl', e.target.value)}
                                            className="h-10"
                                            autoFocus
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="worker-pension" className="text-sm font-medium">Pensión <span className="text-destructive">*</span></Label>
                                    <Select
                                        value={otroSocialMode.pensiones ? '__otro__' : (currentWorker?.pensiones || '')}
                                        onValueChange={(value) => {
                                            if (value === '__otro__') {
                                                setOtroSocialMode(prev => ({ ...prev, pensiones: true }));
                                                handleWorkerInputChange('pensiones', '');
                                            } else {
                                                setOtroSocialMode(prev => ({ ...prev, pensiones: false }));
                                                handleWorkerInputChange('pensiones', value);
                                            }
                                        }}
                                    >
                                        <SelectTrigger id="worker-pension" className="h-10">
                                            <SelectValue placeholder="Seleccione Pensión"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {pensionEntidades.map(pension => (
                                                <SelectItem key={pension} value={pension}>{pension}</SelectItem>
                                            ))}
                                            <SelectItem value="__otro__">Otro fondo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {otroSocialMode.pensiones && (
                                        <Input
                                            placeholder="Nombre del fondo de pensión"
                                            value={currentWorker?.pensiones || ''}
                                            onChange={(e) => handleWorkerInputChange('pensiones', e.target.value)}
                                            className="h-10"
                                            autoFocus
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                                <Signature className="h-4 w-4"/>
                                Firma de Apertura
                            </h3>
                            <Button 
                                variant="outline" 
                                className="w-full h-12 text-sm font-medium hover:bg-white" 
                                onClick={() => openSignaturePad('worker.firmaApertura')}
                            >
                                <Signature className="mr-2 h-4 w-4"/> 
                                {currentWorker?.firmaApertura ? 'Ver/Cambiar Firma' : 'Registrar Firma'}
                            </Button>
                            {currentWorker?.firmaApertura && (
                                <div className="flex justify-center p-3 bg-white rounded-md border-2 border-dashed">
                                    <Image 
                                        src={currentWorker.firmaApertura} 
                                        alt="Firma Apertura" 
                                        width={200} 
                                        height={100} 
                                        className="border rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-4 border-t mt-4">
                    <Button variant="outline" onClick={() => setIsWorkerDialogOpen(false)} className="h-10">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveWorker} className="h-10">
                        <Check className="mr-2 h-4 w-4"/>
                        Guardar Trabajador
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

       <Dialog open={isSignaturePadOpen} onOpenChange={setIsSignaturePadOpen}>
        <DialogContent className="w-[90vw] max-w-lg">
          <DialogHeader>
            <DialogTitle>Registrar Firma</DialogTitle>
          </DialogHeader>
          <SignaturePad onSave={handleSaveSignature} />
        </DialogContent>
      </Dialog>

      {/* Dialog de advertencia al salir con el formulario sin guardar */}
      <Dialog
        open={showLeaveDialog}
        onOpenChange={(open) => {
          if (!open) {
            pendingNavArgsRef.current = null;
            setShowLeaveDialog(false);
          }
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Salir sin guardar?</DialogTitle>
            <DialogDescription>
              Tienes un permiso en edición con datos sin guardar. Te recomendamos guardarlo como borrador para no perder tu progreso.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleSaveDraftAndLeave}
              disabled={isSavingDraft}
              className="w-full"
            >
              {isSavingDraft
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <Save className="mr-2 h-4 w-4" />}
              Guardar borrador y salir
            </Button>
            <Button
              variant="outline"
              onClick={handleLeaveConfirm}
              disabled={isSavingDraft}
              className="w-full"
            >
              Salir sin guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}

export default function CreatePermitPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isNewPermit = !searchParams.get('edit');
  return (
    <PermitFormProvider userId={user?.uid} isNewPermit={isNewPermit}>
      <CreatePermitWizard />
    </PermitFormProvider>
  );
}
