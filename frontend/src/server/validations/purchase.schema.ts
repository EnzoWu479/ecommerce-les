import { CouponType } from '@prisma/client';
import { z } from 'zod';

export const purchaseCardSchema = z.object({
  cardId: z.string().min(1),
  percent: z.number().min(1).max(100)
});
export const purchaseCouponSchema = z.object({
  couponId: z.string().min(1),
  type: z.enum([CouponType.PROMOTIONAL, CouponType.TRADE])
});
export const purchaseSchema = z.object({
  addressId: z.string().min(1),
  cards: z.array(purchaseCardSchema),
  coupons: z.array(purchaseCouponSchema)
});

export type PurchaseSchema = z.infer<typeof purchaseSchema>;
export type PurchaseCardSchema = z.infer<typeof purchaseCardSchema>;
export type PurchaseCouponSchema = z.infer<typeof purchaseCouponSchema>;
