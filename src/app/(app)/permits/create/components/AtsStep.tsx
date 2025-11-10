
'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AnexoATS } from '@/types';

// Props del componente
interface AtsStepProps {
  anexoATS: AnexoATS;
  onUpdateATS: (updates: Partial<AnexoATS>) => void;
}

// Hook personalizado para debounce
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para input con estado local y debounce
function useLocalInput(initialValue: string, onUpdate: (value: string) => void, delay: number = 300) {
  const [localValue, setLocalValue] = React.useState(initialValue);
  const debouncedValue = useDebounce(localValue, delay);

  React.useEffect(() => {
    if (debouncedValue !== initialValue) {
      onUpdate(debouncedValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, onUpdate]);

  React.useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  return [localValue, setLocalValue] as const;
}

const hazardCategories = {
  LOCATIVOS: [
    { id: 'superficies_irregulares', label: 'Superficies irregulares', control: 'Uso de botas de seguridad con suela antideslizante. Controlar escapes, derrames o goteras sobre los sitios de desplazamiento. Limpiar de inmediato cualquier líquido que se derrame en el piso. Caminar con precaución. No cargar piezas o equipos que limiten la vista. Respetar la señalización. Transitar con precaución verificando rutas de tránsito; no pasar donde haya presencia de materiales u obstáculos; mantener el área ordenada.' },
    { id: 'superficies_deslizantes', label: 'Superficies deslizantes', control: 'Al subir o bajar escaleras utilizar todos los peldaños y sujetarse del pasamanos; mantener los tres puntos de apoyo; ascender y descender pausadamente.' },
    { id: 'diferencia_nivel', label: 'Superficies con diferencia de nivel', control: 'No caminar hacia atrás. No acercarse a los vacíos existentes cerca al área de trabajo. Informar cualquier condición de inseguridad que observe en las áreas de trabajo.' },
    { id: 'techos_mal_estado', label: 'Techos, muros, pisos o paredes en mas estado', control: 'Hacer uso de los elementos de prevención y protección contra caídas, diligenciar permiso de trabajo en alturas si se supera el 2,0 metros.' },
    { id: 'espacios_reducidos', label: 'Espacios reducidos de trabajo', control: 'Si esta catalogado como espacio confinado, aplica permiso de trabajo en espacio confinado, aplique las medidas de prevención y protección definidas por la empesa' },
  ],
  FÍSICOS: [
    { id: 'deficiencia_iluminacion', label: 'Deficiencia de iluminación', control: 'Uso de reflectores y/o lámparas en áreas con iluminación deficiente y en trabajo nocturno. Informar al dueño de área ausencia o daño de iluminación artificial. Usar gafas claras todo el tiempo en caso de luz deficiente. Permanecer únicamente en el sitio autorizado de trabajo.' },
    { id: 'exceso_iluminacion', label: 'Exceso de iluminación', control: 'En trabajos en el exterior, uso de gafas oscuras en caso de exceso de iluminación; evitar cambios bruscos de iluminación (deslumbramientos)' },
    { id: 'ruido_intermitente', label: 'Ruido (Intermitente/Continuo)', control: 'Usar de manera permanente protección auditiva tipo copa o de inserción y no retirarlo durante toda la tarea.' },
    { id: 'contacto_superficies_calientes', label: 'Contacto superficies calientes', control: 'Usar de manera permanente guantes de protección, uso de ropa manga larga, identificar con señalización o superficies calientes' },
    { id: 'exposicion_soldadura', label: 'Exposición a arco de soldadura', control: 'Utilizar yelmo de soldar o la pantalla de mano siempre que se suelde, no mira nunca directamente al arco voltaico, no pique el cordón de soldadura sin protección ocular' },
  ],
  QUÍMICOS: [
    { id: 'gases_humos_vapores', label: 'Gases, humos, vapores y neblinas', control: 'Uso permanente de protección respiratoria de acuerdo al tipo de exposición. En caso de uso de mascarilla con filtros, verificar que se usen los adecuados para el tipo de agente químico (gas, vapor, humo, material particulado, polvos, nieblas, rocíos, etc.)' },
    { id: 'material_particulado', label: 'Material particulado', control: 'Realizar mantenimiento periódico de la mascarilla y hacer el cambio cuando sea necesario. Asegurar el sello efectivo de la mascarilla media cara al contacto con la piel.' },
    { id: 'contacto_sustancias_peligrosas', label: 'Uso o contacto con materiales y sustancias peligrosas', control: 'Uso de elementos de protección personal de acuerdo a la FDS Ficha de Datos de Seguridad, disponer en sitio de las medidas de protección señaladas en la Ficha en caso de contacto accidental' },
    { id: 'derrame_productos_quimicos', label: 'Derrame o fugas de productos Químicos', control: 'Definir un plan de emergencia en caso de derrame o fuga de productos químicos, contar con kit antiderrames y elementos de protección personal aocrdes al producto químico que se este usando' },
  ],
  MECÁNICOS: [
    { id: 'proyeccion_particulas', label: 'Proyección de particulas y fracmentos', control: 'Uso obligatorio y permanente de elementos de protección individual, protección fácil y visual' },
    { id: 'mecanismo_movimiento', label: 'Mecanismo en movimiento', control: 'Mantener protecciones como guardas y dispositivos instalados en el equipo, no posicionar segmentos corporales en áreas de peligros, por ningún motivo violar una guarda de seguridad' },
    { id: 'manejo_herramientas', label: 'Manejo de herrramienta o equipos electricos', control: 'Uso de equipos y herramientas eléctricas en condiciones operativas que no exponen al trabajador a riesgos, realizar inspección preoperacional' },
    { id: 'movimiento_equipos_pesados', label: 'Movimiento de equipos de trabajo pesado en sitio', control: 'Señalización en sitio de trabajo, personal con paleta de pare y siga acompañando el desplazamiento por vías internas, manejo de trafico y control de senderos peatonas' },
    { id: 'exposicion_vibraciones', label: 'Exposición a vibraciones por equipos', control: 'Pausas activas durante la jornada laboral, rotación de personal para realizar la labor en jornada prolongadas donde se exponga a vibraciones' },
  ],
  BIOLÓGICOS: [
      { id: 'exposicion_vectores', label: 'Exposición a vectores transmisión de enfermedades', control: 'Orden y aseo en el lugar de trabajo, evitar la acumulación de agua que pueda ser foco de proliferación de vectores' },
      { id: 'contaminacion_biologica', label: 'Contaminación biológica', control: 'Prevenir y contener derrames de productos peligros, ubicación y disposición de kit de contención de derrames' },
  ],
  VIAL: [
      { id: 'accidente_incidente_vial', label: 'Accidente o incidente vial', control: 'Para el transito peatonal hacer uso de las vias definidas por la empresa para el desplazamiento seguro' },
      { id: 'atropellamiento_personas', label: 'Atropellamiento a personas', control: 'Respatar los limites de velocidad definidos por Italcol de 10 Km/h, no usar dispostivos de comunicación como telefono celular.' },
  ],
  BIOMECÁNICOS: [
      { id: 'carga_estatica', label: 'Carga Estática (Posturas inadecuadas, prolongadas, forzadas, antigravitación)', control: 'Realizar calentamiento previo al inicio de las actividades (ejercicios pre-laborales); Tomar pausas activas. Higiene postural. Realizar cambios periódicos de actividad dentro de la tarea a ejecutar.' },
      { id: 'carga_dinamica', label: 'Carga Dinámica (Esfuerzo, Movilización de cargas, Movimientos repetitivos / repetidos)', control: 'No levantar cargas superiores a 25 kg (hombres) / 12.5Kg (mujeres) de peso; levantar una carga a la vez, en piezas pesadas y/o voluminosas, hacer el movimiento entre 2 personas. Aplicar técnicas de levantamiento de cargas, manteniendo la espalda recta y flexionando las piernas, busque siempre primero ayudas mecánicas.' },
  ],
  AMBIENTALES: [
      { id: 'generacion_residuos', label: 'Generación de residuos escombros', control: 'ReaIizar la separación y disponer de acuerdo a la clasificación de colores definida por Italcol , disposición de residuos fuera de las instalaciones de acuerdo al marco normativo definido' },
      { id: 'consumo_agua', label: 'Consumo de agua en grandes cantidades', control: 'Uso eficiente de recursos, eliminación de fugas de agua, prevenir y contener derrames de productos peligrosos.' },
      { id: 'mezcla_concreto', label: 'Mezcla de concreto en suelo', control: 'Uso de mezcladora o recipiente para evitar la mezcla en piso, de no ser posible utilizar una barrera fisica que aisle los materiales de cosntroccuón de las superficies y sirvan como mecaniosmo de contención.' },
      { id: 'emisiones_material_particulado', label: 'Emisiones de material particulado', control: 'Cubrir materiales que puedan generar material particulado o barreras fisicas que mitiguen la generación al medio ambiente' },
  ],
};

export const eppOptions = {
    'Equipos Especiales': [
        { id: 'aire_respirable', label: 'Aire respirable (compresor o cilindro)', type: 'boolean' },
        { id: 'tapete_dielectrico', label: 'Tapete dieléctrico clase', type: 'text' },
    ],
    'Protección Corporal': [
        { id: 'traje_tyvek', label: 'Traje tyvek', type: 'boolean' },
        { id: 'chaleco_reflectivo', label:'Chaleco reflectivo', type: 'boolean' },
        { id: 'chaqueta_cuero_carnaza', label: 'Chaqueta de cuero o carnaza', type: 'boolean' },
        { id: 'delantal_cuero_carnaza', label: 'Delantal de cuero o carnaza', type: 'boolean' },
        { id: 'delantal_pvc', label: 'Delantal de PVC', type: 'boolean' },
        { id: 'overol_trabajo', label: 'Overol de trabajo', type: 'boolean' },
        { id: 'overol_ignifugo', label: 'Overol ignífugo clase', type: 'text' },
        { id: 'polainas', label: 'Polainas', type: 'boolean' },
    ],
    'Protección para Pies': [
        { id: 'botas_caucho_seguridad', label: 'Botas de caucho de seguridad', type: 'boolean' },
        { id: 'botas_dielectricas', label: 'Botas dieléctricas', type: 'boolean' },
        { id: 'botas_seguridad', label: 'Botas de seguridad', type: 'boolean' },
    ],
    'Protección Contra Caídas': [
        { id: 'eslinga', label: 'Eslinga tipo/absorbedor', type: 'text' },
        { id: 'linea_vida', label: 'Línea de vida', type: 'text' },
        { id: 'arnes', label: 'Arnés', type: 'boolean' },
        { id: 'adaptador_anclaje', label: 'Adaptador de anclaje', type: 'text' },
    ],
    'Protección para la Cabeza': [
        { id: 'casco_seguridad', label: 'Casco de seguridad Tipo/Clase/Barbuquejo', type: 'text' },
    ],
    'Protección para Manos': [
        { id: 'guante_dielectrico', label: 'Guante dieléctrico clase (guantín, guante dieléctrico, protección mecánica)', type: 'text' },
        { id: 'guante_caucho_nitrilo', label: 'Guante de caucho y/o nitrilo', type: 'boolean' },
        { id: 'guante_cuero_carnaza', label: 'Guante de cuero o carnaza', type: 'boolean' },
        { id: 'guante_vaqueta_anticorte', label: 'Guante de vaqueta o Anticorte', type: 'boolean' },
    ],
    'Protección Respiratoria': [
        { id: 'mascarilla_filtro', label: 'Mascarilla con filtro', type: 'text' },
        { id: 'mascarilla_material_particulado', label: 'Mascarilla material particulado', type: 'boolean' },
    ],
    'Protección Auditiva': [
        { id: 'protector_auditivo', label: 'Protector auditivo tipo', type: 'text' },
    ],
    'Protección Visual y Facial': [
        { id: 'gafas_antisalpicaduras', label: 'Gafas antisalpicaduras', type: 'boolean' },
        { id: 'gafas_seguridad', label: 'Gafas de seguridad', type: 'boolean' },
        { id: 'visor_careta', label: 'Visor / careta para', type: 'text' },
        { id: 'careta_arco_electrico', label: 'Careta arco eléctrico clase', type: 'text' },
    ],
    'Otro': [
        { id: 'otro_epp', label: 'Otro:', type: 'text' },
    ],
};

const justificacionOptions = [
    { id: 'rutinario_3_meses', label: 'TRABAJO RUTINARIO REALIZADO 1 VEZ CADA 3 MESES' },
    { id: 'no_rutinario_emergencia', label: 'TRABAJO NO RUTINARIO (EMERGENCIA)' },
    { id: 'rutinario_sin_procedimiento', label: 'TRABAJO RUTINARIO QUE NO POSEE UN PROCEDIMIENTO SEGURO DE TRABAJO O INDICACIÓN CORRECTA DE RIESGOS O MEDIDAS PREVENTIVAS' },
    { id: 'no_rutinario_planeado', label: 'TRABAJO NO RUTINARIO (PLANEADO)' },
    { id: 'rutinario_condicion_especifica', label: 'TRABAJO RUTINARIO QUE POR UNA CONDICIÓN ESPECÍFICA/TEMPORAL, NO ES POSIBLE APLICAR UN PROCEDIMIENTO DE FORMA INTEGRAL' },
];

// Componente para input de texto con estado local y debounce
const DebouncedTextInput = React.memo(({ 
  id, 
  value, 
  onChange, 
  placeholder,
  className = "h-8 text-xs ml-6"
}: { 
  id: string; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string;
  className?: string;
}) => {
  const updateValue = React.useCallback((newValue: string) => {
    onChange(newValue);
  }, [onChange]);

  const [localValue, setLocalValue] = useLocalInput(value || '', updateValue, 500);

  return (
    <Input 
      id={id}
      className={className}
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      autoComplete="off"
      type="text"
    />
  );
});

DebouncedTextInput.displayName = 'DebouncedTextInput';

// Componente optimizado para items de EPP con debounce
const EppItem = React.memo(({ 
  item, 
  checked, 
  textValue, 
  onCheckedChange, 
  onTextChange 
}: { 
  item: { id: string; label: string; type: string };
  checked: boolean;
  textValue: string;
  onCheckedChange: (checked: boolean) => void;
  onTextChange: (value: string) => void;
}) => {
  const handleCheckedChange = React.useCallback((checkedValue: boolean) => {
    onCheckedChange(checkedValue);
  }, [onCheckedChange]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={item.id} 
          checked={checked} 
          onCheckedChange={handleCheckedChange}
        />
        <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
      </div>
      {item.type === 'text' && checked && (
        <DebouncedTextInput
          id={`${item.id}_spec`}
          value={textValue}
          onChange={onTextChange}
          placeholder="Especificar..."
        />
      )}
    </div>
  );
});

EppItem.displayName = 'EppItem';

// Componente optimizado para categorías de EPP
const EppCategory = React.memo(({ 
  category, 
  items, 
  eppData, 
  onEppChange 
}: { 
  category: string;
  items: Array<{ id: string; label: string; type: string }>;
  eppData: any;
  onEppChange: (id: string, value: boolean | string) => void;
}) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-md text-gray-700">{category}</h4>
      <div className="space-y-2 p-3 border rounded-md">
        {items.map(item => (
          <EppItem
            key={item.id}
            item={item}
            checked={!!eppData?.[item.id]}
            textValue={typeof eppData?.[`${item.id}_spec`] === 'string' ? (eppData[`${item.id}_spec`] as string) : ''}
            onCheckedChange={(checked) => {
              if (item.type === 'boolean') {
                onEppChange(item.id, checked);
              } else if (item.type === 'text') {
                if (checked) {
                  onEppChange(item.id, true);
                } else {
                  onEppChange(item.id, false);
                  onEppChange(`${item.id}_spec`, '');
                }
              }
            }}
            onTextChange={(value) => onEppChange(`${item.id}_spec`, value)}
          />
        ))}
      </div>
    </div>
  );
});

EppCategory.displayName = 'EppCategory';

// Componente optimizado para "Otros Peligros"
const OtrosPeligrosSection = React.memo(({ 
  peligrosAdicionales, 
  onUpdatePeligros 
}: { 
  peligrosAdicionales: Array<{peligro: string, descripcion: string}> | undefined,
  onUpdatePeligros: (peligros: Array<{peligro: string, descripcion: string}>) => void 
}) => {
  const [newPeligro, setNewPeligro] = React.useState('');
  const [newPeligroDesc, setNewPeligroDesc] = React.useState('');

  const handleAddPeligro = React.useCallback(() => {
    if (newPeligro.trim() && newPeligroDesc.trim()) {
      const newPeligros = [...(peligrosAdicionales || []), { 
        peligro: newPeligro.trim(), 
        descripcion: newPeligroDesc.trim() 
      }];
      onUpdatePeligros(newPeligros);
      setNewPeligro('');
      setNewPeligroDesc('');
    }
  }, [newPeligro, newPeligroDesc, peligrosAdicionales, onUpdatePeligros]);

  const handleRemovePeligro = React.useCallback((index: number) => {
    const newPeligros = (peligrosAdicionales || []).filter((_, i) => i !== index);
    onUpdatePeligros(newPeligros);
  }, [peligrosAdicionales, onUpdatePeligros]);

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-lg text-gray-700 mb-2">Otros Peligros</h4>
      <div className="p-4 border rounded-lg space-y-4">
        {/* Lista de peligros existentes */}
        {peligrosAdicionales?.map((item, index) => (
          <div key={`peligro-${index}`} className="flex items-start gap-2 p-3 bg-gray-50 rounded-md">
            <div className="flex-1">
              <p className="font-bold">{item.peligro}</p>
              <p className="text-sm text-muted-foreground">{item.descripcion}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleRemovePeligro(index)}
              type="button"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
        
        {/* Formulario para nuevo peligro */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="nuevo-peligro-nombre">Nombre del nuevo peligro</Label>
            <Input 
              id="nuevo-peligro-nombre"
              value={newPeligro} 
              onChange={(e) => setNewPeligro(e.target.value)} 
              placeholder="Escriba el nombre del peligro..."
              autoComplete="off"
              type="text"
            />
          </div>
          <div>
            <Label htmlFor="nuevo-peligro-desc">Descripción y control del peligro</Label>
            <Textarea 
              id="nuevo-peligro-desc"
              value={newPeligroDesc} 
              onChange={(e) => setNewPeligroDesc(e.target.value)} 
              placeholder="Escriba la descripción y medidas de control..."
              autoComplete="off"
              rows={3}
            />
          </div>
          <Button 
            onClick={handleAddPeligro} 
            size="sm" 
            type="button"
            disabled={!newPeligro.trim() || !newPeligroDesc.trim()}
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Peligro
          </Button>
        </div>
      </div>
    </div>
  );
});

OtrosPeligrosSection.displayName = 'OtrosPeligrosSection';

export function AtsStep({ anexoATS, onUpdateATS }: AtsStepProps) {
  
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePeligroChange = React.useCallback((id: string, value: 'si' | 'no') => {
    onUpdateATS({ 
      peligros: { ...anexoATS.peligros, [id]: value } 
    });
  }, [anexoATS.peligros, onUpdateATS]);
  
  const handleEppChange = React.useCallback((id: string, value: boolean | string) => {
    onUpdateATS({ 
      epp: { ...anexoATS.epp, [id]: value } 
    });
  }, [anexoATS.epp, onUpdateATS]);

  const handleJustificacionChange = React.useCallback((id: string, value: boolean) => {
    onUpdateATS({ 
      justificacion: { ...anexoATS.justificacion, [id]: value } 
    });
  }, [anexoATS.justificacion, onUpdateATS]);

  // Handler optimizado para peligros adicionales
  const handleUpdatePeligrosAdicionales = React.useCallback((peligros: Array<{peligro: string, descripcion: string}>) => {
    onUpdateATS({ peligrosAdicionales: peligros });
  }, [onUpdateATS]);

  const SectionWrapper: React.FC<{ title: string; children: React.ReactNode; sectionId: string; }> = React.memo(({ title, children, sectionId }) => (
    <Collapsible open={openSections[sectionId]} onOpenChange={() => toggleSection(sectionId)}>
        <CollapsibleTrigger asChild>
            <Button 
                variant="ghost" 
                className="w-full justify-between p-3 bg-gray-100 rounded-lg cursor-pointer border"
            >
                <h3 className="text-lg font-bold text-gray-700">{title}</h3>
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg">
            {children}
        </CollapsibleContent>
    </Collapsible>
  ));
  SectionWrapper.displayName = "SectionWrapper";


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Análisis de Peligros y ATS
        </h2>
        <p className="text-muted-foreground text-sm">
          Identifique los peligros, controles y EPP necesarios para la tarea.
        </p>
      </div>

      <SectionWrapper title="1. Identificación de Peligros, Riesgos y Controles" sectionId="peligros">
        <p className="text-xs text-muted-foreground mb-4">
          Coloque "SI" o "NO" para los peligros envueltos en el trabajo. Cuando asigne un "SI", se desplegarán los controles recomendados.
        </p>
        <div className="space-y-2">
          {Object.entries(hazardCategories).map(([category, hazards]) => (
            <Collapsible key={category} open={openSections[category]} onOpenChange={() => toggleSection(category)}>
              <CollapsibleTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 border rounded-lg"
                >
                  <span className="font-semibold">{category}</span>
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg space-y-4">
                {hazards.map((hazard) => (
                  <div key={hazard.id} className="space-y-3 p-3 bg-gray-50/50 rounded-md">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={hazard.id} className="font-medium flex-1">
                        {hazard.label}
                      </Label>
                      <RadioGroup
                        value={anexoATS.peligros?.[hazard.id]}
                        onValueChange={(value: 'si' | 'no') => handlePeligroChange(hazard.id, value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id={`${hazard.id}-si`} />
                          <Label htmlFor={`${hazard.id}-si`}>SI</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id={`${hazard.id}-no`} />
                          <Label htmlFor={`${hazard.id}-no`}>NO</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {anexoATS.peligros?.[hazard.id] === 'si' && (
                      <div className="pl-4 border-l-4 border-primary/50 ml-2">
                        <p className="text-xs font-semibold text-primary mb-1">CONTROL RECOMENDADO:</p>
                        <p className="text-xs text-muted-foreground">{hazard.control}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        {/* Sección de Otros Peligros optimizada */}
        <OtrosPeligrosSection 
          peligrosAdicionales={anexoATS.peligrosAdicionales}
          onUpdatePeligros={handleUpdatePeligrosAdicionales}
        />
      </SectionWrapper>

      <SectionWrapper title="2. EPP Requeridos" sectionId="epp">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {Object.entries(eppOptions).map(([category, items]) => (
              <EppCategory
                key={category}
                category={category}
                items={items}
                eppData={anexoATS.epp}
                onEppChange={handleEppChange}
              />
            ))}
         </div>
      </SectionWrapper>
      
      <SectionWrapper title="3. Justificación para el uso del ATS" sectionId="justificacion">
        <div className="space-y-3 p-4 border rounded-lg">
            {justificacionOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                        id={option.id}
                        checked={!!anexoATS.justificacion?.[option.id]}
                        onCheckedChange={(checked) => handleJustificacionChange(option.id, !!checked)}
                    />
                    <Label htmlFor={option.id} className="text-sm font-normal">{option.label}</Label>
                </div>
            ))}
        </div>
      </SectionWrapper>

    </div>
  );
}

// Exportar con React.memo para optimización
export default React.memo(AtsStep);
