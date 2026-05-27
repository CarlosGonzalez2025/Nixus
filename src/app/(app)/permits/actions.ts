'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { SIGNATURE_ROLE_LABELS } from '@/lib/role-config';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoExcavaciones, AnexoIzaje, AnexoATS, PermitGeneralInfo, JustificacionATS, ValidacionDiaria, User, Notification } from '@/types';
import { FieldValue, UpdateData, Timestamp } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { sendGroupEmail } from '@/lib/email';
import { buildPermitEmailHtml } from '@/lib/permit-email-template';
import { sendPushToUser } from '@/lib/push-notifications';
import { config } from 'dotenv';
config();

// ─── Helpers de notificación ──────────────────────────────────────────────────

/**
 * Ejecuta tareas de notificación en lotes de `batchSize` para respetar el límite
 * de Resend (5 req/seg). Cada lote se envía en paralelo; entre lotes hay una pausa.
 */
async function runNotificationBatch(
  tasks: (() => Promise<any>)[],
  batchSize = 4,
  delayMs = 1200
): Promise<void> {
  for (let i = 0; i < tasks.length; i += batchSize) {
    await Promise.allSettled(tasks.slice(i, i + batchSize).map(t => t()));
    if (i + batchSize < tasks.length) {
      await new Promise<void>(r => setTimeout(r, delayMs));
    }
  }
}

// ─── Labels internos reutilizados en mensajes de notificación ─────────────────

const STATUS_LABEL: Record<string, string> = {
  borrador:           'Borrador',
  pendiente_revision: 'Pendiente de Revisión',
  aprobado:           'Aprobado',
  en_ejecucion:       'En Ejecución',
  suspendido:         'Suspendido',
  cerrado:            'Cerrado',
  rechazado:          'Rechazado',
  cancelado:          'Cancelado',
};

// buildPermitEmailHtml se importa desde @/lib/permit-email-template

function getActionErrorMessage(error: unknown, fallback: string) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : fallback;

  if (
    message.includes('Getting metadata from plugin failed') ||
    message.includes('DECODER routines::unsupported')
  ) {
    return 'No se pudo autenticar Firebase Admin. Reinicie el servidor y valide FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL y FIREBASE_PROJECT_ID.';
  }

  return message || fallback;
}

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

  // 3. Usuarios por rol filtrados por empresa Y planta del permiso
  const permitPlant   = permit.generalInfo?.planta?.trim() || '';
  const permitEmpresa = permit.generalInfo?.empresa?.trim() || '';
  const permitPlantLower   = permitPlant.toLowerCase();
  const permitEmpresaLower = permitEmpresa.toLowerCase();

  /**
   * Filtra un snapshot incluyendo solo usuarios cuya empresa Y planta coinciden
   * con las del permiso (case-insensitive).
   * - Si el usuario NO tiene empresa/planta → se incluye siempre (rol global).
   * - Si el permiso NO tiene empresa/planta → se incluyen todos los usuarios del rol.
   */
  const addUsersMatchingPlant = (snap: FirebaseFirestore.QuerySnapshot) => {
    snap.forEach(doc => {
      const data = doc.data();
      if (data.disabled) return;
      if (permitPlant) {
        const userPlant = (data.planta || '').trim().toLowerCase();
        if (userPlant && userPlant !== permitPlantLower) return;
      }
      if (permitEmpresa) {
        const userEmpresa = (data.empresa || '').trim().toLowerCase();
        if (userEmpresa && userEmpresa !== permitEmpresaLower) return;
      }
      userIds.add(doc.id);
    });
  };

  // Autorizantes de la misma planta
  const autorizantesSnap = await adminDb.collection('users').where('role', '==', 'autorizante').get();
  addUsersMatchingPlant(autorizantesSnap);

  // Líderes SST: siempre notificar para que hagan seguimiento a todas las actividades
  // de su planta/empresa, independiente de si el permiso requiere su firma.
  const sstSnap = await adminDb.collection('users').where('role', '==', 'lider_sst').get();
  addUsersMatchingPlant(sstSnap);

  // Mantenimiento / Aislador Competente (solo permisos con control de energía)
  if (permit.controlEnergia || permit.selectedWorkTypes?.energia) {
    const mantenimientoSnap = await adminDb.collection('users').where('role', '==', 'mantenimiento').get();
    addUsersMatchingPlant(mantenimientoSnap);
  }

  // FIX 3B: Coordinador de Alturas (solo si el permiso requiere trabajo en alturas)
  if (permit.trabajoAlturas || permit.selectedWorkTypes?.alturas) {
    const coordSnap = await adminDb.collection('users').where('role', '==', 'coordinador_alturas').get();
    addUsersMatchingPlant(coordSnap);
  }

  // FIX 3B: Supervisor de Espacios Confinados (solo si el permiso lo requiere)
  if (permit.espaciosConfinados || permit.selectedWorkTypes?.confinado) {
    const supSnap = await adminDb.collection('users').where('role', '==', 'supervisor_confinado').get();
    addUsersMatchingPlant(supSnap);
  }

  return Array.from(userIds);
};

/**
 * Devuelve los IDs de los administradores activos de la misma planta del permiso.
 * Admins sin planta asignada se consideran globales y siempre se incluyen.
 * Solo se usa para notificaciones de alta prioridad (permiso EN EJECUCIÓN).
 */
const getAdminUserIds = async (permitPlant?: string): Promise<string[]> => {
  const snap = await adminDb.collection('users').where('role', '==', 'admin').get();
  const permitPlantLower = (permitPlant || '').trim().toLowerCase();
  return snap.docs
    .filter(doc => {
      const data = doc.data();
      if (data.disabled) return false;
      if (permitPlantLower) {
        const adminPlant = (data.planta || '').trim().toLowerCase();
        // Admin con planta diferente → no incluir
        if (adminPlant && adminPlant !== permitPlantLower) return false;
      }
      return true;
    })
    .map(doc => doc.id);
};

/**
 * Devuelve los correos de los usuarios que NO son admin.
 * Los administradores quedan excluidos de todas las notificaciones por email de permisos.
 */
const getEmailsForNonAdminUsers = async (userIds: string[]): Promise<string[]> => {
  if (userIds.length === 0) return [];
  const results = await Promise.all(
    userIds.map(async id => {
      try {
        const doc = await adminDb.collection('users').doc(id).get();
        if (!doc.exists) return null;
        const data = doc.data()!;
        if (data.role === 'admin') return null;
        return (data.email as string) || null;
      } catch {
        return null;
      }
    })
  );
  return results.filter((e): e is string => e !== null);
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
    createdAt: FieldValue.serverTimestamp() as any,
    triggeredBy,
  };
  await adminDb.collection('notifications').add(notification as any);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const permitUrl = `${baseUrl}/permits/${permit.id}`;
  const statusLabel = STATUS_LABEL[permit.status] || permit.status;

  sendPushToUser(userId, {
    title: `SGTC Móvil — ${statusLabel}`,
    body: message,
    url: permitUrl,
  }).catch(err => console.error('[Push] Error enviando notificación push:', err));
};

async function notifyUsers(
  userIds: string[],
  excludeUid: string,
  permit: Permit,
  message: string,
  type: Notification['type'],
  triggeredBy: { uid: string, displayName: string | null }
): Promise<void> {
  const recipients = userIds.filter(uid => uid !== excludeUid);
  if (recipients.length === 0) return;

  await runNotificationBatch(
    recipients.map(uid => () => createNotification(uid, permit, message, type, triggeredBy))
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const permitUrl = `${baseUrl}/permits/${permit.id}`;
  const permitNumber = permit.number || permit.id;
  const statusLabel = STATUS_LABEL[permit.status] || permit.status;
  const emails = await getEmailsForNonAdminUsers(recipients);

  if (emails.length > 0) {
    await sendGroupEmail({
      emails,
      subject: `[SGTC] Permiso ${permitNumber} — ${statusLabel}`,
      html: buildPermitEmailHtml(permit, message, permitUrl),
    });
  }
}

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
  if (permit.controlEnergia || permit.selectedWorkTypes?.energia) selectedTypes.push('Control de Energías');
  if (permit.izajeCargas) selectedTypes.push('Izaje de Cargas');
  if (permit.excavaciones) selectedTypes.push('Excavaciones');
  
  if (selectedTypes.length === 0) {
    if (permit.trabajoGeneral) return 'Trabajo General';
    if ((permit as any).workType && Array.isArray((permit as any).workType)) {
      return (permit as any).workType.map((key: string) => workTypesMap[key] || key).join(', ');
    }
    return 'Trabajo General';
  }
  return selectedTypes.join(', ');
};

const requiresMaintenanceSignature = (permit: Partial<Permit>): boolean =>
  permit.controlEnergia === true || permit.selectedWorkTypes?.energia === true;

const getWorkersWithMissingSocialSecurity = (workers: ExternalWorker[] = []) =>
  workers
    .map((worker, index) => ({
      worker,
      index,
      missing: [
        !worker.eps?.trim() ? 'EPS' : null,
        !worker.arl?.trim() ? 'ARL' : null,
        !worker.pensiones?.trim() ? 'Pensión' : null,
      ].filter((field): field is string => Boolean(field)),
    }))
    .filter(item => item.missing.length > 0);

const getWorkerCountMismatch = (permit: Partial<Permit>): string | null => {
  const expectedAdditionalWorkers = Number.parseInt(permit.generalInfo?.numTrabajadores || '0', 10);
  if (!Number.isFinite(expectedAdditionalWorkers) || expectedAdditionalWorkers < 0) {
    return 'El número de trabajadores no es válido.';
  }

  const actualAdditionalWorkers = Math.max(0, (permit.workers || []).length - 1);
  if (actualAdditionalWorkers !== expectedAdditionalWorkers) {
    return `Ha especificado ${expectedAdditionalWorkers} trabajador(es) adicional(es), pero hay ${actualAdditionalWorkers} registrado(s).`;
  }

  return null;
};

const getStatusText = (status: string) => {
    const statusText: {[key: string]: string} = {
      'borrador': 'Borrador',
      'pendiente_revision': 'Pendiente de Revisión',
      'aprobado': 'Aprobado',
      'en_ejecucion': 'En Ejecución',
      'suspendido': 'Suspendido',
      'cerrado': 'Cerrado',
      'rechazado': 'Rechazado',
      'cancelado': 'Cancelado'
    };
    return statusText[status] || status;
  };

const signatureRoles: { [key: string]: string } = SIGNATURE_ROLE_LABELS;

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
    createdAt: FieldValue.serverTimestamp() as any,
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
    const triggeredBy = { uid: userId, displayName: userDisplayName };

    await notifyUsers(involvedUsers, userId, createdPermit, message, 'creation', triggeredBy);

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
    
    await sendWhatsAppNotification(messageBody);
    
    revalidatePath('/permits');
    revalidatePath('/dashboard');
    
    return { success: true, permitId: docRef.id, permitNumber };
  } catch (error: any) {
    console.error("❌ [Action] Error al crear permiso:", error);
    return { 
      success: false, 
      error: getActionErrorMessage(error, 'Could not create permit. Please try again.')
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
      const docRef = adminDb.collection('permits').doc(draftId);
      const existing = await docRef.get();
      if (!existing.exists) {
        return { success: false, error: 'El borrador no existe.' };
      }
      if (existing.data()?.createdBy !== userId) {
        return { success: false, error: 'No tienes permiso para modificar este borrador.' };
      }
      await docRef.update({ ...permitPayload, updatedAt: FieldValue.serverTimestamp() });
      revalidatePath(`/permits/${draftId}`);
      revalidatePath('/permits');
      return { success: true, permitId: draftId, isUpdate: true };
    } else {
      const payloadWithTimestamp = { ...permitPayload, createdAt: FieldValue.serverTimestamp() };
      const docRef = await adminDb.collection('permits').add(payloadWithTimestamp as any);
      revalidatePath('/permits');
      return { success: true, permitId: docRef.id, isUpdate: false };
    }
  } catch (error: any) {
    console.error("❌ [Action] Error al guardar borrador:", error);
    return { 
      success: false, 
      error: getActionErrorMessage(error, 'Could not save draft. Please try again.')
    };
  }
}

// ─── Helpers para notificación de Mantenimiento/Aislador ─────────────────────

async function getMantenimientoUserIds(permit: Permit): Promise<string[]> {
  const permitPlant   = permit.generalInfo?.planta?.trim().toLowerCase() || '';
  const permitEmpresa = permit.generalInfo?.empresa?.trim().toLowerCase() || '';
  const snap = await adminDb.collection('users').where('role', '==', 'mantenimiento').get();
  const ids: string[] = [];
  snap.forEach(doc => {
    const data = doc.data();
    if (data.disabled) return;
    if (permitPlant) {
      const userPlant   = (data.planta   || '').trim().toLowerCase();
      const userEmpresa = (data.empresa  || '').trim().toLowerCase();
      if (
        (!userPlant   || userPlant   === permitPlant) &&
        (!userEmpresa || !permitEmpresa || userEmpresa === permitEmpresa)
      ) ids.push(doc.id);
    } else {
      ids.push(doc.id);
    }
  });
  return ids;
}

async function notifyMantenimientoIfRequired(
  permit: Permit,
  triggeredBy: { uid: string; displayName: string | null },
  permitUrl: string
): Promise<void> {
  if (!requiresMaintenanceSignature(permit)) return;
  if (permit.approvals?.mantenimiento?.status === 'aprobado') return;

  const mantenimientoIds = await getMantenimientoUserIds(permit);
  if (mantenimientoIds.length === 0) return;

  const msg = `Se requiere tu firma como <strong>Mantenimiento / Aislador Competente</strong> en el permiso <strong>#${permit.number}</strong>. El ejecutante <strong>${triggeredBy.displayName || 'N/A'}</strong> ha completado su firma y el permiso está esperando tu autorización para continuar.`;

  await runNotificationBatch(
    mantenimientoIds
      .filter(id => id !== triggeredBy.uid)
      .map(id => () => createNotification(id, permit, msg, 'signature', triggeredBy))
  );

  const emails = await getEmailsForNonAdminUsers(mantenimientoIds);
  if (emails.length > 0) {
    await sendGroupEmail({
      emails,
      subject: `[SGTC] Firma requerida — Mantenimiento/Aislador — Permiso #${permit.number}`,
      html: buildPermitEmailHtml(permit, msg, permitUrl),
    });
  }
}

// ─── Helper: notificar al Autorizante cuando el Responsable firma el cierre ───

async function notifyAutorizanteForClosure(
  permit: Permit,
  triggeredBy: { uid: string; displayName: string | null },
  permitUrl: string
): Promise<void> {
  // Si la autoridad ya firmó el cierre, no hay nada que notificar
  if (permit.closure?.autoridad?.firma) return;

  const autorizanteId = permit.approvals?.autorizante?.userId;
  if (!autorizanteId || autorizanteId === triggeredBy.uid) return;

  const msg = `Se requiere tu firma como <strong>Autoridad del Área</strong> para cerrar el permiso <strong>#${permit.number}</strong>. El responsable del trabajo <strong>${triggeredBy.displayName || 'N/A'}</strong> ha completado la firma de cierre y está pendiente tu autorización.`;

  await createNotification(autorizanteId, permit, msg, 'signature', triggeredBy);

  const emails = await getEmailsForNonAdminUsers([autorizanteId]);
  if (emails.length > 0) {
    await sendGroupEmail({
      emails,
      subject: `[SGTC] Firma de cierre requerida — Autoridad del Área — Permiso #${permit.number}`,
      html: buildPermitEmailHtml(permit, msg, permitUrl),
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────

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

        if (role.startsWith('cierre_') || role === 'cancelacion') {
            // Validar que el permiso esté en un estado que permita firmas de cierre
            if (role.startsWith('cierre_')) {
                if (permitBeforeData.status !== 'en_ejecucion' && permitBeforeData.status !== 'suspendido') {
                    return { success: false, error: 'Solo se pueden agregar firmas de cierre a permisos que estén En Ejecución o Suspendidos.' };
                }
            }

            const closureRole = role === 'cierre_autoridad' ? 'autoridad' : (role === 'cierre_responsable' ? 'responsable' : 'canceladoPor');
            const closurePath = `closure.${closureRole}`;
            
            const existingClosureData = (permitBeforeData.closure as any)?.[closureRole] || {};

            (updateData as any)[closurePath] = {
                ...existingClosureData,
                firma: signatureDataUrl,
                nombre: user.displayName,
                fecha: FieldValue.serverTimestamp() 
            };
            
            if (role === 'cancelacion') {
                updateData['closure.razonCancelacion'] = comments || 'No especificado';
                updateData['closure.cancelado'] = 'si';
            }

            await docRef.update(updateData);

            // Notificar al Autorizante cuando el Responsable firma el cierre
            if (role === 'cierre_responsable') {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
                const permitUrl = `${baseUrl}/permits/${permitId}`;
                await notifyAutorizanteForClosure(
                    { ...permitBeforeData, id: permitId },
                    user,
                    permitUrl
                );
            }
        } else {
            const canSign = await validateSignaturePermission(permitId, role, user);
            if (!canSign.allowed) {
                return { success: false, error: canSign.reason };
            }

            if (role === 'solicitante') {
                const workersForValidation = [...(permitBeforeData.workers || [])];
                if (workersForValidation[0] && !workersForValidation[0].firmaApertura) {
                    workersForValidation[0] = { ...workersForValidation[0], firmaApertura: signatureDataUrl };
                }
                const workersWithoutOpeningSignature = workersForValidation.filter(worker => !worker.firmaApertura);
                const missingSignatureCount = !workersForValidation[0]?.firmaApertura
                    ? Math.max(1, workersWithoutOpeningSignature.length)
                    : workersWithoutOpeningSignature.length;
                if (missingSignatureCount > 0) {
                    return {
                        success: false,
                        error: `No se puede enviar el permiso: faltan ${missingSignatureCount} firma(s) de apertura del personal autorizado.`,
                    };
                }

                const workerCountMismatch = getWorkerCountMismatch({ ...permitBeforeData, workers: workersForValidation });
                if (workerCountMismatch) {
                    return {
                        success: false,
                        error: `No se puede enviar el permiso: ${workerCountMismatch}`,
                    };
                }

                const workersWithMissingSocialSecurity = getWorkersWithMissingSocialSecurity(workersForValidation);
                if (workersWithMissingSocialSecurity.length > 0) {
                    const first = workersWithMissingSocialSecurity[0];
                    return {
                        success: false,
                        error: `No se puede enviar el permiso: ${first.worker.nombre || `Trabajador ${first.index + 1}`} tiene pendiente ${first.missing.join(', ')}.`,
                    };
                }
            }

            const newApprovalEntry = {
                status: 'aprobado',
                firmaApertura: signatureDataUrl,
                userName: user.displayName,
                userId: user.uid,
                signedAt: FieldValue.serverTimestamp() as any,
                userRole: user.role,
                userEmpresa: user.empresa || 'N/A',
                comments: comments || '',
            } as unknown as Partial<Approval>;
            
            (updateData as any)[`approvals.${role}`] = newApprovalEntry;

            if (role === 'solicitante') {
                const workers = [...(permitBeforeData.workers || [])];
                if (workers[0] && !workers[0].firmaApertura) {
                    workers[0] = { ...workers[0], firmaApertura: signatureDataUrl };
                    (updateData as any).workers = workers;
                }

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
                            (updateData as any)[`${anexo}.validacion.responsable`] = currentValidations;
                        }
                    }
                });

                await docRef.update(updateData);
                
                const updatedPermitAfterSign = (await docRef.get()).data() as Permit;
                
                if ((updatedPermitAfterSign.trabajoAlturas || updatedPermitAfterSign.selectedWorkTypes?.alturas) && updatedPermitAfterSign.approvals?.coordinador_alturas?.status !== 'aprobado') {
                    return { success: false, error: 'Se requiere primero la firma del Coordinador Alturas.' };
                }
                if ((updatedPermitAfterSign.espaciosConfinados || updatedPermitAfterSign.selectedWorkTypes?.confinado) && updatedPermitAfterSign.approvals?.supervisor_confinado?.status !== 'aprobado') {
                    return { success: false, error: 'Se requiere primero la firma del Supervisor Esp. Confinado.' };
                }

                if (updatedPermitAfterSign.status === 'borrador') {
                    const permitNumber = `PT-${Date.now()}-${permitId.substring(0, 6).toUpperCase()}`;
                    await docRef.update({
                        number: permitNumber,
                        status: 'pendiente_revision'
                    });
                }
            } else {
                await docRef.update(updateData);

                // Auto-transición: si todas las firmas requeridas están completas,
                // avanzar automáticamente de 'pendiente_revision' → 'en_ejecucion' (saltando 'aprobado')
                const permitAfterSign = (await docRef.get()).data() as Permit;
                if (permitAfterSign.status === 'pendiente_revision') {
                    const allComplete = await checkAllRequiredSignaturesComplete(permitAfterSign);
                    if (allComplete) {
                        await docRef.update({ status: 'en_ejecucion' });
                    }
                }
            }
        }

        const permitDoc = await docRef.get();
        const updatedPermitData = { id: permitDoc.id, ...permitDoc.data() } as Permit;

        if (permitBeforeData.status === 'borrador' && updatedPermitData.status === 'pendiente_revision') {
            const message = `El permiso #${updatedPermitData.number} ha sido enviado y está pendiente de revisión.`;
            const involvedUsers = await getInvolvedUsers(updatedPermitData);
            await notifyUsers(involvedUsers, user.uid, updatedPermitData, message, 'creation', user);
            const workTypesText = getWorkTypesString(updatedPermitData);
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
            const permitUrl = `${baseUrl}/permits/${permitId}`;
            await notifyMantenimientoIfRequired(updatedPermitData, user, permitUrl);
            const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha enviado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${updatedPermitData.number}
👤 *Solicitante:* ${updatedPermitData.user?.displayName || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud:
${permitUrl}`;
            await sendWhatsAppNotification(messageBody);

        } else if (role !== 'solicitante' && permitBeforeData.status === 'borrador' && updatedPermitData.approvals?.solicitante?.status === 'aprobado') {
            const allPrereqsMet =
                (!updatedPermitData.trabajoAlturas || updatedPermitData.approvals?.coordinador_alturas?.status === 'aprobado') &&
                (!updatedPermitData.espaciosConfinados || updatedPermitData.approvals?.supervisor_confinado?.status === 'aprobado');

            if (allPrereqsMet) {
                const permitNumber = `PT-${Date.now()}-${permitId.substring(0, 6).toUpperCase()}`;
                await docRef.update({ number: permitNumber, status: 'pendiente_revision' });

                updatedPermitData.number = permitNumber;
                updatedPermitData.status = 'pendiente_revision';

                const reviewMessage = `El permiso #${permitNumber} ha sido enviado y está pendiente de revisión.`;
                const involvedUsers = await getInvolvedUsers(updatedPermitData);
                await notifyUsers(involvedUsers, user.uid, updatedPermitData, reviewMessage, 'creation', user);

                const workTypesText = getWorkTypesString(updatedPermitData);
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
                const permitUrl = `${baseUrl}/permits/${permitId}`;
                await notifyMantenimientoIfRequired(updatedPermitData, user, permitUrl);
                const whatsappMessage = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha enviado un nuevo permiso para su revisión.

📄 *Número:* ${permitNumber}
👤 *Solicitante:* ${updatedPermitData.user?.displayName || 'N/A'}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud:
${permitUrl}`;
                await sendWhatsAppNotification(whatsappMessage);
            }

        } else if (!role.startsWith('cierre_') && role !== 'cancelacion') {
            const autoActivated = updatedPermitData.status === 'en_ejecucion' && permitBeforeData.status === 'pendiente_revision';
            const involvedUsers = await getInvolvedUsers(updatedPermitData);

            if (autoActivated) {
                const adminIds = await getAdminUserIds(updatedPermitData.generalInfo?.planta);
                const recipientsEnEjecucion = [...new Set([...involvedUsers, ...adminIds])];
                const approvalMessage = `¡El permiso #${updatedPermitData.number} está EN EJECUCIÓN! ${user.displayName || 'Un usuario'} completó la última firma requerida y el permiso fue activado automáticamente.`;
                await notifyUsers(recipientsEnEjecucion, user.uid, updatedPermitData, approvalMessage, 'approval', user);
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
                const permitUrl = `${baseUrl}/permits/${permitId}`;
                const workTypesText = getWorkTypesString(updatedPermitData);
                await sendWhatsAppNotification(`*🟢 Permiso EN EJECUCIÓN* 🎉\n\nTodas las firmas requeridas han sido registradas. El permiso fue activado automáticamente.\n\n📄 *Número:* ${updatedPermitData.number}\n👤 *Solicitante:* ${updatedPermitData.user?.displayName || 'N/A'}\n🛠️ *Tipo de Trabajo:* ${workTypesText}\n\nVer permiso:\n${permitUrl}`);
            } else {
                const signatureRoleName = (signatureRoles as any)[role] || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                const message = `${user.displayName || 'Un usuario'} ha firmado el permiso #${updatedPermitData.number} como ${signatureRoleName}.`;
                await notifyUsers(involvedUsers, user.uid, updatedPermitData, message, 'signature', user);
            }
        }

        revalidatePath(`/permits/${permitId}`);
        return { success: true, permitId };

    } catch (error: any) {
        console.error("❌ Error al guardar firma y notificar:", error);
        return {
            success: false,
            error: getActionErrorMessage(error, 'No se pudo guardar la firma.')
        };
    }
}


// ✅ FUNCIÓN CORREGIDA: Verificar si todas las firmas requeridas están completas
async function checkAllRequiredSignaturesComplete(
  permitData: Permit
): Promise<boolean> {
    const { approvals } = permitData;
    
    if (approvals?.solicitante?.status !== 'aprobado') {
        return false;
    }
    
    if (approvals?.autorizante?.status !== 'aprobado') {
        return false;
    }
    
    if (permitData.trabajoAlturas || permitData.selectedWorkTypes?.alturas) {
        if (approvals?.coordinador_alturas?.status !== 'aprobado') {
            return false;
        }
    }
    
    if (permitData.espaciosConfinados || permitData.selectedWorkTypes?.confinado) {
        if (approvals?.supervisor_confinado?.status !== 'aprobado') {
            return false;
        }
    }
    
    if (requiresMaintenanceSignature(permitData)) {
        if (approvals?.mantenimiento?.status !== 'aprobado') {
            return false;
        }
    }
    
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
            'pendiente_revision': ['solicitante', 'admin']
        },
        'pendiente_revision': {
            'en_ejecucion': ['autorizante', 'admin', 'solicitante', 'lider_regional'],
            'aprobado': ['autorizante', 'admin', 'lider_regional'],
            'rechazado': ['autorizante', 'lider_sst', 'admin', 'lider_regional'],
            'cancelado': ['autorizante', 'lider_sst', 'admin', 'lider_regional']
        },
        'aprobado': {
            'en_ejecucion': ['solicitante', 'admin', 'lider_regional'],
            'cancelado': ['autorizante', 'lider_sst', 'admin', 'lider_regional']
        },
        'en_ejecucion': {
            'suspendido': ['lider_sst', 'admin', 'autorizante', 'lider_regional'],
            'cerrado': ['solicitante', 'admin', 'autorizante', 'lider_regional'],
            'cancelado': ['autorizante', 'lider_sst', 'admin', 'lider_regional']
        },
        'suspendido': {
            'en_ejecucion': ['lider_sst', 'admin', 'autorizante', 'lider_regional'],
            'cerrado': ['solicitante', 'admin', 'autorizante', 'lider_regional'],
            'cancelado': ['autorizante', 'lider_sst', 'admin', 'lider_regional']
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

        // Validar que todas las firmas requeridas existan antes de pasar a en_ejecucion desde pendiente_revision
        if (status === 'en_ejecucion' && permitData.status === 'pendiente_revision') {
            const allComplete = await checkAllRequiredSignaturesComplete(permitData);
            if (!allComplete) {
                return {
                    success: false,
                    error: 'No se puede activar el permiso: faltan firmas de autorización requeridas (Ejecutante del trabajo, Autorizante, y/o firmas especiales según el tipo de trabajo).',
                };
            }
        }

        const updateData: UpdateData<Permit> = { status };

        if ((status === 'rechazado' || status === 'cancelado') && reason) {
            updateData.rejectionReason = reason;
        }

        if (status === 'suspendido') {
            if (!reason?.trim()) {
                return { success: false, error: 'Debe especificar el motivo de la suspensión.' };
            }
            (updateData as any).suspension = {
                suspendedBy: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    role: currentUser.role,
                },
                suspendedAt: FieldValue.serverTimestamp(),
                reason: reason.trim(),
            };
        }
        
        if (status === 'cerrado') {
            // Validar que las firmas de cierre requeridas existan
            if (!permitData.closure?.responsable?.firma) {
                return { success: false, error: 'No se puede cerrar el permiso: falta la firma de cierre del Responsable del Trabajo.' };
            }
            if (!permitData.closure?.autoridad?.firma) {
                return { success: false, error: 'No se puede cerrar el permiso: falta la firma de cierre de la Autoridad del Área.' };
            }
            const workersWithoutCierre = (permitData.workers || []).filter((w: any) => !w.firmaCierre);
            if (workersWithoutCierre.length > 0) {
                return { success: false, error: `No se puede cerrar el permiso: faltan firmas de cierre de ${workersWithoutCierre.length} trabajador(es).` };
            }

            updateData['closure.fechaCierre'] = FieldValue.serverTimestamp();
            updateData['closure.terminado'] = 'si';
        }

        await docRef.update(updateData);
        
        const updatedPermitData = { ...permitData, ...updateData, id: permitId } as Permit;
        const triggeredBy = currentUser;
        
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
            case 'cancelado':
                notificationType = 'cancellation';
                message = `El permiso #${permitData.number} ha sido CANCELADO.`;
                if (reason) message += ` Motivo: ${reason}`;
                break;
            case 'cerrado':
                notificationType = 'cancellation';
                message = `El permiso #${permitData.number} ha sido CERRADO exitosamente.`;
                break;
            case 'suspendido':
                notificationType = 'status_change';
                message = `Alerta: El permiso #${permitData.number} ha sido <strong>SUSPENDIDO</strong> por ${currentUser.displayName || 'un usuario'}.${reason ? ` Motivo: <em>${reason}</em>` : ''}`;
                break;
        }
        
        const involvedUsers = await getInvolvedUsers(updatedPermitData);
        // Los admins solo reciben notificación cuando el permiso pasa a EN EJECUCIÓN,
        // filtrados por la planta del permiso.
        const recipients = status === 'en_ejecucion'
            ? [...new Set([...involvedUsers, ...(await getAdminUserIds(updatedPermitData.generalInfo?.planta))])]
            : involvedUsers;
        await notifyUsers(recipients, currentUser.uid, updatedPermitData, message, notificationType, triggeredBy);

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
    
    if (!['borrador', 'pendiente_revision'].includes(permit.status)) {
        return { allowed: false, reason: `No se puede firmar un permiso en estado '${permit.status}'.` };
    }
    
    switch (signatureRole) {
        case 'coordinador_alturas':
            if (!permit.trabajoAlturas && !permit.selectedWorkTypes?.alturas) {
                return { allowed: false, reason: 'Esta firma solo aplica para trabajos en alturas.' };
            }
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede gestionar esta firma.' };
            }
            break;
            
        case 'supervisor_confinado':
            if (!permit.espaciosConfinados && !permit.selectedWorkTypes?.confinado) {
                return { allowed: false, reason: 'Esta firma solo aplica para trabajos en espacios confinados.' };
            }
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede gestionar esta firma.' };
            }
            break;

        case 'solicitante':
            if (permit.createdBy !== currentUser.uid && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Solo el creador del permiso puede firmar.' };
            }
            break;
            
        case 'lider_sst':
            if (currentUser.role !== 'lider_sst' && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Rol de Líder SST requerido para esta firma.' };
            }
            if (!permit.isSSTSignatureRequired) {
                return { allowed: false, reason: 'Firma de Líder SST no es requerida para este permiso.' };
            }
            if (permit.approvals?.solicitante?.status !== 'aprobado') {
                return { allowed: false, reason: 'Se requiere primero la firma del solicitante.' };
            }
            break;
            
        case 'mantenimiento':
             if (currentUser.role !== 'mantenimiento' && currentUser.role !== 'admin') {
                return { allowed: false, reason: 'Rol de Mantenimiento requerido para esta firma.' };
            }
            if (!requiresMaintenanceSignature(permit)) {
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
            if (requiresMaintenanceSignature(permit) && permit.approvals?.mantenimiento?.status !== 'aprobado') {
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

    if (!['en_ejecucion', 'suspendido'].includes(permitData.status)) {
        return { success: false, error: 'Solo se pueden agregar validaciones diarias en permisos EN EJECUCIÓN o SUSPENDIDOS.' };
    }

    const anexoData = (permitData as any)[anexoName];
    if (!anexoData) {
      return { success: false, error: `El anexo ${anexoName} no existe en el permiso.` };
    }

    // Validar que el día anterior esté completo antes de permitir firmar el día actual.
    // Aplica a todos los anexos (genérico via anexoName).
    if (index > 0) {
      const prevResponsable = (anexoData.validacion?.responsable as ValidacionDiaria[])?.[index - 1];
      const prevAutoridad   = (anexoData.validacion?.autoridad   as ValidacionDiaria[])?.[index - 1];

      if (validationType === 'responsable') {
        if (!prevResponsable?.firma) {
          return { success: false, error: `Debe completar la firma del Día ${index} antes de registrar el Día ${index + 1}.` };
        }
        if (!prevResponsable?.firmaCierre) {
          return { success: false, error: `Debe completar la firma de cierre del Día ${index} antes de registrar el Día ${index + 1}.` };
        }
      }

      if (validationType === 'autoridad') {
        if (!prevAutoridad?.firma) {
          return { success: false, error: `Debe completar la firma de la Autoridad del Día ${index} antes de registrar el Día ${index + 1}.` };
        }
      }
    }

    const anexoUpdate: any = { ...anexoData };
    if (!anexoUpdate.validacion) {
        anexoUpdate.validacion = { autoridad: [], responsable: [] };
    }

    const validationArray = (anexoUpdate.validacion[validationType] as ValidacionDiaria[]) || [];
    
    while (validationArray.length <= index) {
        validationArray.push({ dia: validationArray.length + 1, nombre: '', firma: '', fecha: '' });
    }

    validationArray[index] = data;
    
    const updatePath = `${anexoName}.validacion.${validationType}`;
    
    await docRef.update({
      [updatePath]: validationArray,
    });

    const { id: _id1, ...permitDataWithoutId1 } = permitData as any;
    const fullPermitData = { id: docRef.id, ...permitDataWithoutId1 } as Permit;
    const anexoDisplayName = anexoName.replace('anexo', 'Anexo ');
    const validationRoleName = validationType === 'autoridad' ? 'Autoridad del Área' : 'Responsable del Trabajo';
    const day = index + 1;

    const message = `${user.displayName || 'Un usuario'} ha realizado la validación diaria (${validationRoleName}) para el DÍA ${day} del ${anexoDisplayName} en el permiso #${fullPermitData.number}.`;
    const involvedUsers = await getInvolvedUsers(fullPermitData);
    await notifyUsers(involvedUsers, user.uid, fullPermitData, message, 'status_change', { uid: user.uid, displayName: user.displayName || null });

    revalidatePath(`/permits/${permitId}`);
    return { success: true };

  } catch (error: any) {
    console.error("❌ Error al guardar la validación diaria:", error);
    return { success: false, error: 'No se pudo guardar la firma de validación.' };
  }
}

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
      validationArray.push({ dia: validationArray.length + 1, nombre: '', firma: '', fecha: '' });
    }

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

    const { id: _id2, ...permitDataWithoutId2 } = permitData as any;
    const fullPermitData = { id: docRef.id, ...permitDataWithoutId2 } as Permit;
    const anexoDisplayName = anexoName.replace('anexo', 'Anexo ');
    const day = index + 1;

    const message = `${user.displayName || 'Un usuario'} ha registrado el cierre diario del DÍA ${day} en ${anexoDisplayName} del permiso #${fullPermitData.number}.${data.observaciones ? ` Observaciones: ${data.observaciones}` : ''}`;

    const involvedUsers = await getInvolvedUsers(fullPermitData);
    await notifyUsers(involvedUsers, user.uid, fullPermitData, message, 'status_change', { uid: user.uid, displayName: user.displayName || null });

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

    await notifyUsers(involvedUsers, user.uid, updatedPermitData, message, 'cancellation', { uid: user.uid, displayName: user.displayName || null });
    
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
        
        if (signatureType === 'firmaApertura' && !['pendiente_revision', 'aprobado', 'en_ejecucion', 'borrador'].includes(permitData.status)) {
            return { success: false, error: 'Solo se puede firmar apertura cuando el permiso está pendiente, aprobado, en ejecución o en borrador.' };
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

// ─── Sincronización offline ────────────────────────────────────────────────────

type OfflineQueueItem = {
  permitId: string;
  message: string;
  type: 'permit_created' | 'permit_signed' | 'status_changed';
  triggeredBy: { uid: string; displayName: string | null };
};

/**
 * Procesa la cola de notificaciones generadas mientras el dispositivo estaba offline.
 * Se llama desde el hook useOfflineSync cuando el dispositivo recupera la conexión.
 *
 * Para cada entrada:
 * 1. Lee el permiso actualizado de Firestore (ya sincronizado por el SDK del cliente).
 * 2. Obtiene los usuarios involucrados según la planta y los tipos de trabajo.
 * 3. Envía las notificaciones in-app y por email.
 * 4. Elimina la marca offlinePendingSync del documento.
 */
export async function processOfflineQueue(
  items: OfflineQueueItem[]
): Promise<{ success: boolean; error?: string }> {
  if (!isAdminReady()) {
    return { success: false, error: 'Servidor no disponible para procesar sincronización.' };
  }

  try {
    for (const item of items) {
      const docRef = adminDb.collection('permits').doc(item.permitId);
      const snap = await docRef.get();
      if (!snap.exists) continue;

      const permit = { id: snap.id, ...snap.data() } as Permit;
      const involvedUsers = await getInvolvedUsers(permit);
      const triggeredBy = item.triggeredBy;

      const notifType: Notification['type'] =
        item.type === 'permit_created' ? 'creation'
        : item.type === 'permit_signed' ? 'signature'
        : 'status_change';

      await notifyUsers(involvedUsers, triggeredBy.uid, permit, item.message, notifType, triggeredBy);

      // Quitar la marca de sincronización pendiente
      await docRef.update({ offlinePendingSync: false });
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ [processOfflineQueue] Error:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Error al procesar la cola offline.'),
    };
  }
}

export async function deletePermit(
  permitId: string,
  currentUser: { uid: string; role: UserRole }
) {
  if (!permitId || !currentUser.uid) {
    return { success: false, error: 'Parámetros inválidos.' };
  }
  if (!isAdminReady()) {
    return { success: false, error: 'Credenciales de administrador no configuradas.' };
  }

  try {
    const docRef = adminDb.collection('permits').doc(permitId);
    const snap = await docRef.get();

    if (!snap.exists) {
      return { success: false, error: 'El permiso no existe.' };
    }

    const permitData = snap.data() as Permit;

    if (permitData.status !== 'borrador') {
      return { success: false, error: 'Solo se pueden eliminar permisos en estado Borrador.' };
    }

    const isAdminOrLR = currentUser.role === 'admin' || currentUser.role === 'lider_regional';
    const isOwner = permitData.createdBy === currentUser.uid;

    if (!isAdminOrLR && !isOwner) {
      return { success: false, error: 'No tienes permiso para eliminar este permiso.' };
    }

    await docRef.delete();
    revalidatePath('/permits');
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: getActionErrorMessage(error, 'Error al eliminar el permiso.'),
    };
  }
}
