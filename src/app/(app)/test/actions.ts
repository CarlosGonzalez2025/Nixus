'use server';

import { sendPermitUpdateEmail } from '@/lib/email';
import { isAdminReady } from '@/lib/firebase-admin';
import { buildPermitEmailHtml } from '@/lib/permit-email-template';

// ─── Gestión de supresiones de Resend ────────────────────────────────────────

export async function listResendSuppressions(): Promise<{
  success: boolean;
  suppressions?: { email: string; reason: string; created_at: string }[];
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, error: 'RESEND_API_KEY no configurada.' };

  try {
    const all: { email: string; reason: string; created_at: string }[] = [];
    let page = 1;

    while (page <= 20) {
      const res = await fetch(
        `https://api.resend.com/suppressions?page=${page}&limit=100`,
        { headers: { Authorization: `Bearer ${apiKey}` }, cache: 'no-store' }
      );
      const json = await res.json();
      if (!res.ok) return { success: false, error: json?.message || `HTTP ${res.status}` };

      const items: { email: string; reason: string; created_at: string }[] = json.data || [];
      all.push(...items);
      if (items.length < 100) break;
      page++;
    }

    return { success: true, suppressions: all };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function removeResendSuppression(email: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, error: 'RESEND_API_KEY no configurada.' };
  if (!email?.includes('@')) return { success: false, error: 'Email inválido.' };

  try {
    const res = await fetch(
      `https://api.resend.com/suppressions/${encodeURIComponent(email)}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${apiKey}` } }
    );

    if (res.ok || res.status === 204) {
      return { success: true, message: `${email} eliminado de la lista de supresión.` };
    }
    if (res.status === 404) {
      return { success: true, message: `${email} no estaba en la lista de supresión.` };
    }

    const json = await res.json().catch(() => ({}));
    return { success: false, error: json?.message || `HTTP ${res.status}: ${res.statusText}` };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Datos de permiso de muestra para previsualizar el correo
const SAMPLE_PERMIT: any = {
  id: 'PT-TEST-000',
  number: 'PT-2024-001',
  status: 'pendiente_revision',
  createdBy: '',
  user: { displayName: 'Carlos González' },
  generalInfo: {
    empresa: 'Italcol de Occidente S.A.S.',
    planta: 'Planta Norte — Mosquera',
    ciudad: 'Mosquera, Cundinamarca',
    areaEspecifica: 'Silo de almacenamiento #3',
    nombreSolicitante: 'Carlos González',
    validFrom: new Date(Date.now()).toISOString(),
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  selectedWorkTypes: {
    alturas: true,
    energia: true,
    confinado: false,
    izaje: false,
    excavacion: false,
    general: false,
  },
  approvals: {},
};

const SAMPLE_MESSAGE =
  'El ejecutante del trabajo <strong>Carlos González</strong> ha firmado y enviado el permiso PT-2024-001 para su revisión y autorización. Se requiere su firma para continuar con el proceso.';

const STATUS_LABEL: Record<string, string> = {
  borrador: 'Borrador',
  pendiente_revision: 'Pendiente de Revisión',
  aprobado: 'Aprobado',
  en_ejecucion: 'En Ejecución',
  suspendido: 'Suspendido',
  cerrado: 'Cerrado',
  rechazado: 'Rechazado',
};

export async function sendTestPermitEmail(
  targetEmail: string
): Promise<{ success: boolean; error?: string }> {
  if (!isAdminReady()) {
    return { success: false, error: 'Firebase Admin no está inicializado.' };
  }

  if (!targetEmail || !targetEmail.includes('@')) {
    return { success: false, error: 'Dirección de correo inválida.' };
  }

  const permit = SAMPLE_PERMIT;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const permitUrl = `${baseUrl}/permits/${permit.id}`;
  const statusLabel = STATUS_LABEL[permit.status] || permit.status;

  const html = buildPermitEmailHtml(permit, SAMPLE_MESSAGE, permitUrl);

  const result = await sendPermitUpdateEmail({
    to: targetEmail,
    subject: `[SGTC] Permiso ${permit.number} — ${statusLabel} ✉️ Correo de prueba`,
    html,
  });

  return result;
}
