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
  Building2,
  Briefcase,
  HardHat,
  Activity,
  Clock,
  MapPin,
  User,
  CalendarDays,
  ClipboardCheck,
  Layers,
  Signature
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { hazardCategories, eppOptions, justificacionOptions } from './AtsStep';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SignaturePad } from '@/components/ui/signature-pad';


// ============================================================================
// HELPERS
// ============================================================================

const DetailField = ({ 
    label, 
    value, 
    icon, 
    fullWidth = false 
}: { 
    label: string; 
    value: React.ReactNode; 
    icon?: React.ReactNode; 
    fullWidth?: boolean;
}) => (
    <div className={cn(
        "group space-y-1.5 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200",
        fullWidth && 'md:col-span-2 lg:col-span-3'
    )}>
        <div className="flex items-center gap-2">
            {icon && (
                <span className="text-primary/70 group-hover:text-primary transition-colors">
                    {icon}
                </span>
            )}
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {label}
            </p>
        </div>
        <div className={cn(
            "text-sm text-foreground font-medium",
            icon && "pl-6"
        )}>
            {value || (
                <span className="text-muted-foreground/60 italic text-xs">
                    No especificado
                </span>
            )}
        </div>
    </div>
);

const SectionHeader = ({ 
    icon, 
    title, 
    count,
    color = 'primary'
}: { 
    icon: React.ReactNode; 
    title: string; 
    count?: number;
    color?: 'primary' | 'orange' | 'blue' | 'purple' | 'green';
}) => {
    const colorClasses = {
        primary: 'text-primary',
        orange: 'text-orange-600',
        blue: 'text-blue-600',
        purple: 'text-purple-600',
        green: 'text-green-600'
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <span className={colorClasses[color]}>{icon}</span>
                <span className="font-semibold">{title}</span>
            </div>
            {count !== undefined && (
                <Badge 
                    variant="secondary" 
                    className="ml-2 tabular-nums font-semibold bg-white/80 shadow-sm"
                >
                    {count}
                </Badge>
            )}
        </div>
    );
};

const getStatusSymbol = (value: string | boolean | undefined): string => {
    if (value === 'si' || value === true) return '✓ SÍ';
    if (value === 'no' || value === false) return '✗ NO';
    if (value === 'na') return 'N/A';
    return '—';
};

const getStatusVariant = (value: string | boolean | undefined) => {
    if (value === 'si' || value === true) return 'default';
    if (value === 'no' || value === false) return 'destructive';
    return 'secondary';
};

const ReviewChecklist = ({ 
    title, 
    items, 
    data,
    accentColor = 'primary'
}: { 
    title: string; 
    items: { id: string; label: string }[]; 
    data: any;
    accentColor?: string;
}) => (
    <div className="space-y-3">
        <h4 className={cn(
            "text-sm font-bold flex items-center gap-2",
            accentColor === 'blue' && 'text-blue-600',
            accentColor === 'purple' && 'text-purple-600',
            accentColor === 'primary' && 'text-primary'
        )}>
            <ClipboardCheck className="h-4 w-4" />
            {title}
        </h4>
        <div className="grid gap-1.5">
            {items.map(item => (
                <div 
                    key={item.id} 
                    className="flex justify-between items-center text-sm py-2 px-3 rounded-md bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                    <span className="flex-1 pr-4 text-muted-foreground text-[13px]">
                        {item.label}
                    </span>
                    <Badge 
                        variant={getStatusVariant(data?.[item.id])}
                        className={cn(
                            "text-[10px] font-semibold min-w-[40px] justify-center",
                            (data?.[item.id] === 'si' || data?.[item.id] === true) && 
                                "bg-green-100 text-green-700 hover:bg-green-100",
                            data?.[item.id] === 'no' && 
                                "bg-red-100 text-red-700 hover:bg-red-100",
                            data?.[item.id] === 'na' && 
                                "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        {getStatusSymbol(data?.[item.id])}
                    </Badge>
                </div>
            ))}
        </div>
    </div>
);

// Componente de Card de Estadística mejorado
const StatCard = ({
    icon: Icon,
    value,
    label,
    colorClass
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: number;
    label: string;
    colorClass: string;
}) => (
    <div className="group flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
        <div className={cn(
            "p-2.5 rounded-xl transition-transform group-hover:scale-105",
            colorClass
        )}>
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <p className="text-2xl font-bold tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
        </div>
    </div>
);

// Componente Collapsible Section mejorado
const CollapsibleSection = ({
    children,
    trigger,
    borderColor,
    defaultOpen = false
}: {
    children: React.ReactNode;
    trigger: React.ReactNode;
    borderColor: string;
    defaultOpen?: boolean;
}) => (
    <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger className={cn(
            "flex w-full items-center justify-between rounded-xl border-2 bg-white px-5 py-4 text-left font-semibold transition-all duration-200",
            "hover:bg-gray-50/80 hover:shadow-sm",
            "data-[state=open]:rounded-b-none",
            borderColor
        )}>
            {trigger}
            <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className={cn(
            "border-2 border-t-0 rounded-b-xl bg-white p-6 space-y-5",
            "animate-in slide-in-from-top-2 duration-200",
            borderColor
        )}>
            {children}
        </CollapsibleContent>
    </Collapsible>
);

// ============================================================================
// CONSTANTES DE ANEXOS
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
    { id: 'vigiaPermanente', label: 'O.SE VERIFICA QUE PARA EL INGRESO A ESPACIOS CONFINADOS SE CUENTE UN VIGIA PERMANENTE EN EL AREA' },
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
    const { state, dispatch } = usePermitForm();
    const [isSignatureDialogOpen, setIsSignatureDialogOpen] = React.useState(false);

    const handleSaveSignature = (signatureDataUrl: string) => {
        dispatch({
            type: 'UPDATE_SIGNATURE',
            payload: {
                target: 'solicitanteFirmaApertura',
                signature: signatureDataUrl,
                context: null
            }
        });
        setIsSignatureDialogOpen(false);
    };

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
        <div className="space-y-8 pb-8">
            {/* Header mejorado */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/10">
                    <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Revisión Final del Permiso
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
                        Verifique cuidadosamente toda la información antes de guardar. 
                        Podrá realizar modificaciones desde la vista de detalles.
                    </p>
                </div>
            </div>

            {/* Resumen Ejecutivo mejorado */}
            <Card className="bg-gradient-to-br from-slate-50 via-white to-primary/5 border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                        <Activity className="h-5 w-5 text-primary" />
                        Resumen Ejecutivo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <StatCard
                            icon={Users}
                            value={state.workers?.length || 0}
                            label="Trabajadores"
                            colorClass="bg-blue-100 text-blue-600"
                        />
                        <StatCard
                            icon={AlertTriangle}
                            value={peligrosIdentificadosCount}
                            label="Peligros"
                            colorClass="bg-orange-100 text-orange-600"
                        />
                        <StatCard
                            icon={HardHat}
                            value={eppRequeridos.length}
                            label="EPPs"
                            colorClass="bg-green-100 text-green-600"
                        />
                        <StatCard
                            icon={Briefcase}
                            value={workTypes.length}
                            label="Tipos de Trabajo"
                            colorClass="bg-purple-100 text-purple-600"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Secciones Colapsables */}
            <div className="space-y-4">
                {/* Información General */}
                <CollapsibleSection
                    defaultOpen
                    borderColor="border-primary/20 hover:border-primary/30"
                    trigger={
                        <SectionHeader 
                            icon={<FileText className="h-5 w-5" />} 
                            title="Información General del Permiso"
                            color="primary"
                        />
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <DetailField 
                            label="Área Específica" 
                            value={state.generalInfo.areaEspecifica}
                            icon={<MapPin className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Planta" 
                            value={state.generalInfo.planta}
                            icon={<Building2 className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Proceso" 
                            value={state.generalInfo.proceso}
                            icon={<Layers className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Contrato" 
                            value={state.generalInfo.contrato}
                            icon={<FileText className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Empresa" 
                            value={state.generalInfo.empresa}
                            icon={<Building2 className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Vigencia" 
                            value={
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                    {state.generalInfo.validFrom 
                                        ? format(new Date(state.generalInfo.validFrom), "dd/MM/yy HH:mm", { locale: es }) 
                                        : '—'
                                    }
                                    <span className="text-muted-foreground mx-1">→</span>
                                    {state.generalInfo.validUntil 
                                        ? format(new Date(state.generalInfo.validUntil), "dd/MM/yy HH:mm", { locale: es }) 
                                        : '—'
                                    }
                                </span>
                            }
                            icon={<Clock className="h-3.5 w-3.5" />}
                        />
                        <DetailField 
                            label="Tipos de Trabajo" 
                            value={
                                <div className="flex flex-wrap gap-1.5">
                                    {workTypes.map((type, idx) => (
                                        <Badge 
                                            key={idx} 
                                            variant="secondary"
                                            className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/15"
                                        >
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            }
                            fullWidth
                        />
                        <DetailField 
                            label="Descripción de la Tarea" 
                            value={
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {state.generalInfo.workDescription}
                                </p>
                            }
                            fullWidth
                        />
                    </div>
                    
                    <Separator className="my-5" />
                    
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            Responsables del Permiso
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <DetailField 
                                label="Solicitante" 
                                value={state.generalInfo.nombreSolicitante}
                            />
                            <DetailField 
                                label="LÍDER A CARGO DEL EQUIPO EJECUTANTE" 
                                value={state.generalInfo.responsable?.nombre}
                            />
                            <DetailField 
                                label="Cargo" 
                                value={state.generalInfo.responsable?.cargo}
                            />
                        </div>
                    </div>
                </CollapsibleSection>
                
                {/* ATS */}
                <CollapsibleSection
                    borderColor="border-orange-200 hover:border-orange-300"
                    trigger={
                        <SectionHeader 
                            icon={<Shield className="h-5 w-5" />} 
                            title="Análisis de Trabajo Seguro (ATS)" 
                            count={peligrosIdentificadosCount + eppRequeridos.length}
                            color="orange"
                        />
                    }
                >
                    {/* Peligros */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-orange-600 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Peligros y Controles Identificados
                        </h4>
                        
                        {Object.entries(hazardCategories).map(([category, hazards]) => {
                            const selectedInCat = hazards.filter(h => state.anexoATS?.peligros?.[h.id] === 'si');
                            if (selectedInCat.length === 0) return null;
                            
                            return (
                                <div key={category} className="space-y-2">
                                    <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                                        {category}
                                    </h5>
                                    <div className="space-y-2 pl-4">
                                        {selectedInCat.map(h => (
                                            <div 
                                                key={h.id} 
                                                className="p-3 bg-gradient-to-r from-orange-50/80 to-transparent rounded-lg border-l-4 border-orange-300"
                                            >
                                                <p className="font-semibold text-sm text-gray-800">{h.label}</p>
                                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                    {h.control}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {state.anexoATS?.peligrosAdicionales && state.anexoATS.peligrosAdicionales.length > 0 && (
                            <div className="space-y-2">
                                <h5 className="font-semibold text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                                    OTROS PELIGROS (MANUALES)
                                </h5>
                                <div className="space-y-2 pl-4">
                                    {state.anexoATS.peligrosAdicionales.map((p, i) => (
                                        <div 
                                            key={`add-${i}`} 
                                            className="p-3 bg-gradient-to-r from-orange-50/80 to-transparent rounded-lg border-l-4 border-orange-300"
                                        >
                                            <p className="font-semibold text-sm text-gray-800">{p.peligro}</p>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                {p.descripcion}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* EPP */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-orange-600 flex items-center gap-2">
                            <HardHat className="h-4 w-4" />
                            EPP Requeridos
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {eppRequeridos.length > 0 ? (
                                eppRequeridos.map((epp, idx) => (
                                    <div 
                                        key={idx} 
                                        className="flex items-center gap-2 p-2.5 rounded-lg bg-green-50/50 border border-green-100"
                                    >
                                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{epp}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground italic text-sm col-span-2 text-center py-4">
                                    Ningún EPP especificado
                                </p>
                            )}
                        </div>
                    </div>

                    <Separator />
                    
                    {/* Justificación */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-orange-600 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Justificación de Uso
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {justificacionOptions.filter(j => state.anexoATS?.justificacion?.[j.id]).map(j => (
                                <div 
                                    key={j.id} 
                                    className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100"
                                >
                                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{j.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CollapsibleSection>
                
                {/* Anexo Alturas */}
                {state.selectedWorkTypes.alturas && state.anexoAltura && (
                    <CollapsibleSection
                        borderColor="border-blue-200 hover:border-blue-300"
                        trigger={
                            <SectionHeader 
                                icon={<AlertTriangle className="h-5 w-5" />} 
                                title="Anexo: Trabajo en Alturas"
                                color="blue"
                            />
                        }
                    >
                        <ReviewChecklist 
                            title="Aspectos de Seguridad" 
                            items={anexoAlturaAspectos} 
                            data={state.anexoAltura.aspectosSeguridad}
                            accentColor="blue"
                        />
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailField 
                                label="Otro Tipo de Estructura" 
                                value={state.anexoAltura.tipoEstructura?.otrosCual}
                            />
                            <DetailField 
                                label="Observaciones de Afectaciones" 
                                value={state.anexoAltura.afectaciones?.observaciones}
                            />
                        </div>
                    </CollapsibleSection>
                )}

                {/* Anexo Espacios Confinados */}
                {state.selectedWorkTypes.confinado && state.anexoConfinado && (
                    <CollapsibleSection
                        borderColor="border-purple-200 hover:border-purple-300"
                        trigger={
                            <SectionHeader 
                                icon={<AlertTriangle className="h-5 w-5" />} 
                                title="Anexo: Espacios Confinados"
                                color="purple"
                            />
                        }
                    >
                        <ReviewChecklist 
                            title="Identificación de Peligros" 
                            items={anexoConfinadoPeligros} 
                            data={state.anexoConfinado.identificacionPeligros}
                            accentColor="purple"
                        />
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailField 
                                label="Procedimiento de Comunicación" 
                                value={state.anexoConfinado.procedimientoComunicacionCual}
                            />
                            <DetailField 
                                label="Intervalo de Pruebas de Gases" 
                                value={state.anexoConfinado.pruebasGasesPeriodicas?.intervalo}
                            />
                        </div>
                        
                        {state.anexoConfinado.pruebasGasesPeriodicas?.pruebas && 
                         state.anexoConfinado.pruebasGasesPeriodicas.pruebas.length > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-purple-600 flex items-center gap-2">
                                        <Activity className="h-4 w-4" />
                                        Pruebas de Gases Periódicas
                                    </h4>
                                    <div className="rounded-lg border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-muted/50">
                                                    <TableHead className="font-semibold">Hora</TableHead>
                                                    <TableHead className="font-semibold">LEL</TableHead>
                                                    <TableHead className="font-semibold">O₂</TableHead>
                                                    <TableHead className="font-semibold">H₂S</TableHead>
                                                    <TableHead className="font-semibold">CO</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {state.anexoConfinado.pruebasGasesPeriodicas.pruebas.map((p, idx) => (
                                                    <TableRow 
                                                        key={p.id}
                                                        className={cn(idx % 2 === 0 && "bg-muted/20")}
                                                    >
                                                        <TableCell className="font-medium">{p.hora}</TableCell>
                                                        <TableCell>{p.lel}</TableCell>
                                                        <TableCell>{p.o2}</TableCell>
                                                        <TableCell>{p.h2s}</TableCell>
                                                        <TableCell>{p.co}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </>
                        )}
                    </CollapsibleSection>
                )}

                {/* Trabajadores */}
                <CollapsibleSection
                    borderColor="border-green-200 hover:border-green-300"
                    trigger={
                        <SectionHeader 
                            icon={<Users className="h-5 w-5" />} 
                            title="Trabajadores Registrados" 
                            count={state.workers?.length || 0}
                            color="green"
                        />
                    }
                >
                    <div className="space-y-2">
                        {state.workers && state.workers.length > 0 ? (
                            state.workers.map((w, i) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                                        w.firmaApertura 
                                            ? "bg-green-50/50 border-green-200 hover:border-green-300" 
                                            : "bg-amber-50/50 border-amber-200 hover:border-amber-300"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                                            w.firmaApertura 
                                                ? "bg-green-100 text-green-700" 
                                                : "bg-amber-100 text-amber-700"
                                        )}>
                                            {w.nombre?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{w.nombre}</p>
                                            <p className="text-xs text-muted-foreground">
                                                CC: {w.cedula} • {w.rol}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge 
                                        variant={w.firmaApertura ? 'default' : 'outline'}
                                        className={cn(
                                            "self-start sm:self-center text-xs font-medium",
                                            w.firmaApertura 
                                                ? 'bg-green-500 hover:bg-green-500 text-white' 
                                                : 'border-amber-400 text-amber-600'
                                        )}
                                    >
                                        {w.firmaApertura ? '✓ Firmado' : '○ Pendiente'}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p className="italic">No hay trabajadores registrados</p>
                            </div>
                        )}
                    </div>
                </CollapsibleSection>

                 {/* NEW SIGNATURE SECTION */}
                <CollapsibleSection
                    borderColor="border-green-200 hover:border-green-300"
                    defaultOpen={true}
                    trigger={
                        <SectionHeader 
                            icon={<Signature className="h-5 w-5" />} 
                            title="Firma del Líder a Cargo y Envío"
                            color="green"
                        />
                    }
                >
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Como paso final, el líder a cargo del equipo ejecutante debe firmar para confirmar que toda la información es correcta y enviar el permiso al flujo de aprobación.
                        </p>
                        <Card className="p-4 bg-muted/30">
                            <CardTitle className="text-base mb-2">LÍDER A CARGO DEL EQUIPO EJECUTANTE</CardTitle>
                            <div className="text-sm space-y-1 text-muted-foreground">
                                <p><span className="font-semibold text-foreground">{state.generalInfo.responsable?.nombre || 'No especificado'}</span></p>
                                <p>{state.generalInfo.responsable?.cargo || 'Sin cargo'}</p>
                                <p>{state.generalInfo.responsable?.compania || 'Sin compañía'}</p>
                            </div>
                        </Card>

                        {state.solicitanteFirmaApertura ? (
                            <div className="text-center space-y-3">
                                <p className="text-sm font-medium text-green-600 flex items-center justify-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    ¡Permiso Firmado y Listo para Enviar!
                                </p>
                                <div className="flex justify-center p-2 border-2 border-dashed bg-green-50 rounded-lg">
                                    <Image
                                        src={state.solicitanteFirmaApertura}
                                        alt="Firma del solicitante"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsSignatureDialogOpen(true)}>
                                    Volver a Firmar
                                </Button>
                            </div>
                        ) : (
                             <Button className="w-full h-12" onClick={() => setIsSignatureDialogOpen(true)}>
                                <Signature className="mr-2 h-5 w-5" />
                                Firmar y Habilitar Envío
                            </Button>
                        )}
                    </div>
                </CollapsibleSection>

            </div>

            {/* Próximos Pasos mejorado */}
            <Card className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50 border-blue-200/60 shadow-lg shadow-blue-100/50 overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        Próximos Pasos
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { step: 1, text: <>Firme el permiso en la sección <strong>"Firma del Líder a Cargo"</strong>. Esto habilitará el botón de envío final.</> },
                        { step: 2, text: <>Presione <strong>"Enviar Permiso para Autorización"</strong> para guardar los cambios y enviarlo al flujo de aprobación.</> },
                        { step: 3, text: <>El permiso cambiará de estado a "Pendiente de Revisión" y se notificará a los aprobadores correspondientes.</> }
                    ].map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-4 group">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
                                {step}
                            </div>
                            <p className="text-sm text-blue-800 leading-relaxed pt-1">
                                {text}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Signature Dialog */}
            <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Firma del Líder a Cargo</DialogTitle>
                        <DialogDescription>
                            Al firmar, confirma que toda la información del permiso es correcta.
                        </DialogDescription>
                    </DialogHeader>
                    <SignaturePad onSave={handleSaveSignature} />
                </DialogContent>
            </Dialog>
        </div>
    );
}