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
import Link from 'next/link';
import { PencilLine } from 'lucide-react';
import { ModalWarning } from '@/components/modal-warning';
import { AccountStatus } from '@prisma/client';
import { clientData } from '@/data/client';
import { revalidatePath } from 'next/cache';

export const ClientTable = async ({ page }: { page?: number }) => {
  const clients = await clientData.getList({ page: page || 1, limit: 10 });
  // const handleStatusChange =
  //   (id: string, status: AccountStatus) => async () => {
  //     'use server';
  //     console.log('status', status);

  //     await clientData.updateStatus(id, status);
  //     revalidatePath('/admin/auth/clientes');
  //   };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Opções</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.content.map(client => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.account?.email}</TableCell>
            <TableCell>{formaters.date(client.birthDate)}</TableCell>
            <TableCell>{masks.cpf(client.cpf)}</TableCell>
            <TableCell>
              <div>
                <Select defaultValue={client.account?.status}>
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status do cupom</SelectLabel>
                      <SelectItem value={AccountStatus.ACTIVE}>
                        Ativo
                      </SelectItem>
                      <SelectItem value={AccountStatus.INACTIVE}>
                        Inativo
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/admin/auth/clientes/${client.id}`}>
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
        ))}
      </TableBody>
    </Table>
  );
};
