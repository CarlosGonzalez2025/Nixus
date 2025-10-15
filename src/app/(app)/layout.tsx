
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Loader2,
  Settings,
  Users,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import type { UserRole } from '@/types';


const getRoleName = (role?: UserRole) => {
  const roles: { [key in UserRole]: string } = {
    solicitante: 'Solicitante de la Tarea',
    autorizante: 'Quien Autoriza',
    lider_tarea: 'Líder de la Tarea',
    ejecutante: 'Ejecutante del Trabajo',
    lider_sst: 'Líder SST',
    admin: 'Administrador',
    mantenimiento: 'Mantenimiento',
  };
  return role ? roles[role] || 'Usuario' : 'Usuario';
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <FirebaseErrorListener />
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-12 items-center gap-2 px-2">
            <div className="flex items-center gap-2">
              <div className="bg-sidebar-primary rounded-lg p-1.5">
                <Shield className="text-sidebar-primary-foreground" size={20} />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                SGPT Móvil
              </span>
            </div>
            <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
             <SidebarGroup>
                <SidebarGroupLabel>Principal</SidebarGroupLabel>
                 <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push('/dashboard')}
                    isActive={pathname === '/dashboard'}
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push('/permits')}
                    isActive={pathname.startsWith('/permits') && !pathname.includes('/create')}
                    tooltip="Permisos de Trabajo"
                  >
                    <FileText />
                    <span>Permisos de Trabajo</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 {(user.role === 'lider_tarea' || user.role === 'solicitante' || user.role === 'admin') && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => router.push('/permits/create')}
                      isActive={pathname === '/permits/create'}
                      tooltip="Nuevo Permiso"
                    >
                      <PlusCircle />
                      <span>Nuevo Permiso</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
             </SidebarGroup>
             <SidebarSeparator />
            {user.role === 'admin' && (
             <SidebarGroup>
                <SidebarGroupLabel>Administración</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push('/admin/users')}
                    isActive={pathname === '/admin/users'}
                    tooltip="Gestión de Usuarios"
                  >
                    <Users />
                    <span>Gestión de Usuarios</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarGroup>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-start p-2 hover:bg-sidebar-accent"
                >
                  <div className="flex w-full items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL || userAvatar?.imageUrl}
                        alt={user.displayName || 'Usuario'}
                        data-ai-hint={userAvatar?.imageHint}
                      />
                      <AvatarFallback>
                        {getInitials(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start truncate text-left group-data-[collapsible=icon]:hidden">
                      <span className="font-medium text-sidebar-foreground">
                        {user.displayName || 'Usuario'}
                      </span>
                      <span className="text-xs text-sidebar-foreground/70">
                        {getRoleName(user.role)}
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                className="w-56"
              >
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings/whatsapp')}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Notificaciones WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1">
        <header className="flex h-12 items-center border-b bg-background px-4 md:hidden">
          <SidebarTrigger className="text-foreground" />
        </header>
        <SidebarInset className="md:p-0">{children}</SidebarInset>
      </main>
    </SidebarProvider>
  );
}
