'use client';
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
import { FileText, CheckCircle, Clock, XCircle, PlusCircle, Activity, TrendingUp, Upload, Download } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';


const getStatusColor = (status: string) => {
    const statusColors: {[key: string]: string} = {
      'borrador': 'bg-gray-100 text-gray-800',
      'pendiente_revision': 'bg-yellow-100 text-yellow-800',
      'aprobado': 'bg-green-100 text-green-800',
      'en_ejecucion': 'bg-purple-100 text-purple-800',
      'suspendido': 'bg-orange-100 text-orange-800',
      'cerrado': 'bg-blue-100 text-blue-800',
      'rechazado': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
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
      'Pending': 'Pendiente de Revisión',
    };
    return statusText[status] || status;
  };


// Mock data
const permits = [
    { id: 1, number: 'PT-0001', workType: 'Trabajo en Altura', date: '2025-10-08', status: 'aprobado' },
    { id: 2, number: 'PT-0002', workType: 'Espacios Confinados', date: '2025-10-09', status: 'en_ejecucion' },
    { id: 3, number: 'PT-0003', workType: 'Trabajo en Caliente', date: '2025-10-10', status: 'pendiente_revision' },
];


export default function Dashboard() {
  const { user } = useUser();
  
  const myPermits = permits; // This will be replaced by user-specific permits
  const pendingApprovals = permits.filter(p => p.status === 'pendiente_revision');
  
  const stats = [
      {
        title: 'Mis Permisos',
        value: myPermits.length,
        icon: FileText,
        color: 'hsl(var(--primary))',
        bgColor: 'hsl(var(--primary) / 0.1)'
      },
      {
        title: 'Pendientes',
        value: pendingApprovals.length,
        icon: Clock,
        color: 'hsl(var(--secondary))',
        bgColor: 'hsl(var(--secondary) / 0.1)'
      },
      {
        title: 'Aprobados',
        value: permits.filter(p => p.status === 'aprobado').length,
        icon: CheckCircle,
        color: 'hsl(var(--accent))',
        bgColor: 'hsl(var(--accent) / 0.1)'
      },
      {
        title: 'En Ejecución',
        value: permits.filter(p => p.status === 'en_ejecucion').length,
        icon: Activity,
        color: 'hsl(var(--info))',
        bgColor: 'hsl(var(--info) / 0.1)'
      }
    ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de permisos de trabajo y acciones rápidas.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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

       { (user?.role === 'lider_tarea' || user?.role === 'solicitante') && (
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
                        <FileText className="mr-2"/>
                        Nuevo Permiso de Trabajo
                    </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4" size="lg">
                    <Upload className="mr-2"/>
                    Cargar ATS
                </Button>
                <Button variant="outline" className="h-auto py-4" size="lg">
                    <Download className="mr-2"/>
                    Exportar Reportes
                </Button>
              </CardContent>
            </Card>
          )}


      <Card>
        <CardHeader>
          <CardTitle>Permisos de Trabajo Recientes</CardTitle>
        </CardHeader>
        <CardContent>
           {permits.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-semibold">No hay permisos de trabajo registrados</p>
                  <p className="text-sm mt-2 mb-4">Crea tu primer permiso para comenzar</p>
                  {(user?.role === 'lider_tarea' || user?.role === 'solicitante') && (
                    <Button asChild>
                       <Link href="/permits/create">
                        <FileText className="mr-2"/>
                        Crear Primer Permiso
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Tipo de Trabajo</TableHead>
                        <TableHead>Fecha Creación</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {permits.map((permit) => (
                        <TableRow key={permit.id}>
                        <TableCell className="font-medium">{permit.number}</TableCell>
                        <TableCell>{permit.workType}</TableCell>
                        <TableCell>{permit.date}</TableCell>
                        <TableCell>
                            <Badge className={getStatusColor(permit.status)}>
                                {getStatusText(permit.status)}
                            </Badge>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
             )}
        </CardContent>
      </Card>
    </div>
  );
}
