// ─── Motor de reglas de alertas tempranas de permisos ─────────────────────────
//
// Módulo PURO: no toca Firestore, no envía nada, no depende del entorno servidor.
// Recibe un permiso + el instante actual y devuelve qué alertas corresponden.
// Esto permite probarlo aisladamente y garantiza que el cron no pueda alterar
// la lógica de negocio existente (solo lee).
//
// Contexto del modelo de datos (verificado contra el sistema en producción):
//   · Los permisos se ejecutan en un RANGO CONTINUO de días:
//     generalInfo.validFrom → generalInfo.validUntil (máx. 7 días).
//     Ambos son cadenas `datetime-local` ("yyyy-MM-ddTHH:mm") en hora local de
//     Colombia, SIN zona horaria. Por eso todas las comparaciones se hacen
//     contra un "ahora" expresado también como hora de pared de Bogotá
//     (ver nowInTimeZone). Nunca se convierte a UTC.
//   · El día N del permiso es validFrom + (N-1) días. El índice del arreglo
//     `validacion.responsable[i]` / `validacion.autoridad[i]` ES el día (0-based).
//     Misma derivación que usa la UI en permits/[id]/page.tsx.
//   · Solo 4 anexos tienen validación diaria: Alturas, Confinados, Izaje y
//     Excavaciones. Los permisos que no incluyen ninguno de esos tipos de
//     trabajo (p. ej. solo General / Caliente / Energías) únicamente generan
//     las alertas de vigencia y de vencimiento sin cierre.

import { addDays, addHours, differenceInCalendarDays, format, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { getHotWorkClosureBlockingReasons } from '@/lib/permit-closure-rules';
import type { Permit } from '@/types';

// ─── Configuración ────────────────────────────────────────────────────────────

/** Zona horaria de operación (Italcol · Colombia). */
export const TIME_ZONE = 'America/Bogota';

/** Estados en ejecución: el trabajo ya puede realizarse. */
export const ESTADOS_ACTIVOS = ['aprobado', 'en_ejecucion', 'suspendido'] as const;

/** Estado previo: el permiso espera firmas de aprobación para poder ejecutarse. */
export const ESTADOS_PENDIENTE_APROBACION = ['pendiente_revision'] as const;

/**
 * Todos los estados que el cron vigila. Los borradores quedan fuera a propósito:
 * son trabajo privado del autor y todavía no comprometen a nadie más.
 */
export const ESTADOS_VIGILADOS = [...ESTADOS_ACTIVOS, ...ESTADOS_PENDIENTE_APROBACION] as const;

/**
 * Horas antes de `validUntil` en las que se avisa "la jornada está por terminar".
 * Esta regla solo es efectiva si el cron corre con frecuencia horaria; con un
 * cron diario el aviso equivalente lo cubre `ultimo_dia`.
 */
export const HORAS_AVISO_FIN_JORNADA = 4;

/**
 * Margen de cortesía tras la hora de inicio de cada jornada antes de reclamar
 * la firma de apertura del día. Evita avisar a las 06:00 por un trabajo que
 * arranca a las 08:00.
 */
export const HORAS_GRACIA_APERTURA = 2;

/** Días de retraso a partir de los cuales se suma al Líder SST. */
export const ESCALAMIENTO_SST_DIAS = 3;
/** Días de retraso a partir de los cuales se suma a los administradores. */
export const ESCALAMIENTO_ADMIN_DIAS = 7;
/** Tope de insistencia: pasado este retraso se deja de notificar el vencimiento. */
export const MAX_DIAS_ALERTA_VENCIDO = 15;

/** Tope defensivo por si un permiso quedara con fechas corruptas. */
const MAX_DIAS_PERMISO = 31;

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type PermitAlertKind =
  // Vigencia
  | 'ultimo_dia'
  | 'jornada_por_terminar'
  | 'permiso_vencido_sin_cerrar'
  // Firmas diarias (solo anexos con validación diaria)
  | 'firma_apertura_pendiente'
  | 'validacion_autoridad_pendiente'
  | 'firma_cierre_diario_pendiente'
  // Pasos que bloquean el cierre definitivo del permiso
  | 'cierre_trabajadores_pendiente'
  | 'cierre_responsable_pendiente'
  | 'cierre_autoridad_pendiente'
  | 'checklist_caliente_pendiente'
  // Firmas de aprobación que impiden que el permiso llegue a ejecutarse
  | 'aprobacion_pendiente';

/** Perfiles destinatarios. La resolución a UIDs vive en permit-alert-recipients.ts */
export type PermitAlertAudience =
  | 'responsable'
  | 'autorizante'
  | 'lider_sst'
  | 'admin'
  | 'mantenimiento'
  | 'coordinador_alturas'
  | 'supervisor_confinado';

export type PermitAlertSeverity = 'info' | 'warning' | 'critical';

export interface PermitAlert {
  kind: PermitAlertKind;
  /** Clave de deduplicación; se persiste en `permit.alertas` para no repetir. */
  key: string;
  /** Etiqueta corta (listados, correo). */
  title: string;
  /** Mensaje completo (notificación in-app, push, correo). */
  message: string;
  severity: PermitAlertSeverity;
  audiences: PermitAlertAudience[];
  /** Día del permiso al que aplica (1-based), cuando corresponde. */
  dia?: number;
  /** Anexo al que aplica, cuando corresponde. */
  anexoLabel?: string;
}

interface AnexoConValidacion {
  key: 'anexoAltura' | 'anexoConfinado' | 'anexoIzaje' | 'anexoExcavaciones';
  workType: 'alturas' | 'confinado' | 'izaje' | 'excavacion';
  label: string;
}

/** Únicos anexos que manejan firmas diarias (ver types/index.ts). */
export const ANEXOS_CON_VALIDACION_DIARIA: readonly AnexoConValidacion[] = [
  { key: 'anexoAltura', workType: 'alturas', label: 'Alturas' },
  { key: 'anexoConfinado', workType: 'confinado', label: 'Espacios Confinados' },
  { key: 'anexoIzaje', workType: 'izaje', label: 'Izaje de Cargas' },
  { key: 'anexoExcavaciones', workType: 'excavacion', label: 'Excavaciones' },
] as const;

interface AprobacionRequerida {
  key: 'solicitante' | 'autorizante' | 'lider_sst' | 'mantenimiento' | 'coordinador_alturas' | 'supervisor_confinado';
  label: string;
  /** A quién se le reclama esta firma. */
  audience: PermitAlertAudience;
  /** ¿Este permiso exige la firma? Mismo criterio que checkAllRequiredSignaturesComplete(). */
  requerida: (permit: Permit) => boolean;
}

/**
 * Firmas de aprobación que un permiso necesita para poder ejecutarse, en el
 * mismo orden en que se piden en la UI. Réplica exacta de las condiciones de
 * `checkAllRequiredSignaturesComplete()` en permits/actions.ts.
 */
export const APROBACIONES_REQUERIDAS: readonly AprobacionRequerida[] = [
  { key: 'solicitante', label: 'Ejecutante del Trabajo', audience: 'responsable', requerida: () => true },
  { key: 'coordinador_alturas', label: 'Coordinador de Trabajo en Alturas', audience: 'coordinador_alturas',
    requerida: p => Boolean(p.trabajoAlturas || p.selectedWorkTypes?.alturas) },
  { key: 'supervisor_confinado', label: 'Supervisor de Espacios Confinados', audience: 'supervisor_confinado',
    requerida: p => Boolean(p.espaciosConfinados || p.selectedWorkTypes?.confinado) },
  { key: 'mantenimiento', label: 'Mantenimiento / Aislador Competente', audience: 'mantenimiento',
    requerida: p => Boolean(p.controlEnergia || p.selectedWorkTypes?.energia) },
  { key: 'lider_sst', label: 'Líder SST', audience: 'lider_sst', requerida: p => p.isSSTSignatureRequired === true },
  { key: 'autorizante', label: 'Autoridad del Área', audience: 'autorizante', requerida: () => true },
] as const;

// ─── Utilidades de fecha ──────────────────────────────────────────────────────

/**
 * Convierte un instante real a la hora de pared de la zona indicada, devuelto
 * en un Date cuyos campos LOCALES representan esa hora. Sirve para comparar y
 * formatear contra los `datetime-local` que guarda el formulario (que tampoco
 * llevan zona), sin depender de la zona horaria del servidor.
 */
export function toZonedWallClock(instant: Date, timeZone: string = TIME_ZONE): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);

  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? '0');
  return new Date(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
}

/** "Ahora" como hora de pared de la zona indicada. */
export function nowInTimeZone(timeZone: string = TIME_ZONE): Date {
  return toZonedWallClock(new Date(), timeZone);
}

/**
 * Desfase de una zona horaria (en ms) para un instante dado.
 * Se calcula con Intl, así que respeta automáticamente el horario de verano
 * de cualquier zona (Colombia no lo aplica, pero el helper es genérico).
 */
function zoneOffsetMs(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);

  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? '0');
  const comoSiFueraUTC = Date.UTC(
    get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second')
  );
  return comoSiFueraUTC - instant.getTime();
}

/**
 * Instante UTC que corresponde a la medianoche (00:00) del día en curso de la
 * zona indicada, tomando `reference` como "ahora".
 *
 * Se resuelve en dos pasadas porque el desfase se evalúa sobre un instante y
 * la medianoche local puede caer en un desfase distinto (cambios de horario).
 */
export function getZonedDayStartUTC(reference: Date, timeZone: string = TIME_ZONE): Date {
  const fechaLocal = reference.toLocaleDateString('en-CA', { timeZone });
  const [year, month, day] = fechaLocal.split('-').map(Number);

  const medianocheComoUTC = Date.UTC(year, month - 1, day, 0, 0, 0, 0);
  let instante = new Date(medianocheComoUTC - zoneOffsetMs(reference, timeZone));
  // Segunda pasada: recalcular el desfase ya sobre el instante estimado.
  instante = new Date(medianocheComoUTC - zoneOffsetMs(instante, timeZone));
  return instante;
}

function parseWallClock(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const fechaCorta = (d: Date) => format(d, "d 'de' MMMM", { locale: es });
const fechaHora = (d: Date) => format(d, "d 'de' MMMM 'a las' HH:mm", { locale: es });
const claveFecha = (d: Date) => format(d, 'yyyy-MM-dd');

/** "1 hora" / "3 horas" — concordancia correcta en los mensajes. */
const plural = (n: number, singular: string, pluralForm: string) =>
  `${n} ${n === 1 ? singular : pluralForm}`;

/**
 * Tiempo transcurrido en lenguaje natural.
 *
 * Se calcula sobre el tiempo REAL, no sobre cruces de medianoche: un permiso que
 * venció a las 17:00 y se revisa a las 06:00 del día siguiente lleva 13 horas de
 * retraso, no "1 día". `differenceInCalendarDays` sirve para decidir CUÁNDO
 * avisar (una vez por día), pero no para redactar cuánto se lleva de retraso.
 */
export function formatearRetraso(desde: Date, hasta: Date): string {
  const ms = Math.max(0, hasta.getTime() - desde.getTime());
  const horas = Math.floor(ms / 3_600_000);

  if (horas < 1) {
    return plural(Math.max(1, Math.floor(ms / 60_000)), 'minuto', 'minutos');
  }
  if (horas < 24) {
    return plural(horas, 'hora', 'horas');
  }

  const dias = Math.floor(horas / 24);
  const restoHoras = horas % 24;
  const textoDias = plural(dias, 'día', 'días');
  return restoHoras === 0 ? textoDias : `${textoDias} y ${plural(restoHoras, 'hora', 'horas')}`;
}

export interface PermitWindow {
  from: Date;
  until: Date;
  /** Cantidad de días calendario que abarca el permiso (mínimo 1). */
  duration: number;
}

/**
 * Ventana de ejecución del permiso. Devuelve null si las fechas faltan o son
 * inválidas: en ese caso no se emite ninguna alerta (se prefiere el silencio
 * antes que un aviso incorrecto).
 */
export function getPermitWindow(permit: Pick<Permit, 'generalInfo'>): PermitWindow | null {
  const from = parseWallClock(permit?.generalInfo?.validFrom);
  const until = parseWallClock(permit?.generalInfo?.validUntil);
  if (!from || !until || until < from) return null;

  const duration = Math.min(Math.max(differenceInCalendarDays(until, from) + 1, 1), MAX_DIAS_PERMISO);
  return { from, until, duration };
}

/** Fecha/hora de inicio del día N (1-based) del permiso, conservando la hora de arranque. */
export function getPermitDayStart(window: PermitWindow, dia: number): Date {
  return addDays(window.from, Math.max(0, dia - 1));
}

/** ¿El permiso exige firmas diarias en algún anexo? */
export function tieneValidacionDiaria(permit: Permit): boolean {
  return ANEXOS_CON_VALIDACION_DIARIA.some(a => Boolean(permit?.selectedWorkTypes?.[a.workType]));
}

// ─── Motor de reglas ──────────────────────────────────────────────────────────

const esEstadoActivo = (status: unknown): boolean =>
  typeof status === 'string' && (ESTADOS_ACTIVOS as readonly string[]).includes(status);

const esPendienteAprobacion = (status: unknown): boolean =>
  typeof status === 'string' && (ESTADOS_PENDIENTE_APROBACION as readonly string[]).includes(status);

/**
 * Evalúa todas las alertas que corresponden a un permiso en un instante dado.
 *
 * No consulta el registro de alertas ya enviadas: el filtrado por duplicados lo
 * hace el llamador contra `permit.alertas` (así esta función queda determinista
 * y fácil de probar).
 */
export function evaluatePermitAlerts(permit: Permit, now: Date): PermitAlert[] {
  const alerts: PermitAlert[] = [];
  if (!permit) return alerts;

  const window = getPermitWindow(permit);
  if (!window) return alerts;

  const { from, until, duration } = window;
  const numero = permit.number ? `#${permit.number}` : 'de trabajo';
  const claveHoy = claveFecha(now);

  // Índice del día en curso (0-based). Negativo ⇒ el permiso aún no arranca.
  const todayIdx = differenceInCalendarDays(now, from);
  const diasVencido = differenceInCalendarDays(now, until);
  const horasRestantes = (until.getTime() - now.getTime()) / 3_600_000;

  // ── Regla 0 · Firmas de aprobación que impiden ejecutar el permiso ──────────
  // Un permiso que ya debía estar en marcha pero sigue en revisión está frenado
  // por alguien concreto. Se le reclama a ESE rol, no a todo el mundo.
  if (esPendienteAprobacion(permit.status)) {
    if (todayIdx < 0 || todayIdx > MAX_DIAS_ALERTA_VENCIDO) return alerts;

    for (const aprobacion of APROBACIONES_REQUERIDAS) {
      if (!aprobacion.requerida(permit)) continue;
      if (permit.approvals?.[aprobacion.key]?.status === 'aprobado') continue;

      alerts.push({
        kind: 'aprobacion_pendiente',
        key: `aprobacion:${aprobacion.key}:${claveHoy}`,
        title: `Falta su firma de aprobación (${aprobacion.label})`,
        message:
          `El permiso ${numero} estaba programado para iniciar el ${fechaHora(from)} y sigue sin poder ejecutarse: ` +
          `falta la firma de aprobación de ${aprobacion.label}. Mientras no se registre, el permiso no avanza.`,
        severity: todayIdx === 0 ? 'warning' : 'critical',
        audiences: [aprobacion.audience],
      });
    }
    return alerts;
  }

  // Borradores, cerrados, cancelados y rechazados no generan alertas.
  if (!esEstadoActivo(permit.status)) return alerts;

  // ── Ventana de relevancia ───────────────────────────────────────────────────
  // Un permiso que venció hace mucho ya no es accionable con un recordatorio
  // diario: reclamar "la firma del día 3" de un trabajo de hace tres meses no
  // provoca una acción, solo ruido que hace que se ignoren los avisos útiles.
  //
  // Medido contra producción antes de poner este tope: de 1.463 permisos
  // vigilados, 1.301 ya habían vencido —el más antiguo hacía 253 días— y el
  // motor generaba 4.944 alertas, algunas con fecha de noviembre de 2025.
  // El represamiento histórico es un problema real, pero se atiende con un
  // reporte, no goteando recordatorios diarios a 219 personas.
  if (diasVencido > MAX_DIAS_ALERTA_VENCIDO) return alerts;

  // ── Regla 1 · Último día de vigencia ────────────────────────────────────────
  // Se dispara una sola vez el día en que vence el permiso, sin importar la hora,
  // de modo que funciona igual con cron diario o horario.
  if (todayIdx >= 0 && todayIdx === duration - 1 && diasVencido === 0) {
    alerts.push({
      kind: 'ultimo_dia',
      key: `ultimo_dia:${claveFecha(now)}`,
      title: 'Último día de vigencia',
      message:
        `El permiso ${numero} finaliza hoy a las ${format(until, 'HH:mm')}. ` +
        `Recuerde completar las firmas y registrar el cierre antes de esa hora.`,
      severity: 'warning',
      audiences: ['responsable', 'autorizante'],
    });
  }

  // ── Regla 2 · La jornada está por terminar ──────────────────────────────────
  // Aviso de proximidad al fin de la vigencia. Requiere cron horario para ser
  // realmente útil; con cron diario rara vez cae dentro de la ventana.
  if (horasRestantes > 0 && horasRestantes <= HORAS_AVISO_FIN_JORNADA) {
    const restante = horasRestantes < 1
      ? plural(Math.max(1, Math.round(horasRestantes * 60)), 'minuto', 'minutos')
      : plural(Math.round(horasRestantes), 'hora', 'horas');
    alerts.push({
      kind: 'jornada_por_terminar',
      key: `jornada_fin:${claveFecha(now)}`,
      title: 'Jornada por terminar',
      message:
        `Quedan ${restante} para que finalice la vigencia del permiso ${numero} ` +
        `(${fechaHora(until)}). Verifique las firmas pendientes y proceda con el cierre.`,
      severity: 'warning',
      audiences: ['responsable', 'autorizante'],
    });
  }

  // ── Regla 3 · Permiso vencido y sin cerrar ──────────────────────────────────
  // Aplica a TODOS los permisos, tengan o no validación diaria. Se emite al día
  // siguiente del vencimiento (diasVencido >= 1) y se repite a diario con
  // escalamiento progresivo, con tope para no convertirse en ruido perpetuo.
  if (diasVencido >= 1 && diasVencido <= MAX_DIAS_ALERTA_VENCIDO) {
    const audiences: PermitAlertAudience[] = ['responsable', 'autorizante'];
    if (diasVencido >= ESCALAMIENTO_SST_DIAS) audiences.push('lider_sst');
    if (diasVencido >= ESCALAMIENTO_ADMIN_DIAS) audiences.push('admin');

    alerts.push({
      kind: 'permiso_vencido_sin_cerrar',
      key: `vencido:${claveFecha(now)}`,
      title: 'Permiso vencido sin cerrar',
      message:
        `El permiso ${numero} venció el ${fechaHora(until)} y continúa sin cerrarse: ` +
        `${formatearRetraso(until, now)} de retraso. Debe registrarse el cierre o la cancelación.`,
      severity: 'critical',
      audiences,
    });
  }

  // ── Reglas 4-7 · Pasos concretos que impiden cerrar el permiso ──────────────
  // El aviso de "permiso vencido" dice QUE está abierto; estas reglas dicen POR
  // QUÉ y, sobre todo, QUIÉN debe resolverlo. Cada una se dirige exclusivamente
  // al rol dueño de esa firma. Las condiciones replican las del botón de cierre
  // en permits/[id]/page.tsx, para que la alerta y el bloqueo nunca discrepen.
  if (diasVencido >= 1 && diasVencido <= MAX_DIAS_ALERTA_VENCIDO) {
    const trabajadoresSinFirma = (permit.workers ?? []).filter(w => !w?.firmaCierre).length;
    if (trabajadoresSinFirma > 0) {
      alerts.push({
        kind: 'cierre_trabajadores_pendiente',
        key: `cierre_trabajadores:${claveHoy}`,
        title: trabajadoresSinFirma === 1
          ? 'Falta la firma de cierre de un trabajador'
          : 'Faltan firmas de cierre de los trabajadores',
        message:
          `Permiso ${numero}: ${plural(trabajadoresSinFirma, 'trabajador', 'trabajadores')} ` +
          `${trabajadoresSinFirma === 1 ? 'aún no firma' : 'aún no firman'} el cierre. ` +
          `Sin esas firmas el permiso no se puede cerrar.`,
        severity: 'critical',
        audiences: ['responsable'],
      });
    }

    if (!permit.closure?.responsable?.firma) {
      alerts.push({
        kind: 'cierre_responsable_pendiente',
        key: `cierre_responsable:${claveHoy}`,
        title: 'Falta su firma de cierre (Responsable del Trabajo)',
        message:
          `Permiso ${numero}: no se ha registrado la firma de cierre del Responsable del Trabajo. ` +
          `Es uno de los pasos que faltan para cerrar el permiso.`,
        severity: 'critical',
        audiences: ['responsable'],
      });
    }

    if (!permit.closure?.autoridad?.firma) {
      alerts.push({
        kind: 'cierre_autoridad_pendiente',
        key: `cierre_autoridad:${claveHoy}`,
        title: 'Falta su firma de cierre (Autoridad del Área)',
        message:
          `Permiso ${numero}: no se ha registrado la firma de cierre de la Autoridad del Área. ` +
          `Es uno de los pasos que faltan para cerrar el permiso.`,
        severity: 'critical',
        audiences: ['autorizante'],
      });
    }

    if (permit.selectedWorkTypes?.caliente) {
      const motivos = getHotWorkClosureBlockingReasons(permit.closure);
      if (motivos.length > 0) {
        alerts.push({
          kind: 'checklist_caliente_pendiente',
          key: `checklist_caliente:${claveHoy}`,
          title: 'Checklist de trabajo en caliente sin completar',
          message:
            `Permiso ${numero}: el checklist de cierre de trabajo en caliente tiene ` +
            `${plural(motivos.length, 'punto', 'puntos')} sin resolver y eso bloquea el cierre del permiso.`,
          severity: 'critical',
          audiences: ['responsable'],
        });
      }
    }
  }

  // ── Reglas 8-10 · Firmas diarias ────────────────────────────────────────────
  // Solo para permisos con anexos que llevan validación diaria y que ya iniciaron.
  if (todayIdx >= 0) {
    const ultimoDiaEvaluable = Math.min(todayIdx, duration - 1);

    for (const anexo of ANEXOS_CON_VALIDACION_DIARIA) {
      if (!permit.selectedWorkTypes?.[anexo.workType]) continue;

      const validacion = (permit as Record<string, any>)[anexo.key]?.validacion;

      for (let idx = 0; idx <= ultimoDiaEvaluable; idx++) {
        const dia = idx + 1;
        const inicioDia = addDays(from, idx);
        const fechaDia = claveFecha(inicioDia);

        const responsable = validacion?.responsable?.[idx];
        const autoridad = validacion?.autoridad?.[idx];

        // El día ya transcurrió por completo (o es el último y el permiso venció).
        const diaTranscurrido = idx < todayIdx || (idx === duration - 1 && now > until);
        // El día está en curso y ya pasó el margen de cortesía para firmar apertura.
        const aperturaExigible =
          diaTranscurrido || (idx === todayIdx && now >= addHours(inicioDia, HORAS_GRACIA_APERTURA));

        // Regla 4 · Falta la firma de apertura del responsable.
        if (aperturaExigible && !responsable?.firma) {
          alerts.push({
            kind: 'firma_apertura_pendiente',
            key: `firma_apertura:${anexo.key}:${fechaDia}`,
            title: 'Firma de apertura pendiente',
            message:
              `Permiso ${numero} · Anexo ${anexo.label}: no se ha registrado la firma de ` +
              `apertura del responsable para el día ${dia} (${fechaCorta(inicioDia)}).`,
            severity: 'warning',
            // Sin el Líder SST a propósito: es una acción del responsable, y
            // difundirla a la supervisión de toda la planta genera mucho ruido
            // sin habilitar ninguna acción. El SST sigue recibiendo el
            // escalamiento de permisos vencidos a partir del día 3.
            audiences: ['responsable'],
            dia,
            anexoLabel: anexo.label,
          });
        }

        // Regla 5 · El autorizante no registró la validación diaria.
        if (aperturaExigible && !autoridad?.firma) {
          alerts.push({
            kind: 'validacion_autoridad_pendiente',
            key: `validacion_autoridad:${anexo.key}:${fechaDia}`,
            title: 'Validación diaria del autorizante pendiente',
            message:
              `Permiso ${numero} · Anexo ${anexo.label}: la autoridad del área no ha firmado ` +
              `la validación diaria del día ${dia} (${fechaCorta(inicioDia)}).`,
            severity: 'warning',
            audiences: ['autorizante', 'responsable'],
            dia,
            anexoLabel: anexo.label,
          });
        }

        // Regla 6 · Falta la firma de cierre diario del responsable.
        // Solo se reclama sobre días ya terminados y que sí tuvieron apertura:
        // un día sin apertura ya se reportó en la Regla 4, no se duplica el aviso.
        if (diaTranscurrido && responsable?.firma && !responsable?.firmaCierre) {
          alerts.push({
            kind: 'firma_cierre_diario_pendiente',
            key: `firma_cierre_diario:${anexo.key}:${fechaDia}`,
            title: 'Firma de cierre diario pendiente',
            message:
              `Permiso ${numero} · Anexo ${anexo.label}: el día ${dia} ` +
              `(${fechaCorta(inicioDia)}) quedó abierto sin la firma de cierre del responsable.`,
            severity: 'warning',
            audiences: ['responsable'],
            dia,
            anexoLabel: anexo.label,
          });
        }
      }
    }
  }

  return alerts;
}

/** Descarta las alertas cuya clave ya fue notificada anteriormente. */
export function filtrarAlertasNuevas(permit: Permit, alerts: PermitAlert[]): PermitAlert[] {
  const enviadas = (permit as Record<string, any>)?.alertas ?? {};
  return alerts.filter(a => !enviadas[a.key]);
}

/** Severidad más alta de un conjunto de alertas. */
export function severidadMaxima(alerts: PermitAlert[]): PermitAlertSeverity {
  if (alerts.some(a => a.severity === 'critical')) return 'critical';
  if (alerts.some(a => a.severity === 'warning')) return 'warning';
  return 'info';
}
