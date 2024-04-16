import { ProductCard } from './client/product-card';
import { productData } from '@/services/data/product';

const getData = async () => {
  const products = await productData.getHome({
    page: 1,
    limit: 10,
    search: {}
  });
  return products;
};

export const ProductSection = async () => {
  const products = await getData();
  return (
    <>
      {products.content.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
