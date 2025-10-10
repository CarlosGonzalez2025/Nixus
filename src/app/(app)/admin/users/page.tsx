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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { createUser } from './actions';
import { Loader2, UserPlus, Users } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User, UserRole } from '@/types';
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/lib/errors';

const formSchema = z.object({
  fullName: z.string().min(3, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Correo electrónico inválido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  role: z.enum(['solicitante', 'autorizante', 'lider_tarea', 'ejecutante', 'lider_sst', 'admin']),
});

const roleNames: { [key in UserRole]: string } = {
  solicitante: 'Solicitante de la Tarea',
  autorizante: 'Quien Autoriza',
  lider_tarea: 'Líder de la Tarea',
  ejecutante: 'Ejecutante del Trabajo',
  lider_sst: 'Líder SST',
  admin: 'Administrador',
};

export default function UsersPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'ejecutante',
    },
  });

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

  useEffect(() => {
    const usersCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })) as User[];
      setUsers(usersData);
      setLoadingUsers(false);
    }, (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: usersCollection.path,
          operation: 'list',
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);

        toast({
            variant: 'destructive',
            title: 'Error al cargar usuarios',
            description: 'No se pudieron obtener los datos de los usuarios.',
        });
        setLoadingUsers(false);
    });

    return () => unsubscribe();
  }, [toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
      form.reset();
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
  
  if (adminLoading || adminUser?.role !== 'admin') {
     return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Crear nuevos usuarios y administrar roles en el sistema.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus />
              Crear Nuevo Usuario
            </CardTitle>
            <CardDescription>
              Complete el formulario para añadir un nuevo usuario al sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="usuario@italcol.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                  control={form.control}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users />
              Listado de Usuarios
            </CardTitle>
            <CardDescription>
              Usuarios registrados actualmente en el sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingUsers ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.uid}>
                        <TableCell className="font-medium">{user.displayName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{roleNames[user.role as UserRole] || 'No asignado'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
