import { ModalSearch } from '@/components/admin/modal-search';
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
import { Input } from '@/components/ui/input';
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
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { ArrowUpLeftFromSquare, PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { stockSearchFields } from './utils';
import { ModalWarning } from '@/components/modal-warning';

const SellsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Grupo de precificação
          </h2>
          <ModalSearch fields={stockSearchFields} />
        </div>
        <Button asChild>
          <Link href="/admin/grupo-de-precificacao/cadastrar">
            Novo grupo de precificação
          </Link>
        </Button>
      </div>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Margem de lucro</TableHead>
              <TableHead>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>50% de lucro</TableCell>
              <TableCell>50%</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/clientes/${1}`}>
                    <PencilLine />
                  </Link>
                  <ModalWarning
                    title="Excluir grupo de precificação"
                    description="Deseja realmente excluir o grupo de precificação?"
                    acceptButton="Excluir"
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
export default SellsPage;
