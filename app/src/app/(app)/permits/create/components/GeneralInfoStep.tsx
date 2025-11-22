
'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { addDays, format } from 'date-fns';

const workTypes: { key: keyof ReturnType<typeof usePermitForm>['state']['selectedWorkTypes'], name: string }[] = [
  { key: 'general', name: 'Trabajo General' },
  { key: 'alturas', name: 'Trabajo en Alturas' },
  { key: 'confinado', name: 'Espacios Confinados' },
  { key: 'energia', name: 'Control de Energías' },
  { key: 'izaje', name: 'Izaje de Cargas' },
  { key: 'excavacion', name: 'Excavaciones' },
];

const taskOptions = [
    { value: 'mantenimiento_aires', label: 'Mantenimiento de aires', description: 'Realización de mantenimiento, reparación y limpieza de aires acondicionados' },
    { value: 'cambio_estanterias', label: 'Cambio y reparación de estanterías', description: 'Reparación, inspección y cambio de elementos de la estantería' },
    { value: 'instalacion_luminarias', label: 'Instalación y cambio de luminarias', description: 'Reparación y cambio de luminaria' },
    { value: 'desnidacion_palomas', label: 'Desnidación de palomas', description: 'Retiro de nidos generados con palomas' },
    { value: 'instalacion_carpas', label: 'Instalación de carpas', description: 'Instalar carpas (lona) de carpas móviles' },
    { value: 'modificacion_equipos_oficina', label: 'Modificación y adecuación de equipos de oficina', description: 'Cambio de módulos, divisiones de oficina' },
    { value: 'instalacion_avisos', label: 'Instalación de avisos', description: 'Instalar vallas, pendones, avisos' },
    { value: 'estudios_isocineticos', label: 'Estudios isocinéticos', description: 'Instalación y desmonte equipo, en chimenea de caldera' },
    { value: 'cargue_graneleros', label: 'Cargue de graneleros', description: 'Abrir compuertas superiores de graneleros y realizar cargue' },
    { value: 'instalacion_antenas', label: 'Instalación y mantenimiento de antena de telefonía', description: 'Revisión de antena de telecomunicaciones' },
    { value: 'impermeabilizacion_cubierta', label: 'Impermeabilización de cubierta y limpieza (sobre losa)', description: 'Aplicar impermeabilizante a cubierta' },
    { id: 'poda_arboles', label: 'Poda de árboles (si se encuentra retirado de líneas con tensión)', description: 'Realización de poda de árboles' },
    { id: 'instalacion_malla_sombra', label: 'Instalación de malla y/o poli sombra', description: 'Instalación y desmonte de mallas y poli sombra' },
    { id: 'polarizacion_ventanas', label: 'Polarización de ventanas, instalación de cortinas', description: 'Colocar papel polarizado en ventanas e instalación de cortinas' },
    { id: 'mantenimiento_montacargas', label: 'Cambio de piezas y mantenimiento en mástil de montacargas, retroexcavadora, etc.', description: 'Instalación de sensores, luces, cámaras, etc., en los equipos' },
    { id: 'instalacion_camaras', label: 'Mantenimiento e instalación de cámaras', description: 'Instalar cámaras de seguridad en puntos de la planta' },
    { id: 'instalacion_tuberia', label: 'Instalación de tubería eléctrica', description: 'Instalar tubería y sondear cableado, instalar soportes de tubería' },
    { value: 'otro', label: 'Otro', description: 'Por favor, especifique la tarea en el campo de texto.' }
  ];

export function GeneralInfoStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, selectedWorkTypes } = state;
  const { toast } = useToast();

  const [newToolName, setNewToolName] = React.useState('');
  const [selectedTaskDescription, setSelectedTaskDescription] = React.useState('');

  const [dynamicLists, setDynamicLists] = React.useState({
    areas: [] as string[],
    plantas: [] as string[],
    procesos: [] as string[],
    contratos: [] as string[],
    empresas: [] as string[],
  });
  const [loadingLists, setLoadingLists] = React.useState(true);

  React.useEffect(() => {
    setLoadingLists(true);
    const listNames = ['areas', 'plantas', 'procesos', 'contratos', 'empresas'];
    const unsubscribers = listNames.map(listName => {
      const docRef = doc(db, 'dynamic_lists', listName);
      return onSnapshot(docRef, (docSnap) => {
        setDynamicLists(prev => ({
          ...prev,
          [listName]: docSnap.exists() ? docSnap.data().items?.sort() || [] : []
        }));
      }, (error) => {
        console.error(`Error fetching ${listName}:`, error);
        toast({
          variant: "destructive",
          title: "Error de Carga",
          description: `No se pudo cargar la lista para ${listName}.`,
        });
      });
    });

    // This is a bit of a hack to know when all listeners have fired at least once
    Promise.all(listNames.map(listName => new Promise(resolve => {
      const docRef = doc(db, 'dynamic_lists', listName);
      onSnapshot(docRef, () => resolve(true), () => resolve(true)); // Resolve even on error
    }))).then(() => setLoadingLists(false));

    return () => unsubscribers.forEach(unsub => unsub());
  }, [toast]);


  const handleInputChange = (field: keyof typeof generalInfo, value: any) => {
    dispatch({ type: 'UPDATE_GENERAL_INFO', payload: { [field]: value } });
  };
  
  const handleTaskChange = (value: string) => {
    const selectedTask = taskOptions.find(task => task.value === value);
    if (selectedTask) {
        dispatch({ type: 'UPDATE_GENERAL_INFO', payload: { task: value } });
        setSelectedTaskDescription(selectedTask.description);
    }
  };
  

  const handleWorkTypeChange = (type: keyof typeof selectedWorkTypes, value: boolean) => {
    dispatch({ type: 'UPDATE_WORK_TYPES', payload: { type, value } });
  };
  
  const handleResponsableChange = (field: keyof typeof generalInfo.responsable, value: string) => {
    const newResponsable = { ...generalInfo.responsable, [field]: value };
    handleInputChange('responsable', newResponsable);
  };

  const addTool = () => {
    if (newToolName.trim()) {
      const newTools = [...(generalInfo.tools || []), { name: newToolName.trim(), status: 'B' }];
      handleInputChange('tools', newTools);
      setNewToolName('');
    }
  };

  const removeTool = (index: number) => {
    const newTools = (generalInfo.tools || []).filter((_, i) => i !== index);
    handleInputChange('tools', newTools);
  };
  
  const maxDate = React.useMemo(() => {
    if (!generalInfo.validFrom) return '';
    const startDate = new Date(generalInfo.validFrom);
    const maxDate = addDays(startDate, 7);
    // Format for datetime-local which is 'yyyy-MM-ddThh:mm'
    return format(maxDate, "yyyy-MM-dd'T'HH:mm");
  }, [generalInfo.validFrom]);

  const handleUntilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUntilDate = e.target.value;
    if (maxDate && newUntilDate > maxDate) {
        toast({
            variant: "destructive",
            title: "Fecha Inválida",
            description: "La duración del permiso no puede exceder los 7 días.",
        });
        handleInputChange('validUntil', maxDate);
    } else {
        handleInputChange('validUntil', newUntilDate);
    }
  };

  const renderDynamicSelect = React.useCallback((listKey: keyof typeof dynamicLists, fieldKey: keyof typeof generalInfo, label: string, required: boolean) => (
    <div>
      <Label className={`font-bold text-gray-700 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}>{label}</Label>
      <Select
        value={(generalInfo as any)[fieldKey] || ''}
        onValueChange={(value) => handleInputChange(fieldKey, value)}
        disabled={loadingLists}
      >
        <SelectTrigger>
          <SelectValue placeholder={loadingLists ? "Cargando..." : `Seleccione una opción...`} />
        </SelectTrigger>
        <SelectContent>
          {dynamicLists[listKey].map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ), [generalInfo, dynamicLists, loadingLists, handleInputChange]);


  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Información General del Permiso
        </h2>
        <p className="text-muted-foreground text-sm">Complete todos los campos obligatorios (*)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderDynamicSelect('areas', 'areaEspecifica', 'Área o equipo específico', true)}
        {renderDynamicSelect('plantas', 'planta', 'Planta', true)}
        {renderDynamicSelect('procesos', 'proceso', 'Proceso', false)}
        {renderDynamicSelect('contratos', 'contrato', 'Contrato', false)}
        {renderDynamicSelect('empresas', 'empresa', 'Empresa', false)}
        <div>
          <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Nombre del solicitante</Label>
          <Input value={generalInfo.nombreSolicitante || ''} readOnly disabled />
        </div>
      </div>

      <div>
        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Listas de Verificación Complementarias</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 p-4 border rounded-lg mt-2">
          {workTypes.map(({ key, name }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={selectedWorkTypes[key]}
                onCheckedChange={(checked) => handleWorkTypeChange(key, !!checked)}
              />
              <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Duración del Permiso</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
          <div>
            <label className="text-sm font-medium">Desde</label>
            <Input
              type="datetime-local"
              value={generalInfo.validFrom}
              onChange={(e) => handleInputChange('validFrom', e.target.value)}
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Hasta</label>
            <Input
              type="datetime-local"
              value={generalInfo.validUntil}
              onChange={handleUntilChange}
              disabled={!generalInfo.validFrom}
              min={generalInfo.validFrom}
              max={maxDate}
            />
          </div>
        </div>
      </div>

      <div>
                <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Tarea a Realizar</Label>
                <Select onValueChange={handleTaskChange} value={generalInfo.task || ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una tarea" />
                    </SelectTrigger>
                    <SelectContent>
                        {taskOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {selectedTaskDescription && (
                    <p className="text-sm text-muted-foreground mt-2">{selectedTaskDescription}</p>
                )}
            </div>

            {generalInfo.task === 'otro' && (
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Nombre de la Actividad</Label>
                        <Input
                            value={generalInfo.otherTaskName || ''}
                            onChange={(e) => handleInputChange('otherTaskName', e.target.value)}
                            placeholder="Especifique el nombre de la actividad"
                        />
                    </div>
                    <div>
                        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Descripción de la Actividad</Label>
                        <Textarea
                            value={generalInfo.otherTaskDescription || ''}
                            onChange={(e) => handleInputChange('otherTaskDescription', e.target.value)}
                            placeholder="Describa la actividad a realizar"
                        />
                    </div>
                </div>
            )}

      <div>
        <Label className="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Descripción de la Tarea - ALCANCE</Label>
        <Textarea
          value={generalInfo.workDescription}
          onChange={(e) => handleInputChange('workDescription', e.target.value)}
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
        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">No. Trabajadores</Label>
        <Input type="number" value={generalInfo.numTrabajadores} onChange={e => handleInputChange('numTrabajadores', e.target.value)} placeholder="Cantidad de trabajadores" />
        <p className="text-xs text-muted-foreground mt-1">
            Tener presente que el número de trabajadores aquí relacionados debe ser el mismo número de trabajadores firmantes, si la cantidad de firmantes no es igual el sistema no le permitirá generar el permiso.
        </p>
      </div>

      <div>
        <Label className="font-bold text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500">Responsable del Trabajo / Ejecutor</Label>
        <div className="p-4 border rounded-lg mt-2 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground after:content-['*'] after:ml-0.5 after:text-red-500">Nombre completo</Label>
            <Input placeholder="Nombre completo" value={generalInfo.responsable?.nombre} readOnly disabled />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground after:content-['*'] after:ml-0.5 after:text-red-500">Cargo</Label>
            <Input placeholder="Cargo" value={generalInfo.responsable?.cargo} onChange={e => handleResponsableChange('cargo', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground after:content-['*'] after:ml-0.5 after:text-red-500">Compañía</Label>
            <Input placeholder="Compañía" value={generalInfo.responsable?.compania} onChange={e => handleResponsableChange('compania', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to update the form state
function updateFormState(state: any, action: any) {
  switch (action.type) {
    case 'UPDATE_GENERAL_INFO':
      // Si la tarea seleccionada es 'otro', no sobrescribir la descripción.
      if (action.payload.task === 'otro') {
        return {
          ...state,
          generalInfo: {
            ...state.generalInfo,
            ...action.payload,
          },
        };
      }
      
      const selectedTask = taskOptions.find(t => t.value === action.payload.task);
      return {
        ...state,
        generalInfo: {
          ...state.generalInfo,
          ...action.payload,
          workDescription: selectedTask ? selectedTask.description : state.generalInfo.workDescription,
        },
      };
    // ... otros casos del reducer
    default:
      return state;
  }
}
