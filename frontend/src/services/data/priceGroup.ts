import { api } from '@/lib/axios';
import { ICategory } from '@/types/category';
import { IPriceGroup } from '@/types/priceGroup';

export const priceGroupData = {
  async getAll() {
    const { data } = await api.get<IPriceGroup[]>('/api/books/price-group');
    return data;
  }
};
