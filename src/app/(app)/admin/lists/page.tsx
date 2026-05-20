'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, List, Plus, Trash2, Upload, Download,
  Search, Edit2, Check, X, Building2, Factory, Cog, FileText, Users,
  ChevronRight, Settings2, MapPin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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

type ListName = 'areas' | 'plantas' | 'procesos' | 'contratos' | 'empresas' | 'ciudades';

// Configuración de submódulos
const listConfigs: Record<ListName, { title: string; description: string; icon: React.ElementType }> = {
  areas: {
    title: 'Áreas / Equipos',
    description: 'Gestione las áreas y equipos específicos disponibles en el sistema',
    icon: Cog,
  },
  plantas: {
    title: 'Plantas',
    description: 'Administre las ubicaciones de planta registradas',
    icon: Factory,
  },
  procesos: {
    title: 'Procesos',
    description: 'Configure los tipos de proceso disponibles',
    icon: List,
  },
  contratos: {
    title: 'Contratos',
    description: 'Gestione los contratos disponibles en el sistema',
    icon: FileText,
  },
  empresas: {
    title: 'Empresas',
    description: 'Administre las empresas contratistas registradas',
    icon: Building2,
  },
  ciudades: {
    title: 'Ciudades',
    description: 'Administre las ciudades disponibles para asignación de usuarios',
    icon: MapPin,
  },
};

// Componente para la gestión de una lista individual
const ListManager = ({ listName }: { listName: ListName }) => {
  const { toast } = useToast();
  const config = listConfigs[listName];
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
        description: `No se pudo cargar la lista de ${config.title}.`,
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [listName, config.title, toast]);

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
        description: `"${newItem}" añadido a ${config.title}.`
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
        description: `${result.added} elementos agregados${(result.skipped ?? 0) > 0 ? `, ${result.skipped} duplicados omitidos` : ''}.`
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
        description: `"${item}" eliminado de ${config.title}.`
      });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-sm text-gray-500">Cargando elementos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header del submódulo - Más compacto en móvil */}
      <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 bg-blue-600 rounded-lg md:rounded-xl shadow-lg shadow-blue-600/20">
            <config.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-xl font-bold text-gray-900">{config.title}</h2>
            <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{config.description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-sm md:text-lg px-3 md:px-4 py-1 md:py-1.5">
          {items.length}
        </Badge>
      </div>

      {/* Barra de acciones - Optimizada para móvil */}
      <div className="flex flex-col gap-3">
        {/* Agregar nuevo - Full width en móvil */}
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Nuevo elemento..."
            disabled={isSubmitting}
            onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && handleAddItem()}
            className="flex-1 h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-base"
          />
          <Button
            onClick={handleAddItem}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 shadow-md h-11 px-4"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Agregar</span>
              </>
            )}
          </Button>
        </div>

        {/* Acciones masivas - Grid en móvil */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => setBulkDialogOpen(true)}
            variant="outline"
            className="h-10 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
            disabled={isSubmitting}
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="h-10 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
            disabled={items.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar elementos..."
          className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tabla de elementos */}
      <Card className="border border-gray-200 shadow-sm">
        <div className="max-h-[450px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0 z-10">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-600 py-4">
                  Nombre del Elemento
                </TableHead>
                <TableHead className="text-right w-32 font-semibold text-xs uppercase tracking-wider text-gray-600 py-4">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                <TableRow
                  key={item}
                  className={`group hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <TableCell className="py-3.5">
                    {editingItem === item ? (
                      <div className="flex gap-2 max-w-md">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                          disabled={isSubmitting}
                          className="h-9 bg-white border-blue-400"
                        />
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700 h-9 px-3"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={isSubmitting}
                          className="h-9 px-3"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium text-gray-800">{item}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-3.5">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item)}
                        disabled={editingItem !== null}
                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-600">¿Eliminar este elemento?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              Está a punto de eliminar <span className="font-semibold text-gray-800">"{item}"</span>.
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-gray-300">Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveItem(item)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
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
                  <TableCell colSpan={2} className="h-40 text-center">
                    <div className="flex flex-col items-center text-gray-400">
                      <List className="h-12 w-12 mb-4 opacity-30" />
                      <p className="font-medium text-gray-500">
                        {searchTerm ? 'Sin resultados' : 'Lista vacía'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchTerm ? 'Intente con otro término de búsqueda' : 'Agregue elementos usando el campo de arriba'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer con info */}
        {filteredItems.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
            Mostrando {filteredItems.length} de {items.length} elementos
          </div>
        )}
      </Card>

      {/* Dialog de importación masiva */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Importar Elementos</DialogTitle>
                <DialogDescription className="mt-1">
                  Importación masiva a <span className="font-semibold">{config.title}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
            <p className="font-medium text-blue-800 mb-2">Instrucciones:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Ingrese un elemento por línea</li>
              <li>Los duplicados serán omitidos automáticamente</li>
              <li>Los espacios al inicio y final serán eliminados</li>
            </ul>
          </div>

          <Textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={"Elemento 1\nElemento 2\nElemento 3\n..."}
            rows={10}
            className="font-mono text-sm bg-white border-gray-300"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <span className="font-semibold text-blue-600">{bulkText.split('\n').filter(l => l.trim()).length}</span> elementos para importar
            </span>
            {bulkText.trim() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBulkText('')}
                className="text-gray-500 hover:text-gray-700"
              >
                Limpiar
              </Button>
            )}
          </div>

          <DialogFooter className="gap-2">
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function ListsPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [activeList, setActiveList] = useState<ListName>('areas');
  const [listCounts, setListCounts] = useState<Record<ListName, number>>({
    areas: 0,
    plantas: 0,
    procesos: 0,
    contratos: 0,
    empresas: 0,
    ciudades: 0,
  });

  // Cargar conteos de todas las listas
  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    (Object.keys(listConfigs) as ListName[]).forEach((listName) => {
      const docRef = doc(db, 'dynamic_lists', listName);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setListCounts(prev => ({
            ...prev,
            [listName]: docSnap.data().items?.length || 0
          }));
        }
      });
      unsubscribers.push(unsubscribe);
    });

    return () => unsubscribers.forEach(unsub => unsub());
  }, []);

  const canAccessListsPage = adminUser?.role === 'admin' ||
    (adminUser?.role === 'lider_regional' && adminUser.allowedModules?.includes('lists'));

  useEffect(() => {
    if (!adminLoading && !canAccessListsPage) {
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'No tiene permisos para acceder a esta página.',
      });
      router.replace('/dashboard');
    }
  }, [adminUser, adminLoading, canAccessListsPage, router, toast]);

  if (adminLoading || !canAccessListsPage) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gray-50">
      {/* Header Principal - Compacto en móvil */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-8 md:py-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 md:p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <Settings2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">
              Gestión de Listas
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
              Administre los catálogos del sistema
            </p>
          </div>
        </div>
      </div>

      {/* Selector de submódulo - Dropdown en móvil */}
      <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
          Seleccionar Lista
        </label>
        <div className="relative">
          <select
            value={activeList}
            onChange={(e) => setActiveList(e.target.value as ListName)}
            className="w-full h-12 pl-4 pr-10 bg-white border border-gray-300 rounded-xl text-base font-medium text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {(Object.keys(listConfigs) as ListName[]).map((listName) => {
              const config = listConfigs[listName];
              return (
                <option key={listName} value={listName}>
                  {config.title} ({listCounts[listName]})
                </option>
              );
            })}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar de Navegación - Solo visible en desktop */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 p-6">
          <div className="sticky top-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Submódulos
            </h2>
            <nav className="space-y-1">
              {(Object.keys(listConfigs) as ListName[]).map((listName) => {
                const config = listConfigs[listName];
                const isActive = activeList === listName;

                return (
                  <button
                    key={listName}
                    onClick={() => setActiveList(listName)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <config.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                      <span className="font-medium">{config.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-bold ${isActive
                          ? 'bg-white/20 text-white border-0'
                          : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {listCounts[listName]}
                      </Badge>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'text-white' : 'text-gray-300'} ${isActive ? 'translate-x-0' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Info Card - Solo desktop */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">💡 Tip:</span> Los cambios se reflejan instantáneamente en los formularios de permisos y en la gestión de usuarios.
              </p>
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-6 lg:p-10">
          <ListManager key={activeList} listName={activeList} />
        </main>
      </div>
    </div>
  );
}
