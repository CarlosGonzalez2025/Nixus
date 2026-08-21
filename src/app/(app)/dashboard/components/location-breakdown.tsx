'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/** Fila agregada de una dimensión geográfica/organizacional del dashboard. */
export interface LocationRow {
  name: string;
  Permisos: number;
  Hallazgos: number;
  /** Hallazgos ya cerrados. */
  Resueltos: number;
  /** Resueltos / Hallazgos * 100. */
  pctResueltos: number;
}

const barColor = (pct: number) => (pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#dc2626');

// Mismo criterio que la matriz de cobertura: 10 filas visibles y el resto por
// scroll dentro de la tarjeta, para que ninguna crezca con el volumen de datos.
const FILAS_VISIBLES = 10;
const ALTO_FILA = 46;

/**
 * Volumen de operación (permisos + hallazgos) por empresa, planta o ciudad, con el
 * % de resolución de hallazgos al lado de cada barra: el volumen por sí solo no
 * dice si la operación va bien, el % de cierre sí.
 */
export function LocationBreakdown({
  title, icon: Icon, iconClass, data, unit, emptyLabel = 'Sin datos',
}: {
  title: string;
  icon: React.ElementType;
  iconClass: string;
  data: LocationRow[];
  /** Sustantivo en singular para el pie de la tarjeta: «empresa», «planta», «ciudad». */
  unit: string;
  emptyLabel?: string;
}) {
  const yWidth = data.length > 0
    ? Math.min(200, Math.max(110, Math.max(...data.map(d => d.name.length)) * 7))
    : 110;
  const chartH = Math.max(240, data.length * ALTO_FILA + 56);
  const altoVisible = FILAS_VISIBLES * ALTO_FILA + 56;
  const totalHallazgos = data.reduce((a, d) => a + d.Hallazgos, 0);
  const totalResueltos = data.reduce((a, d) => a + d.Resueltos, 0);
  const pctGlobal = totalHallazgos === 0 ? 0 : Math.round((totalResueltos / totalHallazgos) * 100);
  const plural = unit === 'ciudad' ? 'ciudades' : `${unit}s`;

  return (
    <Card className="border-0 shadow-md flex flex-col overflow-hidden min-w-0">
      <CardHeader className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2 min-w-0">
            <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} /> <span className="truncate">{title}</span>
          </CardTitle>
          {totalHallazgos > 0 && (
            <span className="text-xs text-gray-400 shrink-0">
              Resolución{' '}
              <span className="font-bold tabular-nums" style={{ color: barColor(pctGlobal) }}>{pctGlobal}%</span>
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-[200px] text-gray-400">
            <div className="text-center">
              <Icon className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm">{emptyLabel}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto overflow-x-hidden min-w-0" style={{ maxHeight: altoVisible }}>
              <div style={{ height: chartH }}>
                <ResponsiveContainer width="100%" height="100%">
                  {/* right: 66 deja sitio al total y al % de resolución fuera de la barra. */}
                  <BarChart data={data} layout="vertical" margin={{ top: 8, right: 66, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={yWidth}
                      axisLine={false}
                      tickLine={false}
                      tick={({ x, y, payload }) => (
                        <text x={x} y={y} dy={4} textAnchor="end" fill="#374151" fontSize={11} fontFamily="inherit">
                          {payload.value}
                        </text>
                      )}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelFormatter={(label) => <span style={{ fontWeight: 600 }}>{label}</span>}
                      formatter={(v: number, n: string, item: any) => {
                        if (n !== 'Hallazgos') return [v, n];
                        const row = item?.payload as LocationRow | undefined;
                        return [`${v} · ${row?.pctResueltos ?? 0}% resueltos`, n];
                      }}
                    />
                    <Bar dataKey="Permisos" stackId="a" fill="#3b82f6">
                      <LabelList dataKey="Permisos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                    </Bar>
                    <Bar dataKey="Hallazgos" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]}>
                      <LabelList dataKey="Hallazgos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                      {/* Etiqueta externa: total de la fila + % de resolución de sus hallazgos. */}
                      <LabelList
                        content={({ x, y, width, height, index }: any) => {
                          const item = data[index as number];
                          if (!item) return null;
                          const cx = (x as number) + (width as number) + 6;
                          const cy = (y as number) + (height as number) / 2;
                          return (
                            <g>
                              <text x={cx} y={cy} fill="#6B7280" fontSize={10} fontWeight={600}
                                textAnchor="start" dominantBaseline={item.Hallazgos > 0 ? 'auto' : 'middle'}>
                                {item.Permisos + item.Hallazgos}
                              </text>
                              {item.Hallazgos > 0 && (
                                <text x={cx} y={cy + 10} fill={barColor(item.pctResueltos)} fontSize={9} fontWeight={700}
                                  textAnchor="start" dominantBaseline="auto">
                                  {item.pctResueltos}%
                                </text>
                              )}
                            </g>
                          );
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Permisos</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Hallazgos</span>
                <span className="text-xs text-gray-400">% = hallazgos resueltos</span>
              </div>
              <span className="text-[11px] text-gray-400">
                {data.length} {data.length !== 1 ? plural : unit}
                {data.length > FILAS_VISIBLES && ` · desplácese para ver todas`}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
