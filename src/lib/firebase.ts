import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
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

// persistentLocalCache + persistentSingleTabManager: datos sobreviven recargas y
// navegación entre páginas (IndexedDB). SingleTab es el único modo compatible con
// experimentalForceLongPolling (MultipleTab requiere WebSocket y es incompatible).
// experimentalForceLongPolling: workaround para bug SDK v11.10.0 (INTERNAL ASSERTION
// FAILED: ca9 / ve:-1) — evita PersistentListenStream donde ocurre la race condition.
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
    experimentalForceLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
export type { QueryConstraint };
