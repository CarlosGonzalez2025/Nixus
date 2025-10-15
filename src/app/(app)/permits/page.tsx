
'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { PlusCircle, Search, Loader2, FileX, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, PermitStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      'rechazado': 'Rechazado'
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

const workTypes: {[key: string]: string} = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
};

const permitStatuses: PermitStatus[] = ['pendiente_revision', 'aprobado', 'en_ejecucion', 'cerrado', 'rechazado'];

export default function PermitsPage() {
  const [allPermits, setAllPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<PermitStatus>('pendiente_revision');
  const { toast } = useToast();

  useEffect(() => {
    const permitsCollection = collection(db, 'permits');
    const q = query(permitsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const permitsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: parseFirestoreDate(data.createdAt),
        } as Permit;
      });
      setAllPermits(permitsData);
      setLoading(false);
    }, (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: permitsCollection.path,
          operation: 'list',
        });
        
        errorEmitter.emit('permission-error', permissionError);

        toast({
            variant: 'destructive',
            title: 'Error al cargar permisos',
            description: 'No se pudieron obtener los datos de los permisos.',
        });
        setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);
  
  const getWorkTypesString = (types: string[]): string => {
    if (!Array.isArray(types) || types.length === 0) return 'General';
    return types.map(key => workTypes[key] || key).join(', ');
  }

  const filteredPermits = useMemo(() => {
    return allPermits.filter(permit => {
      const matchesStatus = permit.status === activeTab;
      if (!matchesStatus) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        (permit.number || permit.id).toLowerCase().includes(searchLower) ||
        getWorkTypesString(permit.workType).toLowerCase().includes(searchLower) ||
        (permit.user?.displayName || '').toLowerCase().includes(searchLower)
      );
    });
  }, [allPermits, activeTab, searchTerm]);

  const renderPermitList = (permits: Permit[]) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-60">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (permits.length === 0) {
      return (
        <div className="h-60 text-center flex flex-col justify-center items-center">
            <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold">No se encontraron permisos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm ? `No hay resultados para "${searchTerm}" en esta categoría.` : `No hay permisos con el estado "${getStatusText(activeTab)}".`}
            </p>
        </div>
      );
    }

    return (
      <>
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
            {permits.map((permit) => (
                <Link key={permit.id} href={`/permits/${permit.id}`} className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold text-primary truncate">{permit.number || permit.id.substring(0,8)}</p>
                                <p className="text-sm text-muted-foreground truncate">{getWorkTypesString(permit.workType)}</p>
                                <p className="text-xs text-muted-foreground mt-1">{permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy") : 'N/A'}</p>
                            </div>
                            <div className="flex flex-col items-end ml-2">
                                <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>

        {/* Desktop View */}
        <div className="rounded-md border hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Tipo de Trabajo</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
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
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                         <Link href={`/permits/${permit.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permisos de Trabajo</h1>
          <p className="text-muted-foreground">
            Gestione todos sus permisos de trabajo aquí.
          </p>
        </div>
        <Button asChild>
          <Link href="/permits/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Permiso
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PermitStatus)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList className="grid grid-cols-3 sm:flex w-full sm:w-auto">
                {permitStatuses.map(status => (
                  <TabsTrigger key={status} value={status} className="capitalize">
                    {getStatusText(status)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar en esta pestaña..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {permitStatuses.map(status => (
              <TabsContent key={status} value={status} className="mt-4">
                {renderPermitList(filteredPermits)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

    