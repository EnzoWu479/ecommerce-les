import { ProductCard } from './client/product-card';
import { productData } from '@/services/data/product';

interface Props {
  category?: string;
  search?: string;
}

const getData = async ({ category, search }: Props) => {
  console.log({ category, search });

  const products = await productData.getHome({
    page: 1,
    limit: 10,
    category: category,
    search: { name: search }
  });
  return products;
};

export const ProductSection = async (props: Props) => {
  const products = await getData(props);
  return (
    <>
      {products.content.map((product, i) => (
        <ProductCard key={product.id} index={i + 1} product={product} />
      ))}
    </>
  );
};
