'use server';
import { 
  initializeApp,
  getApps,
  type FirebaseOptions,
} from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import type { User } from '@/types';


const formSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin']),
});

// NOTE: This approach of creating a separate auth instance is not ideal for production,
// but it's a workaround for the server action context where the main client auth is not available.
// A better long-term solution would be to use Firebase Admin SDK with proper service account setup.
async function getTempAuth() {
  const tempAppName = `temp-app-${Date.now()}`;
  
  // Check if the temporary app already exists
  const existingApp = getApps().find(app => app.name === tempAppName);
  if (existingApp) {
    return getAuth(existingApp);
  }

  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase config not found in environment variables.');
  }

  // If not, initialize a new temporary app
  const tempApp = initializeApp(firebaseConfig, tempAppName);
  return getAuth(tempApp);
}

export async function createUser(data: z.infer<typeof formSchema>) {
  try {
    const tempAuth = await getTempAuth();
    
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(tempAuth, data.email, data.password);
    const user = userCredential.user;

    // 2. Create user profile in Firestore
    const userProfile: User = {
      uid: user.uid,
      email: user.email,
      displayName: data.fullName,
      role: data.role,
      photoURL: user.photoURL || '',
    };
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // The temporary user is created. The admin user's session remains intact.
    // The new user can now log in with their credentials.
    // No need to sign out, as the main auth instance was not affected.
    return { success: true, userId: user.uid };

  } catch (error: any) {
    console.error('Error creating user:', error.code, error.message);
    if (error.code === 'auth/email-already-in-use') {
      return { error: 'Este correo electrónico ya está registrado. Por favor, use otro.' };
    }
    // Return a serializable error object
    return { error: 'Ocurrió un error inesperado al crear el usuario.' };
  }
}
