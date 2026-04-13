'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { SIGNATURE_ROLE_LABELS } from '@/lib/role-config';
import { revalidatePath } from 'next/cache';
import type { Permit, ExternalWorker, PermitStatus, PermitClosure, Approval, UserRole, AnexoAltura, AnexoConfinado, AnexoEnergias, AnexoExcavaciones, AnexoIzaje, AnexoATS, PermitGeneralInfo, JustificacionATS, ValidacionDiaria, User, Notification } from '@/types';
import { FieldValue, UpdateData, Timestamp } from 'firebase-admin/firestore';
import { sendWhatsAppNotification } from '@/lib/notifications';
import { getEmailForUser, sendPermitUpdateEmail } from '@/lib/email';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { config } from 'dotenv';
config();

// ─── Helpers para la plantilla de correo ─────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  borrador:           'Borrador',
  pendiente_revision: 'Pendiente de Revisión',
  aprobado:           'Aprobado',
  en_ejecucion:       'En Ejecución',
  suspendido:         'Suspendido',
  cerrado:            'Cerrado',
  rechazado:          'Rechazado',
};

const STATUS_COLOR: Record<string, string> = {
  borrador:           '#6b7280',
  pendiente_revision: '#d97706',
  aprobado:           '#16a34a',
  en_ejecucion:       '#7c3aed',
  suspendido:         '#ea580c',
  cerrado:            '#2563eb',
  rechazado:          '#dc2626',
};

const WORK_TYPE_LABELS: Record<string, string> = {
  alturas:   'Trabajo en Alturas',
  confinado: 'Espacios Confinados',
  energia:   'Control de Energías',
  izaje:     'Izaje de Cargas',
  excavacion:'Excavaciones',
  general:   'Trabajo General',
};

const safeFormatDate = (value: any): string => {
  try {
    if (!value) return '—';
    const d = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
    return format(d, "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
  } catch {
    return '—';
  }
};

function buildPermitEmailHtml(permit: Permit, message: string, permitUrl: string): string {
  const statusLabel = STATUS_LABEL[permit.status] || permit.status;
  const statusColor = STATUS_COLOR[permit.status] || '#6b7280';
  const permitNumber = permit.number || `ID: ${permit.id?.substring(0, 8)}`;

  const empresa      = permit.generalInfo?.empresa      || '—';
  const planta       = permit.generalInfo?.planta       || '—';
  const ciudad       = permit.generalInfo?.ciudad       || '—';
  const area         = permit.generalInfo?.areaEspecifica || '—';
  const solicitante  = permit.generalInfo?.nombreSolicitante || permit.user?.displayName || '—';
  const validFrom    = safeFormatDate(permit.generalInfo?.validFrom);
  const validUntil   = safeFormatDate(permit.generalInfo?.validUntil);

  const workTypes = Object.entries(permit.selectedWorkTypes || {})
    .filter(([, v]) => v)
    .map(([k]) => WORK_TYPE_LABELS[k] || k)
    .join(' &nbsp;|&nbsp; ') || 'Trabajo General';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Permiso de Trabajo — ${permitNumber}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:28px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.10);">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a 0%,#3062C8 100%);padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:rgba(255,255,255,0.75);font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.2px;">
                      Sistema de Gestión de Permisos de Trabajo
                    </p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:bold;line-height:1.3;">
                      📋 Actualización de Permiso de Trabajo
                    </h1>
                  </td>
                  <td align="right" style="padding-left:16px;white-space:nowrap;">
                    <div style="background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.35);border-radius:8px;padding:8px 16px;text-align:center;">
                      <p style="margin:0;color:rgba(255,255,255,0.75);font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">Permiso</p>
                      <p style="margin:2px 0 0;color:#ffffff;font-size:18px;font-weight:bold;">${permitNumber}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Estado ── -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${statusColor};color:#ffffff;border-radius:20px;padding:5px 18px;font-size:12px;font-weight:bold;letter-spacing:0.5px;">
                    ${statusLabel}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Mensaje de notificación ── -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#eff6ff;border-left:4px solid #3062C8;border-radius:4px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:13px;color:#1e3a8a;line-height:1.6;font-weight:500;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Tipos de trabajo ── -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 16px;font-size:11px;font-weight:bold;color:#64748b;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #e2e8f0;">
                    🔧 Tipos de Trabajo
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:13px;color:#1e293b;font-weight:500;">${workTypes}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Información del permiso ── -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 16px;font-size:11px;font-weight:bold;color:#64748b;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid #e2e8f0;" colspan="2">
                    📍 Información del Permiso
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;width:50%;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Empresa</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${empresa}</span>
                  </td>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;width:50%;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Planta</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${planta}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Ciudad</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${ciudad}</span>
                  </td>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Área / Equipo</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${area}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Ejecutante del Trabajo</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${solicitante}</span>
                  </td>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;border-bottom:1px solid #f1f5f9;vertical-align:top;">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Inicio</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${validFrom}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:12px;color:#374151;vertical-align:top;" colspan="2">
                    <span style="font-weight:bold;color:#64748b;font-size:11px;text-transform:uppercase;">Vence</span><br/>
                    <span style="font-size:13px;color:#1e293b;">${validUntil}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td style="padding:28px 32px;" align="center">
              <a href="${permitUrl}"
                 style="background:#3062C8;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:bold;display:inline-block;letter-spacing:0.3px;">
                Ver Permiso de Trabajo →
              </a>
              <p style="margin:14px 0 0;font-size:11px;color:#94a3b8;text-align:center;">
                Acceda con sus credenciales para revisar, firmar o gestionar el permiso.
              </p>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6;">
                Este mensaje fue generado automáticamente por el <strong>Sistema de Gestión de Permisos de Trabajo (SGTC)</strong>.<br/>
                Por favor no responda a este correo directamente.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

  // 3. Usuarios por rol filtrados por planta del permiso
  const permitPlant = permit.generalInfo?.planta;

  // Buscar Autorizantes de la misma planta
  let autorizantesQuery = adminDb.collection('users').where('role', '==', 'autorizante');
  if (permitPlant) {
    autorizantesQuery = autorizantesQuery.where('planta', '==', permitPlant);
  }
  const autorizantesSnap = await autorizantesQuery.get();
  autorizantesSnap.forEach(doc => userIds.add(doc.id));

  // Buscar Líderes SST de la misma planta (solo si el permiso los requiere)
  if (permit.isSSTSignatureRequired || permit.trabajoAlturas || permit.espaciosConfinados || permit.controlEnergia || permit.izajeCargas || permit.excavaciones) {
    let sstQuery = adminDb.collection('users').where('role', '==', 'lider_sst');
    if (permitPlant) {
      sstQuery = sstQuery.where('planta', '==', permitPlant);
    }
    const sstSnap = await sstQuery.get();
    sstSnap.forEach(doc => userIds.add(doc.id));
  }

  // Buscar Mantenimiento / Aislador Competente de la misma planta (solo permisos con control de energía)
  if (permit.controlEnergia || permit.selectedWorkTypes?.energia) {
    let mantenimientoQuery = adminDb.collection('users').where('role', '==', 'mantenimiento');
    if (permitPlant) {
      mantenimientoQuery = mantenimientoQuery.where('planta', '==', permitPlant);
    }
    const mantenimientoSnap = await mantenimientoQuery.get();
    mantenimientoSnap.forEach(doc => userIds.add(doc.id));
  }

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
  
  // Enviar correo electrónico con plantilla profesional
  const userEmail = await getEmailForUser(userId);
  if (userEmail) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
    const permitUrl = `${baseUrl}/permits/${permit.id}`;
    const permitNumber = permit.number || permit.id;
    const statusLabel = STATUS_LABEL[permit.status] || permit.status;
    await sendPermitUpdateEmail({
      to: userEmail,
      subject: `[SGTC] Permiso ${permitNumber} — ${statusLabel}`,
      html: buildPermitEmailHtml(permit, message, permitUrl),
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

            if (role === 'solicitante') {
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
            for (const uid of involvedUsers) {
                if (uid !== user.uid) {
                    await createNotification(uid, updatedPermitData, message, 'creation', user);
                }
            }
             const workTypesText = getWorkTypesString(updatedPermitData);
             const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
             const permitUrl = `${baseUrl}/permits/${permitId}`;
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
                for (const uid of involvedUsers) {
                    if (uid !== user.uid) {
                        await createNotification(uid, updatedPermitData, reviewMessage, 'creation', user);
                    }
                }

                const workTypesText = getWorkTypesString(updatedPermitData);
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
                const permitUrl = `${baseUrl}/permits/${permitId}`;
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
            const signatureRoleName = (signatureRoles as any)[role] || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const message = `${user.displayName || 'Un usuario'} ha firmado el permiso #${updatedPermitData.number} como ${signatureRoleName}.`;
            const involvedUsers = await getInvolvedUsers(updatedPermitData);
            for (const uid of involvedUsers) {
                if (uid !== user.uid) {
                    await createNotification(uid, updatedPermitData, message, 'signature', user);
                }
            }

            // Si el permiso acaba de pasar a 'en_ejecucion' automáticamente, notificar
            if (updatedPermitData.status === 'en_ejecucion' && permitBeforeData.status === 'pendiente_revision') {
                const approvalMessage = `¡El permiso #${updatedPermitData.number} está EN EJECUCIÓN! Todas las firmas requeridas fueron completadas y el permiso fue activado automáticamente.`;
                for (const uid of involvedUsers) {
                    if (uid !== user.uid) {
                        await createNotification(uid, updatedPermitData, approvalMessage, 'approval', user);
                    }
                }
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
                const permitUrl = `${baseUrl}/permits/${permitId}`;
                const workTypesText = getWorkTypesString(updatedPermitData);
                await sendWhatsAppNotification(`*🟢 Permiso EN EJECUCIÓN* 🎉\n\nTodas las firmas requeridas han sido registradas. El permiso fue activado automáticamente.\n\n📄 *Número:* ${updatedPermitData.number}\n👤 *Solicitante:* ${updatedPermitData.user?.displayName || 'N/A'}\n🛠️ *Tipo de Trabajo:* ${workTypesText}\n\nVer permiso:\n${permitUrl}`);
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
    
    if (permitData.controlEnergia) {
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
            'en_ejecucion': ['autorizante', 'admin', 'solicitante'],
            'aprobado': ['autorizante', 'admin'],
            'rechazado': ['autorizante', 'lider_sst', 'admin']
        },
        'aprobado': {
            'en_ejecucion': ['solicitante', 'admin'],
            'rechazado': ['autorizante', 'lider_sst', 'admin']
        },
        'en_ejecucion': {
            'suspendido': ['lider_sst', 'admin', 'autorizante'],
            'cerrado': ['solicitante', 'admin', 'autorizante']
        },
        'suspendido': {
            'en_ejecucion': ['lider_sst', 'admin', 'autorizante'],
            'cerrado': ['solicitante', 'admin', 'autorizante']
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
        validationArray.push({ dia: validationArray.length + 1, nombre: '', firma: '', fecha: '' });
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
