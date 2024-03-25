import { api } from '@/lib/axios';
import { ClientFormSchema } from '@/validations/clientForm.schema';
import { AccountStatus, Client } from '@prisma/client';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { IClient } from '@/types/client';

export const clientData = {
  async create(values: Omit<ClientFormSchema, 'id'>) {
    const { data } = await api.post<Client>('/api/clients', values);
    return data;
  },
  async getList(pageRequest: PageRequest<Client>) {
    const { data } = await api.get<PageResponse<IClient>>('/api/clients', {
      params: {
        page: pageRequest.page,
        limit: pageRequest.limit
      }
    });
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<IClient>(`/api/clients/${id}`);
    return data;
  },
  async update(id: string, values: Partial<ClientFormSchema>) {
    const { data } = await api.put<IClient>(`/api/clients/${id}`, values);
    return data;
  },
  async updateStatus(id: string, status: AccountStatus) {
    await api.put(`/api/clients/${id}/status`, { status });
  }
};
