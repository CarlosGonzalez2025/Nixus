'use client';

import { useRouter } from 'next/navigation';
import { ArrowUpToLine, ClipboardList, Brain, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SubmoduloCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

function SubmoduloCard({ title, description, href, icon: Icon, color }: SubmoduloCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(href)}
      className="relative overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer active:scale-[0.99]"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn('p-2.5 rounded-xl', color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
        </div>

        <div className="mt-4 flex items-center text-xs font-medium text-primary gap-1">
          Ver módulo <ChevronRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AlturasPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
          <ArrowUpToLine className="h-6 w-6 text-sky-600" />
          Alturas
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Gestión integral de trabajo en alturas: inventario, inspección de equipos, permisos y análisis de riesgo.
        </p>
      </div>

      {/* Submódulos */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Submódulos disponibles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <SubmoduloCard
            title="Inventario"
            description="Checklist de evaluación de riesgos, escaleras, andamios, arneses, sistemas de protección contra caídas y EPP para trabajo en alturas."
            href="/alturas/diagnostico"
            icon={ClipboardList}
            color="bg-sky-600"
          />

          <SubmoduloCard
            title="Análisis & Métricas"
            description="Estadística descriptiva, clustering K-Means, tendencias y detección de anomalías sobre los inventarios de alturas registrados."
            href="/alturas/analisis"
            icon={Brain}
            color="bg-blue-600"
          />

          <SubmoduloCard
            title="Historial & Seguimiento"
            description="Seguimiento de inventarios completados, tendencias y alertas por planta."
            href="/alturas/diagnostico"
            icon={Clock}
            color="bg-cyan-500"
          />

        </div>
      </div>

    </div>
  );
}
