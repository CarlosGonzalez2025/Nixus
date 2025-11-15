
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoExcavaciones, AnexoIzaje, AnexoATS, PermitGeneralInfo, JustificacionATS, ValidacionDiaria } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { config } from 'dotenv';
config();

const workTypesMap: {[key: string]: string} = {
  'alturas': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
};

const getWorkTypesString = (permit: Partial<Permit>): string => {
  const selectedTypes: string[] = [];
  if (permit.trabajoAlturas) selectedTypes.push('Trabajo en Alturas');
  if (permit.espaciosConfinados) selectedTypes.push('Espacios Confinados');
  if (permit.controlEnergias) selectedTypes.push('Control de Energías');
  if (permit.izajeCargas) selectedTypes.push('Izaje de Cargas');
  if (permit.excavaciones) selectedTypes.push('Excavaciones');
  
  if (selectedTypes.length === 0) {
    if (permit.trabajoGeneral) return 'Trabajo General';
    // Fallback for old data structure
    if (permit.workType && Array.isArray(permit.workType)) {
      return permit.workType.map(key => workTypesMap[key] || key).join(', ');
    }
    return 'Trabajo General';
  }
  return selectedTypes.join(', ');
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

const signatureRoles: { [key in 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas']: string } = {
  coordinador_alturas: 'COORDINADOR DE TRABAJOS EN ALTURAS',
  solicitante: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  autorizante: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  lider_sst: 'AREA SST (si aplica)',
};


type PermitCreateData = Omit<Permit, 'id' | 'createdAt' | 'status' | 'createdBy' | 'number' | 'user' | 'approvals' | 'closure'> & {
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
    lider_sst: { status: 'pendiente' as const },
    coordinador_alturas: { status: 'pendiente' as const },
  };

  const permitPayload: Partial<Permit> = {
    ...permitData,
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
  
  try {
    const docRef = await adminDb.collection('permits').add(permitPayload as any);
    const permitNumber = `PT-${Date.now()}-${docRef.id.substring(0, 6).toUpperCase()}`;
    await docRef.update({ number: permitNumber });
    
    console.log('✅ [Action] Permiso creado con éxito en Firestore:', docRef.id);

    const workTypesText = getWorkTypesString(permitPayload);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgpt-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${docRef.id}`;
    
    const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${permitNumber}
👤 *Solicitante:* ${userDisplayName || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud para su aprobación en el siguiente enlace:
${permitUrl}`;
    
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

export async function savePermitDraft(data: PermitCreateData & { draftId?: string }) {
  if (!data.userId) {
    return { success: false, error: 'User not authenticated' };
  }

  const { userId, userDisplayName, userEmail, userPhotoURL, draftId, ...permitData } = data;

  const initialApprovals = {
    solicitante: { status: 'pendiente' as const },
    autorizante: { status: 'pendiente' as const },
    mantenimiento: { status: 'pendiente' as const },
    lider_sst: { status: 'pendiente' as const },
    coordinador_alturas: { status: 'pendiente' as const },
  };

  const permitPayload: Partial<Permit> = {
    ...permitData,
    status: 'borrador' as const,
    createdBy: userId,
    user: {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
  };

  try {
    if (draftId) {
      // Actualizar un borrador existente
      const docRef = adminDb.collection('permits').doc(draftId);
      await docRef.update({ ...permitPayload, updatedAt: FieldValue.serverTimestamp() });
      revalidatePath(`/permits/${draftId}`);
      revalidatePath('/permits');
      return { success: true, permitId: draftId, isUpdate: true };
    } else {
      // Crear un nuevo borrador
      permitPayload.createdAt = FieldValue.serverTimestamp();
      const docRef = await adminDb.collection('permits').add(permitPayload as any);
      revalidatePath('/permits');
      return { success: true, permitId: docRef.id, isUpdate: false };
    }
  } catch (error: any) {
    console.error("❌ [Action] Error al guardar borrador:", error);
    return { 
      success: false, 
      error: error.message || 'Could not save draft. Please try again.' 
    };
  }
}


export async function addSignatureAndNotify(
  permitId: string, 
  role: 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas', 
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

            // Si es el solicitante quien firma, cambiamos el estado y generamos el número.
            if (role === 'solicitante') {
                const permitDocBefore = await docRef.get();
                if (permitDocBefore.exists && permitDocBefore.data()?.status === 'borrador') {
                  const permitNumber = `PT-${Date.now()}-${permitId.substring(0, 6).toUpperCase()}`;
                  updateData['number'] = permitNumber;
                  updateData['status'] = 'pendiente_revision';
                }
            }
        }
        
        await docRef.update(updateData);
        
        const permitDoc = await docRef.get();
        const permitData = permitDoc.data() as Permit;
        
        const signatureRoleName = (signatureRoles as any)[role] || role;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${permitId}`;
        
        let messageBody = `*Notificación de Firma - SGPT* 🖋️
El permiso *${permitData.number || permitId}* ha sido firmado.

👤 *Quién firmó:* ${user.displayName || 'N/A'}
✨ *Rol:* ${signatureRoleName}
✍️ *Tipo de firma:* ${signatureType === 'firmaApertura' ? 'Apertura' : 'Cierre'}

Puede ver los detalles aquí:
${permitUrl}`;

        if (role === 'solicitante' && signatureType === 'firmaApertura') {
            messageBody = `*Permiso listo para Autorización - SGPT* ⏳
El permiso *${permitData.number || permitId}* ha sido firmado por el solicitante y está listo para su revisión.

👤 *Solicitante:* ${user.displayName || 'N/A'}

Por favor, ingrese para revisarlo y autorizarlo:
${permitUrl}`;
        }
        
        await sendWhatsAppNotification(messageBody);
        console.log(`[Action] Notificación de firma enviada para el permiso ${permitId}`);

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
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${permitId}`;

        let messageBody = `*Actualización de Estado - SGPT* 🔄
El estado del permiso *${permitData.number || permitId}* ha cambiado.

*Nuevo Estado:* ${statusText}

Puede ver los detalles aquí:
${permitUrl}`;

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

export async function addDailyValidationSignature(permitId: string, anexoName: string, validationType: 'autoridad' | 'responsable', index: number, data: ValidacionDiaria) {
  if (!permitId || !anexoName || !validationType || index === undefined || !data) {
    return { success: false, error: 'Parámetros inválidos.' };
  }

  try {
    const docRef = adminDb.collection('permits').doc(permitId);
    const permitSnap = await docRef.get();
    if (!permitSnap.exists) {
      return { success: false, error: 'El permiso no existe.' };
    }
    const permitData = permitSnap.data() as Permit;

    const anexoData = permitData[anexoName as keyof Permit] as any;
    if (!anexoData || !anexoData.validacion) {
      return { success: false, error: `El anexo ${anexoName} no está configurado para validación diaria.` };
    }

    const validationArray = anexoData.validacion[validationType] as ValidacionDiaria[];
    if (!validationArray || index < 0 || index >= validationArray.length) {
      return { success: false, error: `Índice de validación fuera de rango.` };
    }

    validationArray[index] = data;

    await docRef.update({
      [`${anexoName}.validacion.${validationType}`]: validationArray
    });

    revalidatePath(`/permits/${permitId}`);
    return { success: true };

  } catch (error: any) {
    console.error("❌ Error al guardar la validación diaria:", error);
    return { success: false, error: 'No se pudo guardar la firma de validación.' };
  }
}

export async function addWorkerSignature(permitId: string, workerIndex: number, signatureType: 'firmaApertura' | 'firmaCierre', signatureDataUrl: string) {
    if (!permitId || workerIndex < 0 || !signatureType || !signatureDataUrl) {
        return { success: false, error: 'Faltan parámetros.' };
    }

    const docRef = adminDb.collection('permits').doc(permitId);
    try {
        const permitSnap = await docRef.get();
        if (!permitSnap.exists) {
            return { success: false, error: 'El permiso no existe.' };
        }

        const permitData = permitSnap.data() as Permit;
        const workers = permitData.workers ? [...permitData.workers] : [];

        if (workerIndex >= workers.length) {
            return { success: false, error: 'Índice de trabajador inválido.' };
        }

        workers[workerIndex] = {
            ...workers[workerIndex],
            [signatureType]: signatureDataUrl,
        };

        await docRef.update({ workers: workers });

        revalidatePath(`/permits/${permitId}`);
        return { success: true };
    } catch (error: any) {
        console.error("Error al guardar la firma del trabajador:", error);
        return { success: false, error: 'No se pudo guardar la firma.' };
    }
}
