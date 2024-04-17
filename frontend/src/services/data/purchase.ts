import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { PurchaseSchema } from '@/server/validations/purchase.schema';
import { IPurchase } from '@/types/purchase';
import { PurchaseStatus } from '@prisma/client';

export const purchaseData = {
  async purchase(values: PurchaseSchema) {
    const { data } = await api.post('/api/purchase', values);
    return data;
  },
  async list({ page, limit }: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<IPurchase>>('/api/purchase', {
      params: { page, limit }
    });
    return data;
  },
  async listAll({ page, limit }: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<IPurchase>>(
      '/api/purchase/admin',
      {
        params: { page, limit }
      }
    );
    return data;
  },
  async updateStatus(id: string, status: PurchaseStatus) {
    const { data } = await api.patch(`/api/purchase/${id}`, { status });
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<IPurchase>(`/api/purchase/${id}`);
    return data;
  }
};
