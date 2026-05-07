'use client';

import type { User, ContractorVerification } from '@/types';

const ALLOWED_ROLES = ['admin', 'lider_sst', 'asesor_arl'] as const;

export function useVerificationPermissions(user: User | null) {
  const canAccessModule = ALLOWED_ROLES.includes(user?.role as any);
  const isAdmin = user?.role === 'admin';
  const isAsesorARL = user?.role === 'asesor_arl';
  const isLiderSST = user?.role === 'lider_sst';

  function canViewVerification(verification: ContractorVerification): boolean {
    if (!user) return false;
    if (isAdmin) return true;
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

  const canManageTemplates = isAdmin;
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
    canCreateVerification,
  };
}
