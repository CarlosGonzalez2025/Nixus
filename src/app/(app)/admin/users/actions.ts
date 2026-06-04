'use server';

import { getAuth } from 'firebase-admin/auth';
import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import * as z from 'zod';
import type { User, AppModule } from '@/types';
import { USER_ROLES } from '@/lib/role-config';
import { revalidatePath } from 'next/cache';

const APP_MODULES = ['permits', 'permits_create', 'hallazgos', 'contractor_verifications', 'users', 'lists', 'audit'] as const;

const createFormSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(USER_ROLES),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
  allowedEmpresas: z.array(z.string()).optional(),
  allowedPlantas: z.array(z.string()).optional(),
  allowedCiudades: z.array(z.string()).optional(),
  allowedModules: z.array(z.enum(APP_MODULES)).optional(),
});

const bulkCreateUserSchema = createFormSchema.extend({});

const updateFormSchema = z.object({
  uid: z.string(),
  displayName: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  role: z.enum(USER_ROLES),
  otherRoles: z.array(z.enum(USER_ROLES)).optional(),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: "La empresa es requerida." }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
  allowedEmpresas: z.array(z.string()).optional(),
  allowedPlantas: z.array(z.string()).optional(),
  allowedCiudades: z.array(z.string()).optional(),
  allowedModules: z.array(z.enum(APP_MODULES)).optional(),
});

export async function createUser(data: z.infer<typeof createFormSchema>) {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  try {
    const auth = getAuth();

    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.fullName,
    });

    const userProfile: User = {
      uid: userRecord.uid,
      email: userRecord.email ?? '',
      displayName: data.fullName,
      role: data.role,
      area: data.area ?? '',
      telefono: data.telefono ?? '',
      empresa: data.empresa,
      ciudad: data.ciudad ?? '',
      planta: data.planta ?? '',
      photoURL: userRecord.photoURL || '',
      disabled: false,
      ...(data.role === 'lider_regional' && {
        allowedEmpresas: data.allowedEmpresas ?? [],
        allowedPlantas: data.allowedPlantas ?? [],
        allowedCiudades: data.allowedCiudades ?? [],
        allowedModules: (data.allowedModules ?? []) as AppModule[],
      }),
    };

    await adminDb.collection('users').doc(userRecord.uid).set(userProfile);

    return { success: true, userId: userRecord.uid };

  } catch (error: any) {
    console.error('Error creating user with Admin SDK:', error);
    if (error.code === 'auth/email-already-exists') {
      return { error: 'Este correo electrónico ya está registrado. Por favor, use otro.' };
    }
    return { error: 'Ocurrió un error inesperado al crear el usuario.' };
  }
}

export async function createMultipleUsers(users: z.infer<typeof bulkCreateUserSchema>[]) {
  if (!isAdminReady()) {
    return {
      successCount: 0,
      errorCount: users.length,
      errors: users.map(u => ({ email: u.email, reason: 'El servicio de base de datos no está configurado en el servidor.' })),
    };
  }

  const auth = getAuth();
  const results = {
    successCount: 0,
    errorCount: 0,
    errors: [] as { email: string; reason: string }[],
  };

  for (const userData of users) {
    try {
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.fullName,
        disabled: false,
      });

      const userProfile: User = {
        uid: userRecord.uid,
        email: userRecord.email ?? '',
        displayName: userData.fullName,
        role: userData.role,
        area: userData.area ?? '',
        telefono: userData.telefono ?? '',
        empresa: userData.empresa,
        ciudad: userData.ciudad ?? '',
        planta: userData.planta ?? '',
        photoURL: userRecord.photoURL || '',
        disabled: false,
      };

      await adminDb.collection('users').doc(userRecord.uid).set(userProfile);
      results.successCount++;
    } catch (error: any) {
      results.errorCount++;
      let reason = 'Error desconocido al crear usuario.';

      if (error.code?.startsWith('auth/')) {
        switch (error.code) {
          case 'auth/email-already-exists':
            reason = 'El correo ya existe en Autenticación.';
            break;
          case 'auth/invalid-password':
            reason = 'La contraseña no es válida (mínimo 6 caracteres).';
            break;
          default:
            reason = `Error de autenticación: ${error.message}`;
            break;
        }
      } else {
        reason = `Error al guardar en base de datos: ${error.message}`;
      }

      results.errors.push({ email: userData.email, reason });
      console.error(`Error creando usuario ${userData.email}:`, error);
    }
  }

  revalidatePath('/admin/users');
  return results;
}

export async function updateUser(data: z.infer<typeof updateFormSchema>) {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  try {
    const auth = getAuth();

    // 1. Update Firebase Authentication
    await auth.updateUser(data.uid, {
      email: data.email,
      displayName: data.displayName,
    });

    // 2. Update Firestore document
    const { uid, ...profileData } = data;
    const firestoreData: Record<string, unknown> = { ...profileData };
    // Para lider_regional guardamos el scope; para otros roles lo limpiamos
    if (profileData.role !== 'lider_regional') {
      firestoreData.allowedEmpresas = [];
      firestoreData.allowedPlantas = [];
      firestoreData.allowedCiudades = [];
      firestoreData.allowedModules = [];
    }
    await adminDb.collection('users').doc(uid).update(firestoreData);

    return { success: true };
  } catch (error: any) {
    console.error('Error updating user:', error);
    return { error: 'No se pudo actualizar el usuario.' };
  }
}

export async function deleteUser(userId: string) {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  try {
    const auth = getAuth();
    // 1. Delete from Firebase Authentication
    await auth.deleteUser(userId);
    // 2. Delete from Firestore
    await adminDb.collection('users').doc(userId).delete();
    
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return { error: 'No se pudo eliminar el usuario.' };
  }
}

export async function changeUserPassword(uid: string, newPassword: string) {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' };
  }
  try {
    const auth = getAuth();
    await auth.updateUser(uid, { password: newPassword });
    return { success: true };
  } catch (error: any) {
    console.error('Error changing user password:', error);
    if (error.code === 'auth/invalid-password') {
      return { error: 'La contraseña no cumple los requisitos mínimos (mínimo 6 caracteres).' };
    }
    return { error: 'No se pudo cambiar la contraseña. Inténtalo de nuevo.' };
  }
}

export async function updateUserStatus(userId: string, disabled: boolean) {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  try {
    const auth = getAuth();
    await auth.updateUser(userId, { disabled });
    await adminDb.collection('users').doc(userId).update({ disabled });
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user status:', error);
    return { error: 'No se pudo actualizar el estado del usuario.' };
  }
}

/**
 * Migra usuarios con roles obsoletos a los roles actuales:
 * - lider_tarea  → solicitante
 * - ejecutante   → solicitante  (el rol "Ejecutante del Trabajo" con T mayúscula fue unificado)
 */
export async function migrateObsoleteRoles() {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }
  try {
    const usersSnap = await adminDb.collection('users').get();
    const batch = adminDb.batch();
    let migratedCount = 0;

    const OBSOLETE_TO_SOLICITANTE = ['lider_tarea', 'ejecutante'];

    for (const docSnap of usersSnap.docs) {
      const data = docSnap.data();
      let needsUpdate = false;
      const update: { role?: string; otherRoles?: string[] } = {};

      // Migrar rol principal
      if (OBSOLETE_TO_SOLICITANTE.includes(data.role)) {
        update.role = 'solicitante';
        needsUpdate = true;
      }

      // Migrar roles adicionales
      if (Array.isArray(data.otherRoles) && data.otherRoles.some((r: string) => OBSOLETE_TO_SOLICITANTE.includes(r))) {
        update.otherRoles = data.otherRoles
          .map((r: string) => OBSOLETE_TO_SOLICITANTE.includes(r) ? 'solicitante' : r)
          .filter((r: string, i: number, arr: string[]) => arr.indexOf(r) === i); // deduplicar
        needsUpdate = true;
      }

      if (needsUpdate) {
        batch.update(docSnap.ref, update);
        migratedCount++;
      }
    }

    if (migratedCount > 0) {
      await batch.commit();
    }

    revalidatePath('/admin/users');
    return {
      success: true,
      migrated: migratedCount,
      message: migratedCount > 0
        ? `${migratedCount} usuario(s) migrados correctamente a 'Ejecutante del trabajo'.`
        : 'No se encontraron usuarios con roles obsoletos.',
    };
  } catch (error: any) {
    console.error('Error migrando roles obsoletos:', error);
    return { error: 'Ocurrió un error durante la migración de roles.' };
  }
}

export async function syncAuthAndFirestoreUsers() {
  if (!isAdminReady()) {
    return { error: 'El servicio de base de datos no está configurado en el servidor.' };
  }

  try {
    const auth = getAuth();
    const firestoreUsersSnap = await adminDb.collection('users').get();
    const firestoreUserIds = new Set(firestoreUsersSnap.docs.map(doc => doc.id));

    const listAuthUsersResult = await auth.listUsers(1000); // Max 1000 users per page
    const authUsers = listAuthUsersResult.users;

    const missingUserIds = authUsers
      .map(userRecord => userRecord.uid)
      .filter(uid => !firestoreUserIds.has(uid));

    if (missingUserIds.length === 0) {
      return { success: true, created: 0, message: 'No hay usuarios para sincronizar. Todo está al día.' };
    }

    const batch = adminDb.batch();
    let createdCount = 0;

    for (const uid of missingUserIds) {
      const userRecord = await auth.getUser(uid);
      const userProfile: User = {
        uid: userRecord.uid,
        email: userRecord.email || '',
        displayName: userRecord.displayName || 'Usuario sin nombre',
        photoURL: userRecord.photoURL || '',
        role: 'solicitante', // Assign a default role
        empresa: 'Empresa no especificada',
        ciudad: '',
        planta: '',
        area: '',
        telefono: '',
        disabled: userRecord.disabled || false,
      };
      const userDocRef = adminDb.collection('users').doc(uid);
      batch.set(userDocRef, userProfile);
      createdCount++;
    }

    await batch.commit();

    revalidatePath('/admin/users');

    return { success: true, created: createdCount, message: `${createdCount} usuarios han sido creados en la base de datos.` };

  } catch (error: any) {
    console.error('Error sincronizando usuarios:', error);
    return { error: 'Ocurrió un error inesperado durante la sincronización.' };
  }
}
