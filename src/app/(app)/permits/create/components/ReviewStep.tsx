'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
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

const DetailField = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => (
    <div className="space-y-1">
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

    const getCheckedItems = (obj: { [key: string]: any } | undefined) => {
        if (!obj) return [];
        return Object.entries(obj)
            .filter(([, value]) => value === true || value === 'si')
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    };

    const workTypes = getWorkTypesString();
    const peligrosIdentificados = getCheckedItems(state.anexoATS?.peligros);
    const eppRequeridos = getCheckedItems(state.anexoATS?.epp);
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
                                <p className="text-2xl font-bold">{peligrosIdentificados.length}</p>
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
                                    <DetailField label="Área Específica" value={state.generalInfo.areaEspecifica} />
                                    <DetailField label="Planta" value={state.generalInfo.planta} />
                                    <DetailField label="Proceso" value={state.generalInfo.proceso} />
                                    <DetailField label="Contrato" value={state.generalInfo.contrato} />
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
                            {/* Peligros */}
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Peligros Identificados ({peligrosIdentificados.length})
                                </h4>
                                <div className="pl-6">
                                    {peligrosIdentificados.length > 0 ? (
                                        <ul className="space-y-2">
                                            {peligrosIdentificados.map((peligro, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm">
                                                    <span className="text-orange-600 mt-0.5">•</span>
                                                    <span>{peligro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-muted-foreground italic text-sm">Ningún peligro identificado</span>
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

                            <Separator />

                            {/* Justificación */}
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 mb-3">Justificación de Uso del ATS</h4>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 pl-6">
                                    <p className="text-sm">
                                        {getCheckedItems(state.anexoATS?.justificacion).join(', ') || <span className="text-muted-foreground italic">No especificada</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                
                {/* Anexos condicionales */}
                {state.selectedWorkTypes.alturas && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-blue-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-blue-600" />} title="Anexo: Trabajo en Alturas" />
                            <ChevronDown className="h-5 w-5 text-blue-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-blue-200 rounded-b-lg bg-white p-6">
                            <DetailField label="Aspectos de Seguridad Verificados" value={
                                getCheckedItems(state.anexoAltura?.aspectosSeguridad).join(', ') || 'Ninguno'
                            } />
                        </CollapsibleContent>
                    </Collapsible>
                )}

                {state.selectedWorkTypes.confinado && (
                    <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border-2 border-purple-200 bg-white hover:bg-gray-50 px-4 py-4 text-left font-semibold transition-colors">
                            <SectionHeader icon={<AlertTriangle className="h-5 w-5 text-purple-600" />} title="Anexo: Espacios Confinados" />
                            <ChevronDown className="h-5 w-5 text-purple-600 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-2 border-t-0 border-purple-200 rounded-b-lg bg-white p-6">
                            <p className="text-sm text-muted-foreground">Información del anexo de espacios confinados cargada.</p>
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
