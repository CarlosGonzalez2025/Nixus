
'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { collection, query, where, onSnapshot, orderBy, limit, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Notification } from '@/types';
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
import { Bell, FileSignature, Sparkles, FilePlus } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'creation':
      return <FilePlus className="mr-2 h-4 w-4 text-blue-500" />;
    case 'signature':
      return <FileSignature className="mr-2 h-4 w-4 text-yellow-500" />;
    case 'status_change':
      return <Sparkles className="mr-2 h-4 w-4 text-green-500" />;
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

    const notifsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      // orderBy('createdAt', 'desc'), // Removido para evitar error de índice compuesto
      limit(20)
    );

    const unsubscribe = onSnapshot(notifsQuery, (snapshot) => {
      const notifsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
      
      // Ordenar las notificaciones en el cliente
      notifsData.sort((a, b) => (b.createdAt?.toDate()?.getTime() || 0) - (a.createdAt?.toDate()?.getTime() || 0));

      setNotifications(notifsData);
    }, (error) => {
      console.error("Error fetching notifications:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async (notificationId: string) => {
    const notifRef = doc(db, 'notifications', notificationId);
    await updateDoc(notifRef, { isRead: true });
  };
  
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    const batch = writeBatch(db);
    notifications.forEach(n => {
      if (!n.isRead) {
        const notifRef = doc(db, 'notifications', n.id);
        batch.update(notifRef, { isRead: true });
      }
    });
    await batch.commit();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-sidebar-foreground hover:bg-sidebar-accent">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
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
                  <DropdownMenuItem className={`cursor-pointer flex items-start gap-2 ${!notif.isRead ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
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
                     {!notif.isRead && (
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 self-center" aria-label="No leído" />
                     )}
                  </DropdownMenuItem>
                </Link>
              ))
            )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
