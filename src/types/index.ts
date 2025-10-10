

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
  eps: string;
  arl: string;
  pensiones: string;
  foto?: string;
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

export type Permit = {
  id: string;
  number?: string;
  workType: string;
  status: PermitStatus;
  createdBy: string;
  createdAt: Timestamp;
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  generalInfo?: {
    workDescription: string;
    suspensionCauses: string;
    procedure: string;
    isEmergencyExtension: boolean;
    validFrom: string;
    validUntil: string;
    tools: Tool[];
    reunionInicio: string; // 'si', 'no', 'na'
    atsVerificado: string; // 'si', 'no', 'na'
  };
  hazards?: { [key: string]: string }; // e.g. { ruido: 'si', vibracion: 'no', ... }
  ppe?: { [key: string]: string };
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
};
