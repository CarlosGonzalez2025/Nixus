'use server';

import { sendPermitUpdateEmail, getEmailForUser } from '@/lib/email';
import { isAdminReady } from '@/lib/firebase-admin';

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

export async function sendTestPermitEmail(
  targetEmail: string
): Promise<{ success: boolean; error?: string }> {
  if (!isAdminReady()) {
    return { success: false, error: 'Firebase Admin no está inicializado.' };
  }

  if (!targetEmail || !targetEmail.includes('@')) {
    return { success: false, error: 'Dirección de correo inválida.' };
  }

  // Importamos la función de construcción de HTML desde permits/actions
  // Para no duplicar la lógica la re-implementamos aquí con los mismos helpers
  const { format } = await import('date-fns');
  const { es } = await import('date-fns/locale');

  const STATUS_LABEL: Record<string, string> = {
    borrador: 'Borrador',
    pendiente_revision: 'Pendiente de Revisión',
    aprobado: 'Aprobado',
    en_ejecucion: 'En Ejecución',
    suspendido: 'Suspendido',
    cerrado: 'Cerrado',
    rechazado: 'Rechazado',
  };

  const STATUS_COLOR: Record<string, string> = {
    borrador: '#6b7280',
    pendiente_revision: '#d97706',
    aprobado: '#16a34a',
    en_ejecucion: '#7c3aed',
    suspendido: '#ea580c',
    cerrado: '#2563eb',
    rechazado: '#dc2626',
  };

  const WORK_TYPE_LABELS: Record<string, string> = {
    alturas: 'Trabajo en Alturas',
    confinado: 'Espacios Confinados',
    energia: 'Control de Energías',
    izaje: 'Izaje de Cargas',
    excavacion: 'Excavaciones',
    general: 'Trabajo General',
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

  const permit = SAMPLE_PERMIT;
  const message = SAMPLE_MESSAGE;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const permitUrl = `${baseUrl}/permits/${permit.id}`;

  const statusLabel = STATUS_LABEL[permit.status] || permit.status;
  const statusColor = STATUS_COLOR[permit.status] || '#6b7280';
  const permitNumber = permit.number;
  const empresa     = permit.generalInfo?.empresa      || '—';
  const planta      = permit.generalInfo?.planta       || '—';
  const ciudad      = permit.generalInfo?.ciudad       || '—';
  const area        = permit.generalInfo?.areaEspecifica || '—';
  const solicitante = permit.generalInfo?.nombreSolicitante || '—';
  const validFrom   = safeFormatDate(permit.generalInfo?.validFrom);
  const validUntil  = safeFormatDate(permit.generalInfo?.validUntil);

  const workTypes = Object.entries(permit.selectedWorkTypes || {})
    .filter(([, v]) => v)
    .map(([k]) => WORK_TYPE_LABELS[k] || k)
    .join(' &nbsp;|&nbsp; ') || 'Trabajo General';

  const html = `
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

          <!-- ── Mensaje ── -->
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

          <!-- ── Info del permiso ── -->
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

  const result = await sendPermitUpdateEmail({
    to: targetEmail,
    subject: `[SGTC] Permiso ${permitNumber} — ${statusLabel} ✉️ Correo de prueba`,
    html,
  });

  return result;
}
