import { ClientLayout } from '@/components/layouts/client-layout';
import { TradeTable } from './trade-table';

export default function Switches() {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Trocar</h2>
        </div>
        <TradeTable />
      </div>
    </ClientLayout>
  );
}
