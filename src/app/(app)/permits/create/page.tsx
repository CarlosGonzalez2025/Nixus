'use client';
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { createPermit } from '../actions';
import { useRouter } from 'next/navigation';
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
import type { Permit, ExternalWorker, Tool, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, AnexoATS, PermitGeneralInfo, ValidacionDiaria, AutorizacionPersona, PruebaGasesPeriodica, AnexoCaliente, AnexoExcavaciones, JustificacionATS } from '@/types';
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

  const { state: formData, dispatch } = usePermitForm();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newPermitInfo, setNewPermitInfo] = useState({ id: '', number: '' });

  // Step 5 - Emergencia, Trabajadores
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<Partial<ExternalWorker> | null>(null);
  const [editingWorkerIndex, setEditingWorkerIndex] = useState<number | null>(null);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<string | null>(null);
  const [signatureContext, setSignatureContext] = useState<any>(null);

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
  
  const handleWorkerInputChange = (field: keyof ExternalWorker, value: string) => {
    setCurrentWorker(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleFileUpload = (field: keyof ExternalWorker) => {
    // This is a simulation. In a real app, you'd handle file uploads.
    handleWorkerInputChange(field, `archivo_cargado_${Date.now()}.pdf`);
    toast({ title: 'Archivo Simulado', description: 'Se ha simulado la carga de un archivo.'})
  }

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

  const colors = {
    primary: 'hsl(var(--primary))',
    dark: 'hsl(var(--primary))', 
    success: 'hsl(var(--accent))',
  };
  
  const canProceed = () => {
    // Validate Step 1
    if (step === 1) {
        const { areaEspecifica, planta, nombreSolicitante, validFrom, validUntil, workDescription, numTrabajadores } = formData.generalInfo;
        const missingFields = [];
        if (!areaEspecifica) missingFields.push("Área específica");
        if (!planta) missingFields.push("Planta");
        if (!nombreSolicitante) missingFields.push("Nombre solicitante");
        if (!validFrom) missingFields.push("Fecha de inicio");
        if (!validUntil) missingFields.push("Fecha de fin");
        if (!workDescription) missingFields.push("Descripción de la Tarea");
        if (!numTrabajadores) missingFields.push("No. Trabajadores");

        const workTypes = formData.selectedWorkTypes;
        if (!Object.values(workTypes).some(v => v)) {
            missingFields.push("Tipo de Trabajo (al menos uno)");
        }

        if (missingFields.length > 0) {
            toast({
                variant: "destructive",
                title: "Campos Incompletos en Información General",
                description: `Por favor, complete los siguientes campos obligatorios: ${missingFields.join(', ')}.`,
            });
            return false;
        }
    }
    
    // Add validation for other steps if needed
    return true;
  };
  
  const handleAssessRisk = async () => {
    // Implement AI risk assessment logic
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

  const baseSteps = [
    { label: "Info General", condition: true },
    { label: "ATS y Peligros", condition: true },
    { label: "Anexo Altura", condition: formData.selectedWorkTypes.alturas},
    { label: "Anexo Confinado", condition: formData.selectedWorkTypes.confinado},
    { label: "Anexo Energías", condition: formData.selectedWorkTypes.energia},
    { label: "Anexo Caliente", condition: formData.selectedWorkTypes.caliente},
    { label: "Anexo Izaje", condition: formData.selectedWorkTypes.izaje},
    { label: "Anexo Excavaciones", condition: formData.selectedWorkTypes.excavacion},
    { label: "Verificación Peligros", condition: true },
    { label: "EPP y Emergencias", condition: true },
    { label: "Trabajadores", condition: true },
    { label: "Revisión", condition: true }
  ];

  const steps = baseSteps.filter(s => s.condition);
  const currentStepInfo = steps[step - 1];
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };
  
  const handleUpdateATS = useCallback((updates: Partial<AnexoATS>) => {
    dispatch({ type: 'UPDATE_ATS', payload: updates });
  }, [dispatch]);

  const renderStepContent = () => {
    const currentStepLabel = steps[step - 1]?.label;
    switch (currentStepLabel) {
      case "Info General":
        return <GeneralInfoStep />;
      case "ATS y Peligros":
        return <AtsStep anexoATS={formData.anexoATS} onUpdateATS={handleUpdateATS} />;
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
      // Add other cases as you create the components
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
          <div className="max-w-5xl mx-auto px-4 py-3 flex gap-4">
            <Button
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting || step === 1}
              variant="outline"
              className="px-6 py-3 h-auto md:px-8"
            >
              <ArrowLeft className="mr-2" />
              Anterior
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
                <ArrowRight className="ml-2" />
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
                            <span>Enviar para Aprobación</span>
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
