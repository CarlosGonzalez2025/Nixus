
'use server';

import { getAuth } from 'firebase-admin/auth';
import { adminDb } from '@/lib/firebase-admin';
import * as z from 'zod';
import type { User } from '@/types';

const formSchema = z.object({
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

export async function createUser(data: z.infer<typeof formSchema>) {
  try {
    const auth = getAuth();
    
    // 1. Create user in Firebase Authentication using Admin SDK
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.fullName,
    });
    
    // 2. Create user profile in Firestore using Admin SDK
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
    
    // The Admin SDK bypasses security rules, so no permission error handling is needed here.
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

export async function updateUserStatus(userId: string, disabled: boolean) {
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

    