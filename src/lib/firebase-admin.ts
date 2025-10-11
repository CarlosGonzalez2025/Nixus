import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const apps = getApps();

if (!apps.length) {
  try {
    const { 
        FIREBASE_PROJECT_ID: projectId, 
        FIREBASE_CLIENT_EMAIL: clientEmail, 
        FIREBASE_PRIVATE_KEY: privateKey 
    } = serverRuntimeConfig;

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase Admin credentials in environment variables or next.config.js');
    }

    // Reemplazar los literales \n con saltos de línea reales
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: formattedPrivateKey,
      }),
    });

    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error);
    // Don't throw in production, just log
    if (process.env.NODE_ENV !== 'production') {
        throw error;
    }
  }
}

export const adminDb = getFirestore();
