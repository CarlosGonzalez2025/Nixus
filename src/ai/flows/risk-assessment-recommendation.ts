'use server';

/**
 * @fileOverview Un agente de IA de evaluación de riesgos que recomienda controles de riesgo.
 *
 * - getRiskAssessmentRecommendations - Una función que gestiona el proceso de evaluación de riesgos.
 * - RiskAssessmentInput - El tipo de entrada para la función getRiskAssessmentRecommendations.
 * - RiskAssessmentOutput - El tipo de retorno para la función getRiskAssessmentRecommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentInputSchema = z.object({
  workType: z.string().describe('El tipo de trabajo que se está realizando.'),
  environmentalFactors: z.string().describe('Factores ambientales presentes en el lugar de trabajo.'),
  permitDetails: z.string().describe('Información detallada sobre la solicitud de permiso de trabajo.'),
});
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  recommendedControls: z.string().describe('Los controles de riesgo recomendados para la solicitud de permiso de trabajo.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function getRiskAssessmentRecommendations(input: RiskAssessmentInput): Promise<RiskAssessmentOutput> {
  return riskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
  output: {schema: RiskAssessmentOutputSchema},
  prompt: `Eres un oficial de seguridad responsable de evaluar riesgos y recomendar controles para permisos de trabajo.

  Basándote en los detalles de la solicitud del permiso de trabajo, el tipo de trabajo que se realiza y los factores ambientales presentes, recomendarás los controles de riesgo apropiados.

  Tipo de Trabajo: {{{workType}}}
  Factores Ambientales: {{{environmentalFactors}}}
  Detalles del Permiso: {{{permitDetails}}}

  Controles de Riesgo Recomendados:`,
});

const riskAssessmentFlow = ai.defineFlow(
  {
    name: 'riskAssessmentFlow',
    inputSchema: RiskAssessmentInputSchema,
    outputSchema: RiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
