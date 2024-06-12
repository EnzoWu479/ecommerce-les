'use client';
import { useInfiniteQueryProduct } from '@/services/query/useInfiniteQueryProduct';
import { ProductCard } from './client/product-card';
import { productData } from '@/services/data/product';
import { Skeleton } from './ui/skeleton';
import { useIntersection } from '@/hooks/useIntersection';
import { ProductList } from './product-list';

interface Props {
  category?: string;
  search?: string;
}

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
      <ProductList
        products={products}
        isLoading={isLoading || isFetchingNextPage}
        amount_skeleton={8}
      />
      <div ref={ref} />
    </>
  );
};
