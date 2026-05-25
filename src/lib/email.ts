
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

// ─── Envíos ───────────────────────────────────────────────────────────────────
//
// Estrategia BCC con dirección del sistema como campo "to":
//   • El campo "to" usa siempre fromEmail (dirección del sistema, nunca suprimida).
//   • Todos los destinatarios reales van en BCC.
//   • Resend procesa cada BCC de forma independiente: si una dirección está
//     suprimida (bounce anterior, spam, etc.) esa persona no recibe el correo
//     pero el resto sí. Así se cumple "enviar a todos, omitir los problemáticos"
//     sin necesidad de pre-filtrado manual ni limpieza de la lista de supresiones.

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

  try {
    // "to" = dirección del sistema (siempre válida). Destinatarios reales en BCC.
    // Resend evalúa cada BCC de forma independiente — suprimidos se omiten solos.
    const { data, error } = await resend.emails.send({
      from: `SGTC Móvil <${fromEmail}>`,
      to: fromEmail,
      bcc: unique,
      subject,
      html,
    });

    if (error) throw error;

    console.log(`✅ [Email] Correo enviado a ${unique.length} destinatario(s) vía BCC. ID: ${data?.id}`);
    return { success: true, data };
  } catch (error) {
    console.error(`❌ [Email] Error en envío grupal (${unique.length} destinatarios):`, error);
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
