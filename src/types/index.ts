import type { Timestamp } from 'firebase/firestore';

export type PermitStatus = 'Pending' | 'Approved' | 'Rejected';

export type Permit = {
  id: string;
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
};
