'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { createPermit, savePermitDraft } from '../actions';
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
  "Otro"
];

// Listas de entidades colombianas
const epsEntidades = [
  "Salud Total",
  "Sanitas",
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const { state: formData, dispatch } = usePermitForm();
  
  const [draftId, setDraftId] = useState<string | undefined>(undefined);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newPermitInfo, setNewPermitInfo] = useState({ id: '', number: '' });

  // Worker Dialog State
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<Partial<ExternalWorker> | null>(null);
  const [editingWorkerIndex, setEditingWorkerIndex] = useState<number | null>(null);
  
  // Signature Pad State
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<string | null>(null);
  const [signatureContext, setSignatureContext] = useState<any>(null);
  
  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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
    if (user && !formData.generalInfo.nombreSolicitante) {
      dispatch({ type: 'UPDATE_GENERAL_INFO', payload: { nombreSolicitante: user.displayName || '' } });
    }
  }, [user, formData.generalInfo.nombreSolicitante, dispatch]);

  const openNewWorkerDialog = () => {
    setEditingWorkerIndex(null);
    setCurrentWorker({
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
    setIsWorkerDialogOpen(true);
  };
  
  const openEditWorkerDialog = (worker: ExternalWorker, index: number) => {
    setEditingWorkerIndex(index);
    setCurrentWorker(worker);
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
  
  const handleSaveDraft = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error de Autenticación' });
      return;
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
      } else {
        throw new Error(result.error || 'No se pudo guardar el borrador.');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error al Guardar', description: error.message });
    } finally {
      setIsSavingDraft(false);
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
    { label: "Anexo Izaje", condition: formData.selectedWorkTypes.izaje},
    { label: "Anexo Excavaciones", condition: formData.selectedWorkTypes.excavacion},
    { label: "Verificación Peligros", condition: false },
    { label: "Emergencias", condition: true },
    { label: "Trabajadores", condition: true },
    { label: "Revisión", condition: true }
  ];

  const steps = baseSteps.filter(s => s.condition);
  const currentStepInfo = steps[step - 1];

  // 🔥 FUNCIÓN DE VALIDACIÓN ÚNICA (SIN DUPLICADOS)
  const canProceed = () => {
    const currentLabel = steps[step - 1]?.label;

    if (currentLabel === 'Info General') {
        const { areaEspecifica, planta, nombreSolicitante, validFrom, validUntil, workDescription, numTrabajadores, responsable } = formData.generalInfo;
        const missingFields = [];
        if (!areaEspecifica) missingFields.push("Área específica");
        if (!planta) missingFields.push("Planta");
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
      if (anexo?.tipoEstructura?.otros && !anexo.tipoEstructura.otrosCual?.trim()) {
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

    // 🔥 VALIDACIÓN DE EMERGENCIAS
    if (currentLabel === 'Emergencias') {
        const validation = validateEmergencias(formData.eppEmergencias);
        
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

    // 🔥 VALIDACIÓN DE TRABAJADORES
    if (currentLabel === 'Trabajadores') {
      const numTrabajadores = parseInt(formData.generalInfo.numTrabajadores || '0', 10);
      const workers = formData.workers || [];

      if (workers.length !== numTrabajadores) {
        toast({
          variant: "destructive",
          title: "Número de Trabajadores no Coincide",
          description: `Ha especificado ${numTrabajadores} trabajadores, pero ha registrado ${workers.length}. Por favor, ajuste la lista.`,
          duration: 6000,
        });
        return false;
      }
      
      const missingSignatures = workers.filter(w => !w.firmaApertura);
      if(missingSignatures.length > 0) {
        toast({
          variant: "destructive",
          title: "Faltan Firmas de Trabajadores",
          description: `Todos los trabajadores deben registrar su firma de apertura para poder continuar. Faltan ${missingSignatures.length} firmas.`,
          duration: 6000,
        });
        return false;
      }
    }

    return true;
  };

  const handleSavePermit = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error de Autenticación' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await savePermitDraft({
        userId: user.uid,
        userDisplayName: user.displayName || null,
        userEmail: user.email || null,
        userPhotoURL: user.photoURL || null,
        draftId: draftId,
        ...formData,
      });

      // ESTE ES EL CÓDIGO NUEVO Y CORRECTO
      if (result.success && result.permitId) {
        toast({
          title: '¡Permiso Guardado!',
          description: 'Redirigiendo a la página de detalles para la firma.',
        });
        
        // 1. Guarda el ID del nuevo permiso para la redirección.
        const newPermitId = result.permitId;
        
        // 2. Limpia el estado del formulario para la próxima vez que se use.
        dispatch({ type: 'RESET_FORM' });
        setStep(1);
        setDraftId(undefined);

        // 3. Finalmente, redirige al usuario a la página de detalles del nuevo permiso.
        router.push(`/permits/${newPermitId}`);
      }

       else {
        throw new Error(result.error || 'Hubo un error guardando el permiso.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Falló el Envío',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
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

    const currentStepLabel = steps[step - 1]?.label;
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
                    src="https://i.postimg.cc/jShP2K6k/Whats-App-Image-2025-10-20-at-10-43-48-AM.jpg"
                    alt="Crear Permiso Icon"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="hidden md:block border-l border-white border-opacity-30 pl-3">
                  <h1 className="text-xl font-bold">Nuevo Permiso de Trabajo</h1>
                  <p className="text-sm text-white text-opacity-80">
                    Paso {step} de {steps.length}: {currentStepInfo.label}
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
            )})};
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

        {/* Navigation Buttons */}
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
                variant="secondary"
                disabled={isSavingDraft || isSubmitting}
                className="px-4 py-3 h-auto md:px-6"
            >
                {isSavingDraft ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                Borrador
            </Button>

            {step < steps.length ? (
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
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button
                            disabled={isSubmitting}
                            className="flex-1 py-3 h-auto bg-green-600 hover:bg-green-700 text-lg"
                        >
                            {isSubmitting ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                            <Save size={22} className="mr-2" />
                            )}
                            <span>Guardar Permiso</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro de guardar el permiso?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Se creará un borrador del permiso. Deberá ir a la página de detalles para firmar y activar el flujo de aprobación.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSavePermit} disabled={isSubmitting}>
                                 {isSubmitting ? 'Guardando...' : 'Sí, guardar ahora'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
                        {/* Información Personal */}
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

                        {/* Certificaciones */}
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

                        {/* Afiliaciones a Seguridad Social */}
                        <div className="bg-green-50 p-4 rounded-lg space-y-4">
                            <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                                <FileText className="h-4 w-4"/>
                                Afiliación a Seguridad Social
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="worker-eps" className="text-sm font-medium">EPS</Label>
                                    <Select 
                                        value={currentWorker?.eps || ''} 
                                        onValueChange={(value) => handleWorkerInputChange('eps', value)}
                                    >
                                        <SelectTrigger id="worker-eps" className="h-10">
                                            <SelectValue placeholder="Seleccione EPS"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {epsEntidades.map(eps => (
                                                <SelectItem key={eps} value={eps}>{eps}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="worker-arl" className="text-sm font-medium">ARL</Label>
                                    <Select 
                                        value={currentWorker?.arl || ''} 
                                        onValueChange={(value) => handleWorkerInputChange('arl', value)}
                                    >
                                        <SelectTrigger id="worker-arl" className="h-10">
                                            <SelectValue placeholder="Seleccione ARL"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {arlEntidades.map(arl => (
                                                <SelectItem key={arl} value={arl}>{arl}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="worker-pension" className="text-sm font-medium">Pensión</Label>
                                    <Select 
                                        value={currentWorker?.pensiones || ''} 
                                        onValueChange={(value) => handleWorkerInputChange('pensiones', value)}
                                    >
                                        <SelectTrigger id="worker-pension" className="h-10">
                                            <SelectValue placeholder="Seleccione Pensión"/>
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {pensionEntidades.map(pension => (
                                                <SelectItem key={pension} value={pension}>{pension}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Firma */}
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
    </div>
    </>
  );
}

export default function CreatePermitPage() {
  return (
    <PermitFormProvider>
      <CreatePermitWizard />
    </PermitFormProvider>
  );
}
