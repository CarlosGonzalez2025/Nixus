'use client';

import { useRouter } from 'next/navigation';
import { Box, ClipboardList, Clock, ChevronRight, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SubmoduloCardProps {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
  icon: React.ElementType;
  color: string;
}

function SubmoduloCard({ title, description, href, comingSoon, icon: Icon, color }: SubmoduloCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => !comingSoon && href && router.push(href)}
      className={cn(
        'relative overflow-hidden transition-all',
        comingSoon
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:shadow-md hover:scale-[1.01] cursor-pointer active:scale-[0.99]',
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn('p-2.5 rounded-xl', color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {comingSoon && (
            <Badge className="bg-amber-100 text-amber-600 text-[10px] font-bold">Pronto</Badge>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
        </div>

        {!comingSoon && (
          <div className="mt-4 flex items-center text-xs font-medium text-primary gap-1">
            Ver módulo <ChevronRight className="h-3 w-3" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ConfinadosPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
          <Box className="h-6 w-6 text-violet-600" />
          Confinados
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Gestión integral de espacios confinados: inventario, permisos, monitoreo y rescate.
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
            description="Checklist de evaluación de riesgos, facilidades, equipos y EPP para espacios confinados."
            href="/confinados/diagnostico"
            icon={ClipboardList}
            color="bg-violet-600"
          />

          <SubmoduloCard
            title="Análisis & Métricas"
            description="Estadística descriptiva, clustering K-Means, tendencias y detección de anomalías sobre los inventarios registrados."
            href="/confinados/analisis"
            icon={Brain}
            color="bg-indigo-600"
          />

          <SubmoduloCard
            title="Historial & Seguimiento"
            description="Seguimiento de inventarios completados, tendencias y alertas por planta."
            comingSoon
            icon={Clock}
            color="bg-sky-500"
          />

        </div>
      </div>

    </div>
  );
}
