import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_CONFIG } from '@/lib/legal-config';

const NAV = [
  { href: '/legal/privacidad', label: 'Privacidad y Datos' },
  { href: '/legal/terminos', label: 'Términos y Condiciones' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/seguridad', label: 'Seguridad' },
];

/**
 * Contenedor visual compartido por todas las páginas legales públicas.
 * No requiere autenticación: vive fuera del grupo de rutas (app).
 */
export function LegalShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Encabezado */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/login" className="flex items-center gap-3">
            <Image
              src="/logo-italcol-full.png"
              alt="Italcol"
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
            />
            <span className="hidden text-sm font-semibold text-slate-700 sm:inline">
              {LEGAL_CONFIG.app.nombre}
            </span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Navegación entre documentos */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-slate-500 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Contenido */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          <p className="mt-3 text-xs text-slate-400">
            Última actualización: {LEGAL_CONFIG.ultimaActualizacion}
          </p>
        </div>

        <article className="space-y-6 text-sm leading-relaxed text-slate-700 [&_a]:text-primary [&_a]:underline [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-slate-800 [&_li]:mb-1.5 [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc">
          {children}
        </article>
      </main>

      {/* Pie */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
          <p className="font-medium text-slate-500">
            {LEGAL_CONFIG.operador.razonSocial} — NIT {LEGAL_CONFIG.operador.nit}
          </p>
          <p className="mt-1">{LEGAL_CONFIG.operador.direccion}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {LEGAL_CONFIG.operador.nombreComercial}. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
