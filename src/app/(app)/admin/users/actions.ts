'use server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as z from 'zod';
import { db, auth } from '@/lib/firebase';
import type { User } from '@/types';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/lib/errors';


const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin']),
});

export async function createUser(data: z.infer<typeof formSchema>) {
  try {
    // 1. Create user in Firebase Authentication using the main auth instance
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // 2. Create user profile in Firestore
    const userProfile: User = {
      uid: user.uid,
      email: user.email,
      displayName: data.fullName,
      role: data.role,
      photoURL: user.photoURL || '',
    };
    
    const userDocRef = doc(db, 'users', user.uid);

    // Use .catch() for Firestore operation to emit a detailed error
    setDoc(userDocRef, userProfile).catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'create',
          requestResourceData: userProfile,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
    });
    
    return { success: true, userId: user.uid };

  } catch (error: any) {
    console.error('Error creating auth user:', error.code, error.message);
    if (error.code === 'auth/email-already-in-use') {
      return { error: 'Este correo electrónico ya está registrado. Por favor, use otro.' };
    }
    return { error: 'Ocurrió un error inesperado al crear el usuario.' };
  }
}
