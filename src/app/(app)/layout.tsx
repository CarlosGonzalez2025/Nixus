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
import React, { useEffect, useState } from 'react';
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
  ShieldAlert,
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
import { getRoleName } from '@/lib/role-config';
import { AlertsBell } from '@/components/AlertsBell';
import { useSidebarBadges } from '@/hooks/use-sidebar-badges';
import { NotificationBadge } from '@/components/ui/notification-badge';
import { PWAUpdater } from '@/components/PWAUpdater';
import { OfflineBanner } from '@/components/OfflineBanner';
import { useOfflineSync } from '@/hooks/use-offline-sync';
import { PushNotificationPrompt } from '@/components/PushNotificationPrompt';


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, switchRole } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const { pendingPermits } = useSidebarBadges();
  const { isSyncing, syncingCount, justSynced } = useOfflineSync();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && isMounted) {
      router.replace('/login');
    }
  }, [user, loading, router, isMounted]);

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
    router.push(path);
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <OfflineBanner isSyncing={isSyncing} syncingCount={syncingCount} justSynced={justSynced} />
    <PushNotificationPrompt />
    <IdleTimerProvider timeout={30} warningTime={5}>
      <SidebarProvider>
        <FirebaseErrorListener />
        <PWAUpdater />

        <Sidebar className="border-r">
          <SidebarHeader className="border-b">
            <div className="flex flex-col items-center gap-3 p-4">
              {/* Contenedor del logo con trigger en móvil */}
              <div className="flex w-full items-center justify-center relative">
                {/* Trigger móvil posicionado absolutamente a la izquierda */}
                <SidebarTrigger className="absolute left-0 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors md:hidden" />

                {/* Logo centrado */}
                <div className="bg-white rounded-lg p-2.5 shadow-sm transition-all group-data-[collapsible=icon]:p-1.5">
                  <Image
                    src="/logo-italcol-full.png"
                    alt="Logo Italcol"
                    width={120}
                    height={60}
                    quality={90}
                    className="h-auto w-full max-w-[100px] transition-all group-data-[collapsible=icon]:max-w-[32px]"
                    priority
                    sizes="(max-width: 768px) 100px, 120px"
                  />
                </div>
              </div>

              {/* Título del sistema */}
              <span className="text-base md:text-lg font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                SGTC Móvil
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 px-3 py-2">
                  Principal
                </SidebarGroupLabel>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/dashboard')}
                    isActive={pathname === '/dashboard'}
                    tooltip="Dashboard"
                    className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LayoutDashboard className="h-5 w-5 md:h-4 md:w-4" />
                    <span className="font-medium">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* NUEVO: Asesor ARL no tiene acceso a Permisos de Trabajo */}
                {user.role !== 'asesor_arl' && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/permits')}
                    isActive={pathname.startsWith('/permits') && !pathname.includes('/create')}
                    tooltip="Permisos de Trabajo"
                    className="min-h-[44px] py-3 md:py-2 relative transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FileText className="h-5 w-5 md:h-4 md:w-4" />
                    <span className="font-medium">Permisos de Trabajo</span>
                    {pendingPermits > 0 && (
                      <NotificationBadge count={pendingPermits} />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                )}

                {(user.role === 'solicitante' || user.role === 'admin') && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => handleNavigation('/permits/create')}
                      isActive={pathname === '/permits/create'}
                      tooltip="Nuevo Permiso"
                      className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <PlusCircle className="h-5 w-5 md:h-4 md:w-4" />
                      <span className="font-medium">Nuevo Permiso</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/hallazgos')}
                    isActive={pathname.startsWith('/hallazgos')}
                    tooltip="Gestión de Hallazgos"
                    className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShieldAlert className="h-5 w-5 md:h-4 md:w-4" />
                    <span className="font-medium">Hallazgos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>

              <SidebarSeparator className="my-2" />

              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 px-3 py-2">
                  Ayuda
                </SidebarGroupLabel>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation('/guide')}
                    isActive={pathname === '/guide'}
                    tooltip="Guía de Flujo"
                    className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 px-3 py-2">
                      Administración
                    </SidebarGroupLabel>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => handleNavigation('/admin/users')}
                        isActive={pathname === '/admin/users'}
                        tooltip="Gestión de Usuarios"
                        className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                        className="min-h-[44px] py-3 md:py-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
              <div className="w-full"><AlertsBell /></div>
            </div>

            <div className="px-2 pb-2 flex items-center justify-between gap-2">
              <div className="hidden md:block">
                <AlertsBell />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start p-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center min-h-[44px] transition-all"
                  >
                    <div className="flex w-full items-center gap-3">
                      <Avatar className="h-9 w-9 ring-2 ring-sidebar-background">
                        <AvatarImage
                          src={user.photoURL || userAvatar?.imageUrl}
                          alt={user.displayName || 'Usuario'}
                          data-ai-hint={userAvatar?.imageHint}
                        />
                        <AvatarFallback className="text-sm font-semibold bg-sidebar-accent">
                          {getInitials(user.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start truncate text-left group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold text-sm text-sidebar-foreground truncate max-w-[140px]">
                          {user.displayName || 'Usuario'}
                        </span>
                        <span className="text-xs text-sidebar-foreground/70 truncate max-w-[140px]">
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
                      <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                      <span className="inline-flex items-center rounded-full bg-nixus/10 px-2 py-1 text-xs font-medium text-nixus mt-1">
                        {getRoleName(user.role)}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.otherRoles && user.otherRoles.length > 0 && (
                    <>
                      <DropdownMenuLabel>Cambiar Rol</DropdownMenuLabel>
                      {[user.role, ...user.otherRoles].filter((role, index, self) => self.indexOf(role) === index).map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => switchRole && switchRole(role!)}
                          className="cursor-pointer"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          <span>{getRoleName(role)}</span>
                          {user.role === role && <span className="ml-auto text-xs text-muted-foreground">(Actual)</span>}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </>
                  )}
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
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm md:hidden">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-foreground hover:bg-accent/20 rounded-md transition-colors" />
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 flex-shrink-0 bg-white rounded p-0.5">
                  <Image
                    src="/logo-italcol-full.png"
                    alt="Logo"
                    width={64}
                    height={64}
                    quality={90}
                    className="h-full w-full object-contain"
                    priority
                    sizes="32px"
                  />
                </div>
                <h1 className="text-sm font-bold">SGTC Móvil</h1>
              </div>
            </div>
            <AlertsBell />
          </header>

          <SidebarInset className="flex-1 pb-safe md:pb-0">
            {children}
          </SidebarInset>
        </main>
      </SidebarProvider>
    </IdleTimerProvider>
    </>
  );
}