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

const accionRealizarOptions = [
    { id: 'levantar', label: 'Levantar' },
    { id: 'trasladar', label: 'Trasladar' },
    { id: 'montar', label: 'Montar' },
    { id: 'desmontar', label: 'Desmontar' },
    { id: 'cargar', label: 'Cargar' },
    { id: 'descargar', label: 'Descargar' },
];

const pesoCargaOptions = [
    { id: 'menor1000', label: 'Menor a 1000 kg' },
    { id: 'entre1000y2000', label: 'Entre 1000 kg y 2000 kg' },
    { id: 'entre2000y3000', label: 'Entre 2000 kg y 3000 kg' },
    { id: 'entre3000y4000', label: 'Entre 3000 kg y 4000 kg' },
    { id: 'entre4000y5000', label: 'Entre 4000 kg y 5000 kg' },
    { id: 'mas5000', label: 'Mas de 5000' },
];

const equipoUtilizarOptions = [
    { id: 'montacargas', label: 'Montacargas' },
    { id: 'camionGrua', label: 'Camión Grúa' },
    { id: 'gruaMovil', label: 'Grúa Móvil' },
    { id: 'torreGrua', label: 'Torre Grúa' },
    { id: 'retroexcavadora', label: 'Retroexcavadora' },
    { id: 'telehandler', label: 'Telehandler' },
];

const aspectosRequeridos = [
    { id: 'terrenoEstabilizado', label: 'A. Está estabilizado el terreno donde se encuentra el equipo de izaje.' },
    { id: 'operadorVisualiza', label: 'B. El operador visualiza bien la carga y la operación que va a realizar.' },
    { id: 'calculoTecnico', label: 'C. Se calculo tecnicamente la maniobra. (Se cuenta con plan de izaje de cargas).' },
    { id: 'areaSenalizada', label: 'D. Se encuentra señalizada y demarcada el área de trabajo.' },
    { id: 'capacidadVerificada', label: 'E. Se verifico la capacidad de cargue del equipo de izaje.' },
    { id: 'curiososRetirados', label: 'F. Se retiraron los curiosos del área de izaje y del radio del equipo de izaje.' },
    { id: 'comunicacionClara', label: 'G. Existe comunicación clara entre el operador, el encargado de la actividad y quienes participan en ella.' },
    { id: 'atsRealizado', label: 'H. Se realizo el ATS (Analisis de Trabajo Seguro) para la ejecución de la actividad.' },
    { id: 'elementosBuenEstado', label: 'I. Se encuentran en buen estado las eslingas, aparejos y demás elementos de sujeción o accesorios de izaje.' },
    { id: 'polinesBuenEstado', label: 'J. Los polines para nivelación de las grúas están en buen estado.' },
    { id: 'polinesEstables', label: 'K. Los polines quedan estables con respecto al terreno.' },
    { id: 'areaDespejada', label: 'L. Está dispuesta y despejada el área donde se colocarán los elementos a izar.' },
    { id: 'noPersonasBajoCarga', label: 'M. No existen personas bajo la carga izada.' },
    { id: 'areaMovimientoEvaluada', label: 'N. Se evaluó el área donde se va a llevar la carga izada y el área de movimiento de la carga.' },
    { id: 'distanciaRedesElectricas', label: 'O. La actividad esta realizándose con la distancia de redes électricas recomendada?' },
    { id: 'condicionesClimaticas', label: 'P. Las condiciones climiticas son buenas para la realización de la actividad?' },
    { id: 'equipoTierra', label: 'Q. El equipo tiene conexión a tierra?' },
    { id: 'sinMaterialCaida', label: 'R. Se verifico que no halla ningun material que pudiera caer arriba de la carga al ser izada?' },
    { id: 'senalizadorCapacitado', label: 'S. Hay un señalizador capacitado y entrenado para la actividad?' },
    { id: 'colaboradoresAfiliados', label: 'T. Se verifico que los colaboradores estén afiliados al Sistema de Seguridad Social (EPS, ARL, AFP).' },
];

const precaucionesControles = [
    { id: 'inspeccionGrua', label: 'INSPECCIÓN GRÚA/APAREJOS' },
    { id: 'vigiaLineasElectricas', label: 'VIGÍA PARA LÍNEAS ELÉCTRICAS' },
    { id: 'capacidadVsCarga', label: 'CAPACIDAD VS CARGA & LMI' },
    { id: 'apoyoTerreno', label: 'APOYO DEL TERRENO' },
    { id: 'certificacionOperador', label: 'CERTIFICACIÓN OPERADOR-RIGGER' },
    { id: 'comunicacionRadialLuminica', label: 'COMUNICACIÓN RADIAL/LUMÍNICA' },
    { id: 'planIzaje', label: 'PLAN DE IZAJE' },
    { id: 'planRescate', label: 'PLAN DE RESCATE' },
    { id: 'senalizacionDemarcacion', label: 'SEÑALIZACIÓN Y DEMARCACION AREA' },
    { id: 'eppObligatorio', label: 'EPP OBLIGATORIO' },
    { id: 'estabilizadoresTerreno', label: 'ESTABILIZADORES & TERRENO' },
    { id: 'climaSeguro', label: 'CLIMA SEGURO' },
];

export function AnexoIzajeStep() {
    const { state, dispatch } = usePermitForm();
    const { generalInfo, anexoIzaje } = state;
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);
    const [signingTarget, setSigningTarget] = React.useState<{ section: string; field?: string; index?: number } | null>(null);

    const handleUpdate = (payload: any) => {
        dispatch({ type: 'UPDATE_ANEXO_IZAJE', payload });
    };

    const handleNestedChange = (section: keyof typeof anexoIzaje, field: string, value: any) => {
        handleUpdate({ [section]: { ...(anexoIzaje as any)[section], [field]: value } });
    };
    
    const handleDeepNestedChange = (section: keyof typeof anexoIzaje.informacionGeneral, subSection: string, field: string, value: any) => {
        handleNestedChange('informacionGeneral', section as any, { ...((anexoIzaje.informacionGeneral as any)[section] || {}), [field]: value });
    };
    
    const handleDeepestNestedChange = (section: string, subSection: string, field: string, value: any) => {
        const mainSection = anexoIzaje[section as keyof typeof anexoIzaje] as any;
        const sub = mainSection?.[subSection] || {};

        handleNestedChange(section as keyof typeof anexoIzaje, subSection, {
            ...sub,
            [field]: value,
        });
    };

    const handleListChange = (section: 'validacion', list: 'autoridad' | 'responsable', index: number, field: keyof ValidacionDiaria, value: string) => {
        const currentList = (anexoIzaje[section] as any)?.[list] || [];
        const newList = [...currentList];
        newList[index] = { ...newList[index], [field]: value };
        handleNestedChange(section, list, newList);
    };

    React.useEffect(() => {
        if (!anexoIzaje.validacion) {
            const authorityValidation = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
            const responsibleValidation = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
            handleNestedChange('validacion', 'autoridad', authorityValidation);
            handleNestedChange('validacion', 'responsable', responsibleValidation);
        }
    }, [anexoIzaje.validacion]);

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
            handleDeepestNestedChange('cierre', subSection, 'firma', signature);
        } else {
             handleNestedChange(section as any, 'firma', signature);
        }
        
        setIsSignatureDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">Anexo de Izaje de Cargas</h2>
                <p className="text-muted-foreground text-sm">Complete la información requerida para el izaje de cargas.</p>
            </div>

            <SectionWrapper title="Información General del Anexo" defaultOpen>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Emitido por:</Label><Input value={generalInfo.nombreSolicitante || ''} readOnly disabled /></div>
                    <div><Label>Área de Trabajo:</Label><Input value={generalInfo.areaEspecifica || ''} readOnly disabled /></div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoIzaje.emergencia?.contacto || ''} onChange={(e) => handleNestedChange('emergencia', 'contacto', e.target.value)} /></div>
                    <div><Label>Teléfono:</Label><Input value={anexoIzaje.emergencia?.telefono || ''} onChange={(e) => handleNestedChange('emergencia', 'telefono', e.target.value)} /></div>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Información de la Carga y Equipo">
                 <div className="space-y-4">
                    <div>
                        <Label className="font-semibold">Acción a Realizar</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border rounded-md">
                            {accionRealizarOptions.map(o => (
                                <div key={o.id} className="flex items-center gap-2"><Checkbox id={`accion-${o.id}`} checked={anexoIzaje.informacionGeneral?.accion?.[o.id]} onCheckedChange={(c) => handleDeepNestedChange('accion', o.id, !!c)} /><Label htmlFor={`accion-${o.id}`}>{o.label}</Label></div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <Label className="font-semibold">Peso de la Carga</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border rounded-md">
                             {pesoCargaOptions.map(o => (
                                <div key={o.id} className="flex items-center gap-2"><Checkbox id={`peso-${o.id}`} checked={anexoIzaje.informacionGeneral?.pesoCarga?.[o.id]} onCheckedChange={(c) => handleDeepNestedChange('pesoCarga', o.id, !!c)} /><Label htmlFor={`peso-${o.id}`}>{o.label}</Label></div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <Label className="font-semibold">Equipo a Utilizar</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border rounded-md">
                             {equipoUtilizarOptions.map(o => (
                                <div key={o.id} className="flex items-center gap-2"><Checkbox id={`equipo-${o.id}`} checked={anexoIzaje.informacionGeneral?.equipoUtilizar?.[o.id]} onCheckedChange={(c) => handleDeepNestedChange('equipoUtilizar', o.id, !!c)} /><Label htmlFor={`equipo-${o.id}`}>{o.label}</Label></div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="capacidadEquipo" className="font-semibold">Capacidad del Equipo</Label>
                        <Input id="capacidadEquipo" value={anexoIzaje.informacionGeneral?.capacidadEquipo} onChange={(e) => handleNestedChange('informacionGeneral', 'capacidadEquipo', e.target.value)} />
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Aspectos Requeridos para Realizar Izaje">
                <div className="space-y-2">
                    {aspectosRequeridos.map(a => (
                        <RadioGroupField key={a.id} id={`aspecto-${a.id}`} label={a.label} value={anexoIzaje.aspectosRequeridos?.[a.id]} onChange={(v) => handleNestedChange('aspectosRequeridos', a.id, v)} />
                    ))}
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Precauciones y Controles Específicos">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border rounded-md">
                    {precaucionesControles.map(p => (
                        <div key={p.id} className="flex items-center gap-2"><Checkbox id={`preca-${p.id}`} checked={anexoIzaje.precauciones?.[p.id]} onCheckedChange={(c) => handleNestedChange('precauciones', p.id, !!c)} /><Label htmlFor={`preca-${p.id}`}>{p.label}</Label></div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper title="Autorizaciones">
                 <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
                        <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Area, estoy enterado del trabajo a realizar y apruebo su ejecucion bajo las medidas de seguridad contempladas en este permiso y sus documentos complementarios."</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Nombre Completo" value={anexoIzaje.autoridadArea?.nombre || ''} onChange={(e) => handleNestedChange('autoridadArea', 'nombre', e.target.value)} />
                            <Input type="time" placeholder="Hora" value={anexoIzaje.autoridadArea?.hora || ''} onChange={(e) => handleNestedChange('autoridadArea', 'hora', e.target.value)} />
                        </div>
                        <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('autoridadArea')}><Signature className="mr-2"/>Firmar</Button>
                        {anexoIzaje.autoridadArea?.firma && <img src={anexoIzaje.autoridadArea.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm font-semibold mb-2">Responsable del Trabajo</p>
                        <p className="text-xs text-muted-foreground mb-4">"Al firmar como Responsable del Trabajo / Ejecutor, Manifiesto que entiendo el trabajo que voy a realizar y los riesgos asosciados a este, dispongo de los recursos necesarios y  tomare las medidas de seguridad."</p>
                        <div className="grid grid-cols-2 gap-4">
                             <Input placeholder="Nombre Completo" value={anexoIzaje.responsableTrabajo?.nombre || ''} onChange={(e) => handleNestedChange('responsableTrabajo', 'nombre', e.target.value)} />
                             <Input type="time" placeholder="Hora" value={anexoIzaje.responsableTrabajo?.hora || ''} onChange={(e) => handleNestedChange('responsableTrabajo', 'hora', e.target.value)} />
                        </div>
                        <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('responsableTrabajo')}><Signature className="mr-2"/>Firmar</Button>
                        {anexoIzaje.responsableTrabajo?.firma && <img src={anexoIzaje.responsableTrabajo.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
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
                                {(anexoIzaje.validacion?.autoridad || []).map((v, i) => (
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
                                {(anexoIzaje.validacion?.responsable || []).map((v, i) => (
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
                        <RadioGroup value={anexoIzaje.cancelacion?.seCancelo || 'no'} onValueChange={(v) => handleNestedChange('cancelacion', 'seCancelo', v)} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="cancel-si" /><Label htmlFor="cancel-si">SI</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cancel-no" /><Label htmlFor="cancel-no">NO</Label></div>
                        </RadioGroup>
                        {anexoIzaje.cancelacion?.seCancelo === 'si' && (
                            <div className="space-y-3">
                                <Textarea placeholder="Razón de la cancelación" value={anexoIzaje.cancelacion.razon || ''} onChange={(e) => handleNestedChange('cancelacion', 'razon', e.target.value)} />
                                <Input placeholder="Nombre de quien cancela" value={anexoIzaje.cancelacion.nombre || ''} onChange={(e) => handleNestedChange('cancelacion', 'nombre', e.target.value)} />
                                <Input type="date" value={anexoIzaje.cancelacion.fecha || ''} onChange={(e) => handleNestedChange('cancelacion', 'fecha', e.target.value)} />
                                <Button variant="outline" className="w-full" onClick={() => openSignatureDialog('cancelacion')}><Signature className="mr-2"/>Firmar Cancelación</Button>
                                {anexoIzaje.cancelacion?.firma && <img src={anexoIzaje.cancelacion.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                            </div>
                        )}
                    </div>
                     <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold">Cierre del Permiso</h3>
                         <RadioGroup value={anexoIzaje.cierre?.seTermino || 'no'} onValueChange={(v) => handleNestedChange('cierre', 'seTermino', v)} className="flex gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id="cierre-si" /><Label htmlFor="cierre-si">SI</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="cierre-no" /><Label htmlFor="cierre-no">NO</Label></div>
                        </RadioGroup>
                        {anexoIzaje.cierre?.seTermino === 'si' && (
                            <div className="space-y-3">
                                <Textarea placeholder="Observaciones de cierre" value={anexoIzaje.cierre.observaciones || ''} onChange={(e) => handleNestedChange('cierre', 'observaciones', e.target.value)} />
                                <div className="p-3 border rounded-md">
                                    <p className="text-xs font-bold">Autoridad del Área</p>
                                    <Input placeholder="Nombre" value={anexoIzaje.cierre.autoridad?.nombre || ''} onChange={(e) => handleDeepestNestedChange('cierre', 'autoridad', 'nombre', e.target.value)} />
                                    <Input type="date" className="mt-2" value={anexoIzaje.cierre.autoridad?.fecha || ''} onChange={(e) => handleDeepestNestedChange('cierre', 'autoridad', 'fecha', e.target.value)} />
                                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre.autoridad')}><Signature className="mr-2"/>Firmar Cierre</Button>
                                    {anexoIzaje.cierre.autoridad?.firma && <img src={anexoIzaje.cierre.autoridad.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
                                </div>
                                <div className="p-3 border rounded-md">
                                    <p className="text-xs font-bold">Responsable del Trabajo</p>
                                    <Input placeholder="Nombre" value={anexoIzaje.cierre.responsable?.nombre || ''} onChange={(e) => handleDeepestNestedChange('cierre', 'responsable', 'nombre', e.target.value)} />
                                    <Input type="date" className="mt-2" value={anexoIzaje.cierre.responsable?.fecha || ''} onChange={(e) => handleDeepestNestedChange('cierre', 'responsable', 'fecha', e.target.value)} />
                                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre.responsable')}><Signature className="mr-2"/>Firmar Cierre</Button>
                                    {anexoIzaje.cierre.responsable?.firma && <img src={anexoIzaje.cierre.responsable.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />}
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
