'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useWorkPlanCompliance } from '@/hooks/use-work-plans';
import { calcProgressByHazard, calcCompliance } from '@/lib/work-plan-service';
import {
  HAZARD_COLORS, HAZARD_SIN_ASIGNAR,
} from '@/app/(app)/work-plans/components/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  CalendarRange, ChevronRight, Loader2, ListChecks, Check, Clock,
} from 'lucide-react';

const barColor = (pct: number) => (pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626');

/**
 * Indicador de cumplimiento del Plan de Trabajo anual, con desglose por peligro.
 *
 * `workPlans` es de acceso exclusivo de administradores (firestore.rules), por lo
 * que la tarjeta solo debe montarse para ese rol — el hook además no abre ninguna
 * suscripción cuando `enabled` es false.
 */
export function WorkPlanCompliance({ enabled }: { enabled: boolean }) {
  const [year, setYear] = useState<number | undefined>(undefined);
  const { plans, tasks, availableYears, targetYear, loading } = useWorkPlanCompliance(enabled, year);

  const global = useMemo(() => calcCompliance(tasks), [tasks]);
  const porPeligro = useMemo(
    () => calcProgressByHazard(tasks, HAZARD_SIN_ASIGNAR),
    [tasks],
  );

  if (!enabled) return null;

  const gauge = [{ name: 'Cumplimiento', value: global.progress, fill: barColor(global.progress) }];

  return (
    <Card className="border-0 shadow-md overflow-hidden min-w-0">
      <CardHeader className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-nixus shrink-0" /> Cumplimiento del Plan de Trabajo
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">
              Actividades ejecutadas sobre actividades programadas
              {targetYear ? ` · vigencia ${targetYear}` : ''}
              {plans.length > 0 ? ` · ${plans.length} plan${plans.length !== 1 ? 'es' : ''}` : ''}.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {availableYears.length > 1 && (
              <Select value={String(targetYear ?? '')} onValueChange={v => setYear(Number(v))}>
                <SelectTrigger className="h-8 w-[110px] text-xs bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Vigencia" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <Link href="/work-plans"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center">
              Ver planes <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 min-w-0">
        {loading ? (
          <div className="h-[220px] flex items-center justify-center text-gray-400">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="h-[200px] flex flex-col items-center justify-center gap-2 text-center">
            <ListChecks className="h-9 w-9 text-gray-200" />
            <p className="text-sm text-gray-500 font-medium">
              {plans.length === 0 ? 'Aún no hay planes de trabajo registrados.' : 'El plan no tiene actividades cargadas.'}
            </p>
            <Link href="/work-plans" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              Ir al Plan de Trabajo Anual →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 min-w-0">

            {/* Indicador general */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-[190px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={gauge}
                    innerRadius="72%" outerRadius="100%"
                    startAngle={90} endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={12} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-bold tabular-nums leading-none" style={{ color: barColor(global.progress) }}>
                    {global.progress}%
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-1.5">
                    Cumplimiento
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1 text-emerald-600 tabular-nums" title="Actividades ejecutadas">
                  <Check className="h-3 w-3" /> {global.executed}
                </span>
                <span className="flex items-center gap-1 text-amber-600 tabular-nums" title="Actividades pendientes">
                  <Clock className="h-3 w-3" /> {global.pending}
                </span>
                {global.inProgress > 0 && (
                  <span className="text-gray-400 tabular-nums" title="Pendientes que ya tienen avance parcial">
                    {global.inProgress} en curso
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {global.executed} de {global.total} actividades del plan
              </p>
            </div>

            {/* Desglose por peligro */}
            <div className="lg:col-span-2 min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Cumplimiento por peligro
              </p>
              <div className="space-y-3.5">
                {porPeligro.map(h => (
                  <div key={h.hazard} className="space-y-1">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: HAZARD_COLORS[h.hazard] ?? HAZARD_COLORS[HAZARD_SIN_ASIGNAR] }} />
                        <span className="font-medium text-gray-700 truncate">{h.hazard}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-gray-400">
                        <span className="font-bold text-gray-800 text-sm">{h.progress}%</span>
                        <span className="ml-1.5">{h.executed}/{h.total} act.</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(h.progress, 100)}%`, background: barColor(h.progress) }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className={cn(
                'text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100 leading-snug',
              )}>
                Las actividades sin peligro asignado aparecen como «{HAZARD_SIN_ASIGNAR}». Asígnelo desde la
                actividad del plan para incluirlas en el indicador del programa correspondiente.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
