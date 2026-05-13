'use client';

import { ArrowUpToLine } from 'lucide-react';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function AlturasPage() {
  return (
    <ComingSoonPage
      title="Alturas"
      description="Gestión integral de permisos y controles para trabajo en alturas, inspecciones de equipos de protección personal, certificaciones y seguimiento de incidentes."
      icon={ArrowUpToLine}
      gradient="from-sky-500 to-blue-600"
      ringColor="ring-sky-200"
      iconBg="bg-sky-50"
      iconColor="text-sky-500"
    />
  );
}
