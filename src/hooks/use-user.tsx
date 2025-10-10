'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from './use-auth';
import { db } from '@/lib/firebase';
import type { User } from '@/types';

export function useUser() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', authUser.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser({
          uid: authUser.uid,
          ...docSnap.data(),
        } as User);
      } else {
        // Handle case where user exists in Auth but not in Firestore
        const defaultUser: User = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
          role: 'lider_tarea', // Default role
        };
        // Create the user profile in Firestore
        setDoc(docRef, defaultUser).then(() => {
            setUser(defaultUser);
        }).catch(err => {
            console.error("Failed to create default user profile in Firestore", err);
        });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error al obtener el perfil de usuario:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authUser, authLoading]);

  return { user, loading };
}
