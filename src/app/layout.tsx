import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SGPT Móvil - Sistema de Permisos de Trabajo',
  description: 'Sistema de Gestión de Permisos de Trabajo - Nixus Consultoría',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
