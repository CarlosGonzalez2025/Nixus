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
import { FileText, CheckCircle, Clock, XCircle, PlusCircle, Activity, TrendingUp, Upload, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { collection, query, where, onSnapshot, orderBy, limit, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const getStatusColor = (status: string) => {
  const statusColors: {[key: string]: string} = {
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
  const statusText: {[key: string]: string} = {
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

// ✅ Helper function to handle different date formats
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

const workTypes: {[key: string]: string} = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
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
  
  useEffect(() => {
    // ✅ CRÍTICO: No configurar listeners mientras se verifica auth
    if (userLoading) {
      console.log('⏳ Waiting for auth...');
      return;
    }

    // ✅ CRÍTICO: Si no hay usuario, limpiar estado y NO configurar listeners
    if (!user) {
      console.log('🔒 No user - cleaning up and redirecting');
      setPermits([]);
      setStats({ total: 0, pendiente: 0, aprobado: 0, enEjecucion: 0 });
      setLoading(false);
      router.push('/login');
      return;
    }

    console.log('✅ User authenticated, setting up listeners for:', user.email);

    // Array para almacenar todas las funciones unsubscribe
    const unsubscribers: Unsubscribe[] = [];

    try {
      // ========================================
      // LISTENER 1: Permisos Recientes
      // ========================================
      const permitsCollection = collection(db, 'permits');
      const recentPermitsQuery = query(
        permitsCollection, 
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      const permitsUnsubscribe = onSnapshot(
        recentPermitsQuery,
        (snapshot) => {
          console.log('📊 Recent permits updated:', snapshot.size);
          const allRecentPermits = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: parseFirestoreDate(data.createdAt),
            } as Permit;
          });
          
          setPermits(allRecentPermits);
          setLoading(false);
        },
        (error) => {
          console.error('❌ Error fetching recent permits:', error);
          
          // Si es error de permisos, redirigir
          if (error.code === 'permission-denied') {
            console.log('🚫 Permission denied - redirecting to login');
            router.push('/login');
          }
          
          setLoading(false);
        }
      );

      unsubscribers.push(permitsUnsubscribe);

      // ========================================
      // LISTENER 2: Estadísticas
      // ========================================
      const allPermitsQuery = query(collection(db, 'permits'));
      
      const statsUnsubscribe = onSnapshot(
        allPermitsQuery,
        (statsSnapshot) => {
          console.log('📈 Stats updated:', statsSnapshot.size);
          const allPermits = statsSnapshot.docs.map(d => d.data() as Permit);
          setStats({
            total: allPermits.length,
            pendiente: allPermits.filter(p => p.status === 'pendiente_revision').length,
            aprobado: allPermits.filter(p => p.status === 'aprobado').length,
            enEjecucion: allPermits.filter(p => p.status === 'en_ejecucion').length
          });
        },
        (error) => {
          console.error('❌ Error fetching stats:', error);
          
          // Si es error de permisos, redirigir
          if (error.code === 'permission-denied') {
            console.log('🚫 Permission denied on stats - redirecting to login');
            router.push('/login');
          }
        }
      );

      unsubscribers.push(statsUnsubscribe);

    } catch (error) {
      console.error('❌ Error setting up listeners:', error);
      setLoading(false);
    }

    // ✅ CRÍTICO: Limpiar TODOS los listeners al desmontar o cuando user cambie
    return () => {
      console.log('🧹 Cleaning up dashboard listeners');
      unsubscribers.forEach(unsub => {
        try {
          unsub();
        } catch (error) {
          console.error('Error unsubscribing:', error);
        }
      });
    };
  }, [user, userLoading, router]); // ✅ Dependencias correctas

  const statsCards = [
    {
      title: 'Permisos Totales',
      value: stats.total,
      icon: FileText,
      color: 'hsl(var(--primary))',
      bgColor: 'hsl(var(--primary) / 0.1)'
    },
    {
      title: 'Pendientes',
      value: stats.pendiente,
      icon: Clock,
      color: 'hsl(var(--secondary))',
      bgColor: 'hsl(var(--secondary) / 0.1)'
    },
    {
      title: 'Aprobados',
      value: stats.aprobado,
      icon: CheckCircle,
      color: 'hsl(var(--accent))',
      bgColor: 'hsl(var(--accent) / 0.1)'
    },
    {
      title: 'En Ejecución',
      value: stats.enEjecucion,
      icon: Activity,
      color: 'hsl(var(--info))',
      bgColor: 'hsl(var(--info) / 0.1)'
    }
  ];

  const getWorkTypesString = (types: string[]): string => {
    if (!Array.isArray(types) || types.length === 0) return 'General';
    return types.map(key => workTypes[key] || key).join(', ');
  };

  // ✅ Mostrar loading mientras se verifica auth
  if (userLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-2 text-sm text-muted-foreground">Verificando autenticación...</p>
      </div>
    );
  }

  // ✅ No renderizar nada si no hay usuario (ya se redirigió)
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de permisos de trabajo y acciones rápidas.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="rounded-full p-3" style={{ backgroundColor: stat.bgColor }}>
                <stat.icon style={{ color: stat.color }} className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{color: stat.color}}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(user?.role === 'lider_tarea' || user?.role === 'solicitante' || user?.role === 'administrador') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto py-4" size="lg">
              <Link href="/permits/create">
                <PlusCircle className="mr-2"/>
                Nuevo Permiso de Trabajo
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4" size="lg">
              <Link href="/permits">
                <FileText className="mr-2"/>
                Ver Todos los Permisos
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" size="lg" disabled>
              <Download className="mr-2"/>
              Exportar Reportes
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Permisos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-2 text-sm text-muted-foreground">Cargando permisos...</p>
            </div>
          ) : permits.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <FileText size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold">No hay permisos de trabajo registrados</p>
              <p className="text-sm mt-2 mb-4">Crea tu primer permiso para comenzar</p>
              {(user?.role === 'lider_tarea' || user?.role === 'solicitante' || user?.role === 'administrador') && (
                <Button asChild>
                  <Link href="/permits/create">
                    <PlusCircle className="mr-2"/>
                    Crear Primer Permiso
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="md:hidden space-y-4">
                {permits.map((permit) => (
                  <Link key={permit.id} href={`/permits/${permit.id}`} className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-primary">{permit.number || permit.id.substring(0,8)}</p>
                            <p className="text-sm text-muted-foreground">{getWorkTypesString(permit.workType)}</p>
                          </div>
                          <Badge className={getStatusColor(permit.status)}>
                            {getStatusText(permit.status)}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground pt-2 border-t mt-2">
                          <p>Creado por: {permit.user?.displayName || 'N/A'}</p>
                          <p>Fecha: {permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy HH:mm") : 'N/A'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {/* Desktop View - Table */}
              <Table className="hidden md:table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Tipo de Trabajo</TableHead>
                    <TableHead>Creado por</TableHead>
                    <TableHead>Fecha Creación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permits.map((permit) => (
                    <TableRow key={permit.id}>
                      <TableCell className="font-medium">
                        <Link href={`/permits/${permit.id}`} className="hover:underline text-primary">
                          {permit.number || permit.id.substring(0, 8)}
                        </Link>
                      </TableCell>
                      <TableCell>{getWorkTypesString(permit.workType)}</TableCell>
                      <TableCell>{permit.user?.displayName || 'N/A'}</TableCell>
                      <TableCell>
                        {permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy HH:mm") : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(permit.status)}>
                          {getStatusText(permit.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/permits/${permit.id}`}>
                            Ver Detalles
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}