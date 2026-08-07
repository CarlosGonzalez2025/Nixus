
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

// Máx destinatarios por email y máx grupos por llamada batch de Resend.
const GROUP_SIZE = 10;
const BATCH_LIMIT = 100;

/**
 * Envía notificaciones grupales agrupando hasta GROUP_SIZE destinatarios
 * por email usando la API Batch de Resend.
 *
 * Estrategia de agrupación (balance entre fiabilidad y cuota):
 *   - Los destinatarios se dividen en grupos de máx 10.
 *   - Cada grupo se envía como un email independiente vía resend.batch.send().
 *   - Si una dirección de un grupo está suprimida, Resend la omite y entrega
 *     al resto del grupo sin afectar a los demás grupos.
 *   - Cuota: 36 destinatarios → 4 emails contados (vs 36 con envío individual
 *     o 1 con BCC —que bloqueaba todo si había una suprimida—).
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

  // Dividir destinatarios en grupos de GROUP_SIZE
  const groups: string[][] = [];
  for (let i = 0; i < unique.length; i += GROUP_SIZE) {
    groups.push(unique.slice(i, i + GROUP_SIZE));
  }

  let totalSent = 0;
  let totalFailed = 0;

  try {
    // Enviar grupos en lotes de BATCH_LIMIT (límite de la API batch de Resend)
    for (let i = 0; i < groups.length; i += BATCH_LIMIT) {
      const batchGroups = groups.slice(i, i + BATCH_LIMIT);
      const messages = batchGroups.map(group => ({
        from: `SGTC Móvil <${fromEmail!}>`,
        to: group.length === 1 ? group[0] : group,
        subject,
        html,
      }));

      const { data, error } = await resend.batch.send(messages);

      if (error) {
        console.error(`❌ [Email] Error en batch grupal [${i}–${i + batchGroups.length}]:`, error);
        totalFailed += batchGroups.reduce((s, g) => s + g.length, 0);
      } else {
        const enviados = batchGroups.reduce((s, g) => s + g.length, 0);
        totalSent += enviados;
        // La respuesta de resend.batch.send() es { data: { data: [{id}] } }, no un
        // arreglo. Llamar a data.map() lanzaba un TypeError DENTRO de la rama de
        // éxito: la excepción saltaba al catch de abajo y esta función reportaba
        // fallo aunque el correo sí se hubiera enviado. Verificado contra la API.
        const ids = data?.data?.map(d => d.id).join(', ') ?? '—';
        console.log(`✅ [Email] Batch grupal: ${batchGroups.length} grupo(s), ${enviados} destinatario(s). IDs: ${ids}`);
      }
    }

    console.log(`📧 [Email] Resumen: ${totalSent} enviados en ${groups.length} grupo(s), ${totalFailed} fallidos de ${unique.length} destinatarios.`);
    return { success: true, sent: totalSent, failed: totalFailed, groups: groups.length };
  } catch (error) {
    console.error(`❌ [Email] Error crítico en envío grupal (${unique.length} destinatarios, ${groups.length} grupos):`, error);
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
