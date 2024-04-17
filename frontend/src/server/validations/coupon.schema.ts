import { z } from 'zod';
import { CouponStatus, CouponType } from '@prisma/client';
export const couponSchema = z.object({
  code: z.string().min(1).max(255),
  value: z.number().int().min(1).max(100),
  type: z.enum([CouponType.PROMOTIONAL, CouponType.TRADE]),
  status: z.enum([CouponStatus.ACTIVE, CouponStatus.INACTIVE]),
  expiresAt: z
    .date()
    .refine(data => data > new Date(), {
      message: 'Data de expiração deve ser maior que a data atual'
    })
    .nullable()
});
export type CouponSchema = z.infer<typeof couponSchema>;
