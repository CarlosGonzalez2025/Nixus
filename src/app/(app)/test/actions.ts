'use server';

import { sendPermitUpdateEmail } from '@/lib/email';
import { isAdminReady } from '@/lib/firebase-admin';
import { buildPermitEmailHtml } from '@/lib/permit-email-template';

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
