'use client';

import * as React from 'react';
import { usePermitForm } from '../form-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

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
                    case 'caliente': return 'Trabajo en Caliente';
                    case 'excavacion': return 'Excavaciones';
                    case 'general': return 'Trabajo General';
                    default: return '';
                }
            })
            .filter(Boolean);
        
        return selected.length > 0 ? selected.join(', ') : 'Ninguno seleccionado';
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
                    Revisión Final
                </h2>
                <p className="text-muted-foreground text-sm">
                    Por favor, revise la información antes de enviar el permiso para su aprobación.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Resumen del Permiso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="font-semibold">Solicitante:</p>
                            <p>{state.generalInfo.nombreSolicitante || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold">Empresa:</p>
                            <p>{state.generalInfo.empresa || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold">Área/Planta:</p>
                            <p>{state.generalInfo.areaEspecifica} / {state.generalInfo.planta}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold">Validez:</p>
                            <p>
                                {state.generalInfo.validFrom ? new Date(state.generalInfo.validFrom).toLocaleString() : 'N/A'} - 
                                {state.generalInfo.validUntil ? new Date(state.generalInfo.validUntil).toLocaleString() : 'N/A'}
                            </p>
                        </div>
                         <div className="space-y-1 md:col-span-2">
                            <p className="font-semibold">Tipos de Trabajo Seleccionados:</p>
                            <p className="font-medium text-primary">{getWorkTypesString()}</p>
                        </div>
                    </div>
                     <div className="border-t pt-4">
                        <p className="font-semibold">Trabajadores ({state.workers?.length || 0}):</p>
                        <ul className="list-disc pl-5 mt-2 text-sm">
                            {state.workers?.map((w, i) => <li key={i}>{w.nombre} ({w.rol})</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-base text-blue-800 flex items-center gap-2">
                        <CheckCircle size={20}/>
                        Próximos Pasos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-blue-700">
                        Una vez que haga clic en "Enviar para Aprobación", el permiso será creado y notificado a los responsables para que inicien el proceso de firmas digitales. No podrá editar el permiso después de enviarlo.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
