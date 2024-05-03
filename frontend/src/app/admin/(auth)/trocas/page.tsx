import { tradeData } from '@/services/data/trade';
import { IPage } from '@/types/page';
import { Suspense } from 'react';
import { TradeTable } from './trade-table';
import { Paginate } from '@/components/paginate';

export const dynamic = 'force-dynamic';

const Fetch = async ({ page }: IPage) => {
  const trades = await tradeData.list({ page: page || 1, limit: 10 });
  console.log(trades);

  return <>
  <TradeTable trades={trades} />
  <div className="flex justify-end">
        <Paginate page={page} pageCount={trades.totalPages || 1} />
      </div></>;
};

const SellsPage = ({ searchParams }: { searchParams: IPage }) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trocas</h2>
      </div>
      <Suspense fallback="Loading">
        <Fetch page={searchParams.page} />
      </Suspense>
    </>
  );
};
export default SellsPage;
