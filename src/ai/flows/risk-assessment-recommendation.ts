'use server';

/**
 * @fileOverview A risk assessment AI agent that recommends risk controls.
 *
 * - getRiskAssessmentRecommendations - A function that handles the risk assessment process.
 * - RiskAssessmentInput - The input type for the getRiskAssessmentRecommendations function.
 * - RiskAssessmentOutput - The return type for the getRiskAssessmentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentInputSchema = z.object({
  workType: z.string().describe('The type of work being performed.'),
  environmentalFactors: z.string().describe('Environmental factors present at the work site.'),
  permitDetails: z.string().describe('Detailed information about the work permit request.'),
});
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  recommendedControls: z.string().describe('The recommended risk controls for the work permit request.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function getRiskAssessmentRecommendations(input: RiskAssessmentInput): Promise<RiskAssessmentOutput> {
  return riskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
  output: {schema: RiskAssessmentOutputSchema},
  prompt: `You are a safety officer who is responsible for assessing risk and recommending controls for work permits.

  Based on the details of the work permit request, the type of work being performed, and the environmental factors present, you will recommend the appropriate risk controls.

  Work Type: {{{workType}}}
  Environmental Factors: {{{environmentalFactors}}}
  Permit Details: {{{permitDetails}}}

  Recommended Risk Controls:`,
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
