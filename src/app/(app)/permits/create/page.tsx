
'use client';
import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { createPermit } from '../actions';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getRiskAssessmentRecommendations } from '@/ai/flows/risk-assessment-recommendation';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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
import type { ExternalWorker, Permit, Tool, AnexoAltura, AnexoConfinado, AnexoIzaje, MedicionAtmosferica, AnexoEnergias, AnexoATS, PermitGeneralInfo } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';


type PermitFormData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user' | 'approvals' | 'closure'>;

const workTypes: {[key: string]: string} = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
}

const epsList = ["SURA", "Sanitas", "Compensar", "Nueva EPS", "Salud Total", "Coomeva", "Famisanar", "Aliansalud", "Mutual SER", "Cajacopi", "Otra"];
const arlList = ["SURA", "Positiva", "Colmena", "AXA Colpatria", "Equidad Seguros", "Bolívar", "Alfa", "Otra"];
const pensionFundsList = ["Colpensiones", "Porvenir", "Protección", "Colfondos", "Skandia", "Otro"];

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


export default function CreatePermitPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newPermitInfo, setNewPermitInfo] = useState({ id: '', number: '' });


  // Step 1 - ATS
  const [anexoATS, setAnexoATS] = useState<Partial<AnexoATS>>({
    area: '',
    solicitante: '',
    fechaInicio: '',
    fechaTerminacion: '',
    descripcionTarea: '',
    peligros: {},
    epp: {},
    causalesSuspension: '',
  });

  // Step 2
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [generalInfo, setGeneralInfo] = useState<Partial<PermitGeneralInfo>>({
    fechaExpedicion: '',
    planta: '',
    proceso: '',
    contrato: '',
    empresa: '',
    nombreSolicitante: '',
    validFrom: '',
    validUntil: '',
    workDescription: '',
    tools: [],
    numTrabajadores: '',
    reunionInicio: 'na',
    atsVerificado: 'na',
  });
  const [newToolName, setNewToolName] = useState('');
  
  // Anexo Altura
  const [anexoAltura, setAnexoAltura] = useState<Partial<AnexoAltura>>({});

  // Anexo Confinado
  const [anexoConfinado, setAnexoConfinado] = useState<Partial<AnexoConfinado>>({
    tipo: '1',
    gradoPeligro: 'A',
    checklist: {},
    mediciones: [],
    supervisor: { nombres: '', cedula: '', firmaApertura: '' }
  });

  // Anexo Izaje
  const [anexoIzaje, setAnexoIzaje] = useState<Partial<AnexoIzaje>>({
    informacionGeneral: {
      accion: {},
      pesoCarga: {},
      equipoUtilizar: {},
    },
    aspectosRequeridos: {},
    precauciones: {},
    observaciones: '',
    liderIzaje: { nombre: '', cedula: '', firmaApertura: '' }
  });

  // Anexo Energias
  const [anexoEnergias, setAnexoEnergias] = useState<Partial<AnexoEnergias>>({
    tensionExpuesta: 'muy_baja',
    planeacion: {},
    metodoTrabajo: 'sin_tension'
  });

  // Step 3
  const [hazardsData, setHazardsData] = useState<{ [key: string]: 'si' | 'no' | 'na' }>({});

  // Step 4
  const [ppeData, setPpeData] = useState<{ [key: string]: 'si' | 'no' | 'na' }>({});
  const [ppeSystemsData, setPpeSystemsData] = useState<{ [key: string]: 'si' | 'no' | 'na' }>({});

  // Step 5
  const [emergencyData, setEmergencyData] = useState<{ [key: string]: 'si' | 'no' | 'na' }>({});
  const [notification, setNotification] = useState(false);
  
  // Step 6
  const [workers, setWorkers] = useState<ExternalWorker[]>([]);
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<Partial<ExternalWorker> | null>(null);
  const [editingWorkerIndex, setEditingWorkerIndex] = useState<number | null>(null);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<'firmaApertura' | 'firmaCierre' | 'supervisorConfinado' | 'liderIzaje' | 'medicion' | null>(null);
  const [signatureContext, setSignatureContext] = useState<any>(null);


  const handleWorkTypeChange = (workTypeKey: string) => {
    setSelectedWorkTypes(prev => 
      prev.includes(workTypeKey) 
        ? prev.filter(item => item !== workTypeKey)
        : [...prev, workTypeKey]
    );
  };

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
      const updatedWorkers = [...workers];
      updatedWorkers[editingWorkerIndex] = currentWorker as ExternalWorker;
      setWorkers(updatedWorkers);
      toast({ title: 'Trabajador Actualizado' });
    } else {
      setWorkers([...workers, currentWorker as ExternalWorker]);
      toast({ title: 'Trabajador Agregado' });
    }

    setIsWorkerDialogOpen(false);
    setCurrentWorker(null);
    setEditingWorkerIndex(null);
  };
  
  const removeWorker = (index: number) => {
    setWorkers(workers.filter((_, i) => i !== index));
  };
  
  const handleWorkerInputChange = (field: keyof ExternalWorker, value: string) => {
    setCurrentWorker(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleFileUpload = (field: keyof ExternalWorker) => {
    // This is a simulation. In a real app, you'd handle file uploads.
    handleWorkerInputChange(field, `archivo_cargado_${Date.now()}.pdf`);
    toast({ title: 'Archivo Simulado', description: 'Se ha simulado la carga de un archivo.'})
  }

  const openSignaturePad = (target: 'firmaApertura' | 'firmaCierre' | 'supervisorConfinado' | 'liderIzaje' | 'medicion', context?: any) => {
    setSignatureTarget(target);
    setSignatureContext(context);
    setIsSignaturePadOpen(true);
  };

  const handleSaveSignature = (signatureDataUrl: string) => {
    if (signatureTarget === 'firmaApertura' || signatureTarget === 'firmaCierre') {
        handleWorkerInputChange(signatureTarget, signatureDataUrl);
    } else if (signatureTarget === 'supervisorConfinado') {
        setAnexoConfinado(prev => ({
            ...prev,
            supervisor: { ...(prev.supervisor!), firmaApertura: signatureDataUrl }
        }))
    } else if (signatureTarget === 'liderIzaje') {
        setAnexoIzaje(prev => ({
            ...prev,
            liderIzaje: { ...(prev.liderIzaje!), firmaApertura: signatureDataUrl }
        }))
    } else if (signatureTarget === 'medicion' && signatureContext?.medicionId) {
        setAnexoConfinado(prev => ({
            ...prev,
            mediciones: (prev.mediciones || []).map(m =>
                m.id === signatureContext.medicionId ? { ...m, firma: signatureDataUrl } : m
            )
        }));
    }
    
    setIsSignaturePadOpen(false);
    setSignatureTarget(null);
    setSignatureContext(null);
  };
  
  const addTool = () => {
    if (newToolName.trim()) {
      setGeneralInfo(prev => ({...prev, tools: [...(prev.tools || []), { name: newToolName.trim(), status: 'B' }]}));
      setNewToolName('');
    }
  };

  const updateToolStatus = (index: number, status: 'B' | 'M') => {
    const updatedTools = [...(generalInfo.tools || [])];
    updatedTools[index].status = status;
    setGeneralInfo(prev => ({...prev, tools: updatedTools}));
  };

  const removeTool = (index: number) => {
    setGeneralInfo(prev => ({...prev, tools: (prev.tools || []).filter((_, i) => i !== index)}));
  };
  
  const addMedicion = () => {
    const newMedicion: MedicionAtmosferica = {
      id: `med_${Date.now()}`,
      hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      o2: '', co: '', h2s: '', lel: '', cl2: '', co2: '', firma: ''
    };
    setAnexoConfinado(prev => ({
        ...prev,
        mediciones: [...(prev.mediciones || []), newMedicion]
    }));
  };

  const updateMedicion = (id: string, field: keyof Omit<MedicionAtmosferica, 'id' | 'firma'>, value: string) => {
      setAnexoConfinado(prev => ({
          ...prev,
          mediciones: (prev.mediciones || []).map(m => m.id === id ? { ...m, [field]: value } : m)
      }));
  };
  
  const removeMedicion = (id: string) => {
      setAnexoConfinado(prev => ({
          ...prev,
          mediciones: (prev.mediciones || []).filter(m => m.id !== id)
      }));
  };


  const colors = {
    primary: 'hsl(var(--primary))',
    dark: 'hsl(var(--primary))', 
    success: 'hsl(var(--accent))',
  };
  
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


  const canProceed = () => {
    const currentStepInfo = steps[step - 1];
    if (currentStepInfo.label === "Análisis de Trabajo Seguro") {
        const { area, solicitante, fechaInicio, fechaTerminacion, descripcionTarea } = anexoATS;
        const missingFields = [];
        if (!area) missingFields.push("Área");
        if (!solicitante) missingFields.push("Solicitante");
        if (!fechaInicio) missingFields.push("Fecha de Inicio");
        if (!fechaTerminacion) missingFields.push("Fecha de Terminación");
        if (!descripcionTarea) missingFields.push("Descripción de la Tarea");
        
        if (missingFields.length > 0) {
            toast({
                variant: "destructive",
                title: "Campos Incompletos",
                description: `Por favor, complete los siguientes campos en el ATS: ${missingFields.join(', ')}.`,
            });
            return false;
        }
    }
    if (currentStepInfo.label === "Info General") {
      const missingFields = [];
      if (selectedWorkTypes.length === 0) missingFields.push("Tipo de Trabajo");
      if (!generalInfo.workDescription) missingFields.push("Descripción del Trabajo");
      if (!generalInfo.validFrom) missingFields.push("Fecha de Inicio");
      if (!generalInfo.validUntil) missingFields.push("Fecha de Fin");
      
      if (missingFields.length > 0) {
        toast({
            variant: "destructive",
            title: "Campos Incompletos",
            description: `Por favor, complete los siguientes campos: ${missingFields.join(', ')}.`,
        });
        return false;
      }
    }
    // Add more validation for other steps if needed
    return true;
  };
  
  const handleAssessRisk = async () => {
    setIsAssessing(true);
    setRecommendations('');
    try {
      const result = await getRiskAssessmentRecommendations({
        workType: selectedWorkTypes.map(key => workTypes[key]).join(', ') || 'General',
        environmentalFactors: "Factores diversos según peligros seleccionados",
        permitDetails: generalInfo.workDescription || '',
      });
      setRecommendations(result.recommendedControls);
      toast({
        title: 'Evaluación de Riesgo Completa',
        description: 'Se han sugerido controles adicionales.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Falló la Evaluación',
        description: 'La evaluación de riesgo por IA no pudo completarse.',
      });
    } finally {
      setIsAssessing(false);
    }
  };

  const handleSavePermit = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error de Autenticación' });
      return;
    }

    setIsSubmitting(true);
    try {
      const fullPermitData: PermitFormData = {
        workType: selectedWorkTypes,
        generalInfo,
        hazards: hazardsData,
        ppe: ppeData,
        ppeSystems: ppeSystemsData,
        emergency: { ...emergencyData, notification },
        workers: workers,
        anexoATS,
        anexoAltura: selectedWorkTypes.includes('altura') ? anexoAltura : undefined,
        anexoConfinado: selectedWorkTypes.includes('confinado') ? anexoConfinado : undefined,
        anexoIzaje: selectedWorkTypes.includes('izaje') ? anexoIzaje : undefined,
        anexoEnergias: selectedWorkTypes.includes('energia') ? anexoEnergias : undefined,
      };

      const result = await createPermit({
          userId: user.uid, 
          userDisplayName: user.displayName || null, 
          userEmail: user.email || null,
          userPhotoURL: user.photoURL || null,
          ...fullPermitData
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
    { label: "Análisis de Trabajo Seguro", condition: true },
    { label: "Info General", condition: true },
    { label: "Anexo Altura", condition: selectedWorkTypes.includes('altura')},
    { label: "Anexo Confinado", condition: selectedWorkTypes.includes('confinado')},
    { label: "Anexo Energías", condition: selectedWorkTypes.includes('energia')},
    { label: "Anexo Izaje", condition: selectedWorkTypes.includes('izaje')},
    { label: "Peligros", condition: true },
    { label: "EPP", condition: true },
    { label: "Sistemas y Emergencia", condition: true },
    { label: "Trabajadores", condition: true },
    { label: "Revisión", condition: true }
  ];

  const steps = baseSteps.filter(s => s.condition);
  const currentStepInfo = steps[step - 1];
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
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

 const atsEpp = [
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'aire_respirable', label: 'Aire respirable (compresor o cilindro)' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'botas_caucho', label: 'Botas de caucho de seguridad' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'botas_dielectricas', label: 'Botas dieléctricas' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'botas_seguridad_epp', label: 'Botas de seguridad' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'tapete_dielectrico', label: 'Tapete dieléctrico clase' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'traje_tyvek', label: 'Traje tyvek' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'chaleco_reflectivo', label: 'Chaleco reflectivo' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'chaqueta_cuero', label: 'Chaqueta de cuero o carnaza' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'delantal_cuero', label: 'Delantal de cuero o carnaza' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'delantal_pvc', label: 'Delantal de PVC' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'guantes_dielectricos', label: 'Guante dieléctrico clase _______ (guantín, guante dieléctrico,  protección mecánica)' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'guantes_caucho', label: 'Guante de caucho y/o nitrilo' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'guantes_cuero', label: 'Guante de cuero o carnaza' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'guantes_vaqueta', label: 'Guante de vaqueta o Anticorte' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'mascarilla_filtros', label: 'Mascarilla con filtro' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'mascarilla_polvo', label: 'Mascarilla material particulado' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'polainas', label: 'Polainas' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'overol_trabajo', label: 'Overol de trabajo' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'overol_ignifugo', label: 'Overol ignífugo clase' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'protector_auditivo', label: 'Protector auditivo tipo' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'gafas_antisalpicaduras', label: 'Gafas antisalpicaduras' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'gafas_seguridad', label: 'Gafas de seguridad' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'visor_careta', label: 'Visor / careta para' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'careta_arco', label: 'Careta arco eléctrico clase' },
    { seccion: 'TRABAJO EN ALTURAS', id: 'eslinga', label: 'Eslinga tipo____________, ________ absorbedor' },
    { seccion: 'TRABAJO EN ALTURAS', id: 'linea_vida', label: 'Línea de vida' },
    { seccion: 'TRABAJO EN ALTURAS', id: 'arnes', label: 'Arnés' },
    { seccion: 'TRABAJO EN ALTURAS', id: 'adaptador_anclaje', label: 'Adaptador de anclaje' },
    { seccion: 'TRABAJO EN ALTURAS', id: 'casco_barbuquejo', label: 'Casco de seguridad Tipo_____, Clase_____,  ________ barbuquejo' },
    { seccion: 'PROTECCIÓN INDIVIDUAL', id: 'otro_epp', label: 'Otro:' },
 ];

 const atsEppAgrupados = atsEpp.reduce((acc, epp) => {
    if (!acc[epp.seccion]) {
        acc[epp.seccion] = [];
    }
    acc[epp.seccion].push(epp);
    return acc;
 }, {} as {[key: string]: typeof atsEpp});


  const handleRadioChange = (id: string, group: 'hazards' | 'ppe' | 'ppeSystems' | 'emergency' | 'anexoAltura' | 'anexoConfinado' | 'anexoIzaje' | 'anexoEnergias' | 'anexoATS-peligros' | 'anexoATS-epp' | 'generalInfo', anexoSection?: keyof AnexoAltura | keyof AnexoConfinado | 'aspectosRequeridos') => {
      let setState: React.Dispatch<React.SetStateAction<any>>;
      
      const updateState = (prevState: any, value: string) => {
          if (group === 'hazards') return {...prevState, [id]: value};
          if (group === 'ppe') return {...prevState, [id]: value};
          if (group === 'ppeSystems') return {...prevState, [id]: value};
          if (group === 'emergency') return {...prevState, [id]: value};
          if (group === 'anexoEnergias') return {...prevState, planeacion: { ...(prevState.planeacion || {}), [id]: value }};
          if (group === 'anexoATS-peligros') return {...prevState, peligros: { ...(prevState.peligros || {}), [id]: value }};
          if (group === 'anexoATS-epp') return {...prevState, epp: { ...(prevState.epp || {}), [id]: value }};
          if (group === 'generalInfo') return {...prevState, [id]: value};

          if (group === 'anexoAltura' && anexoSection) {
              return { ...prevState, [anexoSection]: { ...(prevState[anexoSection] || {}), [id]: value } };
          }
          if (group === 'anexoConfinado') {
              return { ...prevState, checklist: { ...(prevState.checklist || {}), [id]: value } };
          }
           if (group === 'anexoIzaje' && anexoSection) {
              return { ...prevState, [anexoSection]: { ...(prevState[anexoSection] || {}), [id]: value } };
          }
          return prevState;
      }
      
      switch(group) {
          case 'hazards': setState = setHazardsData; break;
          case 'ppe': setState = setPpeData; break;
          case 'ppeSystems': setState = setPpeSystemsData; break;
          case 'emergency': setState = setEmergencyData; break;
          case 'anexoEnergias': setState = setAnexoEnergias; break;
          case 'anexoATS-peligros': setState = setAnexoATS; break;
          case 'anexoATS-epp': setState = setAnexoATS; break;
          case 'anexoAltura': setState = setAnexoAltura; break;
          case 'anexoConfinado': setState = setAnexoConfinado; break;
          case 'anexoIzaje': setState = setAnexoIzaje; break;
          case 'generalInfo': setState = setGeneralInfo; break;
          default: return;
      }
      
      return (value: 'si' | 'no' | 'na') => {
        setState((prev: any) => updateState(prev, value));
      }
  }

  const renderRadioGroup = (id: string, group: 'hazards' | 'ppe' | 'ppeSystems' | 'emergency' | 'anexoAltura' | 'anexoConfinado' | 'anexoIzaje' | 'anexoEnergias' | 'anexoATS-peligros' | 'anexoATS-epp' | 'generalInfo', anexoSection?: keyof AnexoAltura | keyof AnexoConfinado | 'aspectosRequeridos') => {
    let state: any = {};
    let onValueChange: ((value: 'si' | 'no' | 'na') => void) | undefined;
    let defaultValue = 'na';

    switch(group) {
        case 'hazards': state = hazardsData; onValueChange = handleRadioChange(id, group); break;
        case 'ppe': state = ppeData; onValueChange = handleRadioChange(id, group); break;
        case 'ppeSystems': state = ppeSystemsData; onValueChange = handleRadioChange(id, group); break;
        case 'emergency': state = emergencyData; onValueChange = handleRadioChange(id, group); break;
        case 'anexoEnergias': state = anexoEnergias.planeacion || {}; onValueChange = handleRadioChange(id, group); break;
        case 'anexoATS-peligros': state = anexoATS.peligros || {}; onValueChange = handleRadioChange(id, group); break;
        case 'anexoATS-epp': state = anexoATS.epp || {}; onValueChange = handleRadioChange(id, group); break;
        case 'anexoAltura': state = anexoSection ? (anexoAltura as any)[anexoSection] || {} : {}; onValueChange = handleRadioChange(id, group, anexoSection); break;
        case 'anexoConfinado': state = anexoConfinado.checklist || {}; onValueChange = handleRadioChange(id, group); break;
        case 'anexoIzaje': state = anexoIzaje.aspectosRequeridos || {}; onValueChange = handleRadioChange(id, group, 'aspectosRequeridos'); break;
        case 'generalInfo': state = generalInfo; onValueChange = handleRadioChange(id, group); break;
    }
    
    return (
        <RadioGroup value={state[id] || defaultValue} onValueChange={onValueChange} className="flex">
            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${group}-${anexoSection || ''}-${id}-si`} /><Label htmlFor={`${group}-${anexoSection || ''}-${id}-si`}>SI</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${group}-${anexoSection || ''}-${id}-no`} /><Label htmlFor={`${group}-${anexoSection || ''}-${id}-no`}>NO</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${group}-${anexoSection || ''}-${id}-na`} /><Label htmlFor={`${group}-${anexoSection || ''}-${id}-na`}>NA</Label></div>
        </RadioGroup>
    )
  }

  const renderSection = (title: string, items: {id: string, label: string}[], group: 'ppe' | 'ppeSystems') => (
      <div className="p-4 border rounded-lg">
          <h4 className="font-bold mb-4 text-primary">{title}</h4>
          <div className="space-y-3">
          {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <Label htmlFor={`${group}-${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
                  {renderRadioGroup(item.id, group)}
              </div>
          ))}
          </div>
      </div>
  )

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

  const anexoEnergiasTension = [
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
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          {currentStepInfo.label === "Análisis de Trabajo Seguro" && (
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        Análisis de Trabajo Seguro - ATS
                    </h2>
                    <p className="text-muted-foreground text-sm">Diligencie la información base para el análisis de riesgos.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label className="font-bold text-gray-700">Área *</Label>
                        <Input value={anexoATS.area || ''} onChange={(e) => setAnexoATS(p => ({...p, area: e.target.value}))} placeholder="Ej: Producción"/>
                    </div>
                    <div>
                        <Label className="font-bold text-gray-700">Solicitante *</Label>
                        <Input value={anexoATS.solicitante || ''} onChange={(e) => setAnexoATS(p => ({...p, solicitante: e.target.value}))} placeholder="Ej: Juan Pérez"/>
                    </div>
                    <div>
                        <Label className="font-bold text-gray-700">Fecha y Hora de Inicio *</Label>
                        <Input type="datetime-local" value={anexoATS.fechaInicio || ''} onChange={(e) => setAnexoATS(p => ({...p, fechaInicio: e.target.value}))}/>
                    </div>
                    <div>
                        <Label className="font-bold text-gray-700">Fecha y Hora de Terminación *</Label>
                        <Input type="datetime-local" value={anexoATS.fechaTerminacion || ''} onChange={(e) => setAnexoATS(p => ({...p, fechaTerminacion: e.target.value}))}/>
                    </div>
                </div>
                <div>
                    <Label className="font-bold text-gray-700">Descripción de la Tarea *</Label>
                    <Textarea value={anexoATS.descripcionTarea || ''} onChange={(e) => setAnexoATS(p => ({...p, descripcionTarea: e.target.value}))} placeholder="Describa detalladamente la tarea a realizar..."/>
                </div>

                <div>
                    <Label className="font-bold text-gray-700">Identificación de Peligros, Riesgos y Controles</Label>
                    <p className="text-xs text-muted-foreground">Coloque "SI" o "NO" para los peligros envueltos en el trabajo. Cuando se asigne un "SI" para un peligro, RESALTAR en la 2a columna el CONTROL para cada una de las condiciones relacionadas al peligro.</p>
                    <div className="mt-4 space-y-4">
                        {Object.entries(atsPeligrosAgrupados).map(([seccion, peligros]) => (
                            <div key={seccion} className="p-4 border rounded-lg">
                                <h4 className="font-bold mb-4 text-primary">{seccion}</h4>
                                <div className="space-y-2">
                                    {peligros.map(peligro => (
                                        <div key={peligro.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                            <Label className="flex-1 text-sm">{peligro.label}</Label>
                                            {renderRadioGroup(peligro.id, 'anexoATS-peligros')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                 <div>
                    <Label className="font-bold text-gray-700">EPP Requeridos</Label>
                    <p className="text-xs text-muted-foreground">Marque SI o NO si el equipo de protección personal es requerido.</p>
                     <div className="mt-4 space-y-4">
                        {Object.entries(atsEppAgrupados).map(([seccion, epps]) => (
                            <div key={seccion} className="p-4 border rounded-lg">
                                <h4 className="font-bold mb-4 text-primary">{seccion}</h4>
                                <div className="space-y-2">
                                    {epps.map(epp => (
                                        <div key={epp.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                            <Label className="flex-1 text-sm">{epp.label}</Label>
                                            {renderRadioGroup(epp.id, 'anexoATS-epp')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                  <Label className="font-bold text-gray-700">Causales para la suspensión del Permiso:</Label>
                  <Textarea 
                    value={anexoATS.causalesSuspension || ''} 
                    onChange={(e) => setAnexoATS(p => ({...p, causalesSuspension: e.target.value}))} 
                    placeholder="LA OCURRENCIA DE UNA SITUACIÓN DE ALERTA, EXPLOSIÓN, INCENDIO, SEÑAL DE EVACUACIÓN U ORDEN EXPRESA DE LA PERSONA QUE AUTORIZA, DETERMINA LA SUSPENSIÓN DEL MISMO. Indique otras causales si las hay:"
                  />
                </div>
            </div>
          )}

          {currentStepInfo.label === "Info General" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Información General del Permiso
                </h2>
                <p className="text-muted-foreground text-sm">Complete todos los campos obligatorios (*)</p>
              </div>

                <div>
                    <Label className="font-bold text-gray-700">Tipo de Trabajo *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-4 border rounded-lg mt-2">
                    {Object.entries(workTypes).map(([key, name]) => (
                        <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                            id={key}
                            checked={selectedWorkTypes.includes(key)}
                            onCheckedChange={() => handleWorkTypeChange(key)}
                        />
                        <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {name}
                        </label>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <Label>Fecha de Expedición</Label>
                        <Input type="date" value={generalInfo.fechaExpedicion} onChange={e => setGeneralInfo(p => ({...p, fechaExpedicion: e.target.value}))}/>
                    </div>
                     <div>
                        <Label>Planta</Label>
                        <Input value={generalInfo.planta} onChange={e => setGeneralInfo(p => ({...p, planta: e.target.value}))} placeholder="Planta"/>
                    </div>
                     <div>
                        <Label>Proceso</Label>
                        <Input value={generalInfo.proceso} onChange={e => setGeneralInfo(p => ({...p, proceso: e.target.value}))} placeholder="Proceso"/>
                    </div>
                     <div>
                        <Label>Contrato</Label>
                        <Input value={generalInfo.contrato} onChange={e => setGeneralInfo(p => ({...p, contrato: e.target.value}))} placeholder="Contrato"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                     <div>
                        <Label>Empresa</Label>
                        <Input value={generalInfo.empresa} onChange={e => setGeneralInfo(p => ({...p, empresa: e.target.value}))} placeholder="Empresa"/>
                    </div>
                     <div>
                        <Label>Nombre del Solicitante</Label>
                        <Input value={generalInfo.nombreSolicitante} onChange={e => setGeneralInfo(p => ({...p, nombreSolicitante: e.target.value}))} placeholder="Nombre del solicitante"/>
                    </div>
                </div>

                <div>
                    <Label className="font-bold text-gray-700">Duración del Permiso *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
                        <div>
                        <label className="text-sm font-medium">Desde</label>
                        <Input
                            type="datetime-local"
                            value={generalInfo.validFrom}
                            onChange={(e) => setGeneralInfo({...generalInfo, validFrom: e.target.value})}
                        />
                        </div>

                        <div>
                        <label className="text-sm font-medium">Hasta</label>
                        <Input
                            type="datetime-local"
                            value={generalInfo.validUntil}
                            onChange={(e) => setGeneralInfo({...generalInfo, validUntil: e.target.value})}
                        />
                        </div>
                    </div>
                </div>
                
                <div>
                    <Label className="font-bold">ALCANCE. El trabajo se LIMITA a lo siguiente (Alcance del Trabajo - Descripcion y Area/Equipo): *</Label>
                    <Textarea
                        value={generalInfo.workDescription}
                        onChange={(e) => setGeneralInfo({...generalInfo, workDescription: e.target.value})}
                        rows={3}
                        className="w-full mt-1"
                        placeholder="Describa el alcance, descripción y área/equipo..."
                    />
                </div>

              <div>
                <Label className="font-bold text-gray-700">Equipos y/o Herramientas</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg mt-2">
                    <div className="space-y-2">
                        {generalInfo.tools?.slice(0, 4).map((tool, index) => (
                            <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                            <span className="flex-1">{tool.name}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeTool(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                            </div>
                        ))}
                    </div>
                     <div className="space-y-2">
                        {generalInfo.tools?.slice(4, 8).map((tool, index) => (
                            <div key={index + 4} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                            <span className="flex-1">{tool.name}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeTool(index + 4)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                        <Input value={newToolName} onChange={(e) => setNewToolName(e.target.value)} placeholder="Nueva herramienta..." />
                        <Button onClick={addTool}><Plus/></Button>
                    </div>
                </div>
              </div>

               <div>
                    <Label>No. Trabajadores</Label>
                    <Input type="number" value={generalInfo.numTrabajadores} onChange={e => setGeneralInfo(p => ({...p, numTrabajadores: e.target.value}))} placeholder="Cantidad de trabajadores"/>
                </div>

                <div className="my-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
                    <p><strong>Marque dentro de los cuadros SI / NO /NA según el caso. Si alguna de las verificaciones a las preguntas es "NO", NO SE DEBERA INICIAR EL TRABAJO HASTA TANTO NO SE SOLUCIONE LA SITUACIÓN, SI ES N/A REALICE SU JUSTIFICACIÓN EN OBSERVACIONES.</strong></p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                    <Label className="flex-1 text-sm">REUNIÓN DE INICIO</Label>
                    {renderRadioGroup('reunionInicio', 'generalInfo')}
                </div>
                <div className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                    <Label className="flex-1 text-sm">ATS Verificar el correcto diligenciamiento del ATS en el sitio de trabajo</Label>
                    {renderRadioGroup('atsVerificado', 'generalInfo')}
                </div>

            </div>
          )}
          
          {currentStepInfo.label === "Anexo Altura" && (
              <div className="space-y-6">
                   <div className="text-center mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                          ANEXO 1 - TRABAJOS EN ALTURA
                      </h2>
                      <p className="text-muted-foreground text-sm">Complete toda la información requerida para trabajos en altura.</p>
                  </div>

                   <div className="p-4 border rounded-lg space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <Label>A.- Altura de trabajo:</Label>
                              <Input value={anexoAltura.alturaTrabajo || ''} onChange={e => setAnexoAltura(prev => ({...prev, alturaTrabajo: e.target.value}))}/>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label>B.- Coordinador TSA</Label>
                            <RadioGroup value={anexoAltura.coordinadorTSA || 'no'} onValueChange={v => setAnexoAltura(p => ({...p, coordinadorTSA: v as 'si'|'no'}))} className="flex">
                              <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="anexo-coord-si" /><Label htmlFor="anexo-coord-si">SI</Label></div>
                              <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="anexo-coord-no" /><Label htmlFor="anexo-coord-no" >NO</Label></div>
                            </RadioGroup>
                          </div>
                      </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label>C.- Auxiliar TSA</Label>
                             {renderRadioGroup('auxiliarTSA', 'anexoAltura')}
                          </div>
                           <div className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label>D.- Elaboración ATS y procedimientos</Label>
                            <RadioGroup value={anexoAltura.elaboracionATS || 'no'} onValueChange={v => setAnexoAltura(p => ({...p, elaboracionATS: v as 'si'|'no'}))} className="flex">
                              <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="anexo-ats-si" /><Label htmlFor="anexo-ats-si">SI</Label></div>
                              <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="anexo-ats-no" /><Label htmlFor="anexo-ats-no">NO</Label></div>
                            </RadioGroup>
                          </div>
                      </div>
                      <div>
                          <Label>Especifique el requerimiento de claridad o espacio libre de caída: Distancia vertical requerida por un trabajador en caso de una caída, para evitar que este impacte contra el suelo o contra un obstáculo. El requerimiento de claridad dependerá principalmente de la configuración del sistema de detención de caídas utilizado.</Label>
                          <Textarea value={anexoAltura.claridadEspacioLibre || ''} onChange={e => setAnexoAltura(prev => ({...prev, claridadEspacioLibre: e.target.value}))}/>
                      </div>
                  </div>
                  
                  {Object.entries(anexoAlturaSections).map(([sectionKey, sectionData]) => (
                     <div key={sectionKey} className="p-4 border rounded-lg">
                        <h4 className="font-bold mb-4 text-primary">{sectionData.title}</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {sectionData.items.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                    <Label className="flex-1 text-sm">{item.label}</Label>
                                    {renderRadioGroup(item.id, 'anexoAltura', sectionKey as keyof AnexoAltura)}
                                </div>
                            ))}
                        </div>
                    </div>
                  ))}

                  <div className="p-4 border rounded-lg">
                      <h4 className="font-bold mb-4 text-primary">OBSERVACIONES / SUPERVISIÓN DEL TRABAJO EN ALTURAS</h4>
                      <Textarea value={anexoAltura.observaciones || ''} onChange={e => setAnexoAltura(p => ({...p, observaciones: e.target.value}))} rows={4}/>
                  </div>
              </div>
          )}

          {currentStepInfo.label === "Anexo Confinado" && (
            <div className="space-y-6">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        ANEXO 2 - TRABAJOS EN ESPACIOS CONFINADOS
                    </h2>
                    <p className="text-muted-foreground text-sm">Complete toda la información requerida para este anexo.</p>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Tipo de Espacio Confinado</Label>
                            <Select value={anexoConfinado.tipo} onValueChange={v => setAnexoConfinado(p => ({...p, tipo: v as '1' | '2'}))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Tipo 1: Abierto con ventilación natural difícil</SelectItem>
                                    <SelectItem value="2">Tipo 2: Cerrado con apertura pequeña</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Grado de Peligro</Label>
                             <Select value={anexoConfinado.gradoPeligro} onValueChange={v => setAnexoConfinado(p => ({...p, gradoPeligro: v as 'A' | 'B' | 'C'}))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">Grado A</SelectItem>
                                    <SelectItem value="B">Grado B</SelectItem>
                                    <SelectItem value="C">Grado C</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Lista de Verificación</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {anexoConfinadoChecklist.left.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                <Label className="flex-1 text-sm">{item.label}</Label>
                                {renderRadioGroup(item.id, 'anexoConfinado')}
                            </div>
                        ))}
                         {anexoConfinadoChecklist.right.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                <Label className="flex-1 text-sm">{item.label}</Label>
                                {renderRadioGroup(item.id, 'anexoConfinado')}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Mediciones Atmosféricas</h4>
                     <div className="space-y-2">
                        {(anexoConfinado.mediciones || []).map((medicion, index) => (
                           <div key={medicion.id} className="grid grid-cols-3 sm:grid-cols-9 gap-2 items-center p-2 border rounded-md">
                                <Input placeholder="Hora" value={medicion.hora} onChange={e => updateMedicion(medicion.id, 'hora', e.target.value)} className="col-span-3 sm:col-span-1" />
                                <Input placeholder="O2" value={medicion.o2} onChange={e => updateMedicion(medicion.id, 'o2', e.target.value)} className="col-span-1" />
                                <Input placeholder="CO" value={medicion.co} onChange={e => updateMedicion(medicion.id, 'co', e.target.value)} className="col-span-1" />
                                <Input placeholder="H2S" value={medicion.h2s} onChange={e => updateMedicion(medicion.id, 'h2s', e.target.value)} className="col-span-1" />
                                <Input placeholder="LEL" value={medicion.lel} onChange={e => updateMedicion(medicion.id, 'lel', e.target.value)} className="col-span-1" />
                                <Input placeholder="Cl2" value={medicion.cl2} onChange={e => updateMedicion(medicion.id, 'cl2', e.target.value)} className="col-span-1" />
                                <Input placeholder="CO2" value={medicion.co2} onChange={e => updateMedicion(medicion.id, 'co2', e.target.value)} className="col-span-1" />
                                <div className="flex items-center gap-1 col-span-2 sm:col-span-2">
                                     <Button size="sm" variant="outline" onClick={() => openSignaturePad('medicion', { medicionId: medicion.id })}>
                                        {medicion.firma ? <Check size={16} /> : <Signature size={16}/>}
                                     </Button>
                                     <Button size="icon" variant="ghost" onClick={() => removeMedicion(medicion.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                </div>
                           </div>
                        ))}
                     </div>
                     <Button onClick={addMedicion} variant="outline" className="w-full">
                        <Plus className="mr-2" /> Añadir Medición
                    </Button>
                </div>

                 <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Supervisor de Espacios Confinados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                       <div>
                            <Label>Nombres y Apellidos</Label>
                            <Input value={anexoConfinado.supervisor?.nombres || ''} onChange={e => setAnexoConfinado(p => ({...p, supervisor: { ...p.supervisor!, nombres: e.target.value}}))}/>
                       </div>
                       <div>
                            <Label>Cédula</Label>
                            <Input value={anexoConfinado.supervisor?.cedula || ''} onChange={e => setAnexoConfinado(p => ({...p, supervisor: { ...p.supervisor!, cedula: e.target.value}}))}/>
                       </div>
                    </div>
                     <div className="text-center">
                        <Label>Firma Apertura</Label>
                        {anexoConfinado.supervisor?.firmaApertura ? (
                          <Image src={anexoConfinado.supervisor.firmaApertura} alt="Firma Supervisor" width={150} height={75} className="mx-auto mt-2 bg-gray-100 rounded"/>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                        )}
                        <Button size="sm" variant="link" onClick={() => openSignaturePad('supervisorConfinado')}>
                          {anexoConfinado.supervisor?.firmaApertura ? 'Cambiar Firma' : 'Firmar'}
                        </Button>
                    </div>
                </div>

                 <div className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary">Observaciones / Supervisión</h4>
                    <Textarea value={anexoConfinado.observaciones || ''} onChange={e => setAnexoConfinado(p => ({...p, observaciones: e.target.value}))} rows={4}/>
                </div>

            </div>
          )}

          {currentStepInfo.label === "Anexo Izaje" && (
             <div className="space-y-6">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        ANEXO 4 - IZAJE DE CARGAS
                    </h2>
                    <p className="text-muted-foreground text-sm">Complete toda la información requerida para este anexo.</p>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h3 className="font-bold text-primary mb-2">INFORMACIÓN GENERAL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Acción a Realizar</h4>
                        {anexoIzajeInfoGeneral.accion.map(item => (
                          <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`izaje-accion-${item.id}`}
                                checked={anexoIzaje.informacionGeneral?.accion?.[item.id]}
                                onCheckedChange={(checked) => setAnexoIzaje(p => ({...p, informacionGeneral: {...p.informacionGeneral!, accion: {...p.informacionGeneral?.accion, [item.id]: !!checked }}}))}
                              />
                              <Label htmlFor={`izaje-accion-${item.id}`} className="font-normal text-sm">{item.label}</Label>
                          </div>
                        ))}
                      </div>
                       <div>
                        <h4 className="font-semibold text-sm mb-2">Peso de la Carga</h4>
                        {anexoIzajeInfoGeneral.pesoCarga.map(item => (
                          <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`izaje-peso-${item.id}`}
                                checked={anexoIzaje.informacionGeneral?.pesoCarga?.[item.id]}
                                onCheckedChange={(checked) => setAnexoIzaje(p => ({...p, informacionGeneral: {...p.informacionGeneral!, pesoCarga: {...p.informacionGeneral?.pesoCarga, [item.id]: !!checked }}}))}
                              />
                              <Label htmlFor={`izaje-peso-${item.id}`} className="font-normal text-sm">{item.label}</Label>
                          </div>
                        ))}
                      </div>
                       <div>
                        <h4 className="font-semibold text-sm mb-2">Equipo a Utilizar (Capacidad en Ton)</h4>
                        {anexoIzajeInfoGeneral.equipoUtilizar.map(item => (
                          <div key={item} className="flex items-center gap-2 mb-2">
                              <Label htmlFor={`izaje-equipo-${item}`} className="flex-1 text-sm">{item}</Label>
                              <Input 
                                id={`izaje-equipo-${item}`} 
                                className="w-24" 
                                placeholder="Ton"
                                value={anexoIzaje.informacionGeneral?.equipoUtilizar?.[item] || ''}
                                onChange={e => setAnexoIzaje(p => ({...p, informacionGeneral: {...p.informacionGeneral!, equipoUtilizar: {...p.informacionGeneral?.equipoUtilizar, [item]: e.target.value }}}))}
                              />
                          </div>
                        ))}
                      </div>
                    </div>
                </div>

                 <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Aspectos Requeridos para Realizar Izaje de Carga</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                       {[...anexoIzajeAspectos.left, ...anexoIzajeAspectos.right].map(item => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                                <Label className="flex-1 text-sm">{item.label}</Label>
                                {renderRadioGroup(item.id, 'anexoIzaje', 'aspectosRequeridos')}
                            </div>
                        ))}
                    </div>
                </div>
                
                 <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Precauciones y Controles Específicos</h4>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {anexoIzajePrecauciones.map(item => (
                          <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`izaje-prec-${item.id}`}
                                checked={anexoIzaje.precauciones?.[item.id]}
                                onCheckedChange={(checked) => setAnexoIzaje(p => ({...p, precauciones: {...p.precauciones, [item.id]: !!checked }}))}
                              />
                              <Label htmlFor={`izaje-prec-${item.id}`} className="font-normal text-sm">{item.label}</Label>
                          </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border rounded-lg">
                    <h4 className="font-bold text-primary">Observaciones</h4>
                    <Textarea value={anexoIzaje.observaciones || ''} onChange={e => setAnexoIzaje(p => ({...p, observaciones: e.target.value}))} rows={4}/>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Lider de Izaje - Proyecto</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                       <div>
                            <Label>Nombre y apellido</Label>
                            <Input value={anexoIzaje.liderIzaje?.nombre || ''} onChange={e => setAnexoIzaje(p => ({...p, liderIzaje: { ...p.liderIzaje!, nombre: e.target.value}}))}/>
                       </div>
                       <div>
                            <Label>Cédula</Label>
                            <Input value={anexoIzaje.liderIzaje?.cedula || ''} onChange={e => setAnexoIzaje(p => ({...p, liderIzaje: { ...p.liderIzaje!, cedula: e.target.value}}))}/>
                       </div>
                    </div>
                     <div className="text-center">
                        <Label>Firma Apertura</Label>
                        {anexoIzaje.liderIzaje?.firmaApertura ? (
                          <Image src={anexoIzaje.liderIzaje.firmaApertura} alt="Firma Lider Izaje" width={150} height={75} className="mx-auto mt-2 bg-gray-100 rounded"/>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                        )}
                        <Button size="sm" variant="link" onClick={() => openSignaturePad('liderIzaje')}>
                          {anexoIzaje.liderIzaje?.firmaApertura ? 'Cambiar Firma' : 'Firmar'}
                        </Button>
                    </div>
                </div>
            </div>
          )}
          
          {currentStepInfo.label === "Anexo Energías" && (
            <div className="space-y-6">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        ANEXO 3 - TRABAJOS CON ENERGÍAS
                    </h2>
                    <p className="text-muted-foreground text-sm">Complete toda la información requerida para este anexo.</p>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Tensión a la cual el personal estará expuesto</h4>
                    <RadioGroup 
                      value={anexoEnergias.tensionExpuesta} 
                      onValueChange={(value) => setAnexoEnergias(p => ({ ...p, tensionExpuesta: value as any }))}
                      className="space-y-2"
                    >
                      {anexoEnergiasTension.map(item => (
                        <div key={item.id} className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
                          <RadioGroupItem value={item.id} id={`tension-${item.id}`} />
                          <Label htmlFor={`tension-${item.id}`} className="font-normal text-sm">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Planeación</h4>
                    <div className="space-y-3">
                       {anexoEnergiasPlaneacion.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                              <Label className="flex-1 text-sm">{item.label}</Label>
                              {renderRadioGroup(item.id, 'anexoEnergias')}
                          </div>
                      ))}
                    </div>
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">Método de trabajo</h4>
                    <RadioGroup 
                      value={anexoEnergias.metodoTrabajo} 
                      onValueChange={(value) => setAnexoEnergias(p => ({ ...p, metodoTrabajo: value as any }))}
                      className="flex gap-4"
                    >
                        <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
                          <RadioGroupItem value="sin_tension" id="metodo-sin" />
                          <Label htmlFor="metodo-sin" className="font-normal text-sm">Sin Tensión</Label>
                        </div>
                         <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
                          <RadioGroupItem value="con_tension" id="metodo-con" />
                          <Label htmlFor="metodo-con" className="font-normal text-sm">Con Tensión</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
          )}

          {currentStepInfo.label === "Peligros" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Verificación de Peligros
                </h2>
                <p className="text-muted-foreground text-sm">Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {hazards.map(hazard => (
                      <div key={hazard.id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                          <Label htmlFor={`hazards-${hazard.id}-si`} className="flex-1 text-sm">{hazard.label}</Label>
                          {renderRadioGroup(hazard.id, 'hazards')}
                      </div>
                  ))}
              </div>
            </div>
          )}
          
          {currentStepInfo.label === "EPP" && (
            <div className="space-y-6">
                 <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        EPP - Señalización
                    </h2>
                    <p className="text-muted-foreground text-sm">Verifique el estado de los equipos de protección y señalización.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {renderSection("Ropa", ppe.Ropa, 'ppe')}
                    {renderSection("Protección de pies y piernas", ppe["Protección de pies y piernas"], 'ppe')}
                    {renderSection("Protección auditiva", ppe["Protección auditiva"], 'ppe')}
                    {renderSection("Protección respiratoria", ppe["Protección respiratoria"], 'ppe')}
                    {renderSection("Protección cabeza", ppe["Protección cabeza"], 'ppe')}
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {renderSection("Protección facial y ocular", ppe["Protección facial y ocular"], 'ppe')}
                    {renderSection("Barrera/Señales de advertencia", ppe["Barrera/Señales de advertencia"], 'ppe')}
                    {renderSection("Guantes", ppe.Guantes, 'ppe')}
                    {renderSection("Otros", ppe.Otros, 'ppe')}
                </div>
            </div>
          )}

          {currentStepInfo.label === "Sistemas y Emergencia" && (
             <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                    Sistemas de Prevención y Emergencias
                  </h2>
                  <p className="text-muted-foreground text-sm">Verifique los sistemas de prevención y el plan de emergencias.</p>
                </div>
                
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-4 text-primary">Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {ppeSystems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label htmlFor={`ppeSystems-${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
                            {renderRadioGroup(item.id, 'ppeSystems')}
                        </div>
                    ))}
                    </div>
                </div>

                <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-4 text-primary">NOTIFICACIÓN</h4>
                     <div className="flex items-center space-x-2">
                        <Switch id="notification-switch" checked={notification} onCheckedChange={setNotification} />
                        <Label htmlFor="notification-switch">El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados del trabajo a realizar</Label>
                    </div>
                </div>

                <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-4 text-primary">EMERGENCIAS: Recordar y verificar</h4>
                    <div className="space-y-3">
                     {emergencyQuestions.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label htmlFor={`emergency-${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
                            {renderRadioGroup(item.id, 'emergency')}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
          )}

          {currentStepInfo.label === "Trabajadores" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Ejecutores del Trabajo o Personal Involucrado
                </h2>
                <p className="text-muted-foreground text-sm">Los abajo firmantes somos consientes de los riesgos relacionados con la ejecución del trabajo, así como de las medidas preventivas determinadas con el fin de realizar el trabajo de forma segura...</p>
              </div>

              <div className="space-y-4">
                {workers.length > 0 ? (
                  workers.map((worker, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Avatar className="w-12 h-12">
                          {worker.foto && <AvatarImage src={worker.foto} />}
                          <AvatarFallback>{getInitials(worker.nombre)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                          <p className="font-bold text-lg text-gray-800">{worker.nombre}</p>
                          <p className="text-sm text-gray-600">C.C. {worker.cedula} - {worker.rol}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => openEditWorkerDialog(worker, index)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => removeWorker(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 border-2 border-dashed rounded-xl">
                      <Users size={48} className="mx-auto text-gray-300" />
                      <p className="mt-4 font-semibold text-gray-600">No hay trabajadores agregados</p>
                      <p className="text-sm text-gray-500">Haga clic en el botón de abajo para empezar a agregar.</p>
                  </div>
                )}

                <Button onClick={openNewWorkerDialog} variant="outline" className="w-full border-2 border-dashed rounded-xl p-6 h-auto transition-all hover:shadow-lg border-primary text-primary bg-primary/10">
                  <UserPlus size={24} className="mr-3" />
                  <span className="font-bold">+ Agregar Trabajador</span>
                </Button>
              </div>
            </div>
          )}
          
          {currentStepInfo.label === "Revisión" && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Revisión Final y Envío
                </h2>
                <p className="text-muted-foreground text-sm">Verifique toda la información antes de enviar</p>
              </div>
                <div className="border-2 border-gray-200 rounded-xl p-6">
                   <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <Wand2 size={24} />
                    Análisis de Riesgo con IA
                  </h3>
                   <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button
                        type="button"
                        onClick={handleAssessRisk}
                        disabled={isAssessing}
                        variant="outline"
                      >
                        {isAssessing ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        Evaluar Riesgo con IA
                      </Button>
                      {recommendations &&
                        <p className="flex-1 text-sm text-muted-foreground p-4 bg-muted rounded-md">{recommendations}</p>
                      }
                      {isAssessing && <p className="flex-1 text-sm text-muted-foreground">Analizando...</p>}
                   </div>
                 </div>

                 <div className="border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                        <Signature size={24} />
                        Autorizaciones
                    </h3>
                    <p className='text-xs text-muted-foreground mb-4'>He tenido conocimiento de la actividad que se realizará en mi área a cargo, valido las recomendaciones descritas en el cuerpo del PERMISO DE TRABAJO Y ATS, realicé inspección de seguridad del área donde se realizará el trabajo (incluir áreas o actividades vecinas), Alerté sobre los riesgos específicos del lugar donde se realizará el trabajo. Se garantizar que las recomendaciones de SST descritas y consignadas serán cumplidas. Verifiqué las buenas condiciones de los equipos y herramientas que serán utilizados. Me aseguré que las personas implicadas están calificadas para la ejecución del servicio y conocen las reglas de seguridad aplicables al trabajo, los procedimientos, normas, políticas aplicables, el plan de emergencias.</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                            <div>
                                <p className="font-bold text-gray-700">QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)</p>
                                <p className="text-sm text-gray-600">{user?.displayName}</p>
                            </div>
                            <div className="text-right">
                               <p className="font-semibold text-sm text-yellow-600 flex items-center gap-2"><Clock size={16}/> Pendiente de Firma</p>
                            </div>
                        </div>
                         <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                            <div>
                                <p className="font-bold text-gray-700">QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)</p>
                                <p className="text-sm text-muted-foreground">Pendiente</p>
                            </div>
                            <div className="text-right">
                               <p className="font-semibold text-sm text-yellow-600 flex items-center gap-2"><Clock size={16}/> Pendiente</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          )}

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

      {/* Add/Edit Worker Dialog */}
      <Dialog open={isWorkerDialogOpen} onOpenChange={setIsWorkerDialogOpen}>
        <DialogContent className="sm:max-w-[650px] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingWorkerIndex !== null ? 'Editar' : 'Agregar'} Trabajador</DialogTitle>
            <DialogDescription>
              Complete la información del trabajador que ejecutará la tarea.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre y Apellido *</Label>
                  <Input id="nombre" value={currentWorker?.nombre || ''} onChange={(e) => handleWorkerInputChange('nombre', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="cedula">Cédula *</Label>
                  <Input id="cedula" value={currentWorker?.cedula || ''} onChange={(e) => handleWorkerInputChange('cedula', e.target.value)} />
                </div>
              </div>
              <div>
                  <Label htmlFor="rol">Rol dentro del permiso *</Label>
                  <Select value={currentWorker?.rol || ''} onValueChange={(value) => handleWorkerInputChange('rol', value)}>
                      <SelectTrigger id="rol"><SelectValue placeholder="Seleccione un rol..." /></SelectTrigger>
                      <SelectContent>
                          {workerRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                      </SelectContent>
                  </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div>
                  <Label htmlFor="eps">EPS</Label>
                    <Select value={currentWorker?.eps || ''} onValueChange={(value) => handleWorkerInputChange('eps', value)}>
                        <SelectTrigger><SelectValue placeholder="Seleccione EPS..." /></SelectTrigger>
                        <SelectContent>
                            {epsList.map(eps => <SelectItem key={eps} value={eps}>{eps}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                  <Label htmlFor="arl">ARL</Label>
                   <Select value={currentWorker?.arl || ''} onValueChange={(value) => handleWorkerInputChange('arl', value)}>
                        <SelectTrigger><SelectValue placeholder="Seleccione ARL..." /></SelectTrigger>
                        <SelectContent>
                            {arlList.map(arl => <SelectItem key={arl} value={arl}>{arl}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                  <Label htmlFor="pensiones">Fondo de Pensiones</Label>
                  <Select value={currentWorker?.pensiones || ''} onValueChange={(value) => handleWorkerInputChange('pensiones', value)}>
                        <SelectTrigger><SelectValue placeholder="Seleccione Fondo..." /></SelectTrigger>
                        <SelectContent>
                            {pensionFundsList.map(fund => <SelectItem key={fund} value={fund}>{fund}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                 <Label>Certificaciones</Label>
                 <div className="p-3 border rounded-lg space-y-2">
                    <Label htmlFor="tsa-tec-select">Certificado Aptitud Médica</Label>
                    <Select value={currentWorker?.tsaTec || 'na'} onValueChange={(value) => handleWorkerInputChange('tsaTec', value)}>
                      <SelectTrigger id="tsa-tec-select"><SelectValue placeholder="Seleccione certificación..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tsa">TSA</SelectItem>
                        <SelectItem value="tec">TEC</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                        <SelectItem value="na">No Aplica</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="p-3 border rounded-lg space-y-2">
                    <Label htmlFor="entrenamiento-select">Entrenamiento / Capacitación</Label>
                    <Select value={currentWorker?.entrenamiento || 'otro'} onValueChange={(value) => handleWorkerInputChange('entrenamiento', value)}>
                      <SelectTrigger id="entrenamiento-select"><SelectValue placeholder="Seleccione entrenamiento..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tsa">TSA</SelectItem>
                        <SelectItem value="tec">TEC</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>

               <div className="space-y-3">
                 <Label>Identificación</Label>
                 <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Foto (Selfie)</span>
                    <Button variant="outline" size="sm" onClick={() => handleFileUpload('foto')}> <Camera className="mr-2 h-4 w-4" />{currentWorker?.foto ? 'Cargada' : 'Cargar'}</Button>
                 </div>
              </div>

              <div className="space-y-3">
                <Label>Firmas del Trabajador</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <Label>Firma Apertura</Label>
                    {currentWorker?.firmaApertura ? (
                      <Image src={currentWorker.firmaApertura} alt="Firma Apertura" width={150} height={75} className="mx-auto mt-2 bg-gray-100 rounded"/>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                    )}
                    <Button size="sm" variant="link" onClick={() => openSignaturePad('firmaApertura')}>
                      {currentWorker?.firmaApertura ? 'Cambiar Firma' : 'Firmar'}
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <Label>Firma Cierre</Label>
                     {currentWorker?.firmaCierre ? (
                      <Image src={currentWorker.firmaCierre} alt="Firma Cierre" width={150} height={75} className="mx-auto mt-2 bg-gray-100 rounded"/>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">Pendiente</p>
                    )}
                    <Button size="sm" variant="link" onClick={() => openSignaturePad('firmaCierre')} disabled={!currentWorker?.firmaApertura}>
                       {currentWorker?.firmaCierre ? 'Cambiar Firma' : 'Firmar'}
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveWorker}>
              {editingWorkerIndex !== null ? 'Guardar Cambios' : 'Agregar Trabajador'}
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
