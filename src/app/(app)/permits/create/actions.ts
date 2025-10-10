
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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

  try {
    await addDoc(collection(db, 'permits'), {
      ...data,
      createdBy: data.userId,
      status: 'pendiente_revision',
      createdAt: serverTimestamp(),
    });

    revalidatePath('/permits');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error creating permit: ', error);
    throw new Error('Could not create permit.');
  }
}
