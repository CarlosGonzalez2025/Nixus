

'use client';
import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { createPermit } from './actions';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getRiskAssessmentRecommendations } from '@/ai/flows/risk-assessment-recommendation';
import { Logo } from '@/components/logo';
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
import type { ExternalWorker, Permit, Tool } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { SignaturePad } from '@/components/ui/signature-pad';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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


export default function CreatePermitPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  // Step 1
  const [workType, setWorkType] = useState('');
  const [generalInfo, setGeneralInfo] = useState({
    workDescription: '',
    suspensionCauses: '',
    procedure: '',
    isEmergencyExtension: false,
    validFrom: '',
    validUntil: '',
    reunionInicio: 'na',
    atsVerificado: 'na',
    tools: [] as Tool[],
  });
  const [newToolName, setNewToolName] = useState('');

  // Step 2
  const [hazardsData, setHazardsData] = useState<{ [key: string]: string }>({});

  // Step 3
  const [ppeData, setPpeData] = useState<{ [key: string]: string }>({});
  const [ppeSystemsData, setPpeSystemsData] = useState<{ [key: string]: string }>({});

  // Step 4
  const [emergencyData, setEmergencyData] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState(false);
  
  // Step 5
  const [workers, setWorkers] = useState<ExternalWorker[]>([]);
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState<Partial<ExternalWorker> | null>(null);
  const [editingWorkerIndex, setEditingWorkerIndex] = useState<number | null>(null);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [signatureTarget, setSignatureTarget] = useState<'firmaApertura' | 'firmaCierre' | null>(null);


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

  const openSignaturePad = (target: 'firmaApertura' | 'firmaCierre') => {
    setSignatureTarget(target);
    setIsSignaturePadOpen(true);
  };

  const handleSaveSignature = (signatureDataUrl: string) => {
    if (signatureTarget) {
      handleWorkerInputChange(signatureTarget, signatureDataUrl);
    }
    setIsSignaturePadOpen(false);
    setSignatureTarget(null);
  };
  
  const addTool = () => {
    if (newToolName.trim()) {
      setGeneralInfo(prev => ({...prev, tools: [...prev.tools, { name: newToolName.trim(), status: 'B' }]}));
      setNewToolName('');
    }
  };

  const updateToolStatus = (index: number, status: 'B' | 'M') => {
    const updatedTools = [...generalInfo.tools];
    updatedTools[index].status = status;
    setGeneralInfo(prev => ({...prev, tools: updatedTools}));
  };

  const removeTool = (index: number) => {
    setGeneralInfo(prev => ({...prev, tools: prev.tools.filter((_, i) => i !== index)}));
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
    if (step === 1) {
      return workType && generalInfo.workDescription && generalInfo.validFrom && generalInfo.validUntil;
    }
    return true;
  };
  
  const handleAssessRisk = async () => {
    setIsAssessing(true);
    setRecommendations('');
    try {
      const result = await getRiskAssessmentRecommendations({
        workType: workTypes[workType] || workType,
        environmentalFactors: "Factores diversos según peligros seleccionados",
        permitDetails: generalInfo.procedure,
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
        workType,
        generalInfo,
        hazards: hazardsData,
        ppe: ppeData,
        ppeSystems: ppeSystemsData,
        emergency: { ...emergencyData, notification },
        workers: workers,
      };

      const result = await createPermit({
          userId: user.uid, 
          userDisplayName: user.displayName || null, 
          userEmail: user.email || null,
          userPhotoURL: user.photoURL || null,
          ...fullPermitData
        });
      
      if (result.success) {
        toast({
          title: 'Permiso Creado Exitosamente',
          description: 'Su permiso ha sido enviado para revisión.',
          className: 'bg-green-100 dark:bg-green-900',
        });
        router.push('/dashboard');
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

  const steps = [
    "Info General", "Peligros", "EPP", "Sistemas y Emergencia", "Trabajadores", "Revisión"
  ];
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const handleRadioChange = (group: 'hazards' | 'ppe' | 'ppeSystems' | 'emergency', id: string, value: string) => {
      switch(group) {
          case 'hazards': setHazardsData(prev => ({...prev, [id]: value})); break;
          case 'ppe': setPpeData(prev => ({...prev, [id]: value})); break;
          case 'ppeSystems': setPpeSystemsData(prev => ({...prev, [id]: value})); break;
          case 'emergency': setEmergencyData(prev => ({...prev, [id]: value})); break;
      }
  }

  const renderRadioGroup = (id: string, group: 'hazards' | 'ppe' | 'ppeSystems' | 'emergency') => {
    let state: any;
     switch(group) {
        case 'hazards': state = hazardsData; break;
        case 'ppe': state = ppeData; break;
        case 'ppeSystems': state = ppeSystemsData; break;
        case 'emergency': state = emergencyData; break;
    }

    return (
        <RadioGroup value={state[id] || 'na'} onValueChange={(value) => handleRadioChange(group, id, value)} className="flex">
            <RadioGroupItem value="si" id={`${id}-si`} /> <Label htmlFor={`${id}-si`} className="mr-2">SI</Label>
            <RadioGroupItem value="no" id={`${id}-no`} /> <Label htmlFor={`${id}-no`} className="mr-2">NO</Label>
            <RadioGroupItem value="na" id={`${id}-na`} /> <Label htmlFor={`${id}-na`}>NA</Label>
        </RadioGroup>
    )
  }

  const renderSection = (title: string, items: {id: string, label: string}[], group: 'ppe' | 'ppeSystems') => (
      <div className="p-4 border rounded-lg">
          <h4 className="font-bold mb-4 text-primary">{title}</h4>
          <div className="space-y-3">
          {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <Label htmlFor={`${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
                  {renderRadioGroup(item.id, group)}
              </div>
          ))}
          </div>
      </div>
  )

  return (
    <div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
      <div className="text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <Logo textOnly />
                <div className="hidden md:block border-l border-white border-opacity-30 pl-3">
                  <h1 className="text-xl font-bold">Nuevo Permiso de Trabajo</h1>
                  <p className="text-sm text-white text-opacity-80">
                    Paso {step} de {steps.length}
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
      </div>
      
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((_label, s_idx) => {
              const s = s_idx + 1;
              return(
              <div key={s} className="flex items-center flex-1">
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                  s === step ? 'ring-4 scale-110 shadow-lg text-white' :
                  s < step ? 'text-white' :
                  'bg-gray-200 text-gray-600'
                }`}
                style={s <= step ? { backgroundColor: s === step ? colors.primary : colors.success } : {}}>
                  {s < step ? <CheckCircle size={20}/> : s}
                </div>
                {s < steps.length && (
                  <div className="flex-1 h-1 mx-2 rounded" style={{ 
                    backgroundColor: s < step ? colors.success : '#E5E7EB' 
                  }} />
                )}
              </div>
            )})}
          </div>
          <div className="grid grid-cols-6 gap-2 text-xs text-center font-medium">
            {steps.map((label, s_idx) => (
              <span key={s_idx} style={{ color: step === s_idx + 1 ? colors.primary : '#6B7280' }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto p-4 pb-24 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Información General del Permiso
                </h2>
                <p className="text-muted-foreground">Complete todos los campos obligatorios (*)</p>
              </div>
                
                 <div>
                    <label className="font-bold text-gray-700">Tipo de Trabajo *</label>
                    <Select value={workType} onValueChange={setWorkType}>
                        <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Seleccione el tipo de trabajo a realizar..." />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(workTypes).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>

                <div>
                    <label className="font-bold text-gray-700">El trabajo se LIMITA a lo siguiente (Tipo y Alcance del Trabajo - Descripción y Área/Equipo): *</label>
                    <Textarea
                      value={generalInfo.workDescription}
                      onChange={(e) => setGeneralInfo({...generalInfo, workDescription: e.target.value})}
                      rows={3}
                      className="w-full mt-1"
                      placeholder="Describa el tipo, alcance, descripción y área/equipo..."
                    />
                </div>
              
              <div>
                  <label className="font-bold text-gray-700">Causales para la suspensión del Permiso:</label>
                  <Input
                      value={generalInfo.suspensionCauses}
                      onChange={(e) => setGeneralInfo({...generalInfo, suspensionCauses: e.target.value})}
                      className="w-full mt-1"
                      placeholder="LA OCURRENCIA DE UNA SITUACIÓN DE ALERTA, EXPLOSIÓN, INCENDIO..."
                  />
              </div>

              <div>
                <label className="font-bold text-gray-700">Descripción o procedimiento de la teras a realizar:</label>
                <Textarea
                  value={generalInfo.procedure}
                  onChange={(e) => setGeneralInfo({...generalInfo, procedure: e.target.value})}
                  rows={4}
                  className="w-full mt-1"
                  placeholder="Describa el procedimiento detallado paso a paso..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="emergency-extension" checked={generalInfo.isEmergencyExtension} onCheckedChange={(checked) => setGeneralInfo({...generalInfo, isEmergencyExtension: checked})} />
                <Label htmlFor="emergency-extension">Extensión Emergencia</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-bold text-gray-700">Válido Desde (DD/MM/AA HH:MM) *</label>
                  <Input
                    type="datetime-local"
                    value={generalInfo.validFrom}
                    onChange={(e) => setGeneralInfo({...generalInfo, validFrom: e.target.value})}
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700">Válido Hasta (DD/MM/AA HH:MM) *</label>
                  <Input
                    type="datetime-local"
                    value={generalInfo.validUntil}
                    onChange={(e) => setGeneralInfo({...generalInfo, validUntil: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700">Herramientas y Equipos</label>
                <div className="p-4 border rounded-lg mt-2 space-y-2">
                  {generalInfo.tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{tool.name}</span>
                       <RadioGroup value={tool.status} onValueChange={(value: 'B' | 'M') => updateToolStatus(index, value)} className="flex">
                          <RadioGroupItem value="B" id={`tool-${index}-b`} /> <Label htmlFor={`tool-${index}-b`} className="mr-2">B</Label>
                          <RadioGroupItem value="M" id={`tool-${index}-m`} /> <Label htmlFor={`tool-${index}-m`}>M</Label>
                      </RadioGroup>
                      <Button variant="ghost" size="icon" onClick={() => removeTool(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input value={newToolName} onChange={(e) => setNewToolName(e.target.value)} placeholder="Nueva herramienta..." />
                    <Button onClick={addTool}><Plus/></Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-700">Reunión de Inicio</label>
                <RadioGroup value={generalInfo.reunionInicio} onValueChange={(value) => setGeneralInfo({...generalInfo, reunionInicio: value})} className="flex">
                    <RadioGroupItem value="si" id="reunion-si" /> <Label htmlFor="reunion-si" className="mr-2">SI</Label>
                    <RadioGroupItem value="no" id="reunion-no" /> <Label htmlFor="reunion-no" className="mr-2">NO</Label>
                    <RadioGroupItem value="na" id="reunion-na" /> <Label htmlFor="reunion-na">NA</Label>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">ATS Verificado</label>
                 <RadioGroup value={generalInfo.atsVerificado} onValueChange={(value) => setGeneralInfo({...generalInfo, atsVerificado: value})} className="flex">
                    <RadioGroupItem value="si" id="ats-si" /> <Label htmlFor="ats-si" className="mr-2">SI</Label>
                    <RadioGroupItem value="no" id="ats-no" /> <Label htmlFor="ats-no" className="mr-2">NO</Label>
                    <RadioGroupItem value="na" id="ats-na" /> <Label htmlFor="ats-na">NA</Label>
                </RadioGroup>
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Verificación de Peligros
                </h2>
                <p className="text-muted-foreground">Verifique que se haya considerado dentro del ATS todos los peligros y las medidas de control</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {hazards.map(hazard => (
                      <div key={hazard.id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
                          <Label htmlFor={`${hazard.id}-si`} className="flex-1 text-sm">{hazard.label}</Label>
                          {renderRadioGroup(hazard.id, 'hazards')}
                      </div>
                  ))}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
                 <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                        EPP - Señalización
                    </h2>
                    <p className="text-muted-foreground">Verifique el estado de los equipos de protección y señalización.</p>
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

          {step === 4 && (
             <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                    Sistemas de Prevención y Emergencias
                  </h2>
                  <p className="text-muted-foreground">Verifique los sistemas de prevención y el plan de emergencias.</p>
                </div>
                
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-4 text-primary">Sistema / Equipo de Prevención - Protección Contra Caída y Espacios Confinados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {ppeSystems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                            <Label htmlFor={`${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
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
                            <Label htmlFor={`${item.id}-si`} className="flex-1 text-sm">{item.label}</Label>
                            {renderRadioGroup(item.id, 'emergency')}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Trabajadores Ejecutantes Externos
                </h2>
                <p className="text-muted-foreground">Registre todos los trabajadores externos que participarán en esta tarea</p>
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

          {step === 6 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Revisión Final y Envío
                </h2>
                <p className="text-muted-foreground">Verifique toda la información antes de enviar</p>
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

                <div className="rounded-xl p-6 bg-yellow-50 border-2 border-yellow-400">
                  <p className="text-sm flex items-start gap-3 text-yellow-800">
                    <AlertTriangle className="text-yellow-500" style={{minWidth: 20}} size={20} />
                    <span>
                      <strong>Importante:</strong> Al hacer clic en "Enviar para Aprobación", usted crea el permiso y lo envía para el flujo de firmas. Deberá ir a la página de detalles para firmarlo.
                    </span>
                  </p>
                </div>
            </div>
          )}

        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
          <div className="max-w-5xl mx-auto px-4 py-4 flex gap-4">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
                variant="outline"
                className="px-8 py-3 h-auto"
              >
                ← Anterior
              </Button>
            )}
            
            {step < steps.length ? (
              <Button
                onClick={() => {
                  if (canProceed()) {
                    setStep(step + 1);
                  } else {
                    toast({
                      variant: 'destructive',
                      title: 'Campos incompletos',
                      description: 'Por favor complete todos los campos obligatorios para continuar.'
                    })
                  }
                }}
                disabled={!canProceed() || isSubmitting}
                className="flex-1 py-3 h-auto"
              >
                Siguiente →
              </Button>
            ) : (
              <Button
                onClick={handleSavePermit}
                disabled={isSubmitting}
                className="flex-1 py-3 h-auto bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                   <CheckCircle size={24} className="mr-2" />
                )}
                <span className="text-lg">Enviar para Aprobación</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Add/Edit Worker Dialog */}
      <Dialog open={isWorkerDialogOpen} onOpenChange={setIsWorkerDialogOpen}>
        <DialogContent className="sm:max-w-[650px] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingWorkerIndex !== null ? 'Editar' : 'Agregar'} Trabajador Externo</DialogTitle>
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
                <Input id="rol" value={currentWorker?.rol || ''} onChange={(e) => handleWorkerInputChange('rol', e.target.value)} />
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
                <div className="grid grid-cols-2 gap-4">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Firma del Trabajador</DialogTitle>
          </DialogHeader>
          <SignaturePad onSave={handleSaveSignature} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
