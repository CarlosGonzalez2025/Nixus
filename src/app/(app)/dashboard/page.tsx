
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
  AlertTriangle, CheckSquare, MapPin, Building2, Factory, Filter, X, CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import {
  collection, query, where, onSnapshot, orderBy,
  Unsubscribe, QueryConstraint, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, Hallazgo } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList,
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { errorEmitter } from '@/lib/error-emitter';
import { generateUserManualPDF } from '@/lib/pdf-generators';
import { FirestorePermissionError } from '@/lib/errors';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      // loading lo cierra el snapshot de hallazgos

    } else if (user.role === 'lider_sst') {
      const q1 = query(permitsCollection, where('selectedWorkTypes.alturas', '==', true));
      const q2 = query(permitsCollection, where('isSSTSignatureRequired', '==', true));

      const fetchData = async () => {
        try {
          const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
          const map = new Map<string, Permit>();
          [snap1, snap2].forEach(snap =>
            snap.docs.forEach(d => {
              if (!map.has(d.id))
                map.set(d.id, { id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt) } as unknown as Permit);
            })
          );
          const combined = Array.from(map.values())
            .filter(p => {
              const matchPlanta = !user.planta || p.generalInfo?.planta === user.planta;
              const matchEmpresa = !user.empresa || p.generalInfo?.empresa === user.empresa;
              return matchPlanta && matchEmpresa;
            })
            .sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));
          setAllPermits(combined);
          setLoading(false);
        } catch {
          errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
          setLoading(false);
        }
      };

      unsubscribers.push(onSnapshot(q1, fetchData, (_e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
      }));
      unsubscribers.push(onSnapshot(q2, fetchData, (_e) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
      }));
      fetchData();

    } else if (user.role === 'mantenimiento') {
      const q = query(permitsCollection, where('controlEnergia', '==', true));
      unsubscribers.push(onSnapshot(q, (snap) => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt) } as unknown as Permit))
          .filter(p =>
            p.status === 'pendiente_revision' &&
            p.approvals?.mantenimiento?.status === 'pendiente' &&
            p.approvals?.solicitante?.status === 'aprobado' &&
            (!user.planta || p.generalInfo?.planta === user.planta)
          )
          .sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));
        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      }));

    } else {
      const finalQuery: QueryConstraint[] = user.role === 'solicitante'
        ? [where('createdBy', '==', user.uid)]
        : [orderBy('createdAt', 'desc')];

      unsubscribers.push(onSnapshot(query(permitsCollection, ...finalQuery), (snap) => {
        let data = snap.docs.map(d => ({
          id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt),
        } as unknown as Permit));

        data = data.sort((a, b) => ((b.createdAt as any)?.getTime?.() || 0) - ((a.createdAt as any)?.getTime?.() || 0));

        if (user.role === 'autorizante') {
          data = data.filter(p => {
            const matchEmpresa = !user.empresa || !p.generalInfo?.empresa || p.generalInfo.empresa === user.empresa;
            const matchPlanta = !user.planta || !p.generalInfo?.planta || p.generalInfo.planta === user.planta;
            return matchEmpresa && matchPlanta;
          });
        }

        setAllPermits(data);
        setLoading(false);
      }, () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' }));
        setLoading(false);
      }));
    }

    // ── Hallazgos ────────────────────────────────────────────────────────
    let qH;
    if (user.role === 'admin') {
      qH = query(collection(db, 'hallazgos'));
    } else if (user.role === 'lider_sst') {
      const c: QueryConstraint[] = [];
      if (user.empresa) c.push(where('empresaId', '==', user.empresa));
      qH = query(collection(db, 'hallazgos'), ...c);
    } else if (user.role === 'asesor_arl') {
      qH = query(collection(db, 'hallazgos'), where('createdBy', '==', user.uid));
    } else {
      qH = query(collection(db, 'hallazgos'), where('empresaId', '==', user.empresa || 'NO_COMPANY'));
    }

    unsubscribers.push(onSnapshot(qH, (snap) => {
      let hData = snap.docs.map(d => ({
        id: d.id, ...d.data(), createdAt: parseFirestoreDate(d.data().createdAt),
      } as unknown as Hallazgo));
      if (user.planta && user.role !== 'admin') {
        hData = hData.filter(h => !h.planta || h.planta === user.planta);
      }
      setAllHallazgos(hData);
      // Para asesor_arl el loading lo cerramos aquí
      if (user.role === 'asesor_arl') setLoading(false);
    }));

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
      if (dateStart && p.createdAt && (p.createdAt as Date) < dateStart) return false;
      return true;
    });
  }, [allPermits, empresaFilter, plantaFilter, ciudadFilter, dateFilter]);

  const filteredHallazgos = useMemo(() => {
    const dateStart = getDateFilterStart(dateFilter);
    return allHallazgos.filter(h => {
      if (empresaFilter !== 'all' && h.empresa !== empresaFilter) return false;
      if (plantaFilter !== 'all' && h.planta !== plantaFilter) return false;
      if (dateStart && h.createdAt && (h.createdAt as Date) < dateStart) return false;
      return true;
    });
  }, [allHallazgos, empresaFilter, plantaFilter, dateFilter]);

  // Últimos 10 permisos para la tabla
  const permits = useMemo(() => filteredPermits.slice(0, 10), [filteredPermits]);

  const stats = useMemo(() => ({
    total: filteredPermits.length,
    pendiente: filteredPermits.filter(p => p.status === 'pendiente_revision').length,
    enEjecucion: filteredPermits.filter(p => p.status === 'en_ejecucion').length,
    cerrado: filteredPermits.filter(p => p.status === 'cerrado').length,
  }), [filteredPermits]);

  const chartData = useMemo(() => generateChartData(filteredPermits), [filteredPermits]);

  const hallazgosStats = useMemo(() => ({
    total: filteredHallazgos.length,
    abiertos: filteredHallazgos.filter(h => h.cumplimientoEstado === 'Pendiente' || h.cumplimientoEstado === 'En Progreso' || !h.cumplimientoEstado).length,
    cerrados: filteredHallazgos.filter(h => h.cumplimientoEstado === 'Cerrado' || h.cumplimientoEstado === 'Completado').length,
  }), [filteredHallazgos]);

  const hallazgosEstado = useMemo(() => [
    { name: 'Abiertos', value: hallazgosStats.abiertos, color: '#d97706' },
    { name: 'Cerrados', value: hallazgosStats.cerrados, color: '#16a34a' },
  ].filter(e => e.value > 0), [hallazgosStats.abiertos, hallazgosStats.cerrados]);

  const hallazgosClase = useMemo(() => [
    { name: 'Clase A', value: filteredHallazgos.filter(h => h.clase === 'A').length, color: '#dc2626' },
    { name: 'Clase B', value: filteredHallazgos.filter(h => h.clase === 'B').length, color: '#d97706' },
    { name: 'Clase C', value: filteredHallazgos.filter(h => h.clase === 'C').length, color: '#2563eb' },
  ].filter(c => c.value > 0), [filteredHallazgos]);

  const locationStats = useMemo(() => {
    const plantasMap: Record<string, { name: string; Permisos: number; Hallazgos: number }> = {};
    const empresasMap: Record<string, { name: string; Permisos: number; Hallazgos: number }> = {};
    const ciudadesMap: Record<string, { name: string; Permisos: number; Hallazgos: number }> = {};

    const norm = (s: string | undefined | null) => (!s || s.trim() === '' ? 'No Especificado' : s.trim());

    filteredPermits.forEach(p => {
      const planta = norm(p.generalInfo?.planta);
      const empresa = norm(p.generalInfo?.empresa);
      const ciudad = norm(p.generalInfo?.ciudad); // corregido: usa el campo real

      if (!plantasMap[planta]) plantasMap[planta] = { name: planta, Permisos: 0, Hallazgos: 0 };
      if (!empresasMap[empresa]) empresasMap[empresa] = { name: empresa, Permisos: 0, Hallazgos: 0 };
      plantasMap[planta].Permisos += 1;
      empresasMap[empresa].Permisos += 1;

      if (ciudad !== 'No Especificado') {
        if (!ciudadesMap[ciudad]) ciudadesMap[ciudad] = { name: ciudad, Permisos: 0, Hallazgos: 0 };
        ciudadesMap[ciudad].Permisos += 1;
      }
    });

    filteredHallazgos.forEach(h => {
      const planta = norm(h.planta);
      const empresa = norm(h.empresa);

      if (!plantasMap[planta]) plantasMap[planta] = { name: planta, Permisos: 0, Hallazgos: 0 };
      if (!empresasMap[empresa]) empresasMap[empresa] = { name: empresa, Permisos: 0, Hallazgos: 0 };
      plantasMap[planta].Hallazgos += 1;
      empresasMap[empresa].Hallazgos += 1;
    });

    const byTotal = (a: { Permisos: number; Hallazgos: number }, b: { Permisos: number; Hallazgos: number }) =>
      (b.Permisos + b.Hallazgos) - (a.Permisos + a.Hallazgos);

    return {
      byPlanta: Object.values(plantasMap).sort(byTotal).slice(0, 6),
      byEmpresa: Object.values(empresasMap).sort(byTotal).slice(0, 12),
      byCiudad: Object.values(ciudadesMap).filter(c => c.name !== 'No Especificado').sort(byTotal).slice(0, 12),
    };
  }, [filteredPermits, filteredHallazgos]);

  const statsCards = [
    { title: 'Permisos Totales', value: stats.total, icon: FileText, gradient: 'from-blue-600 to-cyan-500', href: '/permits?status=activos', description: 'Todos los registros activos' },
    { title: 'Pendientes', value: stats.pendiente, icon: Clock, gradient: 'from-amber-500 to-orange-400', href: '/permits?status=pendiente_revision', description: 'Requieren aprobación' },
    { title: 'En Ejecución', value: stats.enEjecucion, icon: Activity, gradient: 'from-violet-600 to-purple-500', href: '/permits?status=en_ejecucion', description: 'Trabajos en curso' },
    { title: 'Cerrados', value: stats.cerrado, icon: CheckSquare, gradient: 'from-slate-600 to-gray-500', href: '/permits?status=cerrado', description: 'Completados / Cerrados' },
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
    <div className="flex flex-1 flex-col gap-8 p-6 md:p-10 bg-gray-50/30 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-5">
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Hola, {user.displayName?.split(' ')[0] || 'Usuario'} 👋
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <span className="capitalize">{currentDate}</span>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
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
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {statsCards.map((stat, index) => (
            <Link key={index} href={stat.href} className="group block h-full">
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative transform hover:-translate-y-1">
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                  <stat.icon className="h-24 w-24 text-current" />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-gray-200/50 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-bold text-gray-900 mt-2 mb-1">{stat.value}</div>
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
        <Card className="border-0 shadow-md flex flex-col overflow-hidden">
          <CardHeader className="bg-white border-b px-6 py-5">
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" /> Histórico de Permisos
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Flujo de permisos de los últimos 6 meses.</p>
          </CardHeader>
          <CardContent className="pt-6 h-[350px]">
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

      {/* Analítica de Hallazgos */}
      <Card className="border-0 shadow-md flex flex-col overflow-hidden">
        <CardHeader className="bg-white border-b px-6 py-5">
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Analítica de Hallazgos
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">Distribución global e intervención por prioridades.</p>
        </CardHeader>
        <CardContent className="p-8">
          {hallazgosStats.total === 0 ? (
            <div className="h-[280px] flex flex-col items-center justify-center gap-3">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-green-500" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Sin hallazgos registrados</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Gráfico de Estado */}
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Estado general</p>
                <div className="relative h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={hallazgosEstado} innerRadius={62} outerRadius={84} paddingAngle={3} dataKey="value" stroke="none">
                        {hallazgosEstado.map((entry, i) => (
                          <Cell key={`estado-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-800 leading-none">{hallazgosStats.total}</span>
                    <span className="text-[10px] text-gray-400 font-medium mt-1">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-5 w-full max-w-[220px]">
                  {hallazgosEstado.map((e, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                      <span className="text-sm text-gray-600 flex-1">{e.name}</span>
                      <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full">{e.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico de Clase */}
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Por clase de riesgo</p>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={hallazgosClase} innerRadius={62} outerRadius={84} paddingAngle={3} dataKey="value" stroke="none">
                        {hallazgosClase.map((entry, i) => (
                          <Cell key={`clase-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2.5 mt-5 w-full max-w-[220px]">
                  {hallazgosClase.map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                      <span className="text-sm text-gray-600 flex-1">{c.name}</span>
                      <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Gráficos Geográficos ─────────────────────────────────────────── */}
      {user?.role !== 'asesor_arl' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Por Empresa */}
          {(() => {
            const data = locationStats.byEmpresa;
            const yWidth = data.length > 0
              ? Math.min(230, Math.max(130, Math.max(...data.map(d => d.name.length)) * 7))
              : 130;
            const chartH = Math.max(280, data.length * 46 + 56);
            return (
              <Card className="border-0 shadow-md flex flex-col overflow-hidden">
                <CardHeader className="bg-white border-b px-6 py-4">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-500" /> Operaciones por Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.length > 0 ? (
                    <>
                      <div className="overflow-y-auto max-h-[420px]">
                        <div style={{ height: chartH }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 44, left: 4, bottom: 4 }}>
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
                              />
                              <Bar dataKey="Permisos" stackId="a" fill="#3b82f6">
                                <LabelList dataKey="Permisos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                              </Bar>
                              <Bar dataKey="Hallazgos" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="Hallazgos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                                <LabelList
                                  content={({ x, y, width, height, index }: any) => {
                                    const item = data[index as number];
                                    if (!item) return null;
                                    const total = item.Permisos + item.Hallazgos;
                                    return (
                                      <text x={(x as number) + (width as number) + 5} y={(y as number) + (height as number) / 2}
                                        fill="#6B7280" fontSize={10} fontWeight={600} textAnchor="start" dominantBaseline="middle">
                                        {total}
                                      </text>
                                    );
                                  }}
                                />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Permisos</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Hallazgos</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{data.length} empresa{data.length !== 1 ? 's' : ''}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-[200px] text-gray-400"><p className="text-sm">Sin datos</p></div>
                  )}
                </CardContent>
              </Card>
            );
          })()}

          {/* Por Ciudad */}
          {(() => {
            const data = locationStats.byCiudad;
            const yWidth = data.length > 0
              ? Math.min(160, Math.max(90, Math.max(...data.map(d => d.name.length)) * 7))
              : 90;
            const chartH = Math.max(280, data.length * 46 + 56);
            return (
              <Card className="border-0 shadow-md flex flex-col overflow-hidden">
                <CardHeader className="bg-white border-b px-6 py-4">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" /> Actividad por Ciudad
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.length > 0 ? (
                    <>
                      <div className="overflow-y-auto max-h-[420px]">
                        <div style={{ height: chartH }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 44, left: 4, bottom: 4 }}>
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
                              />
                              <Bar dataKey="Permisos" stackId="a" fill="#3b82f6">
                                <LabelList dataKey="Permisos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                              </Bar>
                              <Bar dataKey="Hallazgos" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="Hallazgos" position="inside" style={{ fill: '#fff', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => v > 0 ? v : ''} />
                                <LabelList
                                  content={({ x, y, width, height, index }: any) => {
                                    const item = data[index as number];
                                    if (!item) return null;
                                    const total = item.Permisos + item.Hallazgos;
                                    return (
                                      <text x={(x as number) + (width as number) + 5} y={(y as number) + (height as number) / 2}
                                        fill="#6B7280" fontSize={10} fontWeight={600} textAnchor="start" dominantBaseline="middle">
                                        {total}
                                      </text>
                                    );
                                  }}
                                />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Permisos</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Hallazgos</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{data.length} ciudad{data.length !== 1 ? 'es' : ''}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-[200px] text-gray-400">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                        <p className="text-sm">Datos insuficientes</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}

        </div>
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
