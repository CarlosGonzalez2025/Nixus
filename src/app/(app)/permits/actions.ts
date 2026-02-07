
'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoExcavaciones, AnexoIzaje, AnexoATS, PermitGeneralInfo, JustificacionATS, ValidacionDiaria, User, Notification } from '@/types';
import { FieldValue, UpdateData, Timestamp } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { getEmailForUser, sendPermitUpdateEmail } from '@/lib/email';
import { config } from 'dotenv';
config();

// --- Funciones Auxiliares para Notificaciones ---

const getInvolvedUsers = async (permit: Permit): Promise<string[]> => {
  const userIds = new Set<string>();

  // 1. Creador del permiso (Solicitante)
  if (permit.createdBy) {
    userIds.add(permit.createdBy);
  }

  // 2. Usuarios que han firmado (Cualquiera que ya haya participado)
  Object.values(permit.approvals || {}).forEach(approval => {
    if (approval && approval.userId) {
      userIds.add(approval.userId);
    }
  });

  // 3. Lógica específica para Autorizantes y SST según la planta
  const permitPlant = permit.generalInfo?.planta;

  // Buscar Autorizantes
  let autorizantesQuery = adminDb.collection('users').where('role', '==', 'autorizante');
  if (permitPlant) {
    autorizantesQuery = autorizantesQuery.where('planta', '==', permitPlant);
  }
  const autorizantesSnap = await autorizantesQuery.get();
  autorizantesSnap.forEach(doc => userIds.add(doc.id));

  // Buscar Líderes SST (Solo si es requerido o hay riesgo alto)
  // Se asume que si el permiso requiere firma SST, se debe notificar a los SST.
  // También se podría validar por tipos de trabajo de alto riesgo, pero isSSTSignatureRequired suele cubrir esto.
  if (permit.isSSTSignatureRequired || permit.trabajoAlturas || permit.espaciosConfinados || permit.controlEnergia || permit.izajeCargas || permit.excavaciones) {
     let sstQuery = adminDb.collection('users').where('role', '==', 'lider_sst');
     if (permitPlant) {
        sstQuery = sstQuery.where('planta', '==', permitPlant);
     }
     const sstSnap = await sstQuery.get();
     sstSnap.forEach(doc => userIds.add(doc.id));
  }

  // Nota: Ya NO se notifica a 'admin' genéricos automáticamente, a menos que sean firmantes.

  return Array.from(userIds);
};

const createNotification = async (
  userId: string,
  permit: Permit,
  message: string,
  type: Notification['type'],
  triggeredBy: { uid: string, displayName: string | null }
) => {
  const notification: Omit<Notification, 'id'> = {
    userId,
    permitId: permit.id,
    permitNumber: permit.number || '',
    message,
    type,
    isRead: false,
    createdAt: FieldValue.serverTimestamp() as Timestamp,
    triggeredBy,
  };
  await adminDb.collection('notifications').add(notification as any);
  
  // Enviar correo electrónico
  const userEmail = await getEmailForUser(userId);
  if (userEmail) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${permit.id}`;
    await sendPermitUpdateEmail({
      to: userEmail,
      subject: `Actualización en Permiso SGTC: ${permit.number || permit.id}`,
      html: `<p>${message}</p><p>Puedes ver los detalles del permiso haciendo clic <a href="${permitUrl}">aquí</a>.</p>`
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

const signatureRoles: { [key in 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas' | 'supervisor_confinado']: string } = {
  coordinador_alturas: 'COORDINADOR DE TRABAJOS EN ALTURAS',
  solicitante: 'QUIEN SOLICITA (LÍDER A CARGO DEL EQUIPO EJECUTANTE)',
  autorizante: 'QUIEN AUTORIZA (JEFES Y DUEÑOS DE AREA)',
  mantenimiento: 'PERSONAL DE MANTENIMIENTO',
  lider_sst: 'Firma SST',
  supervisor_confinado: 'SUPERVISOR DE TRABAJO EN ESPACIOS CONFINADOS',
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
    supervisor_confinado: { status: 'pendiente' as const },
  };

  const permitPayload: Omit<Permit, 'id'> = {
    ...permitData,
    status: 'pendiente_revision' as const,
    createdBy: userId,
    createdAt: FieldValue.serverTimestamp() as Timestamp,
    user: {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
    trabajoAlturas: data.trabajoAlturas || false,
    isSSTSignatureRequired: data.isSSTSignatureRequired || false,
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
      if (uid !== userId) {
        await createNotification(uid, createdPermit, message, 'creation', { uid: userId, displayName: userDisplayName });
      }
    }

    const workTypesText = getWorkTypesString(permitPayload);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${docRef.id}`;
    
    const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${permitNumber}
👤 *Solicitante:* ${userDisplayName || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud para su aprobación en el siguiente enlace:
${permitUrl}`;
    
    // ✅ WHATSAPP: Solo se envía en la creación del permiso.
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
    supervisor_confinado: { status: 'pendiente' as const },
  };

  const permitPayload: Omit<Permit, 'id' | 'createdAt'> = {
    ...permitData,
    status: 'borrador' as const,
    createdBy: userId,
    user: {
      displayName: userDisplayName,
      email: userEmail,
      photoURL: userPhotoURL,
    },
    approvals: initialApprovals,
    trabajoAlturas: data.trabajoAlturas || false,
    isSSTSignatureRequired: data.isSSTSignatureRequired || false,
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
      const payloadWithTimestamp = { ...permitPayload, createdAt: FieldValue.serverTimestamp() };
      const docRef = await adminDb.collection('permits').add(payloadWithTimestamp as any);
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
  role: 'solicitante' | 'autorizante' | 'mantenimiento' | 'lider_sst' | 'coordinador_alturas' | 'supervisor_confinado' | 'cierre_autoridad' | 'cierre_responsable' | 'cancelacion', 
  signatureType: 'firmaApertura' | 'firmaCierre',
  signatureDataUrl: string,
  user: { uid: string, displayName: string | null, role?: UserRole, empresa?: string },
  comments?: string
) {
    if (!permitId || !role || !user || !user.uid || !user.role) {
        return { success: false, error: 'Parámetros inválidos para guardar la firma.' };
    }
    if (!isAdminReady()) {
      return { success: false, error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        let permitBeforeData = (await docRef.get()).data() as Permit;
        if (!permitBeforeData) {
            return { success: false, error: 'El permiso no existe.' };
        }

        const updateData: UpdateData<Permit> = {};

        // Lógica para manejar firmas de cierre y cancelación
        if (role.startsWith('cierre_') || role === 'cancelacion') {
            const closureRole = role === 'cierre_autoridad' ? 'autoridad' : (role === 'cierre_responsable' ? 'responsable' : 'canceladoPor');
            const closurePath = `closure.${closureRole}`;
            
            const existingClosureData = (permitBeforeData.closure as any)?.[closureRole] || {};

            updateData[closurePath as keyof UpdateData<Permit>] = {
                ...existingClosureData,
                firma: signatureDataUrl,
                nombre: user.displayName,
                fecha: FieldValue.serverTimestamp() 
            };
            
            if (role === 'cancelacion') {
                updateData['closure.razonCancelacion'] = comments || 'No especificado';
                updateData['closure.cancelado'] = 'si';
            }

        } else {
            // ✅ VALIDACIÓN DE PERMISOS ANTES DE FIRMAR
            const canSign = await validateSignaturePermission(permitId, role, user);
            if (!canSign.allowed) {
                return { success: false, error: canSign.reason };
            }

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

            // ✅ LÓGICA DE FIRMA DE SOLICITANTE
            if (role === 'solicitante') {
                // Guardar siempre la firma del solicitante y la validación diaria
                const validationPayload: ValidacionDiaria = { 
                    dia: 1, 
                    nombre: user.displayName || '', 
                    firma: signatureDataUrl, 
                    fecha: new Date().toISOString() 
                };

                ['anexoAltura', 'anexoConfinado', 'anexoIzaje', 'anexoExcavaciones'].forEach(anexo => {
                    if ((permitBeforeData as any)?.[anexo]) {
                        const currentValidations = ((permitBeforeData as any)[anexo].validacion?.responsable as ValidacionDiaria[]) || [];
                        if (!currentValidations[0]?.firma) {
                            currentValidations[0] = validationPayload;
                            updateData[`${anexo}.validacion.responsable`] = currentValidations;
                        }
                    }
                });

                // Actualizar los datos de la firma inmediatamente
                await docRef.update(updateData);
                
                // Recargar los datos del permiso después de guardar la firma
                permitBeforeData = (await docRef.get()).data() as Permit;
                
                // Ahora, verificar prerrequisitos
                if ((permitBeforeData.trabajoAlturas || permitBeforeData.selectedWorkTypes?.alturas) && permitBeforeData.approvals?.coordinador_alturas?.status !== 'aprobado') {
                    revalidatePath(`/permits/${permitId}`);
                    return { success: false, error: 'Se requiere primero la firma del Coordinador de Trabajos en Alturas.' };
                }
                if ((permitBeforeData.espaciosConfinados || permitBeforeData.selectedWorkTypes?.confinado) && permitBeforeData.approvals?.supervisor_confinado?.status !== 'aprobado') {
                    revalidatePath(`/permits/${permitId}`);
                    return { success: false, error: 'Se requiere primero la firma del Supervisor de Espacios Confinados.' };
                }

                // Si todo está bien, proceder a cambiar el estado
                if (permitBeforeData.status === 'borrador') {
                    const permitNumber = `PT-${Date.now()}-${permitId.substring(0, 6).toUpperCase()}`;
                    updateData['number'] = permitNumber;
                    updateData['status'] = 'pendiente_revision';
                }

            } else if (role === 'autorizante') {
                const validationPayload: ValidacionDiaria = { 
                    dia: 1, 
                    nombre: user.displayName || '', 
                    firma: signatureDataUrl, 
                    fecha: new Date().toISOString() 
                };
                ['anexoAltura', 'anexoConfinado', 'anexoIzaje', 'anexoExcavaciones'].forEach(anexo => {
                    if ((permitBeforeData as any)?.[anexo]) {
                       const currentValidations = (permitBeforeData as any)[anexo].validacion?.autoridad || [];
                        if (!currentValidations[0]?.firma) {
                            currentValidations[0] = validationPayload;
                            updateData[`${anexo}.validacion.autoridad`] = currentValidations;
                        }
                    }
                });
            }

            // ✅ VERIFICACIÓN AUTOMÁTICA FINAL: ¿Todas las firmas requeridas están completas?
            const potentiallyUpdatedPermitData = { 
                ...permitBeforeData, 
                approvals: { ...permitBeforeData.approvals, ...updateData.approvals }
            };
            
            if (await checkAllRequiredSignaturesComplete(potentiallyUpdatedPermitData)) {
                if (permitBeforeData.status === 'pendiente_revision') {
                    updateData['status'] = 'aprobado'; // Cambiado de en_ejecucion a aprobado
                }
            }
        }
        
        await docRef.update(updateData);
        
        const permitDoc = await docRef.get();
        const updatedPermitData = { id: permitDoc.id, ...permitDoc.data() } as Permit;
        
        const signatureRoleName = (signatureRoles as any)[role] || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        const message = `${user.displayName || 'Un usuario'} ha firmado el permiso #${updatedPermitData.number} como ${signatureRoleName}.`;
        const involvedUsers = await getInvolvedUsers(updatedPermitData);
        
        for (const uid of involvedUsers) {
          if (uid !== user.uid) {
            await createNotification(uid, updatedPermitData, message, 'signature', user);
          }
        }
        
        if (updateData['status'] === 'aprobado') {
            const approvalMessage = `El permiso #${updatedPermitData.number} ha completado todas las aprobaciones y ha sido APROBADO.`;
            for (const uid of involvedUsers) {
                 await createNotification(uid, updatedPermitData, approvalMessage, 'approval', user);
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

// ✅ FUNCIÓN CORREGIDA: Verificar si todas las firmas requeridas están completas
async function checkAllRequiredSignaturesComplete(
  permitData: Permit
): Promise<boolean> {
    const { approvals } = permitData;
    
    // Firma del solicitante es SIEMPRE requerida
    if (approvals?.solicitante?.status !== 'aprobado') {
        return false;
    }
    
    // Firma del autorizante es SIEMPRE requerida
    if (approvals?.autorizante?.status !== 'aprobado') {
        return false;
    }
    
    // Si hay trabajos en alturas, requiere firma del coordinador
    if (permitData.trabajoAlturas || permitData.selectedWorkTypes?.alturas) {
        if (approvals?.coordinador_alturas?.status !== 'aprobado') {
            return false;
        }
    }
    
    // Si hay espacios confinados, requiere firma del supervisor
    if (permitData.espaciosConfinados || permitData.selectedWorkTypes?.confinado) {
        if (approvals?.supervisor_confinado?.status !== 'aprobado') {
            return false;
        }
    }
    
    // Si hay control de energía, requiere firma de mantenimiento
    if (permitData.controlEnergia) {
        if (approvals?.mantenimiento?.status !== 'aprobado') {
            return false;
        }
    }
    
    // Si SST es requerido, validar su firma
    if (permitData.isSSTSignatureRequired) {
        if (approvals?.lider_sst?.status !== 'aprobado') {
            return false;
        }
    }
    
    return true;
}

// ✅ FUNCIÓN MEJORADA: Validación de transiciones de estado
function validateStateTransition(currentStatus: PermitStatus, targetStatus: PermitStatus, userRole: UserRole): { allowed: boolean, reason?: string } {
    const allowedTransitions: Partial<Record<PermitStatus, Partial<Record<PermitStatus, UserRole[]>>>> = {
        'borrador': {
            'pendiente_revision': ['solicitante', 'lider_tarea', 'admin']
        },
        'pendiente_revision': {
            'en_ejecucion': ['autorizante', 'admin', 'lider_tarea'], // Permitir a lider_tarea iniciar si ya esta aprobado por otros
            'aprobado': ['autorizante', 'admin'],
            'rechazado': ['autorizante', 'lider_sst', 'admin']
        },
        'aprobado': {
            'en_ejecucion': ['lider_tarea', 'admin'],
            'rechazado': ['autorizante', 'lider_sst', 'admin'] // Permitir rechazar incluso si esta aprobado
        },
        'en_ejecucion': {
            'suspendido': ['lider_sst', 'admin', 'autorizante'],
            'cerrado': ['lider_tarea', 'admin', 'autorizante']
        },
        'suspendido': {
            'en_ejecucion': ['lider_sst', 'admin', 'autorizante'],
            'cerrado': ['lider_tarea', 'admin', 'autorizante']
        }
    };
    
    const allowedRoles = allowedTransitions[currentStatus]?.[targetStatus];
    if (!allowedRoles) {
        return { allowed: false, reason: `Transición de '${getStatusText(currentStatus)}' a '${getStatusText(targetStatus)}' no está permitida.` };
    }

    if (!allowedRoles.includes(userRole) && userRole !== 'admin') {
        return { allowed: false, reason: `Tu rol (${userRole}) no tiene permisos para cambiar el estado a '${getStatusText(targetStatus)}'.` };
    }

    return { allowed: true };
}


export async function updatePermitStatus(
  permitId: string,
  status: PermitStatus,
  currentUser: { uid: string, displayName: string | null, role?: UserRole },
  reason?: string
) {
    if (!permitId || !currentUser.uid || !currentUser.role) {
        return { success: false, error: 'Parámetros inválidos o usuario sin rol.' };
    }
    if (!isAdminReady()) {
      return { success: false, error: 'Credenciales de administrador de Firebase no configuradas.' };
    }

    try {
        const docRef = adminDb.collection('permits').doc(permitId);
        const permitSnap = await docRef.get();
        if (!permitSnap.exists) {
            return { success: false, error: 'El permiso no existe.' };
        }
        const permitData = permitSnap.data() as Permit;
        
        const transition = validateStateTransition(permitData.status, status, currentUser.role);
        if (!transition.allowed) {
            return { success: false, error: transition.reason };
        }

        const updateData: UpdateData<Permit> = { status };

        if (status === 'rechazado' && reason) {
            updateData.rejectionReason = reason;
        }
        
        if (status === 'cerrado') {
            updateData['closure.fechaCierre'] = FieldValue.serverTimestamp();
            updateData['closure.terminado'] = 'si';
        }

        await docRef.update(updateData);
        
        const updatedPermitData = { ...permitData, ...updateData, id: permitId } as Permit;
        const triggeredBy = currentUser;
        
        // Mensajes de notificación mejorados
        let notificationType: Notification['type'] = 'status_change';
        let message = `El estado del permiso #${permitData.number} ha sido actualizado a: ${getStatusText(status)}.`;

        switch (status) {
            case 'aprobado':
                notificationType = 'approval';
                message = `¡Buenas noticias! El permiso #${permitData.number} ha sido APROBADO y está listo para su ejecución.`;
                break;
            case 'en_ejecucion':
                notificationType = 'status_change';
                message = `El permiso #${permitData.number} ha sido puesto EN EJECUCIÓN.`;
                break;
            case 'rechazado':
                notificationType = 'rejection';
                message = `Atención: El permiso #${permitData.number} ha sido RECHAZADO.`;
                if (reason) message += ` Motivo: ${reason}`;
                break;
            case 'cerrado':
                notificationType = 'cancellation';
                message = `El permiso #${permitData.number} ha sido CERRADO exitosamente.`;
                break;
            case 'suspendido':
                notificationType = 'status_change';
                message = `Alerta: El permiso #${permitData.number} ha sido SUSPENDIDO.`;
                break;
        }
        
        const involvedUsers = await getInvolvedUsers(updatedPermitData);
        for (const uid of involvedUsers) {
             if (uid !== currentUser.uid) {
                await createNotification(uid, updatedPermitData, message, notificationType, triggeredBy);
            }
        }
        
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

// ✅ FUNCIÓN MEJORADA: Validación de permisos de firma con orden jerárquico
async function validateSignaturePermission(
    permitId: string, 
    signatureRole: string, 
    currentUser: { uid: string, role?: UserRole }
): Promise<{ allowed: boolean, reason?: string }> {
    const docRef = adminDb.collection('permits').doc(permitId);
    const permitDoc = await docRef.get();
    if (!permitDoc.exists) {
        return { allowed: false, reason: 'Permiso no encontrado.' };
    }
    const permit = permitDoc.data() as Permit;
    
    // ✅ Verificar que el permiso esté en un estado válido para firmar
    if (!['borrador', 'pendiente_revision'].includes(permit.status)) {
        return { allowed: false, reason: `No se puede firmar un permiso en estado '${permit.status}'.` };
    }
    
    switch (signatureRole) {
        case 'coordinador_alturas':
            // Debe haber trabajo en alturas
            if (!permit.trabajoAlturas && !permit.selectedWorkTypes?.alturas) {
                return { allowed: false, reason: 'Esta firma solo aplica para trabajos en alturas.' };
            }
            // Solo el creador o admin puede gestionar esta firma
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede gestionar esta firma.' };
            }
            break;
            
        case 'supervisor_confinado':
            // Debe haber trabajo en espacios confinados
            if (!permit.espaciosConfinados && !permit.selectedWorkTypes?.confinado) {
                return { allowed: false, reason: 'Esta firma solo aplica para trabajos en espacios confinados.' };
            }
            // Solo el creador o admin puede gestionar esta firma
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede gestionar esta firma.' };
            }
            break;

        case 'solicitante':
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede firmar como solicitante.' };
            }
            break;
            
        case 'lider_sst':
            if (currentUser.role !== 'lider_sst' && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Rol de Líder SST requerido para esta firma.' };
            }
            // ✅ Solo requerido si isSSTSignatureRequired es true
            if (!permit.isSSTSignatureRequired) {
                return { allowed: false, reason: 'Firma de SST no es requerida para este permiso.' };
            }
            if (permit.approvals?.solicitante?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma del solicitante.' };
            }
            break;
            
        case 'mantenimiento':
             if (currentUser.role !== 'mantenimiento' && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Rol de Mantenimiento requerido para esta firma.' };
            }
            if (!permit.controlEnergia) {
                return { allowed: false, reason: 'Firma de Mantenimiento solo aplica cuando hay control de energías.' };
            }
            if (permit.approvals?.solicitante?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma del solicitante.' };
            }
            break;

        case 'autorizante':
            if (currentUser.role !== 'autorizante' && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Rol de autorizante requerido para esta firma.' };
            }
            if (permit.approvals?.solicitante?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma del solicitante.' };
            }
            if (permit.isSSTSignatureRequired && permit.approvals?.lider_sst?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma del Líder SST.' };
            }
            if (permit.controlEnergia && permit.approvals?.mantenimiento?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma de Mantenimiento.' };
            }
            break;
    }
    
    return { allowed: true };
}

export async function addDailyValidationSignature(
  permitId: string, 
  anexoName: string, 
  validationType: 'autoridad' | 'responsable', 
  index: number, 
  data: ValidacionDiaria, 
  user: User
) {
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

    // ✅ Verificar que el permiso esté en ejecución para validaciones diarias
    if (!['en_ejecucion', 'suspendido'].includes(permitData.status)) {
        return { success: false, error: 'Solo se pueden agregar validaciones diarias en permisos EN EJECUCIÓN o SUSPENDIDOS.' };
    }

    const anexoData = (permitData as any)[anexoName];
    if (!anexoData) {
      return { success: false, error: `El anexo ${anexoName} no existe en el permiso.` };
    }
    
    const anexoUpdate: any = { ...anexoData };
    if (!anexoUpdate.validacion) {
        anexoUpdate.validacion = { autoridad: [], responsable: [] };
    }

    const validationArray = (anexoUpdate.validacion[validationType] as ValidacionDiaria[]) || [];
    
    while (validationArray.length <= index) {
        validationArray.push({ dia: validationArray.length + 1, nombre: '', fecha: '', firma: '' });
    }

    validationArray[index] = data;
    
    const updatePath = `${anexoName}.validacion.${validationType}`;
    
    await docRef.update({
      [updatePath]: validationArray,
    });

    const fullPermitData = { id: docRef.id, ...permitData } as Permit;
    const anexoDisplayName = anexoName.replace('anexo', 'Anexo ');
    const validationRoleName = validationType === 'autoridad' ? 'Autoridad del Área' : 'Responsable del Trabajo';
    const day = index + 1;

    const message = `${user.displayName || 'Un usuario'} ha realizado la validación diaria (${validationRoleName}) para el DÍA ${day} del ${anexoDisplayName} en el permiso #${fullPermitData.number}.`;
    const involvedUsers = await getInvolvedUsers(fullPermitData);
    for (const uid of involvedUsers) {
      if (uid !== user.uid) {
        await createNotification(uid, fullPermitData, message, 'status_change', { uid: user.uid, displayName: user.displayName || null });
      }
    }

    revalidatePath(`/permits/${permitId}`);
    return { success: true };

  } catch (error: any) {
    console.error("❌ Error al guardar la validación diaria:", error);
    return { success: false, error: 'No se pudo guardar la firma de validación.' };
  }
}

// ✨ NUEVA FUNCIÓN: Agregar firma de cierre diario
export async function addDailyValidationClosureSignature(
  permitId: string,
  anexoName: string,
  index: number,
  data: {
    dia: number;
    fecha: string;
    firma: string;
    observaciones?: string;
  },
  user: User
) {
  if (!permitId || !anexoName || index < 0 || !data || !user) {
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

    // ✅ Verificar que el permiso esté en ejecución
    if (!['en_ejecucion', 'suspendido'].includes(permitData.status)) {
      return { success: false, error: 'Solo se pueden agregar firmas de cierre diario en permisos EN EJECUCIÓN o SUSPENDIDOS.' };
    }

    const anexoData = (permitData as any)[anexoName];
    if (!anexoData) {
      return { success: false, error: `El anexo ${anexoName} no existe en el permiso.` };
    }

    const anexoUpdate: any = { ...anexoData };
    if (!anexoUpdate.validacion) {
      anexoUpdate.validacion = { autoridad: [], responsable: [] };
    }

    const validationArray = (anexoUpdate.validacion.responsable as ValidacionDiaria[]) || [];

    while (validationArray.length <= index) {
      validationArray.push({ dia: validationArray.length + 1, nombre: '', fecha: '', firma: '' });
    }

    // ✅ Agregar datos de cierre al registro existente
    validationArray[index] = {
      ...validationArray[index],
      firmaCierre: data.firma,
      fechaCierre: data.fecha,
      observacionesCierre: data.observaciones || '',
    };

    const updatePath = `${anexoName}.validacion.responsable`;

    await docRef.update({
      [updatePath]: validationArray,
    });

    const fullPermitData = { id: docRef.id, ...permitData } as Permit;
    const anexoDisplayName = anexoName.replace('anexo', 'Anexo ');
    const day = index + 1;

    const message = `${user.displayName || 'Un usuario'} ha registrado el cierre diario del DÍA ${day} en ${anexoDisplayName} del permiso #${fullPermitData.number}.${data.observaciones ? ` Observaciones: ${data.observaciones}` : ''}`;
    
    const involvedUsers = await getInvolvedUsers(fullPermitData);
    for (const uid of involvedUsers) {
      if (uid !== user.uid) {
        await createNotification(uid, fullPermitData, message, 'status_change', { uid: user.uid, displayName: user.displayName || null });
      }
    }
    
    revalidatePath(`/permits/${permitId}`);
    return { success: true };

  } catch (error: any) {
    console.error("❌ Error al guardar la firma de cierre diario:", error);
    return { success: false, error: 'No se pudo guardar la firma de cierre diario.' };
  }
}

export async function closePermitByAnyUser(
  permitId: string,
  user: User,
  observaciones: string,
  signature: string
) {
  if (!permitId || !user || !observaciones || !signature) {
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

    if (!['pendiente_revision', 'aprobado', 'en_ejecucion', 'suspendido'].includes(permitData.status)) {
      return { success: false, error: 'El permiso no puede ser cerrado en su estado actual.' };
    }

    const updateData: UpdateData<Permit> = {
      status: 'cerrado',
      'closure.fechaCierre': FieldValue.serverTimestamp(),
      'closure.terminado': 'si',
      'closure.observacionesCierre': `CIERRE DE EMERGENCIA: ${observaciones}`,
      'closure.cerradoPorUsuario': {
        uid: user.uid,
        nombre: user.displayName || 'Usuario',
        rol: user.role || 'N/A',
        fecha: FieldValue.serverTimestamp(),
        firma: signature,
      }
    };

    await docRef.update(updateData);

    const updatedPermitData = { ...permitData, ...updateData, id: permitId } as Permit;
    const message = `${user.displayName || 'Un usuario'} ha forzado el cierre del permiso #${permitData.number}. Observaciones: ${observaciones}`;
    const involvedUsers = await getInvolvedUsers(updatedPermitData);

    for (const uid of involvedUsers) {
      if (uid !== user.uid) {
        await createNotification(uid, updatedPermitData, message, 'cancellation', { uid: user.uid, displayName: user.displayName || null });
      }
    }
    
    // ✅ WHATSAPP: Enviar notificación crítica por WhatsApp
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${permitId}`;
    const whatsappMessage = `*Permiso Cerrado por Emergencia - SGTC* 🔒

📄 *Permiso:* ${permitData.number || 'N/A'}
👤 *Cerrado por:* ${user.displayName || 'N/A'}
🎭 *Rol:* ${user.role || 'N/A'}
📝 *Observaciones:* ${observaciones}

Puede ver los detalles aquí:
${permitUrl}`;

    await sendWhatsAppNotification(whatsappMessage);

    revalidatePath(`/permits/${permitId}`);
    revalidatePath('/permits');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    console.error("❌ Error al cerrar el permiso:", error);
    return { success: false, error: 'No se pudo cerrar el permiso.' };
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
        
        // ✅ CORRECCIÓN: Validación de estado corregida para firma de apertura
        if (signatureType === 'firmaApertura' && !['pendiente_revision', 'aprobado', 'en_ejecucion'].includes(permitData.status)) {
            return { success: false, error: 'Solo se puede firmar apertura cuando el permiso está pendiente, aprobado o en ejecución.' };
        }
        if (signatureType === 'firmaCierre' && !['en_ejecucion', 'suspendido'].includes(permitData.status)) {
            return { success: false, error: 'Solo se puede firmar cierre en permisos EN EJECUCIÓN o SUSPENDIDOS.' };
        }
        
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
    
