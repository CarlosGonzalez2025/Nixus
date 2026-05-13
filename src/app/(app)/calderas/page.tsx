'use client';

import { Flame } from 'lucide-react';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function CalderasPage() {
  return (
    <ComingSoonPage
      title="Calderas"
      description="Control y seguimiento de calderas industriales, inspecciones periódicas, gestión de certificaciones, reportes de operación y cumplimiento normativo."
      icon={Flame}
      gradient="from-orange-500 to-red-600"
      ringColor="ring-orange-200"
      iconBg="bg-orange-50"
      iconColor="text-orange-500"
    />
  );
}
