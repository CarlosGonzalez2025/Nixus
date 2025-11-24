
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;
let adminFirestoreDb: ReturnType<typeof getFirestore> | undefined;

function initializeAdminApp() {
  const apps = getApps();
  if (apps.length > 0) {
    adminApp = apps[0];
    adminFirestoreDb = getFirestore(adminApp);
    return;
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey && privateKey !== 'YOUR_PRIVATE_KEY' && clientEmail !== 'YOUR_CLIENT_EMAIL') {
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });
      adminFirestoreDb = getFirestore(adminApp);
      console.log('✅ Firebase Admin SDK inicializado correctamente.');
    } else {
      console.warn('⚠️ [Firebase Admin] Credenciales de administrador no configuradas en .env. Las funciones de servidor (Server Actions) que requieren acceso de administrador no funcionarán.');
    }
  } catch (error: any) {
    console.error('❌ Error al inicializar Firebase Admin SDK:', error.message);
  }
}

initializeAdminApp();

// Función para verificar si el SDK de Admin está listo
export const isAdminReady = () => !!adminApp;

// Exportamos la instancia de la base de datos de manera segura
// Si no está inicializada, las funciones que la usen fallarán con el nuevo chequeo.
export const adminDb = adminFirestoreDb!;
