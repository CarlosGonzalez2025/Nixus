
'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { collection, query, where, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Bell, FileWarning, Hourglass, Edit3 } from 'lucide-react';
import Link from 'next/link';

export function AlertsBell() {
  const { user } = useUser();
  const [alerts, setAlerts] = useState<Permit[]>([]);
  const [drafts, setDrafts] = useState<Permit[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return;

    let unsubscribeAlerts = () => {};
    let unsubscribeDrafts = () => {};

    // --- Alertas para permisos que requieren acción (firma/aprobación) ---
    // Solo para roles que aprueban. Solicitantes ven sus borradores.
    if (user.role === 'autorizante' || user.role === 'lider_sst' || user.role === 'mantenimiento' || user.role === 'admin') {
      const alertsQuery = query(collection(db, 'permits'), where('status', '==', 'pendiente_revision'));
      unsubscribeAlerts = onSnapshot(alertsQuery, (snapshot) => {
        const pendingPermits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Permit));
        setAlerts(pendingPermits);
      });
    } else {
      setAlerts([]); // No hay alertas de este tipo para otros roles
    }

    // --- Alertas para borradores pendientes del usuario actual ---
    // Solo para el creador del permiso.
    if (user.role === 'solicitante' || user.role === 'lider_tarea' || user.role === 'admin') {
      const draftsQuery = query(collection(db, 'permits'), where('createdBy', '==', user.uid), where('status', '==', 'borrador'));
      unsubscribeDrafts = onSnapshot(draftsQuery, (snapshot) => {
        const pendingDrafts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Permit));
        setDrafts(pendingDrafts);
      });
    } else {
        setDrafts([]);
    }

    return () => {
      unsubscribeAlerts();
      unsubscribeDrafts();
    };
  }, [user]);

  const totalAlerts = alerts.length + drafts.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-sidebar-foreground hover:bg-sidebar-accent">
          <Bell className="h-5 w-5" />
          {totalAlerts > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {totalAlerts}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>
          {totalAlerts > 0 ? `Tienes ${totalAlerts} alerta(s)` : 'No hay alertas nuevas'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {totalAlerts === 0 ? (
          <DropdownMenuItem disabled className="text-center justify-center">
            Todo está al día
          </DropdownMenuItem>
        ) : (
          <>
            {alerts.length > 0 && (
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Pendientes de Firma/Aprobación</DropdownMenuLabel>
                    {alerts.map((permit) => (
                      <Link key={permit.id} href={`/permits/${permit.id}`} passHref>
                        <DropdownMenuItem className="cursor-pointer">
                          <Hourglass className="mr-2 h-4 w-4 text-yellow-500" />
                          <div className="flex-1 truncate">
                            <span className="font-semibold">{permit.number || `ID: ...${permit.id.slice(-4)}`}</span>
                            <p className="text-xs text-muted-foreground truncate">{permit.generalInfo?.workDescription}</p>
                          </div>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                </DropdownMenuGroup>
            )}
            
            {drafts.length > 0 && (
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Borradores por Completar</DropdownMenuLabel>
                    {drafts.map((permit) => (
                        <Link key={permit.id} href={`/permits/create?edit=${permit.id}`} passHref>
                            <DropdownMenuItem className="cursor-pointer">
                                <Edit3 className="mr-2 h-4 w-4 text-blue-500" />
                                 <div className="flex-1 truncate">
                                    <span className="font-semibold">Borrador #{permit.id.slice(-4)}</span>
                                    <p className="text-xs text-muted-foreground truncate">{permit.generalInfo?.workDescription || "Sin descripción"}</p>
                                </div>
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
