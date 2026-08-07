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
    // En false a partir de la Sesión 19. Estaba en true y eso permitió que se
    // acumularan 11 errores de tipos sin que nadie se enterara, entre ellos un
    // bug real de producción en sendGroupEmail (una llamada a .map() sobre un
    // objeto que lanzaba dentro de la rama de éxito). Con el proyecto en cero
    // errores, dejarlo en false hace que un tipo roto detenga el despliegue en
    // vez de llegar a producción.
    // Si urge desplegar con un error de tipos conocido, ponerlo en true es la
    // válvula de escape — pero debe volver a false enseguida.
    ignoreBuildErrors: false,
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
