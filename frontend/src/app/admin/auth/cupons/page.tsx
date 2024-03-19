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
import { ModalSearch } from '@/components/admin/modal-search';
import { coupomSearchFields } from './utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const CategoriesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Cupons</h2>
          <ModalSearch fields={coupomSearchFields} />
        </div>
        <Link href="/admin/auth/cupons/cadastrar">
          <Button>Novo cupom</Button>
        </Link>
      </div>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>QUERO20</TableCell>
              <TableCell>{formaters.money(54)}</TableCell>
              <TableCell className="w-fit">
                <div className='w-20'>
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
                  </Select>{' '}
                </div>
              </TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default CategoriesPage;
