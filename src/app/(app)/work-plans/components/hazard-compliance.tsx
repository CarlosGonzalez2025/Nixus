'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { TareaPlanTrabajo } from '@/types/work-plan';
import { calcProgressByHazard, calcPlanProgressByMonths } from '@/lib/work-plan-service';
import { HAZARD_COLORS, HAZARD_SIN_ASIGNAR, progressColor } from './constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

/**
 * Cumplimiento del plan desglosado por peligro/programa.
 *
 * El % se mide sobre MESES (ejecutados / planeados) y no sobre el promedio de
 * actividades, de forma que una actividad mensual pese 12 veces más que una
 * puntual — que es como se reporta el cumplimiento del plan anual en SST.
 */
export function HazardCompliance({ tasks }: { tasks: TareaPlanTrabajo[] }) {
  const { porPeligro, global } = useMemo(() => ({
    porPeligro: calcProgressByHazard(tasks, HAZARD_SIN_ASIGNAR),
    global: calcPlanProgressByMonths(tasks),
  }), [tasks]);

  if (tasks.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-nixus" />
          Cumplimiento por peligro
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Meses ejecutados sobre meses planeados. Global del plan:{' '}
          <span className="font-semibold text-foreground tabular-nums">{global.progress}%</span>{' '}
          ({global.executedMonths} de {global.plannedMonths} meses planeados).
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {porPeligro.map(h => (
          <div key={h.hazard} className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: HAZARD_COLORS[h.hazard] ?? HAZARD_COLORS[HAZARD_SIN_ASIGNAR] }}
                />
                <span className="font-medium truncate">{h.hazard}</span>
                <span className="text-muted-foreground shrink-0">
                  · {h.total} actividad{h.total !== 1 ? 'es' : ''}
                </span>
              </span>
              <span className="tabular-nums font-semibold shrink-0">
                {h.progress}%
                <span className="text-muted-foreground font-normal ml-1.5">
                  {h.executedMonths}/{h.plannedMonths} meses
                </span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', progressColor(h.progress))}
                style={{ width: `${h.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
