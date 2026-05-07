'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useVerificationDetail } from '@/hooks/use-contractor-verifications';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import type { VerificationResult, VerificationStatus, ActionPlanStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ChevronLeft, Loader2, ClipboardCheck, Building2, MapPin,
  Calendar, User, CheckCircle2, XCircle, AlertTriangle,
  MinusCircle, FileEdit, List, ClipboardList, Download,
} from 'lucide-react';
import { generateVerificacionPDF } from '@/lib/pdf-verificacion';

// ── Configs visuales ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<VerificationStatus, { label: string; color: string }> = {
  DRAFT:       { label: 'Borrador',    color: 'bg-gray-100 text-gray-700' },
  IN_PROGRESS: { label: 'En Progreso', color: 'bg-blue-100 text-blue-800' },
  COMPLETED:   { label: 'Completado',  color: 'bg-green-100 text-green-800' },
  CLOSED:      { label: 'Cerrado',     color: 'bg-slate-100 text-slate-700' },
  CANCELLED:   { label: 'Cancelado',   color: 'bg-red-100 text-red-700' },
};

const AP_STATUS_CONFIG: Record<ActionPlanStatus, { label: string; color: string }> = {
  OPEN:        { label: 'Abierto',      color: 'bg-red-100 text-red-700' },
  IN_PROGRESS: { label: 'En Progreso',  color: 'bg-blue-100 text-blue-800' },
  CLOSED:      { label: 'Cerrado',      color: 'bg-green-100 text-green-800' },
  OVERDUE:     { label: 'Vencido',      color: 'bg-orange-100 text-orange-800' },
  CANCELLED:   { label: 'Cancelado',    color: 'bg-gray-100 text-gray-600' },
};

const RESULT_ICONS: Record<VerificationResult, { icon: React.ElementType; color: string; label: string }> = {
  C:  { icon: CheckCircle2,  color: 'text-green-600', label: 'Cumple' },
  NC: { icon: XCircle,       color: 'text-red-600',   label: 'No Cumple' },
  OM: { icon: AlertTriangle, color: 'text-amber-600', label: 'Oportunidad' },
  NA: { icon: MinusCircle,   color: 'text-gray-400',  label: 'No Aplica' },
};

const parseDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

// ── Componente ────────────────────────────────────────────────────────────────

export default function VerificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const { verification, answers, actionPlans, loading } = useVerificationDetail(id);
  const { canEditVerification } = useVerificationPermissions(user);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!verification) return;
    setPdfLoading(true);
    try {
      await generateVerificacionPDF(verification, answers, actionPlans);
    } finally {
      setPdfLoading(false);
    }
  }, [verification, answers, actionPlans]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 flex-col gap-3">
        <ClipboardCheck className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">Verificación no encontrada.</p>
        <Button variant="outline" size="sm" onClick={() => router.push('/contractor-verifications')}>
          Volver al listado
        </Button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[verification.status];
  const verDate = parseDate(verification.verificationDate);
  const closedDate = parseDate(verification.closedAt);
  const pct = verification.compliancePercentage;
  const canEdit = canEditVerification(verification);

  // Agrupar respuestas por grupo
  const groupedAnswers = new Map<string, { title: string; answers: typeof answers }>();
  answers.forEach(a => {
    if (!groupedAnswers.has(a.groupId)) {
      groupedAnswers.set(a.groupId, { title: a.groupTitle, answers: [] });
    }
    groupedAnswers.get(a.groupId)!.answers.push(a);
  });
  const groups = Array.from(groupedAnswers.values());

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0 max-w-5xl mx-auto w-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <button
            type="button"
            onClick={() => router.push('/contractor-verifications')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-1"
          >
            <ChevronLeft className="h-4 w-4" /> Verificaciones
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{verification.riskTypeName}</h1>
          <p className="text-sm text-muted-foreground">{verification.templateName} v{verification.templateVersion}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={cn('text-xs', statusCfg.color)}>{statusCfg.label}</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
          >
            {pdfLoading
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : <Download className="mr-2 h-4 w-4" />}
            Descargar PDF
          </Button>
          {canEdit && (
            <Button size="sm" onClick={() => router.push(`/contractor-verifications/${id}/checklist`)}>
              <FileEdit className="mr-2 h-4 w-4" />
              Diligenciar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Columna izquierda: datos generales + cumplimiento */}
        <div className="lg:col-span-1 space-y-4">

          {/* Datos generales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Datos de la verificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{verification.companyName}</p>
                  {verification.contractorName && (
                    <p className="text-xs text-muted-foreground">{verification.contractorName}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p>{verification.plantName} · {verification.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p>{verDate ? format(verDate, 'PPP', { locale: es }) : '—'}</p>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p>{verification.createdByName}</p>
              </div>
              {verification.workLocation && (
                <div>
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                  <p>{verification.workLocation}</p>
                </div>
              )}
              {verification.activityDescription && (
                <div>
                  <p className="text-xs text-muted-foreground">Actividad</p>
                  <p>{verification.activityDescription}</p>
                </div>
              )}
              {verification.projectName && (
                <div>
                  <p className="text-xs text-muted-foreground">Proyecto</p>
                  <p>{verification.projectName}</p>
                </div>
              )}
              {closedDate && (
                <div>
                  <p className="text-xs text-muted-foreground">Fecha de cierre</p>
                  <p>{format(closedDate, 'PPP', { locale: es })}</p>
                </div>
              )}
              {verification.generalObservations && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Observaciones generales</p>
                  <p className="text-sm">{verification.generalObservations}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen de cumplimiento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Resumen de cumplimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold tabular-nums"
                  style={{ color: pct >= 80 ? '#16a34a' : pct >= 50 ? '#2563eb' : '#dc2626' }}>
                  {pct}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">de cumplimiento</p>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-4">
                <div className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#3b82f6' : '#ef4444',
                  }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Cumple',              count: verification.compliantItems,    color: 'bg-green-500' },
                  { label: 'No Cumple',           count: verification.nonCompliantItems, color: 'bg-red-500' },
                  { label: 'Oportunidad Mejora',  count: verification.improvementItems,  color: 'bg-amber-500' },
                  { label: 'No Aplica',           count: verification.notApplicableItems,color: 'bg-gray-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2.5 h-2.5 rounded-full', s.color)} />
                      <span className="text-muted-foreground">{s.label}</span>
                    </div>
                    <span className="font-semibold tabular-nums">{s.count}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-1 border-t">
                  <span className="font-medium">Total ítems</span>
                  <span className="font-bold">{verification.totalItems}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Planes de acción */}
          {actionPlans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Planes de acción ({actionPlans.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {actionPlans.map(ap => {
                  const apCfg = AP_STATUS_CONFIG[ap.status];
                  const dueDate = parseDate(ap.dueDate);
                  return (
                    <div key={ap.id} className="p-3 rounded-lg border text-sm">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Badge className={cn('text-xs flex-shrink-0', ap.findingType === 'NC' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
                          {ap.findingType}
                        </Badge>
                        <Badge className={cn('text-xs', apCfg.color)}>{apCfg.label}</Badge>
                      </div>
                      <p className="font-medium line-clamp-2">{ap.correctiveAction}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>{ap.responsibleName}</span>
                        {dueDate && <span>Vence: {format(dueDate, 'dd/MM/yyyy', { locale: es })}</span>}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Columna derecha: respuestas por grupo */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Respuestas de la verificación
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {answers.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  {canEdit
                    ? <Button onClick={() => router.push(`/contractor-verifications/${id}/checklist`)}>
                        <FileEdit className="mr-2 h-4 w-4" /> Iniciar diligenciamiento
                      </Button>
                    : 'No hay respuestas registradas.'}
                </div>
              ) : (
                <Accordion type="multiple" defaultValue={groups.map((_, i) => `g-${i}`)}>
                  {groups.map((group, i) => {
                    const nc = group.answers.filter(a => a.result === 'NC').length;
                    const om = group.answers.filter(a => a.result === 'OM').length;

                    return (
                      <AccordionItem key={i} value={`g-${i}`} className="border-0 border-b last:border-b-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                          <div className="flex items-center gap-3 w-full text-left">
                            <p className="font-semibold text-sm flex-1">{group.title}</p>
                            <div className="flex items-center gap-1.5 mr-2">
                              {nc > 0 && <Badge className="text-xs bg-red-100 text-red-700">NC: {nc}</Badge>}
                              {om > 0 && <Badge className="text-xs bg-amber-100 text-amber-700">OM: {om}</Badge>}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-3">
                            {group.answers.map(answer => {
                              const resultCfg = answer.result ? RESULT_ICONS[answer.result] : null;
                              return (
                                <div key={answer.id} className={cn(
                                  'border-l-4 pl-3 py-2 rounded-r text-sm',
                                  answer.result === 'C'  ? 'border-l-green-500 bg-green-50/50'
                                  : answer.result === 'NC' ? 'border-l-red-500 bg-red-50/50'
                                  : answer.result === 'OM' ? 'border-l-amber-500 bg-amber-50/50'
                                  : answer.result === 'NA' ? 'border-l-gray-300 bg-gray-50/50'
                                  : 'border-l-muted',
                                )}>
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="font-medium flex-1">{answer.aspectoVerificar}</p>
                                    {resultCfg && (
                                      <div className={cn('flex items-center gap-1 flex-shrink-0', resultCfg.color)}>
                                        <resultCfg.icon className="h-4 w-4" />
                                        <span className="text-xs font-medium">{resultCfg.label}</span>
                                      </div>
                                    )}
                                    {!answer.result && (
                                      <span className="text-xs text-muted-foreground">Sin respuesta</span>
                                    )}
                                  </div>
                                  {answer.evidenciaObjetiva && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      <span className="font-medium">Evidencia: </span>{answer.evidenciaObjetiva}
                                    </p>
                                  )}
                                  {answer.observation && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      <span className="font-medium">Observación: </span>{answer.observation}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
