'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useUser } from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2, KeyRound, User, ShieldCheck } from 'lucide-react';
import { updateUserProfile } from './actions';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';


const profileFormSchema = z.object({
  displayName: z.string().min(3, { message: 'El nombre es requerido.' }),
  email: z.string().email(),
  telefono: z.string().optional(),
  area: z.string().optional(),
  empresa: z.string().optional(),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Debe ingresar su contraseña actual.'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres.'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Las nuevas contraseñas no coinciden.',
  path: ['confirmPassword'],
});


export default function SettingsPage() {
  const { user, loading } = useUser();
  const { auth: clientAuth } = useAuth(); // Usamos el auth del lado del cliente
  const { toast } = useToast();

  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      area: user?.area || '',
      empresa: user?.empresa || '',
      ciudad: user?.ciudad || '',
      planta: user?.planta || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!user) return;
    setIsProfileSubmitting(true);
    try {
      const result = await updateUserProfile({ uid: user.uid, ...values });
      if (result.error) throw new Error(result.error);
      toast({ title: 'Perfil Actualizado', description: 'Su información ha sido guardada.' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error.message,
      });
    } finally {
      setIsProfileSubmitting(false);
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    if (!clientAuth.currentUser || !clientAuth.currentUser.email) return;

    setIsPasswordSubmitting(true);

    try {
        // 1. Reautenticar al usuario
        const credential = EmailAuthProvider.credential(clientAuth.currentUser.email, values.currentPassword);
        await reauthenticateWithCredential(clientAuth.currentUser, credential);
        
        // 2. Si la reautenticación es exitosa, cambiar la contraseña
        await updatePassword(clientAuth.currentUser, values.newPassword);
        
        toast({ title: 'Contraseña Actualizada', description: 'Su contraseña ha sido cambiada exitosamente.' });
        passwordForm.reset();
    } catch (error: any) {
        let description = 'Ocurrió un error inesperado.';
        if(error.code === 'auth/wrong-password') {
            description = 'La contraseña actual es incorrecta.';
        } else if (error.code === 'auth/weak-password') {
            description = 'La nueva contraseña es demasiado débil.';
        }
        toast({ variant: 'destructive', title: 'Error al cambiar contraseña', description });
    } finally {
        setIsPasswordSubmitting(false);
    }
  }
  
  if (loading) {
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
          <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Gestione la configuración de su cuenta.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Profile Card */}
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User /> Perfil</CardTitle>
              <CardDescription>Actualice su información personal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <FormField control={profileForm.control} name="displayName" render={({ field }) => (
                      <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={profileForm.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input {...field} readOnly disabled /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={profileForm.control} name="telefono" render={({ field }) => (
                        <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="area" render={({ field }) => (
                        <FormItem><FormLabel>Área</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={profileForm.control} name="empresa" render={({ field }) => (
                        <FormItem><FormLabel>Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="ciudad" render={({ field }) => (
                        <FormItem><FormLabel>Ciudad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={profileForm.control} name="planta" render={({ field }) => (
                      <FormItem><FormLabel>Planta</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" disabled={isProfileSubmitting} className="w-full">
                    {isProfileSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Cambios
                  </Button>
                </form>
              </Form>
            </CardContent>
        </Card>
        
        {/* Password Card */}
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><KeyRound /> Cambiar Contraseña</CardTitle>
              <CardDescription>Actualice su contraseña de inicio de sesión.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                            <FormItem><FormLabel>Contraseña Actual</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                            <FormItem><FormLabel>Nueva Contraseña</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                            <FormItem><FormLabel>Confirmar Nueva Contraseña</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" disabled={isPasswordSubmitting} className="w-full">
                            {isPasswordSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Actualizar Contraseña
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
       <Card className="mt-8 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800"><ShieldCheck /> Seguridad de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-yellow-700">
            Para cambiar su contraseña, deberá proporcionar su contraseña actual. Este es un paso de seguridad para proteger su cuenta. Si ha olvidado su contraseña, por favor, cierre la sesión y utilice la opción de "Recuperar Contraseña" en la página de inicio de sesión.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
