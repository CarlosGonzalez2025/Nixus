'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { TareaPlanTrabajo } from '@/types/work-plan';
import { calcProgressByHazard, calcCompliance } from '@/lib/work-plan-service';
import { HAZARD_COLORS, HAZARD_SIN_ASIGNAR, progressColor } from './constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

/**
 * Cumplimiento del plan desglosado por peligro/programa.
 *
 * Se mide en ACTIVIDADES (ejecutadas / programadas), la misma unidad que usa la
 * cabecera del plan. Antes se expresaba en meses y se leía como avance de
 * calendario, que no es lo que reporta un plan de trabajo anual.
 */
export function HazardCompliance({ tasks }: { tasks: TareaPlanTrabajo[] }) {
  const { porPeligro, global } = useMemo(() => ({
    porPeligro: calcProgressByHazard(tasks, HAZARD_SIN_ASIGNAR),
    global: calcCompliance(tasks),
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
          Actividades ejecutadas sobre actividades programadas. Global del plan:{' '}
          <span className="font-semibold text-foreground tabular-nums">{global.progress}%</span>{' '}
          ({global.executed} de {global.total} actividades
          {global.inProgress > 0 && `, ${global.inProgress} con avance parcial`}).
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
              </span>
              <span className="tabular-nums font-semibold shrink-0">
                {h.progress}%
                <span className="text-muted-foreground font-normal ml-1.5">
                  {h.executed}/{h.total} actividad{h.total !== 1 ? 'es' : ''}
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
