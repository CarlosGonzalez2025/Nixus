
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
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Loader2,
  Settings,
  Users,
  MessageSquare,
  BookOpen,
  List,
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
import { IdleTimerProvider } from '@/components/IdleTimerProvider';
import type { UserRole } from '@/types';
import { AlertsBell } from '@/components/AlertsBell';
import { useSidebarBadges } from '@/hooks/use-sidebar-badges';
import { NotificationBadge } from '@/components/ui/notification-badge';
import { useSidebar } from '@/components/ui/sidebar';

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

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const { pendingPermits } = useSidebarBadges();

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
      .join('')
      .toUpperCase();
  };

  const handleNavigation = (path: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    router.push(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <FirebaseErrorListener />
      <Sidebar className="border-r">
        <SidebarHeader className="border-b">
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <div className="flex w-full items-start justify-between">
              <div className="w-8" />
              <div className="rounded-lg bg-white p-2 shadow-sm transition-all group-data-[collapsible=icon]:p-1">
                <Image
                  src="https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png"
                  alt="Logo SGTC"
                  width={120}
                  height={100}
                  className="h-auto w-full max-w-[120px] transition-all group-data-[collapsible=icon]:max-w-[32px]"
                  priority
                />
              </div>
              <SidebarTrigger className="-mr-2 rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent md:hidden" />
            </div>
            <span className="text-base font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden md:text-lg">
              SGTC Móvil
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                Principal
              </SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation('/dashboard')}
                  isActive={pathname === '/dashboard'}
                  tooltip="Dashboard"
                  className="min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                >
                  <LayoutDashboard className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="font-medium">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation('/permits')}
                  isActive={pathname.startsWith('/permits') && !pathname.includes('/create')}
                  tooltip="Permisos de Trabajo"
                  className="relative min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                >
                  <FileText className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="font-medium">Permisos de Trabajo</span>
                  {pendingPermits > 0 && <NotificationBadge count={pendingPermits} />}
                </SidebarMenuButton>
              </SidebarMenuItem>
              {(user.role === 'lider_tarea' || user.role === 'solicitante' || user.role === 'admin') && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/permits/create')}
                    isActive={pathname === '/permits/create'}
                    tooltip="Nuevo Permiso"
                    className="min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                  >
                    <PlusCircle className="h-5 w-5 md:h-4 md:w-4" />
                    <span className="font-medium">Nuevo Permiso</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarGroup>
            <SidebarSeparator className="my-2" />
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                Ayuda
              </SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation('/guide')}
                  isActive={pathname === '/guide'}
                  tooltip="Guía de Flujo"
                  className="min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                >
                  <BookOpen className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="font-medium">Guía de Flujo</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
            {user.role === 'admin' && (
              <>
                <SidebarSeparator className="my-2" />
                <SidebarGroup>
                  <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                    Administración
                  </SidebarGroupLabel>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => handleNavigation('/admin/users')}
                      isActive={pathname === '/admin/users'}
                      tooltip="Gestión de Usuarios"
                      className="min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                    >
                      <Users className="h-5 w-5 md:h-4 md:w-4" />
                      <span className="font-medium">Gestión de Usuarios</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => handleNavigation('/admin/lists')}
                      isActive={pathname === '/admin/lists'}
                      tooltip="Gestión de Listas"
                      className="min-h-[44px] py-3 transition-all hover:scale-[1.02] active:scale-[0.98] md:py-2"
                    >
                      <List className="h-5 w-5 md:h-4 md:w-4" />
                      <span className="font-medium">Gestión de Listas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroup>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarSeparator className="mb-2" />
          <div className="px-2 pb-2 md:hidden">
            <AlertsBell />
          </div>
          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <div className="hidden md:block">
              <AlertsBell />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto w-full min-h-[44px] justify-start p-2 transition-all hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center"
                >
                  <div className="flex w-full items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-sidebar-background">
                      <AvatarImage
                        src={user.photoURL || userAvatar?.imageUrl}
                        alt={user.displayName || 'Usuario'}
                        data-ai-hint={userAvatar?.imageHint}
                      />
                      <AvatarFallback className="bg-sidebar-accent text-sm font-semibold">
                        {getInitials(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex max-w-[140px] flex-col items-start truncate text-left group-data-[collapsible=icon]:hidden">
                      <span className="truncate max-w-[140px] text-sm font-semibold text-sidebar-foreground">
                        {user.displayName || 'Usuario'}
                      </span>
                      <span className="truncate max-w-[140px] text-xs text-sidebar-foreground/70">
                        {getRoleName(user.role)}
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="w-64"
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-nixus/10 px-2 py-1 text-xs font-medium text-nixus">
                      {getRoleName(user.role)}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleNavigation('/settings')}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigation('/settings/whatsapp')}
                  className="cursor-pointer"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Notificaciones WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="rounded-md text-foreground transition-colors hover:bg-accent/20" />
            <div className="flex items-center gap-2">
              <Image
                src="https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <h1 className="text-sm font-bold">SGTC Móvil</h1>
            </div>
          </div>
          <AlertsBell />
        </header>

        <SidebarInset className="flex-1 pb-safe md:pb-0">
          {children}
        </SidebarInset>
      </main>
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <IdleTimerProvider timeout={30} warningTime={5}>
      <SidebarProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </SidebarProvider>
    </IdleTimerProvider>
  );
}
