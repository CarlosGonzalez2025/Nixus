import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, type QueryConstraint } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJg_VunUjv_1S_-qziFHkPv1CWNcxDWv0",
  authDomain: "studio-7636781267-6dc02.firebaseapp.com",
  projectId: "studio-7636781267-6dc02",
  storageBucket: "studio-7636781267-6dc02.appspot.com",
  messagingSenderId: "322397935917",
  appId: "1:322397935917:web:61f9840427f4dfa86c5ba4"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
export type { QueryConstraint };
