import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { PencilLine, Trash2 } from 'lucide-react';

const CategoriesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Categorias de produtos
        </h2>
        <Link href="/admin/auth/categorias/cadastrar">
          <Button>Nova categoria</Button>
        </Link>
      </div>
      <div className="mt-5 w-fit rounded border">
        <Table className="w-fit min-w-96">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="flex items-center justify-end">
                Opções
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Roupas</TableCell>
              <TableCell className="flex items-center justify-end">
                <div className="flex gap-2">
                  <Link href={`/admin/auth/categorias/${1}`}>
                    <PencilLine />
                  </Link>
                  <Dialog>
                    <DialogTrigger>
                      <Trash2 />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Tem certeza que deseja excluir esse cupom?
                        </DialogTitle>
                        <DialogDescription>
                          Essa ação não poderá ser desfeita.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default CategoriesPage;
