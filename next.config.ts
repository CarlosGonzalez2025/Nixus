import type {NextConfig} from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  // El SW espera en estado 'waiting' hasta que el usuario confirme desde el
  // banner PWAUpdater. NO poner true: forzaría recarga automática sin consentimiento.
  skipWaiting: false,
  buildExcludes: [/middleware-manifest\.json$/],
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  swcMinify: true,
  // El worker personalizado agrega el listener SKIP_WAITING, push y notificationclick.
  customWorkerSrc: 'src/sw-message-handler',
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: false,
  },
  scope: '/',
  sw: 'sw.js',
} as any);

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Permite payloads de hasta 4 MB para importaciones masivas de hallazgos.
      // El default de Next.js es 1 MB, insuficiente para lotes grandes de filas.
      bodySizeLimit: '4mb',
    },
  },
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
