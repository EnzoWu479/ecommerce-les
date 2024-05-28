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
import { Paginate } from '@/components/paginate';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { PageResponse } from '@/server/shared/PageResponse';
import { IPurchase } from '@/types/purchase';
import { PurchaseStatus } from '@prisma/client';
import { purchaseData } from '@/services/data/purchase';
import { useRouter } from 'next/navigation';

interface Props {
  sells: PageResponse<IPurchase>;
}

export const SellTable = ({ sells }: Props) => {
  const router = useRouter();
  const handleStatusChange = async (id: string, status: PurchaseStatus) => {
    try {
      console.log(id, status);

      await purchaseData.updateStatus(id, status);
      router.refresh();
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <>
      <div className="mt-5 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Data da compra</TableHead>
              <TableHead>Preço total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sells.content.map(sell => (
              <TableRow key={sell.id}>
                <TableCell>{sell.cart.client?.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:underline">
                      Ver produtos
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Produtos</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-48 overflow-auto">
                        {sell.cart.productCart.map(product => (
                          <DropdownMenuItem key={product.id}>
                            {product.book.name}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{formaters.date(sell.purchasedAt)}</TableCell>
                <TableCell>{formaters.money(sell.totalValue)}</TableCell>
                <TableCell data-test="select-trade">
                  <div className="w-[170px]">
                    <Select
                      value={sell.status}
                      onValueChange={(value: string) =>
                        handleStatusChange(sell.id, value as PurchaseStatus)
                      }
                    >
                      <SelectTrigger className="w-[170px] border-none outline-none">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status da compra</SelectLabel>
                          <SelectItem value={PurchaseStatus.EM_PROCESSAMENTO}>
                            Em processamento
                          </SelectItem>
                          <SelectItem value={PurchaseStatus.EM_TRANSPORTE}>
                            Em transporte
                          </SelectItem>
                          <SelectItem value={PurchaseStatus.ENTREGUE}>
                            Entregue
                          </SelectItem>
                          <SelectItem
                            value={PurchaseStatus.PAGAMENTO_REALIZADO}
                          >
                            Aprovado
                          </SelectItem>
                          <SelectItem value={PurchaseStatus.PAGAMENTO_RECUSADO}>
                            Reprovado
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/admin/vendas/${sell.id}`}>
                            <Eye />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visualizar compra</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Paginate page={sells.page} pageCount={sells.totalPages} />
      </div>{' '}
    </>
  );
};
