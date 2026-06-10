'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown, Flame } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

const RadioGroupField = ({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) => (
  <div className="flex justify-between items-center p-3 border rounded-md bg-white">
    <Label htmlFor={id} className="text-sm font-medium flex-1">{label}</Label>
    <RadioGroup id={id} value={value || 'na'} onValueChange={onChange} className="flex gap-4">
      <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${id}-si`} /><Label htmlFor={`${id}-si`}>SI</Label></div>
      <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${id}-no`} /><Label htmlFor={`${id}-no`}>NO</Label></div>
      <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${id}-na`} /><Label htmlFor={`${id}-na`}>N/A</Label></div>
    </RadioGroup>
  </div>
);

const ITEMS = [
  { key: 'distanciaSeguridad', label: 'A.- Regla de distancia de seguridad de 11 m de materiales combustibles e inflamables' },
  { key: 'medicionAtmosfera', label: 'B.- Medición de atmósfera explosiva (uso de medidor de atmósferas)' },
  { key: 'aislarArea', label: 'C.- Aislar el área de trabajo por medio de biombos, lonas, mamparas' },
  { key: 'taparAberturas', label: 'D.- Tapar toda abertura existente a fin de impedir dispersión de chispas' },
  { key: 'extintores', label: 'E.- Extintores portátiles en el área de trabajo' },
  { key: 'vigiaFuego', label: 'F.- Vigía o supervisor de fuego de incendio' },
  { key: 'personalCapacitado', label: 'G.- Personal capacitado, competente y entrenado' },
  { key: 'listasChequeo', label: 'H.- Listas de chequeo pre-operacional de equipos' },
];

export function AnexoCalienteStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo } = state;
  const anexoCaliente = state.anexoCaliente ?? {};

  const handleItemChange = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_ANEXO_CALIENTE',
      payload: {
        items: {
          ...(anexoCaliente.items ?? {}),
          [key]: value,
        },
      },
    });
  };

  const handleEmergenciaChange = (field: 'contacto' | 'telefono', value: string) => {
    dispatch({
      type: 'UPDATE_ANEXO_CALIENTE',
      payload: {
        emergencia: {
          contacto: anexoCaliente.emergencia?.contacto ?? '',
          telefono: anexoCaliente.emergencia?.telefono ?? '',
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center drop-shadow-lg">
          <Flame className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Anexo de Trabajos en Caliente
        </h2>
        <p className="text-muted-foreground text-sm">
          Complete la información requerida para trabajos en caliente (soldadura, corte, esmerilado, etc.).
        </p>
      </div>

      <SectionWrapper title="Información General" defaultOpen>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Emitido por:</Label><Input value={generalInfo.nombreSolicitante || ''} readOnly disabled /></div>
          <div><Label>Área de Trabajo:</Label><Input value={generalInfo.areaEspecifica || ''} readOnly disabled /></div>
          <div><Label>Equipo o Área Específica:</Label><Input value={generalInfo.proceso || ''} readOnly disabled /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div><Label>Responsable (Nombre):</Label><Input value={generalInfo.responsable?.nombre || ''} readOnly disabled /></div>
          <div><Label>Cargo:</Label><Input value={generalInfo.responsable?.cargo || ''} readOnly disabled /></div>
          <div><Label>Compañía:</Label><Input value={generalInfo.responsable?.compania || ''} readOnly disabled /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label>En caso de emergencia contactar a:</Label>
            <Input
              value={anexoCaliente.emergencia?.contacto || ''}
              onChange={(e) => handleEmergenciaChange('contacto', e.target.value)}
            />
          </div>
          <div>
            <Label>Teléfono:</Label>
            <Input
              value={anexoCaliente.emergencia?.telefono || ''}
              onChange={(e) => handleEmergenciaChange('telefono', e.target.value)}
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Lista de Verificación — Trabajos en Caliente" defaultOpen>
        <div className="space-y-3">
          {ITEMS.map(({ key, label }) => (
            <RadioGroupField
              key={key}
              id={`caliente_${key}`}
              label={label}
              value={(anexoCaliente.items?.[key] as string) || 'na'}
              onChange={(value) => handleItemChange(key, value)}
            />
          ))}
          <div className="flex items-center gap-2 pt-2">
            <Label htmlFor="calienteOtro" className="whitespace-nowrap">Otro (Cual):</Label>
            <Input
              id="calienteOtro"
              value={(anexoCaliente.items?.otro as string) || ''}
              onChange={(e) => handleItemChange('otro', e.target.value)}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
