
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
import { collection, query, where, onSnapshot, orderBy, limit, Unsubscribe, QueryConstraint, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit } from '@/types';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  
  useEffect(() => {
    if (userLoading) {
      console.log('⏳ Waiting for auth...');
      return;
    }

    if (!user) {
      console.log('🔒 No user - cleaning up and redirecting');
      setPermits([]);
      setStats({ total: 0, pendiente: 0, aprobado: 0, enEjecucion: 0 });
      setLoading(false);
      router.push('/login');
      return;
    }

    console.log('✅ User authenticated, setting up listeners for:', user.email);

    const permitsCollection = collection(db, 'permits');

    if (user.role === 'lider_sst') {
      const q1 = query(permitsCollection, where("trabajoAlturas", "==", true));
      const q2 = query(permitsCollection, where("isSSTSignatureRequired", "==", true));

      const unsub1 = onSnapshot(q1, () => {});
      const unsub2 = onSnapshot(q2, () => {});

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

          const combinedPermits = Array.from(permitsMap.values());
          const recentPermits = [...combinedPermits].sort((a,b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)).slice(0,10);
          setPermits(recentPermits);

          setStats({
            total: combinedPermits.length,
            pendiente: combinedPermits.filter(p => p.status === 'pendiente_revision').length,
            aprobado: combinedPermits.filter(p => p.status === 'aprobado').length,
            enEjecucion: combinedPermits.filter(p => p.status === 'en_ejecucion').length
          });

          setLoading(false);

        } catch (error) {
           console.error('❌ Error fetching SST permits:', error);
           setLoading(false);
        }
      }
      
      fetchData();

      return () => {
        unsub1();
        unsub2();
      };

    } else {
      let finalQuery: QueryConstraint[] = [];
      const isSolicitante = user.role === 'solicitante' || user.role === 'lider_tarea';
      
      if (isSolicitante) {
        finalQuery.push(where('createdBy', '==', user.uid));
      }
      finalQuery.push(orderBy('createdAt', 'desc'));
      
      const q = query(permitsCollection, ...finalQuery);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const permitsData = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data(), createdAt: parseFirestoreDate(doc.data().createdAt),
        } as Permit));
        
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
        console.error('❌ Error fetching permits:', error);
        if (error.code === 'permission-denied') router.push('/login');
        setLoading(false);
      });

       return () => {
        console.log('🧹 Cleaning up dashboard listeners');
        if (unsubscribe) unsubscribe();
      };
    }

  }, [user, userLoading, router]);

  const statsCards = [
    {
      title: 'Permisos Totales',
      value: stats.total,
      icon: FileText,
      color: 'hsl(188, 75%, 43%)',
      bgColor: 'hsl(188, 75%, 43%, 0.1)'
    },
    {
      title: 'Pendientes',
      value: stats.pendiente,
      icon: Clock,
      color: 'hsl(45, 93%, 57%)',
      bgColor: 'hsl(45, 93%, 57%, 0.1)'
    },
    {
      title: 'Aprobados',
      value: stats.aprobado,
      icon: CheckCircle,
      color: 'hsl(142, 71%, 45%)',
      bgColor: 'hsl(142, 71%, 45%, 0.1)'
    },
    {
      title: 'En Ejecución',
      value: stats.enEjecucion,
      icon: Activity,
      color: 'hsl(188, 75%, 38%)',
      bgColor: 'hsl(188, 75%, 38%, 0.1)'
    }
  ];

  const getWorkTypesString = (types: string[]): string => {
    if (!Array.isArray(types) || types.length === 0) return 'General';
    return types.map(key => workTypes[key] || key).join(', ');
  };

  if (userLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-2 text-sm text-muted-foreground">Verificando autenticación...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Image 
                src="https://i.postimg.cc/jShP2K6k/Whats-App-Image-2025-10-20-at-10-43-48-AM.jpg"
                alt="Dashboard Icon"
                width={56}
                height={56}
                className="rounded-full"
            />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Resumen de permisos de trabajo y acciones rápidas.
            </p>
          </div>
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

      {(user?.role === 'lider_tarea' || user?.role === 'solicitante' || user?.role === 'admin') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp style={{ color: 'hsl(188, 75%, 43%)' }} />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto py-4" size="lg" style={{ backgroundColor: 'hsl(188, 75%, 43%)', color: 'white' }}>
              <Link href="/permits/create">
                <PlusCircle className="mr-2"/>
                Nuevo Permiso de Trabajo
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4" size="lg" style={{ borderColor: 'hsl(188, 75%, 43%)', color: 'hsl(188, 75%, 43%)' }}>
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
              {(user?.role === 'lider_tarea' || user?.role === 'solicitante' || user?.role === 'admin') && (
                <Button asChild style={{ backgroundColor: 'hsl(188, 75%, 43%)', color: 'white' }}>
                  <Link href="/permits/create">
                    <PlusCircle className="mr-2"/>
                    Crear Primer Permiso
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="md:hidden space-y-4">
                {permits.map((permit) => (
                  <Link key={permit.id} href={`/permits/${permit.id}`} className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold" style={{ color: 'hsl(188, 75%, 43%)' }}>
                              {permit.number || permit.id.substring(0,8)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {getWorkTypesString(permit.workType)}
                            </p>
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
                        <Link href={`/permits/${permit.id}`} className="hover:underline" style={{ color: 'hsl(188, 75%, 43%)' }}>
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

    
