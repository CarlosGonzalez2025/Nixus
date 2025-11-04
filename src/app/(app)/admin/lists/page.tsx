
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, List, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addListItem, removeListItem } from './actions';
import { collection, onSnapshot, doc, DocumentData } from 'firebase/firestore';
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
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';

type ListName = 'areas' | 'plantas' | 'procesos' | 'contratos' | 'empresas';
type ListCardProps = {
  listName: ListName;
  title: string;
  description: string;
};

const ListCard = ({ listName, title, description }: ListCardProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'dynamic_lists', listName);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setItems(docSnap.data().items?.sort() || []);
      } else {
        setItems([]);
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching ${listName}:`, error);
      const permissionError = new FirestorePermissionError({ path: docRef.path, operation: 'get' });
      errorEmitter.emit('permission-error', permissionError);
      toast({
        variant: 'destructive',
        title: 'Error de Carga',
        description: `No se pudo cargar la lista de ${title}. Permisos insuficientes.`,
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [listName, title, toast]);

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast({ variant: 'destructive', title: 'El campo no puede estar vacío.' });
      return;
    }
    setIsSubmitting(true);
    const result = await addListItem(listName, newItem);
    if (result.success) {
      toast({ title: 'Elemento Agregado', description: `"${newItem}" ha sido añadido a ${title}.` });
      setNewItem('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleRemoveItem = async (item: string) => {
    const result = await removeListItem(listName, item);
    if (result.success) {
      toast({ title: 'Elemento Eliminado', description: `"${item}" ha sido eliminado de ${title}.` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Nuevo elemento para ${title}`}
            disabled={isSubmitting}
          />
          <Button onClick={handleAddItem} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus />}
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Elemento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? items.map(item => (
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
  );
};


export default function ListsPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!adminLoading && adminUser?.role !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'No tiene permisos para acceder a esta página.',
      });
      router.replace('/dashboard');
    }
  }, [adminUser, adminLoading, router, toast]);

  if (adminLoading || !adminUser || adminUser.role !== 'admin') {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ListCard 
          listName="areas"
          title="Áreas / Equipos"
          description='Elementos para el campo "Área o equipo específico" al crear un permiso.'
        />
        <ListCard 
          listName="plantas"
          title="Plantas"
          description='Opciones para el campo "Planta" al crear un permiso.'
        />
         <ListCard 
          listName="procesos"
          title="Procesos"
          description='Opciones para el campo "Proceso" al crear un permiso.'
        />
        <ListCard 
          listName="contratos"
          title="Contratos"
          description='Opciones para el campo "Contrato" al crear un permiso.'
        />
        <ListCard 
          listName="empresas"
          title="Empresas"
          description='Opciones para el campo "Empresa" al crear un permiso.'
        />
      </div>
    </div>
  );
}
