'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Check, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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

// Lista genérica inicial de herramientas por defecto
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

  // Cargar herramientas desde Firestore
  React.useEffect(() => {
    const herramientasRef = doc(db, 'dynamic_lists', 'herramientas');
    
    const unsubscribe = onSnapshot(herramientasRef, (docSnap) => {
      if (docSnap.exists()) {
        const items = docSnap.data().items || [];
        setHerramientasDisponibles(items.sort());
      } else {
        // Si no existe el documento, crearlo con la lista inicial
        setDoc(herramientasRef, { items: herramientasIniciales.sort() })
          .then(() => setHerramientasDisponibles(herramientasIniciales.sort()))
          .catch(error => console.error('Error creating herramientas list:', error));
      }
    }, (error) => {
      console.error('Error fetching herramientas:', error);
      setHerramientasDisponibles(herramientasIniciales.sort());
    });

    return () => unsubscribe();
  }, []);

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

    Promise.all(listNames.map(listName => new Promise(resolve => {
      const docRef = doc(db, 'dynamic_lists', listName);
      onSnapshot(docRef, () => resolve(true), () => resolve(true));
    }))).then(() => setLoadingLists(false));

    return () => unsubscribers.forEach(unsub => unsub());
  }, [toast]);

  // Cerrar resultados al hacer click fuera
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

  // Agregar herramienta seleccionada
  const addToolFromList = React.useCallback((toolName: string) => {
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
    
    // Limpiar búsqueda y cerrar resultados
    setSearchTerm('');
    setShowSearchResults(false);
    setDisplayCount(ITEMS_PER_PAGE);
    
    // Toast de confirmación
    toast({
      title: "✓ Agregada",
      description: `${toolName}`,
      duration: 1500,
    });
  }, [generalInfo.tools, handleInputChange, toast]);

  // Agregar nueva herramienta personalizada
  const addNewToolToFirestore = async () => {
    const trimmedName = newToolName.trim();
    if (!trimmedName) return;

    if (herramientasDisponibles.includes(trimmedName)) {
      toast({
        variant: "destructive",
        title: "Ya existe",
        description: "Esta herramienta ya está en la lista disponible.",
      });
      setNewToolName('');
      setIsAddingNew(false);
      return;
    }

    try {
      const herramientasRef = doc(db, 'dynamic_lists', 'herramientas');
      const docSnap = await getDoc(herramientasRef);
      const currentItems = docSnap.exists() ? docSnap.data().items || [] : [];
      const updatedItems = [...currentItems, trimmedName].sort();
      
      await setDoc(herramientasRef, { items: updatedItems });
      
      addToolFromList(trimmedName);
      
      toast({
        title: "✓ Herramienta creada",
        description: `"${trimmedName}" se agregó al catálogo.`,
      });
      
      setNewToolName('');
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error adding tool:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo agregar la herramienta.",
      });
    }
  };

  const removeTool = React.useCallback((index: number) => {
    const newTools = (generalInfo.tools || []).filter((_, i) => i !== index);
    handleInputChange('tools', newTools);
  }, [generalInfo.tools, handleInputChange]);
  
  const maxDate = React.useMemo(() => {
    if (!generalInfo.validFrom) return '';
    const startDate = new Date(generalInfo.validFrom);
    const maxDate = addDays(startDate, 7);
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

  // Filtrar herramientas según búsqueda con optimización
  const filteredHerramientas = React.useMemo(() => {
    if (!searchTerm) return herramientasDisponibles;
    const searchLower = searchTerm.toLowerCase();
    return herramientasDisponibles.filter(h => 
      h.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, herramientasDisponibles]);

  // Herramientas a mostrar con lazy loading
  const displayedHerramientas = React.useMemo(() => {
    return filteredHerramientas.slice(0, displayCount);
  }, [filteredHerramientas, displayCount]);

  // Herramientas para selección rápida (excluir ya agregadas)
  const quickSelectTools = React.useMemo(() => {
    return herramientasDisponibles
      .slice(0, QUICK_SELECT_COUNT)
      .filter(h => !generalInfo.tools?.some(t => t.name === h));
  }, [herramientasDisponibles, generalInfo.tools]);

  // Manejar scroll para lazy loading
  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
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
        <div className="space-y-4 p-4 border rounded-lg mt-2">
          {/* Herramientas seleccionadas - Optimizado para móvil */}
          {generalInfo.tools && generalInfo.tools.length > 0 && (
            <div className="space-y-2 pb-3 border-b">
              <p className="text-xs text-muted-foreground">Seleccionadas ({generalInfo.tools.length}):</p>
              <div className="flex flex-wrap gap-2">
                {generalInfo.tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm group">
                    <Check className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{tool.name}</span>
                    <button
                      onClick={() => removeTool(index)}
                      className="hover:text-destructive transition-colors flex-shrink-0 ml-1"
                      type="button"
                    >
                      <X className="h-3 w-3"/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Campo de búsqueda - Optimizado para móvil */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                ref={searchInputRef}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Buscar herramienta..."
                className="pl-9 pr-9"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Lista de resultados con lazy loading - Optimizada */}
            {showSearchResults && searchTerm && (
              <div
                ref={resultsContainerRef}
                className="absolute z-50 w-[calc(100%-2rem)] md:w-auto md:min-w-[400px] max-w-[600px] mt-1 bg-white border rounded-lg shadow-lg"
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
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm border-b last:border-b-0 ${
                              isAdded ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate flex-1">{herramienta}</span>
                              {isAdded ? (
                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                              ) : (
                                <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                      {displayCount < filteredHerramientas.length && (
                        <div className="px-4 py-3 text-center text-xs text-muted-foreground border-t">
                          Mostrando {displayCount} de {filteredHerramientas.length}... Desliza para ver más
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        No se encontró "{searchTerm}"
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewToolName(searchTerm);
                          setIsAddingNew(true);
                          setShowSearchResults(false);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar "{searchTerm}"
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agregar nueva herramienta */}
            {isAddingNew && (
              <div className="flex flex-col sm:flex-row gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Input
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  placeholder="Nombre de la nueva herramienta..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addNewToolToFirestore();
                    }
                    if (e.key === 'Escape') {
                      setIsAddingNew(false);
                      setNewToolName('');
                    }
                  }}
                  autoFocus
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={addNewToolToFirestore}
                    disabled={!newToolName.trim()}
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="h-4 w-4 sm:mr-2" />
                    <span className="sm:inline hidden">Guardar</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewToolName('');
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 sm:mr-2" />
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
                className="w-full"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Crear nueva herramienta
              </Button>
            )}
          </div>

          {/* Selección rápida - Solo herramientas no agregadas */}
          {quickSelectTools.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Acceso rápido:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickSelectTools.map((herramienta) => (
                  <Button
                    key={herramienta}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToolFromList(herramienta)}
                    className="text-xs justify-start h-auto py-2 px-3"
                  >
                    <Plus className="mr-1 h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{herramienta}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
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
            <Input placeholder="Nombre completo" value={generalInfo.responsable?.nombre} onChange={e => handleResponsableChange('nombre', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground after:content-['*'] after:ml-0.5 after:text-red-500">Cargo</Label>
            <Input placeholder="Cargo" value={generalInfo.responsable?.cargo} onChange={e => handleResponsableChange('cargo', e.target.value)} />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground after:content-['*'] after:ml-0.5 after:text-red-500">Compañía</Label>
            <Select
              value={generalInfo.responsable?.compania || ''}
              onValueChange={(value) => handleResponsableChange('compania', value)}
              disabled={loadingLists}
            >
              <SelectTrigger>
                <SelectValue placeholder={loadingLists ? "Cargando..." : "Seleccione una compañía..."} />
              </SelectTrigger>
              <SelectContent>
                {dynamicLists.empresas.map((empresa) => (
                  <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}