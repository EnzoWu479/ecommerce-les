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
import { clientData } from '@/data/client';
import { revalidatePath } from 'next/cache';
import { IClient } from '@/types/client';
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
import { ActivatePopOver } from './components/activate-pop-over';
import { getSellPrice } from '@/utils/getSellPrice';
import { productData } from '@/data/product';
import { ModalChangeStock } from './modal-change-stock';

interface Props {
  products: PageResponse<IProduct>;
}

export const ProductTable = async ({ products }: Props) => {
  const router = useRouter();

  // const handleStatusChange =
  //   (id: string, status: AccountStatus) => async () => {
  //     'use server';
  //     console.log('status', status);

  //     await clientData.updateStatus(id, status);
  //     revalidatePath('/admin/clientes');
  //   };

  const handleDelete = async (product: IProduct) => {
    try {
      await productData.delete(product.id);
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
          <TableHead>Código ISBN</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Custo</TableHead>
          <TableHead>Preço de venda</TableHead>
          <TableHead>Fabricante</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Categorias</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Opções</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.content.map(product => (
          <TableRow key={product.id}>
            <TableCell>{product.isbn}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formaters.money(product.priceCost)}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {formaters.money(
                      getSellPrice(
                        product.priceCost,
                        product.priceGroup.profitPercent
                      )
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {product.priceGroup.profitPercent}%
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{product.publisher}</TableCell>
            <TableCell>{product.stock.quantity}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:underline">
                  Ver categorias
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-48 overflow-auto">
                    {product.categories.map(category => (
                      <DropdownMenuItem key={category.id}>
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              <div>
                <ActivatePopOver
                  active={product.status === BookStatus.ACTIVE}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/admin/produtos/${product.id}`}>
                  <PencilLine />
                </Link>
                <ModalChangeStock product={product} />
                {/* <Dialog>
                <DialogTrigger>
                  <ArrowUpLeftFromSquare />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Harry Potter</DialogTitle>
                    <DialogDescription>
                      Entre com a quantidade que deseja adicionar ou remover do
                      estoque
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Input />
                    <div className="mt-2 flex gap-2">
                      <Button>Adicionar</Button>
                      <Button>Remover</Button>
                      <DialogClose asChild>
                        <Button variant={'ghost'}>Cancelar</Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog> */}
                {/* <ModalWarning
                  title="Tem certeza que deseja excluir esse produto?"
                  description="Essa ação não poderá ser desfeita."
                  acceptButton="Excluir"
                  onAccept={async () => await handleDelete(product)}
                /> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
