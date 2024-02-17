import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { ClientLayout } from '@/layouts/client-layout';
import Image from 'next/image';

export default function Home() {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg">Mais vendidos</h1>
        <div className="mt-4 grid px-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard />
        </div>
      </div>
    </ClientLayout>
  );
}
