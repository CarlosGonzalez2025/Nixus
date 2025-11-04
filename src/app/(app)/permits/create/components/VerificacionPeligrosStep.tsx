'use client';
import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { VerificacionPeligros } from '@/types';

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

const RadioGroupField: React.FC<{ id: string; label: string; value: string; onChange: (value: string) => void; }> = ({ id, label, value, onChange }) => (
    <div className="flex justify-between items-center p-3 border rounded-md bg-white">
        <Label htmlFor={id} className="text-sm font-medium flex-1">{label}</Label>
        <RadioGroup id={id} value={value || 'na'} onValueChange={onChange} className="flex gap-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${id}-si`} /><Label htmlFor={`${id}-si`}>SI</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${id}-no`} /><Label htmlFor={`${id}-no`}>NO</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${id}-na`} /><Label htmlFor={`${id}-na`}>N/A</Label></div>
        </RadioGroup>
    </div>
);

const peligrosCategorias = {
    fisicos: [
        { id: 'ruido', label: 'Ruido' },
        { id: 'iluminacionDeficiente', label: 'Iluminación Deficiente' },
        { id: 'temperaturasExtremas', label: 'Temperaturas Extremas' },
        { id: 'vibracion', label: 'Vibración' },
        { id: 'radiacionIonizante', label: 'Radiación Ionizante' },
        { id: 'radiacionNoIonizante', label: 'Radiación NO ionizante' },
        { id: 'disconfortTermico', label: 'Disconfort térmico' },
        { id: 'superficiesCalientes', label: 'Superficies calientes' },
    ],
    quimicos: [
        { id: 'gasesVapores', label: 'Gases y vapores' },
        { id: 'humosMetalicos', label: 'Humos metálicos' },
        { id: 'fibras', label: 'Fibras' },
        { id: 'polvos', label: 'Polvos' },
        { id: 'liquidosNieblas', label: 'Líquidos Nieblas' },
        { id: 'liquidosRocios', label: 'Líquidos Rocios' },
    ],
    seguridad: [
        { id: 'elementosMaquinas', label: 'Elementos de máquinas' },
        { id: 'herramientasMecanicas', label: 'Herramientas mecánicas' },
        { id: 'herramientasManuales', label: 'Herramientas manuales' },
        { id: 'equiposMovimiento', label: 'Equipos en movimiento' },
        { id: 'proyeccionParticulas', label: 'Proyección de partículas' },
        { id: 'proyeccionFluidos', label: 'Proyección de fluidos' },
        { id: 'equiposPresurizados', label: 'Equipos presurizados' },
        { id: 'intervencionSistemasElectricos', label: 'Intervención sistemas eléctricos' },
        { id: 'adyacenteEquiposLineasEnergizados', label: 'Adyacente equipos / líneas energizados' },
        { id: 'altaTension', label: 'Alta tensión' },
        { id: 'bajaTension', label: 'Baja tensión' },
        { id: 'estatica', label: 'Estática' },
        { id: 'fuga', label: 'Fuga' },
        { id: 'incendio', label: 'Incendio' },
        { id: 'explosion', label: 'Explosión' },
    ],
    locativos: [
        { id: 'trabajoAlturas', label: 'Trabajo alturas' },
        { id: 'espaciosConfinados', label: 'Espacios confinados' },
        { id: 'superficiesIrregulares', label: 'Superficies irregulares' },
        { id: 'superficiesDeslizantes', label: 'Superficies deslizantes' },
        { id: 'superficiesConDesnivel', label: 'Superficies con desnivel' },
        { id: 'condicionesOrdenAseo', label: 'Condiciones de orden y aseo' },
        { id: 'transitoVehiculos', label: 'Tránsito de vehículos' },
        { id: 'almacenamiento', label: 'Almacenamiento' },
    ],
    biologicoAmbiental: [
        { id: 'picaduras', label: 'Picaduras' },
        { id: 'mordeduras', label: 'Mordeduras' },
        { id: 'bacteriasVirusHongos', label: 'Bacterias, virus hongos' },
        { id: 'fluidosExcrementos', label: 'Fluidos o excrementos' },
        { id: 'generacionResiduos', label: 'Generación de residuos' },
        { id: 'emisionesVertimientos', label: 'Emisiones y/o vertimientos' },
        { id: 'derramePotencialSustanciasQuimicas', label: 'Derrame potencial sustancias químicas' },
        { id: 'usoMaterialArrastreCantera', label: 'Uso material de arrastre o cantera' },
    ],
    biomecanicos: [
        { id: 'posturasForzadas', label: 'Posturas forzadas' },
        { id: 'posturasProlongada', label: 'Posturas prolongada' },
        { id: 'esfuerzo', label: 'Esfuerzo' },
        { id: 'movimientoRepetitivo', label: 'Movimiento repetitivo' },
        { id: 'movimientoAntigravitacional', label: 'Movimiento antigravitacional' },
        { id: 'manipulacionManualCargas', label: 'Manipulación manual de cargas' },
    ],
    psicosocial: [
        { id: 'pausas', label: 'Pausas' },
        { id: 'trabajoNocturno', label: 'Trabajo nocturno' },
        { id: 'rotacion', label: 'Rotación' },
        { id: 'horasExtras', label: 'Horas extras' },
        { id: 'turno', label: 'Turno' },
    ],
};

export function VerificacionPeligrosStep() {
    const { state, dispatch } = usePermitForm();
    const { verificacionPeligros } = state;

    const handleUpdate = (categoria: keyof VerificacionPeligros, campo: string, valor: string) => {
        dispatch({
            type: 'UPDATE_VERIFICACION_PELIGROS',
            payload: {
                [categoria]: {
                    ...verificacionPeligros?.[categoria],
                    [campo]: valor,
                },
            },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    Verificación de Peligros
                </h2>
                <p className="text-muted-foreground text-sm">
                    Identifique los peligros asociados a la actividad a realizar.
                </p>
            </div>

            {Object.entries(peligrosCategorias).map(([categoria, peligros]) => (
                <SectionWrapper key={categoria} title={categoria.charAt(0).toUpperCase() + categoria.slice(1).replace(/([A-Z])/g, ' $1')}>
                    <div className="space-y-2">
                        {peligros.map(peligro => (
                            <RadioGroupField
                                key={peligro.id}
                                id={`${categoria}-${peligro.id}`}
                                label={peligro.label}
                                value={(verificacionPeligros as any)?.[categoria]?.[peligro.id] || 'na'}
                                onChange={(value) => handleUpdate(categoria as keyof VerificacionPeligros, peligro.id, value)}
                            />
                        ))}
                    </div>
                </SectionWrapper>
            ))}
        </div>
    );
}
