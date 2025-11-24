
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
import { PlusCircle, Search, Loader2, FileX, ChevronRight, Filter, Edit } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { collection, onSnapshot, query, orderBy, where, QueryConstraint, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, PermitStatus } from '@/types';
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

// Función actualizada para obtener tipos de trabajo
const getWorkTypesString = (permit: Permit): string => {
  const workTypes: string[] = [];
  
  // Primero verificar los campos booleanos nuevos
  if (permit.trabajoAlturas) workTypes.push('Trabajo en Alturas');
  if (permit.espaciosConfinados) workTypes.push('Espacios Confinados');
  if (permit.controlEnergia) workTypes.push('Control de Energías');
  if (permit.izajeCargas) workTypes.push('Izaje de Cargas');
  if (permit.excavaciones) workTypes.push('Excavaciones');
  if (permit.trabajoGeneral) workTypes.push('Trabajo General');
  
  // Fallback al campo workType array (compatibilidad)
  if (workTypes.length === 0 && permit.workType && Array.isArray(permit.workType)) {
    const workTypesMap: {[key: string]: string} = {
      'altura': 'Trabajo en Alturas',
      'confinado': 'Espacios Confinados',
      'energia': 'Control de Energías',
      'izaje': 'Izaje de Cargas',
      'excavacion': 'Excavaciones',
      'general': 'Trabajo General'
    };
    return permit.workType.map(key => workTypesMap[key] || key).join(', ');
  }
  
  return workTypes.length > 0 ? workTypes.join(', ') : 'Trabajo General';
};

// Función para obtener badges de tipos de trabajo
const getWorkTypeBadges = (permit: Permit): JSX.Element[] => {
  const badges: JSX.Element[] = [];
  
  if (permit.trabajoAlturas) {
    badges.push(
      <Badge key="alturas" className="bg-blue-100 text-blue-800 text-xs">
        Alturas
      </Badge>
    );
  }
  if (permit.espaciosConfinados) {
    badges.push(
      <Badge key="confinados" className="bg-purple-100 text-purple-800 text-xs">
        Confinados
      </Badge>
    );
  }
  if (permit.controlEnergia) {
    badges.push(
      <Badge key="energia" className="bg-yellow-100 text-yellow-800 text-xs">
        Energías
      </Badge>
    );
  }
  if (permit.izajeCargas) {
    badges.push(
      <Badge key="izaje" className="bg-green-100 text-green-800 text-xs">
        Izaje
      </Badge>
    );
  }
  if (permit.excavaciones) {
    badges.push(
      <Badge key="excavaciones" className="bg-orange-100 text-orange-800 text-xs">
        Excavaciones
      </Badge>
    );
  }
  if (permit.trabajoGeneral) {
    badges.push(
      <Badge key="general" className="bg-gray-100 text-gray-800 text-xs">
        General
      </Badge>
    );
  }
  
  return badges;
};

type UnifiedPermitStatus = 'borrador' | 'pendiente_revision' | 'activos' | 'cerrado' | 'rechazado' | 'suspendido';
const permitStatuses: { key: UnifiedPermitStatus; label: string }[] = [
    { key: 'borrador', label: 'Borrador' },
    { key: 'pendiente_revision', label: 'Pendiente' },
    { key: 'activos', label: 'Activos' },
    { key: 'cerrado', label: 'Cerrado' },
    { key: 'rechazado', label: 'Rechazado' },
    { key: 'suspendido', label: 'Suspendido' },
];


export default function PermitsPage() {
  const { user, loading: userLoading } = useUser();
  const [allPermits, setAllPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<UnifiedPermitStatus>('pendiente_revision');
  const [workTypeFilter, setWorkTypeFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    if (userLoading) {
      setLoading(true);
      return;
    }
    if (!user) {
      setAllPermits([]);
      setLoading(false);
      return;
    }

    const permitsCollection = collection(db, 'permits');
    let finalQuery;
    
    // Lógica de consulta específica por rol
    if (user.role === 'solicitante' || user.role === 'lider_tarea') {
      finalQuery = query(permitsCollection, where('createdBy', '==', user.uid));
    } else if (user.role === 'lider_sst') {
      // Para SST, hacemos dos consultas y las unimos en el cliente.
      const query1 = query(permitsCollection, where('trabajoAlturas', '==', true));
      const query2 = query(permitsCollection, where('isSSTSignatureRequired', '==', true));
      
      Promise.all([getDocs(query1), getDocs(query2)]).then(([snapshot1, snapshot2]) => {
          const permitsMap = new Map<string, Permit>();
          
          snapshot1.docs.forEach(doc => {
              const data = doc.data();
              permitsMap.set(doc.id, { id: doc.id, ...data, createdAt: parseFirestoreDate(data.createdAt) } as Permit);
          });

          snapshot2.docs.forEach(doc => {
             if (!permitsMap.has(doc.id)) {
                 const data = doc.data();
                 permitsMap.set(doc.id, { id: doc.id, ...data, createdAt: parseFirestoreDate(data.createdAt) } as Permit);
             }
          });

          const combinedPermits = Array.from(permitsMap.values());
          combinedPermits.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
          
          setAllPermits(combinedPermits);
          setLoading(false);
      }).catch(error => {
          console.error("Error fetching permits for SST:", error);
          toast({ variant: 'destructive', title: 'Error al cargar permisos', description: 'No se pudieron obtener los datos para su rol.' });
          setLoading(false);
      });
      
      return; // Salimos para no ejecutar onSnapshot
      
    } else { // Para admin y autorizante
      finalQuery = query(permitsCollection, orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(finalQuery, (snapshot) => {
      const permitsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: parseFirestoreDate(data.createdAt),
        } as Permit;
      });
      // Si es solicitante, es posible que el orden no sea por fecha si hay error de índice.
      if (user.role === 'solicitante' || user.role === 'lider_tarea') {
        permitsData.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      }
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

    return () => {
        if(unsubscribe) unsubscribe();
    };
  }, [user, userLoading, toast]);

  const filteredPermits = useMemo(() => {
    return allPermits.filter(permit => {
      // Filtro por estado
      let matchesStatus = false;
      if (activeTab === 'activos') {
        matchesStatus = permit.status === 'aprobado' || permit.status === 'en_ejecucion';
      } else {
        matchesStatus = permit.status === activeTab;
      }
      if (!matchesStatus) return false;

      // Filtro por tipo de trabajo
      if (workTypeFilter !== 'all') {
        let matchesWorkType = false;
        switch (workTypeFilter) {
          case 'alturas':
            matchesWorkType = permit.trabajoAlturas === true;
            break;
          case 'confinados':
            matchesWorkType = permit.espaciosConfinados === true;
            break;
          case 'energia':
            matchesWorkType = permit.controlEnergia === true;
            break;
          case 'izaje':
            matchesWorkType = permit.izajeCargas === true;
            break;
          case 'excavaciones':
            matchesWorkType = permit.excavaciones === true;
            break;
          case 'general':
            matchesWorkType = permit.trabajoGeneral === true;
            break;
        }
        if (!matchesWorkType) return false;
      }

      // Filtro por búsqueda de texto
      const searchLower = searchTerm.toLowerCase();
      if (!searchLower) return true; // No search term, so it's a match
      
      return (
        (permit.number || permit.id).toLowerCase().includes(searchLower) ||
        getWorkTypesString(permit).toLowerCase().includes(searchLower) ||
        (permit.user?.displayName || '').toLowerCase().includes(searchLower) ||
        (permit.generalInfo?.areaEspecifica || '').toLowerCase().includes(searchLower) ||
        (permit.generalInfo?.planta || '').toLowerCase().includes(searchLower)
      );
    });
  }, [allPermits, activeTab, searchTerm, workTypeFilter]);

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
            {searchTerm ? `No hay resultados para "${searchTerm}" en esta categoría.` : `No hay permisos con el estado seleccionado.`}
          </p>
        </div>
      );
    }

    const getPermitDisplayNumber = (permit: Permit) => {
        if (permit.status === 'borrador') {
            return `Borrador #${permit.id.substring(0, 8)}`;
        }
        return permit.number || `ID: ${permit.id.substring(0, 8)}`;
    };

    return (
      <>
        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {permits.map((permit) => (
            <Link key={permit.id} href={permit.status === 'borrador' ? `/permits/create?edit=${permit.id}` : `/permits/${permit.id}`} className="block">
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
                    <span>{permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy", { locale: es }) : 'N/A'}</span>
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
                <TableHead>Área / Planta</TableHead>
                <TableHead>Tipo de Trabajo</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permits.map((permit) => (
                <TableRow key={permit.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link href={permit.status === 'borrador' ? `/permits/${permit.id}` : `/permits/${permit.id}`} className="hover:underline text-primary">
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
                    {permit.createdAt ? format(permit.createdAt, "dd/MM/yyyy HH:mm", { locale: es }) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    {permit.status === 'borrador' ? (
                       <>
                        <Button asChild variant="ghost" size="sm">
                            <Link href={`/permits/${permit.id}`}>
                                Ver Detalles
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/permits/create?edit=${permit.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Continuar
                            </Link>
                        </Button>
                       </>
                    ) : (
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/permits/${permit.id}`}>
                            Ver Detalles
                          </Link>
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
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UnifiedPermitStatus)}>
            <div className="flex flex-col gap-4">
              {/* Tabs de estado */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList className="grid grid-cols-3 sm:flex w-full sm:w-auto overflow-x-auto">
                  {permitStatuses.map(status => (
                    <TabsTrigger key={status.key} value={status.key} className="capitalize whitespace-nowrap">
                      {status.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Filtros de búsqueda */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por número, área, planta, solicitante..."
                    className="w-full rounded-lg bg-background pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="alturas">Trabajo en Alturas</SelectItem>
                    <SelectItem value="confinados">Espacios Confinados</SelectItem>
                    <SelectItem value="energia">Control de Energías</SelectItem>
                    <SelectItem value="izaje">Izaje de Cargas</SelectItem>
                    <SelectItem value="excavaciones">Excavaciones</SelectItem>
                    <SelectItem value="general">Trabajo General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contador de resultados */}
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredPermits.length} de {allPermits.filter(p => activeTab === 'activos' ? (p.status === 'aprobado' || p.status === 'en_ejecucion') : p.status === activeTab).length} permisos
              </div>
            </div>

            {permitStatuses.map(status => (
              <TabsContent key={status.key} value={status.key} className="mt-4">
                {renderPermitList(filteredPermits)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
