import type { UserRole } from '@/types';

/**
 * Lista de roles válidos del sistema.
 * Fuente única de verdad para usar en schemas Zod y lógica de negocio.
 */
export const USER_ROLES = [
  'solicitante',
  'autorizante',
  'ejecutante',
  'lider_sst',
  'admin',
  'mantenimiento',
] as const satisfies readonly UserRole[];

/**
 * Etiquetas cortas por rol — usadas en badges, listas de admin y sidebar.
 * Para solicitante se muestra "Ejecutante del trabajo" (forma corta).
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  solicitante: 'Ejecutante del trabajo',
  autorizante: 'Autorizante',
  ejecutante: 'Ejecutante del Trabajo',
  lider_sst: 'Líder SST',
  admin: 'Administrador',
  mantenimiento: 'Mantenimiento / Aislador Competente',
};

/**
 * Etiquetas completas por rol — usadas en la guía, descripciones detalladas
 * y tarjetas de firma donde se requiere la descripción completa del rol.
 */
export const ROLE_LABELS_FULL: Record<UserRole, string> = {
  ...ROLE_LABELS,
  solicitante: 'Ejecutante del trabajo / Líder del equipo Ejecutante',
};

/**
 * Etiquetas de roles de firma/aprobación — incluye roles especiales
 * (coordinador_alturas, supervisor_confinado) que no son UserRole.
 */
export const SIGNATURE_ROLE_LABELS: Record<string, string> = {
  ...ROLE_LABELS_FULL,
  coordinador_alturas: 'Coordinador Alturas',
  supervisor_confinado: 'Supervisor Esp. Confinado',
};

/**
 * Devuelve la etiqueta corta de un rol (para badges y sidebar).
 */
export const getRoleName = (role?: UserRole | null): string =>
  role ? ROLE_LABELS[role] ?? 'Usuario' : 'Usuario';

/**
 * Devuelve la etiqueta completa de un rol (para la guía y descripciones).
 */
export const getRoleNameFull = (role?: UserRole | null): string =>
  role ? ROLE_LABELS_FULL[role] ?? 'Usuario' : 'Usuario';
