import { CouponStatus, CouponType } from '@prisma/client';
import { z } from 'zod';

export const purchaseCardSchema = z.object({
  cardId: z.string().min(1),
  percent: z.number().min(1).max(100)
});
export const purchaseCouponSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  type: z.nativeEnum(CouponType),
  expiresAt: z.string(),
  status: z.nativeEnum(CouponStatus),
  value: z.number().min(1),
  createdAt: z.string(),
  updatedAt: z.string()
});
export const purchaseFormSchema = z.object({
  addressId: z.string().min(1),
  cards: z.array(purchaseCardSchema),
  coupons: z.array(purchaseCouponSchema)
});
export const purchaseSchema = z.object({
  addressId: z.string().min(1),
  cards: z.array(purchaseCardSchema),
  coupons: z.array(z.string())
});

export type PurchaseSchema = z.infer<typeof purchaseSchema> & {
  shipping: number;
};
export type PurchaseFormSchema = z.infer<typeof purchaseFormSchema>;
export type PurchaseCardSchema = z.infer<typeof purchaseCardSchema>;
export type PurchaseCouponSchema = z.infer<typeof purchaseCouponSchema>;
