'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Trash2, 
  Check, 
  Search, 
  X, 
  Loader2,
  Building2,
  MapPin,
  FileText,
  Users,
  Wrench,
  Calendar,
  ClipboardList,
  User,
  Briefcase,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { addDays, format } from 'date-fns';
import { addUserDefinedTool } from '../actions';
import { addListItem } from '../../../admin/lists/actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const workTypes: { key: keyof ReturnType<typeof usePermitForm>['state']['selectedWorkTypes'], name: string, icon: React.ReactNode }[] = [
  { key: 'general', name: 'Trabajo General', icon: <Wrench className="h-4 w-4" /> },
  { key: 'alturas', name: 'Trabajo en Alturas', icon: <AlertCircle className="h-4 w-4" /> },
  { key: 'confinado', name: 'Espacios Confinados', icon: <AlertCircle className="h-4 w-4" /> },
  { key: 'energia', name: 'Control de Energías', icon: <AlertCircle className="h-4 w-4" /> },
  { key: 'izaje', name: 'Izaje de Cargas', icon: <AlertCircle className="h-4 w-4" /> },
  { key: 'excavacion', name: 'Excavaciones', icon: <AlertCircle className="h-4 w-4" /> },
];

const herramientasIniciales = [
  'Taladro',
  'Martillo',
  'Destornillador',
  'Llave inglesa',
  'Alicate',
  'Sierra',
  'Nivel',
  'Flexómetro',
  'Escalera',
  'Andamio',
  'Esmeril',
  'Soldadora',
  'Pulidora',
  'Compresor',
  'Pistola de impacto',
];

const ITEMS_PER_PAGE = 20;
const QUICK_SELECT_COUNT = 6;

const SectionTitle = ({ 
  icon, 
  title, 
  subtitle,
  required = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle?: string;
  required?: boolean;
}) => (
  <div className="flex items-start gap-3 mb-4">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={cn(
        "font-semibold text-gray-800",
        required && "after:content-['*'] after:ml-1 after:text-red-500"
      )}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  </div>
);

const FormSection = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={cn(
    "p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200",
    className
  )}>
    {children}
  </div>
);

const RequiredLabel = ({ 
  children, 
  required = true,
  className 
}: { 
  children: React.ReactNode; 
  required?: boolean;
  className?: string;
}) => (
  <Label className={cn(
    "font-semibold text-gray-700 text-sm",
    required && "after:content-['*'] after:ml-0.5 after:text-red-500",
    className
  )}>
    {children}
  </Label>
);

interface DynamicSelectProps {
  listKey: 'areas' | 'plantas' | 'procesos' | 'contratos' | 'empresas';
  label: string;
  required: boolean;
  creatable?: boolean;
  value: string;
  options: string[];
  isLoading: boolean;
  onValueChange: (value: string) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  listKey,
  label,
  required,
  creatable = false,
  value,
  options,
  isLoading,
  onValueChange,
}) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast({ variant: 'destructive', title: 'El nombre no puede estar vacío.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await addListItem(listKey, newItem);
      if (result.success) {
        toast({ title: 'Elemento agregado', description: `"${newItem}" se agregó a la lista de ${label}.` });
        onValueChange(newItem);
        setNewItem('');
        setIsAdding(false);
      } else {
        throw new Error(result.error || `No se pudo agregar el/la ${label.toLowerCase()}.`);
      }
    } catch (error: any) {
       toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <RequiredLabel required={required}>{label}</RequiredLabel>
      <div className="flex gap-2 items-center">
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className={cn(
            "flex-1 h-11 transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "hover:border-gray-400"
          )}>
            <SelectValue placeholder={isLoading ? "Cargando..." : `Seleccione ${label.toLowerCase()}...`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item} value={item} className="cursor-pointer">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {creatable && (
          <Button 
            variant={isAdding ? "secondary" : "outline"} 
            size="icon" 
            onClick={() => setIsAdding(prev => !prev)} 
            type="button"
            className={cn(
              "h-11 w-11 transition-all duration-200",
              isAdding && "bg-primary/10 border-primary/30"
            )}
          >
            <Plus className={cn("h-4 w-4 transition-transform", isAdding && "rotate-45")} />
          </Button>
        )}
      </div>
      
      {creatable && isAdding && (
        <div className="flex gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 animate-in slide-in-from-top-2 duration-200">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Nuevo/a ${label.toLowerCase()}...`}
            className="flex-1 h-10 focus:ring-2 focus:ring-primary/20"
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem();
                }
                if(e.key === 'Escape') {
                    setIsAdding(false);
                    setNewItem('');
                }
            }}
            autoFocus
          />
          <Button 
            onClick={handleAddItem} 
            disabled={isSubmitting || !newItem.trim()} 
            size="sm" 
            type="button"
            className="h-10 px-4"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Check className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { setIsAdding(false); setNewItem(''); }} 
            type="button"
            className="h-10 px-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4"/>
          </Button>
        </div>
      )}
    </div>
  );
};

interface ConditionalFieldProps {
  label: string;
  radioValue: 'si' | 'no' | undefined;
  onRadioChange: (value: 'si' | 'no') => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const ConditionalField: React.FC<ConditionalFieldProps> = ({
  label,
  radioValue,
  onRadioChange,
  children,
  icon
}) => (
  <div className={cn(
    "space-y-3 p-4 rounded-xl border-2 transition-all duration-200",
    radioValue === 'si' 
      ? "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent" 
      : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
  )}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <Label className="font-semibold text-gray-700 text-sm">¿Se requiere {label}?</Label>
      </div>
      <RadioGroup 
        value={radioValue || 'no'} 
        onValueChange={(value) => onRadioChange(value as 'si' | 'no')} 
        className="flex gap-3"
      >
        <div className="flex items-center space-x-1.5">
          <RadioGroupItem value="si" id={`${label}-si`} className="border-2" />
          <Label htmlFor={`${label}-si`} className="text-sm font-medium cursor-pointer">Sí</Label>
        </div>
        <div className="flex items-center space-x-1.5">
          <RadioGroupItem value="no" id={`${label}-no`} className="border-2" />
          <Label htmlFor={`${label}-no`} className="text-sm font-medium cursor-pointer">No</Label>
        </div>
      </RadioGroup>
    </div>
    
    {radioValue === 'si' && (
      <div className="pt-2 animate-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);

export function GeneralInfoStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, selectedWorkTypes } = state;
  const { toast } = useToast();

  const [herramientasDisponibles, setHerramientasDisponibles] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddingNew, setIsAddingNew] = React.useState(false);
  const [newToolName, setNewToolName] = React.useState('');
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(ITEMS_PER_PAGE);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const resultsContainerRef = React.useRef<HTMLDivElement>(null);

  const [dynamicLists, setDynamicLists] = React.useState({
    areas: [] as string[],
    plantas: [] as string[],
    procesos: [] as string[],
    contratos: [] as string[],
    empresas: [] as string[],
  });
  const [loadingLists, setLoadingLists] = React.useState(true);

  React.useEffect(() => {
    const herramientasRef = doc(db, 'dynamic_lists', 'herramientas');
    
    const unsubscribe = onSnapshot(herramientasRef, (docSnap) => {
      if (docSnap.exists()) {
        const items = docSnap.data().items || [];
        setHerramientasDisponibles(items.sort());
      } else {
        setHerramientasDisponibles(herramientasIniciales.sort());
      }
    }, (error) => {
      console.error('Error fetching herramientas:', error);
      setHerramientasDisponibles(herramientasIniciales.sort());
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    setLoadingLists(true);
    const listNames: (keyof typeof dynamicLists)[] = ['areas', 'plantas', 'procesos', 'contratos', 'empresas'];
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

    setLoadingLists(false);

    return () => unsubscribers.forEach(unsub => unsub());
  }, [toast]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = useCallback((field: keyof typeof generalInfo, value: any) => {
    dispatch({ type: 'UPDATE_GENERAL_INFO', payload: { [field]: value } });
  }, [dispatch]);

  const handleWorkTypeChange = useCallback((type: keyof typeof selectedWorkTypes, value: boolean) => {
    dispatch({ type: 'UPDATE_WORK_TYPES', payload: { type, value } });
  }, [dispatch]);
  
  const handleResponsableChange = useCallback((field: keyof typeof generalInfo.responsable, value: string) => {
    const newResponsable = { ...generalInfo.responsable, [field]: value };
    handleInputChange('responsable', newResponsable);
  }, [generalInfo.responsable, handleInputChange]);

  const addToolFromList = useCallback((toolName: string) => {
    if (!toolName) return;
    
    const alreadyAdded = generalInfo.tools?.some(t => t.name === toolName);
    if (alreadyAdded) {
      toast({
        variant: "destructive",
        title: "Ya agregada",
        description: "Esta herramienta ya está en la lista.",
      });
      return;
    }

    const newTools = [...(generalInfo.tools || []), { name: toolName, status: 'B' }];
    handleInputChange('tools', newTools);
    
    setSearchTerm('');
    setShowSearchResults(false);
    setDisplayCount(ITEMS_PER_PAGE);
    
    toast({
      title: "✓ Agregada",
      description: `${toolName}`,
      duration: 1500,
    });
  }, [generalInfo.tools, handleInputChange, toast]);

  const handleAddNewTool = useCallback(async () => {
    const trimmedName = newToolName.trim();
    if (!trimmedName) return;
  
    try {
      const result = await addUserDefinedTool(trimmedName);
  
      if (result.success) {
        addToolFromList(trimmedName);
        toast({
          title: "✓ Herramienta creada",
          description: `"${trimmedName}" se agregó al catálogo.`,
        });
        setNewToolName('');
        setIsAddingNew(false);
      } else {
        throw new Error(result.error || "No se pudo agregar la herramienta.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear",
        description: error.message,
      });
    }
  }, [newToolName, addToolFromList, toast]);

  const removeTool = useCallback((index: number) => {
    const newTools = (generalInfo.tools || []).filter((_, i) => i !== index);
    handleInputChange('tools', newTools);
  }, [generalInfo.tools, handleInputChange]);
  
  const maxDate = useMemo(() => {
    if (!generalInfo.validFrom) return '';
    const startDate = new Date(generalInfo.validFrom);
    const maxDate = addDays(startDate, 7);
    return format(maxDate, "yyyy-MM-dd'T'HH:mm");
  }, [generalInfo.validFrom]);

  const handleUntilChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [handleInputChange, maxDate, toast]);

  const filteredHerramientas = useMemo(() => {
    if (!searchTerm) return herramientasDisponibles;
    const searchLower = searchTerm.toLowerCase();
    return herramientasDisponibles.filter(h => 
      h.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, herramientasDisponibles]);

  const displayedHerramientas = useMemo(() => {
    return filteredHerramientas.slice(0, displayCount);
  }, [filteredHerramientas, displayCount]);

  const quickSelectTools = useMemo(() => {
    return herramientasDisponibles
      .slice(0, QUICK_SELECT_COUNT)
      .filter(h => !generalInfo.tools?.some(t => t.name === h));
  }, [herramientasDisponibles, generalInfo.tools]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    
    if (bottom && displayCount < filteredHerramientas.length) {
      setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredHerramientas.length));
    }
  }, [displayCount, filteredHerramientas.length]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSearchResults(true);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const selectedWorkTypesCount = Object.values(selectedWorkTypes).filter(Boolean).length;

  return (
    <div className="space-y-8 pb-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/10">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Información General del Permiso
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Complete todos los campos obligatorios marcados con <span className="text-red-500 font-bold">*</span>
          </p>
        </div>
      </div>

      <FormSection>
        <SectionTitle 
          icon={<MapPin className="h-5 w-5" />} 
          title="Ubicación y Contexto"
          subtitle="Defina dónde se realizará el trabajo"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConditionalField
            label="Área o equipo específico"
            icon={<MapPin className="h-4 w-4" />}
            radioValue={generalInfo.requiereArea}
            onRadioChange={(value) => { 
              handleInputChange('requiereArea', value); 
              if (value === 'no') handleInputChange('areaEspecifica', ''); 
            }}
          >
            <DynamicSelect
              listKey="areas"
              label="Área o equipo específico"
              required
              creatable
              value={generalInfo.areaEspecifica || ''}
              options={dynamicLists.areas}
              isLoading={loadingLists}
              onValueChange={(value) => handleInputChange('areaEspecifica', value)}
            />
          </ConditionalField>
          
          <ConditionalField
            label="Planta"
            icon={<Building2 className="h-4 w-4" />}
            radioValue={generalInfo.requierePlanta}
            onRadioChange={(value) => { 
              handleInputChange('requierePlanta', value); 
              if (value === 'no') handleInputChange('planta', ''); 
            }}
          >
            <DynamicSelect
              listKey="plantas"
              label="Planta"
              required
              creatable
              value={generalInfo.planta || ''}
              options={dynamicLists.plantas}
              isLoading={loadingLists}
              onValueChange={(value) => handleInputChange('planta', value)}
            />
          </ConditionalField>

          <ConditionalField
            label="Proceso"
            icon={<ClipboardList className="h-4 w-4" />}
            radioValue={generalInfo.requiereProceso}
            onRadioChange={(value) => { 
              handleInputChange('requiereProceso', value); 
              if (value === 'no') handleInputChange('proceso', ''); 
            }}
          >
            <DynamicSelect
              listKey="procesos"
              label="Proceso"
              required
              creatable
              value={generalInfo.proceso || ''}
              options={dynamicLists.procesos}
              isLoading={loadingLists}
              onValueChange={(value) => handleInputChange('proceso', value)}
            />
          </ConditionalField>

          <ConditionalField
            label="Contrato"
            icon={<FileText className="h-4 w-4" />}
            radioValue={generalInfo.requiereContrato}
            onRadioChange={(value) => { 
              handleInputChange('requiereContrato', value); 
              if (value === 'no') handleInputChange('contrato', ''); 
            }}
          >
            <DynamicSelect
              listKey="contratos"
              label="Contrato"
              required
              creatable
              value={generalInfo.contrato || ''}
              options={dynamicLists.contratos}
              isLoading={loadingLists}
              onValueChange={(value) => handleInputChange('contrato', value)}
            />
          </ConditionalField>
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<Building2 className="h-5 w-5" />} 
          title="Empresa y Solicitante"
          subtitle="Información de la empresa y quien solicita"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicSelect
            listKey="empresas"
            label="Empresa"
            required
            value={generalInfo.empresa || ''}
            options={dynamicLists.empresas}
            isLoading={loadingLists}
            onValueChange={(value) => handleInputChange('empresa', value)}
          />
          
          <div className="space-y-2">
            <RequiredLabel>Ejecutante del trabajo / Líder del equipo Ejecutante</RequiredLabel>
            <Input
              value={generalInfo.nombreSolicitante || ''}
              onChange={(e) => handleInputChange('nombreSolicitante', e.target.value)}
              className="h-11"
            />
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<ClipboardList className="h-5 w-5" />} 
          title="Listas de Verificación Complementarias"
          subtitle="Seleccione los tipos de trabajo que aplican"
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workTypes.map(({ key, name, icon }) => {
            const isSelected = selectedWorkTypes[key];
            return (
              <label
                key={key}
                htmlFor={key}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <Checkbox
                  id={key}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleWorkTypeChange(key, !!checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className={cn(
                    "transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}>
                    {icon}
                  </span>
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    isSelected ? "text-primary" : "text-gray-700"
                  )}>
                    {name}
                  </span>
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </label>
            );
          })}
        </div>
        
        {selectedWorkTypesCount > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">{selectedWorkTypesCount}</span> tipo(s) de trabajo seleccionado(s)
            </p>
          </div>
        )}
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<Calendar className="h-5 w-5" />} 
          title="Duración del Permiso"
          subtitle="Máximo 7 días de vigencia"
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <RequiredLabel>Fecha y hora de inicio</RequiredLabel>
            <Input
              type="datetime-local"
              value={generalInfo.validFrom}
              onChange={(e) => handleInputChange('validFrom', e.target.value)}
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <RequiredLabel>Fecha y hora de fin</RequiredLabel>
            <Input
              type="datetime-local"
              value={generalInfo.validUntil}
              onChange={handleUntilChange}
              disabled={!generalInfo.validFrom}
              min={generalInfo.validFrom}
              max={maxDate}
              className={cn("h-11", !generalInfo.validFrom && "cursor-not-allowed opacity-60")}
            />
            {!generalInfo.validFrom && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Primero seleccione la fecha de inicio
              </p>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<FileText className="h-5 w-5" />} 
          title="Descripción de la Tarea - ALCANCE"
          required
        />
        
        <Textarea
          value={generalInfo.workDescription}
          onChange={(e) => handleInputChange('workDescription', e.target.value)}
          rows={4}
          className="w-full resize-none focus:ring-2 focus:ring-primary/20"
          placeholder="Describa detalladamente el alcance del trabajo, actividades a realizar y área/equipo involucrado..."
        />
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<Wrench className="h-5 w-5" />} 
          title="Equipos y/o Herramientas"
          subtitle="Agregue las herramientas necesarias para el trabajo"
        />
        
        <div className="space-y-4">
          {generalInfo.tools && generalInfo.tools.length > 0 && (
            <div className="space-y-2 pb-4 border-b">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  Seleccionadas
                </p>
                <Badge variant="secondary" className="text-xs">
                  {generalInfo.tools.length}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {generalInfo.tools.map((tool, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/15 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{tool.name}</span>
                    <button
                      onClick={() => removeTool(index)}
                      className="opacity-60 hover:opacity-100 hover:text-destructive transition-all flex-shrink-0 ml-0.5"
                      type="button"
                    >
                      <X className="h-3.5 w-3.5"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Buscar herramienta..."
                className="pl-10 pr-10 h-11"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {showSearchResults && searchTerm && (
              <div
                ref={resultsContainerRef}
                className="absolute z-50 w-[calc(100%-2rem)] md:w-auto md:min-w-[400px] max-w-[600px] mt-1 bg-white border rounded-xl shadow-xl overflow-hidden"
              >
                <div 
                  className="max-h-[50vh] overflow-y-auto overscroll-contain"
                  onScroll={handleScroll}
                >
                  {displayedHerramientas.length > 0 ? (
                    <>
                      {displayedHerramientas.map((herramienta) => {
                        const isAdded = generalInfo.tools?.some(t => t.name === herramienta);
                        return (
                          <button
                            key={herramienta}
                            onClick={() => !isAdded && addToolFromList(herramienta)}
                            disabled={isAdded}
                            type="button"
                            className={cn(
                              "w-full text-left px-4 py-3.5 transition-colors text-sm border-b last:border-b-0",
                              isAdded 
                                ? "opacity-50 cursor-not-allowed bg-gray-50" 
                                : "hover:bg-primary/5 active:bg-primary/10"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate flex-1">{herramienta}</span>
                              {isAdded ? (
                                <Badge variant="secondary" className="text-xs">Agregada</Badge>
                              ) : (
                                <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                      {displayCount < filteredHerramientas.length && (
                        <div className="px-4 py-3 text-center text-xs text-muted-foreground bg-muted/30 border-t">
                          Mostrando {displayCount} de {filteredHerramientas.length} — Desliza para ver más
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        No se encontró "<span className="font-medium">{searchTerm}</span>"
                      </p>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={() => {
                          setNewToolName(searchTerm);
                          setIsAddingNew(true);
                          setShowSearchResults(false);
                        }}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Agregar "{searchTerm}"
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isAddingNew && (
              <div className="flex flex-col sm:flex-row gap-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 animate-in slide-in-from-top-2 duration-200">
                <Input
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  placeholder="Nombre de la nueva herramienta..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewTool();
                    }
                    if (e.key === 'Escape') {
                      setIsAddingNew(false);
                      setNewToolName('');
                    }
                  }}
                  autoFocus
                  className="flex-1 h-11"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleAddNewTool}
                    disabled={!newToolName.trim()}
                    className="flex-1 sm:flex-none h-11 gap-2"
                  >
                    <Check className="h-4 w-4" />
                    <span className="sm:inline hidden">Guardar</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewToolName('');
                    }}
                    className="flex-1 sm:flex-none h-11 gap-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sm:inline hidden">Cancelar</span>
                  </Button>
                </div>
              </div>
            )}

            {!isAddingNew && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingNew(true)}
                className="w-full h-11 gap-2 border-dashed"
              >
                <Plus className="h-4 w-4" />
                Crear nueva herramienta
              </Button>
            )}
          </div>

          {quickSelectTools.length > 0 && (
            <div className="pt-4 border-t space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Acceso rápido</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickSelectTools.map((herramienta) => (
                  <Button
                    key={herramienta}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToolFromList(herramienta)}
                    className="text-xs justify-start h-10 px-3 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <Plus className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{herramienta}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<Users className="h-5 w-5" />} 
          title="Número de Trabajadores Adicionales"
          required
        />
        
        <div className="space-y-3">
          <Input 
            type="number" 
            value={generalInfo.numTrabajadores} 
            onChange={e => handleInputChange('numTrabajadores', e.target.value)} 
            placeholder="Cantidad de trabajadores adicionales"
            className="h-11 max-w-xs"
            min={0}
          />
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              Este número representa el total de personas <strong>adicionales</strong> en el equipo (excluyéndote a ti). El sistema te sumará automáticamente al total.
            </p>
          </div>
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle 
          icon={<User className="h-5 w-5" />} 
          title="LÍDER A CARGO DEL EQUIPO EJECUTANTE"
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <RequiredLabel>Nombre completo</RequiredLabel>
            <Input 
              placeholder="Nombre completo" 
              value={generalInfo.responsable?.nombre} 
              onChange={e => handleResponsableChange('nombre', e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <RequiredLabel>Cargo</RequiredLabel>
            <Input 
              placeholder="Cargo" 
              value={generalInfo.responsable?.cargo} 
              onChange={e => handleResponsableChange('cargo', e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <RequiredLabel>Compañía</RequiredLabel>
            <Select
              value={generalInfo.responsable?.compania || ''}
              onValueChange={(value) => handleResponsableChange('compania', value)}
              disabled={loadingLists}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder={loadingLists ? "Cargando..." : "Seleccione compañía..."} />
              </SelectTrigger>
              <SelectContent>
                {dynamicLists.empresas.map((empresa) => (
                  <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <RequiredLabel required={false}>Área</RequiredLabel>
            <Input 
              placeholder="Área (ej: Mantenimiento)" 
              value={generalInfo.responsable?.area || ''} 
              onChange={e => handleResponsableChange('area', e.target.value)}
              className="h-11"
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}