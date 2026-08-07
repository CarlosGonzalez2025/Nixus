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
// navegación entre páginas (IndexedDB).
//
// NOTA: el bug `ca9 / ve:-1` (INTERNAL ASSERTION FAILED — server RESET events tras
// unsubscribe que decrementaban el target count a -1) fue corregido en firebase 12.13.0
// (release 7-may-2026; esta app usa 12.15.0). Por eso ya NO se fuerza long-polling: el
// transporte rápido (WebChannel/gRPC) vuelve a ser seguro y elimina la latencia de ~60s
// que introducía experimentalForceLongPolling. Se conserva persistentSingleTabManager
// para aislar el cambio; experimentalAutoDetectLongPolling se deja como red de seguridad:
// usa el camino rápido por defecto y solo cae a long-polling si la red (proxies
// corporativos en planta) lo requiere.
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    // El parámetro `settings` es obligatorio en la firma de firebase v10+;
    // `undefined` es el valor que ya se venía usando de hecho.
    localCache: persistentLocalCache({ tabManager: persistentSingleTabManager(undefined) }),
    experimentalAutoDetectLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

const storage = getStorage(app);

export { app, auth, db, storage, firebaseConfig };
export type { QueryConstraint };
