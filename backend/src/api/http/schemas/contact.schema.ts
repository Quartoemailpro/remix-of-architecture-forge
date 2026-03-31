import { z } from 'zod';

export const contactSchema = z.object({
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
  category: z.enum(['support', 'bug', 'feature', 'other']).default('support'),
});

export type ContactInput = z.infer<typeof contactSchema>;
