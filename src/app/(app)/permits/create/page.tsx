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
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  workType: z.string().min(5, 'Please provide a descriptive work type.'),
  environmentalFactors: z.string().min(10, 'Describe the environmental factors.'),
  permitDetails: z.string().min(20, 'Please provide detailed permit information.'),
});

export default function CreatePermitPage() {
  const { user } = useAuth();
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
        title: 'Incomplete Form',
        description: 'Please fill out all fields before assessing risk.',
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
        title: 'Risk Assessment Complete',
        description: 'Recommended controls are now available.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Assessment Failed',
        description: 'The AI risk assessment could not be completed. Please try again.',
      });
    } finally {
      setIsAssessing(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!recommendations) {
      toast({
        variant: 'destructive',
        title: 'Risk Assessment Required',
        description: 'Please run the risk assessment before creating the permit.',
      });
      return;
    }
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: 'You must be logged in to create a permit.',
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
        title: 'Permit Created Successfully',
        description: 'Your work permit has been submitted for approval.',
        className: 'bg-green-100 dark:bg-green-900',
      });
      form.reset();
      setRecommendations('');
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error creating the permit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Work Permit</h1>
          <p className="text-muted-foreground">
            Complete the form to request a new permit.
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
                    <FormLabel>Type of Work</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Welding, Confined Space Entry" {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the nature of the work to be performed.
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
                    <FormLabel>Environmental Factors</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., High temperature, poor ventilation, flammable materials nearby"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the conditions at the work site.
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
                    <FormLabel>Permit Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Specific location, tools to be used, duration of work"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide all necessary details for the permit request.
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
                    Assess Risk (AI)
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !recommendations} className="w-full sm:w-auto">
                     {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Create Permit
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
                    AI Recommended Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAssessing ? (
                     <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span>Analyzing risks and generating recommendations...</span>
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
