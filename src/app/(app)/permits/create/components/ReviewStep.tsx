'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  CheckCircle, 
  ChevronDown, 
  Users, 
  Shield, 
  AlertTriangle,
  Clock,
  Building2,
  Briefcase,
  Wrench,
  UserCheck,
  HardHat,
  Activity
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { hazardCategories, eppOptions, justificacionOptions } from './AtsStep';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


// ============================================================================
// HELPERS
// ============================================================================

const DetailField = ({ label, value, icon, fullWidth = false }: { label: string; value: React.ReactNode; icon?: React.ReactNode, fullWidth?: boolean }) => (
    <div className={`space-y-1 ${fullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}>
        <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
        </div>
        <div className="text-sm text-foreground font-medium pl-6">{value || <span className="text-muted-foreground italic">No especificado</span>}</div>
    </div>
);

const SectionHeader = ({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) => (
    <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
        </div>
        {count !== undefined && (
            <Badge variant="secondary" className="ml-2">
                {count}
            </Badge>
        )}
    </div>
);

const getStatusSymbol = (value: string | boolean | undefined): string => {
    if (value === 'si' || value === true) return 'SÍ';
    if (value === 'no' || value === false) return 'NO';
    if (value === 'na') return 'N/A';
    return 'No especificado';
};

const ReviewChecklist = ({ title, items, data }: { title: string; items: { id: string; label: string }[]; data: any }) => (
    <div>
        <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">{title}</h4>
        <div className="pl-6 space-y-2">
            {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0">
                    <span className="flex-1 pr-4">{item.label}</span>
                    <Badge variant={
                      (data?.[item.id] === 'si' || data?.[item.id] === true) ? 'default' :
                      (data?.[item.id] === 'no') ? 'destructive' :
                      'secondary'
                    } className="text-xs">
                        {getStatusSymbol(data?.[item.id])}
                    </Badge>
                </div>
            ))}
        </div>
    </div>
);

// ============================================================================
// CONSTANTES DE ANEXOS (Copiadas para mantener el componente autocontenido)
// ============================================================================

const anexoAlturaAspectos = [
    { id: 'afiliacionVigente', label: 'A. AFILIACIÓN VIGENTE A SEGURIDAD SOCIAL?' },
    { id: 'procedimientoActividad', label: 'B. PROCEDIMIENTO DE LA ACTIVIDAD?' },
    { id: 'medidasPrevencion', label: 'C. MEDIDAS DE PREVENCIÓN CONTRA CAÍDAS?' },
    { id: 'conocenMedidas', label: 'D. EJECUTANTES CONOCEN LAS MEDIDAS?' },
    { id: 'entrenadosCertificados', label: 'E. EJECUTANTES ENTRENADOS Y CERTIFICADOS?' },
    { id: 'elementosProteccionCertificados', label: 'F. ELEMENTOS DE PROTECCIÓN EN BUEN ESTADO Y CERTIFICADOS?' },
    { id: 'sistemaAseguramientoVerificado', label: 'G. SISTEMA DE ASEGURAMIENTO VERIFICADO?' },
    { id: 'estadoElementosVerificado', label: 'H. ESTADO DE ESLINGAS, ARNÉS, CASCOS, ETC.?' },
    { id: 'puntosAnclajeCertificados', label: 'I. PUNTOS DE ANCLAJE CUMPLEN 5000 LBS Y CERTIFICADOS?' },
    { id: 'areaDelimitada', label: 'J. ÁREA DELIMITADA Y SEÑALIZADA?' },
    { id: 'personalSaludable', label: 'K. PERSONAL EN CONDICIONES ADECUADAS DE SALUD?' },
    { id: 'equiposAccesoBuenEstado', label: 'L. EQUIPOS Y SISTEMAS DE ACCESO EN BUEN ESTADO?' },
    { id: 'espacioCaidaLibreSuficiente', label: 'M. ESPACIO DE CAÍDA LIBRE SUFICIENTE?' },
    { id: 'equiposEmergenciaDisponibles', label: 'N. ELEMENTOS DE EMERGENCIA Y PLAN DE RESCATE?' },
    { id: 'eppSeleccionadosCorrectamente', label: 'O. EPP SELECCIONADO CORRECTAMENTE?' },
    { id: 'plataformaSoportaCarga', label: 'P. PLATAFORMA SOPORTA CARGA DE TRABAJO?' },
    { id: 'supervisorConstante', label: 'Q. SUPERVISOR O ACOMPAÑANTE CONSTANTE?' },
    { id: 'andamiosCompletos', label: 'R. ANDAMIOS COMPLETOS Y ADECUADAMENTE ARMADOS?' },
    { id: 'condicionesClimaticasAdecuadas', label: 'S. CONDICIONES CLIMÁTICAS ADECUADAS?' },
    { id: 'metodoSubirHerramientasSeguro', label: 'T. MÉTODO DE SUBIR HERRAMIENTAS SEGURO?' },
    { id: 'sistemasRestriccion', label: 'U. SISTEMAS DE RESTRICCIÓN (si requiere)?' },
    { id: 'sistemasPosicionamiento', label: 'V. SISTEMAS DE POSICIONAMIENTO (si requiere)?' },
];

const anexoConfinadoPeligros = [
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
    { id: 'equiposRespiracionAutonoma', label: 'K. ESTAN DISPONIBLES EN EL SITIO EQUIPOS DE RESPIRACION AUTONOMA (AUTOCONTENIDO) EN CASO DE EMERGENCIA' },
    { id: 'elementosAtencionEmergencias', label: 'L. SE CUENTA CON ELEMENTOS PARA ATENCION DE EMERGENCIAS EN EL AREA' },
    { id: 'planEmergenciaRescate', label: 'M. SE CUENTA CON PLAN DE EMERGENCIA PARA RESCATE' },
    { id: 'hojasSeguridadDisponibles', label: 'N. ESTAN DISPONIBLES LAS HOJAS DE SEGURIDAD DE PRODUCTOS QUIMICOS EN CASO DE USARSE.' },
    { id: 'verificadoConexionesPuestaTierra', label: 'Ñ.SE HA VERIFICADO EL ESTADO DE CONEXIONES Y PUESTA A TIERRA DE EQUIPOS Y ELEMENTOS A USAR.' },
    { id: 'vigiaPermanente', label: 'O.SE VERIFICA QUE PARA EL INGRESO A ESPACIOS CONFINADOS SE CUENTE CON UN VIGIA PERMANENTE EN EL AREA' },
    { id: 'herramientasAdecuadas', label: 'P. SE VERIFICO QUE LAS HERRAMIENTAS MANUALES Y OTROS ELEMENTOS SEAN LOS ADECUADOS PARA LAS CONDICIONES Y ATMOSFERAS DEL LUGAR' },
    { id: 'personalSaludable', label: 'Q.EL PERSONAL QUE REALIZA EL TRABAJO SE ENCUENTRA EN CONDICIONES ADECUADAS DE SALUD PARA LA ACTIVIDAD' },
    { id: 'verificadoEpp', label: 'R.SE VERIFICO EL EQUIPO Y ELEMENTOS DE PROTECCION PERSONAL A UTILIZAR' },
    { id: 'circunstanciaModificadora', label: 'S.EXISTE ALGUNA CIRCUSTANCIA O FACTOR QUE PUEDA MODIFICAR EL TRABAJO' },
    { id: 'procedimientoComunicacion', label: 'SE CUENTA CON PROCEDMIENTO DE COMUNICACIÓN CUAL ?' }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ReviewStep() {
    const { state } = usePermitForm();

    const getWorkTypesString = () => {
        return Object.entries(state.selectedWorkTypes)
            .filter(([, value]) => value)
            .map(([key]) => {
                switch(key) {
                    case 'alturas': return 'Trabajo en Alturas';
                    case 'confinado': return 'Espacios Confinados';
                    case 'energia': return 'Control de Energías';
                    case 'izaje': return 'Izaje de Cargas';
                    case 'excavacion': return 'Excavaciones';
                    case 'general': return 'Trabajo General';
                    default: return '';
                }
            })
            .filter(Boolean);
    };
    
    const getFormattedEpp = () => {
      const eppData = state.anexoATS?.epp;
      if (!eppData) return [];
  
      const selectedEpps: string[] = [];
  
      Object.values(eppOptions).flat().forEach(item => {
          if (eppData[item.id]) {
              let label = item.label;
              let spec = '';
  
              if (item.type === 'custom_casco') {
                  const details = [eppData.casco_seguridad_tipo, eppData.casco_seguridad_clase, eppData.casco_seguridad_barbuquejo].filter(Boolean).join(', ');
                  if (details) spec = `(${details})`;
              } else if (item.type === 'custom_guante_dielectrico') {
                  const details = [eppData.guante_dielectrico_clase, eppData.guante_dielectrico_guantin ? 'guantín' : '', eppData.guante_dielectrico_proteccion ? 'protección' : ''].filter(Boolean).join(', ');
                  if (details) spec = `(Clase: ${details})`;
              } else if (item.type === 'select') {
                  const specValue = eppData[`${item.id}_spec`];
                  if (specValue) spec = `(${specValue.replace(/_/g, ' ')})`;
              } else if (item.type === 'text') {
                  const specValue = eppData[`${item.id}_spec`];
                  if (specValue) spec = `(${specValue})`;
              }
              
              selectedEpps.push(`${label} ${spec}`.trim());
          }
      });
  
      return selectedEpps;
    };

    const workTypes = getWorkTypesString();
    const peligrosIdentificadosCount = Object.values(state.anexoATS?.peligros || {}).filter(v => v === 'si').length + (state.anexoATS?.peligrosAdicionales?.length || 0);
    const eppRequeridos = getFormattedEpp();
    const workersSinFirma = state.workers?.filter(w => !w.firmaApertura).length || 0;

    return (
        <div className="space-y-6">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                    <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                    Revisión Final del Permiso
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                    Verifique cuidadosamente toda la información antes de guardar. Podrá realizar modificaciones desde la vista de detalles.
                </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Resumen Ejecutivo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{state.workers?.length || 0}</p>
                                <p className="text-xs text-muted-foreground">Trabajadores</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{peligrosIdentificadosCount}</p>
                                <p className="text-xs text-muted-foreground">Peligros</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-green-100 p-2 rounded-full">
                                <HardHat className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{eppRequeridos.length}</p>
                                <p className="text-xs text-muted-foreground">EPPs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Briefcase className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{workTypes.length}</p>
                                <p className="text-xs text-muted-foreground">Tipos de Trabajo</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-primary/20 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader icon={<FileText className="h-5 w-5 text-primary" />} title="Información General del Permiso" />
                        <ChevronDown className="h-5 w-5 text-primary transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-primary/20 rounded-b-lg bg-white p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailField label="Área Específica" value={state.generalInfo.areaEspecifica} />
                            <DetailField label="Planta" value={state.generalInfo.planta} />
                            <DetailField label="Proceso" value={state.generalInfo.proceso} />
                            <DetailField label="Contrato" value={state.generalInfo.contrato} />
                            <DetailField label="Empresa" value={state.generalInfo.empresa} />
                            <DetailField label="Vigencia" value={
                                `${state.generalInfo.validFrom ? format(new Date(state.generalInfo.validFrom), "dd/MM/yy HH:mm") : ''} - ${state.generalInfo.validUntil ? format(new Date(state.generalInfo.validUntil), "dd/MM/yy HH:mm") : ''}`
                            } fullWidth />
                             <DetailField label="Tipos de Trabajo" value={workTypes.join(', ')} fullWidth />
                            <DetailField label="Descripción Tarea" value={<p className="whitespace-pre-wrap">{state.generalInfo.workDescription}</p>} fullWidth/>
                        </div>
                        <Separator className="my-4"/>
                        <h4 className="font-semibold text-sm">Responsables</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DetailField label="Solicitante" value={state.generalInfo.nombreSolicitante} />
                            <DetailField label="Responsable Trabajo" value={state.generalInfo.responsable?.nombre} />
                            <DetailField label="Cargo" value={state.generalInfo.responsable?.cargo} />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-orange-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader icon={<Shield className="h-5 w-5 text-orange-600" />} title="Análisis de Trabajo Seguro (ATS)" count={peligrosIdentificadosCount + eppRequeridos.length}/>
                        <ChevronDown className="h-5 w-5 text-orange-600 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-orange-200 rounded-b-lg bg-white p-6 space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 mb-3">Peligros y Controles</h4>
                            {Object.entries(hazardCategories).map(([category, hazards]) => {
                                const selectedInCat = hazards.filter(h => state.anexoATS?.peligros?.[h.id] === 'si');
                                if (selectedInCat.length === 0) return null;
                                return (
                                    <div key={category} className="space-y-2 mb-4">
                                        <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-500">{category}</h5>
                                        <div className="space-y-3 pl-4">
                                            {selectedInCat.map(h => (
                                                <div key={h.id} className="p-3 bg-gray-50/50 border-l-4 border-orange-200">
                                                    <p className="font-semibold text-sm">{h.label}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{h.control}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                             {state.anexoATS?.peligrosAdicionales && state.anexoATS.peligrosAdicionales.length > 0 && (
                                <div className="space-y-2">
                                    <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-500">OTROS PELIGROS (MANUALES)</h5>
                                    <div className="space-y-3 pl-4">
                                        {state.anexoATS.peligrosAdicionales.map((p, i) => (
                                            <div key={`add-${i}`} className="p-3 bg-gray-50/50 border-l-4 border-orange-200">
                                                <p className="font-semibold text-sm">{p.peligro}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{p.descripcion}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div>
                            <h4 className="text-sm font-bold text-orange-600 mb-3">EPP Requeridos</h4>
                             <div className="flex flex-col gap-2 pl-6">
                                {eppRequeridos.length > 0 ? (
                                    eppRequeridos.map((epp, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <CheckCircle className="h-4 w-4 text-green-500"/>
                                          <span className="text-sm">{epp}</span>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground italic text-sm">Ningún EPP especificado</span>
                                )}
                            </div>
                        </div>

                        <Separator />
                        
                        <div>
                            <h4 className="text-sm font-bold text-orange-600 mb-3">Justificación de Uso</h4>
                            <div className="pl-6">
                                {justificacionOptions.filter(j => state.anexoATS?.justificacion?.[j.id]).map(j => (
                                    <div key={j.id} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span className="text-sm">{j.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                {state.selectedWorkTypes.alturas && state.anexoAltura && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-blue-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-blue-600" />} title="Anexo: Trabajo en Alturas" />
                            <ChevronDown className="h-5 w-5 text-blue-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-blue-200 rounded-b-lg bg-white p-6 space-y-4">
                            <ReviewChecklist title="Aspectos de Seguridad" items={anexoAlturaAspectos} data={state.anexoAltura.aspectosSeguridad}/>
                            <Separator/>
                            <DetailField label="Otro Tipo de Estructura" value={state.anexoAltura.tipoEstructura?.otrosCual} />
                            <DetailField label="Observaciones de Afectaciones" value={state.anexoAltura.afectaciones?.observaciones} fullWidth />
                        </CollapsibleContent>
                    </Collapsible>
                )}

                {state.selectedWorkTypes.confinado && state.anexoConfinado && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-purple-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-purple-600" />} title="Anexo: Espacios Confinados" />
                            <ChevronDown className="h-5 w-5 text-purple-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-purple-200 rounded-b-lg bg-white p-6 space-y-4">
                            <ReviewChecklist title="Identificación de Peligros" items={anexoConfinadoPeligros} data={state.anexoConfinado.identificacionPeligros}/>
                            <Separator/>
                            <DetailField label="Procedimiento de Comunicación" value={state.anexoConfinado.procedimientoComunicacionCual} />
                            <DetailField label="Intervalo de Pruebas de Gases" value={state.anexoConfinado.pruebasGasesPeriodicas?.intervalo} />
                             {state.anexoConfinado.pruebasGasesPeriodicas?.pruebas && state.anexoConfinado.pruebasGasesPeriodicas.pruebas.length > 0 && (
                                <>
                                 <Separator/>
                                 <h4 className="text-sm font-bold text-primary mb-3">Pruebas de Gases Periódicas</h4>
                                 <Table>
                                    <TableHeader><TableRow><TableHead>Hora</TableHead><TableHead>LEL</TableHead><TableHead>O2</TableHead><TableHead>H2S</TableHead><TableHead>CO</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {state.anexoConfinado.pruebasGasesPeriodicas.pruebas.map(p => (
                                            <TableRow key={p.id}><TableCell>{p.hora}</TableCell><TableCell>{p.lel}</TableCell><TableCell>{p.o2}</TableCell><TableCell>{p.h2s}</TableCell><TableCell>{p.co}</TableCell></TableRow>
                                        ))}
                                    </TableBody>
                                 </Table>
                                </>
                             )}
                        </CollapsibleContent>
                    </Collapsible>
                )}

                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-green-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader icon={<Users className="h-5 w-5 text-green-600" />} title="Trabajadores Registrados" count={state.workers?.length || 0}/>
                        <ChevronDown className="h-5 w-5 text-green-600 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-green-200 rounded-b-lg bg-white p-6">
                        <div className="space-y-2">
                            {state.workers && state.workers.length > 0 ? (
                                state.workers.map((w, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg border">
                                        <p className="font-semibold">{w.nombre} <span className="text-muted-foreground font-normal">(CC: {w.cedula} - {w.rol})</span></p>
                                        <Badge variant={w.firmaApertura ? 'default' : 'destructive'} className={w.firmaApertura ? 'bg-green-100 text-green-800' : ''}>
                                            {w.firmaApertura ? '✓ Firmado' : 'Pendiente'}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground italic py-8">No hay trabajadores registrados</p>
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Próximos Pasos
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                            <span className="text-blue-900 font-bold text-xs px-1.5">1</span>
                        </div>
                        <p className="text-sm text-blue-800">
                            Al hacer clic en <strong>"Guardar Permiso"</strong>, se creará un borrador del permiso en el sistema.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                            <span className="text-blue-900 font-bold text-xs px-1.5">2</span>
                        </div>
                        <p className="text-sm text-blue-800">
                            Será redirigido a la página de detalles del permiso donde el <strong>solicitante principal</strong> deberá firmar digitalmente.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-200 rounded-full p-1 mt-0.5">
                            <span className="text-blue-900 font-bold text-xs px-1.5">3</span>
                        </div>
                        <p className="text-sm text-blue-800">
                            Una vez firmado, se activará el <strong>flujo de aprobación</strong> según las configuraciones de su organización.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
