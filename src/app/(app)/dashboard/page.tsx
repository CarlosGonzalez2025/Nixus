
'use client';
import { useState, useEffect } from 'react';
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
import { FileText, CheckCircle, Clock, XCircle, PlusCircle, Activity, TrendingUp, Upload, Download, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { collection, query, where, onSnapshot, orderBy, limit, Unsubscribe, QueryConstraint, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { errorEmitter } from '@/lib/error-emitter';
import { generateUserManualPDF } from '@/lib/pdf-generators';
import { FirestorePermissionError } from '@/lib/errors';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'borrador': 'bg-gray-100 text-gray-800',
    'pendiente_revision': 'bg-yellow-100 text-yellow-800',
    'aprobado': 'bg-green-100 text-green-800',
    'en_ejecucion': 'bg-purple-100 text-purple-800',
    'suspendido': 'bg-orange-100 text-orange-800',
    'cerrado': 'bg-blue-100 text-blue-800',
    'rechazado': 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: string) => {
  const statusText: { [key: string]: string } = {
    'borrador': 'Borrador',
    'pendiente_revision': 'Pendiente de Revisión',
    'aprobado': 'Aprobado',
    'en_ejecucion': 'En Ejecución',
    'suspendido': 'Suspendido',
    'cerrado': 'Cerrado',
    'rechazado': 'Rechazado',
  };
  return statusText[status] || status;
};

const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;

  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate();
  }

  if (dateValue instanceof Date) {
    return dateValue;
  }

  if (typeof dateValue === 'string') {
    return new Date(dateValue);
  }

  return null;
};

const workTypes: { [key: string]: string } = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General',
  'alturas': 'Trabajo en Alturas',
  'espaciosConfinados': 'Espacios Confinados',
  'izajeCarga': 'Izaje de Cargas',
  'trabajoCaliente': 'Trabajo en Caliente',
  'excavaciones': 'Excavaciones'
};

export default function Dashboard() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pendiente: 0,
    aprobado: 0,
    enEjecucion: 0
  });
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (!user) {
      setPermits([]);
      setStats({ total: 0, pendiente: 0, aprobado: 0, enEjecucion: 0 });
      setLoading(false);
      router.push('/login');
      return;
    }

    const permitsCollection = collection(db, 'permits');
    let unsubscribers: Unsubscribe[] = [];

    if (user.role === 'lider_sst') {
      const q1 = query(permitsCollection, where("selectedWorkTypes.alturas", "==", true));
      const q2 = query(permitsCollection, where("isSSTSignatureRequired", "==", true));

      const fetchData = async () => {
        try {
          const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

          const permitsMap = new Map<string, Permit>();

          snapshot1.docs.forEach(doc => {
            if (!permitsMap.has(doc.id)) {
              permitsMap.set(doc.id, { id: doc.id, ...doc.data(), createdAt: parseFirestoreDate(doc.data().createdAt) } as Permit);
            }
          });

          snapshot2.docs.forEach(doc => {
            if (!permitsMap.has(doc.id)) {
              permitsMap.set(doc.id, { id: doc.id, ...doc.data(), createdAt: parseFirestoreDate(doc.data().createdAt) } as Permit);
            }
          });

          const combinedPermits = Array.from(permitsMap.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
          const recentPermits = combinedPermits.slice(0, 10);
          setPermits(recentPermits);

          setStats({
            total: combinedPermits.length,
            pendiente: combinedPermits.filter(p => p.status === 'pendiente_revision').length,
            aprobado: combinedPermits.filter(p => p.status === 'aprobado').length,
            enEjecucion: combinedPermits.filter(p => p.status === 'en_ejecucion').length
          });

          setLoading(false);

        } catch (error) {
          const permissionError = new FirestorePermissionError({ path: permitsCollection.path, operation: 'list' });
          errorEmitter.emit('permission-error', permissionError);
          setLoading(false);
        }
      }

      const unsub1 = onSnapshot(q1, fetchData, (e) => {
        const permissionError = new FirestorePermissionError({ path: q1.toString(), operation: 'list' });
        errorEmitter.emit('permission-error', permissionError);
      });
      const unsub2 = onSnapshot(q2, fetchData, (e) => {
        const permissionError = new FirestorePermissionError({ path: q2.toString(), operation: 'list' });
        errorEmitter.emit('permission-error', permissionError);
      });

      unsubscribers.push(unsub1, unsub2);
      fetchData();

    } else {
      let finalQuery: QueryConstraint[] = [];
      const isSolicitante = user.role === 'solicitante';

      if (isSolicitante) {
        finalQuery.push(where('createdBy', '==', user.uid));
      }

      const q = query(permitsCollection, ...finalQuery);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let permitsData = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data(), createdAt: parseFirestoreDate(doc.data().createdAt),
        } as Permit));

        permitsData = permitsData.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));

        const recentPermits = permitsData.slice(0, 10);
        setPermits(recentPermits);

        setStats({
          total: permitsData.length,
          pendiente: permitsData.filter(p => p.status === 'pendiente_revision').length,
          aprobado: permitsData.filter(p => p.status === 'aprobado').length,
          enEjecucion: permitsData.filter(p => p.status === 'en_ejecucion').length
        });

        setLoading(false);
      }, (error) => {
        const permissionError = new FirestorePermissionError({
          path: permitsCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
      });

      unsubscribers.push(unsubscribe);
    }

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };

  }, [user, userLoading, router]);

  const statsCards = [
    {
      title: 'Permisos Totales',
      value: stats.total,
      icon: FileText,
      gradient: 'from-blue-600 to-cyan-500',
      href: '/permits?status=activos',
      description: 'Todos los registros activos'
    },
    {
      title: 'Pendientes',
      value: stats.pendiente,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-400',
      href: '/permits?status=pendiente_revision',
      description: 'Requieren aprobación'
    },
    {
      title: 'Aprobados',
      value: stats.aprobado,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-green-400',
      href: '/permits?status=aprobado',
      description: 'Listos para iniciar'
    },
    {
      title: 'En Ejecución',
      value: stats.enEjecucion,
      icon: Activity,
      gradient: 'from-violet-600 to-purple-500',
      href: '/permits?status=en_ejecucion',
      description: 'Trabajos en curso'
    }
  ];

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

  const getWorkTypesString = (types: string[]): string => {
    if (!Array.isArray(types) || types.length === 0) return 'General';
    return types.map(key => workTypes[key] || key).join(', ');
  };

  const handleDownloadManual = () => {
    try {
      generateUserManualPDF();
    } catch (error) {
      console.error("Error downloading manual:", error);
    }
  };

  if (!user) {
    return null;
  }

  const currentDate = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 md:p-10 bg-gray-50/30 min-h-screen">
      {/* Header Section */}
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
              <span className="hidden md:inline font-medium text-blue-600">{user.role ? user.role.replace('_', ' ').toUpperCase() : 'N/A'}</span>
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

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Link key={index} href={stat.href} className="group block h-full">
            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative transform hover:-translate-y-1">
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <stat.icon className="h-24 w-24 text-current" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent to-transparent group-hover:from-white/50 group-hover:to-white/50 transition-all" />

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg shadow-gray-200/50 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-gray-900 mt-2 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-400 font-medium">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Permits List */}
        <Card className="lg:col-span-2 border-0 shadow-md flex flex-col overflow-hidden">
          <CardHeader className="bg-white border-b px-6 py-5 flex flex-row items-center justify-between sticky top-0 z-10">
            <div>
              <CardTitle className="text-xl text-gray-800">Permisos Recientes</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Últimos 10 registros de actividad en el sistema.</p>
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
                  Aún no hay permisos registrados. Comienza creando el primero.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {/* Mobile List */}
                <div className="md:hidden">
                  {permits.map((permit) => (
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
                              {getWorkTypesString(permit.workType)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {permit.createdAt ? format(permit.createdAt, "dd MMM yyyy • HH:mm", { locale: es }) : 'N/A'}
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

                {/* Desktop Table */}
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
                      {permits.map((permit) => (
                        <TableRow key={permit.id} className="hover:bg-blue-50/30 group cursor-pointer transition-colors" onClick={() => router.push(`/permits/${permit.id}`)}>
                          <TableCell className="font-medium text-blue-600 group-hover:text-blue-800">
                            {permit.number || permit.id.substring(0, 8)}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                              {getWorkTypesString(permit.workType)}
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
                            {permit.createdAt ? format(permit.createdAt, "dd MMM yyyy", { locale: es }) : 'N/A'}
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

        {/* Quick Help / Info Card */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-900 to-slate-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Tips Rápidos
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
              <a href="https://wa.me/573105586071?text=%C2%A1Hola!%20Necesito%20ayuda%20con%20la%20plataforma%20de%20Permisos%20de%20Trabajo." target="_blank" rel="noopener noreferrer">Contactar a Soporte &rarr;</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
