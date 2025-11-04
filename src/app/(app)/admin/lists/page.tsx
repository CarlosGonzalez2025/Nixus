'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, List, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addListItem, removeListItem } from './actions';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ListsPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [areas, setAreas] = useState<string[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!adminLoading && adminUser?.role !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'No tiene permisos para acceder a esta página.',
      });
      router.replace('/dashboard');
      return;
    }

    if(adminUser?.role === 'admin') {
      const docRef = doc(db, 'dynamic_lists', 'areas');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setAreas(docSnap.data().items || []);
        } else {
          setAreas([]);
        }
        setLoadingLists(false);
      }, (error) => {
        console.error("Error fetching list:", error);
        toast({
          variant: 'destructive',
          title: 'Error de Carga',
          description: 'No se pudo cargar la lista de áreas.',
        });
        setLoadingLists(false);
      });

      return () => unsubscribe();
    }
  }, [adminUser, adminLoading, router, toast]);

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast({ variant: 'destructive', title: 'El campo no puede estar vacío.' });
      return;
    }
    setIsSubmitting(true);
    const result = await addListItem('areas', newItem);
    if (result.success) {
      toast({ title: 'Elemento Agregado', description: `"${newItem}" ha sido añadido a la lista.` });
      setNewItem('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleRemoveItem = async (item: string) => {
    const result = await removeListItem('areas', item);
    if (result.success) {
      toast({ title: 'Elemento Eliminado', description: `"${item}" ha sido eliminado de la lista.` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  if (adminLoading || adminUser?.role !== 'admin') {
    return (
     <div className="flex h-screen items-center justify-center">
       <Loader2 className="h-8 w-8 animate-spin text-primary" />
     </div>
   );
 }

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Listas</h1>
          <p className="text-muted-foreground">
            Administre los elementos de las listas desplegables de la aplicación.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List />
            Lista de Áreas / Equipos
          </CardTitle>
          <CardDescription>
            Estos elementos aparecerán en el campo "Área o equipo específico" al crear un permiso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Nombre de la nueva área o equipo"
              disabled={isSubmitting}
            />
            <Button onClick={handleAddItem} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus />}
            </Button>
          </div>

          {loadingLists ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Área/Equipo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.length > 0 ? areas.map(item => (
                  <TableRow key={item}>
                    <TableCell className="font-medium">{item}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente "{item}" de la lista.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveItem(item)} className="bg-destructive hover:bg-destructive/90">
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      No hay elementos en la lista.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
