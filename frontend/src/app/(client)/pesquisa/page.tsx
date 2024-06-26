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

        <ProductSection category={category} search={search} />
      </div>
    </ClientLayout>
  );
}
