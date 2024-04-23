import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { ICoupon } from '@/types/coupon';
import { CouponFormSchema } from '@/validations/couponForm.schema';

export const couponData = {
  async getByCode(code: string) {
    const { data } = await api.get<ICoupon>(`/api/coupon/code/${code}`);
    return data;
  },
  async list({ page, limit }: PageRequest) {
    const { data } = await api.get<PageResponse<ICoupon>>('/api/coupon', {
      params: {
        page,
        limit
      }
    });
    return data;
  },
  async create(coupon: CouponFormSchema) {
    const { data } = await api.post('/api/coupon', coupon);
    return data;
  }
};
