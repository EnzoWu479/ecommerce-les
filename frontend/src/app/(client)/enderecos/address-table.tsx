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
import { AccountStatus, BookStatus } from '@prisma/client';
import { clientData } from '@/services/data/client';
import { revalidatePath } from 'next/cache';
import { IClient, IClientAddress } from '@/types/client';
import { PageResponse } from '@/server/shared/PageResponse';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types/product';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getSellPrice } from '@/utils/getSellPrice';
import { productData } from '@/services/data/product';
import { IPage } from '@/types/page';
import { useQueryClientAddress } from '@/services/query/useQueryAddress';
import { Paginate } from '@/components/paginate';

interface Props {
  addresses: PageResponse<IClientAddress>;
}
export const AddressTable = ({ page }: IPage) => {
  const { data: addresses } = useQueryClientAddress({ page });
  console.log(addresses);

  if (!addresses) return 'Loading';
  return (
    <>
      <RenderAddressTable addresses={addresses} />
      <Paginate pageCount={addresses.totalPages} />
    </>
  );
};

const RenderAddressTable = ({ addresses }: Props) => {
  const router = useRouter();

  // const handleStatusChange =
  //   (id: string, status: AccountStatus) => async () => {
  //     'use server';
  //     console.log('status', status);

  //     await clientData.updateStatus(id, status);
  //     revalidatePath('/admin/clientes');
  //   };

  const handleDelete = async (address: IClientAddress) => {
    try {
      await productData.delete(address.id);
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
        {addresses.content.map(address => (
          <TableRow key={address.id}>
            <TableCell>{masks.zipcode(address.address.zipCode)}</TableCell>
            <TableCell>{address.address.street}</TableCell>
            <TableCell>{address.address.number}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>Mogi das Cruzes</TableCell>
            <TableCell>SP</TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="flex gap-2">
                <Link href={`/enderecos/${1}`}>
                  <PencilLine />
                </Link>
                <ModalWarning
                  title="Tem certeza que deseja excluir esse endereço?"
                  description="Essa ação não poderá ser desfeita."
                  acceptButton="Excluir"
                  onAccept={async () => await handleDelete(address)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
