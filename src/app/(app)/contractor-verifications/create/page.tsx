'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/hooks/use-user';
import { useRiskTypes } from '@/hooks/use-risk-types';
import { useTemplatesByRiskType, useTemplateGroups } from '@/hooks/use-checklist-templates';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import { createVerification } from '@/lib/contractor-verification-service';
import { useToast } from '@/hooks/use-toast';

import { cn } from '@/lib/utils';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  CalendarIcon, Loader2, ChevronRight, ChevronLeft,
  ShieldCheck, CheckCircle2, ClipboardList,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ── Schema ────────────────────────────────────────────────────────────────────

const formSchema = z.object({
  city:                z.string().min(1, 'La ciudad es requerida'),
  companyName:         z.string().min(1, 'La empresa / contratista es requerida'),
  contractorName:      z.string().optional(),
  plantId:             z.string().min(1, 'La planta es requerida'),
  verificationDate:    z.date({ required_error: 'La fecha de verificación es requerida' }),
  projectName:         z.string().optional(),
  workLocation:        z.string().optional(),
  activityDescription: z.string().optional(),
  generalObservations: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ── Componente ────────────────────────────────────────────────────────────────

export default function CreateVerificationPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { activeRiskTypes, loading: loadingRisks } = useRiskTypes();
  const { canCreateVerification, canAccessModule } = useVerificationPermissions(user);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRiskTypeId, setSelectedRiskTypeId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [plants, setPlants] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const { templates, loading: loadingTemplates } = useTemplatesByRiskType(selectedRiskTypeId);
  const { groups, loading: loadingGroups } = useTemplateGroups(selectedTemplateId);

  const selectedRiskType = activeRiskTypes.find(r => r.id === selectedRiskTypeId);
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  // Leer listas dinámicas (mismo patrón que hallazgos-form.tsx)
  useEffect(() => {
    const { getDoc, doc: firestoreDoc } = require('firebase/firestore');
    const loadList = async (name: string, setter: (v: string[]) => void) => {
      try {
        const snap = await getDoc(firestoreDoc(db, 'dynamic_lists', name));
        if (snap.exists()) setter(snap.data()?.items || []);
      } catch {
        // lista no existe, continuar sin ella
      }
    };
    loadList('ciudades', setCities);
    loadList('plantas', setPlants);
    loadList('empresas', setCompanies);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: user?.ciudad || '',
      plantId: user?.planta || '',
      verificationDate: new Date(),
    },
  });

  if (!canAccessModule) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">No tienes acceso a este módulo.</p>
      </div>
    );
  }

  const handleSubmit = async (values: FormValues) => {
    if (!selectedRiskType || !selectedTemplate || !user) return;
    if (groups.length === 0) {
      toast({ variant: 'destructive', title: 'Error', description: 'La plantilla no tiene grupos ni ítems configurados.' });
      return;
    }

    setSubmitting(true);
    try {
      const verificationId = await createVerification(
        {
          templateId: selectedTemplate.id,
          templateName: selectedTemplate.name,
          templateVersion: selectedTemplate.version,
          riskTypeId: selectedRiskType.id,
          riskTypeCode: selectedRiskType.code,
          riskTypeName: selectedRiskType.name,
          city: values.city,
          companyName: values.companyName,
          contractorName: values.contractorName,
          plantId: values.plantId,
          plantName: values.plantId,
          verificationDate: Timestamp.fromDate(values.verificationDate),
          projectName: values.projectName,
          workLocation: values.workLocation,
          activityDescription: values.activityDescription,
          generalObservations: values.generalObservations,
          createdBy: user.uid,
          createdByName: user.displayName || user.email || 'Usuario',
          createdByRole: user.role || '',
          status: 'IN_PROGRESS',
          totalItems: 0,
          compliantItems: 0,
          nonCompliantItems: 0,
          improvementItems: 0,
          notApplicableItems: 0,
          compliancePercentage: 0,
          hasFindings: false,
        },
        groups,
      );

      toast({ title: 'Verificación creada', description: 'Ahora puedes diligenciar la lista de verificación.' });
      router.push(`/contractor-verifications/${verificationId}/checklist`);
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo crear la verificación.' });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Paso 1: Selección de tipo de riesgo ──────────────────────────────────────
  if (step === 1) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 max-w-3xl mx-auto w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Nueva Verificación</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Paso 1 de 3 — Selecciona el tipo de riesgo a verificar.</p>
        </div>

        {loadingRisks ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : activeRiskTypes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-semibold">No hay tipos de riesgo configurados</p>
              <p className="text-sm text-muted-foreground mt-1">
                Un administrador debe crear los tipos de riesgo desde Administración de Plantillas.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeRiskTypes.map(rt => (
              <Card
                key={rt.id}
                className={cn(
                  'cursor-pointer border-2 transition-all hover:border-primary hover:shadow-md',
                  selectedRiskTypeId === rt.id ? 'border-primary bg-primary/5' : 'border-transparent',
                )}
                onClick={() => { setSelectedRiskTypeId(rt.id); setSelectedTemplateId(null); }}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={cn(
                    'rounded-lg p-2.5 flex-shrink-0 mt-0.5',
                    selectedRiskTypeId === rt.id ? 'bg-primary text-primary-foreground' : 'bg-muted',
                  )}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{rt.name}</p>
                      {selectedRiskTypeId === rt.id && (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">{rt.code}</Badge>
                    {rt.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rt.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button
            disabled={!selectedRiskTypeId}
            onClick={() => setStep(2)}
          >
            Continuar <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Paso 2: Selección de plantilla ───────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 max-w-3xl mx-auto w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Nueva Verificación</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Paso 2 de 3 — Selecciona la plantilla de verificación para{' '}
            <span className="font-semibold">{selectedRiskType?.name}</span>.
          </p>
        </div>

        {loadingTemplates ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : templates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-semibold">No hay plantillas activas para este tipo de riesgo</p>
              <p className="text-sm text-muted-foreground mt-1">
                Un administrador debe activar una plantilla desde Administración de Plantillas.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {templates.map(t => (
              <Card
                key={t.id}
                className={cn(
                  'cursor-pointer border-2 transition-all hover:border-primary hover:shadow-md',
                  selectedTemplateId === t.id ? 'border-primary bg-primary/5' : 'border-transparent',
                )}
                onClick={() => setSelectedTemplateId(t.id)}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={cn(
                    'rounded-lg p-2.5 flex-shrink-0 mt-0.5',
                    selectedTemplateId === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted',
                  )}>
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{t.name}</p>
                      {selectedTemplateId === t.id && (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">v{t.version}</Badge>
                      <Badge className="text-xs bg-green-100 text-green-800">ACTIVA</Badge>
                    </div>
                    {t.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={() => setStep(1)}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          <Button disabled={!selectedTemplateId || loadingGroups} onClick={() => setStep(3)}>
            {loadingGroups ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Continuar <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Paso 3: Datos generales ──────────────────────────────────────────────────
  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Nueva Verificación</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Paso 3 de 3 — Completa los datos generales de la verificación.
        </p>
      </div>

      {/* Resumen de selección */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex flex-wrap gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Tipo de riesgo</p>
            <p className="font-semibold text-sm">{selectedRiskType?.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Plantilla</p>
            <p className="font-semibold text-sm">{selectedTemplate?.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ítems a verificar</p>
            <p className="font-semibold text-sm">
              {groups.reduce((acc, g) => acc + g.items.filter(i => i.isActive).length, 0)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información de la verificación</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <FormField control={form.control} name="companyName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa / Contratista *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="contractorName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable del contratista</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del responsable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad *</FormLabel>
                  <FormControl>
                    {cities.length > 0 ? (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue placeholder="Selecciona ciudad" /></SelectTrigger>
                        <SelectContent>
                          {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input placeholder="Ciudad" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="plantId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Planta *</FormLabel>
                  <FormControl>
                    {plants.length > 0 ? (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue placeholder="Selecciona planta" /></SelectTrigger>
                        <SelectContent>
                          {plants.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input placeholder="Planta" {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="verificationDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de verificación *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline"
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                          {field.value
                            ? format(field.value, 'PPP', { locale: es })
                            : 'Selecciona una fecha'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value}
                        onSelect={field.onChange} initialFocus locale={es} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="projectName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Proyecto (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del proyecto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="workLocation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación específica</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Área de producción, bloque 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="activityDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Actividad evaluada</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción de la actividad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="generalObservations" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Observaciones generales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observaciones generales sobre la verificación..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          <div className="flex justify-between pt-2">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear e iniciar verificación
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
