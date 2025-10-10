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

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const demoUsers = [
  { email: 'juan@italcol.com', role: 'Solicitante' },
  { email: 'maria@italcol.com', role: 'Autorizante' },
  { email: 'carlos@italcol.com', role: 'Líder Tarea' },
  { email: 'ana@italcol.com', role: 'Ejecutante' },
];

export default function LoginPage() {
  const { login } = useAuth();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      toast({
        title: 'Login Successful',
        description: 'Welcome!',
        className: 'bg-accent text-accent-foreground',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-primary/80 p-4"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)',
      }}
    >
      <Card className="w-full max-w-md rounded-3xl shadow-2xl">
        <CardHeader className="items-center p-8">
          <Logo />
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  form.handleSubmit(onSubmit)();
                }
              }}
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
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
                    <FormLabel className="font-medium text-gray-700">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Iniciar Sesión
              </Button>
            </form>
          </Form>
          <div className="border-t pt-4">
            <p className="text-xs text-gray-600 text-center mb-2">
              <strong>Usuarios de Demostración:</strong>
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {demoUsers.map((user) => (
                <div className="text-center" key={user.email}>
                  <p className="font-semibold">{user.email}</p>
                  <p className="text-gray-500">{user.role}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-2 font-semibold text-primary">
              Contraseña: demo123
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-secondary/30 py-4 text-center text-xs text-gray-500">
          <p className="w-full">
            © {new Date().getFullYear()} ITALCOL - Todos los derechos
            reservados
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
