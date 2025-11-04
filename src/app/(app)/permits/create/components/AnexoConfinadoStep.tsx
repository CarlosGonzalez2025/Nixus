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
    { id: 'bloqueosAislamientos', label: 'BLOQUEOS / AISLAMIENTOS /SALIDA' },
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

    if(section === 'resultadosPruebasGases'){
      handleNestedFieldChange('resultadosPruebasGases', 'firmaQuienRealiza', signature);
    } else if (section === 'pruebasGasesPeriodicas' && index !== undefined) {
      handleListChange('pruebasGasesPeriodicas', 'pruebas', index, 'firma', signature);
    } else {
       handleNestedFieldChange(section as keyof typeof anexoConfinado, field, signature);
    }
    
    setIsSignatureDialogOpen(false);
    setSigningTarget(null);
  };

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

      {/* Información General Anexos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Información General del Anexo</h3>
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
          <div><Label>En caso de emergencia contactar a:</Label><Input value={anexoConfinado?.emergencia?.contacto || ''} onChange={(e) => handleNestedFieldChange('emergencia', 'contacto', e.target.value)} /></div>
          <div><Label>Teléfono:</Label><Input value={anexoConfinado?.emergencia?.telefono || ''} onChange={(e) => handleNestedFieldChange('emergencia', 'telefono', e.target.value)} /></div>
        </div>
      </div>

      {/* Identificación de Peligros */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Identificación de Peligros y Aspectos</h3>
        {identificacionPeligros.map(item => (
            <div key={item.id} className="space-y-2">
                <RadioGroupField id={`peligro-${item.id}`} label={item.label} value={(anexoConfinado?.identificacionPeligros as any)?.[item.id] || 'na'} onChange={(value) => handleNestedFieldChange('identificacionPeligros', item.id, value)} />
                {item.id === 'procedimientoComunicacion' && anexoConfinado?.identificacionPeligros?.procedimientoComunicacion === 'si' && (
                    <Input className="ml-8" placeholder="Cuál procedimiento de comunicación?" value={anexoConfinado?.procedimientoComunicacionCual || ''} onChange={(e) => handleFieldChange('procedimientoComunicacionCual', e.target.value)} />
                )}
            </div>
        ))}
      </div>
      
      {/* Precauciones y Controles */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Precauciones y Controles Específicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {precaucionesControles.map(item => (
                <RadioGroupField key={item.id} id={`precaucion-${item.id}`} label={item.label} value={(anexoConfinado?.precauciones as any)?.[item.id] || 'na'} onChange={(value) => handleNestedFieldChange('precauciones', item.id, value)} />
            ))}
        </div>
      </div>
      
      {/* Pruebas de Gases */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Resultados de Pruebas de Gases</h3>
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
      </div>
      
       {/* Requerimientos y Equipos */}
       <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Requerimientos y Equipos Revisados</h3>
         {requerimientosEquipos.map(item => (
            <RadioGroupField key={item.id} id={`req-${item.id}`} label={item.label} value={(anexoConfinado?.requerimientosEquipos as any)?.[item.id] || 'na'} onChange={(value) => handleNestedFieldChange('requerimientosEquipos', item.id, value)} />
         ))}
         <div>
            <Label>Las pruebas de gases se deben realizar cada:</Label>
            <Input value={anexoConfinado?.pruebasGasesPeriodicas?.intervalo || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'intervalo', e.target.value)} placeholder="Ej: 30 minutos"/>
         </div>
       </div>

      {/* Pruebas de Gases Periódicas */}
      <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Pruebas de Gases Periódicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div><Label>Prueba realizada por:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.pruebaRealizadaPor || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'pruebaRealizadaPor', e.target.value)} /></div>
             <div><Label>Serial Monitor:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.serialMonitor || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'serialMonitor', e.target.value)} /></div>
             <div><Label>Marca:</Label><Input value={anexoConfinado?.pruebasGasesPeriodicas?.marca || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'marca', e.target.value)} /></div>
             <div><Label>Fecha y Hora Calibración:</Label><Input type="datetime-local" value={anexoConfinado?.pruebasGasesPeriodicas?.fechaCalibracion || ''} onChange={e => handleNestedFieldChange('pruebasGasesPeriodicas', 'fechaCalibracion', e.target.value)} /></div>
          </div>
          
          <Table>
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
            <Button size="sm" onClick={() => addToList('pruebasGasesPeriodicas', 'pruebas', { id: `prueba-${Date.now()}` })}><Plus className="mr-2 h-4 w-4"/>Agregar Prueba</Button>
          )}
      </div>

       {/* Autorizaciones */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Autorizaciones</h3>
        <div className="p-4 border rounded-lg">
            <p className="text-sm font-semibold mb-2">Autoridad del Área</p>
            <p className="text-xs text-muted-foreground mb-4">"Al firmar como Autoridad del Área..."</p>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nombre" value={anexoConfinado?.autoridadDelArea?.nombre || ''} onChange={e => handleNestedFieldChange('autoridadDelArea', 'nombre', e.target.value)} />
              <Input type="time" placeholder="Hora" value={anexoConfinado?.autoridadDelArea?.hora || ''} onChange={e => handleNestedFieldChange('autoridadDelArea', 'hora', e.target.value)} />
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => openSignatureDialog('autoridadDelArea', 'firma')}><Signature className="mr-2"/>Firmar</Button>
            {anexoConfinado?.autoridadDelArea?.firma && <img src={anexoConfinado.autoridadDelArea.firma} alt="Firma" className="mt-2 border rounded-md" />}
        </div>
        <div className="p-4 border rounded-lg">
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
      </div>
      
      {/* Validacion y Cierre */}
      <div className="space-y-4">
         <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Validación y Cierre</h3>
         {/* Implement validation and closure sections similar to AnexoAlturaStep */}
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
