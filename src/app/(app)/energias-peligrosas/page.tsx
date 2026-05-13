'use client';

import { Zap } from 'lucide-react';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function EnergiasPeligrosasPage() {
  return (
    <ComingSoonPage
      title="Energías Peligrosas"
      description="Gestión de bloqueo y etiquetado (LOTO) de energías peligrosas, procedimientos de aislamiento, control de fuentes de energía y verificación de puntos de desconexión."
      icon={Zap}
      gradient="from-yellow-400 to-amber-600"
      ringColor="ring-yellow-200"
      iconBg="bg-yellow-50"
      iconColor="text-yellow-600"
    />
  );
}
