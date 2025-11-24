
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, type QueryConstraint } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sgpt-movil.firebaseapp.com",
  projectId: "sgpt-movil",
  storageBucket: "sgpt-movil.appspot.com",
  messagingSenderId: "1028768283486",
  appId: "1:1028768283486:web:60831151e5488122961d76"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
export type { QueryConstraint };
