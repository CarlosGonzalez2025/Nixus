'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, CheckCircle, ChevronDown, Users, Shield, AlertTriangle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const DetailField = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
        <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
        <p className="text-sm text-gray-800">{value || 'N/A'}</p>
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
        
        return selected.length > 0 ? selected.join(', ') : 'Ninguno seleccionado';
    };

    const getCheckedItems = (obj: { [key: string]: any } | undefined) => {
        if (!obj) return [];
        return Object.entries(obj)
            .filter(([, value]) => value === true || value === 'si')
            .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    Revisión Final
                </h2>
                <p className="text-muted-foreground text-sm">
                    Por favor, revise toda la información antes de guardar el permiso.
                </p>
            </div>

            <div className="space-y-4">
                {/* General Info */}
                <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold">
                        <span className="flex items-center gap-2"><FileText size={16} /> Información General</span>
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 border border-t-0 rounded-b-lg p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <DetailField label="Solicitante" value={state.generalInfo.nombreSolicitante} />
                            <DetailField label="Empresa" value={state.generalInfo.empresa} />
                            <DetailField label="Área Específica" value={state.generalInfo.areaEspecifica} />
                            <DetailField label="Planta" value={state.generalInfo.planta} />
                            <DetailField label="Proceso" value={state.generalInfo.proceso} />
                            <DetailField label="Contrato" value={state.generalInfo.contrato} />
                            <DetailField label="Validez Desde" value={state.generalInfo.validFrom ? format(new Date(state.generalInfo.validFrom), 'PPpp') : 'N/A'} />
                            <DetailField label="Validez Hasta" value={state.generalInfo.validUntil ? format(new Date(state.generalInfo.validUntil), 'PPpp') : 'N/A'} />
                        </div>
                        <DetailField label="Tipos de Trabajo Seleccionados" value={<span className="font-medium text-primary">{getWorkTypesString()}</span>} />
                        <DetailField label="Descripción de la Tarea / Alcance" value={<p className="whitespace-pre-wrap">{state.generalInfo.workDescription}</p>} />
                        <DetailField label="Herramientas" value={state.generalInfo.tools?.map(t => t.name).join(', ') || 'Ninguna'} />
                        <DetailField label="Número de Trabajadores" value={state.generalInfo.numTrabajadores} />
                        <DetailField label="Responsable del Trabajo" value={`${state.generalInfo.responsable?.nombre} (${state.generalInfo.responsable?.cargo})`} />
                    </CollapsibleContent>
                </Collapsible>
                
                 {/* Anexo ATS */}
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold">
                        <span className="flex items-center gap-2"><Shield size={16} /> Análisis de Trabajo Seguro (ATS)</span>
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 border border-t-0 rounded-b-lg p-4">
                        <DetailField label="Peligros Identificados ('SI')" value={getCheckedItems(state.anexoATS?.peligros).join(', ') || 'Ninguno'} />
                        <DetailField label="EPP Requeridos" value={getCheckedItems(state.anexoATS?.epp).join(', ') || 'Ninguno'} />
                        <DetailField label="Justificación de Uso" value={getCheckedItems(state.anexoATS?.justificacion).join(', ') || 'Ninguna'} />
                    </CollapsibleContent>
                </Collapsible>
                
                 {/* Anexos condicionales */}
                 {state.selectedWorkTypes.alturas && (
                     <Collapsible>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold">
                            <span className="flex items-center gap-2"><AlertTriangle size={16} /> Anexo: Trabajo en Alturas</span>
                            <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border border-t-0 rounded-b-lg p-4">
                            <DetailField label="Aspectos de Seguridad ('SI')" value={getCheckedItems(state.anexoAltura?.aspectosSeguridad).join(', ') || 'Ninguno'} />
                        </CollapsibleContent>
                    </Collapsible>
                 )}
                
                {/* Workers */}
                <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-left text-sm font-semibold">
                       <span className="flex items-center gap-2"><Users size={16} /> Trabajadores ({state.workers?.length || 0})</span>
                       <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border border-t-0 rounded-b-lg p-4">
                        <ul className="space-y-2">
                            {state.workers?.map((w, i) => (
                                <li key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                    <span>{w.nombre} <span className="text-muted-foreground">({w.rol})</span></span>
                                    {w.firmaApertura ? <Badge variant="default" className="bg-green-100 text-green-800">Firmado</Badge> : <Badge variant="destructive">Firma Pendiente</Badge>}
                                </li>
                            ))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </div>

             <Card className="bg-blue-50 border-blue-200 mt-6">
                <CardHeader>
                    <CardTitle className="text-base text-blue-800 flex items-center gap-2">
                        <CheckCircle size={20}/>
                        Próximos Pasos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-blue-700">
                        Al guardar, se creará un borrador del permiso. Luego será redirigido a la página de detalles para que el solicitante principal pueda firmar y activar el flujo de aprobación.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
