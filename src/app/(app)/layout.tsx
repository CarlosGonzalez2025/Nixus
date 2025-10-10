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
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
} from 'lucide-react';
import { Logo } from '@/components/logo';
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-10 items-center justify-between px-2">
            <Logo className="text-sidebar-foreground" />
            <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
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
                isActive={pathname.startsWith('/permits')}
                tooltip="Work Permits"
              >
                <FileText />
                <span>Work Permits</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push('/permits/create')}
                isActive={pathname === '/permits/create'}
                tooltip="New Permit"
              >
                <PlusCircle />
                <span>New Permit</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
                        alt={user.displayName || 'User'}
                        data-ai-hint={userAvatar?.imageHint}
                      />
                      <AvatarFallback>
                        {getInitials(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden flex-col items-start truncate text-left group-data-[collapsible=offcanvas]:flex group-data-[collapsible=icon]:hidden">
                      <span className="font-medium text-sidebar-foreground">
                        {user.displayName || 'User'}
                      </span>
                      <span className="text-xs text-sidebar-foreground/70">
                        {user.email}
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
