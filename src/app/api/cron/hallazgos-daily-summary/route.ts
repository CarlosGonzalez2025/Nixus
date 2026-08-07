import { NextResponse } from 'next/server';
import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { sendGroupEmail } from '@/lib/email';
import { Timestamp } from 'firebase-admin/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TIME_ZONE, getZonedDayStartUTC, nowInTimeZone, toZonedWallClock } from '@/lib/permit-alerts';
import type { Hallazgo } from '@/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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
  // Se formatea en hora de Colombia: el servidor corre en UTC y, sin esta
  // conversión, un registro de las 8 p.m. locales aparecía con la fecha del día siguiente.
  return d ? format(toZonedWallClock(d, TIME_ZONE), "dd 'de' MMMM 'de' yyyy", { locale: es }) : '—';
};

/**
 * Devuelve {start, end} en UTC que delimitan el día actual en zona America/Bogota.
 *
 * Antes esta ventana se calculaba sobre America/Los_Angeles, lo que en Colombia
 * arrancaba el resumen a las 02:00 a.m. locales y dejaba fuera de todo resumen
 * los hallazgos creados entre las 00:00 y las 02:00. Al alinear a Bogotá la
 * ventana solo se amplía hacia atrás: es un superconjunto de la anterior, así
 * que ningún hallazgo que antes se reportaba deja de reportarse.
 */
function getBogotaDayBoundsUTC(): { start: Date; end: Date } {
  const now = new Date();
  return { start: getZonedDayStartUTC(now, TIME_ZONE), end: now };
}

function buildSummaryEmailHtml(
  hallazgos: Hallazgo[],
  date: string,
  baseUrl: string
): string {
  const totalA = hallazgos.filter(h => h.clase === 'A').length;
  const totalB = hallazgos.filter(h => h.clase === 'B').length;
  const totalC = hallazgos.filter(h => h.clase === 'C').length;

  const hallazgoRows = hallazgos
    .map(h => {
      const claseColor = CLASE_COLOR[h.clase] || '#2563eb';
      const claseLabel = CLASE_LABEL[h.clase] || h.clase;
      const empresa = h.empresa || h.frenteTrabajo || '—';
      const planta = h.planta || h.centroCosto || '—';
      const publicUrl = `${baseUrl}/public/hallazgo/${h.id}`;
      const platformUrl = `${baseUrl}/hallazgos/${h.id}`;
      const descripcion = (h.hallazgo || '').substring(0, 150) +
        ((h.hallazgo || '').length > 150 ? '...' : '');

      return `
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #f3f4f6;vertical-align:top;width:60px;">
          <div style="background:#f3f4f6;border-radius:6px;padding:6px;text-align:center;">
            <span style="font-size:16px;font-weight:bold;color:#374151;">#${h.numero}</span>
          </div>
        </td>
        <td style="padding:14px 16px;border-bottom:1px solid #f3f4f6;vertical-align:top;">
          <div style="margin-bottom:6px;">
            <span style="background:${claseColor};color:#fff;border-radius:12px;padding:3px 10px;font-size:11px;font-weight:bold;">${h.clase}</span>
            <span style="color:#6b7280;font-size:11px;margin-left:8px;">${h.intervencion || ''}</span>
          </div>
          <div style="font-size:12px;color:#374151;margin-bottom:4px;">
            <strong>${empresa}</strong> · ${planta} · ${h.area || '—'}
          </div>
          <div style="font-size:12px;color:#6b7280;margin-bottom:6px;">
            Reportado por: ${h.reportadoPorNombre || '—'} &nbsp;|&nbsp; ${fmtDate(h.fechaVisita || h.fechaIdentificacion)}
          </div>
          ${descripcion ? `<div style="font-size:12px;color:#374151;line-height:1.5;margin-bottom:8px;">${descripcion}</div>` : ''}
          <div>
            <a href="${publicUrl}" style="color:#3062C8;font-size:11px;text-decoration:none;margin-right:12px;">📄 Ver documento</a>
            <a href="${platformUrl}" style="color:#ef7b00;font-size:11px;text-decoration:none;">Abrir en plataforma →</a>
          </div>
        </td>
      </tr>`;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resumen Diario de Hallazgos</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ef7b00;padding:22px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#ffffff;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Sistema de Gestión SST · Resumen Diario</p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:bold;">📋 Hallazgos del Día</h1>
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">${date}</p>
                  </td>
                  <td align="right">
                    <div style="background:rgba(255,255,255,0.25);border-radius:8px;padding:10px 18px;text-align:center;">
                      <span style="color:#ffffff;font-size:30px;font-weight:bold;">${hallazgos.length}</span>
                      <p style="margin:2px 0 0;color:rgba(255,255,255,0.85);font-size:11px;">hallazgo${hallazgos.length !== 1 ? 's' : ''}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Resumen por clase -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="padding:0 6px 0 0;">
                    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px;text-align:center;">
                      <div style="font-size:24px;font-weight:bold;color:#dc2626;">${totalA}</div>
                      <div style="font-size:11px;color:#991b1b;font-weight:bold;margin-top:2px;">CLASE A</div>
                      <div style="font-size:10px;color:#6b7280;margin-top:1px;">Inmediata</div>
                    </div>
                  </td>
                  <td width="33%" style="padding:0 3px;">
                    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px;text-align:center;">
                      <div style="font-size:24px;font-weight:bold;color:#d97706;">${totalB}</div>
                      <div style="font-size:11px;color:#92400e;font-weight:bold;margin-top:2px;">CLASE B</div>
                      <div style="font-size:10px;color:#6b7280;margin-top:1px;">Pronta</div>
                    </div>
                  </td>
                  <td width="33%" style="padding:0 0 0 6px;">
                    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px;text-align:center;">
                      <div style="font-size:24px;font-weight:bold;color:#2563eb;">${totalC}</div>
                      <div style="font-size:11px;color:#1e40af;font-weight:bold;margin-top:2px;">CLASE C</div>
                      <div style="font-size:10px;color:#6b7280;margin-top:1px;">Posterior</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="padding:20px 32px 0;">
              <div style="border-top:2px solid #f3f4f6;"></div>
              <p style="margin:12px 0 0;font-size:12px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Detalle de Hallazgos</p>
            </td>
          </tr>

          <!-- Tabla de hallazgos -->
          <tr>
            <td style="padding:12px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                ${hallazgoRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px;" align="center">
              <a href="${baseUrl}/hallazgos"
                 style="background:#ef7b00;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:14px;font-weight:bold;display:inline-block;">
                Ver todos los hallazgos en la plataforma →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                Este resumen fue generado automáticamente a las 7:00 PM (hora de Colombia) por el Sistema de Gestión SST.<br/>
                Solo los administradores reciben este correo de resumen. Por favor no responda a este mensaje.
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
 * GET /api/cron/hallazgos-daily-summary
 * Llamado por Vercel Cron a las 00:00 UTC (5 PM PDT / 4 PM PST).
 * Envía un resumen del día a todos los administradores.
 */
export async function GET(req: Request) {
  // Verificar el secreto del cron para evitar ejecuciones no autorizadas
  const authHeader = req.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if (!isAdminReady()) {
    return NextResponse.json({ error: 'Firebase Admin no disponible' }, { status: 503 });
  }

  try {
    const { start, end } = getBogotaDayBoundsUTC();

    // Obtener hallazgos creados durante el día actual (hora Pacífico)
    const hallazgosSnap = await adminDb
      .collection('hallazgos')
      .where('createdAt', '>=', Timestamp.fromDate(start))
      .where('createdAt', '<', Timestamp.fromDate(end))
      .orderBy('createdAt', 'asc')
      .get();

    if (hallazgosSnap.empty) {
      console.log('[CronSummary] Sin hallazgos hoy — no se envía correo.');
      return NextResponse.json({ sent: 0, hallazgos: 0 });
    }

    const hallazgos = hallazgosSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Hallazgo[];

    // Obtener todos los administradores activos
    const adminsSnap = await adminDb
      .collection('users')
      .where('role', '==', 'admin')
      .get();

    const adminEmails: string[] = [];
    adminsSnap.forEach(doc => {
      const data = doc.data();
      if (data.email && data.disabled !== true) {
        adminEmails.push(data.email);
      }
    });

    if (adminEmails.length === 0) {
      console.log('[CronSummary] No hay administradores con email — se omite envío.');
      return NextResponse.json({ sent: 0, hallazgos: hallazgos.length });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
    // La etiqueta debe reflejar el día en Colombia, no el del servidor (UTC).
    const dateLabel = format(nowInTimeZone(), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
    const html = buildSummaryEmailHtml(hallazgos, dateLabel, baseUrl);
    const subject = `📋 Resumen de hallazgos del ${dateLabel} — ${hallazgos.length} registrado${hallazgos.length !== 1 ? 's' : ''}`;

    await sendGroupEmail({ emails: adminEmails, subject, html });
    const sent = adminEmails.length;
    console.log(`[CronSummary] Resumen enviado a ${sent} admin${sent !== 1 ? 's' : ''} (BCC). Hallazgos: ${hallazgos.length}`);

    return NextResponse.json({ sent, hallazgos: hallazgos.length });
  } catch (error: any) {
    console.error('[CronSummary] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
