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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SGTC Móvil',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

// VIEWPORT (PWA)
//
// Sin `maximumScale`/`userScalable`: bloquear el zoom incumple WCAG 2.1 SC 1.4.4 y en campo
// es justo donde más se necesita (guantes, sol, letra pequeña de un permiso). No afecta al
// modo standalone de la PWA.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
