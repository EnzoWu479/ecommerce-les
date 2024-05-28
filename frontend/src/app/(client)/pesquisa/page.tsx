import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { ProductSection } from '@/components/product-section';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientLayout } from '@/components/layouts/client-layout';
import Image from 'next/image';
import { Suspense } from 'react';

interface SearchParams {
  params: {};
  searchParams: {
    q: string;
    c: string;
  };
}

export default function Search(params: SearchParams) {
  const search = params.searchParams.q;
  const category = params.searchParams.c;
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {search && <span className="text-lg">Pesquisando por: {search}</span>}
        {category && (
          <span className="text-lg">Filtrando por categoria: {category}</span>
        )}
        <div className="mt-4 grid gap-4 px-8 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 lg:grid-cols-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
              </>
            }
          >
            <ProductSection category={category} search={search} />
          </Suspense>
        </div>
      </div>
    </ClientLayout>
  );
}
