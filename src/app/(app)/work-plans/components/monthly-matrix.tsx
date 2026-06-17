'use client';

import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProgresoMensual } from '@/types/work-plan';
import { MONTH_SHORT } from './constants';
import { normalizeMonthlyProgress } from '@/lib/work-plan-service';

interface Props {
  monthlyProgress: ProgresoMensual[];
  readOnly?: boolean;
  /** Recibe los 12 meses ya actualizados; el padre persiste vía updateTask. */
  onChange?: (next: ProgresoMensual[]) => void;
}

/**
 * Matriz mensual: fila P (Planeado) + fila E (Ejecutado).
 * Reglas: "E solo si P" y "desmarcar P limpia E del mismo mes".
 */
export function MonthlyMatrix({ monthlyProgress, readOnly, onChange }: Props) {
  const cells = normalizeMonthlyProgress(monthlyProgress);

  const togglePlanned = (month: number) => {
    if (readOnly || !onChange) return;
    const next = cells.map(c => {
      if (c.month !== month) return c;
      const planned = !c.planned;
      // desmarcar P limpia E automáticamente
      return { ...c, planned, executed: planned ? c.executed : false };
    });
    onChange(next);
  };

  const toggleExecuted = (month: number) => {
    if (readOnly || !onChange) return;
    const cell = cells.find(c => c.month === month);
    if (!cell?.planned) return; // E solo si P está marcado
    const next = cells.map(c =>
      c.month === month ? { ...c, executed: !c.executed } : c,
    );
    onChange(next);
  };

  return (
    <div className="inline-block">
      {/* Encabezado de meses */}
      <div className="grid grid-cols-[28px_repeat(12,minmax(26px,1fr))] gap-0.5 text-[9px] font-medium text-muted-foreground mb-0.5">
        <div />
        {MONTH_SHORT.map((m, i) => (
          <div key={i} className="text-center">{m}</div>
        ))}
      </div>

      {/* Fila Planeado */}
      <div className="grid grid-cols-[28px_repeat(12,minmax(26px,1fr))] gap-0.5 mb-0.5">
        <div className="flex items-center justify-center text-[10px] font-semibold text-sky-600">P</div>
        {cells.map(c => (
          <button
            key={`p-${c.month}`}
            type="button"
            disabled={readOnly}
            onClick={() => togglePlanned(c.month)}
            aria-label={`Planeado ${MONTH_SHORT[c.month]}`}
            className={cn(
              'h-6 rounded-sm border transition-colors',
              c.planned ? 'bg-sky-500 border-sky-600' : 'bg-muted/40 border-muted',
              !readOnly && 'hover:opacity-80 cursor-pointer',
              readOnly && 'cursor-default',
            )}
          />
        ))}
      </div>

      {/* Fila Ejecutado */}
      <div className="grid grid-cols-[28px_repeat(12,minmax(26px,1fr))] gap-0.5">
        <div className="flex items-center justify-center text-[10px] font-semibold text-emerald-600">E</div>
        {cells.map(c => {
          const enabled = c.planned && !readOnly;
          return (
            <button
              key={`e-${c.month}`}
              type="button"
              disabled={!enabled}
              onClick={() => toggleExecuted(c.month)}
              aria-label={`Ejecutado ${MONTH_SHORT[c.month]}`}
              className={cn(
                'h-6 rounded-sm border flex items-center justify-center transition-colors',
                c.executed
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : c.planned
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-300'
                    : 'bg-muted/20 border-muted text-muted-foreground/30',
                enabled && 'hover:opacity-80 cursor-pointer',
                !enabled && 'cursor-default',
              )}
            >
              {c.executed
                ? <Check className="h-3 w-3" />
                : c.planned ? <Minus className="h-3 w-3" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
