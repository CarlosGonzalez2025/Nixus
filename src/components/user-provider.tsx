'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import type { User, UserRole } from '@/types';

interface UserContextType {
    user: User | null;
    loading: boolean;
    switchRole: (newRole: UserRole) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { user: authUser, loading: authLoading } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeRole, setActiveRole] = useState<User['role'] | null>(null);

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }

        if (!authUser) {
            setUser(null);
            setActiveRole(null); // Reset al hacer logout para que el próximo login use el rol primario
            setLoading(false);
            return;
        }

        const docRef = doc(db, 'users', authUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = {
                    uid: authUser.uid,
                    ...docSnap.data(),
                } as User;

                // Calculate the full set of roles available to the user
                // distinct roles from [originalRole, ...originalOtherRoles]
                const allRoles = Array.from(new Set([userData.role, ...(userData.otherRoles || [])])).filter(Boolean) as UserRole[];

                // Initialize activeRole if not set, OR si el rol activo no pertenece a este usuario
                // (puede ocurrir al cerrar sesión y entrar con otro usuario en la misma sesión)
                if (!activeRole || !allRoles.includes(activeRole)) {
                    setActiveRole(userData.role);
                }

                const currentRole = (activeRole && allRoles.includes(activeRole)) ? activeRole : userData.role;

                // The new otherRoles should be allRoles EXCEPT the currentRole
                const newOtherRoles = allRoles.filter(r => r !== currentRole);

                // Override the role property with the activeRole for the UI
                setUser({
                    ...userData,
                    role: currentRole as UserRole, // Ensure type safety
                    otherRoles: newOtherRoles
                });

            } else {
                // Handle case where user exists in Auth but not in Firestore
                const defaultUser: User = {
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                    role: 'solicitante', // Default role — consistente con syncAuthAndFirestoreUsers
                    empresa: 'N/A',
                    ciudad: 'N/A',
                    planta: 'N/A',
                    area: 'N/A',
                    telefono: ''
                };
                // Create the default user profile in Firestore
                setDoc(docRef, defaultUser).then(() => {
                    setUser(defaultUser);
                    setActiveRole('solicitante');
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
    }, [authUser, authLoading, activeRole]); // Re-run when activeRole changes

    const switchRole = (newRole: UserRole) => {
        if (user && (user.role === newRole || user.otherRoles?.includes(newRole))) {
            setActiveRole(newRole);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, switchRole }}>
            {children}
        </UserContext.Provider>
    );
}
