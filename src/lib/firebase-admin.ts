import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const apps = getApps();

if (!apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Solo intentar inicializar si las credenciales existen y no son placeholders
    if (projectId && clientEmail && privateKey && privateKey !== 'YOUR_PRIVATE_KEY' && clientEmail !== 'YOUR_CLIENT_EMAIL') {
      // Reemplazar los literales \n con saltos de línea reales
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });

      console.log('✅ Firebase Admin SDK inicializado correctamente.');
    } else {
      console.warn('⚠️ [Firebase Admin] Credenciales de administrador no configuradas en .env. Las funciones de servidor (Server Actions) que requieren acceso de administrador no funcionarán.');
    }
  } catch (error: any) {
    console.error('❌ Error al inicializar Firebase Admin SDK:', error.message);
  }
}

export const adminDb = getFirestore();
