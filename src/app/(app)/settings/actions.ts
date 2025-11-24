
'use server';

import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { auth } from '@/lib/firebase';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword as clientUpdatePassword } from 'firebase/auth';


const profileFormSchema = z.object({
  uid: z.string(),
  displayName: z.string().min(3, { message: 'El nombre es requerido.' }),
  telefono: z.string().optional(),
  area: z.string().optional(),
  empresa: z.string().optional(),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, 'La contraseña actual es requerida.'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres.'),
});


export async function updateUserProfile(data: z.infer<typeof profileFormSchema>) {
  if (!isAdminReady()) {
    return { error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
  }
  try {
    const { uid, ...profileData } = data;

    // Actualizar documento en Firestore
    await adminDb.collection('users').doc(uid).update(profileData);
    
    // Actualizar display name en Firebase Auth (si cambió)
    const auth = getAuth();
    const userRecord = await auth.getUser(uid);
    if (userRecord.displayName !== profileData.displayName) {
        await auth.updateUser(uid, { displayName: profileData.displayName });
    }

    revalidatePath('/settings');
    revalidatePath('/(app)/layout'); // Para refrescar el sidebar/header
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { error: 'No se pudo actualizar el perfil.' };
  }
}

export async function changePassword(uid: string, data: z.infer<typeof passwordFormSchema>) {
    if (!isAdminReady()) {
        return { error: 'Credenciales de administrador de Firebase no configuradas en el servidor.' };
    }
    if (!uid) {
        return { error: 'Usuario no autenticado.' };
    }
    
    try {
        const auth = getAuth();
        // El cambio de contraseña desde el Admin SDK no requiere la contraseña actual.
        // La validación de la contraseña actual debe hacerse en el cliente antes de llamar a esta acción.
        // Sin embargo, por seguridad, es mejor usar el SDK del cliente para esto.
        // Esta acción del servidor es un placeholder si se quisiera forzar desde admin.
        // La lógica real se manejará en el cliente con reautenticación.
        await auth.updateUser(uid, {
            password: data.newPassword
        });

        return { success: true };
    } catch(error: any) {
        console.error('Error changing password with Admin SDK:', error);
        if(error.code === 'auth/weak-password') {
            return { error: 'La nueva contraseña es demasiado débil.'};
        }
        return { error: 'No se pudo cambiar la contraseña.' };
    }
}
