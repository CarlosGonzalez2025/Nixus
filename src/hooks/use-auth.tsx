'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
  getAuth,
  type Auth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UNASSIGNED_PLACEHOLDER } from '@/lib/role-config';
import type { User } from '@/types';

// Demo users as provided in the UI mock
const demoUsers: { [email: string]: Partial<User> & { name: string, role: User['role'] } } = {
  'info@nixus.com': { name: 'Admin Nixus', role: 'admin', empresa: 'NIXUS', ciudad: 'Bogotá', planta: 'Principal' },
  'juan@nixus.com': { name: 'Juan Pérez', role: 'solicitante', empresa: 'NIXUS', ciudad: 'Cali', planta: 'Yumbo' },
  'maria@nixus.com': { name: 'María García', role: 'autorizante', empresa: 'NIXUS', ciudad: 'Barranquilla', planta: 'Malambo' },
  'carlos@nixus.com': { name: 'Carlos López', role: 'solicitante', empresa: 'CONTRATISTA ABC', ciudad: 'Bogotá', planta: 'Faca' },
  'ana@nixus.com': { name: 'Ana Martínez', role: 'solicitante', empresa: 'CONTRATISTA ABC', ciudad: 'Bogotá', planta: 'Faca' },
  'roberto@nixus.com': { name: 'Roberto Sánchez', role: 'lider_sst', empresa: 'NIXUS', ciudad: 'Bogotá', planta: 'Sede Principal' }
};

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  auth: Auth;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' && demoUsers[email.toLowerCase()]) {
        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = newUserCredential.user;
        if(firebaseUser) {
           const demoUser = demoUsers[email.toLowerCase()];
           const userProfile: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: demoUser?.name || firebaseUser.email,
            photoURL: firebaseUser.photoURL || '',
            role: demoUser?.role || 'solicitante', // Default role
            empresa: demoUser?.empresa || UNASSIGNED_PLACEHOLDER,
            ciudad: demoUser?.ciudad || UNASSIGNED_PLACEHOLDER,
            planta: demoUser?.planta || UNASSIGNED_PLACEHOLDER,
            area: demoUser?.area || UNASSIGNED_PLACEHOLDER,
            telefono: demoUser?.telefono || '',
          };
           await setDoc(doc(db, 'users', firebaseUser.uid), userProfile, { merge: true });
        }
        return newUserCredential;
      }
      throw error;
    }
  }

  const logout = async () => {
    await signOut(auth);
    // The redirect is handled by the AppLayout's useEffect hook,
    // which is more robust as it reacts to the auth state change.
  };

  const value = {
    user,
    loading,
    login,
    logout,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
