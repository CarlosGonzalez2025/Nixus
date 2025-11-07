'use client';
import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ChevronDown, Signature } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';
import type { AutorizacionPersona, ValidacionDiaria } from '@/types';
import { Textarea } from '@/components/ui/textarea';

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

const aspectosRequeridos = [
    { id: 'distanciaSeguridad', label: 'A.- Regla de distancia de seguridad de 11 m de materiales combustibles e inflamables' },
    { id: 'medicionAtmosfera', label: 'B.- Medición de atmósfera explosiva (uso de medidor de atmósferas)' },
    { id: 'aislarArea', label: 'C.- Aislar el área de trabajo por medio de biombos, lonas, mamparas' },
    { id: 'taparAberturas', label: 'D.- Tapar toda abertura existente a fin de impedir dispersión de chispas' },
    { id: 'extintores', label: 'E.- Extintores portátiles en el área de trabajo' },
    { id: 'vigiaFuego', label: 'F - Vigía o supervisor de fuego de incendio' },
    { id: 'personalCapacitado', label: 'G - Personal capacitado, competente y entrenado' },
    { id: 'listasChequeo', label: 'H - Listas de chequeo pre-operacional de equipos' }
];

export function AnexoCalienteStep() {
    const { state, dispatch } = usePermitForm();
    const { generalInfo, anexoCaliente } = state;
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);
    const [signingTarget, setSigningTarget] = React.useState<{ section: string; field?: string; index?: number } | null>(null);

    const handleUpdate = (payload: any) => {
        dispatch({ type: 'UPDATE_ANEXO_CALIENTE', payload });
    };

    const handleNestedChange = (section: keyof typeof anexoCaliente, field: string, value: any) => {
        handleUpdate({ [section]: { ...(anexoCaliente as any)[section], [field]: value } });
    };

    const handleListChange = (section: 'validacion', list: 'autoridad' | 'responsable', index: number, field: keyof ValidacionDiaria, value: string) => {
        const currentList = [...((anexoCaliente[section] as any)?.[list] || [])];
        currentList[index] = { ...currentList[index], [field]: value };
        handleNestedChange(section, list, currentList);
    };

    React.useEffect(() => {
        if (!anexoCaliente.validacion || !anexoCaliente.validacion.autoridad || anexoCaliente.validacion.autoridad.length === 0) {
            const authorityValidation = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
            const responsibleValidation = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
            handleUpdate({ validacion: { autoridad: authorityValidation, responsable: responsibleValidation } });
        }
    }, [anexoCaliente.validacion]);

    const openSignatureDialog = (section: any, field?: string, index?: number) => {
        setSigningTarget({ section, field, index });
        setIsSignatureDialogOpen(true);
    };

    const handleSaveSignature = (signature: string) => {
        if (!signingTarget) return;
        const { section, field, index } = signingTarget;
    
        if (section.startsWith('validacion.')) {
            const [valSection, list] = section.split('.');
            handleListChange(valSection as 'validacion', list as 'autoridad' | 'responsable', index!, 'firma', signature);
        } else if (section.startsWith('cierre.')) {
            const [cierreSection, subSection] = section.split('.');
            handleNestedChange('cierre', subSection, { ...((anexoCaliente.cierre as any)?.[subSection] || {}), firma: signature });
        } else if (section === 'cancelacion') {
             handleNestedChange('cancelacion', 'firma', signature);
        } else {
             handleNestedChange(section as any, 'firma', signature);
        }
        
        setIsSignatureDialogOpen(false);
    };
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">Anexo de Trabajo en Caliente</h2>
                <p className="text-muted-foreground text-sm">Complete la información requerida para trabajos en caliente.</p>
            </div>

            <SectionWrapper title="Información General del Anexo" defaultOpen>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Emitido por:</Label><Input value={generalInfo.nombreSolicitante || ''} readOnly disabled /></div>
                    <div><Label>Área de Trabajo:</Label><Input value={generalInfo.areaEspecifica || ''} readOnly disabled /></div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoCaliente.emergencia?.contacto || ''} onChange={(e) => handleNestedChange('emergencia', 'contacto', e.target.value)} /></div>
                    <div><Label>Teléfono:</Label><Input value={anexoCaliente.emergencia?.telefono || ''} onChange={(e) => handleNestedChange('emergencia', 'telefono', e.target.value)} /></div>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Aspectos Requeridos para Trabajo en Caliente">
                <div className="space-y-2">
                    {aspectosRequeridos.map(a => (
                        <RadioGroupField key={a.id} id={`aspecto-${a.id}`} label={a.label} value={anexoCaliente.aspectosRequeridos?.[a.id] || 'na'} onChange={(v) => handleNestedChange('aspectosRequeridos', a.id, v)} />
                    ))}
                    <div className="flex items-center gap-2 pt-2"><Label htmlFor="calienteOtro">Otro (Cual):</Label><Input id="calienteOtro" value={anexoCaliente.aspectosRequeridos?.otro || ''} onChange={(e) => handleNestedChange('aspectosRequeridos', 'otro', e.target.value)} /></div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Autorizaciones">
                 <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
                        <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Area, estoy enterado del trabajo a realizar y apruebo su ejecucion bajo las medidas de seguridad contempladas en este permiso y sus documentos complementarios."</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Nombre Completo" value={anexoCaliente.autoridadArea?.nombre || ''} onChange={(e) => handleNestedChange('autoridadArea', 'nombre', e.target.value)} />
                            <Input type="time" placeholder="Hora" value={anexoCaliente.autoridadArea?.hora || ''} onChange={(e) => handleNestedChange('autoridadArea', 'hora', e.target.value)} />
                        </div>
                        <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('autoridadArea')}><Signature className="mr-2"/>Firmar</Button>
                        {anexoCaliente.autoridadArea?.firma && <img src={anexoCaliente.autoridadArea.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm font-semibold mb-2">Responsable del Trabajo</p>
                        <p className="text-xs text-muted-foreground mb-4">"Al firmar como Responsable del Trabajo / Ejecutor, Manifiesto que entiendo el trabajo que voy a realizar y los riesgos asosciados a este, dispongo de los recursos necesarios y tomare las medidas de seguridad."</p>
                        <div className="grid grid-cols-2 gap-4">
                             <Input placeholder="Nombre Completo" value={anexoCaliente.responsableTrabajo?.nombre || ''} onChange={(e) => handleNestedChange('responsableTrabajo', 'nombre', e.target.value)} />
                             <Input type="time" placeholder="Hora" value={anexoCaliente.responsableTrabajo?.hora || ''} onChange={(e) => handleNestedChange('responsableTrabajo', 'hora', e.target.value)} />
                        </div>
                        <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('responsableTrabajo')}><Signature className="mr-2"/>Firmar</Button>
                        {anexoCaliente.responsableTrabajo?.firma && <img src={anexoCaliente.responsableTrabajo.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                    </div>
                </div>
            </SectionWrapper>

             <SectionWrapper title="Validación y Cierre">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold">Autoridad del Área</h4>
                        <p className='text-xs text-muted-foreground'>Entiendo todas las condiciones de este trabajo y la responsabilidad de implementar las medidas de control establecidas.</p>
                         <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(anexoCaliente.validacion?.autoridad || []).map((v, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell><Input value={v.nombre} onChange={(e) => handleListChange('validacion', 'autoridad', i, 'nombre', e.target.value)} className="h-8" /></TableCell>
                                        <TableCell><Button variant="ghost" size="icon" onClick={() => openSignatureDialog('validacion.autoridad', undefined, i)}><Signature className="h-4 w-4"/></Button></TableCell>
                                        <TableCell><Input type="date" value={v.fecha} onChange={(e) => handleListChange('validacion', 'autoridad', i, 'fecha', e.target.value)} className="h-8" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold">Responsable del Trabajo/Ejecutor</h4>
                        <p className='text-xs text-muted-foreground'>Entiendo todas las condiciones de este trabajo y la responsabilidad de implementar las medidas de control establecidas.</p>
                         <Table>
                            <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(anexoCaliente.validacion?.responsable || []).map((v, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell><Input value={v.nombre} onChange={(e) => handleListChange('validacion', 'responsable', i, 'nombre', e.target.value)} className="h-8" /></TableCell>
                                        <TableCell><Button variant="ghost" size="icon" onClick={() => openSignatureDialog('validacion.responsable', undefined, i)}><Signature className="h-4 w-4"/></Button></TableCell>
                                        <TableCell><Input type="date" value={v.fecha} onChange={(e) => handleListChange('validacion', 'responsable', i, 'fecha', e.target.value)} className="h-8" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">Cancelación del Trabajo</h3>
                        <RadioGroup value={anexoCaliente.cancelacion?.seCancelo || 'no'} onValueChange={(v) => handleNestedChange('cancelacion', 'seCancelo', v)} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="cancel-si" /><Label htmlFor="cancel-si">SI</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cancel-no" /><Label htmlFor="cancel-no">NO</Label></div>
                        </RadioGroup>
                        {anexoCaliente.cancelacion?.seCancelo === 'si' && (
                            <div className="space-y-3">
                                <Textarea placeholder="Razón de la cancelación" value={anexoCaliente.cancelacion.razon || ''} onChange={(e) => handleNestedChange('cancelacion', 'razon', e.target.value)} />
                                <Input placeholder="Nombre de quien cancela" value={anexoCaliente.cancelacion.nombre || ''} onChange={(e) => handleNestedChange('cancelacion', 'nombre', e.target.value)} />
                                <Input type="date" value={anexoCaliente.cancelacion.fecha || ''} onChange={(e) => handleNestedChange('cancelacion', 'fecha', e.target.value)} />
                                <Button variant="outline" className="w-full" onClick={() => openSignatureDialog('cancelacion')}><Signature className="mr-2"/>Firmar Cancelación</Button>
                                {anexoCaliente.cancelacion?.firma && <img src={anexoCaliente.cancelacion.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                            </div>
                        )}
                    </div>
                     <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">Cierre del Permiso</h3>
                         <RadioGroup value={anexoCaliente.cierre?.seTermino || 'no'} onValueChange={(v) => handleNestedChange('cierre', 'seTermino', v)} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="cierre-si" /><Label htmlFor="cierre-si">SI</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cierre-no" /><Label htmlFor="cierre-no">NO</Label></div>
                        </RadioGroup>
                        {anexoCaliente.cierre?.seTermino === 'si' && (
                            <div className="space-y-3">
                                <Textarea placeholder="Observaciones de cierre" value={anexoCaliente.cierre.observaciones || ''} onChange={(e) => handleNestedChange('cierre', 'observaciones', e.target.value)} />
                                <div className="p-3 border rounded-md">
                                    <p className="text-xs font-bold">Autoridad del Área</p>
                                    <Input placeholder="Nombre" value={anexoCaliente.cierre.autoridad?.nombre || ''} onChange={(e) => handleNestedChange('cierre', 'autoridad', { ...anexoCaliente.cierre.autoridad, nombre: e.target.value })} />
                                    <Input type="date" className="mt-2" value={anexoCaliente.cierre.autoridad?.fecha || ''} onChange={(e) => handleNestedChange('cierre', 'autoridad', { ...anexoCaliente.cierre.autoridad, fecha: e.target.value })} />
                                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre.autoridad')}><Signature className="mr-2"/>Firmar Cierre</Button>
                                    {anexoCaliente.cierre.autoridad?.firma && <img src={anexoCaliente.cierre.autoridad.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                                </div>
                                <div className="p-3 border rounded-md">
                                    <p className="text-xs font-bold">Responsable del Trabajo</p>
                                    <Input placeholder="Nombre" value={anexoCaliente.cierre.responsable?.nombre || ''} onChange={(e) => handleNestedChange('cierre', 'responsable', { ...anexoCaliente.cierre.responsable, nombre: e.target.value })} />
                                    <Input type="date" className="mt-2" value={anexoCaliente.cierre.responsable?.fecha || ''} onChange={(e) => handleNestedChange('cierre', 'responsable', { ...anexoCaliente.cierre.responsable, fecha: e.target.value })} />
                                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre.responsable')}><Signature className="mr-2"/>Firmar Cierre</Button>
                                    {anexoCaliente.cierre.responsable?.firma && <img src={anexoCaliente.cierre.responsable.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
             </SectionWrapper>

            <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Registrar Firma</DialogTitle></DialogHeader>
                    <SignaturePad onSave={handleSaveSignature} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
