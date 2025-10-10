'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export default function TestPage() {
  const { user } = useUser();
  const [testData, setTestData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testData.trim()) {
      toast({
        variant: 'destructive',
        title: 'Campo Vacío',
        description: 'Por favor, ingrese algún dato para probar.',
      });
      return;
    }
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'No Autenticado',
        description: 'Debe iniciar sesión para realizar esta prueba.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        message: testData,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userEmail: user.email,
      });

      toast({
        title: '¡Conexión Exitosa!',
        description: `Dato guardado en Firestore con el ID: ${docRef.id}`,
        className: 'bg-green-100 dark:bg-green-900',
      });
      setTestData('');
    } catch (error: any) {
      console.error('Error writing document: ', error);
      toast({
        variant: 'destructive',
        title: 'Falló la Conexión',
        description:
          error.message ||
          'No se pudo escribir en Firestore. Verifique las reglas de seguridad y la configuración.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Página de Prueba</h1>
          <p className="text-muted-foreground">
            Use este formulario para probar la conexión con Firebase Firestore.
          </p>
        </div>
      </div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Probar Escritura en Firestore</CardTitle>
          <CardDescription>
            Ingrese cualquier texto. Al enviar, se intentará crear un nuevo
            documento en la colección &quot;test&quot; de Firestore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Escriba aquí..."
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSubmitting ? 'Enviando...' : 'Enviar a Firestore'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
