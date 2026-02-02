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
import { hazardCategories, eppOptions } from './AtsStep';

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

export function ReviewStep() {
    const { state } = usePermitForm();

    const getWorkTypesString = () => {
        const selected = Object.entries(state.selectedWorkTypes)
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
        
        return selected;
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

            {/* Resumen ejecutivo */}
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
                {/* General Info */}
                <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-primary/20 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader icon={<FileText className="h-5 w-5 text-primary" />} title="Información General del Permiso" />
                        <ChevronDown className="h-5 w-5 text-primary transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-primary/20 rounded-b-lg bg-white">
                        <div className="p-6 space-y-6">
                            {/* Identificación */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Identificación del Trabajo
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
                                    {state.generalInfo.requiereArea === 'si' && <DetailField label="Área Específica" value={state.generalInfo.areaEspecifica} />}
                                    {state.generalInfo.requierePlanta === 'si' && <DetailField label="Planta" value={state.generalInfo.planta} />}
                                    {state.generalInfo.requiereProceso === 'si' && <DetailField label="Proceso" value={state.generalInfo.proceso} />}
                                    {state.generalInfo.requiereContrato === 'si' && <DetailField label="Contrato" value={state.generalInfo.contrato} />}
                                    <DetailField label="Empresa" value={state.generalInfo.empresa} />
                                </div>
                            </div>

                            <Separator />

                            {/* Vigencia */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Vigencia del Permiso
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                                    <DetailField 
                                        label="Inicio" 
                                        value={state.generalInfo.validFrom ? (
                                            <span className="text-green-600 font-semibold">
                                                {format(new Date(state.generalInfo.validFrom), "EEEE, dd 'de' MMMM 'de' yyyy - HH:mm", { locale: es })}
                                            </span>
                                        ) : 'N/A'} 
                                    />
                                    <DetailField 
                                        label="Fin" 
                                        value={state.generalInfo.validUntil ? (
                                            <span className="text-red-600 font-semibold">
                                                {format(new Date(state.generalInfo.validUntil), "EEEE, dd 'de' MMMM 'de' yyyy - HH:mm", { locale: es })}
                                            </span>
                                        ) : 'N/A'} 
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Tipos de Trabajo */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Tipos de Trabajo Autorizados
                                </h4>
                                <div className="flex flex-wrap gap-2 pl-6">
                                    {workTypes.length > 0 ? (
                                        workTypes.map((type, idx) => (
                                            <Badge key={idx} variant="default" className="text-sm py-1 px-3">
                                                {type}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted-foreground italic text-sm">Ninguno seleccionado</span>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Descripción */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3">Descripción de la Tarea - Alcance</h4>
                                <div className="bg-gray-50 p-4 rounded-lg border pl-6">
                                    <p className="text-sm whitespace-pre-wrap text-gray-700">
                                        {state.generalInfo.workDescription || <span className="text-muted-foreground italic">No especificado</span>}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Herramientas */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                    <Wrench className="h-4 w-4" />
                                    Equipos y Herramientas ({state.generalInfo.tools?.length || 0})
                                </h4>
                                <div className="flex flex-wrap gap-2 pl-6">
                                    {state.generalInfo.tools && state.generalInfo.tools.length > 0 ? (
                                        state.generalInfo.tools.map((tool, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {tool.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted-foreground italic text-sm">Ninguna herramienta especificada</span>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Responsable */}
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                    <UserCheck className="h-4 w-4" />
                                    Responsables
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                                    <DetailField label="Solicitante" value={state.generalInfo.nombreSolicitante} />
                                    <DetailField label="Responsable del Trabajo" value={state.generalInfo.responsable?.nombre} />
                                    <DetailField label="Cargo" value={state.generalInfo.responsable?.cargo} />
                                    <DetailField label="Compañía" value={state.generalInfo.responsable?.compania} />
                                    <DetailField label="N° Trabajadores" value={state.generalInfo.numTrabajadores} />
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                {/* Anexo ATS */}
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-orange-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader icon={<Shield className="h-5 w-5 text-orange-600" />} title="Análisis de Trabajo Seguro (ATS)" />
                        <ChevronDown className="h-5 w-5 text-orange-600 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-orange-200 rounded-b-lg bg-white">
                        <div className="p-6 space-y-6">
                            {/* Peligros y Controles */}
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Peligros y Controles ({peligrosIdentificadosCount})
                                </h4>
                                <div className="space-y-4 pl-2">
                                    {Object.entries(hazardCategories).map(([category, hazards]) => {
                                        const selectedInCat = hazards.filter(h => state.anexoATS?.peligros?.[h.id] === 'si');
                                        if (selectedInCat.length === 0) return null;
                                        return (
                                            <div key={category} className="space-y-2">
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
                            </div>

                            <Separator />

                            {/* EPP */}
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 mb-3 flex items-center gap-2">
                                    <HardHat className="h-4 w-4" />
                                    EPP Requeridos ({eppRequeridos.length})
                                </h4>
                                <div className="flex flex-wrap gap-2 pl-6">
                                    {eppRequeridos.length > 0 ? (
                                        eppRequeridos.map((epp, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {epp}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted-foreground italic text-sm">Ningún EPP especificado</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                {/* Anexos condicionales */}
                {state.selectedWorkTypes.alturas && state.anexoAltura && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-blue-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-blue-600" />} title="Anexo: Trabajo en Alturas" />
                            <ChevronDown className="h-5 w-5 text-blue-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-blue-200 rounded-b-lg bg-white p-6 space-y-4">
                            <DetailField label="Tarea a Realizar" value={state.anexoAltura.tareaRealizar?.nombre} />
                            {state.anexoAltura.tipoEstructura?.otros && <DetailField label="Otro Tipo de Estructura" value={state.anexoAltura.tipoEstructura.otrosCual} />}
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
                             {state.anexoConfinado?.identificacionPeligros?.procedimientoComunicacion === 'si' && <DetailField label="Procedimiento de Comunicación" value={state.anexoConfinado.procedimientoComunicacionCual} />}
                             <DetailField label="Intervalo de Pruebas de Gases" value={state.anexoConfinado.pruebasGasesPeriodicas?.intervalo} />
                        </CollapsibleContent>
                    </Collapsible>
                )}
                 {state.selectedWorkTypes.energia && state.anexoEnergias && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-yellow-300 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-yellow-600" />} title="Anexo: Energías" />
                            <ChevronDown className="h-5 w-5 text-yellow-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-yellow-300 rounded-b-lg bg-white p-6 space-y-4">
                             {state.anexoEnergias.trabajosEnCaliente?.otro && <DetailField label="Otro (Trabajos en Caliente)" value={state.anexoEnergias.trabajosEnCaliente?.otro as string} />}
                        </CollapsibleContent>
                    </Collapsible>
                )}

                {/* Workers */}
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-green-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                        <SectionHeader 
                            icon={<Users className="h-5 w-5 text-green-600" />} 
                            title="Trabajadores Registrados" 
                            count={state.workers?.length || 0}
                        />
                        <ChevronDown className="h-5 w-5 text-green-600 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-2 border-t-0 border-green-200 rounded-b-lg bg-white p-6">
                        {workersSinFirma > 0 && (
                            <div className="mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                <p className="text-sm text-yellow-800">
                                    <strong>{workersSinFirma}</strong> trabajador{workersSinFirma !== 1 ? 'es' : ''} sin firma de apertura
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            {state.workers && state.workers.length > 0 ? (
                                state.workers.map((w, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-semibold">{w.nombre}</p>
                                            <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                                                <span>CC: {w.cedula}</span>
                                                <span>•</span>
                                                <span>{w.rol}</span>
                                            </div>
                                        </div>
                                        {w.firmaApertura ? (
                                            <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                                                ✓ Firmado
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Pendiente
                                            </Badge>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground italic py-8">No hay trabajadores registrados</p>
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Próximos Pasos */}
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
