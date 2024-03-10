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
import { ClientLayout } from '@/layouts/client-layout';
import { PencilLine, Trash2 } from 'lucide-react';
import Link from 'next/link';

const Addresses = () => {
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CEP</TableHead>
                <TableHead>Logradouro</TableHead>
                <TableHead>Nº</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="flex items-center justify-end">
                  Opções
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>08746-205</TableCell>
                <TableCell>Rua Gilberto dos Santos</TableCell>
                <TableCell>205</TableCell>
                <TableCell>Parque Olimpico</TableCell>
                <TableCell>Mogi das Cruzes</TableCell>
                <TableCell>SP</TableCell>
                <TableCell className="flex items-center justify-end">
                  <div className="flex gap-2">
                    <Link href={`/enderecos/${1}`}>
                      <PencilLine />
                    </Link>
                    <Dialog>
                      <DialogTrigger>
                        <Trash2 />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Tem certeza que deseja excluir esse endereço?
                          </DialogTitle>
                          <DialogDescription>
                            Essa ação não poderá ser desfeita.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <DialogClose asChild>
                            <Button variant="ghost">Voltar</Button>
                          </DialogClose>
                          <Button>Excluir</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Addresses;
