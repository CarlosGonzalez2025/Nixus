
'use client';

import { useState, useEffect } from 'react';
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
import type { Permit } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/lib/errors';
import { format } from 'date-fns';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    pendiente_revision: 'secondary',
    aprobado: 'default',
    rechazado: 'destructive',
    cerrado: 'outline',
    en_ejecucion: 'default'
};

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

// ✅ Helper function to handle different date formats
const parseFirestoreDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  
  // If it's a Firestore Timestamp
  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate();
  }
  
  // If it's already a Date object
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  // If it's a string (ISO format)
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
}

export default function PermitsPage() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
      setPermits(permitsData);
      setLoading(false);
    }, (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: permitsCollection.path,
          operation: 'list',
        } satisfies SecurityRuleContext);
        
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
    if (!Array.isArray(types)) return 'General';
    return types.map(key => workTypes[key] || key).join(', ');
  }

  const filteredPermits = permits.filter(permit => 
    (permit.number || permit.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getWorkTypesString(permit.workType).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getStatusText(permit.status).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID, número, tipo o estado..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             {loading ? (
                <div className="flex justify-center items-center h-60">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredPermits.length > 0 ? (
                <>
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                    {filteredPermits.map((permit) => (
                        <Link key={permit.id} href={`/permits/${permit.id}`} className="block">
                            <Card className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div className="flex-1">
                                        <p className="font-semibold text-primary truncate">{permit.number || permit.id.substring(0,8)}</p>
                                        <p className="text-sm text-muted-foreground truncate">{getWorkTypesString(permit.workType)}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy") : 'N/A'}</p>
                                    </div>
                                    <div className="flex flex-col items-end ml-2">
                                        <Badge className={`${getStatusColor(permit.status)} mb-2`}>
                                            {getStatusText(permit.status)}
                                        </Badge>
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
                        <TableHead>Estado</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead>
                          <span className="sr-only">Acciones</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPermits.map((permit) => (
                          <TableRow key={permit.id}>
                            <TableCell className="font-medium">
                              <Link href={`/permits/${permit.id}`} className="hover:underline text-primary">
                                {permit.number || permit.id.substring(0, 8)}
                              </Link>
                            </TableCell>
                            <TableCell>{getWorkTypesString(permit.workType)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(permit.status)}>
                                {getStatusText(permit.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy HH:mm") : 'N/A'}
                            </TableCell>
                            <TableCell>
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
            ) : (
                <div className="h-60 text-center flex flex-col justify-center items-center">
                    <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">No se encontraron permisos</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchTerm ? `No hay resultados para "${searchTerm}".` : 'No hay permisos registrados.'}
                    </p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
