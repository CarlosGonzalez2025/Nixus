
'use client';

import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  PlusCircle, Search, Loader2, FileX, Filter, Edit,
  ArrowUp, ArrowDown, ArrowUpDown, Download, Building2, MapPin, Trash2,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletePermit } from './actions';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  collection, onSnapshot, query, orderBy, where, or,
  QueryConstraint, Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/hooks/use-user';
import { isInLiderRegionalScope } from '@/lib/role-config';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import {
  matchesUnifiedStatus,
  PERMIT_TABS,
  type UnifiedPermitStatus,
} from '@/lib/permit-status';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    borrador: 'bg-gray-100 text-gray-800',
    pendiente_revision: 'bg-yellow-100 text-yellow-800',
    aprobado: 'bg-green-100 text-green-800',
    en_ejecucion: 'bg-purple-100 text-purple-800',
    suspendido: 'bg-orange-100 text-orange-800',
    cerrado: 'bg-blue-100 text-blue-800',
    rechazado: 'bg-red-100 text-red-800',
    cancelado: 'bg-rose-100 text-rose-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: string) => {
  const statusText: { [key: string]: string } = {
    borrador: 'Borrador',
    pendiente_revision: 'Pendiente de Revisión',
    aprobado: 'Aprobado',
    en_ejecucion: 'En Ejecución',
    suspendido: 'Suspendido',
    cerrado: 'Cerrado',
    rechazado: 'Rechazado',
    cancelado: 'Cancelado',
  };
  return statusText[status] || status;
};

const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (typeof dateValue.toDate === 'function') return dateValue.toDate();
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') return new Date(dateValue);
  return null;
};

const getWorkTypeLabels = (permit: Permit): string[] => {
  const types = permit.selectedWorkTypes || {};
  const labels: string[] = [];
  if (types.alturas) labels.push('Alturas');
  if (types.confinado) labels.push('Confinados');
  if (types.caliente) labels.push('Trabajo en Caliente');
  if (types.energia) labels.push('Energías');
  if (types.izaje) labels.push('Izaje');
  if (types.excavacion) labels.push('Excavaciones');
  if (types.general) labels.push('General');
  return labels;
};

const getWorkTypeBadges = (permit: Permit): JSX.Element[] => {
  const config: { key: keyof typeof permit.selectedWorkTypes; label: string; cls: string }[] = [
    { key: 'alturas', label: 'Alturas', cls: 'bg-blue-100 text-blue-800' },
    { key: 'confinado', label: 'Confinados', cls: 'bg-purple-100 text-purple-800' },
    { key: 'caliente', label: 'T. Caliente', cls: 'bg-red-100 text-red-800' },
    { key: 'energia', label: 'Energías', cls: 'bg-yellow-100 text-yellow-800' },
    { key: 'izaje', label: 'Izaje', cls: 'bg-green-100 text-green-800' },
    { key: 'excavacion', label: 'Excavaciones', cls: 'bg-orange-100 text-orange-800' },
    { key: 'general', label: 'General', cls: 'bg-gray-100 text-gray-800' },
  ];
  const types = permit.selectedWorkTypes || {};
  return config
    .filter(c => types[c.key])
    .map(c => (
      <Badge key={c.key} className={`${c.cls} text-xs`}>
        {c.label}
      </Badge>
    ));
};

// ─── Approval helpers ────────────────────────────────────────────────────────

type ApprovalRole = keyof NonNullable<Permit['approvals']>;

function isApprovalRequired(permit: Permit, role: ApprovalRole): boolean {
  switch (role) {
    case 'solicitante': return true;
    case 'autorizante': return true;
    case 'lider_sst': return permit.isSSTSignatureRequired === true;
    case 'mantenimiento':
      return permit.controlEnergia === true || permit.selectedWorkTypes?.energia === true;
    case 'coordinador_alturas':
      return permit.trabajoAlturas === true || permit.selectedWorkTypes?.alturas === true;
    case 'supervisor_confinado':
      return permit.espaciosConfinados === true || permit.selectedWorkTypes?.confinado === true;
    default: return false;
  }
}

const APPROVAL_STATUS_LABELS: Record<string, string> = {
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
  pendiente: 'Pendiente',
};

function getApprovalStatusText(permit: Permit, role: ApprovalRole): string {
  if (!isApprovalRequired(permit, role)) return 'No Aplica';
  const status = permit.approvals?.[role]?.status;
  return APPROVAL_STATUS_LABELS[status ?? ''] ?? 'Pendiente';
}

// ─── Types ──────────────────────────────────────────────────────────────────
// UnifiedPermitStatus y la lista de pestañas viven en @/lib/permit-status para que
// el Dashboard cuente por las mismas categorías (fuente única de verdad).

const permitStatuses = PERMIT_TABS;

type SortDir = 'asc' | 'desc';

// ─── Component ──────────────────────────────────────────────────────────────

export default function PermitsPage() {
  const { user, loading: userLoading } = useUser();
  const [allPermits, setAllPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<UnifiedPermitStatus>('pendiente_revision');
  const [workTypeFilter, setWorkTypeFilter] = useState<string>('all');
  const [empresaFilter, setEmpresaFilter] = useState('all');
  const [plantaFilter, setPlantaFilter] = useState('all');
  const [ciudadFilter, setCiudadFilter] = useState('all');
  const { toast } = useToast();
  const [permitToDelete, setPermitToDelete] = useState<Permit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // DataTable state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // ── Reset page on filter change ──────────────────────────────────────────
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, workTypeFilter, searchTerm, empresaFilter, plantaFilter, ciudadFilter]);

  // ── Abrir la pestaña indicada por ?status= (deep-link desde las tarjetas del
  // dashboard). Solo cliente; si el valor no es una pestaña válida se ignora.
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get('status');
    if (status && PERMIT_TABS.some(t => t.key === status)) {
      setActiveTab(status as UnifiedPermitStatus);
    }
  }, []);

  // ── Firestore subscription ───────────────────────────────────────────────
  useEffect(() => {
    if (userLoading) { setLoading(true); return; }
    if (!user) { setAllPermits([]); setLoading(false); return; }

    const permitsCollection = collection(db, 'permits');
    let unsubscribers: Unsubscribe[] = [];

    if (user.role === 'lider_regional') {
      // Filtra por empresa en servidor si tiene lista acotada (≤30); planta/ciudad
      // se siguen filtrando cliente-side. Si se usa filtro 'in', NO se agrega orderBy
      // para evitar requerir un índice compuesto (empresa+createdAt); se ordena cliente-side.
      //
      // SIN limit: el filtro fino por empresa/planta/ciudad se aplica cliente-side DESPUÉS
      // de la query, así que un limit recortaría el universo ANTES de filtrar y ocultaría
      // permisos válidos del alcance del usuario (los que no caen en los N más recientes
      // globales). Igual que dashboard/page.tsx, se carga el conjunto completo.
      const lrConstraints: QueryConstraint[] = [];
      if (user.allowedEmpresas?.length && user.allowedEmpresas.length <= 30) {
        lrConstraints.push(where('generalInfo.empresa', 'in', user.allowedEmpresas));
      } else {
        lrConstraints.push(orderBy('createdAt', 'desc'));
      }

      const unsub = onSnapshot(query(permitsCollection, ...lrConstraints), (snapshot) => {
        const data = snapshot.docs
          .map(doc => {
            const d = doc.data();
            return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
          })
          .filter(p => isInLiderRegionalScope(user, {
            empresa: p.generalInfo?.empresa,
            planta: p.generalInfo?.planta,
            ciudad: p.generalInfo?.ciudad,
          }))
          .filter(p => p.status !== 'borrador' || p.createdBy === user.uid);
        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      });
      unsubscribers.push(unsub);

    } else if (user.role === 'lider_sst') {
      const sstConstraints: QueryConstraint[] = user.planta
        ? [where('generalInfo.planta', '==', user.planta), orderBy('createdAt', 'desc')]
        : [orderBy('createdAt', 'desc')];

      const unsub = onSnapshot(query(permitsCollection, ...sstConstraints), (snapshot) => {
        let data = snapshot.docs.map(doc => {
          const d = doc.data();
          return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
        });
        if (user.empresa) {
          data = data.filter(p => !p.generalInfo?.empresa || p.generalInfo.empresa.toLowerCase() === user.empresa!.toLowerCase());
        }
        data = data.filter(p => p.status !== 'borrador' || p.createdBy === user.uid);
        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      });
      unsubscribers.push(unsub);

    } else if (user.role === 'mantenimiento') {
      // Cubre permisos creados con el campo legacy (controlEnergia) Y los
      // creados con el wizard actual (selectedWorkTypes.energia).
      const unsub = onSnapshot(
        query(
          permitsCollection,
          or(
            where('controlEnergia', '==', true),
            where('selectedWorkTypes.energia', '==', true),
          ),
        ),
        (snapshot) => {
          const data = snapshot.docs
            .map(doc => {
              const d = doc.data();
              return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
            })
            // Filtrar por planta del usuario; usuarios sin planta ven todos (rol global)
            .filter(p =>
              !user.planta ||
              p.generalInfo?.planta?.toLowerCase() === user.planta.toLowerCase(),
            )
            // Excluir borradores ajenos
            .filter(p => p.status !== 'borrador' || p.createdBy === user.uid)
            .sort((a, b) =>
              (parseFirestoreDate(b.createdAt)?.getTime() || 0) -
              (parseFirestoreDate(a.createdAt)?.getTime() || 0),
            );
          setAllPermits(data);
          setLoading(false);
        },
        () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
          setLoading(false);
        },
      );
      unsubscribers.push(unsub);

    } else {
      const finalQuery: QueryConstraint[] = [];
      if (user.role === 'solicitante') {
        // Solo where, sin orderBy — combinar ambos requiere índice compuesto; se ordena cliente-side.
        finalQuery.push(where('createdBy', '==', user.uid));
      } else {
        // admin, autorizante y otros roles privilegiados.
        // SIN limit: autorizante filtra por empresa/planta cliente-side DESPUÉS de la query;
        // un limit(200) recortaba el universo global ANTES del filtro y ocultaba permisos
        // válidos de su alcance (bug: mostraba 9 de 34). Consistente con dashboard/page.tsx.
        finalQuery.push(orderBy('createdAt', 'desc'));
      }

      const unsub = onSnapshot(query(permitsCollection, ...finalQuery), (snapshot) => {
        let data = snapshot.docs.map(doc => {
          const d = doc.data();
          return { id: doc.id, ...d, createdAt: parseFirestoreDate(d.createdAt) } as unknown as Permit;
        });

        if (user.role === 'solicitante') {
          data = data.sort(
            (a, b) =>
              (parseFirestoreDate(b.createdAt)?.getTime() || 0) -
              (parseFirestoreDate(a.createdAt)?.getTime() || 0),
          );
        }

        if (user.role === 'autorizante') {
          data = data.filter(p => {
            if (p.status === 'borrador') return p.createdBy === user.uid;
            const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || p.generalInfo.empresa.toLowerCase() === user.empresa.toLowerCase();
            const matchPlanta = !user.planta || !p.generalInfo?.planta || p.generalInfo.planta.toLowerCase() === user.planta.toLowerCase();
            return matchEmpresa && matchPlanta;
          });
        }

        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        toast({ variant: 'destructive', title: 'Error al cargar permisos', description: 'No se pudieron obtener los datos.' });
        setLoading(false);
      });
      unsubscribers.push(unsub);
    }

    return () => unsubscribers.forEach(u => u());
  }, [user, userLoading, toast]);

  // ── Unique filter values ─────────────────────────────────────────────────
  const uniqueEmpresas = useMemo(() => {
    const set = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.empresa) set.add(p.generalInfo.empresa); });
    return Array.from(set).sort();
  }, [allPermits]);

  const uniquePlantas = useMemo(() => {
    const set = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.planta) set.add(p.generalInfo.planta); });
    return Array.from(set).sort();
  }, [allPermits]);

  const uniqueCiudades = useMemo(() => {
    const set = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.ciudad) set.add(p.generalInfo.ciudad); });
    return Array.from(set).sort();
  }, [allPermits]);

  // ── Filtered data ────────────────────────────────────────────────────────
  const filteredPermits = useMemo(() => {
    return allPermits.filter(permit => {
      if (!matchesUnifiedStatus(permit.status, activeTab)) return false;

      // Para el rol mantenimiento en la tab "Pendiente": mostrar solo los permisos
      // que requieren su firma (solicitante ya firmó, mantenimiento aún no).
      if (
        user?.role === 'mantenimiento' &&
        activeTab === 'pendiente_revision' &&
        !(
          permit.approvals?.solicitante?.status === 'aprobado' &&
          permit.approvals?.mantenimiento?.status !== 'aprobado'
        )
      ) {
        return false;
      }

      if (workTypeFilter !== 'all') {
        const types = permit.selectedWorkTypes || {};
        const map: Record<string, keyof typeof types> = {
          alturas: 'alturas', confinados: 'confinado', energia: 'energia',
          izaje: 'izaje', excavaciones: 'excavacion', general: 'general',
        };
        if (!types[map[workTypeFilter] ?? workTypeFilter]) return false;
      }

      if (empresaFilter !== 'all' && permit.generalInfo?.empresa !== empresaFilter) return false;
      if (plantaFilter !== 'all' && permit.generalInfo?.planta !== plantaFilter) return false;
      if (ciudadFilter !== 'all' && permit.generalInfo?.ciudad !== ciudadFilter) return false;

      const s = searchTerm.toLowerCase();
      if (!s) return true;
      return (
        (permit.number || permit.id).toLowerCase().includes(s) ||
        (permit.user?.displayName || '').toLowerCase().includes(s) ||
        (permit.generalInfo?.areaEspecifica || '').toLowerCase().includes(s) ||
        (permit.generalInfo?.planta || '').toLowerCase().includes(s)
      );
    });
  }, [allPermits, activeTab, searchTerm, workTypeFilter, empresaFilter, plantaFilter, ciudadFilter]);

  // ── Sorted data ──────────────────────────────────────────────────────────
  const sortedPermits = useMemo(() => {
    if (!sortColumn) return filteredPermits;
    return [...filteredPermits].sort((a, b) => {
      let result = 0;
      switch (sortColumn) {
        case 'numero':
          result = (a.number || a.id).localeCompare(b.number || b.id);
          break;
        case 'area':
          result = (a.generalInfo?.areaEspecifica || '').localeCompare(b.generalInfo?.areaEspecifica || '');
          break;
        case 'planta':
          result = (a.generalInfo?.planta || '').localeCompare(b.generalInfo?.planta || '');
          break;
        case 'solicitante':
          result = (a.user?.displayName || '').localeCompare(b.user?.displayName || '');
          break;
        case 'fecha':
          result =
            (parseFirestoreDate(a.createdAt)?.getTime() || 0) -
            (parseFirestoreDate(b.createdAt)?.getTime() || 0);
          break;
      }
      return sortDir === 'asc' ? result : -result;
    });
  }, [filteredPermits, sortColumn, sortDir]);

  const totalPages = Math.ceil(sortedPermits.length / pageSize);
  const paginatedPermits = sortedPermits.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        setSortColumn(null);
        setSortDir('asc');
      }
    } else {
      setSortColumn(column);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortColumn !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === 'asc'
      ? <ArrowUp className="h-3 w-3" />
      : <ArrowDown className="h-3 w-3" />;
  };

  // ── Excel export ─────────────────────────────────────────────────────────
  const handleExportExcel = () => {
    if (sortedPermits.length === 0) {
      toast({ variant: 'destructive', title: 'Sin datos', description: 'No hay permisos para exportar.' });
      return;
    }

    // Cell types: string, number, or hyperlink object
    type XLCell = string | number | { v: string; t: 's'; l: { Target: string } };

    const link = (url: string | null | undefined, label = 'Ver Firma'): XLCell => {
      if (!url || !url.startsWith('http')) return '—';
      return { v: label, t: 's', l: { Target: url } };
    };

    const apprCols = (p: Permit, role: ApprovalRole): XLCell[] => {
      if (!isApprovalRequired(p, role)) return ['No Aplica', '—', '—', '—', '—'];
      const a = p.approvals?.[role] ?? {};
      return [
        APPROVAL_STATUS_LABELS[a.status ?? ''] ?? 'Pendiente',
        a.userName || '—',
        a.signedAt || '—',
        link(a.firmaApertura, 'Ver Apertura'),
        link(a.firmaCierre, 'Ver Cierre'),
      ];
    };

    // ── Sheet 1: Permisos ───────────────────────────────────────────────
    const HEADERS: string[] = [
      // Identificación (A-F)
      'N° Permiso', 'Estado', 'Fecha Creación', 'Vigencia Desde', 'Vigencia Hasta', 'Tipos de Trabajo',
      // Ubicación (G-L)
      'Empresa', 'Planta', 'Ciudad', 'Área Específica', 'Proceso', 'Contrato',
      // Trabajo (M-P)
      'Descripción del Trabajo', 'N° Trabajadores', 'Solicitante', 'Email Solicitante',
      // Solicitante aprobación (Q-U)
      'Est. Solicitante', 'Firmante Solicitante', 'Fecha Firma Sol.', 'Firma Apertura Sol.', 'Firma Cierre Sol.',
      // Autorizante (V-Z)
      'Est. Autorizante', 'Firmante Autorizante', 'Fecha Firma Aut.', 'Firma Apertura Aut.', 'Firma Cierre Aut.',
      // Líder SST (AA-AE)
      'Est. Líder SST', 'Firmante Líder SST', 'Fecha Firma SST', 'Firma Apertura SST', 'Firma Cierre SST',
      // Mantenimiento (AF-AJ)
      'Est. Mantenimiento', 'Firmante Mantenimiento', 'Fecha Firma Mant.', 'Firma Apertura Mant.', 'Firma Cierre Mant.',
      // Coord. Alturas (AK-AO)
      'Est. Coord. Alturas', 'Firmante Coord. Alturas', 'Fecha Firma C.Alt.', 'Firma Apertura C.Alt.', 'Firma Cierre C.Alt.',
      // Sup. Confinado (AP-AT)
      'Est. Sup. Confinado', 'Firmante Sup. Confinado', 'Fecha Firma S.Con.', 'Firma Apertura S.Con.', 'Firma Cierre S.Con.',
      // Cierre (AU-AY)
      'Fecha Cierre', 'Hora Cierre', 'Observaciones Cierre', 'Área Despejada', 'Continua Labor',
    ];

    const COL_WIDTHS = [
      18, 22, 18, 14, 14, 38,   // Identificación
      30, 25, 20, 32, 25, 20,   // Ubicación
      50, 14, 30, 35,           // Trabajo
      18, 28, 18, 20, 20,       // Solicitante
      18, 28, 18, 20, 20,       // Autorizante
      18, 28, 18, 20, 20,       // Líder SST
      18, 28, 18, 20, 20,       // Mantenimiento
      18, 28, 18, 20, 20,       // Coord. Alturas
      18, 28, 18, 20, 20,       // Sup. Confinado
      14, 12, 50, 15, 15,       // Cierre
    ];

    const dataRows: XLCell[][] = sortedPermits.map(p => [
      p.number || `Borrador:${p.id.substring(0, 8)}`,
      getStatusText(p.status),
      p.createdAt ? format(parseFirestoreDate(p.createdAt) || new Date(0), 'dd/MM/yyyy HH:mm', { locale: es }) : '—',
      p.generalInfo?.validFrom || '—',
      p.generalInfo?.validUntil || '—',
      getWorkTypeLabels(p).join(' | ') || '—',
      p.generalInfo?.empresa || '—',
      p.generalInfo?.planta || '—',
      p.generalInfo?.ciudad || '—',
      p.generalInfo?.areaEspecifica || '—',
      p.generalInfo?.proceso || '—',
      p.generalInfo?.contrato || '—',
      p.generalInfo?.workDescription || '—',
      p.generalInfo?.numTrabajadores || '—',
      p.user?.displayName || '—',
      p.user?.email || '—',
      ...apprCols(p, 'solicitante'),
      ...apprCols(p, 'autorizante'),
      ...apprCols(p, 'lider_sst'),
      ...apprCols(p, 'mantenimiento'),
      ...apprCols(p, 'coordinador_alturas'),
      ...apprCols(p, 'supervisor_confinado'),
      p.closure?.fechaCierre || '—',
      p.closure?.horaCierre || '—',
      p.closure?.observacionesCierre || '—',
      p.closure?.areaDespejada || '—',
      p.closure?.continuaLabor || '—',
    ]);

    // Build worksheet cell by cell (needed for hyperlink support)
    const permisosWs: XLSX.WorkSheet = {};
    HEADERS.forEach((h, c) => {
      permisosWs[XLSX.utils.encode_cell({ r: 0, c })] = { v: h, t: 's' };
    });
    dataRows.forEach((row, r) => {
      row.forEach((val, c) => {
        const addr = XLSX.utils.encode_cell({ r: r + 1, c });
        if (typeof val === 'object' && val !== null && 'l' in val) {
          permisosWs[addr] = val;
        } else if (typeof val === 'number') {
          permisosWs[addr] = { v: val, t: 'n' };
        } else {
          permisosWs[addr] = { v: String(val ?? '—'), t: 's' };
        }
      });
    });
    permisosWs['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: dataRows.length, c: HEADERS.length - 1 } });
    permisosWs['!cols'] = COL_WIDTHS.map(wch => ({ wch }));
    permisosWs['!views'] = [{ state: 'frozen', ySplit: 1 }] as any;

    // ── Sheet 2: Análisis ───────────────────────────────────────────────
    type AnalysisRow = (string | number)[];
    const aRows: AnalysisRow[] = [];

    const aTitle = (t: string) => aRows.push([t]);
    const aHead = (...cols: string[]) => aRows.push(cols);
    const aData = (...cols: (string | number)[]) => aRows.push(cols);
    const aSep = () => aRows.push(['']);
    const pct = (n: number) => `${((n / sortedPermits.length) * 100).toFixed(1)}%`;

    aTitle('REPORTE DE PERMISOS DE TRABAJO — ANÁLISIS ESTADÍSTICO');
    aData(`Generado: ${format(new Date(), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}`);
    aData(`Total de permisos en el reporte: ${sortedPermits.length}`);
    if (empresaFilter !== 'all') aData(`Filtro empresa: ${empresaFilter}`);
    if (plantaFilter !== 'all') aData(`Filtro planta: ${plantaFilter}`);
    if (ciudadFilter !== 'all') aData(`Filtro ciudad: ${ciudadFilter}`);
    aSep();

    // Status
    aTitle('RESUMEN POR ESTADO');
    aHead('Estado', 'Cantidad', '% del Total');
    const statusMap = new Map<string, number>();
    sortedPermits.forEach(p => { const s = getStatusText(p.status); statusMap.set(s, (statusMap.get(s) || 0) + 1); });
    Array.from(statusMap.entries()).sort((a, b) => b[1] - a[1])
      .forEach(([s, n]) => aData(s, n, pct(n)));
    aSep();

    // Work types
    aTitle('RESUMEN POR TIPO DE TRABAJO');
    aHead('Tipo de Trabajo', 'Cantidad', '% del Total');
    const wt: [string, number][] = [
      ['Trabajo en Alturas', sortedPermits.filter(p => p.selectedWorkTypes?.alturas).length],
      ['Espacios Confinados', sortedPermits.filter(p => p.selectedWorkTypes?.confinado).length],
      ['Control de Energías', sortedPermits.filter(p => p.selectedWorkTypes?.energia).length],
      ['Izaje de Cargas', sortedPermits.filter(p => p.selectedWorkTypes?.izaje).length],
      ['Excavaciones', sortedPermits.filter(p => p.selectedWorkTypes?.excavacion).length],
      ['Trabajo General', sortedPermits.filter(p => p.selectedWorkTypes?.general).length],
    ];
    wt.filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1])
      .forEach(([t, n]) => aData(t, n, pct(n)));
    aSep();

    // Empresa
    aTitle('RESUMEN POR EMPRESA');
    aHead('Empresa', 'Cantidad', '% del Total');
    const empMap = new Map<string, number>();
    sortedPermits.forEach(p => { const e = p.generalInfo?.empresa || 'Sin empresa'; empMap.set(e, (empMap.get(e) || 0) + 1); });
    Array.from(empMap.entries()).sort((a, b) => b[1] - a[1]).forEach(([e, n]) => aData(e, n, pct(n)));
    aSep();

    // Planta
    aTitle('RESUMEN POR PLANTA');
    aHead('Planta', 'Cantidad', '% del Total');
    const pltMap = new Map<string, number>();
    sortedPermits.forEach(p => { const pl = p.generalInfo?.planta || 'Sin planta'; pltMap.set(pl, (pltMap.get(pl) || 0) + 1); });
    Array.from(pltMap.entries()).sort((a, b) => b[1] - a[1]).forEach(([pl, n]) => aData(pl, n, pct(n)));
    aSep();

    // Ciudad (only if any)
    const cidMap = new Map<string, number>();
    sortedPermits.forEach(p => { if (p.generalInfo?.ciudad) cidMap.set(p.generalInfo.ciudad, (cidMap.get(p.generalInfo.ciudad) || 0) + 1); });
    if (cidMap.size > 0) {
      aTitle('RESUMEN POR CIUDAD');
      aHead('Ciudad', 'Cantidad', '% del Total');
      Array.from(cidMap.entries()).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => aData(c, n, pct(n)));
      aSep();
    }

    // Approval completeness
    aTitle('ESTADO DE APROBACIÓN');
    aHead('Categoría', 'Cantidad', '% del Total');
    const approved = sortedPermits.filter(p => ['aprobado', 'en_ejecucion', 'cerrado'].includes(p.status)).length;
    const cancelled = sortedPermits.filter(p => p.status === 'cancelado' || p.status === 'rechazado').length;
    const pending = sortedPermits.length - approved - cancelled;
    aData('Completamente aprobados / activos / cerrados', approved, pct(approved));
    aData('En proceso de aprobación', pending, pct(pending));
    aData('Cancelados', cancelled, pct(cancelled));

    // Build analysis worksheet
    const analysisWs: XLSX.WorkSheet = {};
    aRows.forEach((row, r) => {
      row.forEach((val, c) => {
        const addr = XLSX.utils.encode_cell({ r, c });
        analysisWs[addr] = typeof val === 'number' ? { v: val, t: 'n' } : { v: String(val), t: 's' };
      });
    });
    if (aRows.length > 0) {
      analysisWs['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: aRows.length - 1, c: 2 } });
    }
    analysisWs['!cols'] = [{ wch: 45 }, { wch: 15 }, { wch: 15 }];

    // ── Workbook ────────────────────────────────────────────────────────
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, permisosWs, 'Permisos');
    XLSX.utils.book_append_sheet(wb, analysisWs, 'Análisis');
    XLSX.writeFile(wb, `permisos_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`);

    toast({
      title: '✅ Exportación exitosa',
      description: `${sortedPermits.length} permiso${sortedPermits.length !== 1 ? 's' : ''} exportado${sortedPermits.length !== 1 ? 's' : ''} con hoja de análisis.`,
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────
  const getPermitDisplayNumber = (permit: Permit) =>
    permit.status === 'borrador'
      ? `Borrador #${permit.id.substring(0, 8)}`
      : permit.number || `ID: ${permit.id.substring(0, 8)}`;

  const handleDeleteConfirm = async () => {
    if (!permitToDelete || !user) return;
    setIsDeleting(true);
    try {
      const result = await deletePermit(permitToDelete.id, { uid: user.uid, role: user.role! });
      if (result.success) {
        toast({ title: 'Permiso eliminado', description: `El borrador #${permitToDelete.number || permitToDelete.id.slice(0, 8)} fue eliminado.` });
        setPermitToDelete(null);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const renderPermitList = (permits: Permit[]) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (permits.length === 0 && filteredPermits.length === 0) {
      return (
        <div className="h-60 text-center flex flex-col justify-center items-center">
          <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 font-semibold">No se encontraron permisos</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm
              ? `No hay resultados para "${searchTerm}" en esta categoría.`
              : 'No hay permisos con el estado seleccionado.'}
          </p>
        </div>
      );
    }

    return (
      <>
        {/* ── Móvil: tarjetas ── */}
        <div className="md:hidden space-y-3">
          {permits.map((permit) => (
            <Link
              key={permit.id}
              href={permit.status === 'borrador' ? `/permits/create?edit=${permit.id}` : `/permits/${permit.id}`}
              className="block"
            >
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-primary truncate">
                        {getPermitDisplayNumber(permit)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permit.generalInfo?.areaEspecifica || 'N/A'} • {permit.generalInfo?.planta || 'N/A'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(permit.status)}>
                      {getStatusText(permit.status)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {getWorkTypeBadges(permit)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-3 border-t">
                    <span>{permit.user?.displayName || 'N/A'}</span>
                    <span>
                      {permit.createdAt
                        ? format(parseFirestoreDate(permit.createdAt) || new Date(0), 'dd/MM/yyyy', { locale: es })
                        : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ── Desktop: tabla ── */}
        <div className="rounded-md border hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('numero')}
                >
                  <div className="flex items-center gap-1">Número <SortIcon col="numero" /></div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('area')}
                >
                  <div className="flex items-center gap-1">Área / Planta <SortIcon col="area" /></div>
                </TableHead>
                <TableHead>Tipo de Trabajo</TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('solicitante')}
                >
                  <div className="flex items-center gap-1">Solicitante <SortIcon col="solicitante" /></div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none hover:bg-muted/50"
                  onClick={() => handleSort('fecha')}
                >
                  <div className="flex items-center gap-1">Creado <SortIcon col="fecha" /></div>
                </TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permits.map((permit) => (
                <TableRow key={permit.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link
                      href={permit.status === 'borrador' ? `/permits/create?edit=${permit.id}` : `/permits/${permit.id}`}
                      className="hover:underline text-primary"
                    >
                      {getPermitDisplayNumber(permit)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{permit.generalInfo?.areaEspecifica || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{permit.generalInfo?.planta || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {getWorkTypeBadges(permit).slice(0, 3)}
                      {getWorkTypeBadges(permit).length > 3 && (
                        <Badge className="bg-gray-100 text-gray-600 text-xs">
                          +{getWorkTypeBadges(permit).length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{permit.user?.displayName || 'N/A'}</TableCell>
                  <TableCell className="text-sm">
                    {permit.createdAt
                      ? format(parseFirestoreDate(permit.createdAt) || new Date(0), 'dd/MM/yyyy HH:mm', { locale: es })
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    {permit.status === 'borrador' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/permits/create?edit=${permit.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Continuar
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => setPermitToDelete(permit)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/permits/${permit.id}`}>Ver Detalles</Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permisos de Trabajo</h1>
          <p className="text-muted-foreground">Gestione todos sus permisos de trabajo aquí.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          {(user?.role === 'solicitante' || user?.role === 'admin') && (
            <Button asChild>
              <Link href="/permits/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Permiso
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0 sm:p-0">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UnifiedPermitStatus)}>
            <div className="flex flex-col border-b">
              {/* Tabs de estado */}
              <div className="px-4 pt-4">
                <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-6 border-b rounded-none">
                  {permitStatuses.map(status => (
                    <TabsTrigger 
                      key={status.key} 
                      value={status.key} 
                      className="capitalize whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-1 pb-2"
                    >
                      {status.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Filtros de búsqueda */}
              <div className="p-4 flex flex-col gap-3 bg-muted/20">
                {/* Fila 1: búsqueda + tipo de riesgo */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por número, área, planta, solicitante..."
                      className="w-full pl-9 h-10 bg-background"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                    <SelectTrigger className="w-full md:w-[200px] h-10 bg-background">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Tipo de riesgo" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los riesgos</SelectItem>
                      <SelectItem value="alturas">Trabajo en Alturas</SelectItem>
                      <SelectItem value="confinados">Espacios Confinados</SelectItem>
                      <SelectItem value="energia">Control de Energías</SelectItem>
                      <SelectItem value="izaje">Izaje de Cargas</SelectItem>
                      <SelectItem value="excavaciones">Excavaciones</SelectItem>
                      <SelectItem value="general">Trabajo General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Fila 2: empresa, planta, ciudad */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {uniqueEmpresas.length > 0 && (
                    <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
                      <SelectTrigger className="flex-1 h-10 bg-background">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                          <SelectValue placeholder="Todas las empresas" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las empresas</SelectItem>
                        {uniqueEmpresas.map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {uniquePlantas.length > 0 && (
                    <Select value={plantaFilter} onValueChange={setPlantaFilter}>
                      <SelectTrigger className="flex-1 h-10 bg-background">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                          <SelectValue placeholder="Todas las plantas" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las plantas</SelectItem>
                        {uniquePlantas.map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {uniqueCiudades.length > 0 && (
                    <Select value={ciudadFilter} onValueChange={setCiudadFilter}>
                      <SelectTrigger className="flex-1 h-10 bg-background">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                          <SelectValue placeholder="Todas las ciudades" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las ciudades</SelectItem>
                        {uniqueCiudades.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            {permitStatuses.map(status => (
              <TabsContent key={status.key} value={status.key} className="mt-0 outline-none">
                <div className="min-h-[400px]">
                  {renderPermitList(paginatedPermits)}
                </div>
                {!loading && filteredPermits.length > 0 && (
                  <div className="p-4 border-t">
                    <DataTablePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      totalRows={filteredPermits.length}
                      onPageChange={setCurrentPage}
                      onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog open={!!permitToDelete} onOpenChange={(open) => { if (!open) setPermitToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar borrador</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar el permiso <strong>#{permitToDelete?.number || permitToDelete?.id?.slice(0, 8)}</strong>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
