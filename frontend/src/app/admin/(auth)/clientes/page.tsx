import { ModalSearch } from '@/components/admin/modal-search';
import { ClientSearchFields } from './utils';
import { ModalWarning } from '@/components/modal-warning';
import { Suspense } from 'react';
import { clientData } from '@/services/data/client';
import { ClientSearchParams } from '@/types/client';
import { Paginate } from '@/components/paginate';
import { IPage } from '@/types/page';
import { ClientTable } from './client-table';

type Props = IPage & ClientSearchParams;

const ClientTableFetch = async ({ page, ...clientSearchParams }: Props) => {
  const clients = await clientData.getList({
    page: page || 1,
    limit: 10,
    search: clientSearchParams
  });
  return (
    <>
      <div className="mt-5 rounded border">
        <ClientTable clients={clients} />
      </div>
      <div className="flex justify-end">
        <Paginate
          page={page}
          pageCount={clients.totalPages || 1}
          searchParams={clientSearchParams}
        />
      </div>
    </>
  );
};

const ClientsPage = ({ searchParams }: { searchParams: Props }) => {
  const { page, ...clientSearchParams } = searchParams;
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <ModalSearch
            fields={ClientSearchFields}
            currentSearch={clientSearchParams}
          />
        </div>
        {/* <Link href="/admin/clientes/cadastrar">
          <Button>Novo cliente</Button>
        </Link> */}
      </div>
      <Suspense fallback="Loading">
        <ClientTableFetch {...searchParams} />
      </Suspense>
    </>
  );
};
export default ClientsPage;
