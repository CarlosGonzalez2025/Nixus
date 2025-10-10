
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import type { SecurityRuleContext } from '@/lib/errors';
import type { Permit } from '@/types';

type PermitCreateData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number'> & {
  userId: string;
};


export async function createPermit(data: PermitCreateData) {
  if (!data.userId) {
    return { error: 'User not authenticated' };
  }

  const { userId, ...permitData } = data;

  const permitPayload = {
    ...permitData,
    createdBy: userId,
    status: 'pendiente_revision',
    createdAt: serverTimestamp(),
  };
  
  const permitsCollectionRef = collection(db, 'permits');

  // No await here, let it run in the background
  addDoc(permitsCollectionRef, permitPayload)
    .then(() => {
      // Revalidate paths to show the new permit in the lists
      revalidatePath('/permits');
      revalidatePath('/dashboard');
    })
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: permitsCollectionRef.path,
        operation: 'create',
        requestResourceData: permitPayload,
      } satisfies SecurityRuleContext);
      
      errorEmitter.emit('permission-error', permissionError);

      // We don't throw here to avoid unhandled promise rejection on the server.
      // The client will get the error via the listener.
    });

    return { success: true };
}

    