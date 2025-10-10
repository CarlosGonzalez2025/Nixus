
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
    return { error: 'User not authenticated' };
  }

  const permitPayload = {
    ...data,
    createdBy: data.userId,
    status: 'pendiente_revision',
    createdAt: serverTimestamp(),
  };
  
  const permitsCollectionRef = collection(db, 'permits');

  addDoc(permitsCollectionRef, permitPayload)
    .then(() => {
      revalidatePath('/permits');
      revalidatePath('/dashboard');
    })
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: permitsCollectionRef.path,
        operation: 'create',
        requestResourceData: permitPayload,
      } satisfies SecurityRuleContext);

      // Emit the contextual error for debugging in the development overlay
      errorEmitter.emit('permission-error', permissionError);

      // IMPORTANT: We do not return a serializable error here.
      // The client-side toast will be triggered by the listener.
    });

  // Since the operation is handled in the background, we can return a success-like object
  // to give the UI immediate feedback, even though the write is still pending on the server.
  // The UI will handle the error toast via the global listener if the write fails.
  return { success: true };
}
