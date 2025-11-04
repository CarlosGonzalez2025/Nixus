
'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Signature, Trash2, Plus, ChevronDown } from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { AutorizacionPersona, ValidacionDiaria, AnexoAltura } from '@/types';

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
    { id: 'entrenadosCertificados', label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR   TRABAJOS EN ALTURA?'},
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

const SectionWrapper: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => (
    <Collapsible defaultOpen={defaultOpen}>
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

export function AnexoAlturaStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, anexoAltura } = state;
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);
  const [signingTarget, setSigningTarget] = React.useState<{ section: keyof AnexoAltura, field?: string, index?: number } | null>(null);

  const handleUpdate = (payload: Partial<AnexoAltura>) => {
    dispatch({ type: 'UPDATE_ANEXO_ALTURA', payload });
  };

  const handleNestedChange = (section: keyof AnexoAltura, field: string, value: any) => {
    const currentSection = (anexoAltura as any)[section] || {};
    handleUpdate({ [section]: { ...currentSection, [field]: value } });
  };
  
  const handleListChange = (section: 'validacion', list: 'autoridad' | 'responsable', index: number, field: keyof ValidacionDiaria, value: string) => {
    const currentList = [...(anexoAltura[section]?.[list] || [])];
    currentList[index] = { ...currentList[index], [field]: value };
    handleNestedChange(section, list, currentList);
  };
  
  const handleDeepNestedChange = (section: 'cierre', subSection: 'autoridad' | 'responsable', field: keyof AutorizacionPersona, value: string) => {
    const currentSubSection = anexoAltura[section]?.[subSection] || {};
    handleNestedChange(section, subSection, { ...currentSubSection, [field]: value });
  };

  React.useEffect(() => {
    if (!anexoAltura.validacion || !anexoAltura.validacion.autoridad || anexoAltura.validacion.autoridad.length === 0) {
      const autoridad = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
      const responsable = Array(7).fill(0).map((_, i) => ({ dia: i + 1, nombre: '', firma: '', fecha: '' }));
      handleUpdate({ validacion: { autoridad, responsable } });
    }
  }, []);

  const openSignatureDialog = (section: any, field?: string, index?: number) => {
    setSigningTarget({ section, field, index });
    setIsSignatureDialogOpen(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (!signingTarget) return;

    const { section, field, index } = signingTarget;

    if (section === 'validacion' && field && index !== undefined) {
      handleListChange('validacion', field as 'autoridad' | 'responsable', index, 'firma', signature);
    } else if (section === 'cierre' && field) {
      handleDeepNestedChange('cierre', field as 'autoridad' | 'responsable', 'firma', signature);
    } else if (section === 'cancelacion') {
      handleNestedChange('cancelacion', 'firma', signature);
    } else {
      handleNestedChange(section, 'firma', signature);
    }

    setIsSignatureDialogOpen(false);
    setSigningTarget(null);
  };

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
      
      <SectionWrapper title="Información General del Anexo" defaultOpen>
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
            <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoAltura.emergencia?.contacto || ''} onChange={(e) => handleNestedChange('emergencia', 'contacto', e.target.value)} /></div>
            <div><Label>Teléfono:</Label><Input value={anexoAltura.emergencia?.telefono || ''} onChange={(e) => handleNestedChange('emergencia', 'telefono', e.target.value)} /></div>
        </div>
        <div className="mt-4">
            <Label>Altura aproximada a la cual se va a desarrollar la actividad (Indicar en metros)</Label>
            <Input type="number" value={anexoAltura.alturaAproximada || ''} onChange={(e) => handleUpdate({ alturaAproximada: e.target.value })} />
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Identificación de Peligros y Aspectos para Trabajo en Alturas">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {anexoAlturaEstructuras.map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`struct-${item.id}`} 
                      checked={!!anexoAltura.tipoEstructura?.[item.id]} 
                      onCheckedChange={(checked) => handleNestedChange('tipoEstructura', item.id, !!checked)} 
                    />
                    <Label htmlFor={`struct-${item.id}`}>{item.label}</Label>
                </div>
            ))}
        </div>
        {anexoAltura.tipoEstructura?.otros && (
            <Input 
              placeholder="Especifique otros" 
              value={anexoAltura.tipoEstructura.otrosCual || ''} 
              onChange={(e) => handleNestedChange('tipoEstructura', 'otrosCual', e.target.value)} 
              className="mt-4" 
            />
        )}
      </SectionWrapper>

      <SectionWrapper title="Aspectos de Seguridad para Trabajo en Alturas">
        <div className="space-y-3">
            {anexoAlturaAspectos.map(item => (
                <RadioGroupField 
                  key={item.id} 
                  id={`aspecto-${item.id}`} 
                  label={item.label} 
                  value={anexoAltura.aspectosSeguridad?.[item.id] || 'na'} 
                  onChange={(value) => handleNestedChange('aspectosSeguridad', item.id, value)} 
                />
            ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Precauciones y Controles Específicos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {anexoAlturaPrecauciones.map(item => (
                <RadioGroupField 
                  key={item.id} 
                  id={`precaucion-${item.id}`} 
                  label={item.label} 
                  value={anexoAltura.precauciones?.[item.id] || 'na'} 
                  onChange={(value) => handleNestedChange('precauciones', item.id, value)} 
                />
            ))}
        </div>
         {anexoAltura.precauciones?.otro === 'si' && (
            <Input 
              placeholder="Especifique otra precaución" 
              value={anexoAltura.precauciones.otroCual || ''} 
              onChange={(e) => handleNestedChange('precauciones', 'otroCual', e.target.value)} 
              className="mt-4" 
            />
        )}
      </SectionWrapper>
      
       <SectionWrapper title="Afectaciones">
        <div className="space-y-4">
            <RadioGroupField 
              id="afect-riesgo-otras" 
              label="¿Este trabajo produce riesgos para otros trabajos en áreas adyacentes?" 
              value={anexoAltura.afectaciones?.riesgoOtrasAreas || 'na'} 
              onChange={(value) => handleNestedChange('afectaciones', 'riesgoOtrasAreas', value)} 
            />
            <RadioGroupField 
              id="afect-otras-riesgo" 
              label="¿Los otros trabajos en áreas adyacentes producen riesgo a este trabajo?" 
              value={anexoAltura.afectaciones?.otrasAreasRiesgo || 'na'} 
              onChange={(value) => handleNestedChange('afectaciones', 'otrasAreasRiesgo', value)} 
            />
            <RadioGroupField 
              id="afect-personal-notificado" 
              label="¿El personal del área potencialmente afectado y los trabajadores fueron notificados del trabajo a realizar?" 
              value={anexoAltura.afectaciones?.personalNotificado || 'na'} 
              onChange={(value) => handleNestedChange('afectaciones', 'personalNotificado', value)} 
            />
            <div>
              <Label>Observaciones:</Label>
              <Textarea 
                value={anexoAltura.afectaciones?.observaciones || ''} 
                onChange={(e) => handleNestedChange('afectaciones', 'observaciones', e.target.value)} 
              />
            </div>
        </div>
       </SectionWrapper>

        <SectionWrapper title="Autorizaciones">
            <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                    <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
                    <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Área, estoy enterado del trabajo a realizar y apruebo su ejecución bajo las medidas de seguridad contempladas en este permiso y sus documentos complementarios."</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                          placeholder="Nombre Completo" 
                          value={anexoAltura.autoridadArea?.nombre || ''} 
                          onChange={(e) => handleNestedChange('autoridadArea', 'nombre', e.target.value)} 
                        />
                        <Input 
                          type="time" 
                          placeholder="Hora" 
                          value={anexoAltura.autoridadArea?.hora || ''} 
                          onChange={(e) => handleNestedChange('autoridadArea', 'hora', e.target.value)} 
                        />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={() => openSignatureDialog('autoridadArea')}
                    >
                      <Signature className="mr-2"/>Firmar
                    </Button>
                    {anexoAltura.autoridadArea?.firma && (
                      <img src={anexoAltura.autoridadArea.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                    )}
                </div>
                
                <div className="p-4 border rounded-lg">
                    <p className="text-sm font-semibold mb-2">Responsable del Trabajo</p>
                    <p className="text-xs text-muted-foreground mb-4">"Manifiesto que entiendo el trabajo que voy a realizar y los riesgos asociados a este, dispongo de los recursos necesarios y tomaré las medidas de seguridad..."</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                          placeholder="Nombre Completo" 
                          value={anexoAltura.responsableTrabajo?.nombre || ''} 
                          onChange={(e) => handleNestedChange('responsableTrabajo', 'nombre', e.target.value)} 
                        />
                        <Input 
                          type="time" 
                          placeholder="Hora" 
                          value={anexoAltura.responsableTrabajo?.hora || ''} 
                          onChange={(e) => handleNestedChange('responsableTrabajo', 'hora', e.target.value)} 
                        />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={() => openSignatureDialog('responsableTrabajo')}
                    >
                      <Signature className="mr-2"/>Firmar
                    </Button>
                    {anexoAltura.responsableTrabajo?.firma && (
                      <img src={anexoAltura.responsableTrabajo.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                    )}
                </div>
                
                <div className="p-4 border rounded-lg">
                    <p className="text-sm font-semibold mb-2">Coordinador de Trabajos en Alturas</p>
                    <p className="text-xs text-muted-foreground mb-4">"Manifiesto que entiendo el trabajo que se va a realizar y sus peligros, se han verificado las condiciones y formulado las medidas de prevención necesarias."</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                          placeholder="Nombre Completo" 
                          value={anexoAltura.coordinadorTrabajosAltura?.nombre || ''} 
                          onChange={(e) => handleNestedChange('coordinadorTrabajosAltura', 'nombre', e.target.value)} 
                        />
                        <Input 
                          type="time" 
                          placeholder="Hora" 
                          value={anexoAltura.coordinadorTrabajosAltura?.hora || ''} 
                          onChange={(e) => handleNestedChange('coordinadorTrabajosAltura', 'hora', e.target.value)} 
                        />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4" 
                      onClick={() => openSignatureDialog('coordinadorTrabajosAltura')}
                    >
                      <Signature className="mr-2"/>Firmar
                    </Button>
                    {anexoAltura.coordinadorTrabajosAltura?.firma && (
                      <img src={anexoAltura.coordinadorTrabajosAltura.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                    )}
                </div>
            </div>
        </SectionWrapper>
        
        <SectionWrapper title="Validación Diaria">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">Autoridad del Área</h4>
                    <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Día</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Firma</TableHead>
                            <TableHead>Fecha</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(anexoAltura.validacion?.autoridad || []).map((v, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                      <Input 
                                        value={v.nombre || ''} 
                                        onChange={(e) => handleListChange('validacion', 'autoridad', i, 'nombre', e.target.value)} 
                                        className="h-8"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => openSignatureDialog('validacion', 'autoridad', i)}
                                      >
                                        <Signature className="h-4 w-4"/>
                                      </Button>
                                    </TableCell>
                                    <TableCell>
                                      <Input 
                                        type="date" 
                                        value={v.fecha || ''} 
                                        onChange={(e) => handleListChange('validacion', 'autoridad', i, 'fecha', e.target.value)} 
                                        className="h-8"
                                      />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">Responsable del Trabajo</h4>
                    <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Día</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Firma</TableHead>
                            <TableHead>Fecha</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                             {(anexoAltura.validacion?.responsable || []).map((v, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                      <Input 
                                        value={v.nombre || ''} 
                                        onChange={(e) => handleListChange('validacion', 'responsable', i, 'nombre', e.target.value)} 
                                        className="h-8"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => openSignatureDialog('validacion', 'responsable', i)}
                                      >
                                        <Signature className="h-4 w-4"/>
                                      </Button>
                                    </TableCell>
                                    <TableCell>
                                      <Input 
                                        type="date" 
                                        value={v.fecha || ''} 
                                        onChange={(e) => handleListChange('validacion', 'responsable', i, 'fecha', e.target.value)} 
                                        className="h-8"
                                      />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </SectionWrapper>

        <SectionWrapper title="Cancelación y Cierre">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Cancelación del Trabajo</h3>
                <RadioGroupField 
                  id="cancelacion-si-no" 
                  label="¿Se canceló el trabajo?" 
                  value={anexoAltura.cancelacion?.seCancelo || 'no'} 
                  onChange={(value) => handleNestedChange('cancelacion', 'seCancelo', value)} 
                />
                {anexoAltura.cancelacion?.seCancelo === 'si' && (
                    <div className="space-y-3">
                        <Textarea 
                          placeholder="Razón de la cancelación" 
                          value={anexoAltura.cancelacion.razon || ''} 
                          onChange={(e) => handleNestedChange('cancelacion', 'razon', e.target.value)} 
                        />
                        <Input 
                          placeholder="Nombre de quien cancela" 
                          value={anexoAltura.cancelacion.nombre || ''} 
                          onChange={(e) => handleNestedChange('cancelacion', 'nombre', e.target.value)} 
                        />
                         <Input 
                          type="date" 
                          value={anexoAltura.cancelacion.fecha || ''} 
                          onChange={(e) => handleNestedChange('cancelacion', 'fecha', e.target.value)} 
                        />
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => openSignatureDialog('cancelacion')}
                        >
                          <Signature className="mr-2"/>Firmar Cancelación
                        </Button>
                        {anexoAltura.cancelacion?.firma && (
                          <img src={anexoAltura.cancelacion.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                        )}
                    </div>
                )}
            </div>
             <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Cierre del Permiso</h3>
                <RadioGroupField 
                  id="cierre-si-no" 
                  label="¿Se terminó el trabajo?" 
                  value={anexoAltura.cierre?.seTermino || 'no'} 
                  onChange={(value) => handleNestedChange('cierre', 'seTermino', value)} 
                />
                {anexoAltura.cierre?.seTermino === 'si' && (
                    <div className="space-y-3">
                         <Textarea 
                          placeholder="Observaciones de cierre" 
                          value={anexoAltura.cierre.observaciones || ''} 
                          onChange={(e) => handleNestedChange('cierre', 'observaciones', e.target.value)} 
                        />
                        <div className="p-3 border rounded-md">
                            <p className="text-xs font-bold">Autoridad del Área</p>
                            <Input 
                              placeholder="Nombre" 
                              value={anexoAltura.cierre.autoridad?.nombre || ''} 
                              onChange={(e) => handleDeepNestedChange('cierre', 'autoridad', 'nombre', e.target.value)} 
                            />
                             <Input 
                              type="date" 
                              className="mt-2" 
                              value={anexoAltura.cierre.autoridad?.fecha || ''} 
                              onChange={(e) => handleDeepNestedChange('cierre', 'autoridad', 'fecha', e.target.value)} 
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2" 
                              onClick={() => openSignatureDialog('cierre', 'autoridad')}
                            >
                              <Signature className="mr-2"/>Firmar Cierre
                            </Button>
                            {anexoAltura.cierre.autoridad?.firma && (
                              <img src={anexoAltura.cierre.autoridad.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                            )}
                        </div>
                        <div className="p-3 border rounded-md">
                            <p className="text-xs font-bold">Responsable del Trabajo</p>
                            <Input 
                              placeholder="Nombre" 
                              value={anexoAltura.cierre.responsable?.nombre || ''} 
                              onChange={(e) => handleDeepNestedChange('cierre', 'responsable', 'nombre', e.target.value)} 
                            />
                            <Input 
                              type="date" 
                              className="mt-2" 
                              value={anexoAltura.cierre.responsable?.fecha || ''} 
                              onChange={(e) => handleDeepNestedChange('cierre', 'responsable', 'fecha', e.target.value)} 
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2" 
                              onClick={() => openSignatureDialog('cierre', 'responsable')}
                            >
                              <Signature className="mr-2"/>Firmar Cierre
                            </Button>
                            {anexoAltura.cierre.responsable?.firma && (
                              <img src={anexoAltura.cierre.responsable.firma} alt="Firma" className="mt-2 border rounded-md max-h-20" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </SectionWrapper>
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

    