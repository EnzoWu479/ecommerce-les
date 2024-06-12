import { IProduct } from '@/types/product';
import { Skeleton } from './ui/skeleton';
import { ProductCard } from './client/product-card';

interface Props {
  products: IProduct[];
  isLoading: boolean;
  amount_skeleton?: number;
}

export const ProductList = ({
  isLoading,
  products,
  amount_skeleton = 4
}: Props) => {
  return (
    <div className="mt-4 grid gap-4 px-8 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} index={i + 1} product={product} />
      ))}
      {isLoading && (
        <>
          {Array.from({ length: amount_skeleton }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </>
      )}
    </div>
  );
};
