import { api } from '@/lib/axios';
import { ICart } from '@/types/cart';
import { Cart } from '@prisma/client';

export const cartData = {
  async getCurrentCart() {
    const { data } = await api.get<ICart>('/api/cart');
    return data;
  },
  async addToCart(productId: string, quantity: number = 1) {
    const { data } = await api.post<ICart>('/api/cart', {
      productId,
      quantity
    });
    return data;
  },
  async updateProductQuantity(productId: string, quantity: number) {
    const { data } = await api.put<ICart>('/api/cart', { productId, quantity });
    return data;
  },
  async removeProductFromCart(productId: string) {
    const { data } = await api.delete<ICart>(`/api/cart/${productId}`);
    return data;
  }
};
