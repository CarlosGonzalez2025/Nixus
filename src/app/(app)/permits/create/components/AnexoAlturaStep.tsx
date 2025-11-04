'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Signature, Trash2, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';

const anexoAlturaEstructuras = [
  { id: 'escaleraCuerpo', label: 'Escalera de un cuerpo' },
  { id: 'escaleraDosCuerpos', label: 'Escalera de dos cuerpos o mas' },
  { id: 'andamioTubular', label: 'Andamio Tubular Certificado' },
  { id: 'andamioColgante', label: 'Andamio Colgante' },
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'manLift', label: 'Man Lift o Camion Canasta' },
  { id: 'otros', label: 'Otros' },
];

const anexoAlturaAspectos = [
    { id: 'afiliacionVigente', label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL? '},
    { id: 'procedimientoActividad', label: 'B. SE CUENTA CON EL PROCEDIMIENTO DE LA ACTIVIDAD A EJECUTAR?' },
    { id: 'medidasPrevencion', label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
    { id: 'conocenMedidas', label: 'D. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?'},
    { id: 'entrenadosCertificados', label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR TRABAJOS EN ALTURA?'},
    { id: 'elementosProteccionCertificados', label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO Y CERTIFICADOS?' },
    { id: 'sistemaAseguramientoVerificado', label: 'G. SE VERIFICO EL SISTEMA DE ASEGURAMIENTO DE LA ESCALERA , ANDAMIO O PLATAFORMA A UNA ESTRUCTURA FIJA' },
    { id: 'estadoElementosVerificado', label: 'H. SE VERIFICO EL ESTADO DE: ESLINGAS, ARNES, CASCO, MOSQUETONES, CASCO, Y DEMAS ELEMENTOS NECESARIOS PARA REALIZAR EL TRABAJO.' },
    { id: 'puntosAnclajeCertificados', label: 'I. LOS PUNTOS DE ANCLAJE Y DEMAS ELEMENTOS CUMPLEN CON LA RESISTENCIA DE 5000 LBS POR PERSONA Y ESTAN CERTIFICADOS?' },
    { id: 'areaDelimitada', label: 'J. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO' },
    { id: 'personalSaludable', label: 'K. EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD PARA LA ACTIVIDAD?.' },
    { id: 'equiposAccesoBuenEstado', label: 'L. SE CUENTA CON TODOS LOS EQUIPOS Y SISTEMAS DE ACCESO PARA TRABJO EN ALTURAS EN BUEN ESTADO?' },
    { id: 'espacioCaidaLibreSuficiente', label: 'M. EL ESPACIO DE CAIDA LIBRE ES SUFICIENTE PARA EVITAR QUE LA PERSONA SE GOLPEE CONTRA EL NIVEL INFERIOR.' },
    { id: 'equiposEmergenciaDisponibles', label: 'N. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS EN EL AREA Y PLAN DE EMERGENCIAS PARA RESCATE EN ALTURAS?' },
    { id: 'eppSeleccionadosCorrectamente', label: 'O. ESTÁN LOS ELEMENTOS DE PROTECCIÓN PERSONAL SELECCIONADOS TENIENDO EN CUENTA LOS RIESGOS Y REQUERIMIENTOS DE LA TAREA?' },
    { id: 'plataformaSoportaCarga', label: 'P.LA PLATAFORMA O ESTRUCTURA SOPORTA LA CARGA DE TRABAJO, ES FIRME Y SE EVITA LA CAÍDA DE OBJETOS O HERRAMIENTAS?' },
    { id: 'supervisorConstante', label: 'Q.EXISTE UN SUPERVISOR O ACOMPAÑANTE CONSTASTE DURANTE EL TRABAJO' },
    { id: 'andamiosCompletos', label: 'R. EN CASO DE TRABAJOS SOBRE ANDAMIOS, ESTOS ESTAN COMPLETOS Y ADECUADAMENTE ARMADOS (RODAPIES, BARANDAS, ETC.)' },
    { id: 'condicionesClimaticasAdecuadas', label: 'S.LAS CONDICIONES CLIMATICAS SON ADECUADAS PARA REALIZAR EL TRABAJO' },
    { id: 'metodoSubirHerramientasSeguro', label: 'T.EL METODO DE SUBIR HERRAMIENTAS ES SEGURO' },
    { id: 'sistemasRestriccion', label: 'U. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE RESTRICCIÓN' },
    { id: 'sistemasPosicionamiento', label: 'V. EN CASO DE REQUERIRSE SE CUENTA CON SISTEMAS DE POSICIONAMIENTO' },
];

const anexoAlturaPrecauciones = [
    { id: 'despresurizar', label: 'DESPRESURIZAR' },
    { id: 'revisarEquipos', label: 'REVISAR EQUIPOS Y HERRAMIENTAS' },
    { id: 'sistemaContencionDerrames', label: 'SISTEMA CONTENCION DERRAMES' },
    { id: 'monitoreoAtmosferas', label: 'MONITOREO DE ATMOSFERAS' },
    { id: 'verificarListaChequeo', label: 'VERIFICAR LISTA DE CHEQUEO' },
    { id: 'clasificacionResiduos', label: 'CLASIFICACION DE RESIDUOS' },
    { id: 'aislamientoMecanico', label: 'AISLAMIENTO MECACNICO' },
    { id: 'aterrizarEquipo', label: 'ATERRIZAR EQUIPO' },
    { id: 'planIzaje', label: 'PLAN DE IZAJE' },
    { id: 'aislamientoProceso', label: 'AISLAMIENTO DE PROCESO' },
    { id: 'instalarLineasVida', label: 'INSTALAR LINEAS DE VIDA ADICIONALES' },
    { id: 'fichaSeguridad', label: 'FICHA DE SEGURIDAD' },
    { id: 'aislamientoElectrico', label: 'AISLAMIENTO ELECTRICO' },
    { id: 'drenar', label: 'DRENAR' },
    { id: 'cierreRecipientes', label: 'CIERRE DE RECIPIENTES SIN USO' },
    { id: 'bloqueoEtiquetado', label: 'BLOQUEO Y ETIQUETADO' },
    { id: 'ventilar', label: 'VENTILAR' },
    { id: 'usoEppEspeciales', label: 'USO DE EPPS ESPECIALES' },
    { id: 'etiquetadoProductosQuimicos', label: 'ETIQUETADO PRODUCTOS QUIMICOS' },
    { id: 'equipoContraIncendio', label: 'EQUIPO CONTRA INCENDIO' },
    { id: 'requiereVigia', label: 'REQUIERE VIGIA' },
    { id: 'senalizacion', label: 'SEÑALIZACION' },
    { id: 'kitDerrames', label: 'KIT DERRAMES' },
    { id: 'otro', label: 'OTRO, CUAL:' },
];


export function AnexoAlturaStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, anexoAltura } = state;
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);
  const [signingTarget, setSigningTarget] = React.useState<{ section: string; field: string; index?: number } | null>(null);

  const handleFieldChange = (section: keyof typeof anexoAltura, field: string, value: any) => {
    dispatch({
      type: 'UPDATE_ANEXO_ALTURA',
      payload: {
        [section]: {
          ...(anexoAltura as any)[section],
          [field]: value
        }
      }
    });
  };

  const handleCheckboxGroupChange = (section: keyof typeof anexoAltura, field: string, checked: boolean) => {
    const currentSection = (anexoAltura as any)[section] || {};
    handleFieldChange(section, field, checked);
  };
  
  const handleNestedFieldChange = (section: keyof typeof anexoAltura, subSection: string, field: string, value: any) => {
      const currentSectionData = (anexoAltura as any)[section] || {};
      const currentSubSectionData = currentSectionData[subSection] || {};
      handleFieldChange(section, subSection, { ...currentSubSectionData, [field]: value });
  };
  
  const handleListChange = (section: keyof typeof anexoAltura, listName: string, index: number, field: string, value: any) => {
      const currentSectionData = (anexoAltura as any)[section] || {};
      const list = [...(currentSectionData[listName] || [])];
      list[index] = { ...list[index], [field]: value };
      handleFieldChange(section, listName, list);
  };
  
  const addToList = (section: keyof typeof anexoAltura, listName: string, defaultItem: any) => {
      const currentSectionData = (anexoAltura as any)[section] || {};
      const list = [...(currentSectionData[listName] || [])];
      list.push(defaultItem);
      handleFieldChange(section, listName, list);
  };
  
  const removeFromList = (section: keyof typeof anexoAltura, listName: string, index: number) => {
      const currentSectionData = (anexoAltura as any)[section] || {};
      const list = (currentSectionData[listName] || []).filter((_: any, i: number) => i !== index);
      handleFieldChange(section, listName, list);
  };

  React.useEffect(() => {
    if (!anexoAltura.validacion?.autoridad || anexoAltura.validacion.autoridad.length < 7) {
      const autoridad = Array(7).fill(0).map((_, i) => anexoAltura.validacion?.autoridad?.[i] || { dia: i + 1, nombre: '', firma: '', fecha: '' });
      const responsable = Array(7).fill(0).map((_, i) => anexoAltura.validacion?.responsable?.[i] || { dia: i + 1, nombre: '', firma: '', fecha: '' });
      dispatch({ type: 'UPDATE_ANEXO_ALTURA', payload: { validacion: { autoridad, responsable } } });
    }
  }, [anexoAltura.validacion, dispatch]);

  const openSignatureDialog = (section: string, field: string, index?: number) => {
    setSigningTarget({ section, field, index });
    setIsSignatureDialogOpen(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (!signingTarget) return;

    const { section, field, index } = signingTarget;

    if (index !== undefined) {
      const list = [...(anexoAltura[section as keyof typeof anexoAltura] as any)[field]];
      list[index] = { ...list[index], firma: signature };
      handleFieldChange(section as keyof typeof anexoAltura, field, list);
    } else {
      handleNestedFieldChange(section as keyof typeof anexoAltura, field, 'firma', signature);
    }

    setIsSignatureDialogOpen(false);
    setSigningTarget(null);
  };

  const RadioGroupField = ({ id, label, value, onChange }: { id: string; label: string; value: 'si' | 'no' | 'na'; onChange: (value: 'si' | 'no' | 'na') => void; }) => (
    <div className="flex justify-between items-center p-3 border rounded-md bg-white">
        <Label htmlFor={id} className="text-sm font-medium flex-1">{label}</Label>
        <RadioGroup id={id} value={value || 'na'} onValueChange={onChange} className="flex gap-4">
            <div className="flex items-center space-x-2"><RadioGroupItem value="si" id={`${id}-si`} /><Label htmlFor={`${id}-si`}>SI</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`${id}-no`} /><Label htmlFor={`${id}-no`}>NO</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="na" id={`${id}-na`} /><Label htmlFor={`${id}-na`}>N/A</Label></div>
        </RadioGroup>
    </div>
  );

  return (
    <>
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Anexo de Trabajo en Alturas
        </h2>
        <p className="text-muted-foreground text-sm">
          Complete la información requerida para trabajos en alturas.
        </p>
      </div>
      
      {/* Información General Anexos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Información General del Anexo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Emitido por:</Label><Input value={generalInfo.nombreSolicitante || ''} readOnly disabled /></div>
            <div><Label>Área de Trabajo:</Label><Input value={generalInfo.areaEspecifica || ''} readOnly disabled /></div>
            <div><Label>Equipo o Área Específica:</Label><Input value={generalInfo.proceso || ''} readOnly disabled /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Responsable (Nombre):</Label><Input value={generalInfo.responsable?.nombre || ''} readOnly disabled /></div>
            <div><Label>Cargo:</Label><Input value={generalInfo.responsable?.cargo || ''} readOnly disabled /></div>
            <div><Label>Compañía:</Label><Input value={generalInfo.responsable?.compania || ''} readOnly disabled /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoAltura.emergencia?.contacto || ''} onChange={(e) => handleNestedFieldChange('emergencia', '', 'contacto', e.target.value)} /></div>
            <div><Label>Teléfono:</Label><Input value={anexoAltura.emergencia?.telefono || ''} onChange={(e) => handleNestedFieldChange('emergencia', '', 'telefono', e.target.value)} /></div>
        </div>
        <div>
            <Label>Altura aproximada a la cual se va a desarrollar la actividad (Indicar en metros)</Label>
            <Input type="number" value={anexoAltura.alturaAproximada || ''} onChange={(e) => handleFieldChange('alturaAproximada', '', e.target.value)} />
        </div>
      </div>
      
      {/* Identificación de Peligros y Aspectos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Identificación de Peligros y Aspectos para Trabajo en Alturas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {anexoAlturaEstructuras.map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={`struct-${item.id}`} checked={!!anexoAltura.tipoEstructura?.[item.id]} onCheckedChange={(checked) => handleCheckboxGroupChange('tipoEstructura', item.id, !!checked)} />
                    <Label htmlFor={`struct-${item.id}`}>{item.label}</Label>
                </div>
            ))}
        </div>
        {anexoAltura.tipoEstructura?.otros && (
            <Input placeholder="Especifique otros" value={anexoAltura.tipoEstructura.otrosCual || ''} onChange={(e) => handleNestedFieldChange('tipoEstructura', '', 'otrosCual', e.target.value)} />
        )}
      </div>

      {/* Aspectos de Seguridad */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Aspectos de Seguridad para Trabajo en Alturas
        </h3>
        <div className="space-y-3">
            {anexoAlturaAspectos.map(item => (
                <RadioGroupField key={item.id} id={`aspecto-${item.id}`} label={item.label} value={(anexoAltura.aspectosSeguridad as any)?.[item.id] || 'na'} onChange={(value) => handleCheckboxGroupChange('aspectosSeguridad', item.id, value)} />
            ))}
        </div>
      </div>

      {/* Precauciones y Controles */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Precauciones y Controles Específicos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {anexoAlturaPrecauciones.map(item => (
                <RadioGroupField key={item.id} id={`precaucion-${item.id}`} label={item.label} value={(anexoAltura.precauciones as any)?.[item.id] || 'na'} onChange={(value) => handleCheckboxGroupChange('precauciones', item.id, value)} />
            ))}
        </div>
         {anexoAltura.precauciones?.otro === 'si' && (
            <Input placeholder="Especifique otra precaución" value={anexoAltura.precauciones.otroCual || ''} onChange={(e) => handleNestedFieldChange('precauciones', '', 'otroCual', e.target.value)} />
        )}
      </div>
      
       {/* Afectaciones */}
       <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Afectaciones</h3>
        <RadioGroupField id="afect-riesgo-otras" label="¿Este trabajo produce riesgos para otros trabajos en áreas adyacentes?" value={anexoAltura.afectaciones?.riesgoOtrasAreas || 'na'} onChange={(value) => handleNestedFieldChange('afectaciones', '', 'riesgoOtrasAreas', value)} />
        <RadioGroupField id="afect-otras-riesgo" label="¿Los otros trabajos en áreas adyacentes producen riesgo a este trabajo?" value={anexoAltura.afectaciones?.otrasAreasRiesgo || 'na'} onChange={(value) => handleNestedFieldChange('afectaciones', '', 'otrasAreasRiesgo', value)} />
        <RadioGroupField id="afect-personal-notificado" label="¿El personal del área potencialmente afectado y los trabajadores fueron notificados del trabajo a realizar?" value={anexoAltura.afectaciones?.personalNotificado || 'na'} onChange={(value) => handleNestedFieldChange('afectaciones', '', 'personalNotificado', value)} />
        <div><Label>Observaciones:</Label><Textarea value={anexoAltura.afectaciones?.observaciones || ''} onChange={(e) => handleNestedFieldChange('afectaciones', '', 'observaciones', e.target.value)} /></div>
       </div>

        {/* Autorizaciones */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Autorizaciones</h3>
            {/* Autoridad del Área */}
            <div className="p-4 border rounded-lg">
                <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
                <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Área, estoy enterado del trabajo a realizar y apruebo su ejecución bajo las medidas de seguridad contempladas en este permiso y sus documentos complementarios."</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nombre Completo" value={anexoAltura.autoridadArea?.nombre || ''} onChange={(e) => handleNestedFieldChange('autoridadArea', '', 'nombre', e.target.value)} />
                    <Input type="time" placeholder="Hora" value={anexoAltura.autoridadArea?.hora || ''} onChange={(e) => handleNestedFieldChange('autoridadArea', '', 'hora', e.target.value)} />
                </div>
                 <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('autoridadArea', 'firma')}><Signature className="mr-2"/>Firmar</Button>
                 {anexoAltura.autoridadArea?.firma && <img src={anexoAltura.autoridadArea.firma} alt="Firma" className="mt-2 border rounded-md" />}
            </div>
            {/* Responsable del Trabajo */}
            <div className="p-4 border rounded-lg">
                <p className="text-sm font-semibold mb-2">Responsable del Trabajo</p>
                <p className="text-xs text-muted-foreground mb-4">"Manifiesto que entiendo el trabajo que voy a realizar y los riesgos asociados a este, dispongo de los recursos necesarios y tomaré las medidas de seguridad..."</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nombre Completo" value={anexoAltura.responsableTrabajo?.nombre || ''} onChange={(e) => handleNestedFieldChange('responsableTrabajo', '', 'nombre', e.target.value)} />
                    <Input type="time" placeholder="Hora" value={anexoAltura.responsableTrabajo?.hora || ''} onChange={(e) => handleNestedFieldChange('responsableTrabajo', '', 'hora', e.target.value)} />
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('responsableTrabajo', 'firma')}><Signature className="mr-2"/>Firmar</Button>
                {anexoAltura.responsableTrabajo?.firma && <img src={anexoAltura.responsableTrabajo.firma} alt="Firma" className="mt-2 border rounded-md" />}
            </div>
             {/* Coordinador */}
            <div className="p-4 border rounded-lg">
                <p className="text-sm font-semibold mb-2">Coordinador de Trabajos en Alturas</p>
                 <p className="text-xs text-muted-foreground mb-4">"Manifiesto que entiendo el trabajo que se va a realizar y sus peligros, se han verificado las condiciones y formulado las medidas de prevención necesarias."</p>
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nombre Completo" value={anexoAltura.coordinadorTrabajosAltura?.nombre || ''} onChange={(e) => handleNestedFieldChange('coordinadorTrabajosAltura', '', 'nombre', e.target.value)} />
                    <Input type="time" placeholder="Hora" value={anexoAltura.coordinadorTrabajosAltura?.hora || ''} onChange={(e) => handleNestedFieldChange('coordinadorTrabajosAltura', '', 'hora', e.target.value)} />
                </div>
                 <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('coordinadorTrabajosAltura', 'firma')}><Signature className="mr-2"/>Firmar</Button>
                 {anexoAltura.coordinadorTrabajosAltura?.firma && <img src={anexoAltura.coordinadorTrabajosAltura.firma} alt="Firma" className="mt-2 border rounded-md" />}
            </div>
        </div>
        
        {/* Validación Diaria */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Validación Diaria</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Autoridad */}
                <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">Autoridad del Área</h4>
                    <Table>
                        <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {anexoAltura.validacion?.autoridad.map((v, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell><Input value={v.nombre} onChange={(e) => handleListChange('validacion', 'autoridad', i, 'nombre', e.target.value)} className="h-8"/></TableCell>
                                    <TableCell><Button variant="ghost" size="icon" onClick={() => openSignatureDialog('validacion', 'autoridad', i)}><Signature className="h-4 w-4"/></Button></TableCell>
                                    <TableCell><Input type="date" value={v.fecha} onChange={(e) => handleListChange('validacion', 'autoridad', i, 'fecha', e.target.value)} className="h-8"/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 {/* Responsable */}
                <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">Responsable del Trabajo</h4>
                    <Table>
                        <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                        <TableBody>
                             {anexoAltura.validacion?.responsable.map((v, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell><Input value={v.nombre} onChange={(e) => handleListChange('validacion', 'responsable', i, 'nombre', e.target.value)} className="h-8"/></TableCell>
                                    <TableCell><Button variant="ghost" size="icon" onClick={() => openSignatureDialog('validacion', 'responsable', i)}><Signature className="h-4 w-4"/></Button></TableCell>
                                    <TableCell><Input type="date" value={v.fecha} onChange={(e) => handleListChange('validacion', 'responsable', i, 'fecha', e.target.value)} className="h-8"/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>

        {/* Cancelación y Cierre */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Cancelación del Trabajo</h3>
                <RadioGroupField id="cancelacion-si-no" label="¿Se canceló el trabajo?" value={anexoAltura.cancelacion?.seCancelo || 'no'} onChange={(value) => handleNestedFieldChange('cancelacion', '', 'seCancelo', value)} />
                {anexoAltura.cancelacion?.seCancelo === 'si' && (
                    <div className="space-y-3">
                        <Textarea placeholder="Razón de la cancelación" value={anexoAltura.cancelacion.razon || ''} onChange={(e) => handleNestedFieldChange('cancelacion', '', 'razon', e.target.value)} />
                        <Input placeholder="Nombre de quien cancela" value={anexoAltura.cancelacion.nombre || ''} onChange={(e) => handleNestedFieldChange('cancelacion', '', 'nombre', e.target.value)} />
                         <Input type="date" value={anexoAltura.cancelacion.fecha || ''} onChange={(e) => handleNestedFieldChange('cancelacion', '', 'fecha', e.target.value)} />
                        <Button variant="outline" className="w-full" onClick={() => openSignatureDialog('cancelacion', 'firma')}><Signature className="mr-2"/>Firmar Cancelación</Button>
                        {anexoAltura.cancelacion?.firma && <img src={anexoAltura.cancelacion.firma} alt="Firma" className="mt-2 border rounded-md" />}
                    </div>
                )}
            </div>
             <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Cierre del Permiso</h3>
                <RadioGroupField id="cierre-si-no" label="¿Se terminó el trabajo?" value={anexoAltura.cierre?.seTermino || 'no'} onChange={(value) => handleNestedFieldChange('cierre', '', 'seTermino', value)} />
                {anexoAltura.cierre?.seTermino === 'si' && (
                    <div className="space-y-3">
                         <Textarea placeholder="Observaciones de cierre" value={anexoAltura.cierre.observaciones || ''} onChange={(e) => handleNestedFieldChange('cierre', '', 'observaciones', e.target.value)} />
                        <div className="p-3 border rounded-md">
                            <p className="text-xs font-bold">Autoridad del Área</p>
                            <Input placeholder="Nombre" value={anexoAltura.cierre.autoridad?.nombre || ''} onChange={(e) => handleNestedFieldChange('cierre', 'autoridad', 'nombre', e.target.value)} />
                             <Input type="date" className="mt-2" value={anexoAltura.cierre.autoridad?.fecha || ''} onChange={(e) => handleNestedFieldChange('cierre', 'autoridad', 'fecha', e.target.value)} />
                            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre', 'autoridad')}><Signature className="mr-2"/>Firmar Cierre</Button>
                            {anexoAltura.cierre.autoridad?.firma && <img src={anexoAltura.cierre.autoridad.firma} alt="Firma" className="mt-2 border rounded-md" />}
                        </div>
                        <div className="p-3 border rounded-md">
                            <p className="text-xs font-bold">Responsable del Trabajo</p>
                            <Input placeholder="Nombre" value={anexoAltura.cierre.responsable?.nombre || ''} onChange={(e) => handleNestedFieldChange('cierre', 'responsable', 'nombre', e.target.value)} />
                            <Input type="date" className="mt-2" value={anexoAltura.cierre.responsable?.fecha || ''} onChange={(e) => handleNestedFieldChange('cierre', 'responsable', 'fecha', e.target.value)} />
                            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre', 'responsable')}><Signature className="mr-2"/>Firmar Cierre</Button>
                            {anexoAltura.cierre.responsable?.firma && <img src={anexoAltura.cierre.responsable.firma} alt="Firma" className="mt-2 border rounded-md" />}
                        </div>
                    </div>
                )}
            </div>
        </div>

    </div>
    <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Firma</DialogTitle>
        </DialogHeader>
        <SignaturePad onSave={handleSaveSignature} />
      </DialogContent>
    </Dialog>
  </>
  );
}
