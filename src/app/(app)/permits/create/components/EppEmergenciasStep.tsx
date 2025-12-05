'use client';
import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { EppEmergencias } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


interface EppEmergenciasStepProps {
    eppEmergencias: EppEmergencias;
    onUpdate: (updates: Partial<EppEmergencias>) => void;
}


const SectionWrapper: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    defaultOpen?: boolean 
}> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
    );
};


const RadioGroupField: React.FC<{ 
    id: string; 
    label: string; 
    value: string; 
    onChange: (value: string) => void;
    showInput?: boolean;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    placeholder?: string;
    isSelect?: boolean;
    selectOptions?: string[];
    hasError?: boolean;
}> = ({ 
    id, 
    label, 
    value, 
    onChange, 
    showInput = false, 
    inputValue, 
    onInputChange, 
    placeholder,
    isSelect = false,
    selectOptions = [],
    hasError = false
}) => (
    <div className={`flex flex-col space-y-2 p-3 border rounded-md bg-white transition-all ${
        hasError ? 'border-red-500 border-2 bg-red-50' : ''
    }`}>
        <div className="flex justify-between items-center">
            <Label 
                htmlFor={id} 
                className={`text-sm font-medium flex-1 ${hasError ? 'text-red-700' : ''}`}
            >
                {label}
                {hasError && (
                    <span className="ml-2 text-red-600 font-bold">
                        ⚠️ Debe seleccionar "SI"
                    </span>
                )}
            </Label>
            <RadioGroup 
                id={id} 
                value={value || ''} 
                onValueChange={onChange} 
                className="flex gap-4"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id={`${id}-si`} />
                    <Label htmlFor={`${id}-si`}>SI</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${id}-no`} />
                    <Label htmlFor={`${id}-no`}>NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id={`${id}-na`} />
                    <Label htmlFor={`${id}-na`}>N/A</Label>
                </div>
            </RadioGroup>
        </div>
        {value === 'si' && onInputChange && (
            isSelect ? (
                <Select value={inputValue} onValueChange={onInputChange}>
                    <SelectTrigger className="mt-2">
                        <SelectValue placeholder={placeholder || "Seleccione una opción"} />
                    </SelectTrigger>
                    <SelectContent>
                        {selectOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : showInput ? (
                <Input 
                    className="mt-2"
                    placeholder={placeholder || 'Especificar...'}
                    value={inputValue || ''}
                    onChange={(e) => onInputChange(e.target.value)}
                />
            ) : null
        )}
    </div>
);


// ✅ MANTENIDO: Array de EPP items (oculto en UI pero disponible para futuro uso)
export const eppItems = [
    { id: 'ropaTrabajo', label: 'Ropa de trabajo', manual: false },
    { id: 'overolIgnifugo', label: 'Overol Ignífugo, Categoría:', manual: true },
    { id: 'proteccionCuerpoSoldador', label: 'Protección cuerpo para soldador', manual: false },
    { id: 'casco', label: 'Casco', manual: true, isSelect: true, selectOptions: ['Sin Barbuquejo', 'Con Barbuquejo'] },
    { id: 'chavoTelaCarnaza', label: 'Chavo en tela o carnaza', manual: false },
    { id: 'botasSeguridadDielectrica', label: 'Botas de seguridad + dielectrica', manual: false },
    { id: 'proteccionMetatarso', label: 'Proteccion metatarso', manual: false },
    { id: 'monogafasGafas', label: 'Monogafas / Gafas', manual: false },
    { id: 'caretaSoldador', label: 'Careta de soldador', manual: false },
    { id: 'gafasOxicorte', label: 'Gafas de oxicorte', manual: false },
    { id: 'caretaProteccionTotal', label: 'Careta de proteccion total', manual: false },
    { id: 'proteccionAuditivaInsercion', label: 'Proteccion auditiva Inserción', manual: false },
    { id: 'proteccionAuditivaCopa', label: 'Proteccion auditiva copa', manual: false },
    { id: 'guantesAntiCorte', label: 'Guantes anti corte', manual: false },
    { id: 'guantesSustanciasQuimicas', label: 'Guantes sustancias químicas', manual: false },
    { id: 'guantesTemperatura', label: 'Guantes temperatura', manual: false },
    { id: 'arnes', label: 'Arnés, Tipo:', manual: true },
    { id: 'mosqueton', label: 'Mosquetón', manual: false },
    { id: 'eslinga', label: 'Eslinga, Tipo:', manual: true },
    { id: 'lineaVida', label: 'Línea de vida, Tipo:', manual: true },
    { id: 'puntoAnclaje', label: 'Punto de anclaje (Cual):', manual: true },
    { id: 'senalizacion', label: 'Señalización', manual: false },
    { id: 'barandas', label: 'Barandas', manual: false },
    { id: 'delimitacionPerimetral', label: 'Delimitación Perimetral', manual: false },
    { id: 'controlAcceso', label: 'Control de acceso', manual: false },
];


// 🔥 ITEMS DE EMERGENCIAS CON FLAG DE REQUERIDO
const emergenciasItems = [
    { 
        id: 'notificacion', 
        label: 'NOTIFICACIÓN: El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados del trabajo a realizar', 
        required: true 
    },
    { 
        id: 'recordarVerificar', 
        label: 'EMERGENCIAS: Recordar y verificar', 
        required: false,
        isHeader: true // Marca como encabezado
    },
    { 
        id: 'potenciales', 
        label: 'A.- Las emergencias potenciales que pueden ocurrir', 
        required: true 
    },
    { 
        id: 'procedimientos', 
        label: 'B.- Los procedimientos establecidos para tales situaciones.', 
        required: true 
    },
    { 
        id: 'rutasEvacuacion', 
        label: 'C.- Rutas de Evacuación', 
        required: true 
    },
    { 
        id: 'puntosEncuentro', 
        label: 'D.- Puntos de encuentro', 
        required: true 
    },
    { 
        id: 'equiposEmergencia', 
        label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo', 
        required: true 
    },
    { 
        id: 'ubicacionBrigadistas', 
        label: 'F.- Ubicación de Brigadistas cercanos', 
        required: true 
    },
];


// 🔥 FUNCIÓN DE VALIDACIÓN EXPORTABLE
export const validateEmergencias = (emergencias: any): { 
    isValid: boolean; 
    errors: string[];
    hasNoResponses: boolean;
} => {
    const errors: string[] = [];
    const requiredFields = emergenciasItems.filter(item => item.required);
    let hasNoResponses = false;

    requiredFields.forEach(item => {
        const value = emergencias?.[item.id];
        
        if (value === 'no') {
            errors.push(`❌ ${item.label}`);
            hasNoResponses = true;
        } else if (!value || value === '') {
            errors.push(`⚠️ ${item.label} (No seleccionado)`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
        hasNoResponses
    };
};


export function EppEmergenciasStep({ eppEmergencias, onUpdate }: EppEmergenciasStepProps) {
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
    const [showValidation, setShowValidation] = React.useState(false);
    const [hasNoResponses, setHasNoResponses] = React.useState(false);

    // 🔥 VALIDACIÓN EN TIEMPO REAL
    React.useEffect(() => {
        const validation = validateEmergencias(eppEmergencias.emergencias);
        setValidationErrors(validation.errors);
        setHasNoResponses(validation.hasNoResponses);
    }, [eppEmergencias.emergencias]);

    const handleUpdate = (section: keyof EppEmergencias, field: string, value: string) => {
        onUpdate({
            [section]: {
                ...(eppEmergencias as any)[section],
                [field]: value,
            },
        });
        // Mostrar validación después del primer cambio
        setShowValidation(true);
    };

    // 🔥 FUNCIÓN PARA VERIFICAR SI UN CAMPO TIENE ERROR
    const hasFieldError = (fieldId: string): boolean => {
        const item = emergenciasItems.find(i => i.id === fieldId);
        if (!item?.required) return false;
        
        const value = eppEmergencias.emergencias?.[fieldId];
        return showValidation && (value === 'no' || !value);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    Manejo de Emergencias
                </h2>
                <p className="text-muted-foreground text-sm">
                    Verifique las notificaciones y procedimientos de emergencia.
                </p>
            </div>

            {/* 🔥 ALERTA DE VALIDACIÓN */}
            {showValidation && validationErrors.length > 0 && (
                <Alert 
                    variant="destructive" 
                    className="border-2 border-red-500 bg-red-50"
                >
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="font-bold text-lg">
                        🚫 No se puede continuar al siguiente paso
                    </AlertTitle>
                    <AlertDescription className="space-y-3">
                        <p className="font-semibold text-base">
                            {hasNoResponses 
                                ? 'Todas las condiciones de emergencia DEBEN cumplirse (respuesta "SI"):'
                                : 'Complete los siguientes campos para continuar:'
                            }
                        </p>
                        <ul className="list-none pl-0 space-y-2 mt-3">
                            {validationErrors.map((error, index) => (
                                <li 
                                    key={index} 
                                    className="text-sm bg-white p-2 rounded border border-red-300"
                                >
                                    {error}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs mt-4 font-semibold text-red-800">
                            💡 Todas las condiciones de la A a la F deben estar en "SI" para poder avanzar al siguiente paso.
                        </p>
                    </AlertDescription>
                </Alert>
            )}

            <SectionWrapper title="Notificaciones y Manejo de Emergencias" defaultOpen>
                <div className="space-y-2">
                    {emergenciasItems.map(item => {
                        // Renderizar como encabezado
                        if (item.isHeader) {
                            return (
                                <h3 key={item.id} className="font-semibold text-gray-800 pt-4 pb-2 text-base">
                                    {item.label}
                                </h3>
                            );
                        }
                        
                        // Renderizar como campo
                        return (
                            <RadioGroupField
                                key={item.id}
                                id={`emergencia-${item.id}`}
                                label={item.label}
                                value={eppEmergencias.emergencias?.[item.id] as string}
                                onChange={(value) => handleUpdate('emergencias', item.id, value)}
                                hasError={hasFieldError(item.id)}
                            />
                        );
                    })}
                </div>
            </SectionWrapper>
        </div>
    );
}
