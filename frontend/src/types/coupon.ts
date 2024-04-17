import { CouponStatus, CouponType } from '@prisma/client';

export interface ICoupon {
  id: string;
  code: string;
  type: CouponType;
  expiresAt: string;
  status: CouponStatus;
  value: number;
  tradeId: string | null;
  createdAt: string;
  updatedAt: string;
  tradeRequestId: string | null;
}
