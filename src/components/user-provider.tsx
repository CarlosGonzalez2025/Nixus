'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { UNASSIGNED_PLACEHOLDER } from '@/lib/role-config';
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
                // El documento no existe. CRÍTICO: un snapshot servido desde la caché local
                // (dispositivo nuevo, caché fría, primer emit offline) reporta exists()===false
                // aunque el perfil SÍ exista en el servidor. Crear el perfil aquí pisaría
                // (overwrite) los datos reales de empresa/planta/ciudad con valores 'N/A'.
                // Por eso solo aprovisionamos cuando el SERVIDOR confirma que no existe.
                if (docSnap.metadata.fromCache) {
                    // Esperamos la confirmación del servidor antes de decidir; no tocamos nada.
                    return;
                }

                // Handle case where user exists in Auth but not in Firestore
                const defaultUser: User = {
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                    role: 'solicitante', // Default role — consistente con syncAuthAndFirestoreUsers
                    empresa: UNASSIGNED_PLACEHOLDER,
                    ciudad: UNASSIGNED_PLACEHOLDER,
                    planta: UNASSIGNED_PLACEHOLDER,
                    area: UNASSIGNED_PLACEHOLDER,
                    telefono: ''
                };
                // Create the default user profile in Firestore (merge: no destruye campos
                // existentes si hubiera una escritura concurrente).
                setDoc(docRef, defaultUser, { merge: true }).then(() => {
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
