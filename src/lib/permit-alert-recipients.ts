// ─── Resolución de destinatarios de las alertas automáticas ───────────────────
//
// Replica el criterio de alcance de `getInvolvedUsers()` (permits/actions.ts):
// un usuario de rol recibe notificaciones de un permiso solo si su empresa Y su
// planta coinciden con las del permiso; si el usuario no tiene empresa/planta
// asignada se considera global. Los usuarios desactivados nunca reciben nada.
//
// Diferencia deliberada con actions.ts: allí la resolución dispara entre 4 y 12
// consultas a `users` POR PERMISO, lo cual es aceptable en una acción puntual
// pero desperdiciaría cientos de lecturas en un barrido masivo. Aquí el
// directorio se carga UNA sola vez por ejecución del cron y todo se resuelve
// en memoria.

import type { Permit, UserRole } from '@/types';
import type { PermitAlertAudience } from '@/lib/permit-alerts';

export interface DirectoryUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: UserRole;
  otherRoles?: UserRole[];
  empresa?: string;
  planta?: string;
  disabled?: boolean;
}

/** Construye el directorio en memoria a partir del snapshot de `users`. */
export function buildUserDirectory(
  docs: { id: string; data: () => Record<string, any> }[]
): DirectoryUser[] {
  return docs
    .map(doc => {
      const d = doc.data() || {};
      return {
        uid: doc.id,
        email: (d.email as string) || null,
        displayName: (d.displayName as string) || null,
        role: d.role as UserRole | undefined,
        otherRoles: Array.isArray(d.otherRoles) ? (d.otherRoles as UserRole[]) : undefined,
        empresa: typeof d.empresa === 'string' ? d.empresa : undefined,
        planta: typeof d.planta === 'string' ? d.planta : undefined,
        disabled: d.disabled === true,
      };
    })
    .filter(u => !u.disabled);
}

const norm = (v?: string | null) => (v || '').trim().toLowerCase();

/** ¿El usuario tiene el rol indicado, como principal o secundario? */
function tieneRol(user: DirectoryUser, role: string): boolean {
  if (user.role === role) return true;
  return Array.isArray(user.otherRoles) && user.otherRoles.includes(role as UserRole);
}

/**
 * ¿El usuario está dentro del alcance del permiso?
 * Mismo criterio que `addUsersMatchingPlant` en permits/actions.ts.
 */
function enAlcanceDelPermiso(user: DirectoryUser, permit: Permit): boolean {
  const permitPlanta = norm(permit.generalInfo?.planta);
  const permitEmpresa = norm(permit.generalInfo?.empresa);

  if (permitPlanta) {
    const userPlanta = norm(user.planta);
    if (userPlanta && userPlanta !== permitPlanta) return false;
  }
  if (permitEmpresa) {
    const userEmpresa = norm(user.empresa);
    if (userEmpresa && userEmpresa !== permitEmpresa) return false;
  }
  return true;
}

/**
 * Alcance de los administradores: solo por planta (los admin sin planta son
 * globales). Mismo criterio que `getAdminUserIds` en permits/actions.ts.
 */
function adminEnAlcance(user: DirectoryUser, permit: Permit): boolean {
  const permitPlanta = norm(permit.generalInfo?.planta);
  if (!permitPlanta) return true;
  const userPlanta = norm(user.planta);
  return !userPlanta || userPlanta === permitPlanta;
}

/**
 * Traduce los perfiles destinatarios de una alerta a UIDs concretos.
 * Devuelve UIDs únicos y siempre existentes en el directorio (activos).
 */
export function resolveAudienceUids(
  permit: Permit,
  audiences: readonly PermitAlertAudience[],
  directory: DirectoryUser[]
): string[] {
  const activos = new Set(directory.map(u => u.uid));
  const uids = new Set<string>();

  const addIfActive = (uid?: string | null) => {
    if (uid && activos.has(uid)) uids.add(uid);
  };

  for (const audience of audiences) {
    switch (audience) {
      // Quien ejecuta el trabajo: el creador del permiso y quien firmó como solicitante.
      case 'responsable':
        addIfActive(permit.createdBy);
        addIfActive(permit.approvals?.solicitante?.userId);
        break;

      // Autorizante y Líder SST: si el permiso YA tiene firmante identificado,
      // el recordatorio es suyo y no se difunde al rol completo. Solo cuando
      // nadie ha firmado todavía se avisa a todos los del alcance, porque en
      // ese momento la acción aún no tiene dueño.
      //
      // Sin esta distinción, un permiso al que le falte `generalInfo.planta`
      // no filtra por alcance y alcanza a TODOS los autorizantes y líderes SST
      // de la empresa. Medido en producción: un solo permiso llegaba a 299
      // destinatarios, y el total del barrido a 44.067 entregas.
      case 'autorizante':
      case 'lider_sst': {
        const firmante = permit.approvals?.[audience]?.userId;
        if (firmante && activos.has(firmante)) {
          uids.add(firmante);
          break;
        }
        directory
          .filter(u => tieneRol(u, audience) && enAlcanceDelPermiso(u, permit))
          .forEach(u => uids.add(u.uid));
        break;
      }

      case 'admin':
        directory
          .filter(u => u.role === 'admin' && adminEnAlcance(u, permit))
          .forEach(u => uids.add(u.uid));
        break;

      // Roles especializados que firman la aprobación del permiso. Solo se les
      // escribe cuando el permiso realmente exige su firma (lo decide la regla,
      // no este resolvedor).
      case 'mantenimiento':
      case 'coordinador_alturas':
      case 'supervisor_confinado':
        addIfActive(permit.approvals?.[audience]?.userId);
        directory
          .filter(u => tieneRol(u, audience) && enAlcanceDelPermiso(u, permit))
          .forEach(u => uids.add(u.uid));
        break;
    }
  }

  return Array.from(uids);
}

/**
 * Correos de los destinatarios, excluyendo administradores.
 *
 * Mantiene la convención vigente del sistema (`getEmailsForNonAdminUsers` en
 * permits/actions.ts): los administradores quedan fuera de los correos de
 * permisos para no saturarlos. Siguen recibiendo la alerta in-app y push.
 */
export function emailsParaNotificar(uids: string[], directory: DirectoryUser[]): string[] {
  const porUid = new Map(directory.map(u => [u.uid, u]));
  const emails = uids
    .map(uid => porUid.get(uid))
    .filter((u): u is DirectoryUser => Boolean(u) && u!.role !== 'admin')
    .map(u => u.email)
    .filter((e): e is string => Boolean(e));
  return Array.from(new Set(emails));
}
