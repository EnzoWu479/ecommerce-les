import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { IClientAddress } from '@/types/client';
import { AddressFormDTO } from '@/validations/address.schema';

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
  },
  async create(address: AddressFormDTO) {
    const { data } = await api.post<AddressFormDTO>('/api/address', address);
    return data;
  },
  async update(id: string, address: AddressFormDTO) {
    const { data } = await api.put<AddressFormDTO>(
      `/api/address/${id}`,
      address
    );
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<IClientAddress>(`/api/address/${id}`);
    return data;
  }
};
