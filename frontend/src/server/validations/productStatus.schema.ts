import { BookStatus } from '@prisma/client';
import { z } from 'zod';

export const productStatusSchema = z.object({
  status: z.enum([BookStatus.ACTIVE, BookStatus.INACTIVE]),
  reason: z.string()
});
export type ProductStatusReason = z.infer<typeof productStatusSchema>;
