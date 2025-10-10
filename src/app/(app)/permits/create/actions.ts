
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
    // This case should ideally not be reached if the UI is correct
    return { error: 'User not authenticated' };
  }

  const permitPayload = {
    ...data,
    createdBy: data.userId,
    status: 'pendiente_revision',
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'permits'), permitPayload);
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: 'permits',
      operation: 'create',
      requestResourceData: permitPayload,
    } satisfies SecurityRuleContext);

    // Emit the contextual error for debugging in the development overlay
    errorEmitter.emit('permission-error', permissionError);

    // Also, return a serializable error object for the client to handle
    return { error: serverError.message || 'An unexpected error occurred.' };
  }
}
