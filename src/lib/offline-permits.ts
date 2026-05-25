'use client';

/**
 * Operaciones de permisos para modo OFFLINE.
 *
 * Cuando el dispositivo no tiene conexión, estas funciones escriben directamente
 * al SDK de Firestore en el cliente. El SDK los encola en IndexedDB y los sincroniza
 * automáticamente con el servidor cuando se recupera la red.
 *
 * Las notificaciones (emails, mensajes in-app) NO se pueden enviar offline porque
 * requieren el servidor. Se encolan en offline-queue.ts y se procesan al reconectar
 * mediante el hook useOfflineSync → Server Action processOfflineQueue.
 *
 * Flujo:
 * Online  → Server Action (validación servidor + Firestore Admin + notificaciones)
 * Offline → cliente escribe a Firestore (encolado) + enqueue notificación diferida
 *           ↓ al reconectar
 *           Firestore SDK sincroniza el write → useOfflineSync envía notificaciones
 */

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { enqueueNotification } from '@/lib/offline-queue';
import type { Permit, UserRole } from '@/types';

// ─── Tipos auxiliares ─────────────────────────────────────────────────────────

type OfflineUser = {
  uid: string;
  displayName: string | null;
  role?: UserRole;
  empresa?: string;
  planta?: string;
};

type OfflineCreateResult =
  | { success: true; permitId: string; permitNumber: string; offline: true }
  | { success: false; error: string };

type OfflineSignResult =
  | { success: true; permitId: string; offline: true }
  | { success: false; error: string };

// ─── Utilidades internas ──────────────────────────────────────────────────────

/** Genera un número de permiso localmente. Mismo formato que el Server Action. */
function generateOfflinePermitNumber(docId: string): string {
  return `PT-${Date.now()}-${docId.substring(0, 6).toUpperCase()}`;
}

/**
 * Verifica si todas las firmas requeridas están completas (lógica espejada del Server Action).
 * Se usa para calcular la auto-transición a 'en_ejecucion' offline.
 */
function requiresMaintenanceSignature(permit: Partial<Permit>): boolean {
  return permit.controlEnergia === true || permit.selectedWorkTypes?.energia === true;
}

function allRequiredSignaturesComplete(permit: Partial<Permit>): boolean {
  const approvals = permit.approvals;
  if (!approvals) return false;
  if (approvals.solicitante?.status !== 'aprobado') return false;
  if (approvals.autorizante?.status !== 'aprobado') return false;
  if ((permit.trabajoAlturas || permit.selectedWorkTypes?.alturas) &&
      approvals.coordinador_alturas?.status !== 'aprobado') return false;
  if ((permit.espaciosConfinados || permit.selectedWorkTypes?.confinado) &&
      approvals.supervisor_confinado?.status !== 'aprobado') return false;
  if (requiresMaintenanceSignature(permit) && approvals.mantenimiento?.status !== 'aprobado') return false;
  if (permit.isSSTSignatureRequired && approvals.lider_sst?.status !== 'aprobado') return false;
  return true;
}

// ─── Operaciones públicas ─────────────────────────────────────────────────────

/**
 * Crea un permiso de trabajo mientras el dispositivo está offline.
 * El documento queda en la cola de Firestore y se sincroniza al reconectar.
 */
export async function createPermitOffline(
  permitData: Omit<Permit, 'id' | 'createdAt' | 'number'>,
  user: OfflineUser
): Promise<OfflineCreateResult> {
  try {
    const initialApprovals = {
      solicitante: { status: 'pendiente' as const },
      autorizante: { status: 'pendiente' as const },
      mantenimiento: { status: 'pendiente' as const },
      lider_sst: { status: 'pendiente' as const },
      coordinador_alturas: { status: 'pendiente' as const },
      supervisor_confinado: { status: 'pendiente' as const },
    };

    const payload = {
      ...permitData,
      status: 'pendiente_revision' as const,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      user: {
        displayName: user.displayName,
        email: null,
        photoURL: null,
      },
      approvals: initialApprovals,
      trabajoAlturas: permitData.trabajoAlturas ?? false,
      isSSTSignatureRequired: permitData.isSSTSignatureRequired ?? false,
      closure: {},
      // Marca para que el servidor sepa que debe procesar notificaciones al sincronizar
      offlinePendingSync: true,
    };

    const docRef = await addDoc(collection(db, 'permits'), payload);
    const permitNumber = generateOfflinePermitNumber(docRef.id);
    await updateDoc(docRef, { number: permitNumber, offlinePendingSync: true });

    // Encolar notificación diferida
    await enqueueNotification({
      permitId: docRef.id,
      permitNumber,
      type: 'permit_created',
      message: `Se creó un nuevo permiso de trabajo: #${permitNumber}`,
      triggeredBy: { uid: user.uid, displayName: user.displayName },
    });

    return { success: true, permitId: docRef.id, permitNumber, offline: true };
  } catch (error: any) {
    console.error('[Offline] Error al crear permiso:', error);
    return { success: false, error: error.message || 'No se pudo crear el permiso offline.' };
  }
}

/**
 * Registra la firma del solicitante en un permiso mientras está offline.
 * Espeja la lógica del Server Action addSignatureAndNotify para el rol 'solicitante'.
 */
export async function addSignatureOffline(
  permitId: string,
  role: 'solicitante' | 'autorizante' | 'lider_sst' | 'mantenimiento' | 'coordinador_alturas' | 'supervisor_confinado',
  signatureDataUrl: string,
  user: OfflineUser,
  comments?: string
): Promise<OfflineSignResult> {
  try {
    const docRef = doc(db, 'permits', permitId);

    // Leer del caché local (Firestore SDK retorna datos locales cuando offline)
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return { success: false, error: 'Permiso no encontrado en el caché local.' };
    }

    const permitData = { id: snap.id, ...snap.data() } as Permit;

    const approvalData = {
      status: 'aprobado' as const,
      firmaApertura: signatureDataUrl,
      userName: user.displayName,
      userId: user.uid,
      signedAt: serverTimestamp(),
      userRole: user.role,
      userEmpresa: user.empresa ?? 'N/A',
      comments: comments ?? '',
    };

    const updatePayload: Record<string, any> = {
      [`approvals.${role}`]: approvalData,
      offlinePendingSync: true,
    };

    if (role === 'solicitante') {
      const workers = [...(permitData.workers || [])];
      if (workers[0] && !workers[0].firmaApertura) {
        workers[0] = { ...workers[0], firmaApertura: signatureDataUrl };
        updatePayload.workers = workers;
      }
    }

    // Auto-transición a en_ejecucion si es la última firma requerida
    const updatedApprovals = {
      ...permitData.approvals,
      [role]: { ...approvalData },
    };
    const simulatedPermit = { ...permitData, approvals: updatedApprovals as Permit['approvals'] };
    if (
      permitData.status === 'pendiente_revision' &&
      allRequiredSignaturesComplete(simulatedPermit)
    ) {
      updatePayload['status'] = 'en_ejecucion';
    }

    await updateDoc(docRef, updatePayload);

    const permitNumber = permitData.number ?? permitId;
    const roleLabels: Record<string, string> = {
      solicitante: 'Ejecutante',
      autorizante: 'Autorizante',
      lider_sst: 'Líder SST',
      mantenimiento: 'Mantenimiento',
      coordinador_alturas: 'Coordinador Alturas',
      supervisor_confinado: 'Supervisor Esp. Confinado',
    };

    await enqueueNotification({
      permitId,
      permitNumber,
      type: 'permit_signed',
      message: `${user.displayName ?? 'Un usuario'} firmó el permiso #${permitNumber} como ${roleLabels[role] ?? role}.`,
      triggeredBy: { uid: user.uid, displayName: user.displayName },
    });

    return { success: true, permitId, offline: true };
  } catch (error: any) {
    console.error('[Offline] Error al guardar firma:', error);
    return { success: false, error: error.message || 'No se pudo guardar la firma offline.' };
  }
}
