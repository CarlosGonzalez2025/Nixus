// ─── Fuente única de verdad para el agrupamiento de estados de permisos ───────
//
// Tanto el módulo de Permisos (permits/page.tsx, sus pestañas) como las tarjetas
// del Dashboard (dashboard/page.tsx) deben contar EXACTAMENTE los mismos permisos
// por categoría. Antes cada vista definía su propio criterio y se desincronizaban
// (ej: el Dashboard mostraba "En Ejecución" = solo en_ejecucion, mientras la
// pestaña "Activos" = aprobado + en_ejecucion + suspendido). Centralizar aquí evita
// que vuelvan a divergir.

/** Categorías unificadas = pestañas del módulo de Permisos de Trabajo. */
export type UnifiedPermitStatus =
  | 'borrador'
  | 'pendiente_revision'
  | 'activos'
  | 'cerrado'
  | 'cancelado';

/** Definición de cada pestaña/tarjeta y su etiqueta visible. */
export const PERMIT_TABS: { key: UnifiedPermitStatus; label: string }[] = [
  { key: 'borrador', label: 'Borrador' },
  { key: 'pendiente_revision', label: 'Pendiente' },
  { key: 'activos', label: 'Activos' },
  { key: 'cerrado', label: 'Cerrado' },
  { key: 'cancelado', label: 'Cancelado' },
];

/**
 * ¿El estado crudo del permiso (`permit.status`) pertenece a la categoría/pestaña
 * unificada indicada? Es el criterio compartido por el Dashboard y el módulo.
 */
export function matchesUnifiedStatus(
  status: string | undefined | null,
  tab: UnifiedPermitStatus,
): boolean {
  switch (tab) {
    case 'activos':
      return status === 'aprobado' || status === 'en_ejecucion' || status === 'suspendido';
    case 'cancelado':
      return status === 'cancelado' || status === 'rechazado';
    default:
      return status === tab;
  }
}
