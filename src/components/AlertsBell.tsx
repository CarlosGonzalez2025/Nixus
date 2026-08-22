
'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { collection, query, where, onSnapshot, orderBy, limit, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Notification } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Bell, FileSignature, Sparkles, FilePlus, CheckCircle, XCircle, Lock, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'creation':
      return <FilePlus className="mr-2 h-4 w-4 text-blue-500" />;
    case 'signature':
      return <FileSignature className="mr-2 h-4 w-4 text-yellow-500" />;
    case 'approval':
      return <CheckCircle className="mr-2 h-4 w-4 text-green-500" />;
    case 'rejection':
      return <XCircle className="mr-2 h-4 w-4 text-red-500" />;
    case 'cancellation':
      return <Lock className="mr-2 h-4 w-4 text-blue-500" />;
    case 'status_change':
      return <Sparkles className="mr-2 h-4 w-4 text-green-500" />;
    // Alertas tempranas automáticas (cron /api/cron/permit-alerts)
    case 'reminder':
      return <Clock className="mr-2 h-4 w-4 text-amber-500" />;
    case 'overdue':
      return <AlertTriangle className="mr-2 h-4 w-4 text-red-600" />;
    default:
      return <Bell className="mr-2 h-4 w-4 text-gray-500" />;
  }
};

export function AlertsBell() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    if (!user?.uid) {
      setNotifications([]);
      return;
    }

    // Filtramos directamente en Firestore por isRead:false + orden descendente,
    // evitando que notificaciones recientes queden fuera de una ventana arbitraria.
    // Requiere índice compuesto: userId ASC + isRead ASC + createdAt DESC.
    // (Firestore lo solicita automáticamente la primera vez que se ejecuta la query.)
    const notifsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      where('isRead', '==', false),
      orderBy('createdAt', 'desc'),
      limit(30)
    );

    const unsubscribe = onSnapshot(notifsQuery, (snapshot) => {
      const unreadNotifs = snapshot.docs
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Notification));

      setNotifications(unreadNotifs);
    }, (error) => {
      console.error("Error fetching notifications:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // The number of unread notifications is simply the length of the state array
  const unreadCount = notifications.length;

  // Marca como leída y elimina de la lista de forma optimista (sin esperar a Firestore).
  const handleMarkAsRead = async (notificationId: string) => {
    // Actualización optimista: quitar inmediatamente de la lista visible
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    try {
      const notifRef = doc(db, 'notifications', notificationId);
      await updateDoc(notifRef, { isRead: true });
    } catch (error) {
      console.error('[AlertsBell] Error al marcar como leída:', error);
      // Si falla, onSnapshot restaurará el estado correcto
    }
  };

  // Marca todas como leídas usando un batch atómico para evitar escrituras parciales.
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    const toUpdate = [...notifications];
    // Actualización optimista: vaciar lista inmediatamente
    setNotifications([]);
    try {
      const batch = writeBatch(db);
      toUpdate.forEach(n => batch.update(doc(db, 'notifications', n.id), { isRead: true }));
      await batch.commit();
    } catch (error) {
      console.error('[AlertsBell] Error al marcar todas como leídas:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-sidebar-foreground hover:bg-sidebar-accent">
          <Bell className="h-5 w-5" />
          {/* red-600 en vez de bg-destructive: blanco sobre #EF4444 da 3.8:1, insuficiente
              para un contador de 9px. #DC2626 lo deja en 4.8:1. No se toca el token
              --destructive, que se usa en toda la app. */}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 md:w-96" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notificaciones</span>
             {unreadCount > 0 && (
                 <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={handleMarkAllAsRead}>
                     Marcar todas como leídas
                 </Button>
             )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <DropdownMenuItem disabled className="text-center justify-center">
                No hay notificaciones nuevas
              </DropdownMenuItem>
            ) : (
              notifications.map((notif) => (
                <Link key={notif.id} href={`/permits/${notif.permitId}`} passHref onClick={() => handleMarkAsRead(notif.id)}>
                  <DropdownMenuItem className="cursor-pointer flex items-start gap-2">
                    <div className="mt-1">
                        {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm whitespace-normal">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notif.createdAt ? 
                          `hace ${formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: false, locale: es })}`
                          : 'justo ahora'}
                      </p>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))
            )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
