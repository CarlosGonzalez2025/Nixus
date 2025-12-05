'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, List, Plus, Trash2, Upload, Download, 
  Search, Edit2, Check, X 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  addListItem, 
  removeListItem, 
  updateListItem, 
  addMultipleListItems 
} from './actions';
import { doc, onSnapshot } from 'firebase/firestore';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Suscripción a cambios en Firestore
  useEffect(() => {
    const docRef = doc(db, 'dynamic_lists', listName);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const sortedItems = docSnap.data().items?.sort() || [];
        setItems(sortedItems);
        setFilteredItems(sortedItems);
      } else {
        setItems([]);
        setFilteredItems([]);
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching ${listName}:`, error);
      const permissionError = new FirestorePermissionError({ 
        path: docRef.path, 
        operation: 'get' 
      });
      errorEmitter.emit('permission-error', permissionError);
      toast({
        variant: 'destructive',
        title: 'Error de Carga',
        description: `No se pudo cargar la lista de ${title}.`,
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [listName, title, toast]);

  // Filtrado en tiempo real
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredItems(
        items.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const handleAddItem = async () => {
    if (!newItem.trim()) {
      toast({ variant: 'destructive', title: 'El campo no puede estar vacío.' });
      return;
    }
    setIsSubmitting(true);
    const result = await addListItem(listName, newItem);
    if (result.success) {
      toast({ 
        title: '✅ Elemento Agregado', 
        description: `"${newItem}" añadido a ${title}.` 
      });
      setNewItem('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleBulkImport = async () => {
    const lines = bulkText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line);

    if (lines.length === 0) {
      toast({ variant: 'destructive', title: 'No hay elementos para importar' });
      return;
    }

    setIsSubmitting(true);
    const result = await addMultipleListItems(listName, lines);
    
    if (result.success) {
      toast({ 
        title: '✅ Importación Exitosa', 
        description: `${result.added} elementos agregados${result.skipped > 0 ? `, ${result.skipped} duplicados omitidos` : ''}.` 
      });
      setBulkText('');
      setBulkDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleExportCSV = () => {
    const csv = items.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${listName}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast({ title: '📥 Exportado', description: `${items.length} elementos descargados` });
  };

  const startEdit = (item: string) => {
    setEditingItem(item);
    setEditValue(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValue('');
  };

  const saveEdit = async () => {
    if (!editingItem || !editValue.trim()) return;
    
    setIsSubmitting(true);
    const result = await updateListItem(listName, editingItem, editValue);
    if (result.success) {
      toast({ 
        title: '✅ Actualizado', 
        description: 'Elemento modificado correctamente' 
      });
      setEditingItem(null);
      setEditValue('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSubmitting(false);
  };

  const handleRemoveItem = async (item: string) => {
    const result = await removeListItem(listName, item);
    if (result.success) {
      toast({ 
        title: '🗑️ Eliminado', 
        description: `"${item}" eliminado de ${title}.` 
      });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Agregar elemento individual */}
        <div className="flex gap-2">
          <Input 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Nuevo elemento`}
            disabled={isSubmitting}
            onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && handleAddItem()}
          />
          <Button onClick={handleAddItem} disabled={isSubmitting} size="icon">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Acciones masivas */}
        <div className="flex gap-2">
          <Button 
            onClick={() => setBulkDialogOpen(true)} 
            variant="outline" 
            className="flex-1"
            disabled={isSubmitting}
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar Múltiples
          </Button>
          <Button 
            onClick={handleExportCSV} 
            variant="outline" 
            className="flex-1" 
            disabled={items.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            className="pl-10"
          />
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Elemento ({filteredItems.length})</TableHead>
                  <TableHead className="text-right w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? filteredItems.map(item => (
                  <TableRow key={item}>
                    <TableCell>
                      {editingItem === item ? (
                        <div className="flex gap-2">
                          <Input 
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit();
                              if (e.key === 'Escape') cancelEdit();
                            }}
                            autoFocus
                            disabled={isSubmitting}
                          />
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={saveEdit}
                            disabled={isSubmitting}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={cancelEdit}
                            disabled={isSubmitting}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-medium">{item}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => startEdit(item)}
                          disabled={editingItem !== null}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar "{item}"?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleRemoveItem(item)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                      {searchTerm ? 'No se encontraron resultados' : 'No hay elementos en la lista'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Dialog de importación masiva */}
        <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Importar Múltiples Elementos</DialogTitle>
              <DialogDescription>
                Pegue un elemento por línea. Los duplicados serán omitidos automáticamente.
              </DialogDescription>
            </DialogHeader>
            <Textarea 
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={"Elemento 1\nElemento 2\nElemento 3..."}
              rows={12}
              className="font-mono text-sm"
            />
            <div className="text-sm text-muted-foreground">
              {bulkText.split('\n').filter(l => l.trim()).length} elementos para importar
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setBulkDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleBulkImport} 
                disabled={isSubmitting || !bulkText.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Importando...
                  </>
                ) : (
                  'Importar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          description='Elementos para el campo "Área o equipo específico"'
        />
        <ListCard 
          listName="plantas"
          title="Plantas"
          description='Opciones para el campo "Planta"'
        />
        <ListCard 
          listName="procesos"
          title="Procesos"
          description='Opciones para el campo "Proceso"'
        />
        <ListCard 
          listName="contratos"
          title="Contratos"
          description='Opciones para el campo "Contrato"'
        />
        <ListCard 
          listName="empresas"
          title="Empresas"
          description='Opciones para el campo "Empresa"'
        />
      </div>
    </div>
  );
}
