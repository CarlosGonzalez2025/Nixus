
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

    if (error) {
      throw error;
    }

    console.log(`✅ [Email] Correo enviado exitosamente a ${to}. ID: ${data?.id}`);
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
    const [to, ...bcc] = unique;
    const { data, error } = await resend.emails.send({
      from: `SGTC Móvil <${fromEmail}>`,
      to,
      ...(bcc.length > 0 && { bcc }),
      subject,
      html,
    });

    if (error) throw error;

    const count = unique.length;
    console.log(`✅ [Email] Correo enviado a ${count} destinatario${count !== 1 ? 's' : ''} (${count > 1 ? 'BCC' : 'directo'}). ID: ${data?.id}`);
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
