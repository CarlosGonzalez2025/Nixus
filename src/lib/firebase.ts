import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  memoryLocalCache,
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

// Memory cache + long-polling: workaround for Firebase SDK v11.10.0 bug where
// server RESET events arrive after unsubscribe, decrementing target count to -1
// (INTERNAL ASSERTION FAILED: ca9 / ve:-1). experimentalForceLongPolling avoids
// the PersistentListenStream path where the race condition occurs.
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    localCache: memoryLocalCache(),
    experimentalForceLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
export type { QueryConstraint };
