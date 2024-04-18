import { tradeData } from '@/services/data/trade';
import { IPage } from '@/types/page';
import { Suspense } from 'react';
import { TradeTable } from './trade-table';

export const dynamic = 'force-dynamic';

const Fetch = async ({ page }: IPage) => {
  const trades = await tradeData.list({ page: page || 1, limit: 10 });
  console.log(trades);

  return <TradeTable trades={trades} />;
};

const SellsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trocas</h2>
      </div>
      <Suspense fallback="Loading">
        <Fetch />
      </Suspense>
    </>
  );
};
export default SellsPage;
