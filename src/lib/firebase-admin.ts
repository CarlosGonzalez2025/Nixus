import 'server-only';

import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;
let adminFirestoreDb: ReturnType<typeof getFirestore> | undefined;
let lastAdminInitError: Error | undefined;

function normalizePrivateKey(privateKey: string) {
  return privateKey
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n');
}

function initializeAdminApp() {
  if (adminApp && adminFirestoreDb) {
    return adminFirestoreDb;
  }

  const apps = getApps();
  if (apps.length > 0) {
    adminApp = apps[0];
    adminFirestoreDb = getFirestore(adminApp);
    lastAdminInitError = undefined;
    return adminFirestoreDb;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (
    !projectId ||
    !clientEmail ||
    !privateKey ||
    privateKey === 'YOUR_PRIVATE_KEY' ||
    clientEmail === 'YOUR_CLIENT_EMAIL'
  ) {
    const error = new Error(
      'Firebase Admin no esta configurado. Verifique FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY.'
    );
    lastAdminInitError = error;
    throw error;
  }

  try {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: normalizePrivateKey(privateKey),
      }),
    });
    adminFirestoreDb = getFirestore(adminApp);
    lastAdminInitError = undefined;
    console.log('Firebase Admin SDK inicializado correctamente.');
    return adminFirestoreDb;
  } catch (error) {
    lastAdminInitError = error as Error;
    throw error;
  }
}

export function getAdminDb() {
  return initializeAdminApp();
}

export function getAdminInitErrorMessage() {
  return lastAdminInitError?.message;
}

export function isAdminReady() {
  try {
    initializeAdminApp();
    return true;
  } catch {
    return false;
  }
}

export const adminDb = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    const db = getAdminDb() as unknown as Record<PropertyKey, unknown>;
    const value = db[prop];
    return typeof value === 'function' ? value.bind(db) : value;
  },
});
