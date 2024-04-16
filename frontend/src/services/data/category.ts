import { api } from '@/lib/axios';
import { ICategory } from '@/types/category';

export const categoryData = {
  async getAll() {
    const { data } = await api.get<ICategory[]>('/api/books/category');
    return data;
  }
};
