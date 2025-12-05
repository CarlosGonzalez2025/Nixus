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
  const { pendingPermits } = useSidebarBadges();

  // 🔥 SOLUCIÓN: Estado para evitar hydration mismatch
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

  // Función para navegación con feedback háptico
  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    router.push(path);
  };

  // 🔥 Renderizar un skeleton durante la hidratación inicial
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

  // Loading state
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

  // Not authenticated
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
    <IdleTimerProvider timeout={30} warningTime={5}>
      <SidebarProvider>
        <FirebaseErrorListener />
        
        {/* 🔥 AQUÍ ESTABA EL ERROR - FALTABA ABRIR <Sidebar> */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b">
            <div className="flex flex-col items-center gap-3 p-4 text-center">
              <div className="flex w-full items-start justify-between">
                <div className="w-8" />
                <div className="bg-white rounded-lg p-2 shadow-sm transition-all group-data-[collapsible=icon]:p-1">
                  <Image 
                    src="https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png" 
                    alt="Logo SGTC" 
                    width={240}
                    height={200}
                    quality={100}
                    className="h-auto w-full max-w-[120px] transition-all group-data-[collapsible=icon]:max-w-[32px]"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                    priority
                    sizes="(max-width: 768px) 120px, 240px"
                  />
                </div>
                <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors md:hidden -mr-2" />
              </div>
              <span className="text-base md:text-lg font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                SGTC Móvil
              </span>
            </div>
          </SidebarHeader>

          {/* Contenido del Sidebar */}
          <SidebarContent className="px-2">
            <SidebarMenu>
              {/* Grupo Principal */}
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

                {(user.role === 'lider_tarea' || user.role === 'solicitante' || user.role === 'admin') && (
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
              </SidebarGroup>

              <SidebarSeparator className="my-2" />

              {/* Grupo Ayuda */}
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

              {/* Grupo Administración (solo admin) */}
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

          {/* Footer del Sidebar */}
          <SidebarFooter className="border-t">
            <SidebarSeparator className="mb-2" />
            
            {/* Alertas en una fila separada en móvil */}
            <div className="px-2 pb-2 md:hidden">
              <AlertsBell className="w-full" />
            </div>

            <div className="px-2 pb-2 flex items-center justify-between gap-2">
              {/* Alertas solo en desktop */}
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
        {/* 🔥 FIN DEL <Sidebar> */}

        {/* Contenido Principal */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header Móvil */}
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm md:hidden">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-foreground hover:bg-accent/20 rounded-md transition-colors" />
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 flex-shrink-0 bg-white rounded p-0.5">
                  <Image 
                    src="https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png" 
                    alt="Logo" 
                    width={64}
                    height={64}
                    quality={100}
                    className="h-full w-full object-contain"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                    priority
                    sizes="32px"
                  />
                </div>
                <h1 className="text-sm font-bold">SGTC Móvil</h1>
              </div>
            </div>
            <AlertsBell />
          </header>

          {/* Contenido de la página */}
          <SidebarInset className="flex-1 pb-safe md:pb-0">
            {children}
          </SidebarInset>
        </main>
      </SidebarProvider>
    </IdleTimerProvider>
  );
}
