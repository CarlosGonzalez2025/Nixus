'use client';

import { Box } from 'lucide-react';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function ConfinadosPage() {
  return (
    <ComingSoonPage
      title="Confinados"
      description="Monitoreo y control de permisos para trabajo en espacios confinados, gestión de atmósferas peligrosas, protocolos de rescate y seguimiento de condiciones ambientales."
      icon={Box}
      gradient="from-violet-500 to-purple-700"
      ringColor="ring-violet-200"
      iconBg="bg-violet-50"
      iconColor="text-violet-500"
    />
  );
}
