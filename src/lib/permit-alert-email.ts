// ─── Plantilla del correo digest de alertas tempranas ─────────────────────────
//
// Se envía UN correo por destinatario con todos sus permisos pendientes, en vez
// de un correo por permiso. Reduce el volumen de envíos ~10x frente al patrón
// de notificación individual y evita agotar la cuota de Resend en un barrido.
// Sigue el lenguaje visual de permit-email-template.ts.

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { PermitAlertSeverity } from '@/lib/permit-alerts';

const SEVERITY_COLOR: Record<PermitAlertSeverity, string> = {
  critical: '#dc2626',
  warning: '#d97706',
  info: '#2563eb',
};

const SEVERITY_BG: Record<PermitAlertSeverity, string> = {
  critical: '#fef2f2',
  warning: '#fffbeb',
  info: '#eff6ff',
};

export interface AlertDigestItem {
  title: string;
  message: string;
  severity: PermitAlertSeverity;
}

export interface AlertDigestPermit {
  id: string;
  numero: string;
  empresa: string;
  planta: string;
  area: string;
  vence: string;
  url: string;
  items: AlertDigestItem[];
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function renderPermitBlock(permit: AlertDigestPermit): string {
  const peor: PermitAlertSeverity = permit.items.some(i => i.severity === 'critical')
    ? 'critical'
    : permit.items.some(i => i.severity === 'warning')
      ? 'warning'
      : 'info';

  const items = permit.items
    .map(
      item => `
        <tr>
          <td style="padding:8px 0 0;vertical-align:top;width:16px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${SEVERITY_COLOR[item.severity]};"></span>
          </td>
          <td style="padding:8px 0 0;font-size:13px;color:#334155;line-height:1.55;">
            <strong style="color:${SEVERITY_COLOR[item.severity]};">${escapeHtml(item.title)}:</strong>
            ${escapeHtml(item.message)}
          </td>
        </tr>`
    )
    .join('');

  return `
  <tr>
    <td style="padding:0 32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0"
             style="background:${SEVERITY_BG[peor]};border:1px solid #e2e8f0;border-left:4px solid ${SEVERITY_COLOR[peor]};border-radius:6px;">
        <tr>
          <td style="padding:14px 18px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:15px;font-weight:bold;color:#0f172a;">Permiso ${escapeHtml(permit.numero)}</td>
                <td align="right" style="font-size:11px;color:#64748b;white-space:nowrap;">Vence: ${escapeHtml(permit.vence)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top:2px;font-size:11px;color:#64748b;">
                  ${escapeHtml(permit.empresa)} &middot; ${escapeHtml(permit.planta)} &middot; ${escapeHtml(permit.area)}
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">
              ${items}
            </table>

            <p style="margin:14px 0 0;">
              <a href="${permit.url}" style="color:#3062C8;font-size:12px;font-weight:bold;text-decoration:none;">
                Abrir el permiso &rarr;
              </a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

export function buildPermitAlertDigestHtml(params: {
  nombre: string | null;
  permits: AlertDigestPermit[];
  baseUrl: string;
  now: Date;
}): string {
  const { nombre, permits, baseUrl, now } = params;

  const totalPendientes = permits.reduce((sum, p) => sum + p.items.length, 0);
  const hayCriticas = permits.some(p => p.items.some(i => i.severity === 'critical'));
  const fecha = format(now, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  const saludo = nombre ? `Hola ${escapeHtml(nombre)},` : 'Hola,';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Permisos de trabajo con acciones pendientes</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:28px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:${hayCriticas ? 'linear-gradient(135deg,#991b1b 0%,#dc2626 100%)' : 'linear-gradient(135deg,#1e3a8a 0%,#3062C8 100%)'};padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:rgba(255,255,255,0.75);font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.2px;">
                      Sistema de Gestión de Permisos de Trabajo
                    </p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:bold;line-height:1.3;">
                      ⏰ Acciones pendientes en sus permisos
                    </h1>
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">${fecha}</p>
                  </td>
                  <td align="right" style="padding-left:16px;white-space:nowrap;">
                    <div style="background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.35);border-radius:8px;padding:10px 18px;text-align:center;">
                      <span style="color:#ffffff;font-size:26px;font-weight:bold;">${totalPendientes}</span>
                      <p style="margin:2px 0 0;color:rgba(255,255,255,0.8);font-size:10px;text-transform:uppercase;letter-spacing:0.6px;">Pendiente${totalPendientes !== 1 ? 's' : ''}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:22px 32px 16px;">
              <p style="margin:0 0 8px;font-size:14px;color:#0f172a;">${saludo}</p>
              <p style="margin:0;font-size:13px;color:#475569;line-height:1.6;">
                Se detectaron acciones pendientes en
                <strong>${permits.length} permiso${permits.length !== 1 ? 's' : ''} de trabajo</strong>
                bajo su responsabilidad. Revise el detalle y complete lo que corresponda.
              </p>
            </td>
          </tr>

          ${permits.map(renderPermitBlock).join('')}

          <!-- CTA -->
          <tr>
            <td style="padding:12px 32px 28px;" align="center">
              <a href="${baseUrl}/permits"
                 style="background:#3062C8;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:bold;display:inline-block;letter-spacing:0.3px;">
                Ver todos mis permisos &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6;">
                Recordatorio automático generado por el <strong>Sistema de Gestión de Permisos de Trabajo (SGTC)</strong>.<br/>
                Cada aviso se envía una sola vez por permiso y día. Por favor no responda a este correo.
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
