import { BookStatus } from '@prisma/client';
import { z } from 'zod';

export const bookStatusReasonSchema = z.object({
  reason: z.string()
});
export type BookStatusReason = z.infer<typeof bookStatusReasonSchema>;
