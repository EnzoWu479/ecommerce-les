import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { ProductSection } from '@/components/product-section';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientLayout } from '@/layouts/client-layout';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        </div>
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
            <ProductSection />
          </Suspense>
        </div>
      </div>
    </ClientLayout>
  );
}
