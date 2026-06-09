'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getDiagnosticoAltura, deleteDiagnosticoAltura } from '@/lib/alturas-service';
import {
  RESULT_LABELS_ALTURAS,
  ESCALERAS_ITEMS,
  ARNESES_ITEMS,
  EMERGENCIAS_ITEMS,
  type DiagnosticoAltura,
  type DiagnosticoAlturaResultados,
} from '@/types/alturas';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft, Loader2, Trash2, BarChart2,
  ArrowUpToLine, Calendar, CheckCircle2, XCircle, PenLine,
} from 'lucide-react';

const parseDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

function InfoRow({ label, value }: { label: string; value?: string | string[] | null }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div>
      <dt className="text-xs text-muted-foreground font-medium">{label}</dt>
      <dd className="text-sm mt-0.5">
        {Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {value.map(v => (
              <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
            ))}
          </div>
        ) : value}
      </dd>
    </div>
  );
}

function GroupBadge({ n }: { n: number }) {
  return (
    <span className="bg-sky-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
      {n}
    </span>
  );
}

function ScoreSection({ resultados }: { resultados: DiagnosticoAlturaResultados }) {
  const MAX   = 14;
  const score = resultados.sumaTotal;
  const pct   = score != null ? Math.round((score / MAX) * 100) : null;

  const scoreKeys = Object.keys(RESULT_LABELS_ALTURAS).filter(
    k => k !== 'sumaTotal',
  ) as (keyof DiagnosticoAlturaResultados)[];

  const shortLabel = (k: keyof DiagnosticoAlturaResultados) =>
    RESULT_LABELS_ALTURAS[k]
      .replace('Procedimientos para la gestión de trabajo en alturas', 'Procedimientos')
      .replace('Permisos de trabajo', 'Permisos')
      .replace('Gestión de medidas de prevención', 'Gest. medidas')
      .replace('Gestión documental', 'Documental')
      .replace('Gestión del riesgo y control operacional', 'Riesgo/Control')
      .replace('Gestión de equipos y sistemas', 'Equipos')
      .replace('Gestión de emergencias', 'Emergencias');

  const scoreBg = (val: number | undefined) => {
    if (val == null) return 'bg-muted/30 border-muted';
    if (val === 2)   return 'bg-green-50 border-green-200';
    if (val === 1)   return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const scoreColor = (val: number | undefined) => {
    if (val == null) return 'text-muted-foreground';
    if (val === 2)   return 'text-green-600';
    if (val === 1)   return 'text-amber-600';
    return 'text-red-500';
  };

  return (
    <Card className="border-sky-200 bg-sky-50/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-sky-600" />
          Resultados del Diagnóstico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-5">
          <div className={cn(
            'text-4xl font-bold tabular-nums',
            score == null ? 'text-muted-foreground' :
            score >= 10 ? 'text-green-600' : score >= 6 ? 'text-amber-600' : 'text-red-600',
          )}>
            {score != null ? score : '—'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-muted-foreground mb-1.5">
              Suma total resultado
              <span className="ml-2 text-xs">/ {MAX} puntos máximos</span>
            </div>
            {pct != null && (
              <>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all', {
                    'bg-green-500': pct >= 71,
                    'bg-amber-500': pct >= 43 && pct < 71,
                    'bg-red-500':   pct < 43,
                  })} style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {pct >= 71 ? '✓ Nivel de cumplimiento alto' :
                   pct >= 43 ? '⚠ Nivel de cumplimiento medio' :
                   '✗ Nivel de cumplimiento bajo'}
                </div>
              </>
            )}
          </div>
          {pct != null && (
            <span className={cn('text-2xl font-bold',
              pct >= 71 ? 'text-green-600' : pct >= 43 ? 'text-amber-600' : 'text-red-600',
            )}>{pct}%</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {scoreKeys.map(key => {
            const val = resultados[key];
            return (
              <div key={key} className={cn('rounded-lg p-2.5 text-center border', scoreBg(val))}>
                <div className={cn('text-xl font-bold tabular-nums', scoreColor(val))}>
                  {val != null ? val : '—'}
                </div>
                <div className="text-[9px] leading-tight mt-1 text-muted-foreground font-medium uppercase tracking-wide">
                  {shortLabel(key)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DiagnosticoAlturaDetailPage() {
  const router     = useRouter();
  const params     = useParams();
  const id         = params?.id as string;
  const { toast }  = useToast();

  const [diagnostico, setDiagnostico] = useState<DiagnosticoAltura | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getDiagnosticoAltura(id).then(d => {
      setDiagnostico(d);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteDiagnosticoAltura(id);
      toast({ title: 'Diagnóstico eliminado' });
      router.push('/alturas/diagnostico');
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!diagnostico) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-6 items-center justify-center">
        <p className="text-muted-foreground">Diagnóstico no encontrado.</p>
        <Button variant="outline" onClick={() => router.push('/alturas/diagnostico')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
      </div>
    );
  }

  const fecha        = parseDate(diagnostico.createdAt);
  const STATUS_COLOR = diagnostico.status === 'completado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700';
  const STATUS_LABEL = diagnostico.status === 'completado' ? 'Completado' : 'Borrador';

  const ALL_EQUIPO_ITEMS = [...ESCALERAS_ITEMS, ...ARNESES_ITEMS, ...EMERGENCIAS_ITEMS];

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <button
            onClick={() => router.push('/alturas/diagnostico')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1"
          >
            <ArrowLeft className="h-3 w-3" /> Diagnóstico
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <ArrowUpToLine className="h-6 w-6 text-sky-600" />
            Diagnóstico – {diagnostico.empresa}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={cn('text-xs', STATUS_COLOR)}>{STATUS_LABEL}</Badge>
            {fecha && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es })}
              </span>
            )}
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" disabled={deleting}>
              {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar diagnóstico?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El diagnóstico será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Score */}
      {diagnostico.resultados && <ScoreSection resultados={diagnostico.resultados} />}

      {/* Grupo 1 – Datos Generales */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <GroupBadge n={1} /> Datos Generales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            <InfoRow label="Fecha"      value={diagnostico.fecha} />
            <InfoRow label="Empresa"    value={diagnostico.empresa} />
            <InfoRow label="Planta"     value={diagnostico.planta} />
            <InfoRow label="Proceso"    value={diagnostico.proceso} />
            <InfoRow label="Creado por" value={diagnostico.createdByName} />
          </dl>
        </CardContent>
      </Card>

      {/* Grupo 2 – Información de la Actividad */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <GroupBadge n={2} /> Información de la Actividad Analizada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-3">
            <InfoRow label="Actividad analizada"                         value={diagnostico.actividadAnalizada} />
            <InfoRow label="Detalle de la actividad"                     value={diagnostico.detalleActividad} />
            <InfoRow label="Altura promedio"                             value={diagnostico.alturaPromedio} />
            <InfoRow label="Desarrollada por"                            value={diagnostico.desarrolladaPor} />
            <InfoRow label="Frecuencia de ejecución"                     value={diagnostico.frecuenciaEjecucion} />
            <InfoRow label="Alto riesgo adicional"                       value={diagnostico.tieneAltoRiesgoAdicional} />
            <InfoRow label="Actividades de alto riesgo"                  value={diagnostico.actividadesAltoRiesgo} />
            <InfoRow label="Evaluada en matriz IPER"                     value={diagnostico.evaluadaEnIPER} />
            <InfoRow label="Cuenta con procedimiento de seguridad"       value={diagnostico.cuentaConProcedimiento} />
            <InfoRow label="Medidas de prevención"                       value={diagnostico.medidasPrevencion} />
          </dl>
        </CardContent>
      </Card>

      {/* Grupo 3-5 – Equipos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <GroupBadge n={3} /> Checklist de Equipos y EPP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_EQUIPO_ITEMS.map(({ field, label }) => {
              const vals = (diagnostico as any)[field as string] as string[] | undefined;
              if (!vals || vals.length === 0) return null;
              const seUtiliza = vals.some(v => v.toLowerCase().includes('se utiliza') || v.toLowerCase().includes('inspección'));
              return (
                <div key={field as string} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-semibold text-foreground">{label}</h5>
                    {seUtiliza
                      ? <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      : <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vals.map(v => (
                      <Badge key={v} variant="secondary" className="text-[11px]">{v}</Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {diagnostico.eppUtilizados && diagnostico.eppUtilizados.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">EPP utilizados</p>
                <div className="flex flex-wrap gap-1">
                  {diagnostico.eppUtilizados.map(v => (
                    <Badge key={v} variant="secondary" className="text-[11px]">{v}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Grupo 6 – Firma y Cierre */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <GroupBadge n={4} /> Firma y Cierre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5">
            <InfoRow label="¿Se han presentado cargos de alturas?"       value={diagnostico.seHanPresentadoCargos} />
            <InfoRow label="¿El cliente acepta la información?"          value={diagnostico.clienteAceptaInfo} />
          </dl>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <PenLine className="h-3.5 w-3.5 text-sky-600" /> Asesor SST
              </p>
              {diagnostico.nombreSST && (
                <p className="text-sm font-medium">{diagnostico.nombreSST}</p>
              )}
              {diagnostico.firmaSST ? (
                <div className="border rounded-lg p-2 bg-white">
                  <img src={diagnostico.firmaSST} alt="Firma SST" className="max-h-28 w-full object-contain" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Sin firma</p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <PenLine className="h-3.5 w-3.5 text-sky-600" /> Persona Responsable
              </p>
              {diagnostico.nombreResponsable && (
                <p className="text-sm font-medium">{diagnostico.nombreResponsable}</p>
              )}
              {diagnostico.firmaResponsable ? (
                <div className="border rounded-lg p-2 bg-white">
                  <img src={diagnostico.firmaResponsable} alt="Firma responsable" className="max-h-28 w-full object-contain" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Sin firma</p>
              )}
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
