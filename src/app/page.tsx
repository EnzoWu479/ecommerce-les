import { ClientNavigationMenu } from '@/components/client/navbar/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <ClientNavigationMenu />
      
      <div className="container mt-4 space-y-2">
        <h1 className='text-lg'>Mais vendidos</h1>
        <div className=" grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
