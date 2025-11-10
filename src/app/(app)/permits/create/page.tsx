
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
import type { Permit, ExternalWorker, Tool, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, AnexoATS, PermitGeneralInfo, ValidacionDiaria, AutorizacionPersona, PruebaGasesPeriodica, AnexoCaliente, AnexoExcavaciones, JustificacionATS, EppEmergencias } from '@/types';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { PermitFormProvider, usePermitForm } from './form-context';
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
          if (docSnap.exists() && docSnap.data().status === 'borrador') {
            const draftData = docSnap.data() as Permit;
            // Populate form state from draft
            dispatch({ type: 'UPDATE_GENERAL_INFO', payload: draftData.generalInfo || {} });
            dispatch({ type: 'SET_WORKERS', payload: draftData.workers || [] });
            // Populate other steps...
            // e.g., dispatch({ type: 'UPDATE_ATS', payload: draftData.anexoATS || {} });
            setDraftId(editId);
          } else {
            toast({ variant: "destructive", title: "Borrador no encontrado" });
            router.push('/permits/create');
          }
        } catch (error) {
          toast({ variant: "destructive", title: "Error al cargar borrador" });
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
      eps: '',
      arl: '',
      pensiones: '',
      tsaTec: 'na',
      entrenamiento: 'otro',
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
  
  const handleWorkerInputChange = (field: keyof ExternalWorker, value: string | boolean) => {
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
    { label: "Verificación Peligros", condition: true },
    { label: "EPP y Emergencias", condition: true },
    { label: "Trabajadores", condition: true },
    { label: "Revisión", condition: true }
  ];

  const steps = baseSteps.filter(s => s.condition);
  const currentStepInfo = steps[step - 1];

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
        if (!workDescription) missingFields.push("Descripción de la Tarea");
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
        const { peligros, justificacion } = formData.anexoATS;
        if (!peligros || !Object.values(peligros).some(value => value === 'si')) {
            toast({
                variant: "destructive",
                title: "Validación Requerida en ATS",
                description: "Debe seleccionar 'SI' en al menos un peligro para continuar.",
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

    if (currentLabel === 'EPP y Emergencias') {
        const eppData = formData.eppEmergencias?.epp || {};
        const missingSpecFields = eppItems
            .filter(item => item.manual && eppData[item.id] === 'si')
            .filter(item => {
                const specFieldKey = `${item.id}_manual`;
                const specValue = eppData[specFieldKey] as string | undefined;
                return !specValue || specValue.trim() === '';
            })
            .map(item => `'${item.label}'`);

        if (missingSpecFields.length > 0) {
            toast({
                variant: "destructive",
                title: "Especificación de EPP Requerida",
                description: `Por favor, complete la especificación para los siguientes EPP: ${missingSpecFields.join(', ')}.`,
                duration: 6000,
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
        if (anexo?.trabajosEnCaliente?.otro === 'si' && !(anexo.trabajosEnCaliente?.otro as string)?.trim()) {
          toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar el 'otro' aspecto en Trabajos en Caliente." });
          return false;
        }
        if (anexo?.energiasPeligrosas?.otra && !(anexo.energiasPeligrosas?.otra as string)?.trim()) {
          toast({ variant: "destructive", title: "Campo Requerido", description: "Debe especificar el 'otro' tipo de energía peligrosa." });
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
      const result = await createPermit({
          userId: user.uid, 
          userDisplayName: user.displayName || null, 
          userEmail: user.email || null,
          userPhotoURL: user.photoURL || null,
          ...formData
        });
      
      if (result.success && result.permitId) {
        setNewPermitInfo({
            id: result.permitId,
            number: result.permitNumber || '',
        });
        setShowSuccessDialog(true);
      } else {
        throw new Error(result.error || 'Hubo un error creando el permiso.');
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
      case "EPP y Emergencias":
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
                if (confirm('¿Está seguro de cancelar? Los cambios no guardados se perderán.')) {
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
                            <CheckCircle size={22} className="mr-2" />
                            )}
                            <span>Enviar</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro de enviar el permiso?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Una vez que envíe el permiso para su aprobación, ya no podrá realizar modificaciones. Asegúrese de que toda la información es correcta.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSavePermit} disabled={isSubmitting}>
                                 {isSubmitting ? 'Enviando...' : 'Sí, enviar ahora'}
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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{editingWorkerIndex !== null ? 'Editar' : 'Agregar'} Trabajador</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
                    <div>
                        <Label htmlFor="worker-name">Nombres y Apellidos</Label>
                        <Input id="worker-name" value={currentWorker?.nombre || ''} onChange={(e) => handleWorkerInputChange('nombre', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="worker-cedula">Cédula</Label>
                        <Input id="worker-cedula" value={currentWorker?.cedula || ''} onChange={(e) => handleWorkerInputChange('cedula', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="worker-rol">Cargo/Rol</Label>
                        <Select value={currentWorker?.rol || ''} onValueChange={(value) => handleWorkerInputChange('rol', value)}>
                            <SelectTrigger id="worker-rol"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {workerRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-semibold">Certificado Aptitud Médica</Label>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2"><Checkbox id="cert-tec" checked={currentWorker?.tsaTec === 'tec'} onCheckedChange={checked => handleWorkerInputChange('tsaTec', checked ? 'tec' : 'na')} /> <Label htmlFor="cert-tec">TEC</Label></div>
                            <div className="flex items-center gap-2"><Checkbox id="cert-tsa" checked={currentWorker?.tsaTec === 'tsa'} onCheckedChange={checked => handleWorkerInputChange('tsaTec', checked ? 'tsa' : 'na')} /> <Label htmlFor="cert-tsa">TSA</Label></div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label className="font-semibold">Entrenamiento / Capacitación</Label>
                        <div className="flex gap-4">
                             <div className="flex items-center gap-2"><Checkbox id="ent-tec" checked={currentWorker?.entrenamiento === 'tec'} onCheckedChange={checked => handleWorkerInputChange('entrenamiento', checked ? 'tec' : 'otro')} /> <Label htmlFor="ent-tec">TEC</Label></div>
                            <div className="flex items-center gap-2"><Checkbox id="ent-tsa" checked={currentWorker?.entrenamiento === 'tsa'} onCheckedChange={checked => handleWorkerInputChange('entrenamiento', checked ? 'tsa' : 'otro')} /> <Label htmlFor="ent-tsa">TSA</Label></div>
                        </div>
                         <Input placeholder="Otro" value={currentWorker?.entrenamiento === 'otro' ? (currentWorker as any).otroEntrenamiento || '' : ''} onChange={e => handleWorkerInputChange('otroEntrenamiento' as any, e.target.value)} disabled={currentWorker?.entrenamiento !== 'otro'} />
                    </div>
                     <div className="space-y-2">
                        <Label className="font-semibold">Afiliación a Seguridad Social</Label>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2"><Checkbox id="afil-eps" checked={!!currentWorker?.eps} onCheckedChange={checked => handleWorkerInputChange('eps', checked ? 'activo' : '')} /> <Label htmlFor="afil-eps">EPS</Label></div>
                           <div className="flex items-center gap-2"><Checkbox id="afil-arl" checked={!!currentWorker?.arl} onCheckedChange={checked => handleWorkerInputChange('arl', checked ? 'activo' : '')} /> <Label htmlFor="afil-arl">ARL</Label></div>
                           <div className="flex items-center gap-2"><Checkbox id="afil-pension" checked={!!currentWorker?.pensiones} onCheckedChange={checked => handleWorkerInputChange('pensiones', checked ? 'activo' : '')} /> <Label htmlFor="afil-pension">Pensiones</Label></div>
                        </div>
                    </div>
                    <div>
                      <Label>Firma de Apertura</Label>
                      <Button variant="outline" className="w-full mt-2" onClick={() => openSignaturePad('worker.firmaApertura')}>
                        <Signature className="mr-2"/> {currentWorker?.firmaApertura ? 'Ver/Cambiar Firma' : 'Registrar Firma'}
                      </Button>
                      {currentWorker?.firmaApertura && <Image src={currentWorker.firmaApertura} alt="Firma Apertura" width={150} height={75} className="mx-auto mt-2 border rounded-md"/>}
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsWorkerDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSaveWorker}>Guardar Trabajador</Button>
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
