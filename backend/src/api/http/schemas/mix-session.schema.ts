import { z } from 'zod';

export const createMixSessionSchema = z.object({
  outputs: z.array(z.object({
    address: z.string().min(26).max(62),
    percentage: z.number().min(1).max(100),
  })).min(1).max(10),
  totalPercentage: z.number().refine(v => v === 100, { message: 'Percentages must sum to 100' }).optional(),
  delayPreference: z.enum(['none', 'low', 'medium', 'high']).default('medium'),
});

export type CreateMixSessionInput = z.infer<typeof createMixSessionSchema>;
