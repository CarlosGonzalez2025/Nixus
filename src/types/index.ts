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
}

export interface ExternalWorker {
  nombre: string;
  cedula: string;
  rol: string;
  tsaTec: 'tsa' | 'tec' | 'otro' | 'na';
  entrenamiento: 'tsa' | 'tec' | 'otro';
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
}

export type JustificacionATS = {
    [key: string]: boolean;
}

export type AnexoATS = {
  area: string;
  solicitante: string;
  fechaInicio: string;
  fechaTerminacion: string;
  descripcionTarea: string;
  peligros: { [key: string]: 'si' | 'no' | 'na' };
  epp: { [key: string]: 'si' | 'no' | 'na' };
  causalesSuspension: string;
  justificacion: JustificacionATS;
};

export type ValidacionDiaria = {
  fecha: string;
  nombre: string;
  firma: string;
};

export type AnexoAltura = {
  tipoEstructura: {
    [key: string]: boolean | string;
    escaleraCuerpo: boolean;
    escaleraDosCuerpos: boolean;
    andamioTubular: boolean;
    andamioColgante: boolean;
    plataforma: boolean;
    manLift: boolean;
    otros: boolean;
    otrosCual: string;
  };
  aspectosSeguridad: { [key: string]: 'si' | 'no' | 'na' };
  requerimientoClaridad: string;
  precauciones: { [key: string]: boolean };
  afectaciones: {
    riesgoOtrasAreas: 'si' | 'no' | 'na';
    otrasAreasRiesgo: 'si' | 'no' | 'na';
    personalNotificado: 'si' | 'no' | 'na';
    observaciones: string;
  };
  coordinadorTrabajosAltura: {
    nombre: string;
    cedula: string;
    firma: string;
  };
  validacionDiaria: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion: {
    seCancelo: 'si' | 'no';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre: {
    seTermino: 'si' | 'no';
    observaciones: string;
    autoridad: {
      fecha: string;
      nombre: string;
      firma: string;
    };
    responsable: {
      fecha: string;
      nombre: string;
      firma: string;
    };
  };
};

export type MedicionAtmosferica = {
    id: string;
    hora: string;
    o2: string;
    co: string;
    h2s: string;
    lel: string;
    cl2: string;
    co2: string;
    firma: string;
};

export type SupervisorConfinado = {
    nombre: string;
    cedula: string;
    firma: string;
    hora: string;
}

export type PruebaGasesInicial = {
  lel?: string;
  o2?: string;
  h2s?: string;
  co?: string;
  otros?: string;
  serialMonitor?: string;
  horaPrueba?: string;
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

export type AutorizacionPersona = {
  nombre: string;
  firma: string;
  hora: string;
}

export type AnexoConfinado = {
  informacionGeneral: {
    emitidoPor: string;
    areaTrabajo: string;
    equipoAreaEspecifica: string;
    responsable: string;
    cargo: string;
    compania: string;
    emergenciaContacto: string;
    emergenciaTelefono: string;
  };
  identificacionPeligros: { [key: string]: 'si' | 'no' };
  procedimientoComunicacionCual?: string;
  precauciones: { [key: string]: boolean };
  resultadosPruebasGases: Partial<PruebaGasesInicial>;
  requerimientosEquipos: { [key: string]: 'si' | 'no' };
  pruebasGasesPeriodicas: {
    intervalo: string;
    pruebas: PruebaGasesPeriodica[];
    pruebaRealizadaPor: string;
    serialMonitor: string;
    marca: string;
    fechaCalibracion: string;
  };
  autoridadDelArea: Partial<AutorizacionPersona>;
  responsableDelTrabajo: Partial<AutorizacionPersona>;
  supervisorTrabajo: Partial<SupervisorConfinado>;
  validacion: {
    autoridad: ValidacionDiaria[];
    responsable: ValidacionDiaria[];
  };
  cancelacion: {
    seCancelo: 'si' | 'no';
    razon: string;
    nombre: string;
    firma: string;
    fecha: string;
  };
  cierre: {
    seTermino: 'si' | 'no';
    autoridad: Partial<AutorizacionPersona>;
    responsable: Partial<AutorizacionPersona>;
  };
};

export type AnexoCaliente = {
  distanciaSeguridad: 'si' | 'no' | 'na';
  medicionAtmosfera: 'si' | 'no' | 'na';
  aislarArea: 'si' | 'no' | 'na';
  taparAberturas: 'si' | 'no' | 'na';
  extintores: 'si' | 'no' | 'na';
  vigiaFuego: 'si' | 'no' | 'na';
  personalCapacitado: 'si' | 'no' | 'na';
  listasChequeo: 'si' | 'no' | 'na';
  otro: string;
};

export type AnexoEnergias = {
  tensionExpuesta: 'muy_baja' | 'baja' | 'media' | 'alta' | 'extra_alta';
  planeacion: { [key: string]: 'si' | 'no' };
  metodoTrabajo: 'sin_tension' | 'con_tension';
  energiasPeligrosas: { [key: string]: boolean };
  procedimientoLOTO: { [key: string]: 'si' | 'no' | 'na' };
  trabajoSinTension: { [key: string]: 'si' | 'no' | 'na' };
  observaciones: string;
};

export type AnexoIzaje = {
    informacionGeneral: {
        accion: { [key: string]: boolean };
        pesoCarga: { [key: string]: boolean };
        equipoUtilizar: { [key: string]: string };
    };
    aspectosRequeridos: { [key: string]: 'si' | 'no' | 'na' };
    precauciones: { [key: string]: boolean };
    observaciones: string;
    liderIzaje: {
        nombre: string;
        cedula: string;
        firmaApertura: string;
    };
};

export type AnexoExcavaciones = {
    // Definir campos específicos para excavaciones
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
  caliente: boolean;
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
  trabajoCaliente?: boolean;
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
    sst: Partial<Approval>;
  };
  closure?: Partial<PermitClosure>;
  anexoATS?: Partial<AnexoATS>;
  anexoAltura?: Partial<AnexoAltura>;
  anexoConfinado?: Partial<AnexoConfinado>;
  anexoIzaje?: Partial<AnexoIzaje>;
  anexoEnergias?: Partial<AnexoEnergias>;
  anexoCaliente?: Partial<AnexoCaliente>;
  anexoExcavaciones?: Partial<AnexoExcavaciones>;
}
