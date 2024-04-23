import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { ICreditCard } from '@/types/creditCard';
import { CreditCardFormDTO } from '@/validations/creditCard.schema';

export const creditCardData = {
  async getUnlist() {
    const { data } = await api.get<ICreditCard[]>('/api/credit-card/unlisted');
    return data;
  },
  async list({ page, limit }: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<ICreditCard>>(
      '/api/credit-card',
      {
        params: {
          page,
          limit
        }
      }
    );
    return data;
  },
  async delete(id: string) {
    const { data } = await api.delete(`/api/credit-card/${id}`);
    return data;
  },
  async create(data: CreditCardFormDTO) {
    const { data: creditCard } = await api.post<CreditCardFormDTO>(
      '/api/credit-card',
      data
    );
    return creditCard;
  },
  async update(id: string, data: CreditCardFormDTO) {
    const { data: creditCard } = await api.put<CreditCardFormDTO>(
      `/api/credit-card/${id}`,
      data
    );
    return creditCard;
  },
  async getById(id: string) {
    const { data } = await api.get<ICreditCard>(`/api/credit-card/${id}`);
    return data;
  }
};
