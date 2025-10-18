
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
import { Loader2, UserPlus, Users, Edit, Trash2 } from 'lucide-react';
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
  empresa: z.string().min(2, { message: 'La empresa es requerida.'}),
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

export default function UsersPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

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
    
    if(adminUser?.role === 'admin') {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as User));
            setUsers(usersData);
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

  async function onCreateSubmit(values: z.infer<typeof createFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await createUser(values);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: 'Usuario Creado',
        description: `El usuario ${values.fullName} ha sido creado exitosamente.`,
        className: 'bg-green-100 dark:bg-green-900',
      });
      createForm.reset();
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
        title: 'Usuario Actualizado',
        description: `El usuario ${values.displayName} ha sido actualizado.`,
        className: 'bg-green-100 dark:bg-green-900',
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
  
  if (adminLoading || adminUser?.role !== 'admin') {
     return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Crear y administrar usuarios en el sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users/>
                    Lista de Usuarios
                </CardTitle>
                 <CardDescription>
                    Visualice y gestione los usuarios existentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                     <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                     </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="hidden md:table-cell">Empresa</TableHead>
                                <TableHead className="hidden lg:table-cell">Rol</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        <div className="font-medium">{user.displayName}</div>
                                        <div className="text-sm text-muted-foreground md:hidden">{roleNames[user.role || 'ejecutante']}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{user.empresa}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <Badge variant="outline">{roleNames[user.role || 'ejecutante']}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.disabled ? 'destructive' : 'default'}>
                                            {user.disabled ? 'Inactivo' : 'Activo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                       <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEditModal(user)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" disabled>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <Switch
                                            checked={!user.disabled}
                                            onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                                            aria-label="Activar/Desactivar usuario"
                                        />
                                       </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus />
                  Crear Nuevo Usuario
                </CardTitle>
                <CardDescription>
                  Complete el formulario para añadir un nuevo usuario.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Juan Pérez" {...field} />
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
                            <Input type="email" placeholder="usuario@nixus.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
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
                            <Input placeholder="Ej: NIXUS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={createForm.control}
                        name="ciudad"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Bogotá" {...field} />
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
                                <Input placeholder="Ej: Faca" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={createForm.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Área</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Mantenimiento" {...field} />
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
                                <Input type="tel" placeholder="Ej: 3001234567" {...field} />
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
                              <SelectTrigger>
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
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? 'Creando...' : 'Crear Usuario'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>
                    Modifique la información del usuario. Haga clic en guardar cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <Form {...updateForm}>
                <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                     <FormField
                      control={updateForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input type="email" {...field} />
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
                            <Input {...field} />
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
                                <Input placeholder="Ej: Bogotá" {...field} />
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
                                <Input placeholder="Ej: Faca" {...field} />
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
                                <Input placeholder="Ej: Mantenimiento" {...field} />
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
                                <Input type="tel" placeholder="Ej: 3001234567" {...field} />
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
                              <SelectTrigger>
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
                    <DialogFooter className="mt-6 sticky bottom-0 bg-background pt-4">
                      <DialogClose asChild>
                         <Button type="button" variant="secondary">Cancelar</Button>
                      </DialogClose>
                      <Button type="submit" disabled={isSubmitting}>
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
