'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useVerificationDetail } from '@/hooks/use-contractor-verifications';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import {
  updateAnswer,
  recalculateCompliance,
  closeVerification,
  canCloseVerification,
} from '@/lib/contractor-verification-service';
import {
  createActionPlan,
  updateActionPlan,
} from '@/lib/action-plan-service';
import { useToast } from '@/hooks/use-toast';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import type { ContractorVerificationAnswer, VerificationResult, ActionPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2, CheckCircle2, XCircle, AlertTriangle, MinusCircle,
  ChevronLeft, Lock, AlertCircle, CalendarIcon, Save,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ── Configuración de calificaciones ──────────────────────────────────────────

const RESULT_CONFIG: Record<VerificationResult, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  C:  { label: 'Cumple',                icon: CheckCircle2,  color: 'text-green-700',  bg: 'bg-green-600 hover:bg-green-700 text-white' },
  NC: { label: 'No Cumple',             icon: XCircle,       color: 'text-red-700',    bg: 'bg-red-600 hover:bg-red-700 text-white' },
  OM: { label: 'Oportunidad de Mejora', icon: AlertTriangle, color: 'text-amber-700',  bg: 'bg-amber-500 hover:bg-amber-600 text-white' },
  NA: { label: 'No Aplica',             icon: MinusCircle,   color: 'text-gray-600',   bg: 'bg-gray-400 hover:bg-gray-500 text-white' },
};

// ── Selector de calificación ──────────────────────────────────────────────────

function ResultSelector({
  value,
  onChange,
  disabled,
}: {
  value: VerificationResult | null;
  onChange: (v: VerificationResult) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(RESULT_CONFIG) as VerificationResult[]).map(r => {
        const cfg = RESULT_CONFIG[r];
        const isSelected = value === r;
        return (
          <button
            key={r}
            type="button"
            disabled={disabled}
            onClick={() => onChange(r)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
              'border-2 min-h-[44px]',
              isSelected
                ? cfg.bg + ' border-transparent shadow-md scale-105'
                : 'bg-background border-border hover:border-primary/50 disabled:opacity-50',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <cfg.icon className={cn('h-4 w-4', isSelected ? 'text-white' : cfg.color)} />
            <span className={isSelected ? 'text-white' : ''}>{cfg.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Formulario de plan de acción (modal) ──────────────────────────────────────

interface ActionPlanFormData {
  correctiveAction: string;
  responsibleName: string;
  responsibleEmail?: string;
  dueDate: Date | null;
}

function ActionPlanModal({
  open,
  onClose,
  onSave,
  findingType,
  findingDescription,
  initialValues,
  isEdit,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: ActionPlanFormData) => Promise<void>;
  findingType: 'NC' | 'OM';
  findingDescription: string;
  initialValues?: ActionPlanFormData;
  isEdit?: boolean;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ActionPlanFormData>(
    initialValues ?? { correctiveAction: '', responsibleName: '', responsibleEmail: '', dueDate: null },
  );

  useEffect(() => {
    if (open) {
      setForm(initialValues ?? { correctiveAction: '', responsibleName: '', responsibleEmail: '', dueDate: null });
    }
  }, [open, initialValues]);

  const handleSave = async () => {
    if (!form.correctiveAction || !form.responsibleName || !form.dueDate) return;
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar' : 'Nuevo'} Plan de Acción — {findingType === 'NC' ? 'No Conformidad' : 'Oportunidad de Mejora'}</DialogTitle>
          <DialogDescription className="text-sm">
            <span className="font-medium">Hallazgo:</span> {findingDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Acción correctiva / de mejora *</label>
            <Textarea
              value={form.correctiveAction}
              onChange={e => setForm(p => ({ ...p, correctiveAction: e.target.value }))}
              placeholder="Describe la acción a implementar..."
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Responsable *</label>
              <Input
                value={form.responsibleName}
                onChange={e => setForm(p => ({ ...p, responsibleName: e.target.value }))}
                placeholder="Nombre del responsable"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email (opcional)</label>
              <Input
                type="email"
                value={form.responsibleEmail || ''}
                onChange={e => setForm(p => ({ ...p, responsibleEmail: e.target.value }))}
                placeholder="correo@empresa.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Fecha límite *</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-full pl-3 text-left font-normal', !form.dueDate && 'text-muted-foreground')}>
                  {form.dueDate ? format(form.dueDate, 'PPP', { locale: es }) : 'Selecciona fecha límite'}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.dueDate || undefined}
                  onSelect={d => setForm(p => ({ ...p, dueDate: d || null }))}
                  disabled={date => date < new Date()}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancelar</Button>
          <Button
            onClick={handleSave}
            disabled={!form.correctiveAction || !form.responsibleName || !form.dueDate || saving}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'Actualizar plan' : 'Guardar plan de acción'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Ítem individual del checklist ────────────────────────────────────────────

function ChecklistItemCard({
  answer,
  verificationId,
  disabled,
  onAnswerUpdated,
  onNeedActionPlan,
  onEditActionPlan,
  existingPlan,
}: {
  answer: ContractorVerificationAnswer;
  verificationId: string;
  disabled: boolean;
  onAnswerUpdated: (answerId: string, result: VerificationResult | null, evidencia: string, observation: string) => void;
  onNeedActionPlan: (answer: ContractorVerificationAnswer) => void;
  onEditActionPlan: (answer: ContractorVerificationAnswer, plan: ActionPlan) => void;
  existingPlan: ActionPlan | undefined;
}) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(answer.result);
  const [evidencia, setEvidencia] = useState(answer.evidenciaObjetiva || '');
  const [observation, setObservation] = useState(answer.observation || '');

  const needsObservation = result === 'NC' || result === 'OM';

  const handleResultChange = async (newResult: VerificationResult) => {
    if (disabled) return;
    setResult(newResult);
    await saveAnswer(newResult, evidencia, observation);

    // NC requiere plan de acción
    if (newResult === 'NC' && !existingPlan) {
      onNeedActionPlan({ ...answer, result: newResult });
    }
  };

  const saveAnswer = useCallback(async (
    r: VerificationResult | null,
    ev: string,
    obs: string,
  ) => {
    setSaving(true);
    try {
      await updateAnswer(verificationId, answer.id, {
        result: r,
        evidenciaObjetiva: ev,
        observation: obs,
        requiresActionPlan: r === 'NC',
        answeredAt: serverTimestamp() as any,
      });
      onAnswerUpdated(answer.id, r, ev, obs);
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar la respuesta.' });
    } finally {
      setSaving(false);
    }
  }, [verificationId, answer.id, toast, onAnswerUpdated]);

  const handleBlurSave = () => {
    if (result !== null) {
      saveAnswer(result, evidencia, observation);
    }
  };

  const borderColor = result === 'C'  ? 'border-l-green-500'
                    : result === 'NC' ? 'border-l-red-500'
                    : result === 'OM' ? 'border-l-amber-500'
                    : result === 'NA' ? 'border-l-gray-400'
                    : 'border-l-border';

  return (
    <div className={cn(
      'border-l-4 rounded-r-lg bg-card border border-l-4 mb-3 transition-colors',
      borderColor,
    )}>
      <div className="p-4">
        {/* Requisito base legal */}
        {answer.requisitoBaseLegal && (
          <Badge variant="outline" className="text-xs mb-2">{answer.requisitoBaseLegal}</Badge>
        )}

        {/* Aspecto a verificar */}
        <p className="font-semibold text-sm mb-1">{answer.aspectoVerificar}</p>

        {/* Pregunta clave */}
        {answer.preguntaClave && (
          <p className="text-sm text-muted-foreground mb-1 italic">"{answer.preguntaClave}"</p>
        )}

        {/* Método de verificación */}
        {answer.metodoVerificacion && (
          <p className="text-xs text-muted-foreground mb-3">
            <span className="font-medium not-italic">Evidencia esperada: </span>
            {answer.metodoVerificacion}
          </p>
        )}

        {/* Selector de calificación */}
        <div className="mb-3">
          <ResultSelector value={result} onChange={handleResultChange} disabled={disabled} />
        </div>

        {/* Estado guardando */}
        {saving && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Guardando...</span>
          </div>
        )}

        {/* Evidencia objetiva */}
        {result !== null && result !== 'NA' && (
          <div className="mt-3 space-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Evidencia objetiva
              </label>
              <Textarea
                value={evidencia}
                onChange={e => setEvidencia(e.target.value)}
                onBlur={handleBlurSave}
                disabled={disabled}
                placeholder="Describe la evidencia observada..."
                className="resize-none text-sm"
                rows={2}
              />
            </div>

            {needsObservation && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Observación {result === 'NC' ? '(requerida)' : '(recomendada)'}
                </label>
                <Textarea
                  value={observation}
                  onChange={e => setObservation(e.target.value)}
                  onBlur={handleBlurSave}
                  disabled={disabled}
                  placeholder={result === 'NC' ? 'Describe el incumplimiento detectado...' : 'Describe la oportunidad de mejora...'}
                  className={cn('resize-none text-sm', result === 'NC' && !observation && 'border-red-300')}
                  rows={2}
                />
              </div>
            )}

            {/* Indicador de plan de acción */}
            {result === 'NC' && (
              <div className={cn(
                'flex items-center gap-2 text-xs p-2 rounded-md',
                existingPlan ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700',
              )}>
                {existingPlan ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="flex-1">Plan de acción registrado — <span className="font-medium">{existingPlan.responsibleName}</span></span>
                    {!disabled && (
                      <button
                        type="button"
                        className="underline font-medium ml-auto"
                        onClick={() => onEditActionPlan({ ...answer, result }, existingPlan)}
                      >
                        Editar
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="flex-1">Se requiere plan de acción para No Conformidades</span>
                    {!disabled && (
                      <button
                        type="button"
                        className="ml-auto underline font-medium"
                        onClick={() => onNeedActionPlan({ ...answer, result })}
                      >
                        Agregar
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Página principal del checklist ────────────────────────────────────────────

export default function ChecklistPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const { verification, answers, actionPlans, loading } = useVerificationDetail(id);
  const { canEditVerification, canCloseVerification: canClose } = useVerificationPermissions(user);

  const [localAnswers, setLocalAnswers] = useState<ContractorVerificationAnswer[]>([]);
  const [closing, setClosing] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [actionPlanModal, setActionPlanModal] = useState<{
    open: boolean;
    answer: ContractorVerificationAnswer | null;
  }>({ open: false, answer: null });
  const [editPlanModal, setEditPlanModal] = useState<{
    open: boolean;
    answer: ContractorVerificationAnswer | null;
    plan: ActionPlan | null;
  }>({ open: false, answer: null, plan: null });

  useEffect(() => {
    setLocalAnswers(answers);
  }, [answers]);

  const disabled = !verification || !canEditVerification(verification) || verification?.status === 'CLOSED';

  // Agrupar respuestas por grupo
  const groupedAnswers = useMemo(() => {
    const groups = new Map<string, { title: string; answers: ContractorVerificationAnswer[] }>();
    localAnswers.forEach(a => {
      if (!groups.has(a.groupId)) {
        groups.set(a.groupId, { title: a.groupTitle, answers: [] });
      }
      groups.get(a.groupId)!.answers.push(a);
    });
    return Array.from(groups.values());
  }, [localAnswers]);

  // Calcular progreso
  const progress = useMemo(() => {
    const total = localAnswers.length;
    const answered = localAnswers.filter(a => a.result !== null).length;
    const compliant = localAnswers.filter(a => a.result === 'C').length;
    const nonCompliant = localAnswers.filter(a => a.result === 'NC').length;
    const improvement = localAnswers.filter(a => a.result === 'OM').length;
    const notApplicable = localAnswers.filter(a => a.result === 'NA').length;
    const denominator = compliant + nonCompliant + improvement;
    const pct = denominator > 0 ? Math.round((compliant / denominator) * 100) : 0;
    return { total, answered, compliant, nonCompliant, improvement, notApplicable, pct };
  }, [localAnswers]);

  const handleAnswerUpdated = useCallback(async (
    answerId: string,
    result: VerificationResult | null,
    evidencia: string,
    observation: string,
  ) => {
    setLocalAnswers(prev =>
      prev.map(a => a.id === answerId ? { ...a, result, evidenciaObjetiva: evidencia, observation } : a),
    );
    // Recalcular en Firestore después del update
    setTimeout(async () => {
      if (id) {
        const current = localAnswers.map(a =>
          a.id === answerId ? { ...a, result } : a,
        );
        await recalculateCompliance(id, current).catch(console.error);
      }
    }, 500);
  }, [id, localAnswers]);

  const handleSaveActionPlan = async (formData: {
    correctiveAction: string;
    responsibleName: string;
    responsibleEmail?: string;
    dueDate: Date | null;
  }) => {
    if (!actionPlanModal.answer || !user || !id || !formData.dueDate) return;
    const answer = actionPlanModal.answer;
    await createActionPlan(id, {
      answerId: answer.id,
      findingType: 'NC',
      findingDescription: answer.observation || answer.aspectoVerificar,
      correctiveAction: formData.correctiveAction,
      responsibleName: formData.responsibleName,
      responsibleEmail: formData.responsibleEmail,
      dueDate: Timestamp.fromDate(formData.dueDate),
      status: 'OPEN',
      createdBy: user.uid,
      createdByName: user.displayName || user.email || 'Usuario',
    });
    // Marcar la respuesta como "plan creado" para desbloquear el cierre
    await updateAnswer(id, answer.id, { requiresActionPlan: false });
    setLocalAnswers(prev =>
      prev.map(a => a.id === answer.id ? { ...a, requiresActionPlan: false } : a),
    );
    toast({ title: 'Plan de acción guardado', description: 'El plan de acción fue registrado correctamente.' });
  };

  const handleUpdateActionPlan = async (formData: {
    correctiveAction: string;
    responsibleName: string;
    responsibleEmail?: string;
    dueDate: Date | null;
  }) => {
    if (!editPlanModal.plan || !id || !formData.dueDate) return;
    await updateActionPlan(id, editPlanModal.plan.id, {
      correctiveAction: formData.correctiveAction,
      responsibleName: formData.responsibleName,
      ...(formData.responsibleEmail ? { responsibleEmail: formData.responsibleEmail } : {}),
      dueDate: Timestamp.fromDate(formData.dueDate),
    });
    toast({ title: 'Plan actualizado', description: 'El plan de acción fue actualizado correctamente.' });
  };

  const handleClose = async () => {
    if (!verification || !user || !id) return;

    const requiredItemIds = localAnswers.filter(a => a.result !== null).map(a => a.itemId);
    const { canClose: ok, reason } = canCloseVerification(localAnswers, requiredItemIds, actionPlans);
    if (!ok) {
      toast({ variant: 'destructive', title: 'No se puede cerrar', description: reason });
      return;
    }

    setClosing(true);
    try {
      await closeVerification(id, user.uid);
      toast({ title: 'Verificación cerrada', description: 'La verificación fue cerrada correctamente.' });
      router.push(`/contractor-verifications/${id}`);
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cerrar la verificación.' });
    } finally {
      setClosing(false);
      setShowCloseDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">Verificación no encontrada.</p>
      </div>
    );
  }

  const progressPct = progress.total > 0 ? Math.round((progress.answered / progress.total) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <button
            type="button"
            onClick={() => router.push(`/contractor-verifications/${id}`)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-1"
          >
            <ChevronLeft className="h-4 w-4" /> Volver al detalle
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{verification.riskTypeName}</h1>
          <p className="text-sm text-muted-foreground">{verification.templateName} · {verification.companyName}</p>
        </div>
        {disabled && (
          <Badge className="flex items-center gap-1.5 bg-slate-100 text-slate-700">
            <Lock className="h-3.5 w-3.5" />
            {verification.status === 'CLOSED' ? 'Verificación cerrada' : 'Solo lectura'}
          </Badge>
        )}
      </div>

      {/* Barra de progreso */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso de diligenciamiento</span>
            <span className="text-sm font-semibold tabular-nums">{progress.answered} / {progress.total}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPct}%`,
                background: progressPct === 100 ? '#22c55e' : '#3b82f6',
              }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              { label: 'Cumple', count: progress.compliant, color: 'text-green-700 bg-green-50' },
              { label: 'No Cumple', count: progress.nonCompliant, color: 'text-red-700 bg-red-50' },
              { label: 'Oportunidad', count: progress.improvement, color: 'text-amber-700 bg-amber-50' },
              { label: 'No Aplica', count: progress.notApplicable, color: 'text-gray-600 bg-gray-50' },
            ].map(s => (
              <div key={s.label} className={cn('rounded-lg p-2', s.color)}>
                <p className="text-xl font-bold tabular-nums">{s.count}</p>
                <p className="text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          {progress.answered > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Cumplimiento (excluyendo NA)</span>
              <span className="font-bold text-sm">{progress.pct}%</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alertas */}
      {progress.nonCompliant > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-sm">
            {progress.nonCompliant} No Conformidad(es) detectada(s).
            {actionPlans.filter(ap => ap.findingType === 'NC' && ap.status !== 'CLOSED').length > 0
              ? ` ${actionPlans.filter(ap => ap.findingType === 'NC' && ap.status !== 'CLOSED').length} requiere(n) plan de acción.`
              : ' Todos los planes de acción han sido registrados.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Grupos e ítems */}
      <Accordion type="multiple" defaultValue={groupedAnswers.map((_, i) => `group-${i}`)}>
        {groupedAnswers.map((group, i) => {
          const groupAnswered = group.answers.filter(a => a.result !== null).length;
          const groupTotal = group.answers.length;

          return (
            <AccordionItem key={i} value={`group-${i}`} className="border rounded-lg mb-2 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3 w-full text-left">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{group.title}</p>
                    <p className="text-xs text-muted-foreground">{groupTotal} ítems</p>
                  </div>
                  <div className="flex items-center gap-2 mr-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {groupAnswered}/{groupTotal}
                    </span>
                    {groupAnswered === groupTotal ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: groupTotal > 0 ? `${(groupAnswered / groupTotal) * 100}%` : '0%' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {group.answers.map(answer => (
                  <ChecklistItemCard
                    key={answer.id}
                    answer={answer}
                    verificationId={id}
                    disabled={disabled}
                    onAnswerUpdated={handleAnswerUpdated}
                    onNeedActionPlan={(a) => setActionPlanModal({ open: true, answer: a })}
                    onEditActionPlan={(a, plan) => setEditPlanModal({ open: true, answer: a, plan })}
                    existingPlan={actionPlans.find(ap => ap.answerId === answer.id)}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Botones de acción */}
      {!disabled && (
        <div className="flex flex-col sm:flex-row gap-3 justify-between pt-2 pb-6">
          <Button
            variant="outline"
            onClick={() => router.push(`/contractor-verifications/${id}`)}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar borrador
          </Button>
          <Button
            onClick={() => setShowCloseDialog(true)}
            className="bg-green-600 hover:bg-green-700"
            disabled={progress.answered === 0}
          >
            <Lock className="mr-2 h-4 w-4" />
            Cerrar verificación
          </Button>
        </div>
      )}

      {/* Modal crear plan de acción */}
      {actionPlanModal.answer && (
        <ActionPlanModal
          open={actionPlanModal.open}
          onClose={() => setActionPlanModal({ open: false, answer: null })}
          onSave={handleSaveActionPlan}
          findingType="NC"
          findingDescription={
            actionPlanModal.answer.observation ||
            actionPlanModal.answer.aspectoVerificar
          }
        />
      )}

      {/* Modal editar plan de acción */}
      {editPlanModal.plan && editPlanModal.answer && (
        <ActionPlanModal
          open={editPlanModal.open}
          onClose={() => setEditPlanModal({ open: false, answer: null, plan: null })}
          onSave={handleUpdateActionPlan}
          findingType={editPlanModal.plan.findingType}
          findingDescription={editPlanModal.answer.observation || editPlanModal.answer.aspectoVerificar}
          isEdit
          initialValues={{
            correctiveAction: editPlanModal.plan.correctiveAction,
            responsibleName: editPlanModal.plan.responsibleName,
            responsibleEmail: editPlanModal.plan.responsibleEmail,
            dueDate: (() => {
              const d = editPlanModal.plan.dueDate;
              return d && typeof d.toDate === 'function' ? d.toDate() : null;
            })(),
          }}
        />
      )}

      {/* Diálogo confirmar cierre */}
      <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cerrar verificación?</DialogTitle>
            <DialogDescription>
              Una vez cerrada, la verificación no podrá modificarse. El registro histórico quedará guardado
              con las respuestas actuales.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-2 text-sm">
            <p><span className="font-medium">Cumple:</span> {progress.compliant} ítems</p>
            <p><span className="font-medium">No Cumple:</span> {progress.nonCompliant} ítems</p>
            <p><span className="font-medium">Oportunidad de Mejora:</span> {progress.improvement} ítems</p>
            <p><span className="font-medium">No Aplica:</span> {progress.notApplicable} ítems</p>
            <p><span className="font-medium">Sin respuesta:</span> {progress.total - progress.answered} ítems</p>
            <p className="text-base font-bold pt-1">Cumplimiento: {progress.pct}%</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)} disabled={closing}>Cancelar</Button>
            <Button
              onClick={handleClose}
              disabled={closing}
              className="bg-green-600 hover:bg-green-700"
            >
              {closing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar cierre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
