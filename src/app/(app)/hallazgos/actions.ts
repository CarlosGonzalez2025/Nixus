'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { sendPermitUpdateEmail } from '@/lib/email';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Hallazgo } from '@/types';

const CLASE_LABEL: Record<string, string> = {
  A: 'Clase A — Intervención Inmediata',
  B: 'Clase B — Intervención Pronta',
  C: 'Clase C — Intervención Posterior',
};

const CLASE_COLOR: Record<string, string> = {
  A: '#dc2626',
  B: '#d97706',
  C: '#2563eb',
};

const safeDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

const fmtDate = (v: any) => {
  const d = safeDate(v);
  return d ? format(d, "dd 'de' MMMM 'de' yyyy", { locale: es }) : '—';
};

function buildHallazgoEmailHtml(hallazgo: Hallazgo, hallazgoUrl: string): string {
  const claseColor = CLASE_COLOR[hallazgo.clase] || '#2563eb';
  const claseLabel = CLASE_LABEL[hallazgo.clase] || hallazgo.clase;
  const empresa = hallazgo.empresa || hallazgo.frenteTrabajo || '—';
  const planta = hallazgo.planta || hallazgo.centroCosto || '—';
  const fechaVisita = fmtDate(hallazgo.fechaVisita || hallazgo.fechaIdentificacion);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo Hallazgo de Seguridad</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header naranja -->
          <tr>
            <td style="background:#ef7b00;padding:20px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#ffffff;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Sistema de Gestión SST</p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:bold;">⚠️ Nuevo Hallazgo de Seguridad</h1>
                  </td>
                  <td align="right">
                    <div style="background:rgba(255,255,255,0.25);border-radius:6px;padding:6px 14px;display:inline-block;">
                      <span style="color:#ffffff;font-size:22px;font-weight:bold;">#${hallazgo.numero}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Badge de clasificación -->
          <tr>
            <td style="padding:16px 32px 0;">
              <div style="background:${claseColor};color:#ffffff;border-radius:20px;padding:6px 16px;display:inline-block;font-size:12px;font-weight:bold;">
                ${claseLabel} &nbsp;|&nbsp; Intervención: ${hallazgo.intervencion}
              </div>
            </td>
          </tr>

          <!-- Info general -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#6b7280;text-transform:uppercase;border-bottom:1px solid #e5e7eb;" colspan="2">Información General</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;width:50%;border-bottom:1px solid #f3f4f6;">
                    <strong>Empresa:</strong><br/>${empresa}
                  </td>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;width:50%;border-bottom:1px solid #f3f4f6;">
                    <strong>Planta:</strong><br/>${planta}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;border-bottom:1px solid #f3f4f6;">
                    <strong>Área:</strong><br/>${hallazgo.area || '—'}
                  </td>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;border-bottom:1px solid #f3f4f6;">
                    <strong>Fecha de Visita:</strong><br/>${fechaVisita}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;" colspan="2">
                    <strong>Reportado por:</strong> ${hallazgo.reportadoPorNombre || '—'} — ${hallazgo.reportadoPorCargo || '—'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Peligro inspeccionado -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#6b7280;text-transform:uppercase;border-bottom:1px solid #e5e7eb;">Peligro Inspeccionado</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:13px;color:#374151;line-height:1.5;">${hallazgo.peligroInspeccionado || '—'}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Descripción del hallazgo -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#6b7280;text-transform:uppercase;border-bottom:1px solid #e5e7eb;">Descripción del Hallazgo</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:13px;color:#374151;line-height:1.5;">${hallazgo.hallazgo || '—'}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Recomendaciones y acción inmediata -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #fef3c7;border-radius:6px;overflow:hidden;">
                <tr style="background:#fffbeb;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#92400e;text-transform:uppercase;border-bottom:1px solid #fef3c7;">Recomendaciones</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:13px;color:#374151;line-height:1.5;">${hallazgo.descripcion || '—'}</td>
                </tr>
                ${hallazgo.accionInmediata ? `
                <tr style="background:#fef2f2;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#991b1b;text-transform:uppercase;border-top:1px solid #fecaca;border-bottom:1px solid #fecaca;">⚡ Acción Inmediata Requerida</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:13px;color:#7f1d1d;line-height:1.5;font-weight:500;">${hallazgo.accionInmediata}</td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          ${hallazgo.geolocalizacion ? `
          <!-- Geolocalización -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d1fae5;border-radius:6px;overflow:hidden;">
                <tr style="background:#ecfdf5;">
                  <td style="padding:8px 14px;font-size:11px;font-weight:bold;color:#065f46;text-transform:uppercase;border-bottom:1px solid #d1fae5;">📍 Ubicación del Hallazgo</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-size:12px;color:#374151;">
                    Lat: ${hallazgo.geolocalizacion.lat.toFixed(6)}, Lng: ${hallazgo.geolocalizacion.lng.toFixed(6)}
                    ${hallazgo.geolocalizacion.accuracy ? `<span style="color:#6b7280;"> (±${Math.round(hallazgo.geolocalizacion.accuracy)}m)</span>` : ''}
                    &nbsp;&nbsp;
                    <a href="https://www.google.com/maps?q=${hallazgo.geolocalizacion.lat},${hallazgo.geolocalizacion.lng}"
                       style="color:#2563eb;text-decoration:none;font-weight:bold;">Ver en mapa →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px;" align="center">
              <a href="${hallazgoUrl}"
                 style="background:#ef7b00;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:bold;display:inline-block;">
                Ver Hallazgo Completo →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                Este correo fue generado automáticamente por el Sistema de Gestión SST.<br/>
                Por favor no responda a este correo.
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

/**
 * Notifica a los Líderes SST de la empresa y planta del hallazgo registrado.
 */
export async function notifyHallazgoCreated(hallazgo: Hallazgo): Promise<void> {
  if (!isAdminReady()) {
    console.warn('[Hallazgo] Firebase Admin no disponible — se omite notificación.');
    return;
  }

  const empresa = hallazgo.empresa || hallazgo.frenteTrabajo;
  const planta = hallazgo.planta || hallazgo.centroCosto;

  // Buscar todos los líderes SST
  let sstQuery = adminDb.collection('users')
    .where('role', '==', 'lider_sst')
    .where('disabled', '!=', true);

  const sstSnap = await sstQuery.get();

  // Filtrar por empresa y/o planta (hacemos el filtro en memoria porque Firestore
  // no permite múltiples inequality filters en campos distintos)
  const recipients: Array<{ id: string; email: string; displayName?: string }> = [];

  sstSnap.forEach(doc => {
    const data = doc.data();
    if (!data.email) return;

    const matchEmpresa = !empresa || !data.empresa ||
      data.empresa.toLowerCase() === empresa.toLowerCase();
    const matchPlanta = !planta || !data.planta ||
      data.planta.toLowerCase() === planta.toLowerCase();

    // Incluir si coincide empresa O planta, o si no tiene empresa/planta asignada (admin global)
    if (matchEmpresa && matchPlanta) {
      recipients.push({ id: doc.id, email: data.email, displayName: data.displayName });
    }
  });

  if (recipients.length === 0) {
    console.log('[Hallazgo] No se encontraron Líderes SST para notificar.');
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const hallazgoUrl = `${baseUrl}/hallazgos/${hallazgo.id}`;
  const html = buildHallazgoEmailHtml(hallazgo, hallazgoUrl);
  const claseLabel = CLASE_LABEL[hallazgo.clase] || hallazgo.clase;

  const subject = `🔔 Hallazgo #${hallazgo.numero} — ${claseLabel} | ${hallazgo.empresa || hallazgo.area || 'SST'}`;

  await Promise.allSettled(
    recipients.map(r =>
      sendPermitUpdateEmail({ to: r.email, subject, html })
        .then(() => console.log(`[Hallazgo] Email enviado a ${r.email}`))
        .catch(err => console.error(`[Hallazgo] Error enviando a ${r.email}:`, err))
    )
  );
}
