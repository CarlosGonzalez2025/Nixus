import type { UserRole, AppModule, User } from '@/types';

/**
 * Lista de roles válidos del sistema.
 * Fuente única de verdad para usar en schemas Zod y lógica de negocio.
 */
export const USER_ROLES = [
  'solicitante',
  'autorizante',
  'lider_sst',
  'admin',
  'mantenimiento',
  'asesor_arl',
  'lider_regional',
] as const satisfies readonly UserRole[];

/**
 * Etiquetas cortas por rol — usadas en badges, listas de admin y sidebar.
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  solicitante: 'Ejecutante del trabajo',
  autorizante: 'Autorizante',
  lider_sst: 'Líder SST',
  admin: 'Administrador',
  mantenimiento: 'Mantenimiento / Aislador Competente',
  asesor_arl: 'Asesor ARL',
  lider_regional: 'Líder Regional',
};

/**
 * Etiquetas completas por rol.
 */
export const ROLE_LABELS_FULL: Record<UserRole, string> = {
  ...ROLE_LABELS,
  solicitante: 'Ejecutante del trabajo / Líder del equipo Ejecutante',
};

/**
 * Valor por defecto para campos de perfil sin asignar (empresa, ciudad, planta, área).
 * Fuente única de verdad: evita que distintos flujos escriban 'N/A',
 * 'Empresa no especificada' o '' de forma inconsistente.
 */
export const UNASSIGNED_PLACEHOLDER = 'N/A';

// ─── Módulos del sistema ────────────────────────────────────────────────────

export const ALL_MODULES: AppModule[] = [
  'permits',
  'permits_create',
  'hallazgos',
  'contractor_verifications',
  'users',
  'lists',
  'audit',
];

export const MODULE_LABELS: Record<AppModule, string> = {
  permits: 'Permisos de Trabajo',
  permits_create: 'Crear Permisos',
  hallazgos: 'Hallazgos SST',
  contractor_verifications: 'Verif. Contratistas',
  users: 'Gestión de Usuarios',
  lists: 'Gestión de Listas',
  audit: 'Auditoría de Datos',
};

/**
 * Devuelve true si el lider_regional tiene acceso a un módulo específico.
 * Para cualquier otro rol, siempre devuelve true.
 */
export function liderRegionalHasModule(user: Pick<User, 'role' | 'allowedModules'>, module: AppModule): boolean {
  if (user.role !== 'lider_regional') return true;
  return user.allowedModules?.includes(module) ?? false;
}

/**
 * Devuelve true si un registro está dentro del scope de un lider_regional.
 * Para cualquier otro rol, siempre devuelve true.
 * La comparación es case-insensitive en todas las dimensiones.
 */
export function isInLiderRegionalScope(
  user: Pick<User, 'role' | 'allowedEmpresas' | 'allowedPlantas' | 'allowedCiudades'>,
  record: { empresa?: string | null; planta?: string | null; ciudad?: string | null }
): boolean {
  if (user.role !== 'lider_regional') return true;

  const { allowedEmpresas, allowedPlantas, allowedCiudades } = user;

  const matchEmpresa = !allowedEmpresas?.length ||
    (!!record.empresa && allowedEmpresas.some(e => e.toLowerCase() === record.empresa!.toLowerCase()));

  const matchPlanta = !allowedPlantas?.length ||
    (!!record.planta && allowedPlantas.some(p => p.toLowerCase() === record.planta!.toLowerCase()));

  const matchCiudad = !allowedCiudades?.length ||
    (!!record.ciudad && allowedCiudades.some(c => c.toLowerCase() === record.ciudad!.toLowerCase()));

  return matchEmpresa && matchPlanta && matchCiudad;
}

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
