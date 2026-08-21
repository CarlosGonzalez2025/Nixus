import type { Timestamp } from 'firebase/firestore';

// ── Plan de Trabajo Anual (SST) — Ciclo PHVA ───────────────────────────────────
// Modelo de datos espejado de la implementación de referencia. Las fechas se tipan
// `Timestamp | Date` porque Firestore persiste Timestamp y los formularios manejan
// Date; usar el helper parseDate() de la UI para normalizar.

export type EstadoPlanTrabajo   = 'Borrador' | 'Aprobado' | 'En Ejecución' | 'Cerrado';
export type EstadoTarea         = 'Pendiente' | 'En Progreso' | 'Completado' | 'Cancelado' | 'Reprogramado';
export type EtapaPHVA           = 'Planear' | 'Hacer' | 'Verificar' | 'Actuar';
export type TipoRecurso         = 'Financiero' | 'Administrativo' | 'Tecnico' | 'Humano';
export type FrecuenciaActividad = 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral' | 'Anual' | 'Puntual';

export interface ProgresoMensual {
  month: number;        // 0 (Enero) … 11 (Diciembre)
  planned: boolean;
  executed: boolean;    // solo válido si planned === true
  evidence?: string;
  comments?: string;
}

export interface TareaPlanTrabajo {
  id: string;
  activity: string;
  phva: EtapaPHVA;
  /**
   * Peligro / programa SST al que pertenece la actividad. Usa el mismo catálogo que
   * los hallazgos (`HALLAZGO_PELIGRO_OPTIONS`) más 'Transversal' para lo que no
   * pertenece a un programa concreto, de modo que el % de cumplimiento del plan sea
   * comparable con la cobertura de hallazgos por peligro.
   *
   * Opcional: las actividades creadas antes de agregar el campo no lo tienen y se
   * agrupan bajo 'Sin asignar' en los indicadores.
   */
  hazard?: string;
  resourceType: TipoRecurso;
  responsibleName: string;
  responsibleRole: string;
  frequency: FrecuenciaActividad;
  monthlyProgress: ProgresoMensual[]; // SIEMPRE 12 elementos (meses 0..11)
  totalProgress: number;              // 0..100, calculado
  status: EstadoTarea;
  orderIndex?: number;                // orden estable ascendente
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface PlanTrabajo {
  id: string;
  empresaId: string;
  centroCosto?: string;
  year: number;            // vigencia, rango válido 2020..2050
  name: string;
  description: string;
  version: number;         // entero, inicia en 1
  status: EstadoPlanTrabajo;
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;
  createdBy: string;
  createdByName?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  tasksCount?: number;        // denormalizado
  executedCount?: number;     // tareas con cumplimiento 100% (denormalizado)
  pendingCount?: number;      // tareas con cumplimiento < 100% (denormalizado)
  progressPercentage?: number;// avance 0..100 (denormalizado)
}
