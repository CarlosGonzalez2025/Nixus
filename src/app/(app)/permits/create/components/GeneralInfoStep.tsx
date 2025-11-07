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
  { key: 'alturas', name: 'Trabajo en Alturas' },
  { key: 'confinado', name: 'Espacios Confinados' },
  { key: 'energia', name: 'Control de Energías' },
  { key: 'izaje', name: 'Izaje de Cargas' },
  { key: 'caliente', name: 'Trabajo en Caliente' },
  { key: 'excavacion', name: 'Excavaciones' },
  { key: 'general', name: 'Trabajo General' },
];

export function GeneralInfoStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, selectedWorkTypes } = state;
  const { toast } = useToast();

  const [newToolName, setNewToolName] = React.useState('');

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
        <Label className="font-bold text-gray-700">Listas de Verificación Complementarias *</Label>
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
        <Label className="font-bold text-gray-700">Duración del Permiso *</Label>
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
        <Label className="font-bold">Descripción de la Tarea - ALCANCE *</Label>
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
        <Label className="font-bold text-gray-700">No. Trabajadores *</Label>
        <Input type="number" value={generalInfo.numTrabajadores} onChange={e => handleInputChange('numTrabajadores', e.target.value)} placeholder="Cantidad de trabajadores" />
      </div>

      {/* Boolean Radios would go here */}

      <div>
        <Label className="font-bold text-gray-700">Responsable del Trabajo / Ejecutor</Label>
        <div className="p-4 border rounded-lg mt-2 space-y-4">
          <Input placeholder="Nombre completo" value={generalInfo.responsable?.nombre} onChange={e => handleResponsableChange('nombre', e.target.value)} />
          <Input placeholder="Cargo" value={generalInfo.responsable?.cargo} onChange={e => handleResponsableChange('cargo', e.target.value)} />
          <Input placeholder="Compañía" value={generalInfo.responsable?.compania} onChange={e => handleResponsableChange('compania', e.target.value)} />
          <Textarea placeholder="Alcance" value={generalInfo.responsable?.alcance} onChange={e => handleResponsableChange('alcance', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
