'use client';
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
import { IClient } from '@/types/client';
import { PageResponse } from '@/server/shared/PageResponse';
import { useRouter } from 'next/navigation';

interface Props {
  clients: PageResponse<IClient>;
}

export const ClientTable = async ({ clients }: Props) => {
  const router = useRouter();
  // const handleStatusChange =
  //   (id: string, status: AccountStatus) => async () => {
  //     'use server';
  //     console.log('status', status);

  //     await clientData.updateStatus(id, status);
  //     revalidatePath('/admin/clientes');
  //   };

  const handleDelete = async (client: IClient) => {
    try {
      await clientData.delete(client.id);
      router.refresh();
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleStatusChange = async (id: string, status: AccountStatus) => {
    try {
      await clientData.updateStatus(id, status);
      router.refresh();
      return true;
    } catch (error) {
      return false;
    }
  };

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
            <TableCell data-test="client-name">{client.name}</TableCell>
            <TableCell>{client.account?.email}</TableCell>
            <TableCell>{formaters.date(client.birthDate)}</TableCell>
            <TableCell>{masks.cpf(client.cpf)}</TableCell>
            <TableCell>
              <div>
                <Select
                  value={client.account?.status}
                  onValueChange={value =>
                    handleStatusChange(client.id, value as AccountStatus)
                  }
                >
                  <SelectTrigger className="w-[170px] border-none outline-none">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status do cliente</SelectLabel>
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
                <Link href={`/admin/clientes/${client.id}`} data-test="edit-item">
                  <PencilLine />
                </Link>
                <div data-test="delete-item">
                  {(() => {
                    'use client';
                    return (
                      <ModalWarning
                        title="Tem certeza que deseja excluir esse usuário?"
                        description="Essa ação não poderá ser desfeita."
                        acceptButton="Excluir"
                        onAccept={async () => await handleDelete(client)}
                      />
                    );
                  })()}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
