
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

// ─── Caché de supresiones (TTL: 10 minutos) ───────────────────────────────────
// Evita llamar al API de Resend en cada envío. Se renueva automáticamente.
let suppressionCache: { emails: Set<string>; expiresAt: number } | null = null;
const SUPPRESSION_CACHE_TTL_MS = 10 * 60 * 1000;

async function fetchSuppressedEmails(): Promise<Set<string>> {
  const now = Date.now();
  if (suppressionCache && now < suppressionCache.expiresAt) {
    return suppressionCache.emails;
  }

  if (!resendApiKey) return new Set();

  try {
    const allEmails: string[] = [];
    let page = 1;
    const limit = 100;

    // Paginar hasta obtener todas las supresiones (Resend max 100/página)
    while (page <= 20) {
      const res = await fetch(
        `https://api.resend.com/suppressions?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${resendApiKey}` }, cache: 'no-store' }
      );

      if (!res.ok) {
        console.warn(`⚠️ [Email] No se pudo obtener supresiones (HTTP ${res.status}, página ${page}). Se enviarán sin filtrar.`);
        return new Set();
      }

      const json = await res.json();
      const items: Array<{ email: string }> = json.data || [];
      allEmails.push(...items.map((i) => i.email.toLowerCase()));

      if (items.length < limit) break; // última página
      page++;
    }

    const emailSet = new Set(allEmails);
    suppressionCache = { emails: emailSet, expiresAt: now + SUPPRESSION_CACHE_TTL_MS };
    console.log(`[Email] Supresiones cargadas: ${emailSet.size} dirección(es) en ${page} página(s).`);
    return emailSet;
  } catch (err) {
    console.warn('⚠️ [Email] Error al consultar supresiones de Resend. Se enviarán sin filtrar.', err);
    return new Set();
  }
}

async function filterSuppressed(emails: string[]): Promise<{ valid: string[]; suppressed: string[] }> {
  const suppressedSet = await fetchSuppressedEmails();
  const valid: string[] = [];
  const suppressed: string[] = [];

  for (const email of emails) {
    if (suppressedSet.has(email.toLowerCase())) {
      suppressed.push(email);
    } else {
      valid.push(email);
    }
  }

  if (suppressed.length > 0) {
    console.warn(`⚠️ [Email] ${suppressed.length} destinatario(s) omitido(s) por supresión: ${suppressed.join(', ')}`);
  }

  return { valid, suppressed };
}

// ─── Envíos ───────────────────────────────────────────────────────────────────

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

  const { valid, suppressed } = await filterSuppressed([to]);
  if (suppressed.length > 0 || valid.length === 0) {
    console.warn(`⚠️ [Email] Correo a ${to} omitido: dirección suprimida en Resend.`);
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `SGTC Móvil <${fromEmail}>`,
      to: valid[0],
      subject,
      html,
    });

    if (error) throw error;

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

  const { valid, suppressed } = await filterSuppressed(unique);

  if (valid.length === 0) {
    console.warn(`⚠️ [Email] Envío grupal omitido: todos los destinatarios (${suppressed.length}) están suprimidos.`);
    return { success: true };
  }

  try {
    const [to, ...bcc] = valid;
    const { data, error } = await resend.emails.send({
      from: `SGTC Móvil <${fromEmail}>`,
      to,
      ...(bcc.length > 0 && { bcc }),
      subject,
      html,
    });

    if (error) throw error;

    const count = valid.length;
    const skippedInfo = suppressed.length > 0 ? ` (${suppressed.length} suprimido(s) omitido(s))` : '';
    console.log(`✅ [Email] Correo enviado a ${count} destinatario${count !== 1 ? 's' : ''} (${count > 1 ? 'BCC' : 'directo'})${skippedInfo}. ID: ${data?.id}`);
    return { success: true, data };
  } catch (error) {
    console.error(`❌ [Email] Error en envío grupal (${valid.length} destinatarios):`, error);
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
