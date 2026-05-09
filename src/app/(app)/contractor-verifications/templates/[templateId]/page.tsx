'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/hooks/use-user';
import { useTemplateGroups } from '@/hooks/use-checklist-templates';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import {
  createGroup, updateGroup, deleteGroup,
  addItemToGroup, updateItemInGroup, deleteItemFromGroup,
  updateTemplate,
} from '@/lib/checklist-template-service';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { ChecklistTemplate, ChecklistGroup, ChecklistItem, TemplateStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  ChevronLeft, PlusCircle, Loader2, Pencil, Trash2,
  GripVertical, Settings, CheckCircle2,
} from 'lucide-react';

const STATUS_LABELS: Record<TemplateStatus, string> = {
  DRAFT: 'Borrador', ACTIVE: 'Activa', INACTIVE: 'Inactiva', ARCHIVED: 'Archivada',
};

// ── Formulario de ítem ────────────────────────────────────────────────────────

const EMPTY_ITEM: Omit<ChecklistItem, 'id' | 'groupId' | 'templateId' | 'createdAt' | 'updatedAt'> = {
  requisitoBaseLegal: '',
  aspectoVerificar: '',
  preguntaClave: '',
  metodoVerificacion: '',
  requiresEvidence: false,
  allowsAttachment: true,
  isRequired: true,
  orderIndex: 0,
  isActive: true,
};

function ItemForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: typeof EMPTY_ITEM;
  onSave: (data: typeof EMPTY_ITEM) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);

  return (
    <div className="space-y-3 py-2">
      <div>
        <label className="text-xs font-medium mb-1 block">Requisito / Base legal</label>
        <Input value={form.requisitoBaseLegal} onChange={e => setForm(p => ({ ...p, requisitoBaseLegal: e.target.value }))}
          placeholder="Ej: Res. 4272/2021, Art. 15" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1 block">Aspecto a verificar *</label>
        <Textarea value={form.aspectoVerificar} onChange={e => setForm(p => ({ ...p, aspectoVerificar: e.target.value }))}
          placeholder="Describe el aspecto a verificar..." rows={2} className="resize-none" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1 block">Pregunta clave de verificación</label>
        <Input value={form.preguntaClave} onChange={e => setForm(p => ({ ...p, preguntaClave: e.target.value }))}
          placeholder="¿Pregunta directa al verificar este ítem?" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1 block">Método de verificación / Evidencia esperada</label>
        <Textarea value={form.metodoVerificacion} onChange={e => setForm(p => ({ ...p, metodoVerificacion: e.target.value }))}
          placeholder="Cómo se verifica y qué evidencia se espera obtener..." rows={2} className="resize-none" />
      </div>
      <div className="flex items-center gap-4">
        <label className="text-xs font-medium flex items-center gap-2">
          <Switch checked={form.isRequired} onCheckedChange={v => setForm(p => ({ ...p, isRequired: v }))} />
          Ítem obligatorio
        </label>
        <label className="text-xs font-medium flex items-center gap-2">
          <Switch checked={form.requiresEvidence} onCheckedChange={v => setForm(p => ({ ...p, requiresEvidence: v }))} />
          Requiere evidencia
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>Cancelar</Button>
        <Button size="sm" onClick={() => onSave(form)} disabled={!form.aspectoVerificar || saving}>
          {saving && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
          Guardar ítem
        </Button>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function TemplateEditorPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const { canManageTemplates, canEditTemplate } = useVerificationPermissions(user);

  const [template, setTemplate] = useState<ChecklistTemplate | null>(null);
  const [loadingTpl, setLoadingTpl] = useState(true);

  const { groups, loading: loadingGroups } = useTemplateGroups(templateId);

  // Modales y estados de edición
  const [groupModal, setGroupModal] = useState(false);
  const [groupForm, setGroupForm] = useState({ title: '', description: '' });
  const [savingGroup, setSavingGroup] = useState(false);

  const [itemModal, setItemModal] = useState<{ open: boolean; groupId: string; groupItems: ChecklistItem[]; editItem?: ChecklistItem } | null>(null);
  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'checklistTemplates', templateId),
      (snap) => {
        if (snap.exists()) setTemplate({ id: snap.id, ...snap.data() } as ChecklistTemplate);
        setLoadingTpl(false);
      },
    );
    return () => unsub();
  }, [templateId]);

  if (!canManageTemplates) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">No tienes permisos para acceder al editor de plantillas.</p>
      </div>
    );
  }

  // Determinar si el usuario puede editar esta plantilla en particular.
  // Se calcula después de cargar la plantilla; mientras carga, bloqueamos acciones.
  const canEdit = template ? canEditTemplate(template) : false;

  const handleCreateGroup = async () => {
    if (!groupForm.title) return;
    setSavingGroup(true);
    try {
      await createGroup(templateId, {
        title: groupForm.title,
        description: groupForm.description || undefined,
        orderIndex: groups.length,
      });
      toast({ title: 'Grupo creado' });
      setGroupModal(false);
      setGroupForm({ title: '', description: '' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo crear el grupo.' });
    } finally {
      setSavingGroup(false);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('¿Eliminar este grupo y todos sus ítems?')) return;
    try {
      await deleteGroup(templateId, groupId);
      toast({ title: 'Grupo eliminado' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar.' });
    }
  };

  const handleSaveItem = async (formData: typeof EMPTY_ITEM) => {
    if (!itemModal) return;
    setSavingItem(true);
    try {
      if (itemModal.editItem) {
        await updateItemInGroup(templateId, itemModal.groupId, itemModal.groupItems, itemModal.editItem.id, formData);
        toast({ title: 'Ítem actualizado' });
      } else {
        await addItemToGroup(templateId, itemModal.groupId, itemModal.groupItems, {
          ...formData,
          orderIndex: itemModal.groupItems.length,
        });
        toast({ title: 'Ítem agregado' });
      }
      setItemModal(null);
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el ítem.' });
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (group: ChecklistGroup, itemId: string) => {
    if (!confirm('¿Eliminar este ítem?')) return;
    try {
      await deleteItemFromGroup(templateId, group.id, group.items, itemId);
      toast({ title: 'Ítem eliminado' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar el ítem.' });
    }
  };

  const handleToggleTemplateStatus = async () => {
    if (!template) return;
    const next: TemplateStatus = template.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await updateTemplate(templateId, { status: next });
      toast({ title: next === 'ACTIVE' ? 'Plantilla activada' : 'Plantilla desactivada' });
    } catch {
      toast({ variant: 'destructive', title: 'Error' });
    }
  };

  const totalItems = groups.reduce((acc, g) => acc + g.items.filter(i => i.isActive).length, 0);

  if (loadingTpl) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">Plantilla no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <button type="button" onClick={() => router.push('/contractor-verifications/templates')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-1">
            <ChevronLeft className="h-4 w-4" /> Plantillas
          </button>
          <h1 className="text-xl font-bold">{template.name}</h1>
          <p className="text-sm text-muted-foreground">{template.riskTypeCode} · v{template.version} · {totalItems} ítems</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn('text-xs', template.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700')}>
            {STATUS_LABELS[template.status]}
          </Badge>
          {canEdit && (
            <>
              <Button variant="outline" size="sm" onClick={handleToggleTemplateStatus}>
                {template.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
              </Button>
              <Button size="sm" onClick={() => setGroupModal(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo grupo
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Aviso de solo lectura para plantillas de otros */}
      {!canEdit && (
        <div className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          Esta plantilla fue creada por otro usuario. Puedes consultarla y usarla en tus verificaciones, pero no puedes editarla.
        </div>
      )}

      {/* Grupos e ítems */}
      {loadingGroups ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : groups.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Settings className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="font-semibold">Esta plantilla no tiene grupos</p>
            <p className="text-sm text-muted-foreground mt-1">Agrega grupos para organizar los ítems de verificación.</p>
            <Button className="mt-4" size="sm" onClick={() => setGroupModal(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Crear primer grupo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" defaultValue={groups.map(g => g.id)}>
          {groups.map((group, gi) => (
            <AccordionItem key={group.id} value={group.id} className="border rounded-lg mb-3 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3 w-full text-left">
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{group.title}</p>
                    <p className="text-xs text-muted-foreground">{group.items.filter(i => i.isActive).length} ítems</p>
                  </div>
                  {canEdit && (
                    <div className="flex items-center gap-2 mr-2" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7"
                        onClick={() => setItemModal({ open: true, groupId: group.id, groupItems: group.items })}>
                        <PlusCircle className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteGroup(group.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {group.items.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    {canEdit ? (
                      <>
                        Sin ítems. <button type="button" className="text-primary underline"
                          onClick={() => setItemModal({ open: true, groupId: group.id, groupItems: group.items })}>
                          Agrega el primero
                        </button>
                      </>
                    ) : (
                      'Este grupo no tiene ítems.'
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {group.items.filter(i => i.isActive).map((item, ii) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 text-sm">
                        <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          {item.requisitoBaseLegal && (
                            <Badge variant="outline" className="text-xs mb-1">{item.requisitoBaseLegal}</Badge>
                          )}
                          <p className="font-medium">{item.aspectoVerificar}</p>
                          {item.preguntaClave && (
                            <p className="text-xs text-muted-foreground italic mt-0.5">"{item.preguntaClave}"</p>
                          )}
                          {item.metodoVerificacion && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.metodoVerificacion}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {item.isRequired && <Badge className="text-xs bg-blue-50 text-blue-700">Obligatorio</Badge>}
                            {item.requiresEvidence && <Badge className="text-xs bg-amber-50 text-amber-700">Requiere evidencia</Badge>}
                          </div>
                        </div>
                        {canEdit && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7"
                              onClick={() => setItemModal({ open: true, groupId: group.id, groupItems: group.items, editItem: item })}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:bg-red-50"
                              onClick={() => handleDeleteItem(group, item.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {canEdit && (
                      <Button variant="outline" size="sm" className="w-full mt-2"
                        onClick={() => setItemModal({ open: true, groupId: group.id, groupItems: group.items })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar ítem
                      </Button>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Modal: crear grupo — solo si se puede editar */}
      <Dialog open={canEdit && groupModal} onOpenChange={canEdit ? setGroupModal : undefined}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo grupo de verificación</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Título del grupo *</label>
              <Input value={groupForm.title} onChange={e => setGroupForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Ej: Documentación, EPP, Condiciones del área..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Descripción (opcional)</label>
              <Textarea value={groupForm.description} onChange={e => setGroupForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Descripción del grupo..." rows={2} className="resize-none" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupModal(false)} disabled={savingGroup}>Cancelar</Button>
            <Button onClick={handleCreateGroup} disabled={!groupForm.title || savingGroup}>
              {savingGroup && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: crear / editar ítem — solo si se puede editar */}
      {canEdit && itemModal && (
        <Dialog open={itemModal.open} onOpenChange={() => setItemModal(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{itemModal.editItem ? 'Editar ítem' : 'Nuevo ítem de verificación'}</DialogTitle>
            </DialogHeader>
            <ItemForm
              initial={itemModal.editItem
                ? {
                    requisitoBaseLegal: itemModal.editItem.requisitoBaseLegal,
                    aspectoVerificar: itemModal.editItem.aspectoVerificar,
                    preguntaClave: itemModal.editItem.preguntaClave,
                    metodoVerificacion: itemModal.editItem.metodoVerificacion,
                    requiresEvidence: itemModal.editItem.requiresEvidence,
                    allowsAttachment: itemModal.editItem.allowsAttachment,
                    isRequired: itemModal.editItem.isRequired,
                    orderIndex: itemModal.editItem.orderIndex,
                    isActive: itemModal.editItem.isActive,
                  }
                : EMPTY_ITEM}
              onSave={handleSaveItem}
              onCancel={() => setItemModal(null)}
              saving={savingItem}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
