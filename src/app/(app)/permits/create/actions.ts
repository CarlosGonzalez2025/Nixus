
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';

type PermitCreateData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user'> & {
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
    solicitante: { status: 'pendiente' as const },
    autorizante: { status: 'pendiente' as const },
    mantenimiento: { status: 'pendiente' as const },
    sst: { status: 'pendiente' as const }
  };

  const permitPayload: Partial<Permit> = {
    ...permitData,
    workType: permitData.workType && permitData.workType.length > 0 ? permitData.workType : ['general'],
    status: 'pendiente_revision' as const,
    createdBy: userId,
    createdAt: FieldValue.serverTimestamp(), // ✅ Usar serverTimestamp del Admin SDK
    user: {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
    closure: {},
  };
  
  if (permitData.anexoAltura) {
    permitPayload.anexoAltura = permitData.anexoAltura;
  }
  
  if (permitData.anexoConfinado) {
    permitPayload.anexoConfinado = permitData.anexoConfinado;
  }

  if (permitData.anexoIzaje) {
    permitPayload.anexoIzaje = permitData.anexoIzaje;
  }


  try {
    // Add document to Firestore using Admin SDK
    const docRef = await adminDb.collection('permits').add(permitPayload as any);
    
    // Generate and update permit number
    const permitNumber = `PT-${Date.now()}-${docRef.id.substring(0, 6).toUpperCase()}`;
    await docRef.update({ number: permitNumber });
    
    console.log('✅ Permit created successfully:', docRef.id);
    
    // Revalidate paths to show the new permit in the lists
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    
    return { success: true, permitId: docRef.id, permitNumber };
  } catch (error: any) {
    console.error("❌ Error creating permit:", error);
    // Return a structured error for the client
    return { 
      success: false, 
      error: error.message || 'Could not create permit. Please try again.' 
    };
  }
}
