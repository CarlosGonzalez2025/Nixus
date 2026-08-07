
import type { Timestamp } from 'firebase/firestore';

export type PermitStatus = 'borrador' | 'pendiente_revision' | 'aprobado' | 'en_ejecucion' | 'suspendido' | 'cerrado' | 'rechazado' | 'cancelado';

export type UserRole = 'solicitante' | 'autorizante' | 'lider_sst' | 'admin' | 'mantenimiento' | 'asesor_arl' | 'lider_regional';

export type AppModule =
  | 'permits'
  | 'permits_create'
  | 'hallazgos'
  | 'contractor_verifications'
  | 'users'
  | 'lists'
  | 'audit';

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: UserRole;
  otherRoles?: UserRole[];
  area?: string;
  telefono?: string;
  empresa?: string;
  ciudad?: string;
  planta?: string;
  disabled?: boolean;
  // Campos exclusivos del rol lider_regional
  allowedEmpresas?: string[];
  allowedPlantas?: string[];
  allowedCiudades?: string[];
  allowedModules?: AppModule[];
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
  userRole?: UserRole;
  userEmpresa?: string;
}

export interface ExternalWorker {
  email?: string;
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
  fechaFirmaApertura?: string;
  fechaFirmaCierre?: string;
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
  verificoEstadoArea?: 'si' | 'no' | 'na';
  validezDesde: string;
  validezHasta: string;
  fechaCierre: string;
  horaCierre: string;
  autoridad?: Partial<AutorizacionPersona>;
  responsable?: Partial<AutorizacionPersona>;
  cancelado?: 'si' | 'no' | 'na';
  razonCancelacion?: string;
  canceladoPor?: Partial<AutorizacionPersona>;
  terminado?: 'si' | 'no';
  observacionesCierre?: string;
  cerradoPorUsuario?: Partial<AutorizacionPersona> & { rol?: string; uid?: string };
}

export type JustificacionATS = {
    [key: string]: boolean;
}

export type AnexoATS = {
  peligros?: { [key: string]: 'si' | 'no' };
  controles?: { [key: string]: 'si' | 'no' | 'na' };
  epp?: Record<string, boolean | string> & {
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
  firmaCierre?: string;
  fechaCierre?: string;
  observacionesCierre?: string;
  actividadSigueIgual?: 'si' | 'no';
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
    ciudad?: string;
    proceso: string;
    contrato: string;
    requiereArea?: 'si' | 'no';
    requierePlanta?: 'si' | 'no';
    requiereProceso?: 'si' | 'no';
    requiereContrato?: 'si' | 'no';
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
        area?: string;
    }
}

export type AnexoCaliente = {
  emergencia?: {
    contacto: string;
    telefono: string;
  };
  items?: {
    [key: string]: 'si' | 'no' | 'na' | string;
  };
};

export type SelectedWorkTypes = {
  alturas: boolean;
  confinado: boolean;
  energia: boolean;
  izaje: boolean;
  excavacion: boolean;
  general: boolean;
  caliente: boolean;
}

export type SuspensionInfo = {
  suspendedBy: {
    uid: string;
    displayName: string | null;
    role: UserRole;
  };
  suspendedAt: Timestamp;
  reason: string;
};

export type Permit = {
  id: string;
  number?: string;
  status: PermitStatus;
  createdBy: string;
  createdAt: Timestamp;
  rejectionReason?: string;
  suspension?: SuspensionInfo;
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  
  generalInfo: Partial<PermitGeneralInfo>;
  selectedWorkTypes: SelectedWorkTypes;

  trabajoAlturas?: boolean;
  espaciosConfinados?: boolean;
  controlEnergia?: boolean;
  izajeCargas?: boolean;
  excavaciones?: boolean;
  trabajoGeneral?: boolean;


  hazards?: { [key: string]: string };
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
    supervisor_confinado: Partial<Approval>;
  };
  closure?: Partial<PermitClosure>;
  isSSTSignatureRequired?: boolean;
  anexoATS?: Partial<AnexoATS>;
  anexoAltura?: Partial<AnexoAltura>;
  anexoConfinado?: Partial<AnexoConfinado>;
  anexoEnergias?: Partial<AnexoEnergias>;
  anexoCaliente?: Partial<AnexoCaliente>;
  anexoIzaje?: Partial<AnexoIzaje>;
  anexoExcavaciones?: Partial<AnexoExcavaciones>;
  verificacionPeligros?: Partial<VerificacionPeligros>;
  eppEmergencias?: Partial<EppEmergencias>;
  solicitanteFirmaApertura?: string;
  /**
   * Registro de alertas tempranas ya notificadas: clave de alerta → momento de envío.
   * Lo escribe únicamente el cron /api/cron/permit-alerts para no repetir avisos.
   * Campo aditivo: ninguna regla de negocio, consulta ni vista depende de él.
   * Ver src/lib/permit-alerts.ts
   */
  alertas?: { [alertKey: string]: Timestamp };
}

export type Notification = {
  id: string;
  userId: string;
  permitId: string;
  permitNumber?: string;
  message: string;
  // 'reminder' y 'overdue' los emite el cron de alertas tempranas (ver
  // src/app/api/cron/permit-alerts/route.ts); el resto son reactivos a acciones de usuario.
  type: 'creation' | 'signature' | 'status_change' | 'approval' | 'rejection' | 'cancellation' | 'reminder' | 'overdue';
  isRead: boolean;
  createdAt: Timestamp;
  triggeredBy: {
    uid: string;
    displayName: string | null;
  };
};

// ─── Módulo Verificación Contratistas ─────────────────────────────────────────

export type VerificationResult = 'C' | 'NC' | 'OM' | 'NA';
export type VerificationStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | 'CANCELLED';
export type TemplateStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
export type ActionPlanStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'OVERDUE' | 'CANCELLED';

export interface RiskType {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface ChecklistItem {
  id: string;
  groupId: string;
  templateId: string;
  requisitoBaseLegal: string;
  aspectoVerificar: string;
  preguntaClave: string;
  metodoVerificacion: string;
  requiresEvidence: boolean;
  allowsAttachment: boolean;
  isRequired: boolean;
  orderIndex: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Los ítems se almacenan como array dentro del documento del grupo
// para evitar subcolecciones de 3 niveles de profundidad.
export interface ChecklistGroup {
  id: string;
  templateId: string;
  title: string;
  description?: string;
  orderIndex: number;
  isActive: boolean;
  items: ChecklistItem[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ChecklistTemplate {
  id: string;
  riskTypeId: string;
  riskTypeCode: string;
  name: string;
  description?: string;
  version: number;
  status: TemplateStatus;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContractorVerification {
  id: string;
  templateId: string;
  templateName: string;
  templateVersion: number;
  riskTypeId: string;
  riskTypeCode: string;
  riskTypeName: string;
  city: string;
  companyName: string;
  contractorName?: string;
  // plantId almacena el mismo string que user.planta (ej: "Principal", "Yumbo")
  plantId: string;
  plantName: string;
  verificationDate: Timestamp;
  projectName?: string;
  workLocation?: string;
  activityDescription?: string;
  createdBy: string;
  createdByName: string;
  createdByRole: string;
  status: VerificationStatus;
  totalItems: number;
  compliantItems: number;
  nonCompliantItems: number;
  improvementItems: number;
  notApplicableItems: number;
  compliancePercentage: number;
  hasFindings: boolean;
  generalObservations?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  closedAt?: Timestamp;
  closedBy?: string;
}

// Respuestas: subcolección /contractorVerifications/{id}/answers/{itemId}
// El ID del documento = itemId del ítem original para lookup O(1).
export interface ContractorVerificationAnswer {
  id: string;
  verificationId: string;
  itemId: string;
  groupId: string;
  groupTitle: string;
  requisitoBaseLegal: string;
  aspectoVerificar: string;
  preguntaClave: string;
  metodoVerificacion: string;
  evidenciaObjetiva: string;
  result: VerificationResult | null;
  observation?: string;
  requiresActionPlan: boolean;
  evidenceUrls?: string[];
  answeredBy?: string;
  answeredByName?: string;
  answeredAt?: Timestamp;
  orderIndex: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VerificationEvidence {
  id: string;
  verificationId: string;
  answerId?: string;
  fileName: string;
  fileUrl: string;
  storagePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: Timestamp;
}

export interface ActionPlan {
  id: string;
  verificationId: string;
  answerId: string;
  findingType: 'NC' | 'OM';
  findingDescription: string;
  correctiveAction: string;
  responsibleName: string;
  responsibleEmail?: string;
  dueDate: Timestamp;
  status: ActionPlanStatus;
  createdBy: string;
  createdByName: string;
  createdAt: Timestamp;
  closedBy?: string;
  closedAt?: Timestamp;
  closingEvidenceUrl?: string;
  closingObservation?: string;
}

// ─── Gestión de Hallazgos ──────────────────────────────────────────────────────

export type HallazgoClase = 'A' | 'B' | 'C';
export type HallazgoIntervencion = 'Inmediata' | 'Pronta' | 'Posterior';
export type HallazgoEstado = 'Pendiente' | 'En Progreso' | 'Completado' | 'Cerrado';
export type HallazgoResponsabilidad = 'Directa' | 'Corporativa';
export type HallazgoTipo = 'Positivo' | 'Seguimiento';

/**
 * Catálogos de selección múltiple del formulario de hallazgos.
 * Viven aquí (y no en el formulario) porque la importación masiva desde Excel
 * debe normalizar contra exactamente las mismas opciones.
 * Ambos campos se almacenan como texto con una opción por línea (`\n`).
 */
export const HALLAZGO_PELIGRO_OPTIONS = [
  'Alturas',
  'Espacios Confinados',
  'Energías Peligrosas',
  'Izaje de Cargas',
  'Excavaciones',
] as const;

export const HALLAZGO_PERSONAL_EXPUESTO_OPTIONS = ['Propio', 'Contratistas'] as const;

export interface HallazgoGeolocalizacion {
  lat: number;
  lng: number;
  accuracy?: number;
}

/** Seguimiento individual dentro del plan de acción (pueden registrarse varios). */
export interface HallazgoSeguimiento {
  fecha: Timestamp;
  porcentaje?: number;
  observacion?: string;
  evidencias?: string[];
}

export interface Hallazgo {
  id: string;
  numero: number;
  // Información general
  empresa: string;
  planta: string;
  /**
   * Ciudad del hallazgo. Opcional porque el formulario todavía no la captura:
   * verificado en producción, 0 de 269 hallazgos la tienen.
   *
   * OJO: `isInLiderRegionalScope()` exige `!!record.ciudad` para dar por buena la
   * coincidencia, así que un `lider_regional` con `allowedCiudades` configurado
   * no vería ningún hallazgo. Hoy no afecta a nadie (no existe ningún usuario con
   * ese rol), pero el día que se cree uno hay que capturar la ciudad en el
   * formulario de hallazgos o retirar esa dimensión del filtro.
   */
  ciudad?: string;
  area: string;
  tipoActividad: 'Rutinario' | 'No Rutinario';
  /** Responsabilidad sobre la corrección del hallazgo. */
  responsabilidad?: HallazgoResponsabilidad;
  /** Naturaleza del reporte: observación positiva o hallazgo con seguimiento. */
  tipoHallazgo?: HallazgoTipo;
  fechaVisita: Timestamp;
  geolocalizacion?: HallazgoGeolocalizacion;
  peligroInspeccionado: string;
  personalExpuesto?: string;
  // Evidencia del hallazgo
  hallazgo: string;
  evidenciasFotograficas: string[];       // URLs de fotos "antes"
  // Clasificación
  clase: HallazgoClase;
  intervencion: HallazgoIntervencion;
  descripcion: string;
  accionInmediata?: string;
  // Reportado por
  reportadoPorNombre: string;
  reportadoPorCargo: string;
  firmaReportador?: string;
  firmaResponsable?: string;
  // Plan de acción (opcional)
  fechaMedidaImplementada?: Timestamp;
  responsable?: string;
  /** Seguimientos registrados (fuente de verdad desde 08/2026). */
  seguimientos?: HallazgoSeguimiento[];
  /** Legacy / compatibilidad: primera fecha de seguimiento (derivada de `seguimientos`). */
  fechaSeguimiento1?: Timestamp;
  /** Legacy / compatibilidad: último % reportado (derivado de `seguimientos`). */
  porcentajeCumplimiento?: number;
  evidenciasPlanAccion?: string[];        // URLs de fotos "después / cierre"
  fechaCierre?: Timestamp;
  porcentajeCumplimientoTotal?: number;
  cumplimientoEstado?: HallazgoEstado;
  observacion?: string;
  // Campos legacy (compatibilidad hacia atrás)
  frenteTrabajo?: string;
  centroCosto?: string;
  fechaIdentificacion?: Timestamp;
  // Metadata
  empresaId: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
