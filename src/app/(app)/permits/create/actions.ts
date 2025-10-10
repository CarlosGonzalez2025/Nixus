
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import type { SecurityRuleContext } from '@/lib/errors';
import type { Permit } from '@/types';

type PermitCreateData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user' > & {
  userId: string;
  userDisplayName: string | null;
};


export async function createPermit(data: PermitCreateData) {
  if (!data.userId) {
    return { error: 'User not authenticated' };
  }

  const { userId, userDisplayName, ...permitData } = data;

  // Initialize all approval roles as pending
  const initialApprovals = {
    solicitante: { status: 'pendiente', userId: userId, userName: userDisplayName },
    autorizante: { status: 'pendiente' },
    mantenimiento: { status: 'pendiente' },
    sst: { status: 'pendiente' }
  };

  const permitPayload: Omit<Permit, 'id'> = {
    ...permitData,
    status: 'pendiente_revision',
    createdBy: userId,
    createdAt: serverTimestamp(),
    approvals: initialApprovals,
  };
  
  const permitsCollectionRef = collection(db, 'permits');

  try {
    const docRef = await addDoc(permitsCollectionRef, permitPayload);
    // Revalidate paths to show the new permit in the lists
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    return { success: true, permitId: docRef.id };
  } catch (serverError: any) {
    const permissionError = new FirestorePermissionError({
      path: permitsCollectionRef.path,
      operation: 'create',
      requestResourceData: permitPayload,
    } satisfies SecurityRuleContext);
    
    errorEmitter.emit('permission-error', permissionError);

    // Return a structured error for the client
    return { success: false, error: 'Permission denied. Could not create permit.' };
  }
}
