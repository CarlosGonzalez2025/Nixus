
'use server';

import { getAuth } from 'firebase-admin/auth';
import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import * as z from 'zod';
import type { User, UserRole } from '@/types';
import { revalidatePath } from 'next/cache';

const createFormSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin', 'mantenimiento']),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

// New schema for bulk creation
const bulkCreateUserSchema = createFormSchema.extend({});

const updateFormSchema = z.object({
  uid: z.string(),
  displayName: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin', 'mantenimiento']),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: "La empresa es requerida." }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
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
      email: userRecord.email,
      displayName: data.fullName,
      role: data.role,
      area: data.area,
      telefono: data.telefono,
      empresa: data.empresa,
      ciudad: data.ciudad,
      planta: data.planta,
      photoURL: userRecord.photoURL || '',
      disabled: false,
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
        email: userRecord.email,
        displayName: userData.fullName,
        role: userData.role,
        area: userData.area,
        telefono: userData.telefono,
        empresa: userData.empresa,
        ciudad: userData.ciudad,
        planta: userData.planta,
        photoURL: userRecord.photoURL || '',
        disabled: false,
      };

      await adminDb.collection('users').doc(userRecord.uid).set(userProfile);
      results.successCount++;
    } catch (error: any) {
      results.errorCount++;
      let reason = 'Error desconocido';
      if (error.code === 'auth/email-already-exists') {
        reason = 'El correo ya existe.';
      } else if (error.code === 'auth/invalid-password') {
        reason = 'La contraseña no es válida (mínimo 6 caracteres).';
      }
      results.errors.push({ email: userData.email, reason });
      console.error(`Error creating user ${userData.email}:`, error.code, error.message);
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
    await adminDb.collection('users').doc(uid).update(profileData);
    
    return { success: true };
  } catch (error: any) {
     console.error('Error updating user:', error);
     return { error: 'No se pudo actualizar el usuario.' };
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
        return { error: 'No se pudo actualizar el estado del usuario.'};
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
        role: 'ejecutante', // Assign a default role
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
