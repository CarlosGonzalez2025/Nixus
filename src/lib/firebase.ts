import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
  type QueryConstraint,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJg_VunUjv_1S_-qziFHkPv1CWNcxDWv0",
  authDomain: "studio-7636781267-6dc02.firebaseapp.com",
  projectId: "studio-7636781267-6dc02",
  storageBucket: "studio-7636781267-6dc02.firebasestorage.app",
  messagingSenderId: "322397935917",
  appId: "1:322397935917:web:61f9840427f4dfa86c5ba4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Persistencia offline con fallback: si el navegador bloquea IndexedDB (ej. Edge con
// Tracking Prevention activada), se usa Firestore sin caché persistente para garantizar
// que los datos siempre se lean desde el servidor.
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
export type { QueryConstraint };
