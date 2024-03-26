import { ModalSearch } from '@/components/admin/modal-search';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ClientSearchFields } from './utils';
import { ModalWarning } from '@/components/modal-warning';
import { ClientTable } from './client-table';
import { Suspense } from 'react';
import { clientData } from '@/data/client';
import { ClientSearchParams } from '@/types/client';

type Props = {
  page?: number;
} & ClientSearchParams;

const ClientTableFetch = async ({ page, ...clientSearchParams }: Props) => {
  const clients = await clientData.getList({
    page: page || 1,
    limit: 10,
    search: clientSearchParams
  });
  return <ClientTable clients={clients} />;
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
        {/* <Link href="/admin/auth/clientes/cadastrar">
          <Button>Novo cliente</Button>
        </Link> */}
      </div>
      <div className="mt-5 rounded border">
        <Suspense fallback="Loading">
          <ClientTableFetch {...searchParams} />
        </Suspense>
      </div>
      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
export default ClientsPage;
