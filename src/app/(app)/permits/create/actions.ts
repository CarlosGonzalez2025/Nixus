
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import type { SecurityRuleContext } from '@/lib/errors';

interface PermitData {
  workType: string;
  environmentalFactors: string;
  permitDetails: string;
  recommendedControls: string;
  userId: string;
}

export async function createPermit(data: PermitData) {
  if (!data.userId) {
    throw new Error('User not authenticated');
  }

  const permitPayload = {
    ...data,
    createdBy: data.userId,
    status: 'pendiente_revision',
    createdAt: serverTimestamp(),
  };

  addDoc(collection(db, 'permits'), permitPayload)
    .then(() => {
      revalidatePath('/permits');
      revalidatePath('/dashboard');
    })
    .catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: 'permits',
        operation: 'create',
        requestResourceData: permitPayload,
      } satisfies SecurityRuleContext);
      
      errorEmitter.emit('permission-error', permissionError);
      
      // We still throw the original error to be caught by the client if needed,
      // but the listener will provide the detailed overlay.
      throw serverError;
    });
}
