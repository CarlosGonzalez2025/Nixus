'use server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin']),
});

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
  initializeApp({
    credential: {
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    },
  });
}

const auth = getAuth();
const db = getFirestore();

export async function createUser(data: z.infer<typeof formSchema>) {
  try {
    // Step 1: Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.fullName,
      emailVerified: true,
    });

    // Step 2: Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      displayName: data.fullName,
      email: data.email,
      role: data.role,
      photoURL: userRecord.photoURL || '',
    };

    await db.collection('users').doc(userRecord.uid).set(userProfile);

    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'El correo electrónico ya está en uso por otro usuario.';
    } else if (error.code === 'auth/invalid-password') {
      errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
    }
    console.error('Error creating user with Admin SDK:', error);
    return { error: errorMessage };
  }
}
