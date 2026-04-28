'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useAuth } from '@/hooks/use-auth';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email({ message: 'Dirección de correo inválida.' }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

export default function LoginPage() {
  const { login } = useAuth();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirige cuando el auth state se propaga completamente
  useEffect(() => {
    if (!userLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, userLoading, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      toast({
        title: 'Inicio de sesión exitoso',
        description: '¡Bienvenido!',
        className: 'bg-accent text-accent-foreground',
      });
      // No se llama router.push aquí; el useEffect de arriba maneja
      // la redirección una vez que el estado de auth se propaga.
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description:
          error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
      });
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-2 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, #e6f0ff 0%, #cce1ff 100%)',
      }}
    >
      <Card className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-2xl border-0">
        <CardHeader className="items-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Logo Principal Italcol — servido localmente */}
          <div className="flex justify-center">
            <Image
              src="/logo-italcol-full.png"
              alt="Italcol Logo"
              width={180}
              height={90}
              priority
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
            />
          </div>

          {/* Título del Sistema */}
          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SGTC</h1>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
              Sistema de Gestión<br />
              Tareas de Alto Riesgo
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-2 space-y-4 sm:space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="usuario@italcol.com"
                        {...field}
                        type="email"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm sm:text-base"
                      />
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="font-medium text-gray-700">
                        Contraseña
                      </FormLabel>
                      <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors hover:underline whitespace-nowrap">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Iniciar Sesión
              </Button>

              {/* Logo secundario — servido localmente */}
              <div className="flex justify-center pt-2">
                <Image
                  src="/logo-marca-compartida.png"
                  alt="Logo Secundario"
                  width={120}
                  height={40}
                  className="h-8 sm:h-10 w-auto object-contain opacity-80"
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-gray-50 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 rounded-b-lg">
          <p className="w-full">
            © 2025 Axa Colpatria & Nixus Capital - Todos los derechos reservados
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
