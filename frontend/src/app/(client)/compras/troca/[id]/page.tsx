import { ClientLayout } from '@/components/layouts/client-layout';
import { TradeTable } from './trade-table';
import { IPage, IdProps } from '@/types/page';
import { Suspense } from 'react';
import { purchaseData } from '@/services/data/purchase';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const FetchTable = async ({ id }: IdProps) => {
  const purchase = await purchaseData.getById(id);

  return <TradeTable purchase={purchase} />;
};

export default function Switches({ params }: { params: IdProps }) {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Trocar</h2>
        </div>
        <Suspense fallback="Loading">
          <FetchTable {...params} />
        </Suspense>
      </div>
    </ClientLayout>
  );
}
