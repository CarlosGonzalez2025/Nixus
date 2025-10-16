
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { config } from 'dotenv';
config();

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

  if (permitData.anexoEnergias) {
    permitPayload.anexoEnergias = permitData.anexoEnergias;
  }


  try {
    // Add document to Firestore using Admin SDK
    const docRef = await adminDb.collection('permits').add(permitPayload as any);
    
    // Generate and update permit number
    const permitNumber = `PT-${Date.now()}-${docRef.id.substring(0, 6).toUpperCase()}`;
    await docRef.update({ number: permitNumber });
    
    console.log('✅ Permit created successfully:', docRef.id);

    // Send WhatsApp notification
    try {
      await sendWhatsAppNotification({
        permitNumber: permitNumber,
        solicitante: userDisplayName || 'N/A',
        workTypes: permitPayload.workType || ['general'],
        permitId: docRef.id,
      });
      console.log('✅ WhatsApp notification sent successfully.');
    } catch (notificationError) {
      console.error('⚠️ Failed to send WhatsApp notification:', notificationError);
      // We don't fail the whole operation if the notification fails,
      // but we log it for debugging.
    }
    
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

export async function updatePermitStatus(permitId: string, status: PermitStatus, reason?: string, closureData?: Partial<PermitClosure>) {
    if (!permitId) {
        return { success: false, error: 'Permit ID is required.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        const updateData: { status: PermitStatus; rejectionReason?: string; closure?: Partial<PermitClosure> } = { status };

        if (status === 'rechazado' && reason) {
            updateData.rejectionReason = reason;
        }

        if (status === 'cerrado') {
            updateData.closure = {
                ...(closureData || {}),
                fechaCierre: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            };
        }

        await docRef.update(updateData);
        
        revalidatePath(`/permits/${permitId}`);
        revalidatePath('/permits');
        revalidatePath('/dashboard');

        return { success: true };
    } catch (error: any) {
        console.error("❌ Error updating permit status:", error);
        return {
            success: false,
            error: error.message || 'Could not update permit status.'
        };
    }
}
