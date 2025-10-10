'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Loader2, Wand2, ShieldCheck } from 'lucide-react';
import { getRiskAssessmentRecommendations } from '@/ai/flows/risk-assessment-recommendation';
import { useToast } from '@/hooks/use-toast';
import { createPermit } from './actions';
import { useUser } from '@/hooks/use-user';

const formSchema = z.object({
  workType: z.string().min(5, 'Por favor, provea un tipo de trabajo descriptivo.'),
  environmentalFactors: z.string().min(10, 'Describa los factores ambientales.'),
  permitDetails: z.string().min(20, 'Por favor, provea información detallada del permiso.'),
});

export default function CreatePermitPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [isAssessing, setIsAssessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workType: '',
      environmentalFactors: '',
      permitDetails: '',
    },
  });

  const handleAssessRisk = async () => {
    const isFormValid = await form.trigger();
    if (!isFormValid) {
      toast({
        variant: 'destructive',
        title: 'Formulario Incompleto',
        description: 'Por favor, llene todos los campos antes de evaluar el riesgo.',
      });
      return;
    }

    setIsAssessing(true);
    setRecommendations('');
    try {
      const values = form.getValues();
      const result = await getRiskAssessmentRecommendations(values);
      setRecommendations(result.recommendedControls);
      toast({
        title: 'Evaluación de Riesgo Completa',
        description: 'Los controles recomendados ya están disponibles.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Falló la Evaluación',
        description: 'La evaluación de riesgo por IA no pudo completarse. Por favor, intente de nuevo.',
      });
    } finally {
      setIsAssessing(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!recommendations) {
      toast({
        variant: 'destructive',
        title: 'Se Requiere Evaluación de Riesgo',
        description: 'Por favor, ejecute la evaluación de riesgo antes de crear el permiso.',
      });
      return;
    }
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Error de Autenticación',
            description: 'Debe iniciar sesión para crear un permiso.',
        });
        return;
    }

    setIsSubmitting(true);
    try {
      await createPermit({
        ...values,
        recommendedControls: recommendations,
        userId: user.uid,
      });
      toast({
        title: 'Permiso Creado Exitosamente',
        description: 'Su permiso de trabajo ha sido enviado para aprobación.',
        className: 'bg-green-100 dark:bg-green-900',
      });
      form.reset();
      setRecommendations('');
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Falló el Envío',
        description: 'Hubo un error creando el permiso. Por favor, intente de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Permiso de Trabajo</h1>
          <p className="text-muted-foreground">
            Complete el formulario para solicitar un nuevo permiso.
          </p>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Trabajo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Soldadura, Espacios Confinados" {...field} />
                    </FormControl>
                    <FormDescription>
                      Especifique la naturaleza del trabajo a realizar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="environmentalFactors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Factores Ambientales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Alta temperatura, poca ventilación, materiales inflamables cercanos"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describa las condiciones en el sitio de trabajo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permitDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalles del Permiso</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Ubicación específica, herramientas a utilizar, duración del trabajo"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporcione todos los detalles necesarios para la solicitud del permiso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                 <Button
                    type="button"
                    onClick={handleAssessRisk}
                    disabled={isAssessing}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {isAssessing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Evaluar Riesgo (IA)
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !recommendations} className="w-full sm:w-auto">
                     {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Crear Permiso
                  </Button>
              </div>
            </form>
          </Form>

          {(isAssessing || recommendations) && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="text-primary" />
                    Controles Recomendados por IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAssessing ? (
                     <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span>Analizando riesgos y generando recomendaciones...</span>
                     </div>
                  ) : (
                    <p className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
                      {recommendations}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
