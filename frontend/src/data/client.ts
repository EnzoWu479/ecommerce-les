import { api } from '@/lib/axios';
import { ClientFormSchema } from '@/validations/clientForm.schema';
import { AccountStatus, Client } from '@prisma/client';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { IClient, ClientSearchParams } from '@/types/client';

export const clientData = {
  async create(values: Omit<ClientFormSchema, 'id'>) {
    const { data } = await api.post<Client>('/api/clients', values);
    return data;
  },
  async getList(pageRequest: PageRequest<ClientSearchParams>) {
    const { data } = await api.get<PageResponse<IClient>>('/api/clients', {
      params: {
        page: pageRequest.page,
        limit: pageRequest.limit,
        search: JSON.stringify(pageRequest.search)
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
  },
  async delete(id: string) {
    await api.delete(`/api/clients/${id}`);
  }
};
