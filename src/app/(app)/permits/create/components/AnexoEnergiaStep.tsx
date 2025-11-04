'use client';
import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const RadioGroupField = ({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void; }) => (
    <div className="flex justify-between items-center p-3 border rounded-md bg-white">
        <Label htmlFor={id} className="text-sm font-medium flex-1">{label}</Label>
        <RadioGroup id={id} value={value || 'na'} onValueChange={onChange} className="flex gap-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${id}-si`} /><Label htmlFor={`${id}-si`}>SI</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${id}-no`} /><Label htmlFor={`${id}-no`}>NO</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${id}-na`} /><Label htmlFor={`${id}-na`}>N/A</Label></div>
        </RadioGroup>
    </div>
);


export function AnexoEnergiaStep() {
    const { state, dispatch } = usePermitForm();
    const { generalInfo, anexoEnergias } = state;

    const handleFieldChange = (section: string, field: string, value: any) => {
        const currentSection = (anexoEnergias as any)[section] || {};
        dispatch({
            type: 'UPDATE_ANEXO_ENERGIA',
            payload: {
                [section]: { ...currentSection, [field]: value }
            }
        });
    };

    const handleCheckboxGroupChange = (section: string, field: string, checked: boolean) => {
        const currentSection = (anexoEnergias as any)[section] || {};
        handleFieldChange(section, field, checked);
    };
    
    const handleInputChange = (field: string, value: string) => {
         dispatch({
            type: 'UPDATE_ANEXO_ENERGIA',
            payload: { [field]: value }
        });
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    Anexo de Trabajos con Energías
                </h2>
                <p className="text-muted-foreground text-sm">
                    Complete la información requerida para trabajos con energías peligrosas.
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
                    <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoEnergias?.emergencia?.contacto || ''} onChange={(e) => handleFieldChange('emergencia', 'contacto', e.target.value)} /></div>
                    <div><Label>Teléfono:</Label><Input value={anexoEnergias?.emergencia?.telefono || ''} onChange={(e) => handleFieldChange('emergencia', 'telefono', e.target.value)} /></div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Trabajos en Caliente">
                <div className="space-y-3">
                    <RadioGroupField id="distanciaSeguridad" label="A.- Regla de distancia de seguridad de 11 m de materiales combustibles e inflamables" value={anexoEnergias?.trabajosEnCaliente?.distanciaSeguridad as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'distanciaSeguridad', value)} />
                    <RadioGroupField id="medicionAtmosfera" label="B.- Medición de atmósfera explosiva (uso de medidor de atmósferas)" value={anexoEnergias?.trabajosEnCaliente?.medicionAtmosfera as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'medicionAtmosfera', value)} />
                    <RadioGroupField id="aislarArea" label="C.- Aislar el área de trabajo por medio de biombos, lonas, mamparas" value={anexoEnergias?.trabajosEnCaliente?.aislarArea as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'aislarArea', value)} />
                    <RadioGroupField id="taparAberturas" label="D.- Tapar toda abertura existente a fin de impedir dispersión de chispas" value={anexoEnergias?.trabajosEnCaliente?.taparAberturas as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'taparAberturas', value)} />
                    <RadioGroupField id="extintores" label="E.- Extintores portátiles en el área de trabajo" value={anexoEnergias?.trabajosEnCaliente?.extintores as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'extintores', value)} />
                    <RadioGroupField id="vigiaFuego" label="F - Vigía o supervisor de fuego de incendio" value={anexoEnergias?.trabajosEnCaliente?.vigiaFuego as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'vigiaFuego', value)} />
                    <RadioGroupField id="personalCapacitado" label="G - Personal capacitado, competente y entrenado" value={anexoEnergias?.trabajosEnCaliente?.personalCapacitado as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'personalCapacitado', value)} />
                    <RadioGroupField id="listasChequeo" label="H - Listas de chequeo pre-operacional de equipos" value={anexoEnergias?.trabajosEnCaliente?.listasChequeo as string} onChange={(value) => handleFieldChange('trabajosEnCaliente', 'listasChequeo', value)} />
                    <div className="flex items-center gap-2 pt-2"><Label htmlFor="calienteOtro">Otro (Cual):</Label><Input id="calienteOtro" value={anexoEnergias?.trabajosEnCaliente?.otro as string || ''} onChange={(e) => handleFieldChange('trabajosEnCaliente', 'otro', e.target.value)} /></div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Trabajos con Energías Peligrosas">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {['mecanica', 'neumatica', 'hidraulica', 'agua', 'vapor', 'termica', 'quimica'].map(id => (
                        <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={`energia_${id}`} checked={(anexoEnergias?.energiasPeligrosas?.[id] as boolean) || false} onCheckedChange={(checked) => handleCheckboxGroupChange('energiasPeligrosas', id, !!checked)} />
                            <Label htmlFor={`energia_${id}`} className="capitalize">{id}</Label>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mb-6"><Label htmlFor="energiaOtra">Otra:</Label><Input id="energiaOtra" value={anexoEnergias?.energiasPeligrosas?.otra as string || ''} onChange={(e) => handleFieldChange('energiasPeligrosas', 'otra', e.target.value)} /></div>

                <div className="space-y-3">
                    <RadioGroupField id="procedimientoLOTO" label="A.- Se cuenta procedimiento LO/TO" value={anexoEnergias?.procedimientoLOTO?.procedimientoLOTO as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'procedimientoLOTO', value)} />
                    <RadioGroupField id="identificadoFuentes" label="B.- Se han identificado las fuentes de energía" value={anexoEnergias?.procedimientoLOTO?.identificadoFuentes as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'identificadoFuentes', value)} />
                    <RadioGroupField id="purgadoLimpieza" label="C.- Purgado o limpieza del sistema" value={anexoEnergias?.procedimientoLOTO?.purgadoLimpieza as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'purgadoLimpieza', value)} />
                    <RadioGroupField id="corteVisible" label="1. Corte visible de fuentes de energía" value={anexoEnergias?.procedimientoLOTO?.corteVisible as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'corteVisible', value)} />
                    <RadioGroupField id="instalarBloqueo" label="2. Instalar dispositivos de bloqueo y tarjeta de bloqueo." value={anexoEnergias?.procedimientoLOTO?.instalarBloqueo as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'instalarBloqueo', value)} />
                    <RadioGroupField id="disiparEnergia" label="4. Disipar cualquier tipo de energía (puesta a tierra y en cortocircuito)." value={anexoEnergias?.procedimientoLOTO?.disiparEnergia as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'disiparEnergia', value)} />
                    <RadioGroupField id="verificarAusencia" label="3. Verificar ausencia de fuentes de energía" value={anexoEnergias?.procedimientoLOTO?.verificarAusencia as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'verificarAusencia', value)} />
                    <RadioGroupField id="senalizarZona" label="5. Señalizar y delimitar zona de trabajo." value={anexoEnergias?.procedimientoLOTO?.senalizarZona as string} onChange={(value) => handleFieldChange('procedimientoLOTO', 'senalizarZona', value)} />
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Trabajos con Energía Eléctrica">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nivel de Tensión</TableHead>
                            <TableHead>Límite de aproximación seguro</TableHead>
                            <TableHead>Límite de aproximación restringido</TableHead>
                            <TableHead>Límite de aproximación técnico</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell>0 V - 50 V</TableCell><TableCell>3,0 m</TableCell><TableCell>Evitar contacto</TableCell><TableCell>Evitar contacto</TableCell></TableRow>
                        <TableRow><TableCell>51 V - 300 V</TableCell><TableCell>3,0 m</TableCell><TableCell>1,0 m</TableCell><TableCell>Evitar contacto</TableCell></TableRow>
                        <TableRow><TableCell>301 V - 750 V</TableCell><TableCell>3,0 m</TableCell><TableCell>1,0 m</TableCell><TableCell>0,3 m</TableCell></TableRow>
                        <TableRow><TableCell>751 V - 15 kV</TableCell><TableCell>3,0 m</TableCell><TableCell>1,5 m</TableCell><TableCell>0,6 m</TableCell></TableRow>
                        <TableRow><TableCell>15,1 kV - 36 kV</TableCell><TableCell>3,0 m</TableCell><TableCell>1,8 m</TableCell><TableCell>0,7 m</TableCell></TableRow>
                        <TableRow><TableCell>36,1 kV - 72,5 kV</TableCell><TableCell>3,0 m</TableCell><TableCell>2,5 m</TableCell><TableCell>0,8 m</TableCell></TableRow>
                        <TableRow><TableCell>72,6 kV - 145 kV</TableCell><TableCell>3,0 m</TableCell><TableCell>3,0 m</TableCell><TableCell>1,0 m</TableCell></TableRow>
                    </TableBody>
                </Table>
            </SectionWrapper>
            
            <SectionWrapper title="Tensión a la cual el personal estará expuesto">
                 <div className="space-y-3">
                    <RadioGroupField id="muyBajaTension" label="Muy baja tensión (Tensiones menores de 25 V)." value={anexoEnergias?.tensionExpuesta?.muyBaja as string} onChange={(value) => handleFieldChange('tensionExpuesta', 'muyBaja', value)} />
                    <RadioGroupField id="bajaTension" label="Baja tensión (Tensión nominal mayor o igual 25 V y menor o igual a 1000 V)." value={anexoEnergias?.tensionExpuesta?.baja as string} onChange={(value) => handleFieldChange('tensionExpuesta', 'baja', value)} />
                    <RadioGroupField id="mediaTension" label="Media tensión (Tensión nominal superior a 1000 V e inferior a 57,5 kV)." value={anexoEnergias?.tensionExpuesta?.media as string} onChange={(value) => handleFieldChange('tensionExpuesta', 'media', value)} />
                    <RadioGroupField id="altaTension" label="Alta tensión (Tensiones mayores o iguales a 57,5 kV y menores o iguales a 230 kV)." value={anexoEnergias?.tensionExpuesta?.alta as string} onChange={(value) => handleFieldChange('tensionExpuesta', 'alta', value)} />
                    <RadioGroupField id="extraAltaTension" label="Extra alta tensión (Tensiones superiores a 230kV)" value={anexoEnergias?.tensionExpuesta?.extraAlta as string} onChange={(value) => handleFieldChange('tensionExpuesta', 'extraAlta', value)} />
                </div>
            </SectionWrapper>

            <SectionWrapper title="Planeación">
                <div className="space-y-3">
                    <RadioGroupField id="personalHabilitado" label="Personal habilitado, certificado de competencia laboral vigente (Conte, Conaltel, Matrícula profesional)" value={anexoEnergias?.planeacion?.personalHabilitado as string} onChange={(value) => handleFieldChange('planeacion', 'personalHabilitado', value)} />
                    <RadioGroupField id="viabilidadTecnica" label="El personal habilitado evalúa la viabilidad técnica (visita previa) y el riesgo asociado para las personas y para el sistema, cumpliendo las etapas de diagnóstico, planeación y ejecución de trabajos." value={anexoEnergias?.planeacion?.viabilidadTecnica as string} onChange={(value) => handleFieldChange('planeacion', 'viabilidadTecnica', value)} />
                    <RadioGroupField id="noSimultaneo" label="No se realizan trabajos simultáneos sin y con tensión por el mismo trabajador en la misma área de trabajo." value={anexoEnergias?.planeacion?.noSimultaneo as string} onChange={(value) => handleFieldChange('planeacion', 'noSimultaneo', value)} />
                    <RadioGroupField id="autorizacionMantenimiento" label="Autorización del área de mantenimiento" value={anexoEnergias?.planeacion?.autorizacionMantenimiento as string} onChange={(value) => handleFieldChange('planeacion', 'autorizacionMantenimiento', value)} />
                    <RadioGroupField id="revisionInfo" label="Revisión de información técnica del sistema (diagrama unifilar, planos)" value={anexoEnergias?.planeacion?.revisionInfo as string} onChange={(value) => handleFieldChange('planeacion', 'revisionInfo', value)} />
                    <RadioGroupField id="procedimientoNormalizado" label="Se cuenta con un procedimiento normalizado para realizar la actividad y ATS" value={anexoEnergias?.planeacion?.procedimientoNormalizado as string} onChange={(value) => handleFieldChange('planeacion', 'procedimientoNormalizado', value)} />
                    <RadioGroupField id="supervisionControl" label="Se realizar supervisión y control en el sitio de trabajo considerando en forma prioritaria la detección y el control de los riesgos, vigilando el cumplimiento estricto de las normas y procedimientos de seguridad aplicables" value={anexoEnergias?.planeacion?.supervisionControl as string} onChange={(value) => handleFieldChange('planeacion', 'supervisionControl', value)} />
                </div>
                <div className="mt-6">
                    <Label>Método de trabajo</Label>
                    <div className="flex gap-4 p-4 border rounded-md">
                        <div className="flex items-center space-x-2"><Checkbox id="metodoSinTension" checked={anexoEnergias?.metodoTrabajo?.sinTension || false} onCheckedChange={(checked) => handleFieldChange('metodoTrabajo', 'sinTension', !!checked)} /><Label htmlFor="metodoSinTension">Sin tensión</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="metodoConTension" checked={anexoEnergias?.metodoTrabajo?.conTension || false} onCheckedChange={(checked) => handleFieldChange('metodoTrabajo', 'conTension', !!checked)} /><Label htmlFor="metodoConTension">Con tensión</Label></div>
                    </div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Trabajo con Tensión (TCT) - igual o superior a 25 voltios">
                <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="trabajoConTensionCheck" checked={anexoEnergias?.trabajoConTension?.trabajoConTensionCheck as boolean} onCheckedChange={(checked) => handleFieldChange('trabajoConTension', 'trabajoConTensionCheck', !!checked)} />
                    <Label htmlFor="trabajoConTensionCheck">Trabajo con tensión - TCT, igual o superior a 25 voltios</Label>
                </div>
                 {(anexoEnergias?.trabajoConTension?.trabajoConTensionCheck) && <div className="space-y-3">
                    <Label>Método de trabajo</Label>
                    <div className="flex gap-4 p-4 border rounded-md">
                       <div className="flex items-center space-x-2"><Checkbox id="metodoAPotencial" checked={anexoEnergias?.trabajoConTension?.aPotencial as boolean} onCheckedChange={(checked) => handleFieldChange('trabajoConTension', 'aPotencial', !!checked)} /><Label htmlFor="metodoAPotencial">A potencial</Label></div>
                       <div className="flex items-center space-x-2"><Checkbox id="metodoADistancia" checked={anexoEnergias?.trabajoConTension?.aDistancia as boolean} onCheckedChange={(checked) => handleFieldChange('trabajoConTension', 'aDistancia', !!checked)} /><Label htmlFor="metodoADistancia">A distancia</Label></div>
                       <div className="flex items-center space-x-2"><Checkbox id="metodoAContacto" checked={anexoEnergias?.trabajoConTension?.aContacto as boolean} onCheckedChange={(checked) => handleFieldChange('trabajoConTension', 'aContacto', !!checked)} /><Label htmlFor="metodoAContacto">A contacto</Label></div>
                    </div>
                    <RadioGroupField id="respetarDistancias" label="Respetar distancias mínimas de seguridad con base en lo establecido en RETIE tablas 13.7, 13.8 y 18.1 (Límite de aproximación seguro, restringido, técnico)." value={anexoEnergias?.trabajoConTension?.respetarDistancias as string} onChange={(value) => handleFieldChange('trabajoConTension', 'respetarDistancias', value)} />
                    <RadioGroupField id="usoEppTCT" label="Uso de EPP especifico para trabajos con circuitos energizados..." value={anexoEnergias?.trabajoConTension?.usoEpp as string} onChange={(value) => handleFieldChange('trabajoConTension', 'usoEpp', value)} />
                </div>}
            </SectionWrapper>
            
            <SectionWrapper title="Trabajo sin Tensión">
                 <div className="space-y-3">
                    <RadioGroupField id="trabajoSinTensionCheck" label="Trabajo sin tensión" value={anexoEnergias?.trabajoSinTension?.trabajoSinTensionCheck as string} onChange={(value) => handleFieldChange('trabajoSinTension', 'trabajoSinTensionCheck', value)} />
                    <RadioGroupField id="analizarFuentes" label="Analizar fuentes de energía (fichas y diagrama de bloqueo)." value={anexoEnergias?.trabajoSinTension?.analizarFuentes as string} onChange={(value) => handleFieldChange('trabajoSinTension', 'analizarFuentes', value)} />
                    <RadioGroupField id="comprobarNadieExpuesto" label="Comprobar que nadie este expuesto a peligros." value={anexoEnergias?.trabajoSinTension?.comprobarNadieExpuesto as string} onChange={(value) => handleFieldChange('trabajoSinTension', 'comprobarNadieExpuesto', value)} />
                    <RadioGroupField id="aplicarLOTO" label="Aplicar procedimiento de bloqueo y aislamiento de energías, (Anexo 3). Hasta tanto no se haya aplicado a cabalidad las 5 reglas de oro y durante la aplicación de las mismas, se debe considerar el sistema energizado y cumplir los controles establecidos para sistemas energizados." value={anexoEnergias?.trabajoSinTension?.aplicarLOTO as string} onChange={(value) => handleFieldChange('trabajoSinTension', 'aplicarLOTO', value)} />
                    <RadioGroupField id="usoEppSinTension" label="Uso de EPP especifico para trabajos con circuitos energizados (aplica durante aplicación de 5 reglas de oro)..." value={anexoEnergias?.trabajoSinTension?.usoEpp as string} onChange={(value) => handleFieldChange('trabajoSinTension', 'usoEpp', value)} />
                 </div>
            </SectionWrapper>
             <div className="mt-4">
                <Label>OBSERVACIONES / SUPERVISIÓN DEL TRABAJO CON ALGÚN TIPO DE ENERGÍA</Label>
                <Input value={anexoEnergias?.observaciones || ''} onChange={(e) => handleInputChange('observaciones', e.target.value)} />
            </div>

        </div>
    );
}
