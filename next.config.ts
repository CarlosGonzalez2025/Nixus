import type {NextConfig} from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  // skipWaiting: false (default) — el SW espera en estado 'waiting' hasta que
  // el usuario confirme la actualización desde el banner PWAUpdater.
  // NO usar skipWaiting: true porque fuerza recarga automática sin consentimiento.
  buildExcludes: [/middleware-manifest\.json$/],
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  swcMinify: true,
  // El worker personalizado agrega el listener para el mensaje SKIP_WAITING
  // que envía el botón "Actualizar" del componente PWAUpdater.
  customWorkerSrc: 'src/sw-message-handler',
  workboxOptions: {
    disableDevLogs: true,
  },
  // ✅ CORRECCIÓN: Se asegura de que el service worker se registre en la raíz.
  scope: '/',
  sw: 'sw.js',
} as any);

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default withPWA(nextConfig);
