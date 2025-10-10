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

export type Permit = {
  id: string;
  number?: string;
  workType: string;
  environmentalFactors: string;
  permitDetails: string;
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
  workers?: any[];
  approvals?: any;
};
