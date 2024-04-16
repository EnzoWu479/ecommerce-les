import { api } from '@/lib/axios';
import { ICreditCard } from '@/types/creditCard';

export const creditCardData = {
  async getUnlist() {
    const { data } = await api.get<ICreditCard[]>('/api/credit-card/unlisted');
    return data;
  }
};
