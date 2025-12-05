

import type { Timestamp } from 'firebase/firestore';

export type PermitStatus = 'borrador' | 'pendiente_revision' | 'aprobado' | 'en_ejecucion' | 'suspendido' | 'cerrado' | 'rechazado';

export type UserRole = 'solicitante' | 'autorizante' | 'lider_tarea' | 'ejecutante' | 'lider_sst' | 'admin' | 'mantenimiento';

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: UserRole;
  area?: string;
  telefono?: string;
  empresa?: string;
  ciudad?: string;
  planta?: string;
  disabled?: boolean;
}

export type Approval = {
  userId?: string | null;
  userName?: string | null;
  signedAt?: string | null;
  status: 'aprobado' | 'rechazado' | 'pendiente';
  comments?: string;
  area?: string;
  firmaApertura?: string | null;
  firmaCierre?: string | null;
  // ✨ CORRECCIÓN: Nuevos campos para detalles del firmante
  userRole?: UserRole;
  userEmpresa?: string;
}

export interface ExternalWorker {
  nombre: string;
  cedula: string;
  rol: string;
  otroRol?: string;
  tsaTec: {
    tec: boolean;
    tsa: boolean;
  };
  entrenamiento: {
    tec: boolean;
    tsa: boolean;
    otro: boolean;
    otroCual?: string;
  };
  eps: string;
  arl: string;
  pensiones: string;
  foto?: string;
  firmaApertura?: string;
  firmaCierre?: string;
}

export type Tool = {
  name: string;
  status: 'B' | 'M'; // Bueno o Malo
}

export type PermitClosure = {
  informeCulminacion: 'si' | 'no' | 'na';
  areaDespejada: 'si' | 'no' | 'na';
  evidenciaParticulas: 'si' | 'no' | 'na';
  continuaLabor: 'si' | 'no' | 'na';
  seguimientoCaliente?: {
    hora1: string;
    hora2: string;
    hora3: string;
  };
  dispositivosRetirados: 'si' | 'no' | 'na';
  validezDesde: string;
  validezHasta: string;
  fechaCierre: string;
  horaCierre: string;
  autoridad?: Partial<AutorizacionPersona>;
  responsable?: Partial<AutorizacionPersona>;
  // Adicional para Cancelación
  cancelado?: 'si' | 'no' | 'na';
  razonCancelacion?: string;
  canceladoPor?: Partial<AutorizacionPersona>;
}

export type JustificacionATS = {
    [key: string]: boolean;
}

export type AnexoATS = {
  peligros?: { [key: string]: 'si' | 'no' };
  controles?: { [key: string]: 'si' | 'no' | 'na' };
  epp?: { 
    [key: string]: boolean | string;
    casco_seguridad_tipo?: string;
    casco_seguridad_clase?: string;
    casco_seguridad_barbuquejo?: 'con_barbuquejo' | 'sin_barbuquejo' | '';
  };
  justificacion?: { [key: string]: boolean };
  peligrosAdicionales?: { peligro: string, descripcion: string }[];
};

export type ValidacionDiaria = {
  dia: number;
  fecha: string;
  nombre: string;
  firma: string;
};

export type AutorizacionPersona = {
  nombre: string;
  firma: string;
  hora: string;
  cedula?: string;
  fecha?: string;
}

export type AnexoAltura = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  alturaAproximada?: string;
  tareaRealizar?: {
    id: string;
    nombre: string;
    descripcion: string;
  };
  tipoEstructura: {
    [key: string]: boolean | string;
  };
  aspectosSeguridad: { [key: string]: 'si' | 'no' | 'na' };
  precauciones: { [key: string]: 'si' | 'no' | 'na' | string };
  afectaciones: {
    riesgoOtrasAreas: 'si' | 'no' | 'na';
    otrasAreasRiesgo: 'si' | 'no' | 'na';
    personalNotificado: 'si' | 'no' | 'na';
    observaciones: string;
  };
  autoridadArea?: Partial<AutorizacionPersona>;
  responsableTrabajo?: Partial<AutorizacionPersona>;
  coordinadorTrabajosAltura?: Partial<AutorizacionPersona>;
  validacion?: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion?: {
    seCancelo: 'si' | 'no' | 'na';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre?: {
    seTermino: 'si' | 'no' | 'na';
    observaciones: string;
    autoridad?: Partial<AutorizacionPersona>;
    responsable?: Partial<AutorizacionPersona>;
  };
};

export type PruebaGasesInicial = {
  lel?: string;
  o2?: string;
  h2s?: string;
  co?: string;
  otros?: string;
  serialMonitor?: string;
  horaPrueba?: string;
  nombreQuienRealiza?: string;
  firmaQuienRealiza?: string;
}

export type PruebaGasesPeriodica = {
  id: string;
  lel: string;
  o2: string;
  h2s: string;
  co: string;
  hora: string;
  firma: string;
}

export type MedicionAtmosferica = {
  id?: string;
  fecha?: string;
  hora?: string;
  oxigeno?: string;      // O2
  lel?: string;          // Límite Explosivo Inferior
  h2s?: string;          // Sulfuro de Hidrógeno
  co?: string;           // Monóxido de Carbono
  otros?: string;        // Otros gases
  temperatura?: string;
  humedad?: string;
  presion?: string;
  realizadaPor?: string;
  nombreTecnico?: string;
  firma?: string;
  serialEquipo?: string;
  observaciones?: string;
}

export type SupervisorConfinado = {
    nombre: string;
    cedula: string;
    firma: string;
    hora: string;
}

export type AnexoConfinado = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  identificacionPeligros?: { [key: string]: 'si' | 'no' | 'na' };
  procedimientoComunicacionCual?: string;
  precauciones?: { [key: string]: 'si' | 'no' | 'na' };
  resultadosPruebasGases?: Partial<PruebaGasesInicial>;
  requerimientosEquipos?: { [key: string]: 'si' | 'no' | 'na' };
  pruebasGasesPeriodicas?: {
    intervalo: string;
    pruebas: PruebaGasesPeriodica[];
    pruebaRealizadaPor: string;
    serialMonitor: string;
    marca: string;
    fechaCalibracion: string;
  };
  autoridadDelArea?: Partial<AutorizacionPersona>;
  responsableDelTrabajo?: Partial<AutorizacionPersona>;
  supervisorTrabajo?: Partial<SupervisorConfinado>;
  validacion?: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion?: {
    seCancelo: 'si' | 'no' | 'na';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre?: {
    seTermino: 'si' | 'no' | 'na';
    observaciones: string;
    autoridad?: Partial<AutorizacionPersona>;
    responsable?: Partial<AutorizacionPersona>;
  };
};

export type AnexoEnergias = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  trabajosEnCaliente?: {
    [key: string]: 'si' | 'no' | 'na' | string;
  };
  energiasPeligrosas?: {
    [key: string]: boolean | string;
  };
  procedimientoLOTO?: {
    [key: string]: 'si' | 'no' | 'na';
  };
  trabajosConEnergiaElectrica?: {
    [key: string]: 'si' | 'no' | 'na';
  };
  tensionExpuesta?: {
    [key: string]: 'si' | 'no' | 'na';
  };
  planeacion?: {
    [key: string]: 'si' | 'no' | 'na';
  };
  metodoTrabajo?: {
    sinTension: boolean;
    conTension: boolean;
  };
  trabajoConTension?: {
    [key: string]: boolean | 'si' | 'no' | 'na';
  };
  trabajoSinTension?: {
    [key: string]: 'si' | 'no' | 'na';
  };
  observaciones?: string;
};

export type AnexoIzaje = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  informacionGeneral: {
    accion: { [key: string]: boolean };
    pesoCarga: { [key: string]: boolean };
    equipoUtilizar: { [key: string]: boolean };
    capacidadEquipo: string;
  };
  aspectosRequeridos: { [key: string]: 'si' | 'no' | 'na' };
  precauciones: { [key: string]: boolean };
  autoridadArea?: Partial<AutorizacionPersona>;
  responsableTrabajo?: Partial<AutorizacionPersona>;
  validacion?: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion?: {
    seCancelo: 'si' | 'no' | 'na';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre?: {
    seTermino: 'si' | 'no' | 'na';
    observaciones: string;
    autoridad?: Partial<AutorizacionPersona>;
    responsable?: Partial<AutorizacionPersona>;
  };
};

export type AnexoExcavaciones = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  informacionGeneral: {
    dimensiones: string;
    profundidad: string;
    ancho: string;
    largo: string;
  };
  aspectosRequeridos: { [key: string]: 'si' | 'no' | 'na' };
  precauciones: { [key: string]: boolean };
  autoridadArea?: Partial<AutorizacionPersona>;
  responsableTrabajo?: Partial<AutorizacionPersona>;
  validacion?: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion?: {
    seCancelo: 'si' | 'no' | 'na';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre?: {
    seTermino: 'si' | 'no' | 'na';
    observaciones: string;
    autoridad?: Partial<AutorizacionPersona>;
    responsable?: Partial<AutorizacionPersona>;
  };
};

export type VerificacionPeligros = {
  fisicos?: { [key: string]: 'si' | 'no' | 'na' };
  quimicos?: { [key: string]: 'si' | 'no' | 'na' };
  seguridad?: { [key: string]: 'si' | 'no' | 'na' };
  locativos?: { [key: string]: 'si' | 'no' | 'na' };
  biologicoAmbiental?: { [key: string]: 'si' | 'no' | 'na' };
  biomecanicos?: { [key: string]: 'si' | 'no' | 'na' };
  psicosocial?: { [key: string]: 'si' | 'no' | 'na' };
};

export type EppEmergencias = {
  epp?: {
    [key: string]: 'si' | 'no' | 'na' | string;
  };
  emergencias?: {
    [key: string]: 'si' | 'no' | 'na';
  };
};

export type PermitGeneralInfo = {
    areaEspecifica: string;
    planta: string;
    proceso: string;
    contrato: string;
    empresa: string;
    nombreSolicitante: string;
    fechaCreacion: string;
    validFrom: string;
    validUntil: string;
    workDescription: string;
    tools: Tool[];
    numTrabajadores: string;
    reunionInicio: 'si' | 'no' | 'na';
    atsVerificado: 'si' | 'no' | 'na';
    responsable: {
        nombre: string;
        cargo: string;
        compania: string;
        alcance: string;
    }
}

export type SelectedWorkTypes = {
  alturas: boolean;
  confinado: boolean;
  energia: boolean;
  izaje: boolean;
  excavacion: boolean;
  general: boolean;
}

export type Permit = {
  id: string;
  number?: string;
  status: PermitStatus;
  createdBy: string;
  createdAt: Timestamp;
  rejectionReason?: string;
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  
  generalInfo: Partial<PermitGeneralInfo>;
  selectedWorkTypes: SelectedWorkTypes;

  // Old structure (for compatibility) - can be removed later
  workType?: string[];
  trabajoAlturas?: boolean;
  espaciosConfinados?: boolean;
  controlEnergia?: boolean;
  izajeCargas?: boolean;
  excavaciones?: boolean;
  trabajoGeneral?: boolean;


  hazards?: { [key: string]: string }; // e.g. { ruido: 'si', vibracion: 'no', ... }
  ppe?: { [key:string]: string };
  ppeSystems?: { [key: string]: string };
  emergency?: { [key: string]: string } & { notification: boolean };
  workers?: ExternalWorker[];
  approvals: {
    solicitante: Partial<Approval>;
    autorizante: Partial<Approval>;
    mantenimiento: Partial<Approval>;
    lider_sst: Partial<Approval>;
    coordinador_alturas: Partial<Approval>;
  };
  closure?: Partial<PermitClosure>;
  isSSTSignatureRequired?: boolean; // Campo para indicar firma SST
  anexoATS?: Partial<AnexoATS>;
  anexoAltura?: Partial<AnexoAltura>;
  anexoConfinado?: Partial<AnexoConfinado>;
  anexoEnergias?: Partial<AnexoEnergias>;
  anexoIzaje?: Partial<AnexoIzaje>;
  anexoExcavaciones?: Partial<AnexoExcavaciones>;
  verificacionPeligros?: Partial<VerificacionPeligros>;
  eppEmergencias?: Partial<EppEmergencias>;
}

export type Notification = {
  id: string;
  userId: string;
  permitId: string;
  permitNumber?: string;
  message: string;
  type: 'creation' | 'signature' | 'status_change' | 'approval' | 'rejection' | 'cancellation';
  isRead: boolean;
  createdAt: Timestamp;
  triggeredBy: {
    uid: string;
    displayName: string | null;
  };
};
