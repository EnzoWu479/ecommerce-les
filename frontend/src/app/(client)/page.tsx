import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { ProductSection } from '@/components/product-section';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientLayout } from '@/components/layouts/client-layout';
import Image from 'next/image';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        </div>
        <ProductSection />
      </div>
    </ClientLayout>
  );
}
