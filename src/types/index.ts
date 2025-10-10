
import type { Timestamp } from 'firebase/firestore';

export type PermitStatus = 'borrador' | 'pendiente_revision' | 'aprobado' | 'en_ejecucion' | 'suspendido' | 'cerrado' | 'rechazado';

export type UserRole = 'solicitante' | 'autorizante' | 'lider_tarea' | 'ejecutante' | 'lider_sst' | 'admin';

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: UserRole;
}

export type Approval = {
  userId: string;
  userName?: string | null;
  signedAt: string;
  status: 'aprobado' | 'rechazado' | 'pendiente';
  comments?: string;
}

export interface ExternalWorker {
  nombre: string;
  cedula: string;
  rol: string;
  certificadoAptitudMedica?: string; // URL o path al archivo
  tsaTec?: string; // URL o path al archivo
  entrenamiento?: string; // URL o path al archivo
  eps: string;
  arl: string;
  pensiones: string;
  foto?: string; // URL o path a la selfie
  firmaApertura?: string; // URL o path a la firma
  firmaCierre?: string; // URL o path a la firma
}

export type Permit = {
  id: string;
  number?: string;
  workType: string;
  environmentalFactors: string;
  recommendedControls: string;
  status: PermitStatus;
  createdBy: string;
  createdAt: Timestamp;
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
  generalInfo?: any;
  hazards?: any;
  annexes?: any;
  ppe?: any;
  workers?: ExternalWorker[]; // Array of external workers
  approvals?: {
    solicitante?: Approval;
    lider_tarea?: Approval;
    autorizante?: Approval;
    lider_sst?: Approval;
  };
};
