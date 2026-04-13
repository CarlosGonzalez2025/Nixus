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
import { Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { sendTestPermitEmail } from './actions';

export default function TestPage() {
  const { user } = useUser();
  const [testData, setTestData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailTarget, setEmailTarget] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  const { toast } = useToast();

  // ── Prueba Firestore ──────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testData.trim()) {
      toast({ variant: 'destructive', title: 'Campo Vacío', description: 'Por favor, ingrese algún dato para probar.' });
      return;
    }
    if (!user) {
      toast({ variant: 'destructive', title: 'No Autenticado', description: 'Debe iniciar sesión para realizar esta prueba.' });
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
      toast({ title: '¡Conexión Exitosa!', description: `Dato guardado en Firestore con el ID: ${docRef.id}`, className: 'bg-green-100 dark:bg-green-900' });
      setTestData('');
    } catch (error: any) {
      console.error('Error writing document: ', error);
      toast({ variant: 'destructive', title: 'Falló la Conexión', description: error.message || 'No se pudo escribir en Firestore.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Prueba de correo ──────────────────────────────────────
  const handleSendTestEmail = async () => {
    const destination = emailTarget.trim() || user?.email || '';
    if (!destination) {
      toast({ variant: 'destructive', title: 'Sin destinatario', description: 'Ingrese un correo o inicie sesión para usar el suyo.' });
      return;
    }

    setIsSendingEmail(true);
    setEmailResult(null);
    try {
      const result = await sendTestPermitEmail(destination);
      if (result.success) {
        setEmailResult({ success: true, message: `Correo enviado correctamente a ${destination}` });
      } else {
        setEmailResult({ success: false, message: result.error || 'Error desconocido al enviar el correo.' });
      }
    } catch (err: any) {
      setEmailResult({ success: false, message: err.message || 'Error inesperado.' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Página de Prueba</h1>
        <p className="text-muted-foreground">Herramientas para verificar la integración de servicios.</p>
      </div>

      {/* ── Prueba Firestore ── */}
      <Card>
        <CardHeader>
          <CardTitle>Probar Escritura en Firestore</CardTitle>
          <CardDescription>
            Ingrese cualquier texto. Al enviar, se intentará crear un nuevo documento en la colección &quot;test&quot; de Firestore.
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
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Enviando...' : 'Enviar a Firestore'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ── Prueba de correo ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Probar Notificación por Correo</CardTitle>
          </div>
          <CardDescription>
            Envía un correo de muestra con la nueva plantilla de Permiso de Trabajo. Si deja el campo vacío, se usará el correo de la sesión activa (<strong>{user?.email || 'no disponible'}</strong>).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={user?.email || 'destinatario@ejemplo.com'}
              value={emailTarget}
              onChange={(e) => setEmailTarget(e.target.value)}
              disabled={isSendingEmail}
              className="flex-1"
            />
            <Button onClick={handleSendTestEmail} disabled={isSendingEmail}>
              {isSendingEmail
                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                : <><Mail className="mr-2 h-4 w-4" /> Enviar prueba</>
              }
            </Button>
          </div>

          {emailResult && (
            <div className={`flex items-start gap-3 p-4 rounded-lg border text-sm ${
              emailResult.success
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {emailResult.success
                ? <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                : <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              }
              <div>
                <p className="font-semibold">{emailResult.success ? '¡Correo enviado!' : 'Error al enviar'}</p>
                <p className="mt-0.5">{emailResult.message}</p>
                {emailResult.success && (
                  <p className="mt-1 text-xs opacity-70">Revise la bandeja de entrada (y la carpeta de spam).</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
