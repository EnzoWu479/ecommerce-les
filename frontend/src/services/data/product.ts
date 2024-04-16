import { api } from '@/lib/axios';
import { PageRequest } from '@/server/shared/PageRequest';
import { PageResponse } from '@/server/shared/PageResponse';
import { IPage } from '@/types/page';
import { IProduct } from '@/types/product';
import { BookForm } from '@/validations/bookForm.schema';

export const productData = {
  async create(data: BookForm) {
    await api.post('/api/books', {
      ...data,
      numberPages: Number(data.numberPages),
      year: Number(data.year),
      priceCost: Number(data.priceCost),
      depth: Number(data.depth),
      height: Number(data.height),
      width: Number(data.width),
      weight: Number(data.weight)
    });
  },
  async update(id: string, data: BookForm) {
    await api.put(`/api/books/${id}`, {
      ...data,
      numberPages: Number(data.numberPages),
      year: Number(data.year),
      priceCost: Number(data.priceCost),
      depth: Number(data.depth),
      height: Number(data.height),
      width: Number(data.width),
      weight: Number(data.weight)
    });
  },
  async getList(pageRequest: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<IProduct>>('/api/books', {
      params: {
        page: pageRequest.page,
        limit: pageRequest.limit,
        search: JSON.stringify(pageRequest.search)
      }
    });
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<IProduct>(`/api/books/${id}`);
    return data;
  },
  async delete(id: string) {
    await api.delete(`/api/books/${id}`);
  },
  async changeStock(productId: string, quantity: number) {
    await api.put(`/api/books/${productId}/stock`, {
      stock: quantity
    });
  },
  async getHome(pageRequest: PageRequest<unknown>) {
    const { data } = await api.get<PageResponse<IProduct>>('/api/home', {
      params: {
        page: pageRequest.page,
        limit: pageRequest.limit,
        search: JSON.stringify(pageRequest.search)
      }
    });
    return data;
  }
};
