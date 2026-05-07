'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection, query, orderBy, onSnapshot, collectionGroup, where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useVerificationPermissions } from '@/hooks/use-verification-permissions';
import { closeActionPlan } from '@/lib/action-plan-service';
import { useToast } from '@/hooks/use-toast';
import type { ActionPlan, ActionPlanStatus, ContractorVerification } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Loader2, Search, Filter, ExternalLink, CheckCircle2, FileX, List,
} from 'lucide-react';

const AP_STATUS_CONFIG: Record<ActionPlanStatus, { label: string; color: string }> = {
  OPEN:        { label: 'Abierto',     color: 'bg-red-100 text-red-700' },
  IN_PROGRESS: { label: 'En Progreso', color: 'bg-blue-100 text-blue-800' },
  CLOSED:      { label: 'Cerrado',     color: 'bg-green-100 text-green-800' },
  OVERDUE:     { label: 'Vencido',     color: 'bg-orange-100 text-orange-800' },
  CANCELLED:   { label: 'Cancelado',   color: 'bg-gray-100 text-gray-600' },
};

const TAB_STATUSES: { key: ActionPlanStatus | 'todos'; label: string }[] = [
  { key: 'OPEN',        label: 'Abiertos'    },
  { key: 'IN_PROGRESS', label: 'En Progreso' },
  { key: 'OVERDUE',     label: 'Vencidos'    },
  { key: 'CLOSED',      label: 'Cerrados'    },
  { key: 'todos',       label: 'Todos'       },
];

interface ActionPlanWithContext extends ActionPlan {
  verificationCompany?: string;
  verificationPlant?: string;
  verificationRisk?: string;
}

const parseDate = (v: any): Date | null => {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  if (v instanceof Date) return v;
  return null;
};

export default function ActionPlansPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { isAdmin, isAsesorARL, isLiderSST } = useVerificationPermissions(user);

  const [verifications, setVerifications] = useState<ContractorVerification[]>([]);
  const [allPlans, setAllPlans] = useState<ActionPlanWithContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActionPlanStatus | 'todos'>('OPEN');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Modal cierre
  const [closeModal, setCloseModal] = useState<ActionPlanWithContext | null>(null);
  const [closeObs, setCloseObs] = useState('');
  const [saving, setSaving] = useState(false);

  // Cargar verificaciones visibles para el usuario y sus planes de acción
  useEffect(() => {
    if (!user) return;

    const constraints: any[] = [orderBy('createdAt', 'desc')];
    if (isAsesorARL) constraints.unshift(where('createdBy', '==', user.uid));
    else if (isLiderSST && user.planta) constraints.unshift(where('plantId', '==', user.planta));

    const unsubVer = onSnapshot(
      query(collection(db, 'contractorVerifications'), ...constraints),
      (snap) => {
        setVerifications(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContractorVerification)));
      },
    );

    return () => unsubVer();
  }, [user, isAsesorARL, isLiderSST]);

  // Cargar planes de acción de cada verificación visible
  useEffect(() => {
    if (verifications.length === 0) {
      setAllPlans([]);
      setLoading(false);
      return;
    }

    const unsubs: (() => void)[] = [];
    const plansByVer = new Map<string, ActionPlan[]>();

    const rebuildPlans = () => {
      const all: ActionPlanWithContext[] = [];
      plansByVer.forEach((plans, verificationId) => {
        const ver = verifications.find(v => v.id === verificationId);
        plans.forEach(ap => {
          all.push({
            ...ap,
            verificationCompany: ver?.companyName,
            verificationPlant: ver?.plantName,
            verificationRisk: ver?.riskTypeName,
          });
        });
      });
      // Ordenar por fecha de creación desc
      all.sort((a, b) => {
        const da = parseDate(a.createdAt)?.getTime() || 0;
        const db_ = parseDate(b.createdAt)?.getTime() || 0;
        return db_ - da;
      });
      setAllPlans(all);
      setLoading(false);
    };

    verifications.forEach(ver => {
      const unsub = onSnapshot(
        query(
          collection(db, 'contractorVerifications', ver.id, 'actionPlans'),
          orderBy('createdAt', 'desc'),
        ),
        (snap) => {
          plansByVer.set(ver.id, snap.docs.map(d => ({ id: d.id, ...d.data() } as ActionPlan)));
          rebuildPlans();
        },
      );
      unsubs.push(unsub);
    });

    return () => unsubs.forEach(u => u());
  }, [verifications]);

  const filtered = useMemo(() => {
    return allPlans.filter(ap => {
      const matchTab = activeTab === 'todos' || ap.status === activeTab;
      const s = search.toLowerCase();
      const matchSearch = !s ||
        ap.responsibleName?.toLowerCase().includes(s) ||
        ap.correctiveAction?.toLowerCase().includes(s) ||
        ap.verificationCompany?.toLowerCase().includes(s) ||
        ap.verificationPlant?.toLowerCase().includes(s) ||
        ap.verificationRisk?.toLowerCase().includes(s);
      return matchTab && matchSearch;
    });
  }, [allPlans, activeTab, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const countByTab = (tab: ActionPlanStatus | 'todos') =>
    tab === 'todos' ? allPlans.length : allPlans.filter(ap => ap.status === tab).length;

  const handleClose = async () => {
    if (!closeModal || !user || !closeObs) return;
    setSaving(true);
    try {
      await closeActionPlan(
        closeModal.verificationId,
        closeModal.id,
        user.uid,
        closeObs,
      );
      toast({ title: 'Plan de acción cerrado' });
      setCloseModal(null);
      setCloseObs('');
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cerrar el plan.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6 min-w-0">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
          <List className="h-6 w-6 text-primary" />
          Planes de Acción
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Seguimiento de planes de acción generados por NC y Oportunidades de Mejora.
        </p>
      </div>

      <Card className="min-w-0 overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as any); setCurrentPage(1); }}>
            <div className="flex flex-col border-b">
              <div className="px-4 pt-4 overflow-x-auto">
                <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6 border-b rounded-none">
                  {TAB_STATUSES.map(t => (
                    <TabsTrigger key={t.key} value={t.key}
                      className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-1 pb-2 text-xs sm:text-sm">
                      {t.label}
                      {countByTab(t.key) > 0 && (
                        <span className="ml-1.5 text-[10px] font-bold bg-muted rounded-full px-1.5 py-0.5 tabular-nums">
                          {countByTab(t.key)}
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Filtro de búsqueda */}
              <div className="p-4 bg-muted/20">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por empresa, responsable, acción..."
                    className="pl-9 h-10 bg-background text-sm"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  />
                </div>
              </div>
            </div>

            {TAB_STATUSES.map(t => (
              <TabsContent key={t.key} value={t.key} className="mt-0 outline-none">
                {loading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : paginated.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <FileX className="h-10 w-10 text-muted-foreground" />
                    <p className="font-semibold text-sm">No hay planes de acción en este estado</p>
                  </div>
                ) : (
                  <>
                    {/* Móvil: tarjetas */}
                    <div className="md:hidden p-4 space-y-3">
                      {paginated.map(ap => {
                        const stCfg = AP_STATUS_CONFIG[ap.status];
                        const dueDate = parseDate(ap.dueDate);
                        return (
                          <Card key={ap.id} className="border">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className={cn('text-xs flex-shrink-0', ap.findingType === 'NC' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
                                    {ap.findingType}
                                  </Badge>
                                  <Badge className={cn('text-xs', stCfg.color)}>{stCfg.label}</Badge>
                                </div>
                              </div>
                              <p className="text-sm font-medium line-clamp-2 mb-1">{ap.correctiveAction}</p>
                              <p className="text-xs text-muted-foreground">{ap.responsibleName}</p>
                              {ap.verificationCompany && (
                                <p className="text-xs text-muted-foreground">{ap.verificationCompany} · {ap.verificationPlant}</p>
                              )}
                              {dueDate && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Vence: {format(dueDate, 'dd/MM/yyyy', { locale: es })}
                                </p>
                              )}
                              <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm"
                                  onClick={() => router.push(`/contractor-verifications/${ap.verificationId}`)}>
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Button>
                                {ap.status !== 'CLOSED' && ap.status !== 'CANCELLED' && (
                                  <Button size="sm" className="text-xs"
                                    onClick={() => { setCloseModal(ap); setCloseObs(''); }}>
                                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Cerrar
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {/* Desktop: tabla */}
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Acción correctiva</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead>Empresa / Planta</TableHead>
                            <TableHead>Fecha límite</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginated.map(ap => {
                            const stCfg = AP_STATUS_CONFIG[ap.status];
                            const dueDate = parseDate(ap.dueDate);
                            return (
                              <TableRow key={ap.id}>
                                <TableCell>
                                  <Badge className={cn('text-xs', ap.findingType === 'NC' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
                                    {ap.findingType}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <p className="text-sm max-w-[260px] line-clamp-2">{ap.correctiveAction}</p>
                                </TableCell>
                                <TableCell className="text-sm">{ap.responsibleName}</TableCell>
                                <TableCell>
                                  {ap.verificationCompany && (
                                    <>
                                      <p className="text-sm font-medium">{ap.verificationCompany}</p>
                                      <p className="text-xs text-muted-foreground">{ap.verificationPlant}</p>
                                    </>
                                  )}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {dueDate ? format(dueDate, 'dd/MM/yyyy', { locale: es }) : '—'}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge className={cn('text-xs', stCfg.color)}>{stCfg.label}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm"
                                      onClick={() => router.push(`/contractor-verifications/${ap.verificationId}`)}>
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    {ap.status !== 'CLOSED' && ap.status !== 'CANCELLED' && (
                                      <Button size="sm"
                                        onClick={() => { setCloseModal(ap); setCloseObs(''); }}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" /> Cerrar
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {filtered.length > pageSize && (
                      <div className="p-4 border-t">
                        <DataTablePagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          pageSize={pageSize}
                          totalRows={filtered.length}
                          onPageChange={setCurrentPage}
                          onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
                        />
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal cierre de plan de acción */}
      <Dialog open={!!closeModal} onOpenChange={() => { setCloseModal(null); setCloseObs(''); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cerrar plan de acción</DialogTitle>
            <DialogDescription>
              {closeModal?.correctiveAction}
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="text-sm font-medium mb-1.5 block">
              Observación de cierre * (describe cómo se implementó la acción)
            </label>
            <Textarea
              value={closeObs}
              onChange={e => setCloseObs(e.target.value)}
              placeholder="Describe cómo se implementó la acción correctiva..."
              rows={3}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCloseModal(null); setCloseObs(''); }} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleClose} disabled={!closeObs || saving} className="bg-green-600 hover:bg-green-700">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar cierre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
