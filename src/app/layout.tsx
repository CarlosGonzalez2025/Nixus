import type { Metadata, Viewport } from 'next'; // 🔥 Agregar Viewport
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { SwDevCleanup } from '@/components/sw-dev-cleanup';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

// 🔥 METADATA ACTUALIZADA CON PWA
export const metadata: Metadata = {
  title: 'SGTC Móvil - Sistema de Gestión Tareas de Alto Riesgo',
  description: 'Sistema de Gestión Tareas de Alto Riesgo - Nixus Consultoría',
  manifest: '/manifest.json', // 🔥 Link al manifest
  appleWebApp: { // 🔥 Soporte iOS
    capable: true,
    statusBarStyle: 'default',
    title: 'SGTC Móvil',
  },
  formatDetection: { // 🔥 Evitar auto-detección de teléfonos
    telephone: false,
  },
  icons: { // 🔥 Iconos para diferentes plataformas
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

// 🔥 VIEWPORT (NUEVO - Para PWA)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1DB5C1', // Color NIXUS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <SwDevCleanup />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
