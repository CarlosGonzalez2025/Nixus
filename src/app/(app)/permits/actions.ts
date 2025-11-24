
'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoExcavaciones, AnexoIzaje, AnexoATS, PermitGeneralInfo, JustificacionATS, ValidacionDiaria, User, Notification } from '@/types';
import { FieldValue } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { getEmailForUser, sendPermitUpdateEmail } from '@/lib/email';
import { config } from 'dotenv';
config();

// --- Funciones Auxiliares para Notificaciones ---

const getInvolvedUsers = async (permit: Permit): Promise<string[]> => {
  const userIds = new Set<string>();

  // 1. Creador del permiso
  if (permit.createdBy) {
    userIds.add(permit.createdBy);
  }

  // 2. Usuarios que han firmado
  Object.values(permit.approvals || {}).forEach(approval => {
    if (approval && approval.userId) {
      userIds.add(approval.userId);
    }
  });

  // 3. Roles administrativos o de supervisión que deberían ser notificados
  const adminsQuery = await adminDb.collection('users').where('role', 'in', ['admin', 'autorizante', 'lider_sst']).get();
  adminsQuery.forEach(doc => userIds.add(doc.id));

  return Array.from(userIds);
};

const createNotification = async (
  userId: string,
  permit: Permit,
  message: string,
  type: Notification['type'],
  triggeredBy: { uid: string, displayName: string | null }
) => {
  const notification = {
    userId,
    permitId: permit.id,
    permitNumber: permit.number || '',
    message,
    type,
    isRead: false,
    createdAt: FieldValue.serverTimestamp(),
    triggeredBy,
  };
  await adminDb.collection('notifications').add(notification);
  
  // Enviar correo electrónico
  const userEmail = await getEmailForUser(userId);
  if (userEmail) {
    await sendPermitUpdateEmail({
      to: userEmail,
      subject: `Actualización en Permiso SGTC: ${permit.number || permit.id}`,
      html: `<p>${message}</p><p>Puedes ver los detalles del permiso haciendo clic <a href="${process.env.NEXT_PUBLIC_BASE_URL}/permits/${permit.id}">aquí</a>.</p>`
    });
  }
};

// --- Fin de Funciones de Notificaciones ---

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
  if (permit.controlEnergia) selectedTypes.push('Control de Energías');
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
  lider_sst: 'Firma SST',
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
   if (!isAdminReady()) {
    return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
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

    const createdPermit = { ...permitPayload, id: docRef.id, number: permitNumber } as Permit;
    const involvedUsers = await getInvolvedUsers(createdPermit);
    const message = `Se creó un nuevo permiso de trabajo: #${permitNumber}`;
    
    for (const uid of involvedUsers) {
      if (uid !== userId) { // No notificar al creador sobre su propia acción
        await createNotification(uid, createdPermit, message, 'creation', { uid: userId, displayName: userDisplayName });
      }
    }

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
  if (!isAdminReady()) {
    return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
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
  role: 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas' | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', 
  signatureType: 'firmaApertura' | 'firmaCierre',
  signatureDataUrl: string,
  user: { uid: string, displayName: string | null, role?: UserRole, empresa?: string },
  comments?: string,
  permitData?: { id: string, number?: string, isSSTSignatureRequired?: boolean, controlEnergia?: boolean }
) {
    if (!permitId || !role || !signatureDataUrl || !user) {
        return { success: false, error: 'Faltan parámetros para guardar la firma.' };
    }
    if (!isAdminReady()) {
      return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        
        let updateData: { [key: string]: any } = {};

        // Lógica para manejar firmas de aprobación y de cierre/cancelación
        if (role.startsWith('cierre_') || role === 'cancelacion') {
            const closureRole = role === 'cierre_autoridad' ? 'autoridad' : (role === 'cierre_responsable' ? 'responsable' : 'canceladoPor');
            const closurePath = `closure.${closureRole}`;
            
            const existingClosureData = (await docRef.get()).data()?.closure?.[closureRole] || {};

            updateData[closurePath] = {
                ...existingClosureData,
                firma: signatureDataUrl,
                nombre: user.displayName,
                fecha: FieldValue.serverTimestamp() 
            };

        } else {
            const approvalData: Partial<Approval> = {
                status: 'aprobado',
                firmaApertura: signatureDataUrl,
                userName: user.displayName,
                userId: user.uid,
                signedAt: FieldValue.serverTimestamp() as any,
                userRole: user.role,
                userEmpresa: user.empresa || 'N/A',
                comments: comments || '',
            }
            
            updateData[`approvals.${role}`] = approvalData;
            
            const permitDocBefore = await docRef.get();
            const permitBeforeData = permitDocBefore.data() as Permit | undefined;
            
            if (signatureType === 'firmaApertura') {
                const validationPayload: ValidacionDiaria = { dia: 1, nombre: user.displayName || '', firma: signatureDataUrl, fecha: new Date().toISOString() };
                
                if (role === 'solicitante') {
                    if (permitBeforeData && permitBeforeData.status === 'borrador') {
                        const permitNumber = `PT-${Date.now()}-${permitId.substring(0, 6).toUpperCase()}`;
                        updateData['number'] = permitNumber;
                        updateData['status'] = 'pendiente_revision';
                        updateData['isSSTSignatureRequired'] = permitData?.isSSTSignatureRequired;
                    }

                    // Auto-llenar validación diaria del responsable
                    ['anexoAltura', 'anexoConfinado', 'anexoIzaje', 'anexoExcavaciones'].forEach(anexo => {
                        if ((permitBeforeData as any)?.[anexo]) {
                            const currentValidations = (permitBeforeData as any)[anexo].validacion?.responsable || [];
                            currentValidations[0] = validationPayload;
                            updateData[`${anexo}.validacion.responsable`] = currentValidations;
                        }
                    });

                } else if (role === 'autorizante') {
                    // Auto-llenar validación diaria de la autoridad
                     ['anexoAltura', 'anexoConfinado', 'anexoIzaje', 'anexoExcavaciones'].forEach(anexo => {
                        if ((permitBeforeData as any)?.[anexo]) {
                            const currentValidations = (permitBeforeData as any)[anexo].validacion?.autoridad || [];
                            currentValidations[0] = validationPayload;
                            updateData[`${anexo}.validacion.autoridad`] = currentValidations;
                        }
                    });
                }
            }

            // *** NUEVA LÓGICA DE APROBACIÓN AUTOMÁTICA ***
            const updatedApprovals = { ...permitBeforeData?.approvals, [role]: approvalData };
            const isSSTRequired = permitBeforeData?.isSSTSignatureRequired;

            let allRequiredSignaturesDone = 
                updatedApprovals.solicitante?.status === 'aprobado' &&
                updatedApprovals.autorizante?.status === 'aprobado';
            
            if (permitBeforeData?.controlEnergia) {
                allRequiredSignaturesDone = allRequiredSignaturesDone && updatedApprovals.mantenimiento?.status === 'aprobado';
            }
            if (isSSTRequired) {
                allRequiredSignaturesDone = allRequiredSignaturesDone && updatedApprovals.lider_sst?.status === 'aprobado';
            }
            
            // Si se cumplen las condiciones, se pone en ejecución.
            if (allRequiredSignaturesDone) {
                updateData['status'] = 'en_ejecucion';
            }
        }
        
        await docRef.update(updateData);
        
        const permitDoc = await docRef.get();
        const updatedPermitData = { id: permitDoc.id, ...permitDoc.data() } as Permit;
        
        const signatureRoleName = (signatureRoles as any)[role] || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        const message = `${user.displayName || 'Un usuario'} ha firmado el permiso #${updatedPermitData.number} como ${signatureRoleName}.`;
        const involvedUsers = await getInvolvedUsers(updatedPermitData);
        
        for (const uid of involvedUsers) {
          if (uid !== user.uid) { // No notificar al usuario sobre su propia acción
            await createNotification(uid, updatedPermitData, message, 'signature', user);
          }
        }
        
        // Notificación adicional si el permiso se puso en ejecución
        if (updateData['status'] === 'en_ejecucion') {
            const executionMessage = `El permiso #${updatedPermitData.number} ha sido aprobado y se encuentra ahora EN EJECUCIÓN.`;
            for (const uid of involvedUsers) {
                 if (uid !== user.uid) {
                    await createNotification(uid, updatedPermitData, executionMessage, 'approval', user);
                }
            }
        }

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


export async function updatePermitStatus(
  permitId: string,
  status: PermitStatus,
  currentUser: { uid: string, displayName: string | null },
  reason?: string,
  closureData?: Partial<PermitClosure>
) {
    if (!permitId) {
        return { success: false, error: 'Permit ID is required.' };
    }
    if (!isAdminReady()) {
      return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
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
                fechaCierre: FieldValue.serverTimestamp(),
            };
        }

        await docRef.update(updateData);

        const permitDoc = await docRef.get();
        const permitData = { id: permitDoc.id, ...permitDoc.data() } as Permit;
        
        const triggeredBy = currentUser;
        
        let notificationType: Notification['type'] = 'status_change';
        let message = `${currentUser.displayName || 'Un usuario'} ha cambiado el estado del permiso #${permitData.number} a: ${getStatusText(status)}.`;

        if (status === 'aprobado') {
            notificationType = 'approval';
            message = `${currentUser.displayName || 'Un usuario'} ha aprobado el permiso #${permitData.number}.`;
        } else if (status === 'rechazado') {
            notificationType = 'rejection';
            message = `${currentUser.displayName || 'Un usuario'} ha rechazado el permiso #${permitData.number}.`;
            if (reason) {
                message += ` Motivo: ${reason}`;
            }
        } else if (status === 'cerrado') {
            notificationType = 'cancellation'; // Using cancellation for close
            message = `${currentUser.displayName || 'Un usuario'} ha cerrado el permiso #${permitData.number}.`;
        }
        
        const involvedUsers = await getInvolvedUsers(permitData);

        for (const uid of involvedUsers) {
             if (uid !== currentUser.uid) { // No notificar al usuario sobre su propia acción
                await createNotification(uid, permitData, message, notificationType, triggeredBy);
            }
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgpt-movil.web.app';
        const permitUrl = `${baseUrl}/permits/${permitId}`;

        let messageBody = `*Actualización de Estado - SGPT* 🔄
El estado del permiso *${permitData.number || permitId}* ha cambiado.

*Nuevo Estado:* ${getStatusText(status)}

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

export async function addDailyValidationSignature(permitId: string, anexoName: string, validationType: 'autoridad' | 'responsable', index: number, data: ValidacionDiaria, user: User) {
  if (!permitId || !anexoName || !validationType || index < 0 || !data || !user) {
    return { success: false, error: 'Parámetros inválidos.' };
  }

  if (!isAdminReady()) {
    return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
  }

  const docRef = adminDb.collection('permits').doc(permitId);
  try {
    const permitSnap = await docRef.get();
    if (!permitSnap.exists) {
      return { success: false, error: 'El permiso no existe.' };
    }
    const permitData = permitSnap.data() as Permit;

    const anexoData = (permitData as any)[anexoName];
    if (!anexoData || !anexoData.validacion) {
      return { success: false, error: `El anexo ${anexoName} o su estructura de validación no existen en el permiso.` };
    }
    
    const validationArray = (anexoData.validacion[validationType] as ValidacionDiaria[]) || [];
    
    while (validationArray.length <= index) {
        validationArray.push({ dia: validationArray.length + 1, nombre: '', fecha: '', firma: '' });
    }

    validationArray[index] = data;
    
    const updatePath = `${anexoName}.validacion.${validationType}`;
    
    await docRef.update({
      [updatePath]: validationArray,
    });

    // --- Lógica de Notificación ---
    const fullPermitData = { id: docRef.id, ...permitData } as Permit;
    const anexoDisplayName = anexoName.replace('anexo', 'Anexo ');
    const validationRoleName = validationType === 'autoridad' ? 'Autoridad del Área' : 'Responsable del Trabajo';
    const day = index + 1;

    // Notificaciones en la App y por Email
    const message = `${user.displayName || 'Un usuario'} ha realizado la validación diaria (${validationRoleName}) para el DÍA ${day} del ${anexoDisplayName} en el permiso #${fullPermitData.number}.`;
    const involvedUsers = await getInvolvedUsers(fullPermitData);
    for (const uid of involvedUsers) {
      if (uid !== user.uid) {
        await createNotification(uid, fullPermitData, message, 'status_change', user);
      }
    }

    // Notificación por WhatsApp
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgpt-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${permitId}`;
    const whatsappMessage = `*Validación Diaria - SGPT* ✍️
Se ha registrado una nueva firma de validación diaria.

📄 *Permiso:* ${fullPermitData.number || 'N/A'}
🗓️ *Día:* ${day}
👤 *Firmante:* ${user.displayName || 'N/A'}
✅ *Rol:* ${validationRoleName}
📋 *Anexo:* ${anexoDisplayName}

Puede ver los detalles aquí:
${permitUrl}`;
    
    await sendWhatsAppNotification(whatsappMessage);


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
    if (!isAdminReady()) {
      return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
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

        const signatureField = signatureType === 'firmaApertura' ? 'firmaApertura' : 'firmaCierre';
        const dateField = signatureType === 'firmaApertura' ? 'fechaFirmaApertura' : 'fechaFirmaCierre';

        workers[workerIndex] = {
            ...workers[workerIndex],
            [signatureField]: signatureDataUrl,
            [dateField]: new Date().toISOString(), 
        };

        await docRef.update({ workers: workers });

        revalidatePath(`/permits/${permitId}`);
        return { success: true };
    } catch (error: any) {
        console.error("Error al guardar la firma del trabajador:", error);
        return { success: false, error: 'No se pudo guardar la firma.' };
    }
}
