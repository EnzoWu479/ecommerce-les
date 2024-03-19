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
import { clientSearchFields } from './utils';
import { ModalWarning } from '@/components/modal-warning';

const ClientsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <ModalSearch fields={clientSearchFields} />
        </div>
        {/* <Link href="/admin/auth/clientes/cadastrar">
          <Button>Novo cliente</Button>
        </Link> */}
      </div>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de nascimento</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>João</TableCell>
              <TableCell>joao@email.com</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>{masks.cpf('99999999999')}</TableCell>
              <TableCell>
                <div>
                  <Select defaultValue="a">
                    <SelectTrigger className="w-[170px] border-none outline-none">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status do cupom</SelectLabel>
                        <SelectItem value="a">Ativo</SelectItem>
                        <SelectItem value="i">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/admin/auth/clientes/${1}`}>
                    <PencilLine />
                  </Link>
                  <ModalWarning
                    title="Tem certeza que deseja excluir esse usuário?"
                    description="Essa ação não poderá ser desfeita."
                    acceptButton="Excluir"
                  />
                  {/* <Dialog>
                    <DialogTrigger>
                      <Trash2 />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Tem certeza que deseja excluir esse usuário?
                        </DialogTitle>
                        <DialogDescription>
                          Essa ação não poderá ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog> */}
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
export default ClientsPage;
