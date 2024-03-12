import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { ClientLayout } from '@/layouts/client-layout';
import Image from 'next/image';

interface SearchParams {
  params: {};
  searchParams: {
    q: string;
  };
}

export default function Search(params: SearchParams) {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg">Pesquisando por: {params.searchParams.q}</h1>
        <div className="mt-4 grid px-8 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard />
        </div>
      </div>
    </ClientLayout>
  );
}
