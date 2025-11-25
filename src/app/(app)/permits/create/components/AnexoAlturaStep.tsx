
'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Signature, Trash2, Plus, ChevronDown, Info } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AutorizacionPersona, ValidacionDiaria, AnexoAltura } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const anexoAlturaEstructuras = [
  { id: 'escaleraCuerpo', label: 'Escalera de un cuerpo' },
  { id: 'escaleraDosCuerpos', label: 'Escalera de dos cuerpos o mas' },
  { id: 'andamioTubular', label: 'Andamio Tubular Certificado' },
  { id: 'andamioColgante', label: 'Andamio Colgante' },
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'manLift', label: 'Man Lift o Camion Canasta' },
  { id: 'otros', label: 'Otros' },
];

const tareasTrabajoAltura = [
  { 
    id: 'mantenimiento-aires', 
    nombre: 'Mantenimiento de aires', 
    descripcion: 'Realización de mantenimiento, reparación y limpieza de aires acondicionados' 
  },
  { 
    id: 'cambio-estanterias', 
    nombre: 'Cambio y reparación de estanterías', 
    descripcion: 'Reparación, inspección y cambio de elementos de la estantería' 
  },
  { 
    id: 'instalacion-luminarias', 
    nombre: 'Instalación y cambio de luminarias', 
    descripcion: 'Reparación y cambio de luminaria' 
  },
  { 
    id: 'desnidacion-palomas', 
    nombre: 'Des nidación de palomas', 
    descripcion: 'Retiro de nidos generados con palomas' 
  },
  { 
    id: 'instalacion-carpas', 
    nombre: 'Instalación de carpas', 
    descripcion: 'Instalar carpas (lona) de carpas móviles' 
  },
  { 
    id: 'modificacion-equipos-oficina', 
    nombre: 'Modificación y adecuación de equipos de oficina', 
    descripcion: 'Cambio de módulos, divisiones de oficina' 
  },
  { 
    id: 'instalacion-avisos', 
    nombre: 'Instalación de avisos', 
    descripcion: 'Instalar vallas, pendones, avisos' 
  },
  { 
    id: 'estudios-isocineticos', 
    nombre: 'Estudios isocinéticos', 
    descripcion: 'Instalación y desmonte equipo, en chimenea de caldera' 
  },
  { id: 'cargue-graneleros', 
    nombre: 'Cargue de graneleros', 
    descripcion: 'Abrir compuertas superiores de graneleros y realizar cargue' 
  },
  { 
    id: 'mantenimiento-antena', 
    nombre: 'Instalación y mantenimiento de antena de telefonía', 
    descripcion: 'Revisión de antena de telecomunicaciones' 
  },
  { 
    id: 'impermeabilizacion-cubierta', 
    nombre: 'Impermeabilización de cubierta y limpieza (sobre losa)', 
    descripcion: 'Aplicar impermeabilizante a cubierta' 
  },
  { 
    id: 'poda-arboles', 
    nombre: 'Poda de árboles (si se encuentra retirado de líneas con tensión)', 
    descripcion: 'Realización de poda de árboles' 
  },
  { 
    id: 'instalacion-malla', 
    nombre: 'Instalación de malla y/o poli sombra', 
    descripcion: 'Instalación y desmonte de mallas y poli sombra' 
  },
  { 
    id: 'polarizacion-ventanas', 
    nombre: 'Polarización de ventanas, instalación de cortinas', 
    descripcion: 'Colocar papel polarizado en ventanas e instalación de cortinas' 
  },
  { 
    id: 'cambio-piezas-equipos', 
    nombre: 'Cambio de piezas y mantenimiento en mástil de montacargas, retroexcavadora, etc.', 
    descripcion: 'Instalación de sensores, luces, cámaras, etc., en los equipos' 
  },
  { 
    id: 'mantenimiento-camaras', 
    nombre: 'Mantenimiento e instalación de cámaras', 
    descripcion: 'Instalar cámaras de seguridad en puntos de la planta' 
  },
  { 
    id: 'instalacion-tuberia', 
    nombre: 'Instalación de tubería eléctrica', 
    descripcion: 'Instalar tubería y sondear cableado, instalar soportes de tubería' 
  },
];

const anexoAlturaAspectos = [
    { id: 'afiliacionVigente', label: 'A. EL PERSONAL EJECUTANTE DE LA ACTIVIDAD TIENE LA AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL? '},
    { id: 'procedimientoActividad', label: 'B. SE CUENTA CON EL PROCEDIMIENTO DE LA ACTIVIDAD A EJECUTAR?' },
    { id: 'medidasPrevencion', label: 'C. SE HAN DETERMINADO LAS MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
    { id: 'conocenMedidas', label: 'D. TODOS LOS EJECUTANTES CONOCEN LAS MEDIDAS DE PRECAUCIÓN ESTABLECIDAS EN LA EVALUACIÓN DE RIESGOS?'},
    { id: 'entrenadosCertificados', label: 'E. ESTÁN LOS EJECUTANTES ENTRENADOS Y SE ENCUENTRAN LOS CERTIFICADOS EN SITIO PARA REALIZAR   TRABAJOS EN ALTURA?'},
    { id: 'elementosProteccionCertificados', label: 'F. ESTÁN TODOS LOS ELEMENTOS DE PROTECCIÓN CONTRA CAÍDAS EN BUEN ESTADO E CERTIFICADOS?' },
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
  const isSSTRequired = anexoAltura.tareaRealizar?.id === 'otro';

  const handleUpdate = (payload: Partial<AnexoAltura>) => {
    dispatch({ type: 'UPDATE_ANEXO_ALTURA', payload });
  };

  const handleNestedChange = (section: keyof AnexoAltura, field: string, value: any) => {
    const currentSection = (anexoAltura as any)[section] || {};
    handleUpdate({ [section]: { ...currentSection, [field]: value } });
  };
  
  React.useEffect(() => {
    dispatch({ type: 'SET_SST_REQUIRED', payload: isSSTRequired });
  }, [isSSTRequired, dispatch]);

  // Handler para el cambio de tarea
  const handleTareaChange = (tareaId: string) => {
    if (tareaId === 'otro') {
      handleUpdate({ 
        tareaRealizar: {
          id: 'otro',
          nombre: '',
          descripcion: ''
        }
      });
    } else {
      const tareaSeleccionada = tareasTrabajoAltura.find(t => t.id === tareaId);
      if (tareaSeleccionada) {
        handleUpdate({ 
          tareaRealizar: {
            id: tareaSeleccionada.id,
            nombre: tareaSeleccionada.nombre,
            descripcion: tareaSeleccionada.descripcion
          }
        });
      }
    }
  };

  // Obtener la descripción de la tarea seleccionada
  const getDescripcionTarea = () => {
    if (!anexoAltura.tareaRealizar?.id) return '';
    if (anexoAltura.tareaRealizar.id === 'otro') {
      return anexoAltura.tareaRealizar.descripcion || '';
    }
    const tarea = tareasTrabajoAltura.find(t => t.id === anexoAltura.tareaRealizar?.id);
    return tarea?.descripcion || '';
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
        
        {/* Nueva Sección: Tarea a Realizar */}
        <div className="mt-4 space-y-4">
          <div>
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Tarea a Realizar:
            </Label>
            <Select 
              value={anexoAltura.tareaRealizar?.id || ''} 
              onValueChange={handleTareaChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione la tarea a realizar" />
              </SelectTrigger>
              <SelectContent>
                {tareasTrabajoAltura.map(tarea => (
                  <SelectItem key={tarea.id} value={tarea.id}>
                    {tarea.nombre}
                  </SelectItem>
                ))}
                <SelectItem value="otro">Otro (especificar)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mostrar descripción de la tarea seleccionada */}
          {anexoAltura.tareaRealizar?.id && anexoAltura.tareaRealizar.id !== 'otro' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <Label className="text-sm font-semibold text-blue-900">Descripción de la Tarea:</Label>
              <p className="text-sm text-blue-800 mt-1">{getDescripcionTarea()}</p>
            </div>
          )}

          {/* Campos adicionales si selecciona "Otro" */}
          {anexoAltura.tareaRealizar?.id === 'otro' && (
            <div className="space-y-4 p-4 border border-amber-200 rounded-md bg-amber-50">
              <div>
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Nombre de la Actividad:
                </Label>
                <Input 
                  placeholder="Ingrese el nombre de la actividad" 
                  value={anexoAltura.tareaRealizar?.nombre || ''} 
                  onChange={(e) => handleUpdate({ 
                    tareaRealizar: {
                      ...anexoAltura.tareaRealizar,
                      id: 'otro',
                      nombre: e.target.value,
                      descripcion: anexoAltura.tareaRealizar?.descripcion || ''
                    }
                  })}
                  required
                />
              </div>
              <div>
                <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Descripción de la Actividad:
                </Label>
                <Textarea 
                  placeholder="Ingrese la descripción de la actividad" 
                  value={anexoAltura.tareaRealizar?.descripcion || ''} 
                  onChange={(e) => handleUpdate({ 
                    tareaRealizar: {
                      ...anexoAltura.tareaRealizar,
                      id: 'otro',
                      nombre: anexoAltura.tareaRealizar?.nombre || '',
                      descripcion: e.target.value
                    }
                  })}
                  rows={3}
                  required
                />
              </div>
               <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <Info className="h-4 w-4 text-red-800" />
                  <AlertTitle className="font-semibold">Firma SST Requerida</AlertTitle>
                  <AlertDescription className="text-xs">
                    Al seleccionar "Otro", este permiso requerirá obligatoriamente la firma de un Líder SST para su aprobación.
                  </AlertDescription>
                </Alert>
                {state.isSSTSignatureRequired !== undefined && (
                 <Input 
                    type="hidden" 
                    readOnly 
                    value={state.isSSTSignatureRequired.toString()}
                 />
                )}
            </div>
          )}
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
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">Observaciones:</Label>
              <Textarea 
                value={anexoAltura.afectaciones?.observaciones || ''} 
                onChange={(e) => handleNestedChange('afectaciones', 'observaciones', e.target.value)} 
              />
            </div>
        </div>
       </SectionWrapper>
    </div>
  </>
  );
}
