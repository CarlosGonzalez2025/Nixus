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
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
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
          'hsl(var(--primary))',
      }}
    >
      <Card className="w-full max-w-md rounded-2xl shadow-2xl">
        <CardHeader className="items-center p-8">
          <Logo />
        </CardHeader>
        <CardContent className="px-8 pb-8 pt-2 space-y-6">
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
                        className="w-full px-4 py-2 bg-muted border-gray-300 rounded-md focus:ring-primary focus:border-primary"
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
                      <Link href="#" className="text-xs text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type="password"
                        className="w-full px-4 py-2 bg-muted border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white py-3 rounded-md font-semibold hover:opacity-90 transition-all shadow-md"
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
        <CardFooter className="bg-muted/50 py-4 px-8 text-center text-xs text-gray-600">
            <p className="w-full">
                © 2025 ITALCOL - Todos los derechos
                reservados
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
