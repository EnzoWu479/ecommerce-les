'use client';
import { useInfiniteQueryProduct } from '@/services/query/useInfiniteQueryProduct';
import { ProductCard } from './client/product-card';
import { productData } from '@/services/data/product';
import { Skeleton } from './ui/skeleton';
import { useIntersection } from '@/hooks/useIntersection';

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

export const ProductSection = (props: Props) => {
  // const products = await getData(props);
  const {
    data: products,
    isFetchingNextPage,
    isLoading,
    fetchNextPage
  } = useInfiniteQueryProduct(props);
  const { ref } = useIntersection(fetchNextPage);
  return (
    <>
      {products.map((product, i) => (
        <ProductCard key={product.id} index={i + 1} product={product} />
      ))}
      {(isLoading || isFetchingNextPage) && (
        <>
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </>
      )}
      <div ref={ref} />
    </>
  );
};
