
'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText, CheckCircle, Clock, PlusCircle, Activity,
  TrendingUp, Download, Loader2, Sparkles, ChevronRight,
  CheckSquare, MapPin, Building2, Factory, Filter, X, XCircle, CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { isInLiderRegionalScope } from '@/lib/role-config';
import { matchesUnifiedStatus } from '@/lib/permit-status';
import {
  collection, query, where, onSnapshot, orderBy, or,
  Unsubscribe, QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Hallazgo } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { errorEmitter } from '@/lib/error-emitter';
import { generateUserManualPDF } from '@/lib/pdf-generators';
import { FirestorePermissionError } from '@/lib/errors';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { esResuelto } from '@/lib/hallazgos-analytics';
import { HallazgosAnalytics } from './components/hallazgos-analytics';
import { WorkPlanCompliance } from './components/work-plan-compliance';
import { LocationBreakdown, type LocationRow } from './components/location-breakdown';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    borrador: 'bg-gray-100 text-gray-800',
    pendiente_revision: 'bg-yellow-100 text-yellow-800',
    aprobado: 'bg-green-100 text-green-800',
    en_ejecucion: 'bg-purple-100 text-purple-800',
    suspendido: 'bg-orange-100 text-orange-800',
    cerrado: 'bg-blue-100 text-blue-800',
    rechazado: 'bg-red-100 text-red-800',
    cancelado: 'bg-rose-100 text-rose-800',
  };
  return map[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    borrador: 'Borrador',
    pendiente_revision: 'Pendiente de Revisión',
    aprobado: 'Aprobado',
    en_ejecucion: 'En Ejecución',
    suspendido: 'Suspendido',
    cerrado: 'Cerrado',
    rechazado: 'Rechazado',
    cancelado: 'Cancelado',
  };
  return map[status] || status;
};

const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  if (typeof dateValue.toDate === 'function') return dateValue.toDate();
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') return new Date(dateValue);
  return null;
};

const DATE_PRESETS = [
  { value: 'all',  label: 'Todo el tiempo' },
  { value: '7d',   label: 'Últimos 7 días' },
  { value: '30d',  label: 'Últimos 30 días' },
  { value: '3m',   label: 'Últimos 3 meses' },
  { value: '6m',   label: 'Últimos 6 meses' },
  { value: 'year', label: 'Este año' },
];

const getDateFilterStart = (filter: string): Date | null => {
  const now = new Date();
  switch (filter) {
    case '7d':   return new Date(now.getTime() - 7 * 86400000);
    case '30d':  return new Date(now.getTime() - 30 * 86400000);
    case '3m':   return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    case '6m':   return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    case 'year': return new Date(now.getFullYear(), 0, 1);
    default:     return null;
  }
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  // ── Raw Firestore data ───────────────────────────────────────────────────
  const [allPermits, setAllPermits] = useState<Permit[]>([]);
  const [allHallazgos, setAllHallazgos] = useState<Hallazgo[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Filter states ────────────────────────────────────────────────────────
  const [empresaFilter, setEmpresaFilter] = useState('all');
  const [plantaFilter, setPlantaFilter] = useState('all');
  const [ciudadFilter, setCiudadFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  const generateChartData = (permitsList: Permit[]) => {
    const currentDate = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = format(d, 'MMM', { locale: es }).toUpperCase();
      const year = d.getFullYear();
      const monthlyPermits = permitsList.filter(p => {
        if (!p.createdAt) return false;
        return (p.createdAt as any)?.getMonth?.() === d.getMonth() &&
          (p.createdAt as any)?.getFullYear?.() === year;
      });
      data.push({
        name: `${monthName} ${year.toString().slice(-2)}`,
        Solicitados: monthlyPermits.length,
        Pendientes: monthlyPermits.filter(p => p.status === 'borrador' || p.status === 'pendiente_revision').length,
        Aprobados: monthlyPermits.filter(p => p.status === 'aprobado').length,
        'En Ejecución': monthlyPermits.filter(p => p.status === 'en_ejecucion').length,
        Cerrados: monthlyPermits.filter(p => p.status === 'cerrado').length,
      });
    }
    return data;
  };

  // ── Firestore subscriptions ──────────────────────────────────────────────
  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      setAllPermits([]);
      setLoading(false);
      router.push('/login');
      return;
    }

    const permitsCollection = collection(db, 'permits');
    const unsubscribers: Unsubscribe[] = [];

    // Asesor ARL — no consulta permisos
    if (user.role === 'asesor_arl') {
      setAllPermits([]);

    } else if (user.role === 'lider_regional') {
      // Si tiene lista acotada, filtra por empresa en servidor. Sin orderBy junto al
      // filtro 'in' para evitar requerir índice compuesto; se ordena cliente-side.
      // Sin limit — el dashboard necesita datos completos para las estadísticas.
      const lrConstraints: QueryConstraint[] = [];
      if (user.allowedEmpresas?.length && user.allowedEmpresas.length <= 30) {
        lrConstraints.push(where('generalInfo.empresa', 'in', user.allowedEmpresas));
      } else {
        lrConstraints.push(orderBy('createdAt', 'desc'));
      }

      unsubscribers.push(onSnapshot(query(permitsCollection, ...lrConstraints), (snap) => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt) } as unknown as Permit))
          .filter(p => isInLiderRegionalScope(user, {
            empresa: p.generalInfo?.empresa,
            planta: p.generalInfo?.planta,
            ciudad: p.generalInfo?.ciudad,
          }))
          // Igual que permits/page.tsx: excluir borradores ajenos.
          .filter(p => p.status !== 'borrador' || p.createdBy === user.uid);
        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      }));

    } else if (user.role === 'lider_sst') {
      // CONSISTENCIA con permits/page.tsx: el líder SST analiza TODOS los permisos de su
      // planta, no solo alturas/firma-SST. Antes el dashboard filtraba a un subconjunto
      // (or alturas/isSSTSignatureRequired), por lo que sus tarjetas/estadísticas no
      // coincidían con lo que veía en la tabla de permisos. Se replica la query por planta
      // + filtro de empresa cliente-side + exclusión de borradores ajenos.
      const sstConstraints: QueryConstraint[] = user.planta
        ? [where('generalInfo.planta', '==', user.planta), orderBy('createdAt', 'desc')]
        : [orderBy('createdAt', 'desc')];

      unsubscribers.push(onSnapshot(query(permitsCollection, ...sstConstraints), (snap) => {
        const combined = snap.docs
          .map(d => ({ id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt) } as unknown as Permit))
          .filter(p => !user.empresa || !p.generalInfo?.empresa || p.generalInfo.empresa.toLowerCase() === user.empresa.toLowerCase())
          .filter(p => p.status !== 'borrador' || p.createdBy === user.uid)
          .sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));
        setAllPermits(combined);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      }));

    } else if (user.role === 'mantenimiento') {
      // Enrutar SOLO por el rol ACTIVO (user.role), igual que permits/page.tsx. NO usar
      // otherRoles: un usuario con doble rol (ej. activo 'solicitante' + 'mantenimiento')
      // debe ver el dashboard de su rol activo, respetando el selector de rol.
      //
      // CONSISTENCIA con permits/page.tsx: mantenimiento analiza TODOS los permisos en los
      // que interviene — los que requieren su firma (controlEnergia O selectedWorkTypes.energia),
      // en su planta, en CUALQUIER estado. Antes el dashboard solo contaba los pendientes de
      // su firma (pendiente_revision + approvals), por lo que las tarjetas no reflejaban su
      // participación real ni coincidían con la tabla de permisos.
      unsubscribers.push(onSnapshot(
        query(permitsCollection, or(
          where('controlEnergia', '==', true),
          where('selectedWorkTypes.energia', '==', true),
        )),
        (snap) => {
          const data = snap.docs
            .map(d => ({ id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt) } as unknown as Permit))
            .filter(p => !user.planta || p.generalInfo?.planta?.toLowerCase() === user.planta.toLowerCase())
            .filter(p => p.status !== 'borrador' || p.createdBy === user.uid)
            .sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));
          setAllPermits(data);
          setLoading(false);
        },
        () => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
          setLoading(false);
        },
      ));

    } else {
      const finalQuery: QueryConstraint[] = [];
      if (user.role === 'solicitante') {
        // Solo where, sin orderBy — combinar ambos requiere índice compuesto; se ordena cliente-side.
        finalQuery.push(where('createdBy', '==', user.uid));
      } else {
        // admin, autorizante y otros — empresa/planta filtrados cliente-side para evitar
        // índice compuesto. Sin limit — dashboard necesita datos completos para estadísticas.
        finalQuery.push(orderBy('createdAt', 'desc'));
      }

      unsubscribers.push(onSnapshot(query(permitsCollection, ...finalQuery), (snap) => {
        let data = snap.docs
          .map(d => ({
            id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt),
          } as unknown as Permit));

        if (user.role === 'autorizante') {
          // Igual que permits/page.tsx: borradores solo del propio usuario; el resto por
          // empresa/planta. Antes el dashboard no excluía borradores ajenos.
          data = data.filter(p => {
            if (p.status === 'borrador') return p.createdBy === user.uid;
            const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || p.generalInfo.empresa.toLowerCase() === user.empresa.toLowerCase();
            const matchPlanta = !user.planta || !p.generalInfo?.planta || p.generalInfo.planta.toLowerCase() === user.planta.toLowerCase();
            return matchEmpresa && matchPlanta;
          });
        }

        data = data.sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));

        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      }));
    }

    // ── Hallazgos ────────────────────────────────────────────────────────
    // Solo roles con acceso al módulo. solicitante y mantenimiento no tienen permiso
    // (canAccessHallazgos en reglas exige admin/lider_regional/lider_sst/autorizante/asesor_arl).
    const canSeeHallazgos = ['admin', 'lider_regional', 'lider_sst', 'autorizante', 'asesor_arl'].includes(user.role ?? '');
    if (canSeeHallazgos) {
      let qH;
      if (user.role === 'admin' || user.role === 'lider_regional') {
        qH = query(collection(db, 'hallazgos'));
      } else if (user.role === 'lider_sst') {
        const c: QueryConstraint[] = [];
        if (user.empresa) c.push(where('empresaId', '==', user.empresa));
        qH = query(collection(db, 'hallazgos'), ...c);
      } else if (user.role === 'asesor_arl') {
        qH = query(collection(db, 'hallazgos'), where('createdBy', '==', user.uid));
      } else {
        // autorizante: filtra por empresa del usuario
        qH = query(collection(db, 'hallazgos'), where('empresaId', '==', user.empresa || 'NO_COMPANY'));
      }

      unsubscribers.push(onSnapshot(qH, (snap) => {
        let hData = snap.docs.map(d => ({
          id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt),
        } as unknown as Hallazgo));
        if (user.role === 'lider_regional') {
          hData = hData.filter(h => isInLiderRegionalScope(user, {
            empresa: h.empresa,
            planta: h.planta,
            ciudad: h.ciudad,
          }));
        } else if (user.planta && user.role !== 'admin') {
          hData = hData.filter(h => !h.planta || h.planta.toLowerCase() === user.planta!.toLowerCase());
        }
        setAllHallazgos(hData);
        // Para asesor_arl el loading lo cerramos aquí
        if (user.role === 'asesor_arl') setLoading(false);
      }, () => {
        // Error silencioso — hallazgos es un módulo secundario; no bloquear el dashboard.
        if (user.role === 'asesor_arl') setLoading(false);
      }));
    }

    return () => unsubscribers.forEach(u => u());
  }, [user, userLoading, router]);

  // ── useMemos (todos ANTES de early returns) ──────────────────────────────

  const uniqueEmpresas = useMemo(() => {
    const s = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.empresa) s.add(p.generalInfo.empresa); });
    allHallazgos.forEach(h => { if (h.empresa) s.add(h.empresa); });
    return Array.from(s).sort();
  }, [allPermits, allHallazgos]);

  const uniquePlantas = useMemo(() => {
    const s = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.planta) s.add(p.generalInfo.planta); });
    allHallazgos.forEach(h => { if (h.planta) s.add(h.planta); });
    return Array.from(s).sort();
  }, [allPermits, allHallazgos]);

  const uniqueCiudades = useMemo(() => {
    const s = new Set<string>();
    allPermits.forEach(p => { if (p.generalInfo?.ciudad) s.add(p.generalInfo.ciudad); });
    return Array.from(s).sort();
  }, [allPermits]);

  const filteredPermits = useMemo(() => {
    const dateStart = getDateFilterStart(dateFilter);
    return allPermits.filter(p => {
      if (empresaFilter !== 'all' && p.generalInfo?.empresa !== empresaFilter) return false;
      if (plantaFilter !== 'all' && p.generalInfo?.planta !== plantaFilter) return false;
      if (ciudadFilter !== 'all' && p.generalInfo?.ciudad !== ciudadFilter) return false;
      if (dateStart && p.createdAt && (p.createdAt as unknown as Date) < dateStart) return false;
      return true;
    });
  }, [allPermits, empresaFilter, plantaFilter, ciudadFilter, dateFilter]);

  const filteredHallazgos = useMemo(() => {
    const dateStart = getDateFilterStart(dateFilter);
    return allHallazgos.filter(h => {
      if (empresaFilter !== 'all' && h.empresa !== empresaFilter) return false;
      if (plantaFilter !== 'all' && h.planta !== plantaFilter) return false;
      if (dateStart && h.createdAt && (h.createdAt as unknown as Date) < dateStart) return false;
      return true;
    });
  }, [allHallazgos, empresaFilter, plantaFilter, dateFilter]);

  // Últimos 10 permisos para la tabla
  const permits = useMemo(() => filteredPermits.slice(0, 10), [filteredPermits]);

  // Conteos alineados 1:1 con las pestañas del módulo de Permisos (mismo helper).
  const stats = useMemo(() => {
    // Pendiente: para 'mantenimiento' el módulo solo cuenta los que esperan su firma
    // (solicitante ya aprobó y mantenimiento aún no), igual que permits/page.tsx.
    const pendiente = user?.role === 'mantenimiento'
      ? filteredPermits.filter(p =>
          p.status === 'pendiente_revision' &&
          p.approvals?.solicitante?.status === 'aprobado' &&
          p.approvals?.mantenimiento?.status !== 'aprobado',
        ).length
      : filteredPermits.filter(p => matchesUnifiedStatus(p.status, 'pendiente_revision')).length;

    return {
      total: filteredPermits.length,
      pendiente,
      activos: filteredPermits.filter(p => matchesUnifiedStatus(p.status, 'activos')).length,
      cerrado: filteredPermits.filter(p => matchesUnifiedStatus(p.status, 'cerrado')).length,
      cancelado: filteredPermits.filter(p => matchesUnifiedStatus(p.status, 'cancelado')).length,
    };
  }, [filteredPermits, user?.role]);

  const chartData = useMemo(() => generateChartData(filteredPermits), [filteredPermits]);

  const locationStats = useMemo(() => {
    const plantasMap: Record<string, LocationRow> = {};
    const ciudadesMap: Record<string, LocationRow> = {};

    const norm = (s: string | undefined | null) => (!s || s.trim() === '' ? 'No Especificado' : s.trim());
    const row = (map: Record<string, LocationRow>, name: string) =>
      (map[name] ??= { name, Permisos: 0, Hallazgos: 0, Resueltos: 0, pctResueltos: 0 });

    filteredPermits.forEach(p => {
      const ciudad = norm(p.generalInfo?.ciudad); // corregido: usa el campo real

      row(plantasMap, norm(p.generalInfo?.planta)).Permisos += 1;
      if (ciudad !== 'No Especificado') row(ciudadesMap, ciudad).Permisos += 1;
    });

    filteredHallazgos.forEach(h => {
      // «Resueltos» = cerrados, misma definición que usa la analítica de hallazgos
      // para que ambos bloques no se contradigan.
      const resuelto = esResuelto(h) ? 1 : 0;

      const planta = row(plantasMap, norm(h.planta));
      planta.Hallazgos += 1;
      planta.Resueltos += resuelto;

      const ciudad = norm(h.ciudad);
      if (ciudad !== 'No Especificado') {
        const c = row(ciudadesMap, ciudad);
        c.Hallazgos += 1;
        c.Resueltos += resuelto;
      }
    });

    const finalize = (map: Record<string, LocationRow>, limit: number) =>
      Object.values(map)
        .map(r => ({ ...r, pctResueltos: r.Hallazgos === 0 ? 0 : Math.round((r.Resueltos / r.Hallazgos) * 100) }))
        .sort((a, b) => (b.Permisos + b.Hallazgos) - (a.Permisos + a.Hallazgos))
        .slice(0, limit);

    return {
      byPlanta: finalize(plantasMap, 12),
      byCiudad: finalize(ciudadesMap, 12).filter(c => c.name !== 'No Especificado'),
    };
  }, [filteredPermits, filteredHallazgos]);

  const statsCards = [
    { title: 'Permisos Totales', value: stats.total, icon: FileText, gradient: 'from-blue-600 to-cyan-500', href: '/permits', description: 'Todos los registros' },
    { title: 'Pendientes', value: stats.pendiente, icon: Clock, gradient: 'from-amber-500 to-orange-400', href: '/permits?status=pendiente_revision', description: 'Requieren aprobación' },
    { title: 'Activos', value: stats.activos, icon: Activity, gradient: 'from-violet-600 to-purple-500', href: '/permits?status=activos', description: 'Aprobados / En ejecución / Suspendidos' },
    { title: 'Cerrados', value: stats.cerrado, icon: CheckSquare, gradient: 'from-slate-600 to-gray-500', href: '/permits?status=cerrado', description: 'Completados / Cerrados' },
    { title: 'Cancelados', value: stats.cancelado, icon: XCircle, gradient: 'from-rose-600 to-red-500', href: '/permits?status=cancelado', description: 'Cancelados / Rechazados' },
  ];

  const activeFilterCount = [empresaFilter, plantaFilter, ciudadFilter, dateFilter].filter(f => f !== 'all').length;
  const showFilterBar = allPermits.length > 0 || allHallazgos.length > 0;

  // ── Early returns ────────────────────────────────────────────────────────
  if (userLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 h-screen bg-gray-50/50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium animate-pulse">Cargando panel de control...</p>
        </div>
      </div>
    );
  }

  const handleDownloadManual = () => {
    try { generateUserManualPDF(); } catch (e) { console.error(e); }
  };

  if (!user) return null;

  const currentDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    // `min-w-0 w-full`: sin esto el contenido más ancho (gráficos, tablas) estira
    // el contenedor y saca scroll horizontal a la página entera.
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 sm:p-6 md:p-10 bg-gray-50/30 min-h-screen min-w-0 w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur"></div>
            <div className="relative bg-white rounded-full p-1">
              <Image
                src={user?.photoURL || userAvatar?.imageUrl || ''}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-white"
                priority
                data-ai-hint={userAvatar?.imageHint}
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 truncate">
              Hola, {user.displayName?.split(' ')[0] || 'Usuario'} 👋
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-xs sm:text-sm">
              <span className="capitalize truncate">{currentDate}</span>
              <span className="hidden md:inline text-gray-300">•</span>
              <span className="hidden md:inline font-medium text-blue-600">
                {user.role ? user.role.replace('_', ' ').toUpperCase() : 'N/A'}
              </span>
            </p>
          </div>
        </div>
        {(user?.role === 'solicitante' || user?.role === 'admin') && (
          <Button asChild size="lg" className="shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300">
            <Link href="/permits/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Permiso
            </Link>
          </Button>
        )}
      </div>

      {/* ── Barra de Filtros ─────────────────────────────────────────────── */}
      {showFilterBar && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-3 sm:px-5 py-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            {/* Label + badge */}
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">Filtrar vista:</span>
              {activeFilterCount > 0 && (
                <Badge className="bg-blue-100 text-blue-700 border-0 text-xs font-semibold px-2 py-0.5">
                  {activeFilterCount} activo{activeFilterCount !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap gap-2 flex-1">
              {uniqueEmpresas.length > 1 && (
                <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
                  <SelectTrigger className="h-9 text-sm bg-gray-50 border-gray-200 w-auto min-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <SelectValue placeholder="Empresa" />
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

              {uniquePlantas.length > 1 && (
                <Select value={plantaFilter} onValueChange={setPlantaFilter}>
                  <SelectTrigger className="h-9 text-sm bg-gray-50 border-gray-200 w-auto min-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <Factory className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <SelectValue placeholder="Planta" />
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
                  <SelectTrigger className="h-9 text-sm bg-gray-50 border-gray-200 w-auto min-w-[150px]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <SelectValue placeholder="Ciudad" />
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

              {/* Período */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="h-9 text-sm bg-gray-50 border-gray-200 w-auto min-w-[160px]">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <SelectValue placeholder="Período" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {DATE_PRESETS.map(p => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Limpiar */}
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setEmpresaFilter('all'); setPlantaFilter('all'); setCiudadFilter('all'); setDateFilter('all'); }}
                className="text-gray-400 hover:text-gray-700 gap-1.5 shrink-0 h-9"
              >
                <X className="h-3.5 w-3.5" /> Limpiar
              </Button>
            )}
          </div>

          {/* Resumen de filtros activos */}
          {activeFilterCount > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              {empresaFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100">
                  <Building2 className="h-3 w-3" /> {empresaFilter}
                  <button onClick={() => setEmpresaFilter('all')} className="ml-1 hover:text-blue-900">×</button>
                </span>
              )}
              {plantaFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-100">
                  <Factory className="h-3 w-3" /> {plantaFilter}
                  <button onClick={() => setPlantaFilter('all')} className="ml-1 hover:text-emerald-900">×</button>
                </span>
              )}
              {ciudadFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-100">
                  <MapPin className="h-3 w-3" /> {ciudadFilter}
                  <button onClick={() => setCiudadFilter('all')} className="ml-1 hover:text-purple-900">×</button>
                </span>
              )}
              {dateFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-100">
                  <CalendarDays className="h-3 w-3" /> {DATE_PRESETS.find(p => p.value === dateFilter)?.label}
                  <button onClick={() => setDateFilter('all')} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
              <span className="text-xs text-gray-400 flex items-center">
                Mostrando {filteredPermits.length} permiso{filteredPermits.length !== 1 ? 's' : ''} y {filteredHallazgos.length} hallazgo{filteredHallazgos.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Stats Grid ───────────────────────────────────────────────────── */}
      {user?.role !== 'asesor_arl' && (
        <div className="flex items-center gap-3">
          <div className="h-5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Permisos de Trabajo</h2>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      )}

      {user?.role !== 'asesor_arl' && (
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 min-w-0">
          {statsCards.map((stat, index) => (
            <Link key={index} href={stat.href} className="group block h-full">
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative transform hover:-translate-y-1">
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                  <stat.icon className="h-24 w-24 text-current" />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 min-w-0 truncate">{stat.title}</CardTitle>
                  <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-gray-200/50 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-1 tabular-nums">{stat.value}</div>
                  <p className="text-xs text-gray-400 font-medium">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* ── Analytics Charts ─────────────────────────────────────────────── */}
      {/* Histórico de Permisos */}
      {user?.role !== 'asesor_arl' && (
        <Card className="border-0 shadow-md flex flex-col overflow-hidden min-w-0">
          <CardHeader className="bg-white border-b px-4 sm:px-6 py-4 sm:py-5">
            <CardTitle className="text-base sm:text-xl text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500 shrink-0" /> Histórico de Permisos
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Flujo de permisos de los últimos 6 meses.</p>
          </CardHeader>
          <CardContent className="pt-6 h-[280px] sm:h-[350px] px-2 sm:px-6 min-w-0">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="Solicitados" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Aprobados" stackId="a" fill="#10b981" />
                  <Bar dataKey="Pendientes" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="En Ejecución" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="Cerrados" stackId="a" fill="#475569" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-400">
                <Loader2 className="animate-spin h-8 w-8" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ══ SECCIÓN: HALLAZGOS SST ═══════════════════════════════════════════ */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-1.5 rounded-full bg-amber-500 shrink-0" />
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Hallazgos SST</h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Analítica de Hallazgos — estados completos, cobertura y programas por planta */}
      <HallazgosAnalytics hallazgos={filteredHallazgos} />

      {/* ── Distribución por Planta / Ciudad ─────────────────────────────── */}
      {user?.role !== 'asesor_arl' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 min-w-0">
          <LocationBreakdown
            title="Operaciones por Planta" icon={Factory} iconClass="text-emerald-500"
            data={locationStats.byPlanta} unit="planta" />
          <LocationBreakdown
            title="Actividad por Ciudad" icon={MapPin} iconClass="text-purple-500"
            data={locationStats.byCiudad} unit="ciudad" emptyLabel="Datos insuficientes" />
        </div>
      )}

      {/* ══ SECCIÓN: PLANEACIÓN SST ═════════════════════════════════════════ */}
      {/* Solo admin: `workPlans` es de acceso exclusivo de administradores. */}
      {user?.role === 'admin' && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Planeación SST</h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <WorkPlanCompliance enabled />
        </>
      )}

      {/* ── Permisos Recientes + Panel Lateral ──────────────────────────── */}
      {user?.role !== 'asesor_arl' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabla de permisos recientes */}
          <Card className="lg:col-span-2 border-0 shadow-md flex flex-col overflow-hidden">
            <CardHeader className="bg-white border-b px-6 py-5 flex flex-row items-center justify-between sticky top-0 z-10">
              <div>
                <CardTitle className="text-xl text-gray-800">Permisos Recientes</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Últimos {permits.length} registro{permits.length !== 1 ? 's' : ''}{activeFilterCount > 0 ? ' (filtrado)' : ' de actividad en el sistema'}.
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Link href="/permits">Ver todos <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto bg-gray-50/10 min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-12 h-64 text-gray-400">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                  <p>Actualizando datos...</p>
                </div>
              ) : permits.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sin Movimientos</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-2">
                    {activeFilterCount > 0
                      ? 'No hay permisos con los filtros seleccionados.'
                      : 'Aún no hay permisos registrados. Comienza creando el primero.'}
                  </p>
                  {activeFilterCount > 0 && (
                    <Button variant="outline" size="sm" className="mt-4"
                      onClick={() => { setEmpresaFilter('all'); setPlantaFilter('all'); setCiudadFilter('all'); }}>
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {/* Mobile */}
                  <div className="md:hidden">
                    {permits.map(permit => (
                      <Link key={permit.id} href={`/permits/${permit.id}`} className="block hover:bg-blue-50/50 transition-colors">
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 p-2 rounded-lg ${getStatusColor(permit.status).replace('bg-', 'bg-opacity-20 bg-')}`}>
                              <FileText className="h-4 w-4 opacity-70" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {permit.number || permit.id.substring(0, 8)}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[180px]">
                                {Object.entries((permit as any).selectedWorkTypes || {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'N/A'}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {permit.createdAt ? format(parseFirestoreDate(permit.createdAt as any) || new Date(), 'dd MMM yyyy • HH:mm', { locale: es }) : 'N/A'}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(permit.status)} border-0 shadow-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide`}>
                            {getStatusText(permit.status)}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow>
                          <TableHead className="w-[120px] font-semibold text-xs uppercase tracking-wider text-gray-500">Número</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500">Tipo de Trabajo</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500">Responsable</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500">Fecha</TableHead>
                          <TableHead className="font-semibold text-center text-xs uppercase tracking-wider text-gray-500">Estado</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permits.map(permit => (
                          <TableRow
                            key={permit.id}
                            className="hover:bg-blue-50/30 group cursor-pointer transition-colors"
                            onClick={() => router.push(`/permits/${permit.id}`)}
                          >
                            <TableCell className="font-medium text-blue-600 group-hover:text-blue-800">
                              {permit.number || permit.id.substring(0, 8)}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                                {Object.entries((permit as any).selectedWorkTypes || {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'N/A'}
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                  {permit.user?.displayName?.charAt(0) || 'U'}
                                </div>
                                {permit.user?.displayName || 'N/A'}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                              {permit.createdAt ? format(parseFirestoreDate(permit.createdAt) || new Date(), "dd 'de' MMMM, yyyy", { locale: es }) : 'N/A'}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={`${getStatusColor(permit.status)} border-0 shadow-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wide hover:shadow transition-all`}>
                                {getStatusText(permit.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 group-hover:text-blue-600 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Panel lateral: tips + soporte */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-yellow-400" /> Tips Rápidos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                  <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" /> Aprobar Permisos
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Recuerda que todos los permisos de altura requieren la firma del coordinador antes de proceder.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                  <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" /> Cierre Diario
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Es obligatorio realizar el cierre de validación diaria al finalizar la jornada laboral.
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadManual}
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white hover:text-indigo-900 transition-all cursor-pointer"
                  >
                    <Download className="mr-2 h-4 w-4" /> Manual de Uso
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Soporte Técnico</p>
              <p className="text-sm text-gray-600 mb-4">¿Tienes problemas con la plataforma?</p>
              <Button variant="link" asChild className="text-blue-600 p-0 h-auto font-semibold">
                <a href="https://wa.me/573105586071?text=%C2%A1Hola!%20Necesito%20ayuda%20con%20la%20plataforma%20de%20Permisos%20de%20Trabajo." target="_blank" rel="noopener noreferrer">
                  Contactar a Soporte &rarr;
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
