
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import type { Permit } from '@/types';

type PermitCreateData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user' > & {
  userId: string;
  userDisplayName: string | null;
  userEmail: string | null;
  userPhotoURL: string | null;
};


export async function createPermit(data: PermitCreateData) {
  if (!data.userId) {
    return { success: false, error: 'User not authenticated' };
  }

  const { userId, userDisplayName, userEmail, userPhotoURL, ...permitData } = data;

  // Initialize all approval roles as pending
  const initialApprovals = {
    solicitante: { status: 'pendiente' },
    autorizante: { status: 'pendiente' },
    mantenimiento: { status: 'pendiente' },
    sst: { status: 'pendiente' }
  };

  const permitPayload: Omit<Permit, 'id'> = {
    ...permitData,
    number: '', // Initialize optional field
    workType: permitData.workType || 'general', // Initialize optional field
    status: 'pendiente_revision',
    createdBy: userId,
    createdAt: serverTimestamp(),
    user: {
        displayName: userDisplayName,
        email: userEmail,
        photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
    closure: {},
  };
  
  const permitsCollectionRef = collection(db, 'permits');

  try {
    const docRef = await addDoc(permitsCollectionRef, permitPayload);
    // Revalidate paths to show the new permit in the lists
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    return { success: true, permitId: docRef.id };
  } catch (error: any) {
     console.error("Error creating permit: ", error);
    // Return a structured error for the client
    return { success: false, error: error.message || 'Permission denied. Could not create permit.' };
  }
}
