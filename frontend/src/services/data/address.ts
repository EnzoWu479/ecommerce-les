import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { IClientAddress } from '@/types/client';

export const addressData = {
  async list({ page, limit }: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<IClientAddress>>(
      '/api/address',
      {
        params: {
          page,
          limit
        }
      }
    );
    return data;
  },
  async getDeliveryAddress() {
    const { data } = await api.get<IClientAddress[]>('/api/address/delivery');

    return data;
  }
};
