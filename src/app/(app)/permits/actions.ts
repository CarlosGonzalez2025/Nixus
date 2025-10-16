
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { config } from 'dotenv';
config();

const workTypesMap: {[key: string]: string} = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
};

const getWorkTypesString = (types: string[]): string => {
  if (!Array.isArray(types) || types.length === 0) return workTypesMap['general'];
  return types.map(key => workTypesMap[key] || key).join(', ');
};

const getStatusText = (status: string) => {
    const statusText: {[key: string]: string} = {
      'borrador': 'Borrador',
      'pendiente_revision': 'Pendiente de Revisión',
      'aprobado': 'Aprobado',
      'en_ejecucion': 'En Ejecución',
      'suspendido': 'Suspendido',
      'cerrado': 'Cerrado',
      'rechazado': 'Rechazado'
    };
    return statusText[status] || status;
  };

const signatureRoles: { [key in UserRole | 'sst' | 'mantenimiento']: string } = {
  solicitante: 'QUIEN SOLICITA (JEFES Y DUEÑOS DE AREA)',
  autorizante: 'QUIEN AUTORIZA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  sst: 'AREA SST (si aplica)',
  lider_tarea: 'Líder de la Tarea',
  ejecutante: 'Ejecutante del Trabajo',
  lider_sst: 'Líder SST',
  admin: 'Administrador'
};


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
    createdAt: FieldValue.serverTimestamp(),
    user: {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
    closure: {},
  };
  
  if (permitData.anexoAltura) permitPayload.anexoAltura = permitData.anexoAltura;
  if (permitData.anexoConfinado) permitPayload.anexoConfinado = permitData.anexoConfinado;
  if (permitData.anexoIzaje) permitPayload.anexoIzaje = permitData.anexoIzaje;
  if (permitData.anexoEnergias) permitPayload.anexoEnergias = permitData.anexoEnergias;

  try {
    const docRef = await adminDb.collection('permits').add(permitPayload as any);
    const permitNumber = `PT-${Date.now()}-${docRef.id.substring(0, 6).toUpperCase()}`;
    await docRef.update({ number: permitNumber });
    
    console.log('✅ [Action] Permiso creado con éxito en Firestore:', docRef.id);

    const workTypesText = getWorkTypesString(permitPayload.workType || ['general']);
    const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${permitNumber}
👤 *Solicitante:* ${userDisplayName || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud para su aprobación en el siguiente enlace:
https://sgpt-movil.web.app/permits/${docRef.id}`;
    
    await sendWhatsAppNotification(messageBody);
    
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    
    return { success: true, permitId: docRef.id, permitNumber };
  } catch (error: any) {
    console.error("❌ [Action] Error al crear permiso:", error);
    return { 
      success: false, 
      error: error.message || 'Could not create permit. Please try again.' 
    };
  }
}

export async function addSignatureAndNotify(
  permitId: string, 
  role: 'solicitante' | 'autorizante' | 'mantenimiento' | 'sst', 
  signatureType: 'firmaApertura' | 'firmaCierre',
  signatureDataUrl: string,
  user: { uid: string, displayName: string | null }
) {
    if (!permitId || !role || !signatureDataUrl || !user) {
        return { success: false, error: 'Faltan parámetros para guardar la firma.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        
        const signaturePath = `approvals.${role}.${signatureType}`;
        const statusPath = `approvals.${role}.status`;
        const userIdPath = `approvals.${role}.userId`;
        const userNamePath = `approvals.${role}.userName`;
        const signedAtPath = `approvals.${role}.signedAt`;

        const updateData: { [key: string]: any } = {
            [signaturePath]: signatureDataUrl,
            [`${userNamePath}`]: user.displayName,
            [`${userIdPath}`]: user.uid,
        };

        if (signatureType === 'firmaApertura') {
            updateData[statusPath] = 'aprobado';
            updateData[signedAtPath] = FieldValue.serverTimestamp();
        }

        await docRef.update(updateData);
        
        // Fetch permit for notification
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data() as Permit;
        
        const signatureRoleName = (signatureRoles as any)[role] || role;
        const messageBody = `*Notificación de Firma - SGPT* 🖋️
El permiso *${permitData.number || permitId}* ha sido firmado.

👤 *Quién firmó:* ${user.displayName || 'N/A'}
✨ *Rol:* ${signatureRoleName}
✍️ *Tipo de firma:* ${signatureType === 'firmaApertura' ? 'Apertura' : 'Cierre'}

Puede ver los detalles aquí:
https://sgpt-movil.web.app/permits/${permitId}`;
        
        await sendWhatsAppNotification(messageBody);

        revalidatePath(`/permits/${permitId}`);
        return { success: true };

    } catch (error: any) {
        console.error("❌ Error al guardar firma y notificar:", error);
        return {
            success: false,
            error: error.message || 'No se pudo guardar la firma.'
        };
    }
}


export async function updatePermitStatus(permitId: string, status: PermitStatus, reason?: string, closureData?: Partial<PermitClosure>) {
    if (!permitId) {
        return { success: false, error: 'Permit ID is required.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        const updateData: { status: PermitStatus; rejectionReason?: string; closure?: Partial<PermitClosure> | FieldValue } = { status };

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

        // Fetch permit for notification
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data() as Permit;

        const statusText = getStatusText(status);
        let messageBody = `*Actualización de Estado - SGPT* 🔄
El estado del permiso *${permitData.number || permitId}* ha cambiado.

*Nuevo Estado:* ${statusText}

Puede ver los detalles aquí:
https://sgpt-movil.web.app/permits/${permitId}`;

        if (status === 'rechazado' && reason) {
          messageBody += `\n\n*Motivo del rechazo:* ${reason}`;
        }
        
        await sendWhatsAppNotification(messageBody);
        
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
