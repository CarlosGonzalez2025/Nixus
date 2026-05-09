'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useRiskTypes } from '@/hooks/use-risk-types';
import { useAllTemplates } from '@/hooks/use-checklist-templates';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import {
  createRiskType,
  updateRiskType,
} from '@/lib/risk-type-service';
import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '@/lib/checklist-template-service';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { TemplateStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  PlusCircle, Loader2, Settings, ShieldCheck, ClipboardList,
  ExternalLink, Trash2, ToggleLeft, ToggleRight,
} from 'lucide-react';

// ── Configuración visual de estado de plantilla ───────────────────────────────

const TEMPLATE_STATUS_CONFIG: Record<TemplateStatus, { label: string; color: string }> = {
  DRAFT:    { label: 'Borrador',  color: 'bg-gray-100 text-gray-700' },
  ACTIVE:   { label: 'Activa',   color: 'bg-green-100 text-green-800' },
  INACTIVE: { label: 'Inactiva', color: 'bg-yellow-100 text-yellow-700' },
  ARCHIVED: { label: 'Archivada',color: 'bg-slate-100 text-slate-600' },
};

// ── Componente ────────────────────────────────────────────────────────────────

export default function TemplatesAdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { riskTypes, loading: loadingRisks } = useRiskTypes();
  const { templates, loading: loadingTemplates } = useAllTemplates();
  const { canManageTemplates, canEditTemplate, isAdmin } = useVerificationPermissions(user);

  // Modales de tipos de riesgo
  const [riskModal, setRiskModal] = useState(false);
  const [riskForm, setRiskForm] = useState({ code: '', name: '', description: '' });
  const [savingRisk, setSavingRisk] = useState(false);

  // Modales de plantillas
  const [tplModal, setTplModal] = useState(false);
  const [tplForm, setTplForm] = useState({ riskTypeId: '', name: '', description: '' });
  const [savingTpl, setSavingTpl] = useState(false);

  if (!canManageTemplates) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">No tienes permisos para gestionar plantillas.</p>
      </div>
    );
  }

  const handleCreateRiskType = async () => {
    if (!riskForm.code || !riskForm.name || !user) return;
    setSavingRisk(true);
    try {
      await createRiskType(
        { code: riskForm.code.toUpperCase(), name: riskForm.name, description: riskForm.description || undefined },
        user.uid,
      );
      toast({ title: 'Tipo de riesgo creado' });
      setRiskModal(false);
      setRiskForm({ code: '', name: '', description: '' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo crear el tipo de riesgo.' });
    } finally {
      setSavingRisk(false);
    }
  };

  const handleToggleRiskType = async (id: string, current: boolean) => {
    try {
      await updateRiskType(id, { isActive: !current });
      toast({ title: !current ? 'Tipo de riesgo activado' : 'Tipo de riesgo desactivado' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar.' });
    }
  };

  const handleCreateTemplate = async () => {
    if (!tplForm.riskTypeId || !tplForm.name || !user) return;
    const rt = riskTypes.find(r => r.id === tplForm.riskTypeId);
    if (!rt) return;
    setSavingTpl(true);
    try {
      const id = await createTemplate(
        {
          riskTypeId: rt.id,
          riskTypeCode: rt.code,
          name: tplForm.name,
          description: tplForm.description || undefined,
        },
        user.uid,
      );
      toast({ title: 'Plantilla creada', description: 'Ahora puedes agregar grupos e ítems.' });
      setTplModal(false);
      setTplForm({ riskTypeId: '', name: '', description: '' });
      router.push(`/contractor-verifications/templates/${id}`);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo crear la plantilla.' });
    } finally {
      setSavingTpl(false);
    }
  };

  const handleToggleTemplateStatus = async (id: string, current: TemplateStatus) => {
    const next: TemplateStatus = current === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await updateTemplate(id, { status: next });
      toast({ title: `Plantilla ${next === 'ACTIVE' ? 'activada' : 'desactivada'}` });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cambiar el estado.' });
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('¿Eliminar esta plantilla? Esta acción no se puede deshacer.')) return;
    try {
      await deleteTemplate(id);
      toast({ title: 'Plantilla eliminada' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar.' });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Administración de Plantillas
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Gestiona tipos de riesgo, plantillas, grupos e ítems de verificación.
          </p>
        </div>
      </div>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">
            <ClipboardList className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="risk-types">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Tipos de Riesgo
          </TabsTrigger>
        </TabsList>

        {/* Plantillas */}
        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Plantillas de verificación</CardTitle>
              <Button size="sm" onClick={() => setTplModal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva plantilla
              </Button>
            </CardHeader>
            {!isAdmin && (
              <div className="px-6 pb-2">
                <p className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                  Puedes crear tus propias plantillas y editar solo las que hayas creado tú. Las plantillas de otros usuarios son de solo lectura.
                </p>
              </div>
            )}
            <CardContent className="p-0">
              {loadingTemplates ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : templates.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No hay plantillas creadas.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plantilla</TableHead>
                        <TableHead>Tipo de Riesgo</TableHead>
                        <TableHead className="text-center">Versión</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map(t => {
                        const stCfg = TEMPLATE_STATUS_CONFIG[t.status];
                        const rt = riskTypes.find(r => r.id === t.riskTypeId);
                        return (
                          <TableRow key={t.id}>
                            <TableCell>
                              <p className="font-medium">{t.name}</p>
                              {t.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {rt?.name || t.riskTypeCode}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-sm font-mono">v{t.version}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn('text-xs', stCfg.color)}>{stCfg.label}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm"
                                  onClick={() => router.push(`/contractor-verifications/templates/${t.id}`)}>
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                {canEditTemplate(t) && (
                                  <>
                                    <Button variant="outline" size="sm"
                                      title={t.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                                      onClick={() => handleToggleTemplateStatus(t.id, t.status)}>
                                      {t.status === 'ACTIVE'
                                        ? <ToggleRight className="h-4 w-4 text-green-600" />
                                        : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                                    </Button>
                                    <Button variant="outline" size="sm"
                                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700"
                                      onClick={() => handleDeleteTemplate(t.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tipos de riesgo */}
        <TabsContent value="risk-types" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Tipos de riesgo</CardTitle>
              <Button size="sm" onClick={() => setRiskModal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo tipo
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {loadingRisks ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : riskTypes.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No hay tipos de riesgo creados.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {riskTypes.map(rt => (
                        <TableRow key={rt.id}>
                          <TableCell className="font-medium">{rt.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">{rt.code}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                            <span className="line-clamp-1">{rt.description || '—'}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={cn('text-xs', rt.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600')}>
                              {rt.isActive ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm"
                              title={rt.isActive ? 'Desactivar' : 'Activar'}
                              onClick={() => handleToggleRiskType(rt.id, rt.isActive)}>
                              {rt.isActive
                                ? <ToggleRight className="h-4 w-4 text-green-600" />
                                : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal: crear tipo de riesgo */}
      <Dialog open={riskModal} onOpenChange={setRiskModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo tipo de riesgo</DialogTitle>
            <DialogDescription>Define un nuevo tipo de riesgo para las listas de verificación.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Código *</label>
              <Input
                value={riskForm.code}
                onChange={e => setRiskForm(p => ({ ...p, code: e.target.value }))}
                placeholder="Ej: ALTURAS, ESPACIOS_CONFINADOS"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Nombre *</label>
              <Input
                value={riskForm.name}
                onChange={e => setRiskForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Ej: Trabajo en Alturas"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Descripción (opcional)</label>
              <Textarea
                value={riskForm.description}
                onChange={e => setRiskForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Descripción del tipo de riesgo..."
                rows={2}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRiskModal(false)} disabled={savingRisk}>Cancelar</Button>
            <Button onClick={handleCreateRiskType} disabled={!riskForm.code || !riskForm.name || savingRisk}>
              {savingRisk && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear tipo de riesgo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: crear plantilla */}
      <Dialog open={tplModal} onOpenChange={setTplModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva plantilla de verificación</DialogTitle>
            <DialogDescription>Crea la plantilla y luego agrega grupos e ítems desde el editor.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tipo de riesgo *</label>
              <Select value={tplForm.riskTypeId} onValueChange={v => setTplForm(p => ({ ...p, riskTypeId: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de riesgo" />
                </SelectTrigger>
                <SelectContent>
                  {riskTypes.filter(r => r.isActive).map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Nombre de la plantilla *</label>
              <Input
                value={tplForm.name}
                onChange={e => setTplForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Ej: Lista verificación Trabajo en Alturas"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Descripción (opcional)</label>
              <Textarea
                value={tplForm.description}
                onChange={e => setTplForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Descripción de la plantilla..."
                rows={2}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTplModal(false)} disabled={savingTpl}>Cancelar</Button>
            <Button onClick={handleCreateTemplate} disabled={!tplForm.riskTypeId || !tplForm.name || savingTpl}>
              {savingTpl && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear y editar plantilla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
