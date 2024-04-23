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
import { CreditCardTable } from './credit-card-table';

const Addresses = () => {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Meus cartões de crédito
          </h2>
          <Link href="/cartoes-de-credito/cadastrar">
            <Button>Novo cartão</Button>
          </Link>
        </div>
        <CreditCardTable />
      </div>
    </ClientLayout>
  );
};

export default Addresses;
