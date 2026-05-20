'use client';

import type { User, ContractorVerification, ChecklistTemplate } from '@/types';
import { isInLiderRegionalScope } from '@/lib/role-config';

const ALLOWED_ROLES = ['admin', 'lider_sst', 'asesor_arl', 'lider_regional'] as const;

export function useVerificationPermissions(user: User | null) {
  const isLiderRegional = user?.role === 'lider_regional';
  const canAccessModule = ALLOWED_ROLES.includes(user?.role as any) &&
    (!isLiderRegional || (user?.allowedModules?.includes('contractor_verifications') ?? false));
  const isAdmin = user?.role === 'admin';
  const isAsesorARL = user?.role === 'asesor_arl';
  const isLiderSST = user?.role === 'lider_sst';

  function canViewVerification(verification: ContractorVerification): boolean {
    if (!user) return false;
    if (isAdmin) return true;
    if (isLiderRegional) {
      return isInLiderRegionalScope(user, {
        empresa: verification.companyName,
        planta: verification.plantId,
        ciudad: verification.city,
      });
    }
    if (isAsesorARL) return verification.createdBy === user.uid;
    if (isLiderSST) return verification.plantId === user.planta;
    return false;
  }

  function canEditVerification(verification: ContractorVerification): boolean {
    if (!canViewVerification(verification)) return false;
    return ['DRAFT', 'IN_PROGRESS'].includes(verification.status);
  }

  function canCloseVerification(verification: ContractorVerification): boolean {
    return canViewVerification(verification) && verification.status !== 'CLOSED';
  }

  // Admin y asesor_arl pueden acceder al módulo de plantillas.
  // La edición de una plantilla específica se valida con canEditTemplate().
  const canManageTemplates = isAdmin || isAsesorARL;

  // Admin puede editar cualquier plantilla.
  // Asesor ARL solo puede editar las que él creó.
  function canEditTemplate(template: ChecklistTemplate): boolean {
    if (!user) return false;
    if (isAdmin) return true;
    if (isAsesorARL) return template.createdBy === user.uid;
    return false;
  }

  const canCreateVerification = canAccessModule;

  return {
    canAccessModule,
    isAdmin,
    isAsesorARL,
    isLiderSST,
    canViewVerification,
    canEditVerification,
    canCloseVerification,
    canManageTemplates,
    canEditTemplate,
    canCreateVerification,
  };
}
