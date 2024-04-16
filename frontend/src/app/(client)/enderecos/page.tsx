import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ClientLayout } from '@/components/layouts/client-layout';
import { PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { AddressTable } from './address-table';
import { Paginate } from '@/components/paginate';
import { addressData } from '@/services/data/address';
import { IPage } from '@/types/page';
import { Suspense } from 'react';
import { useQueryClientAddress } from '@/services/query/useQueryAddress';

const Addresses = ({ searchParams: { page } }: { searchParams: IPage }) => {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Meus endereços</h2>
          <Link href="/enderecos/cadastrar">
            <Button>Novo endereço</Button>
          </Link>
        </div>
        <div>
          <AddressTable page={page} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Addresses;
