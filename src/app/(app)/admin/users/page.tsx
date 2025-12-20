'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createUser, updateUser, updateUserStatus } from './actions';
import { Loader2, UserPlus, Users, Edit, Trash2, Search, X, UserCog, Shield, ChevronDown } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import type { User, UserRole } from '@/types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
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

const createFormSchema = z.object({
  fullName: z.string().min(3, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Correo electrónico inválido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin', 'mantenimiento']),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: 'La empresa es requerida.' }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

const updateFormSchema = z.object({
  uid: z.string(),
  displayName: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin', 'mantenimiento']),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: "La empresa es requerida." }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});


const roleNames: { [key in UserRole]: string } = {
  solicitante: 'Solicitante de la Tarea',
  autorizante: 'Quien Autoriza',
  lider_tarea: 'Líder de la Tarea',
  ejecutante: 'Ejecutante del Trabajo',
  lider_sst: 'Líder SST',
  admin: 'Administrador',
  mantenimiento: 'Mantenimiento'
};

const roleColors: { [key in UserRole]: string } = {
  solicitante: 'bg-blue-100 text-blue-700 border-blue-200',
  autorizante: 'bg-purple-100 text-purple-700 border-purple-200',
  lider_tarea: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ejecutante: 'bg-gray-100 text-gray-700 border-gray-200',
  lider_sst: 'bg-orange-100 text-orange-700 border-orange-200',
  admin: 'bg-red-100 text-red-700 border-red-200',
  mantenimiento: 'bg-cyan-100 text-cyan-700 border-cyan-200'
};

export default function UsersPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const createForm = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'ejecutante',
      area: '',
      telefono: '',
      empresa: 'NIXUS',
      ciudad: '',
      planta: ''
    },
  });

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

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

    if (adminUser?.role === 'admin') {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as User));
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoadingUsers(false);
      }, (error) => {
        const permissionError = new FirestorePermissionError({
          path: usersCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);

        toast({
          variant: 'destructive',
          title: 'Error al cargar usuarios',
          description: 'No tiene permisos para ver la lista de usuarios.'
        });
        setLoadingUsers(false);
      });

      return () => unsubscribe();
    }

  }, [adminUser, adminLoading, router, toast]);

  // Filtrado de usuarios
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredUsers(
        users.filter(user =>
          user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.empresa?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  async function onCreateSubmit(values: z.infer<typeof createFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await createUser(values);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: '✅ Usuario Creado',
        description: `El usuario ${values.fullName} ha sido creado exitosamente.`,
      });
      createForm.reset();
      setShowCreateForm(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al crear usuario',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onUpdateSubmit(values: z.infer<typeof updateFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await updateUser(values);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: '✅ Usuario Actualizado',
        description: `El usuario ${values.displayName} ha sido actualizado.`,
      });
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    const originalStatus = users.find(u => u.uid === userId)?.disabled;

    setUsers(users.map(u => u.uid === userId ? { ...u, disabled: !newStatus } : u));

    const result = await updateUserStatus(userId, !newStatus);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: result.error
      });
      setUsers(users.map(u => u.uid === userId ? { ...u, disabled: originalStatus } : u));
    } else {
      toast({
        title: 'Estado Actualizado',
        description: `El usuario ha sido ${!newStatus ? 'desactivado' : 'activado'}.`
      });
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser(user);
    updateForm.reset({
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      role: user.role || 'ejecutante',
      area: user.area || '',
      telefono: user.telefono || '',
      empresa: user.empresa || '',
      ciudad: user.ciudad || '',
      planta: user.planta || '',
    });
    setIsEditModalOpen(true);
  }

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => !u.disabled).length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  if (adminLoading || adminUser?.role !== 'admin') {
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
    <>
      <div className="flex flex-1 flex-col min-h-screen bg-gray-50">
        {/* Header Principal */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-8 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 md:p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                <UserCog className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">
                  Gestión de Usuarios
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
                  Administre los usuarios del sistema
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 shadow-md h-11"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 md:px-8 py-4 md:py-6 grid grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-xs text-gray-500">Activos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
                <p className="text-xs text-gray-500">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de creación colapsable en móvil */}
        {showCreateForm && (
          <div className="px-4 md:px-8 pb-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  Crear Nuevo Usuario
                </CardTitle>
                <CardDescription>
                  Complete el formulario para añadir un nuevo usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Juan Pérez" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="usuario@nixus.com" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="empresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: NIXUS" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormField
                        control={createForm.control}
                        name="ciudad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input placeholder="Bogotá" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="planta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Planta</FormLabel>
                            <FormControl>
                              <Input placeholder="Faca" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área</FormLabel>
                            <FormControl>
                              <Input placeholder="Mantenimiento" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="3001234567" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rol del Usuario</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccione un rol" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(roleNames).map(([role, name]) => (
                                <SelectItem key={role} value={role}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1 h-11"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1 h-11 bg-blue-600 hover:bg-blue-700">
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Creando...' : 'Crear Usuario'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de usuarios */}
        <div className="flex-1 px-4 md:px-8 pb-6">
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    Lista de Usuarios
                  </CardTitle>
                  <CardDescription className="hidden md:block">
                    {filteredUsers.length} usuarios encontrados
                  </CardDescription>
                </div>

                {/* Búsqueda */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar usuario..."
                    className="pl-10 h-10 bg-gray-50 border-gray-200"
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
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loadingUsers ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
                  <p className="text-sm text-gray-500">Cargando usuarios...</p>
                </div>
              ) : (
                <>
                  {/* Vista móvil - Cards */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                      <div key={user.uid} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {user.displayName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.displayName}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Switch
                            checked={!user.disabled}
                            onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${roleColors[user.role || 'ejecutante']}`}>
                              {roleNames[user.role || 'ejecutante'].split(' ')[0]}
                            </Badge>
                            <span className="text-xs text-gray-500">{user.empresa}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(user)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="p-12 text-center">
                        <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No se encontraron usuarios</p>
                      </div>
                    )}
                  </div>

                  {/* Vista desktop - Tabla */}
                  <div className="hidden md:block overflow-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Usuario</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Empresa</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Rol</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Estado</TableHead>
                          <TableHead className="text-right font-semibold text-xs uppercase text-gray-600">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                          <TableRow key={user.uid} className={`group hover:bg-blue-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                  {user.displayName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.displayName}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{user.empresa}</TableCell>
                            <TableCell>
                              <Badge className={`text-xs ${roleColors[user.role || 'ejecutante']}`}>
                                {roleNames[user.role || 'ejecutante']}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.disabled ? 'destructive' : 'default'} className={user.disabled ? '' : 'bg-green-100 text-green-700 border-green-200'}>
                                {user.disabled ? 'Inactivo' : 'Activo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(user)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Editar
                                </Button>
                                <Switch
                                  checked={!user.disabled}
                                  onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center">
                              <div className="flex flex-col items-center text-gray-400">
                                <Users className="h-10 w-10 mb-3 opacity-30" />
                                <p className="font-medium">No se encontraron usuarios</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de edición */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Editar Usuario
            </DialogTitle>
            <DialogDescription>
              Modifique la información del usuario
            </DialogDescription>
          </DialogHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
              <FormField
                control={updateForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="planta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planta</FormLabel>
                      <FormControl>
                        <Input className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área</FormLabel>
                      <FormControl>
                        <Input className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input type="tel" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={updateForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roleNames).map(([role, name]) => (
                          <SelectItem key={role} value={role}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4 gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="h-11">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="h-11 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
