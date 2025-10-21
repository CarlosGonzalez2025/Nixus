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
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Dirección de correo inválida.' }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'usuario@italcol.com',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      toast({
        title: 'Inicio de sesión exitoso',
        description: '¡Bienvenido!',
        className: 'bg-accent text-accent-foreground',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description:
          error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-2 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, #1DB5C1 0%, #17a3ad 100%)',
      }}
    >
      <Card className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-2xl border-0">
        <CardHeader className="items-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Logo NIXUS */}
          <div className="flex justify-center">
            <img 
              src="https://i.postimg.cc/2SnCvqX4/Marca-compartida-color.png" 
              alt="NIXUS Logo" 
              className="h-12 sm:h-16 w-auto"
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
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm sm:text-base"
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
                      <Link href="#" className="text-xs text-cyan-600 hover:text-cyan-800 transition-colors hover:underline whitespace-nowrap">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Iniciar Sesión
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-gray-50 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 rounded-b-lg">
            <p className="w-full">
                © 2025 ITALCOL - Todos los derechos
                reservados
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
