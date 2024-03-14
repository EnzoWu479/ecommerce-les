import { productsMock } from '@/mock/productsMock';
import { IProduct } from '@/types/product';

export const getProduct = (id: string) => {
  const product = productsMock.find(product => product.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};
