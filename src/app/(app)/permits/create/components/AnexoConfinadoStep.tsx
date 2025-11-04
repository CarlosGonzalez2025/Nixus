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


const identificacionPeligros = [
  { id: 'fuentesEnergiaAisladas', label: 'A. ESTAN LAS FUENTES DE ENERGIA (ELECTRICA, MECANICA, HIDRAULICA, TERMICA NEUMATICA) AISLADAS' },
  { id: 'ejecutantesConocenMedidas', label: 'B. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?' },
  { id: 'ejecutantesEntrenados', label: 'C. ESTÁN LOS EJECUTANTES ENTRENADOS' },
  { id: 'entradasSalidasFlujoBloqueadas', label: 'D. ESTAN BLOQUEADAS LAS ENTRADAS Y SALIDAS DE FLUJO - SE INSTALARON AISLAMIENTOS (COLOMBINAS, CIEGOS)' },
  { id: 'areaDelimitada', label: 'E. ESTA DELIMITADA Y SEÑALIZADA EL AREA DE TRABAJO PARA PREVENIR EL INGRESO AL ESPACIO CONFINADO DE PERSONAL NO AUTORIZADO O AJENO A LA ACTIVIDAD' },
  { id: 'monitorAtmosferasCalibrado', label: 'F. SE TIENE EN SITIO UN MONITOR DE ATMOSFERAS PELIGROSAS, CALIBRADO' },
  { id: 'equiposIluminacionExplosion', label: 'G. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE ILUMINACION, Y LAS CONEXIONES DE LOS EQUIPOS' },
  { id: 'equiposVentilacionExplosion', label: 'H. SON A PRUEBA DE EXPLOSION LOS EQUIPOS DE VENTILACION O SUMINISTRO DE AIRE FORZADO Y SUS CONEXIONES' },
  { id: 'medidasSeguridadEquiposNoExplosion', label: 'I. EN CASO DE QUE LOS EQUIPOS NO SEAN A PRUEBA DE EXPLOSION SE SE TOMARON LAS MEDIDAS DE SEGURUDAD NECESARIA PARA EVITAR RIESGOS' },
  { id: 'equiposVentilacionSuficientes', label: 'J. LOS EQUIPOS DE VENTILACION ESTAN DISPONIBLES Y SON SUFICIENTES' },
  { id: 'chequeoVentilacionMecanica', label: 'CHEQUEO DE VENTILACION MECANICA' },
  { id: 'chequeoVentilacionNatural', label: 'CHEQUEO DE VENTILACION (SOLO NATURAL)' },
  { id: 'equiposRespiracionAutonoma', label: 'K. ESTAN DISPONIBLES EN EL SITIO EQUIPOS DE RESPIRACION AUTONOMA (AUTOCONTENIDO) EN CASO DE EMERGENCIA' },
  { id: 'elementosAtencionEmergencias', label: 'L. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS EN EL AREA' },
  { id: 'planEmergenciaRescate', label: 'M. SE CUENTA CON PLAN DE EMERGENCIA PARA RESCATE' },
  { id: 'hojasSeguridadDisponibles', label: 'N. ESTAN DISPONIBLES LAS HOJAS DE SEGURIDAD DE PRODUCTOS QUIMICOS EN CASO DE USARSE.' },
  { id: 'verificadoConexionesPuestaTierra', label: 'Ñ.SE HA VERIFICADO EL ESTADO DE CONEXIONES Y PUESTA A TIERRA DE EQUIPOS Y ELEMENTOS A USAR.' },
  { id: 'vigiaPermanente', label: 'O.SE VERIFICA QUE PARA EL INGRESO A ESPACIOS CONFIANDOS SE CUENTE CON UN VIGIA PERMANENTE EN EL AREA' },
  { id: 'herramientasAdecuadas', label: 'P. SE VERIFICO QUE LAS HERRAMIENTAS MANUALES Y OTROS ELEMENTOS SEAN LOS ADECUADOS PARA LAS CONDICIONES Y ATMOSFERAS DEL LUGAR' },
  { id: 'personalSaludable', label: 'Q.EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD PARA LA ACTIVIDAD' },
  { id: 'verificadoEpp', label: 'R.SE VERIFICO EL EQUIPO Y ELEMENTOS DE PROTECCION PERSONAL A UTILIZAR' },
  { id: 'circunstanciaModificadora', label: 'S.EXISTE ALGUNA CIRCUSTANCIA O FACTOR QUE PUEDA MODIFICAR EL TRABAJO' },
  { id: 'equiposIntrinsecamenteSeguros', label: 'SE HA VERIFICADO QUE LOS EQUIPOS A USARSE SON INTRINSICAMENTE SEGUROS' },
  { id: 'procedimientoComunicacion', label: 'SE CUENTA CON PROCEDMIENTO DE COMUNICACIÓN CUAL ?' }
];

const peligroSections: { title: string, items: string[] }[] = [
    { title: "Aislamiento y Preparación del Área", items: ['fuentesEnergiaAisladas', 'entradasSalidasFlujoBloqueadas', 'areaDelimitada'] },
    { title: "Personal y Entrenamiento", items: ['ejecutantesConocenMedidas', 'ejecutantesEntrenados', 'personalSaludable', 'vigiaPermanente'] },
    { title: "Equipos y Monitoreo", items: ['monitorAtmosferasCalibrado', 'equiposIluminacionExplosion', 'equiposVentilacionExplosion', 'medidasSeguridadEquiposNoExplosion', 'equiposVentilacionSuficientes', 'chequeoVentilacionMecanica', 'chequeoVentilacionNatural', 'equiposIntrinsecamenteSeguros'] },
    { title: "Emergencias y Rescate", items: ['equiposRespiracionAutonoma', 'elementosAtencionEmergencias', 'planEmergenciaRescate'] },
    { title: "Materiales y Herramientas", items: ['hojasSeguridadDisponibles', 'verificadoConexionesPuestaTierra', 'herramientasAdecuadas', 'verificadoEpp'] },
    { title: "Condiciones Adicionales", items: ['circunstanciaModificadora', 'procedimientoComunicacion'] }
];


const precaucionesControles = [
    { id: 'despresurizar', label: 'DESPRESURIZAR' },
    { id: 'revisarEquipos', label: 'REVISAR EQUIPOS Y HERRAMIENTAS' },
    { id: 'monitoreoAtmosferas', label: 'MONITOREO DE ATMOSFERAS' },
    { id: 'drenarVentilar', label: 'DRENAR Y VENTILAR' },
    { id: 'aislamientoEnergias', label: 'AISLAMIENTO DE ENERGIAS' },
    { id: 'aterrizarEquipo', label: 'ATERRIZAR EQUIPO' },
    { id: 'equipoContraIncendio', label: 'EQUIPO CONTRA INCENDIO' },
    { id: 'instalarLineasVida', label: 'INSTALAR LINEAS DE VIDA ADICIONALES' },
    { id: 'usoEppsEspeciales', label: 'USO DE EPPS ESPECIALES' },
    { id: 'hojaSeguridadMsds', label: 'HOJA DE SEGURIDAD MSDS' },
    { id: 'bloqueoEtiquetado', label: 'BLOQUEO Y ETIQUETADO' },
    { id: 'requiereVigia', label: 'REQUIERE VIGIA' },
    { id: 'etiquetadoProductosQuimicos', label: 'ETIQUETADO PRODUCTOS QUIMICOS' },
    { id: 'clasificacionResiduos', label: 'CLASIFICACION DE RESIDUOS' },
    { id: 'senalizacion', label: 'SEÑALIZACION' },
    { id: 'sistemaContencionDerrames', label: 'SISTEMA DE CONTENCION DE DERRAMES' }
];

const requerimientosEquipos = [
    { id: 'arnesLineasVida', label: 'ARNES DE SEGURIDAD, LINEAS DE VIDA PARA PERSONAS QUE INGRESAN Y SALEN' },
    { id: 'equiposIzar', label: 'EQUIPOS PARA IZAR (CUERDAS, CABLES, ETC)' },
    { id: 'equiposComunicaciones', label: 'EQUIPOS DE COMUNICACIONES' },
    { id: 'equiposAutonomos', label: 'EQUIPOS AUTONOMOS PARA PERSONAS DE ENTRADA Y SALIDA' },
    { id: 'extintores', label: 'EXTINTORES' },
    { id: 'ropaDotacionEspecial', label: 'ROPA Y DOTACION ESPECIAL DE PROTECCION' },
    { id: 'bloqueosAislamientos', label: 'BLOQUEOS / AISLAMIENTOS /SALIDA ' },
    { id: 'lineasElectricasChequeadas', label: 'LÍNEAS ELÉCTRICAS: EXPUESTAS, OCULTAS ESTÁN CHEQUEADAS' },
    { id: 'areaSegura', label: 'AREA SEGURA' },
    { id: 'personalSeguridadCierre', label: 'PRESONAL DE SEGURIDAD DE CIERRE?' },
    { id: 'equipoRecuperacionEmergencia', label: 'EQUIPO DE RECUPERACION DE EMERGENCIA' },
    { id: 'iluminacionEquiposExplosion', label: 'ILUMINACION Y EQUIPOS A PRUEBA DE EXPLOSION' }
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

export function AnexoConfinadoStep() {
  const { state, dispatch } = usePermitForm();
  const { generalInfo, anexoConfinado } = state;
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);
  const [signingTarget, setSigningTarget] = React.useState<{ section: string; field: string; index?: number } | null>(null);

  const handleFieldChange = (field: string, value: any) => {
    dispatch({
      type: 'UPDATE_ANEXO_CONFINADO',
      payload: { [field]: value }
    });
  };

  const handleNestedFieldChange = (section: keyof typeof anexoConfinado, field: string, value: any) => {
      const currentSectionData = (anexoConfinado as any)[section] || {};
      handleFieldChange(section, { ...currentSectionData, [field]: value });
  };
  
  const handleListChange = (section: keyof typeof anexoConfinado, listName: string, index: number, field: string, value: any) => {
      const currentSectionData = (anexoConfinado as any)[section] || {};
      const list = [...(currentSectionData[listName] || [])];
      list[index] = { ...list[index], [field]: value };
      handleNestedFieldChange(section, listName, list);
  };
  
  const addToList = (section: keyof typeof anexoConfinado, listName: string, defaultItem: any) => {
      const currentSectionData = (anexoConfinado as any)[section] || {};
      const list = [...(currentSectionData[listName] || [])];
      if (list.length >= 4 && listName === 'pruebas') {
          return; // Limit to 4
      }
      list.push(defaultItem);
      handleNestedFieldChange(section, listName, list);
  };
  
  const removeFromList = (section: keyof typeof anexoConfinado, listName: string, index: number) => {
      const currentSectionData = (anexoConfinado as any)[section] || {};
      const list = (currentSectionData[listName] || []).filter((_: any, i: number) => i !== index);
      handleNestedFieldChange(section, listName, list);
  };
  
  React.useEffect(() => {
    if (!anexoConfinado?.validacion?.autoridad || anexoConfinado.validacion.autoridad.length < 7) {
      const autoridad = Array(7).fill(0).map((_, i) => anexoConfinado?.validacion?.autoridad?.[i] || { dia: i + 1, nombre: '', firma: '', fecha: '' });
      const responsable = Array(7).fill(0).map((_, i) => anexoConfinado?.validacion?.responsable?.[i] || { dia: i + 1, nombre: '', firma: '', fecha: '' });
      dispatch({ type: 'UPDATE_ANEXO_CONFINADO', payload: { validacion: { autoridad, responsable } } });
    }
  }, [anexoConfinado?.validacion, dispatch]);

  const openSignatureDialog = (section: string, field: string, index?: number) => {
    setSigningTarget({ section, field, index });
    setIsSignatureDialogOpen(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (!signingTarget) return;
    const { section, field, index } = signingTarget;

    if (section === 'resultadosPruebasGases' && field === 'firmaQuienRealiza') {
      handleNestedFieldChange('resultadosPruebasGases', 'firmaQuienRealiza', signature);
    } else if (section === 'pruebasGasesPeriodicas' && field === 'pruebas' && index !== undefined) {
      handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'firma', signature);
    } else if (section === 'validacion' && (field === 'autoridad' || field === 'responsable') && index !== undefined) {
      handleListChange('validacion', field, index, 'firma', signature);
    } else if (section === 'cancelacion' && field === 'firma') {
      handleNestedFieldChange('cancelacion', 'firma', signature);
    } else if (section === 'cierre' && (field === 'autoridad' || field === 'responsable')) {
        const currentCierreData = (anexoConfinado as any)['cierre'] || {};
        const currentSignatureData = currentCierreData[field] || {};
        handleNestedFieldChange('cierre', field, { ...currentSignatureData, firma: signature });
    } else {
       handleNestedFieldChange(section as keyof typeof anexoConfinado, 'firma', signature);
    }
    
    setIsSignatureDialogOpen(false);
    setSigningTarget(null);
  };

  const SectionWrapper: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer border">
          <h3 className="text-lg font-bold text-gray-700">{title}</h3>
          <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border-l border-r border-b rounded-b-lg">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <>
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Anexo de Espacios Confinados
        </h2>
        <p className="text-muted-foreground text-sm">
          Complete la información requerida para trabajos en espacios confinados.
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
          <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoConfinado?.emergencia?.contacto || ''} onChange={(e) => handleNestedFieldChange('emergencia', 'contacto', e.target.value)} /></div>
          <div><Label>Teléfono:</Label><Input value={anexoConfinado?.emergencia?.telefono || ''} onChange={(e) => handleNestedFieldChange('emergencia', 'telefono', e.target.value)} /></div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Identificación de Peligros y Aspectos">
        <div className="space-y-2">
            {peligroSections.map((section) => (
                <Collapsible key={section.title}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-4 border rounded-lg">
                            <span className="font-semibold text-gray-700">{section.title}</span>
                            <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg space-y-3">
                        {section.items.map(itemId => {
                            const item = identificacionPeligros.find(p => p.id === itemId);
                            if (!item) return null;
                            return (
                                <div key={item.id} className="space-y-2">
                                    <RadioGroupField
                                        id={`peligro-${item.id}`}
                                        label={item.label}
                                        value={(anexoConfinado?.identificacionPeligros as any)?.[item.id] || 'na'}
                                        onChange={(value) => handleNestedFieldChange('identificacionPeligros', item.id, value)}
                                    />
                                    {item.id === 'procedimientoComunicacion' && anexoConfinado?.identificacionPeligros?.procedimientoComunicacion === 'si' && (
                                        <Input
                                            className="ml-8 w-[calc(100%-2rem)]"
                                            placeholder="Cuál procedimiento de comunicación?"
                                            value={anexoConfinado?.procedimientoComunicacionCual || ''}
                                            onChange={(e) => handleFieldChange('procedimientoComunicacionCual', e.target.value)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Precauciones y Controles Específicos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {precaucionesControles.map(item => (
                <RadioGroupField key={item.id} id={`precaucion-${item.id}`} label={item.label} value={(anexoConfinado?.precauciones as any)?.[item.id] || 'na'} onChange={(value) => handleNestedFieldChange('precauciones', item.id, value)} />
            ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Resultados de Pruebas de Gases">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div><Label>LEL (0%)</Label><Input value={anexoConfinado?.resultadosPruebasGases?.lel || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'lel', e.target.value)} /></div>
            <div><Label>O2 (19.5-22%)</Label><Input value={anexoConfinado?.resultadosPruebasGases?.o2 || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'o2', e.target.value)} /></div>
            <div><Label>H2S (0-10 PPM)</Label><Input value={anexoConfinado?.resultadosPruebasGases?.h2s || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'h2s', e.target.value)} /></div>
            <div><Label>CO (0-25 PPM)</Label><Input value={anexoConfinado?.resultadosPruebasGases?.co || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'co', e.target.value)} /></div>
            <div className="col-span-2"><Label>Otros</Label><Input value={anexoConfinado?.resultadosPruebasGases?.otros || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'otros', e.target.value)} /></div>
            <div><Label>Serial Monitor</Label><Input value={anexoConfinado?.resultadosPruebasGases?.serialMonitor || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'serialMonitor', e.target.value)} /></div>
            <div><Label>Hora Prueba</Label><Input type="time" value={anexoConfinado?.resultadosPruebasGases?.horaPrueba || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'horaPrueba', e.target.value)} /></div>
            <div className="col-span-full"><Label>Nombre de quien realiza</Label><Input value={anexoConfinado?.resultadosPruebasGases?.nombreQuienRealiza || ''} onChange={e => handleNestedFieldChange('resultadosPruebasGases', 'nombreQuienRealiza', e.target.value)} /></div>
            <div className="col-span-full">
                <Button variant="outline" className="w-full" onClick={() => openSignatureDialog('resultadosPruebasGases', 'firmaQuienRealiza')}><Signature className="mr-2"/>Firmar</Button>
                {anexoConfinado?.resultadosPruebasGases?.firmaQuienRealiza && <img src={anexoConfinado.resultadosPruebasGases.firmaQuienRealiza} alt="Firma" className="mt-2 border rounded-md" />}
            </div>
        </div>
      </SectionWrapper>
      
       <SectionWrapper title="Requerimientos y Equipos Revisados">
         {requerimientosEquipos.map(item => (
            <RadioGroupField key={item.id} id={`req-${item.id}`} label={item.label} value={(anexoConfinado?.requerimientosEquipos as any)?.[item.id] || 'na'} onChange={(value) => handleNestedFieldChange('requerimientosEquipos', item.id, value)} />
         ))}
         <div className='mt-4'>
            <Label>Las pruebas de gases se deben realizar cada:</Label>
            <Input value={anexoConfinado?.pruebasGasesPeriodicas?.intervalo || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'intervalo', e.target.value)} placeholder="Ej: 30 minutos"/>
         </div>
       </SectionWrapper>

      <SectionWrapper title="Pruebas de Gases Periódicas Requeridas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div><Label>Prueba realizada por:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.pruebaRealizadaPor || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'pruebaRealizadaPor', e.target.value)} /></div>
             <div><Label>Serial Monitor:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.serialMonitor || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'serialMonitor', e.target.value)} /></div>
             <div><Label>Marca:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.marca || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'marca', e.target.value)} /></div>
             <div><Label>Fecha y Hora Calibración:</Label><Input type="datetime-local" value={anexoConfinado?.pruebasGasesPeriodicas?.fechaCalibracion || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'fechaCalibracion', e.target.value)} /></div>
          </div>
          
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead><TableHead>LEL</TableHead><TableHead>O2</TableHead><TableHead>H2S</TableHead><TableHead>CO</TableHead><TableHead>Firma</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anexoConfinado?.pruebasGasesPeriodicas?.pruebas?.map((prueba, index) => (
                <TableRow key={prueba.id}>
                    <TableCell><Input className="h-8" type="time" value={prueba.hora} onChange={e => handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'hora', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8" value={prueba.lel} onChange={e => handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'lel', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8" value={prueba.o2} onChange={e => handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'o2', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8" value={prueba.h2s} onChange={e => handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'h2s', e.target.value)} /></TableCell>
                    <TableCell><Input className="h-8" value={prueba.co} onChange={e => handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'co', e.target.value)} /></TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => openSignatureDialog('pruebasGasesPeriodicas', 'pruebas', index)}><Signature className="h-4 w-4"/></Button></TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => removeFromList('pruebasGasesPeriodicas', 'pruebas', index)}><Trash2 className="h-4 w-4 text-destructive"/></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {(anexoConfinado?.pruebasGasesPeriodicas?.pruebas?.length || 0) < 4 && (
            <Button size="sm" onClick={() => addToList('pruebasGasesPeriodicas', 'pruebas', { id: `prueba-${Date.now()}` })} className="mt-2"><Plus className="mr-2 h-4 w-4"/>Agregar Prueba</Button>
          )}
      </SectionWrapper>

       <SectionWrapper title="Autorizaciones">
        <div className="p-4 border rounded-lg mb-4">
            <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
            <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Área..."</p>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nombre" value={anexoConfinado?.autoridadDelArea?.nombre || ''} onChange={e => handleNestedFieldChange('autoridadDelArea', 'nombre', e.target.value)} />
              <Input type="time" placeholder="Hora" value={anexoConfinado?.autoridadDelArea?.hora || ''} onChange={e => handleNestedFieldChange('autoridadDelArea', 'hora', e.target.value)} />
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('autoridadDelArea', 'firma')}><Signature className="mr-2"/>Firmar</Button>
            {anexoConfinado?.autoridadDelArea?.firma && <img src={anexoConfinado.autoridadDelArea.firma} alt="Firma" className="mt-2 border rounded-md" />}
        </div>
        <div className="p-4 border rounded-lg mb-4">
            <p className="text-sm font-semibold mb-2">Responsable del Trabajo</p>
            <p className="text-xs text-muted-foreground mb-4">"Al firmar como Responsable del Trabajo..."</p>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nombre" value={anexoConfinado?.responsableDelTrabajo?.nombre || ''} onChange={e => handleNestedFieldChange('responsableDelTrabajo', 'nombre', e.target.value)} />
              <Input type="time" placeholder="Hora" value={anexoConfinado?.responsableDelTrabajo?.hora || ''} onChange={e => handleNestedFieldChange('responsableDelTrabajo', 'hora', e.target.value)} />
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('responsableDelTrabajo', 'firma')}><Signature className="mr-2"/>Firmar</Button>
            {anexoConfinado?.responsableDelTrabajo?.firma && <img src={anexoConfinado.responsableDelTrabajo.firma} alt="Firma" className="mt-2 border rounded-md" />}
        </div>
        <div className="p-4 border rounded-lg">
            <p className="text-sm font-semibold mb-2">Supervisor de Trabajo en Espacios Confinados</p>
            <p className="text-xs text-muted-foreground mb-4">"Al firmar como Supervisor..."</p>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nombre" value={anexoConfinado?.supervisorTrabajo?.nombre || ''} onChange={e => handleNestedFieldChange('supervisorTrabajo', 'nombre', e.target.value)} />
              <Input type="time" placeholder="Hora" value={anexoConfinado?.supervisorTrabajo?.hora || ''} onChange={e => handleNestedFieldChange('supervisorTrabajo', 'hora', e.target.value)} />
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('supervisorTrabajo', 'firma')}><Signature className="mr-2"/>Firmar</Button>
            {anexoConfinado?.supervisorTrabajo?.firma && <img src={anexoConfinado.supervisorTrabajo.firma} alt="Firma" className="mt-2 border rounded-md" />}
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
                            {anexoConfinado.validacion?.autoridad.map((v, i) => (
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
                <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">Responsable del Trabajo/Ejecutor</h4>
                     <p className='text-xs text-muted-foreground'>Entiendo todas las condiciones de este trabajo y la responsabilidad de implementar las medidas de control establecidas.</p>
                    <Table>
                        <TableHeader><TableRow><TableHead>Día</TableHead><TableHead>Nombre</TableHead><TableHead>Firma</TableHead><TableHead>Fecha</TableHead></TableRow></TableHeader>
                        <TableBody>
                             {anexoConfinado.validacion?.responsable.map((v, i) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-semibold">Cancelación del Trabajo</h3>
                  <RadioGroupField id="cancelacion-si-no" label="¿Se canceló el trabajo?" value={anexoConfinado.cancelacion?.seCancelo || 'no'} onChange={(value) => handleNestedFieldChange('cancelacion', 'seCancelo', value)} />
                  {anexoConfinado.cancelacion?.seCancelo === 'si' && (
                      <div className="space-y-3">
                          <Textarea placeholder="Razón de la cancelación" value={anexoConfinado.cancelacion.razon || ''} onChange={(e) => handleNestedFieldChange('cancelacion', 'razon', e.target.value)} />
                          <Input placeholder="Nombre de quien cancela" value={anexoConfinado.cancelacion.nombre || ''} onChange={(e) => handleNestedFieldChange('cancelacion', 'nombre', e.target.value)} />
                          <Input type="date" value={anexoConfinado.cancelacion.fecha || ''} onChange={(e) => handleNestedFieldChange('cancelacion', 'fecha', e.target.value)} />
                          <Button variant="outline" className="w-full" onClick={() => openSignatureDialog('cancelacion', 'firma')}><Signature className="mr-2"/>Firmar Cancelación</Button>
                          {anexoConfinado.cancelacion?.firma && <img src={anexoConfinado.cancelacion.firma} alt="Firma" className="mt-2 border rounded-md" />}
                      </div>
                  )}
              </div>
              <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-semibold">Cierre del Permiso</h3>
                  <RadioGroupField id="cierre-si-no" label="¿Se terminó el trabajo?" value={anexoConfinado.cierre?.seTermino || 'no'} onChange={(value) => handleNestedFieldChange('cierre', 'seTermino', value)} />
                  {anexoConfinado.cierre?.seTermino === 'si' && (
                      <div className="space-y-3">
                          <Textarea placeholder="Observaciones de cierre" value={anexoConfinado.cierre.observaciones || ''} onChange={(e) => handleNestedFieldChange('cierre', 'observaciones', e.target.value)} />
                          <div className="p-3 border rounded-md">
                              <p className="text-xs font-bold">Autoridad del Área</p>
                              <Input placeholder="Nombre" value={anexoConfinado.cierre.autoridad?.nombre || ''} onChange={(e) => handleNestedFieldChange('cierre', 'autoridad', { ...anexoConfinado.cierre.autoridad, nombre: e.target.value })} />
                              <Input type="date" className="mt-2" value={anexoConfinado.cierre.autoridad?.fecha || ''} onChange={(e) => handleNestedFieldChange('cierre', 'autoridad', { ...anexoConfinado.cierre.autoridad, fecha: e.target.value })} />
                              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre', 'autoridad')}><Signature className="mr-2"/>Firmar Cierre</Button>
                              {anexoConfinado.cierre.autoridad?.firma && <img src={anexoConfinado.cierre.autoridad.firma} alt="Firma" className="mt-2 border rounded-md" />}
                          </div>
                          <div className="p-3 border rounded-md">
                              <p className="text-xs font-bold">Responsable del Trabajo</p>
                              <Input placeholder="Nombre" value={anexoConfinado.cierre.responsable?.nombre || ''} onChange={(e) => handleNestedFieldChange('cierre', 'responsable', { ...anexoConfinado.cierre.responsable, nombre: e.target.value })} />
                              <Input type="date" className="mt-2" value={anexoConfinado.cierre.responsable?.fecha || ''} onChange={(e) => handleNestedFieldChange('cierre', 'responsable', { ...anexoConfinado.cierre.responsable, fecha: e.target.value })} />
                              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => openSignatureDialog('cierre', 'responsable')}><Signature className="mr-2"/>Firmar Cierre</Button>
                              {anexoConfinado.cierre.responsable?.firma && <img src={anexoConfinado.cierre.responsable.firma} alt="Firma" className="mt-2 border rounded-md" />}
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
