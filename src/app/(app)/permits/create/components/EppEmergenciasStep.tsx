'use client';
import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { EppEmergencias } from '@/types';

interface EppEmergenciasStepProps {
    eppEmergencias: EppEmergencias;
    onUpdate: (updates: Partial<EppEmergencias>) => void;
}

const SectionWrapper: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-3 bg-gray-100 rounded-lg cursor-pointer border">
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
}> = ({ id, label, value, onChange, showInput = false, inputValue, onInputChange, placeholder }) => (
    <div className="flex flex-col space-y-2 p-3 border rounded-md bg-white">
        <div className="flex justify-between items-center">
            <Label htmlFor={id} className="text-sm font-medium flex-1">{label}</Label>
            <RadioGroup id={id} value={value || 'na'} onValueChange={onChange} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${id}-si`} /><Label htmlFor={`${id}-si`}>SI</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${id}-no`} /><Label htmlFor={`${id}-no`}>NO</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${id}-na`} /><Label htmlFor={`${id}-na`}>N/A</Label></div>
            </RadioGroup>
        </div>
        {showInput && value === 'si' && onInputChange && (
            <Input 
                className="mt-2"
                placeholder={placeholder || 'Especificar...'}
                value={inputValue || ''}
                onChange={(e) => onInputChange(e.target.value)}
            />
        )}
    </div>
);

const eppItems = [
    { id: 'ropaTrabajo', label: 'Ropa de trabajo', manual: false },
    { id: 'overolIgnifugo', label: 'Overol Ignífugo, Categoría:', manual: false },
    { id: 'proteccionCuerpoSoldador', label: 'Proteccion cuerpo para soldador y/o', manual: false },
    { id: 'proteccionRespiratoria', label: 'Proteccion respiratoria', manual: false },
    { id: 'casco', label: 'Casco Tipo__ Clase__ SIN__ CON__ Barbuquejo', manual: true },
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
    { id: 'guantesTemperatura', label: 'Guantes temperatura', manual: true },
    { id: 'arnes', label: 'Arnés, Tipo:', manual: true },
    { id: 'mosqueton', label: 'Mosquetón', manual: true },
    { id: 'eslinga', label: 'Eslinga, Tipo:', manual: true },
    { id: 'lineaVida', label: 'Línea de vida, Tipo:', manual: true },
    { id: 'puntoAnclaje', label: 'Punto de anclaje (Cual):', manual: false },
    { id: 'senalizacion', label: 'Señalización', manual: false },
    { id: 'barandas', label: 'Barandas', manual: false },
    { id: 'delimitacionPerimetral', label: 'Delimitación Perimetral', manual: false },
    { id: 'controlAcceso', label: 'Control de acceso', manual: false },
];

const emergenciasItems = [
    { id: 'notificacion', label: 'NOTIFICACIÓN: El personal del área potencialmente afectado y los trabajadores vecinos fueron notificados del trabajo a realizar' },
    { id: 'recordarVerificar', label: 'EMERGENCIAS: Recordar y verificar' },
    { id: 'potenciales', label: 'A.- Las emergencias potenciales que pueden ocurrir' },
    { id: 'procedimientos', label: 'B.- Los procedimientos establecidos para tales situaciones.' },
    { id: 'rutasEvacuacion', label: 'C.- Rutas de Evacuación' },
    { id: 'puntosEncuentro', label: 'D.- Puntos de encuentro' },
    { id: 'equiposEmergencia', label: 'E.- Ubicación de equipos de emergencia en el sitio de trabajo' },
];

export function EppEmergenciasStep({ eppEmergencias, onUpdate }: EppEmergenciasStepProps) {

    const handleUpdate = (section: keyof EppEmergencias, field: string, value: string) => {
        onUpdate({
            [section]: {
                ...(eppEmergencias as any)[section],
                [field]: value,
            },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    EPP y Manejo de Emergencias
                </h2>
                <p className="text-muted-foreground text-sm">
                    Especifique los equipos de protección personal y verificaciones de emergencia.
                </p>
            </div>

            <SectionWrapper title="Equipos de Protección Personal Requeridos" defaultOpen>
                <div className="space-y-2">
                    {eppItems.map(item => (
                        <RadioGroupField
                            key={item.id}
                            id={`epp-${item.id}`}
                            label={item.label}
                            value={eppEmergencias.epp?.[item.id] as string}
                            onChange={(value) => handleUpdate('epp', item.id, value)}
                            showInput={item.manual}
                            inputValue={eppEmergencias.epp?.[`${item.id}_manual`] as string || ''}
                            onInputChange={(value) => handleUpdate('epp', `${item.id}_manual`, value)}
                            placeholder="Agregar tipo manualmente"
                        />
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper title="Notificaciones y Manejo de Emergencias" defaultOpen>
                <div className="space-y-2">
                    {emergenciasItems.map(item => (
                        <RadioGroupField
                            key={item.id}
                            id={`emergencia-${item.id}`}
                            label={item.label}
                            value={eppEmergencias.emergencias?.[item.id] as string}
                            onChange={(value) => handleUpdate('emergencias', item.id, value)}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
