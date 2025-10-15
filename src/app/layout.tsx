import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// ========================================
// METADATA
// ========================================
export const metadata: Metadata = {
  title: 'SGPT Móvil - Sistema de Permisos de Trabajo',
  description: 'Sistema de Gestión de Permisos de Trabajo - Nixus Consultoría',
  
  // Iconos y favicons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  
  // PWA
  manifest: '/manifest.json',
  
  // Para iOS
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SGPT Móvil',
  },
  
  // Para Android
  applicationName: 'SGPT Móvil',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'SGPT Móvil',
    title: 'SGPT Móvil - Sistema de Permisos de Trabajo',
    description: 'Sistema de Gestión de Permisos de Trabajo - Nixus Consultoría',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SGPT Móvil - Nixus Logo',
      },
    ],
  },
  
  // Metadata adicional
  keywords: ['permisos de trabajo', 'seguridad', 'HSE', 'gestión', 'Nixus'],
  authors: [{ name: 'Nixus Consultoría' }],
  creator: 'Nixus Consultoría',
  publisher: 'Nixus Consultoría',
};

// ========================================
// VIEWPORT (Separado de Metadata)
// ========================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#fb9404',
};

// ========================================
// LAYOUT
// ========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
