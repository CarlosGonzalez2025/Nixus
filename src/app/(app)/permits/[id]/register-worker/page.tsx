
'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Permit, ExternalWorker } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { registerWorkerForPermit } from '../create/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SignaturePad } from '@/components/ui/signature-pad';
import { Loader2, UserPlus, FileText, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

const epsList = ["SURA", "Sanitas", "Compensar", "Nueva EPS", "Salud Total", "Coomeva", "Famisanar", "Aliansalud", "Mutual SER", "Cajacopi", "Otra"];
const arlList = ["SURA", "Positiva", "Colmena", "AXA Colpatria", "Equidad Seguros", "Bolívar", "Alfa", "Otra"];
const pensionFundsList = ["Colpensiones", "Porvenir", "Protección", "Colfondos", "Skandia", "Otro"];

const workerSchema = z.object({
  nombre: z.string().min(3, 'El nombre es requerido'),
  cedula: z.string().min(5, 'La cédula es requerida'),
  rol: z.string().min(3, 'El rol es requerido'),
  eps: z.string().min(1, 'La EPS es requerida'),
  arl: z.string().min(1, 'La ARL es requerida'),
  pensiones: z.string().min(1, 'El fondo de pensiones es requerido'),
  tsaTec: z.enum(['tsa', 'tec', 'otro', 'na']),
  entrenamiento: z.enum(['tsa', 'tec', 'otro']),
  firmaApertura: z.string().min(1, 'La firma es requerida'),
  foto: z.string().optional(),
});

type WorkerFormData = z.infer<typeof workerSchema>;

export default function RegisterWorkerPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const permitId = params.id as string;

  const [permit, setPermit] = useState<Permit | null>(null);
  const [loadingPermit, setLoadingPermit] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      nombre: '',
      cedula: '',
      rol: '',
      eps: '',
      arl: '',
      pensiones: '',
      tsaTec: 'na',
      entrenamiento: 'otro',
      firmaApertura: '',
    },
  });

  const firmaApertura = watch('firmaApertura');

  useEffect(() => {
    if (permitId) {
      const fetchPermit = async () => {
        try {
          const docRef = doc(db, 'permits', permitId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPermit({ id: docSnap.id, ...docSnap.data() } as Permit);
          } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Permiso no encontrado.' });
          }
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'No se pudo cargar la información del permiso.' });
        } finally {
          setLoadingPermit(false);
        }
      };
      fetchPermit();
    }
  }, [permitId, toast]);

  const onSubmit = async (data: WorkerFormData) => {
    setIsSubmitting(true);
    const workerPayload: ExternalWorker = {
      ...data,
      firmaCierre: '', // Cierre no se firma aquí
    };
    
    try {
      const result = await registerWorkerForPermit(permitId, workerPayload);
      if (result.success) {
        setShowSuccessMessage(true);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error en el Registro',
        description: error.message || 'No se pudo agregar al trabajador.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSignature = (signatureDataUrl: string) => {
    setValue('firmaApertura', signatureDataUrl, { shouldValidate: true });
    setIsSignaturePadOpen(false);
  };

  if (loadingPermit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3">Cargando información del permiso...</p>
      </div>
    );
  }

  if (!permit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-destructive flex items-center justify-center gap-2"><AlertTriangle />Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>El permiso de trabajo no fue encontrado o el link no es válido.</p>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => router.push('/login')} className="w-full">Volver al Inicio</Button>
            </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (showSuccessMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
        <Card className="max-w-md text-center">
            <CardHeader>
                 <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-600"/>
                    </div>
                </div>
                <CardTitle className="text-green-700 pt-4">¡Registro Exitoso!</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Has sido registrado correctamente como trabajador para el permiso <strong>{permit.number}</strong>. Ya puedes cerrar esta ventana.</p>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
         <div className="mb-6 flex justify-center">
             <Logo textOnly />
         </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserPlus /> Registro de Trabajador
            </CardTitle>
            <CardDescription>
              Estás registrándote para el permiso de trabajo N° <strong className="text-primary">{permit.number}</strong>.
            </CardDescription>
            <div className="text-sm text-muted-foreground pt-2 border-t mt-2 flex items-center gap-2">
                <FileText className="h-4 w-4"/>
                <span>{permit.generalInfo?.workDescription}</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="nombre">Nombre y Apellido *</Label>
                        <Controller name="nombre" control={control} render={({ field }) => <Input id="nombre" {...field} />} />
                        {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="cedula">Cédula *</Label>
                        <Controller name="cedula" control={control} render={({ field }) => <Input id="cedula" {...field} />} />
                        {errors.cedula && <p className="text-xs text-red-500 mt-1">{errors.cedula.message}</p>}
                    </div>
                </div>
                 <div>
                    <Label htmlFor="rol">Rol dentro del permiso *</Label>
                    <Controller name="rol" control={control} render={({ field }) => <Input id="rol" {...field} placeholder="Ej: Soldador, Electricista..."/>} />
                    {errors.rol && <p className="text-xs text-red-500 mt-1">{errors.rol.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="eps">EPS *</Label>
                        <Controller name="eps" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                <SelectContent>{epsList.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                            </Select>
                        )} />
                        {errors.eps && <p className="text-xs text-red-500 mt-1">{errors.eps.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="arl">ARL *</Label>
                         <Controller name="arl" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                <SelectContent>{arlList.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                            </Select>
                        )} />
                        {errors.arl && <p className="text-xs text-red-500 mt-1">{errors.arl.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="pensiones">Fondo de Pensiones *</Label>
                         <Controller name="pensiones" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                <SelectContent>{pensionFundsList.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                            </Select>
                        )} />
                        {errors.pensiones && <p className="text-xs text-red-500 mt-1">{errors.pensiones.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="tsa-tec-select">Certificado Aptitud Médica *</Label>
                        <Controller name="tsaTec" control={control} render={({ field }) => (
                             <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tsa">TSA</SelectItem>
                                    <SelectItem value="tec">TEC</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                    <SelectItem value="na">No Aplica</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                        {errors.tsaTec && <p className="text-xs text-red-500 mt-1">{errors.tsaTec.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="entrenamiento-select">Entrenamiento / Capacitación *</Label>
                        <Controller name="entrenamiento" control={control} render={({ field }) => (
                             <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tsa">TSA</SelectItem>
                                    <SelectItem value="tec">TEC</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                        {errors.entrenamiento && <p className="text-xs text-red-500 mt-1">{errors.entrenamiento.message}</p>}
                    </div>
                </div>
                
                 <div className="space-y-2">
                    <Label>Firma de Apertura *</Label>
                     <div className="p-4 border rounded-md text-center bg-gray-50">
                        {firmaApertura ? (
                            <Image src={firmaApertura} alt="Firma" width={200} height={100} className="mx-auto bg-white rounded border"/>
                        ) : (
                            <p className="text-sm text-muted-foreground p-4">La firma aparecerá aquí</p>
                        )}
                        <Button type="button" variant="link" onClick={() => setIsSignaturePadOpen(true)}>
                            {firmaApertura ? 'Firmar de Nuevo' : 'Registrar Firma'}
                        </Button>
                    </div>
                    {errors.firmaApertura && <p className="text-xs text-red-500 mt-1">{errors.firmaApertura.message}</p>}
                </div>


                 <Dialog open={isSignaturePadOpen} onOpenChange={setIsSignaturePadOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Firma</DialogTitle>
                        </DialogHeader>
                        <SignaturePad onSave={handleSaveSignature} />
                    </DialogContent>
                </Dialog>

                <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    Enviar Registro
                </Button>
            </form>
          </CardContent>
           <CardFooter className="bg-secondary/30 py-4 text-center text-xs text-gray-500">
                <p className="w-full">
                    © {new Date().getFullYear()} ITALCOL - Todos los derechos
                    reservados
                </p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
