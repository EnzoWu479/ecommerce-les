import { Suspense } from 'react';
import { purchaseData } from '@/services/data/purchase';
import { IPage } from '@/types/page';
import { SellTable } from './sell-table';

export const dynamic = 'force-dynamic';

const FetchTableSell = async ({ page }: IPage) => {
  const sells = await purchaseData.listAll({
    page: Number(page || 1),
    limit: 10
  });
  return <SellTable sells={sells} />;
};

const SellsPage = ({ searchParams }: { searchParams: IPage }) => {
  console.log(searchParams);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Vendas</h2>
          {/* <ModalSearch fields={sellSearchFields} /> */}
        </div>
      </div>
      <Suspense fallback="Loading">
        <FetchTableSell {...searchParams} />
      </Suspense>
    </>
  );
};
export default SellsPage;
