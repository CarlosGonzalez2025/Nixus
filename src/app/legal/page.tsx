import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, FileText, Cookie, Lock, ChevronRight } from 'lucide-react';
import { LegalShell } from '@/components/legal/legal-shell';

export const metadata: Metadata = {
  title: 'Centro Legal | SGTC',
  description:
    'Políticas de privacidad, términos y condiciones, cookies y seguridad de la información de la plataforma SGTC.',
};

const DOCS = [
  {
    href: '/legal/privacidad',
    icon: ShieldCheck,
    title: 'Política de Privacidad y Tratamiento de Datos Personales',
    desc: 'Cómo recolectamos, usamos, almacenamos y protegemos sus datos personales conforme a la Ley 1581 de 2012.',
  },
  {
    href: '/legal/terminos',
    icon: FileText,
    title: 'Términos y Condiciones de Uso',
    desc: 'Reglas de acceso y uso de la plataforma, responsabilidades del usuario y limitaciones.',
  },
  {
    href: '/legal/cookies',
    icon: Cookie,
    title: 'Política de Cookies y Almacenamiento Local',
    desc: 'Tecnologías que usamos para autenticación, sesión y funcionamiento sin conexión.',
  },
  {
    href: '/legal/seguridad',
    icon: Lock,
    title: 'Política de Seguridad de la Información',
    desc: 'Medidas técnicas y organizativas que protegen la información de la plataforma.',
  },
];

export default function LegalIndexPage() {
  return (
    <LegalShell
      title="Centro Legal"
      subtitle="Documentos que rigen el uso de la plataforma y el tratamiento de la información."
    >
      <p>
        En este centro encontrará todos los documentos legales que regulan la plataforma. Le
        recomendamos leerlos detenidamente antes de utilizar el sistema. Estos documentos están
        disponibles públicamente y pueden consultarse en cualquier momento desde la pantalla de
        inicio de sesión.
      </p>

      <div className="not-prose grid gap-3 sm:grid-cols-2">
        {DOCS.map((doc) => {
          const Icon = doc.icon;
          return (
            <Link
              key={doc.href}
              href={doc.href}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <ChevronRight className="ml-auto h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">{doc.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{doc.desc}</p>
            </Link>
          );
        })}
      </div>
    </LegalShell>
  );
}
