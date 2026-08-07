// ─── Cron de alertas tempranas de permisos de trabajo ─────────────────────────
//
// Barrido periódico que detecta acciones pendientes en los permisos vigentes y
// avisa a los responsables por los tres canales que ya usa el sistema:
// notificación in-app, Web Push y correo.
//
// Reglas evaluadas: ver src/lib/permit-alerts.ts (módulo puro, sin efectos).
// Destinatarios:    ver src/lib/permit-alert-recipients.ts
//
// Garantías de diseño:
//   · SOLO LECTURA sobre la lógica de negocio. Este endpoint jamás cambia el
//     estado de un permiso, ni firmas, ni cierres. La única escritura sobre
//     `permits` es el campo aditivo `alertas`, un registro de qué avisos ya se
//     enviaron; ninguna regla, consulta o vista existente lo lee.
//   · Idempotente. Cada alerta tiene una clave única (p. ej.
//     "firma_apertura:anexoAltura:2026-08-07"). Si la clave ya está en
//     `permit.alertas`, no se vuelve a enviar. Ejecutar el cron dos veces
//     seguidas no duplica notificaciones.
//   · Un solo correo por persona (digest), no uno por permiso.
//   · El registro anti-duplicados se marca DESPUÉS de escribir las
//     notificaciones in-app (canal confiable y barato) y ANTES de los correos:
//     si el envío de correo se agota por tiempo, el aviso ya quedó entregado en
//     la aplicación y no se repite al día siguiente.
//
// Uso manual / pruebas:
//   GET /api/cron/permit-alerts?dryRun=1   → calcula y reporta SIN enviar ni escribir.

import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { sendPushToUser } from '@/lib/push-notifications';
import { sendPermitUpdateEmail } from '@/lib/email';
import {
  ESTADOS_VIGILADOS,
  evaluatePermitAlerts,
  filtrarAlertasNuevas,
  getPermitWindow,
  nowInTimeZone,
  severidadMaxima,
  type PermitAlert,
} from '@/lib/permit-alerts';
import {
  buildUserDirectory,
  emailsParaNotificar,
  resolveAudienceUids,
  type DirectoryUser,
} from '@/lib/permit-alert-recipients';
import {
  buildPermitAlertDigestHtml,
  type AlertDigestPermit,
} from '@/lib/permit-alert-email';
import type { Notification, Permit } from '@/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Autor sintético de las notificaciones automáticas. */
const SISTEMA = { uid: 'system', displayName: 'Sistema SGTC' } as const;

/** Tope de escrituras por lote de Firestore (el límite duro es 500). */
const FIRESTORE_BATCH_SIZE = 400;

/** Envíos de correo simultáneos y pausa entre tandas (cuota de Resend). */
const EMAIL_CONCURRENCY = 3;
const EMAIL_DELAY_MS = 1_000;

/** Margen de seguridad frente a `maxDuration` para la fase de correos. */
const TIME_BUDGET_MS = 45_000;

/**
 * Tope de notificaciones in-app por persona y ejecución.
 *
 * Los roles de supervisión (Líder SST corporativo, admin sin planta) calzan con
 * TODOS los permisos: en un pico de permisos vencidos podrían recibir decenas de
 * avisos y saturar la campanita, que además solo muestra 30 sin leer.
 * Se priorizan los críticos y el resto viaja íntegro en el correo digest.
 */
const MAX_NOTIFICACIONES_IN_APP = 15;

interface RecipientBucket {
  /** permitId → alertas que le corresponden a este destinatario. */
  porPermiso: Map<string, PermitAlert[]>;
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

const chunk = <T,>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
};

/** Resumen legible de las alertas de un permiso para in-app y push. */
function resumirAlertas(alerts: PermitAlert[]): string {
  if (alerts.length === 1) return alerts[0].message;
  const titulos = alerts.slice(0, 3).map(a => a.title).join(' · ');
  const resto = alerts.length > 3 ? ` y ${alerts.length - 3} más` : '';
  return `${alerts.length} acciones pendientes: ${titulos}${resto}.`;
}

export async function GET(req: Request) {
  const startedAt = Date.now();

  // Mismo esquema de protección que el cron de hallazgos.
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if (!isAdminReady()) {
    return NextResponse.json({ error: 'Firebase Admin no disponible' }, { status: 503 });
  }

  const dryRun = new URL(req.url).searchParams.get('dryRun') === '1';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sgtc-movil.web.app';
  const now = nowInTimeZone();

  try {
    // ── 1. Carga única: permisos vigentes + directorio de usuarios ────────────
    const [permitsSnap, usersSnap] = await Promise.all([
      adminDb.collection('permits').where('status', 'in', [...ESTADOS_VIGILADOS]).get(),
      adminDb.collection('users').get(),
    ]);

    const directory: DirectoryUser[] = buildUserDirectory(usersSnap.docs as any);
    const directoryByUid = new Map(directory.map(u => [u.uid, u]));

    // ── 2. Evaluación de reglas ──────────────────────────────────────────────
    const destinatarios = new Map<string, RecipientBucket>();
    const permisosPorId = new Map<string, Permit>();
    const ledger: { ref: FirebaseFirestore.DocumentReference; keys: string[] }[] = [];
    const detalle: { permiso: string; alertas: string[]; destinatarios: number }[] = [];

    let alertasNuevas = 0;

    for (const doc of permitsSnap.docs) {
      const permit = { id: doc.id, ...doc.data() } as Permit;

      const nuevas = filtrarAlertasNuevas(permit, evaluatePermitAlerts(permit, now));
      if (nuevas.length === 0) continue;

      // Una alerta sin destinatarios reales no se marca como enviada: así se
      // reintenta cuando el permiso o el directorio se corrijan.
      const clavesEntregadas = new Set<string>();
      let destinatariosDelPermiso = 0;

      for (const alerta of nuevas) {
        const uids = resolveAudienceUids(permit, alerta.audiences, directory);
        if (uids.length === 0) continue;

        clavesEntregadas.add(alerta.key);
        destinatariosDelPermiso += uids.length;

        for (const uid of uids) {
          let bucket = destinatarios.get(uid);
          if (!bucket) {
            bucket = { porPermiso: new Map() };
            destinatarios.set(uid, bucket);
          }
          const lista = bucket.porPermiso.get(permit.id) ?? [];
          lista.push(alerta);
          bucket.porPermiso.set(permit.id, lista);
        }
      }

      if (clavesEntregadas.size === 0) continue;

      permisosPorId.set(permit.id, permit);
      ledger.push({ ref: doc.ref, keys: Array.from(clavesEntregadas) });
      alertasNuevas += clavesEntregadas.size;
      detalle.push({
        permiso: permit.number || permit.id,
        alertas: Array.from(clavesEntregadas),
        destinatarios: destinatariosDelPermiso,
      });
    }

    const resumenBase = {
      ahora: `${format(now, 'yyyy-MM-dd HH:mm')} America/Bogota`,
      permisosEvaluados: permitsSnap.size,
      permisosConAlertas: permisosPorId.size,
      alertasNuevas,
      destinatarios: destinatarios.size,
    };

    if (alertasNuevas === 0) {
      console.log('[CronAlertas] Sin alertas nuevas.', resumenBase);
      return NextResponse.json({ ok: true, dryRun, ...resumenBase });
    }

    if (dryRun) {
      return NextResponse.json({ ok: true, dryRun: true, ...resumenBase, detalle });
    }

    // ── 3. Notificaciones in-app (una por destinatario y permiso) ────────────
    const notificaciones: Omit<Notification, 'id'>[] = [];
    let notificacionesOmitidas = 0;

    for (const [uid, bucket] of destinatarios) {
      // Los permisos críticos (vencidos) encabezan la lista para que sean los
      // que sobrevivan al tope si el usuario supervisa muchos permisos a la vez.
      const entradas = Array.from(bucket.porPermiso.entries()).sort((a, b) => {
        const sa = severidadMaxima(a[1]) === 'critical' ? 0 : 1;
        const sb = severidadMaxima(b[1]) === 'critical' ? 0 : 1;
        return sa - sb;
      });

      if (entradas.length > MAX_NOTIFICACIONES_IN_APP) {
        notificacionesOmitidas += entradas.length - MAX_NOTIFICACIONES_IN_APP;
      }

      for (const [permitId, alerts] of entradas.slice(0, MAX_NOTIFICACIONES_IN_APP)) {
        const permit = permisosPorId.get(permitId)!;
        notificaciones.push({
          userId: uid,
          permitId,
          permitNumber: permit.number || '',
          message: resumirAlertas(alerts),
          type: severidadMaxima(alerts) === 'critical' ? 'overdue' : 'reminder',
          isRead: false,
          createdAt: FieldValue.serverTimestamp() as any,
          triggeredBy: { uid: SISTEMA.uid, displayName: SISTEMA.displayName },
        });
      }
    }

    for (const grupo of chunk(notificaciones, FIRESTORE_BATCH_SIZE)) {
      const batch = adminDb.batch();
      for (const notif of grupo) {
        batch.create(adminDb.collection('notifications').doc(), notif as any);
      }
      await batch.commit();
    }

    // ── 4. Registro anti-duplicados sobre el permiso (campo aditivo) ─────────
    for (const grupo of chunk(ledger, FIRESTORE_BATCH_SIZE)) {
      const batch = adminDb.batch();
      for (const { ref, keys } of grupo) {
        const marcas: Record<string, unknown> = {};
        for (const key of keys) marcas[key] = FieldValue.serverTimestamp();
        // merge:true fusiona el mapa `alertas` sin tocar ningún otro campo
        // del permiso ni las claves previamente registradas.
        batch.set(ref, { alertas: marcas }, { merge: true });
      }
      await batch.commit();
    }

    // ── 5. Web Push: un aviso por destinatario ──────────────────────────────
    const pushResultados = await Promise.allSettled(
      Array.from(destinatarios.entries()).map(([uid, bucket]) => {
        const permitIds = Array.from(bucket.porPermiso.keys());
        const todas = Array.from(bucket.porPermiso.values()).flat();
        const critico = severidadMaxima(todas) === 'critical';

        const body =
          permitIds.length === 1
            ? resumirAlertas(bucket.porPermiso.get(permitIds[0])!)
            : `Tiene acciones pendientes en ${permitIds.length} permisos de trabajo.`;

        return sendPushToUser(uid, {
          title: critico ? 'SGTC Móvil — Permiso vencido' : 'SGTC Móvil — Recordatorio',
          body,
          url: permitIds.length === 1 ? `${baseUrl}/permits/${permitIds[0]}` : `${baseUrl}/permits`,
        });
      })
    );
    const pushEnviados = pushResultados.filter(r => r.status === 'fulfilled').length;

    // ── 6. Correo digest: uno por destinatario (admins excluidos) ────────────
    const correosPermitidos = new Set(
      emailsParaNotificar(Array.from(destinatarios.keys()), directory)
    );

    const tareasEmail = Array.from(destinatarios.entries())
      .map(([uid, bucket]) => {
        const user = directoryByUid.get(uid);
        if (!user?.email || !correosPermitidos.has(user.email)) return null;

        const permits: AlertDigestPermit[] = Array.from(bucket.porPermiso.entries()).map(
          ([permitId, alerts]) => {
            const permit = permisosPorId.get(permitId)!;
            const window = getPermitWindow(permit);
            return {
              id: permitId,
              numero: permit.number || permitId.substring(0, 8),
              empresa: permit.generalInfo?.empresa || '—',
              planta: permit.generalInfo?.planta || '—',
              area: permit.generalInfo?.areaEspecifica || '—',
              vence: window ? format(window.until, "d 'de' MMMM, HH:mm", { locale: es }) : '—',
              url: `${baseUrl}/permits/${permitId}`,
              items: alerts.map(a => ({
                title: a.title,
                message: a.message,
                severity: a.severity,
              })),
            };
          }
        );

        const totalItems = permits.reduce((s, p) => s + p.items.length, 0);
        const critico = Array.from(bucket.porPermiso.values())
          .flat()
          .some(a => a.severity === 'critical');

        return {
          to: user.email!,
          subject: critico
            ? `[SGTC] Permiso(s) vencidos sin cerrar — ${totalItems} pendiente${totalItems !== 1 ? 's' : ''}`
            : `[SGTC] Recordatorio: ${totalItems} acción${totalItems !== 1 ? 'es' : ''} pendiente${totalItems !== 1 ? 's' : ''} en sus permisos`,
          html: buildPermitAlertDigestHtml({
            nombre: user.displayName,
            permits,
            baseUrl,
            now,
          }),
        };
      })
      .filter((t): t is { to: string; subject: string; html: string } => t !== null);

    let correosEnviados = 0;
    let correosOmitidos = 0;

    for (const tanda of chunk(tareasEmail, EMAIL_CONCURRENCY)) {
      if (Date.now() - startedAt > TIME_BUDGET_MS) {
        // Las notificaciones in-app y push ya salieron; no se reintenta el correo
        // para no arriesgar un timeout que deje el barrido a medias.
        correosOmitidos += tanda.length;
        continue;
      }
      const res = await Promise.allSettled(tanda.map(t => sendPermitUpdateEmail(t)));
      correosEnviados += res.filter(r => r.status === 'fulfilled' && r.value?.success).length;
      await sleep(EMAIL_DELAY_MS);
    }

    const resumen = {
      ok: true,
      dryRun: false,
      ...resumenBase,
      notificacionesCreadas: notificaciones.length,
      // Avisos que superaron el tope de la campanita; siguen entregándose por correo.
      notificacionesOmitidas,
      pushEnviados,
      correosEnviados,
      correosOmitidos,
      duracionMs: Date.now() - startedAt,
    };

    console.log('[CronAlertas]', JSON.stringify(resumen));
    return NextResponse.json(resumen);
  } catch (error: any) {
    console.error('[CronAlertas] Error:', error);
    return NextResponse.json({ error: error?.message ?? 'Error desconocido' }, { status: 500 });
  }
}
