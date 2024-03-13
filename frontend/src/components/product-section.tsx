import { productsMock } from '@/mock/productsMock';
import { ProductCard } from './client/product-card';

const getData = async () => {
  const data = productsMock;
  return data;
};

export const ProductSection = async () => {
  const products = await getData();
  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
