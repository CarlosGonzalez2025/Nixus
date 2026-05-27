
'use server';

import { Resend } from 'resend';
import { adminDb, isAdminReady } from '@/lib/firebase-admin';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

let resend: Resend | null = null;

if (resendApiKey && fromEmail && resendApiKey !== 'YOUR_API_KEY') {
  resend = new Resend(resendApiKey);
} else {
  console.warn('⚠️ [Resend] API Key o correo de origen no configurado. Las notificaciones por email están deshabilitadas.');
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendPermitUpdateEmail({ to, subject, html }: EmailParams) {
  if (!resend || !fromEmail) {
    console.log('[Email] Envío de correo omitido por falta de configuración.');
    return { success: false, error: 'El servicio de correo no está configurado.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `SGTC Móvil <${fromEmail}>`,
      to,
      subject,
      html,
    });

    if (error) throw error;

    console.log(`✅ [Email] Correo enviado a ${to}. ID: ${data?.id}`);
    return { success: true, data };
  } catch (error) {
    console.error(`❌ [Email] Falló el envío de correo a ${to}:`, error);
    return { success: false, error: 'No se pudo enviar la notificación por correo.' };
  }
}

// Tamaño máximo de lote soportado por la API Batch de Resend.
const RESEND_BATCH_LIMIT = 100;

/**
 * Envía un correo individual a cada destinatario usando la API Batch de Resend.
 *
 * Por qué batch en vez de BCC:
 *   Con BCC, si UNA dirección está en la lista de supresión de Resend, el registro
 *   completo puede quedar en estado "Suppressed" y los demás no reciben nada.
 *   Con batch, cada correo es independiente: una dirección suprimida solo afecta
 *   a ese destinatario y el resto recibe el correo sin problema.
 */
export async function sendGroupEmail({
  emails,
  subject,
  html,
}: {
  emails: string[];
  subject: string;
  html: string;
}) {
  if (!resend || !fromEmail) {
    console.log('[Email] Envío grupal omitido por falta de configuración.');
    return { success: false, error: 'El servicio de correo no está configurado.' };
  }

  const unique = [...new Set(emails.filter(Boolean))];
  if (unique.length === 0) return { success: true };

  let totalSent = 0;
  let totalFailed = 0;

  try {
    for (let i = 0; i < unique.length; i += RESEND_BATCH_LIMIT) {
      const chunk = unique.slice(i, i + RESEND_BATCH_LIMIT);
      const messages = chunk.map(to => ({
        from: `SGTC Móvil <${fromEmail!}>`,
        to,
        subject,
        html,
      }));

      const { data, error } = await resend.batch.send(messages);

      if (error) {
        console.error(`❌ [Email] Error en batch [${i}–${i + chunk.length}]:`, error);
        totalFailed += chunk.length;
      } else {
        totalSent += chunk.length;
        console.log(`✅ [Email] Batch enviado: ${chunk.length} correo(s). IDs: ${data?.map(d => d.id).join(', ')}`);
      }
    }

    console.log(`📧 [Email] Resumen: ${totalSent} enviados, ${totalFailed} fallidos de ${unique.length} destinatarios.`);
    return { success: true, sent: totalSent, failed: totalFailed };
  } catch (error) {
    console.error(`❌ [Email] Error crítico en envío grupal (${unique.length} destinatarios):`, error);
    return { success: false, error: 'No se pudo enviar la notificación por correo.' };
  }
}

export async function getEmailForUser(userId: string): Promise<string | null> {
  if (!isAdminReady()) return null;
  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data()?.email || null;
    }
    return null;
  } catch (error) {
    console.error(`Error al obtener el email para el usuario ${userId}:`, error);
    return null;
  }
}

export async function getEmailsForUsers(userIds: string[]): Promise<string[]> {
  const results = await Promise.all(userIds.map(id => getEmailForUser(id)));
  return results.filter((e): e is string => e !== null);
}
