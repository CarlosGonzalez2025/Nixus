
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
  ClipboardCheck,
  Upload,
  Camera,
  Wand2,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getRiskAssessmentRecommendations } from '@/ai/flows/risk-assessment-recommendation';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function CreatePermitPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  const [formData, setFormData] = useState({
    workType: '',
    workDescription: '',
    workArea: '',
    validFrom: '',
    validUntil: '',
    procedure: '',
    emergencyExtension: false,
  });

  const [hazardsData, setHazardsData] = useState<{ [key: string]: { status?: string, controls?: string } }>({});
  const [selectedAnnexes, setSelectedAnnexes] = useState<string[]>([]);
  const [ppeData, setPpeData] = useState<{ [key: string]: { required?: boolean, verified?: boolean } }>({});
  const [emergencyData, setEmergencyData] = useState<{ [key: string]: string }>({});

  const colors = {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    dark: 'hsl(var(--primary))', 
    success: 'hsl(var(--accent))',
    danger: 'hsl(var(--destructive))',
    warning: '#FF9800',
    info: '#2196F3',
  };

  const workTypes = [
    { id: 'altura', name: 'Trabajo en Alturas', icon: '⬆️', color: colors.info },
    { id: 'confinado', name: 'Espacios Confinados', icon: '📦', color: colors.warning },
    { id: 'energia', name: 'Control de Energías', icon: '⚡', color: colors.danger },
    { id: 'izaje', name: 'Izaje de Cargas', icon: '🏗️', color: colors.secondary },
    { id: 'caliente', name: 'Trabajo en Caliente', icon: '🔥', color: colors.primary },
    { id: 'excavacion', name: 'Excavaciones', icon: '⛏️', color: colors.dark }
  ];

  const hazards = [
      { name: 'Caída de Personas a Diferente Nivel', critical: true },
      { name: 'Caída de Objetos', critical: true },
      { name: 'Contacto con Energía Eléctrica', critical: true },
      { name: 'Contacto con Sustancias Químicas', critical: false },
      { name: 'Atrapamiento por o entre Objetos', critical: false },
      { name: 'Exposición a Ruido', critical: false },
      { name: 'Temperatura Extrema', critical: false },
      { name: 'Radiación No Ionizante', critical: false },
      { name: 'Espacios Confinados', critical: false },
      { name: 'Atmósfera Peligrosa', critical: true }
  ];

  const ppeItems = [
      'Casco de Seguridad',
      'Botas de Seguridad con Puntera',
      'Guantes de Seguridad',
      'Gafas de Seguridad',
      'Protección Auditiva',
      'Arnés de Seguridad Completo',
      'Línea de Vida',
      'Respirador o Mascarilla',
      'Overol o Traje de Trabajo',
      'Chaleco Reflectivo'
  ];

  const emergencyQuestions = [
      '¿Se ha comunicado el plan de emergencia a todos los trabajadores?',
      '¿Están disponibles y accesibles los equipos de emergencia (extintores, botiquín)?',
      '¿Se han identificado las rutas de evacuación y puntos de encuentro?',
      '¿Hay un vigía de seguridad asignado para esta tarea (si aplica)?',
      '¿Se ha verificado la comunicación con el área de SST?',
      '¿Todos los trabajadores conocen el número de emergencia de la empresa?'
  ];

  const canProceed = () => {
    if (step === 1) {
      return formData.workType && formData.workDescription && formData.workArea && 
             formData.validFrom && formData.validUntil && formData.procedure;
    }
    if (step === 2) {
      const criticalHazards = hazards.filter(h => h.critical);
      return criticalHazards.every(h => hazardsData[h.name] && hazardsData[h.name]?.status !== 'no');
    }
    if (step === 5) {
      return emergencyQuestions.every(q => emergencyData[q] === 'si');
    }
    return true;
  };
  
  const handleAssessRisk = async () => {
    if (!formData.workType || !formData.workDescription) {
      toast({
        variant: 'destructive',
        title: 'Formulario Incompleto',
        description: 'Por favor, llene al menos el tipo y descripción de trabajo antes de evaluar el riesgo.',
      });
      return;
    }

    setIsAssessing(true);
    setRecommendations('');
    try {
      const values = {
        workType: formData.workType,
        environmentalFactors: "No especificado", // Placeholder, you can add this field to the form
        permitDetails: formData.workDescription
      };
      const result = await getRiskAssessmentRecommendations(values);
      setRecommendations(result.recommendedControls);
      toast({
        title: 'Evaluación de Riesgo Completa',
        description: 'Los controles recomendados por IA ya están disponibles.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Falló la Evaluación',
        description: 'La evaluación de riesgo por IA no pudo completarse. Por favor, intente de nuevo.',
      });
    } finally {
      setIsAssessing(false);
    }
  };

  const handleSavePermit = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error de Autenticación', description: 'Debe iniciar sesión para crear un permiso.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const fullPermitData = {
        workType: formData.workType,
        permitDetails: JSON.stringify({
          generalInfo: formData,
          hazards: hazardsData,
          annexes: selectedAnnexes,
          ppe: ppeData,
          emergency: emergencyData,
        }),
        environmentalFactors: 'No especificado',
        recommendedControls: recommendations,
        userId: user.uid,
      };

      const result = await createPermit(fullPermitData);

      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: 'Permiso Creado Exitosamente',
        description: 'Su permiso ha sido enviado para revisión.',
        className: 'bg-green-100 dark:bg-green-900',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Falló el Envío',
        description: error.message || 'Hubo un error creando el permiso. Por favor, intente de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    "Info General", "Peligros", "Anexos", "EPP", "Emergencias", "Trabajadores", "Revisión"
  ];

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
                    Paso {step} de 7
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
      
      {/* Progress Bar */}
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
                {s < 7 && (
                  <div className="flex-1 h-1 mx-2 rounded" style={{ 
                    backgroundColor: s < step ? colors.success : '#E5E7EB' 
                  }} />
                )}
              </div>
            )})}
          </div>
          <div className="grid grid-cols-7 gap-2 text-xs text-center font-medium">
            {steps.map((label, s_idx) => (
              <span key={s_idx} style={{ color: step === s_idx + 1 ? colors.primary : '#6B7280' }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Form Content */}
      <div className="max-w-5xl mx-auto p-4 pb-24 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Información General */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Información General del Permiso
                </h2>
                <p className="text-muted-foreground">Complete todos los campos obligatorios (*)</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                  Tipo de Trabajo de Alto Riesgo *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {workTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, workType: type.id})}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.workType === type.id
                          ? 'shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={formData.workType === type.id ? { 
                        borderColor: type.color, 
                        backgroundColor: `${type.color}15` 
                      } : {}}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-semibold">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                  Descripción del Trabajo *
                </label>
                <Textarea
                  value={formData.workDescription}
                  onChange={(e) => setFormData({...formData, workDescription: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary transition-all"
                  placeholder="Describa detalladamente la actividad a realizar, incluyendo equipos, herramientas y procedimientos específicos..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                  Área de Trabajo *
                </label>
                <Input
                  type="text"
                  value={formData.workArea}
                  onChange={(e) => setFormData({...formData, workArea: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary transition-all"
                  placeholder="Ej: Planta de Producción - Área 2, Bodega Principal, Zona de Mantenimiento..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                    Fecha y Hora de Inicio *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                    Fecha y Hora de Fin *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.dark }}>
                  Procedimiento de Trabajo Paso a Paso *
                </label>
                <Textarea
                  value={formData.procedure}
                  onChange={(e) => setFormData({...formData, procedure: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary transition-all"
                  placeholder="Describa el procedimiento detallado paso a paso:&#10;1. Preparación del área y equipos&#10;2. Instalación de señalización&#10;3. Verificación de EPP&#10;4. ..."
                />
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: `#FF980020`, borderLeft: `4px solid #FF9800` }}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emergencyExtension}
                    onChange={(e) => setFormData({...formData, emergencyExtension: e.target.checked})}
                    className="w-5 h-5 rounded accent-warning"
                  />
                  <span className="font-semibold">
                    ⚠️ Este es un permiso de extensión por emergencia
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Verificación de Peligros */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Verificación de Peligros Asociados
                </h2>
                <p className="text-muted-foreground">Identifique y controle todos los peligros presentes</p>
              </div>
              
              <div className="rounded-xl p-6 bg-destructive/10 border-2 border-destructive">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="text-destructive" style={{minWidth: 32 }} size={32} />
                  <div>
                    <p className="font-bold text-lg mb-2 text-destructive">
                      ⚠️ CAMPOS CRÍTICOS EXCLUYENTES
                    </p>
                    <p className="text-sm text-destructive/80">
                      Los peligros marcados con ⚠️ son <strong>INNEGOCIABLES</strong>. Si alguna respuesta es "NO", 
                      el permiso <strong>NO PODRÁ CONTINUAR</strong> sin implementar los controles correspondientes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {hazards.map((hazard, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded-xl p-5 transition-all ${
                      hazard.critical 
                        ? 'border-red-200 bg-red-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                          {hazard.critical && (
                            <span className="text-red-500 text-2xl">⚠️</span>
                          )}
                          {hazard.name}
                          {hazard.critical && (
                            <span className="text-xs px-2 py-1 bg-red-500 text-white rounded-full">
                              CRÍTICO
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="flex gap-3">
                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                          hazardsData[hazard.name]?.status === 'si' 
                            ? 'bg-green-100 border-green-500 text-green-700 font-bold' 
                            : 'border-gray-300 hover:border-green-500'
                        }`}>
                          <input 
                            type="radio" 
                            name={`hazard-${index}`}
                            value="si"
                            checked={hazardsData[hazard.name]?.status === 'si'}
                            onChange={() => setHazardsData({
                              ...hazardsData,
                              [hazard.name]: { ...hazardsData[hazard.name], status: 'si' }
                            })}
                            className="w-5 h-5" 
                          />
                          <span className="font-semibold">SÍ</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                          hazardsData[hazard.name]?.status === 'no' 
                            ? 'bg-red-100 border-red-500 text-red-700 font-bold' 
                            : 'border-gray-300 hover:border-red-500'
                        }`}>
                          <input 
                            type="radio" 
                            name={`hazard-${index}`}
                            value="no"
                            checked={hazardsData[hazard.name]?.status === 'no'}
                            onChange={() => setHazardsData({
                              ...hazardsData,
                              [hazard.name]: { ...hazardsData[hazard.name], status: 'no' }
                            })}
                            className="w-5 h-5" 
                          />
                          <span className="font-semibold">NO</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                          hazardsData[hazard.name]?.status === 'na' 
                            ? 'bg-gray-100 border-gray-500 text-gray-700 font-bold' 
                            : 'border-gray-300 hover:border-gray-500'
                        }`}>
                          <input 
                            type="radio" 
                            name={`hazard-${index}`}
                            value="na"
                            checked={hazardsData[hazard.name]?.status === 'na'}
                            onChange={() => setHazardsData({
                              ...hazardsData,
                              [hazard.name]: { ...hazardsData[hazard.name], status: 'na' }
                            })}
                            className="w-5 h-5" 
                          />
                          <span className="font-semibold">N/A</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Textarea
                        rows={2}
                        value={hazardsData[hazard.name]?.controls || ''}
                        onChange={(e) => setHazardsData({
                          ...hazardsData,
                          [hazard.name]: { ...hazardsData[hazard.name], controls: e.target.value }
                        })}
                        className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-lg focus:border-current transition-all"
                        placeholder="Describa las medidas de control implementadas para este peligro..."
                      />
                    </div>
                  </div>
                ))}
              </div>

              {!canProceed() && (
                <div className="rounded-xl p-4 bg-red-100 border-2 border-red-500">
                  <p className="font-bold text-red-800 flex items-center gap-2">
                    <XCircle size={20} />
                    No puede continuar: Debe corregir los peligros críticos marcados como "NO"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Anexos Específicos */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Listas de Verificación Complementarias
                </h2>
                <p className="text-muted-foreground">Seleccione los anexos específicos según el tipo de trabajo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workTypes.map(type => (
                  <label
                    key={type.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedAnnexes.includes(type.id)
                        ? 'shadow-xl scale-105'
                        : 'hover:border-gray-400'
                    }`}
                    style={selectedAnnexes.includes(type.id) ? {
                      borderColor: type.color,
                      backgroundColor: `${type.color}15`
                    } : {}}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedAnnexes.includes(type.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAnnexes([...selectedAnnexes, type.id]);
                          } else {
                            setSelectedAnnexes(selectedAnnexes.filter(id => id !== type.id));
                          }
                        }}
                        className="w-6 h-6 rounded"
                        style={{ accentColor: type.color }}
                      />
                      <div className="flex-1">
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <p className="font-bold text-lg">{type.name}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {selectedAnnexes.length > 0 && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.dark }}>
                    <CheckCircle style={{ color: colors.success }} size={24} />
                    Anexos Seleccionados ({selectedAnnexes.length})
                  </h3>
                  {selectedAnnexes.map(annexId => {
                    const type = workTypes.find(t => t.id === annexId);
                    if (!type) return null;
                    return (
                      <div 
                        key={annexId} 
                        className="rounded-xl p-6 border-2"
                        style={{ borderColor: type.color, backgroundColor: `${type.color}10` }}
                      >
                        <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                          <span className="text-2xl">{type.icon}</span>
                          {type.name}
                        </h4>
                        <div className="space-y-3">
                          {[
                            'Verificación de equipos y herramientas certificadas',
                            'Inspección preoperacional completada',
                            'Personal capacitado y certificado'
                          ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-4 flex items-center justify-between border">
                              <span className="text-sm font-medium text-gray-700">{item}</span>
                              <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                  <input type="radio" name={`${annexId}-${idx}`} className="w-4 h-4" />
                                  <span className="text-xs font-semibold text-green-600">SÍ</span>
                                </label>
                                <label className="flex items-center gap-1">
                                  <input type="radio" name={`${annexId}-${idx}`} className="w-4 h-4" />
                                  <span className="text-xs font-semibold text-red-600">NO</span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          
          {/* Step 4: EPP */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Equipos de Protección Personal Requeridos
                </h2>
                <p className="text-muted-foreground">Marque todos los EPP necesarios y verifique su estado</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ppeItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded-xl p-5 transition-all ${
                      ppeData[item]?.required 
                        ? 'bg-orange-50 border-primary shadow-md' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={ppeData[item]?.required || false}
                          onChange={(e) => setPpeData({
                            ...ppeData,
                            [item]: { ...ppeData[item], required: e.target.checked }
                          })}
                          className="w-6 h-6 rounded accent-primary"
                        />
                        <span className="font-semibold text-gray-800">{item}</span>
                      </label>
                    </div>
                    {ppeData[item]?.required && (
                      <div className="ml-9 mt-3 flex gap-3">
                        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm ${
                          ppeData[item]?.verified 
                            ? 'bg-green-100 border-green-500 text-green-700 font-semibold' 
                            : 'border-gray-300'
                        }`}>
                          <input 
                            type="checkbox"
                            checked={ppeData[item]?.verified || false}
                            onChange={(e) => setPpeData({
                              ...ppeData,
                              [item]: { ...ppeData[item], verified: e.target.checked }
                            })}
                            className="w-4 h-4 rounded accent-green-500"
                          />
                          <CheckCircle size={16} />
                          <span>Verificado</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 bg-blue-50 border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Los EPP marcados como requeridos deben ser inspeccionados 
                  antes del inicio de la tarea y deben estar en buen estado.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Emergencias */}
          {step === 5 && (
             <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                    Notificaciones y Manejo de Emergencias
                  </h2>
                  <p className="text-muted-foreground">Todos estos campos son obligatorios y críticos</p>
                </div>

                <div className="rounded-xl p-6 bg-destructive/10 border-2 border-destructive">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="text-destructive" style={{minWidth:32}} size={32} />
                    <div>
                      <p className="font-bold text-lg mb-2 text-destructive">
                        ⚠️ CAMPOS CRÍTICOS DE SEGURIDAD
                      </p>
                      <p className="text-sm text-destructive/80">
                        <strong>TODAS</strong> estas preguntas deben responderse "SÍ". 
                        Cualquier respuesta "NO" <strong>BLOQUEARÁ LA APROBACIÓN</strong> del permiso.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {emergencyQuestions.map((question, index) => (
                    <div 
                      key={index} 
                      className={`border-2 rounded-xl p-5 transition-all ${emergencyData[question] === 'si' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                            <span className="text-red-500 text-2xl">⚠️</span>
                            {question}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <label className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-lg border-2 transition-all ${
                            emergencyData[question] === 'si'
                              ? 'bg-green-100 border-green-500 text-green-700 font-bold shadow-md' 
                              : 'border-gray-300 hover:border-green-500'
                          }`}>
                            <input 
                              type="radio" 
                              name={`emergency-${index}`}
                              value="si"
                              checked={emergencyData[question] === 'si'}
                              onChange={() => setEmergencyData({...emergencyData, [question]: 'si'})}
                              className="w-5 h-5" 
                            />
                            <span className="font-bold text-lg">SÍ</span>
                          </label>
                          <label className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-lg border-2 transition-all ${
                            emergencyData[question] === 'no'
                              ? 'bg-red-100 border-red-500 text-red-700 font-bold shadow-md' 
                              : 'border-gray-300 hover:border-red-500'
                          }`}>
                            <input 
                              type="radio" 
                              name={`emergency-${index}`}
                              value="no"
                              checked={emergencyData[question] === 'no'}
                              onChange={() => setEmergencyData({...emergencyData, [question]: 'no'})}
                              className="w-5 h-5" 
                            />
                            <span className="font-bold text-lg">NO</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!canProceed() && (
                  <div className="rounded-xl p-6 bg-red-100 border-2 border-red-500">
                    <p className="font-bold text-red-800 flex items-center gap-3 text-lg">
                      <XCircle size={24} />
                      No puede continuar: Debe responder "SÍ" a TODAS las preguntas de emergencia
                    </p>
                  </div>
                )}
            </div>
          )}

          {/* Step 6: Trabajadores */}
          {step === 6 && (
            <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                    Trabajadores Ejecutantes
                  </h2>
                  <p className="text-muted-foreground">Registre todos los trabajadores que participarán en esta tarea</p>
                </div>

                <div className="rounded-xl p-4 bg-blue-50 border-l-4 border-blue-500">
                  <p className="text-sm flex items-center gap-2 text-blue-800">
                    <Users size={20} />
                    <span>
                      Todos los trabajadores deben confirmar su participación y asistencia a la charla preoperativa
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Mocked user list for now */}
                   <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg bg-primary"
                        >
                          AM
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <p className="font-bold text-lg text-gray-800">Ana Martínez</p>
                          <p className="text-sm text-gray-600">ana@italcol.com</p>
                          <p className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full inline-block mt-1">
                            Ejecutante del Trabajo
                          </p>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600">
                          <CheckCircle size={16} className="mr-2"/> Confirmado
                        </Button>
                      </div>
                    </div>

                  <Button variant="outline" className="w-full border-2 border-dashed rounded-xl p-6 h-auto transition-all hover:shadow-lg border-primary text-primary bg-primary/10">
                    <Users size={24} className="mr-3" />
                    <span className="font-bold">+ Agregar Trabajador Adicional</span>
                  </Button>
                </div>
            </div>
          )}

          {/* Step 7: Revisión */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  Revisión Final y Envío
                </h2>
                <p className="text-muted-foreground">Verifique toda la información antes de enviar</p>
              </div>

              <div className="rounded-xl p-6 bg-green-50 border-2 border-green-400">
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-green-500" size={32} />
                  <div>
                    <p className="font-bold text-lg text-green-600">
                      ✓ Formulario Completo
                    </p>
                    <p className="text-sm text-gray-700">
                      Revise toda la información cuidadosamente antes de enviar para aprobación
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <FileText size={24} />
                    Información General
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-semibold">Tipo de Trabajo:</span>
                      <p className="font-bold text-lg mt-1">
                        {workTypes.find(t => t.id === formData.workType)?.icon}{' '}
                        {workTypes.find(t => t.id === formData.workType)?.name || 'No especificado'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 font-semibold">Área:</span>
                      <p className="font-bold text-lg mt-1">{formData.workArea || 'No especificado'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600 font-semibold">Descripción:</span>
                      <p className="mt-1 text-gray-800">{formData.workDescription || 'No especificada'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: colors.dark }}>
                    <ClipboardCheck size={24} />
                    Anexos y Verificaciones
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnnexes.length > 0 ? (
                      selectedAnnexes.map(id => {
                        const type = workTypes.find(t => t.id === id);
                        if (!type) return null;
                        return (
                          <span 
                            key={id} 
                            className="px-4 py-2 rounded-full font-semibold flex items-center gap-2"
                            style={{ backgroundColor: `${type.color}20`, color: type.color }}
                          >
                            {type?.icon} {type?.name}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500">No se seleccionaron anexos específicos</span>
                    )}
                  </div>
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

                <div className="rounded-xl p-6 bg-yellow-50 border-2 border-yellow-400">
                  <p className="text-sm flex items-start gap-3 text-yellow-800">
                    <AlertTriangle className="text-yellow-500" style={{minWidth: 20}} size={20} />
                    <span>
                      <strong>Importante:</strong> Una vez enviado, este permiso pasará a revisión. 
                      No podrá ser modificado hasta que el ciclo de aprobación se complete o sea rechazado.
                    </span>
                  </p>
                </div>
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
            
            {step < 7 ? (
              <Button
                onClick={() => {
                  if (canProceed()) {
                    setStep(step + 1);
                  } else {
                    toast({
                      variant: 'destructive',
                      title: 'Campos incompletos o críticos',
                      description: 'Por favor complete todos los campos obligatorios y corrija los campos críticos antes de continuar.'
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
    </div>
  );
}
