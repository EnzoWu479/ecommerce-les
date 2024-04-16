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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formaters } from '@/helpers/formaters';
import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';
import { Paginate } from '@/components/paginate';
import { useQueryPurchase } from '@/services/query/useQueryPurchase';
import { IPage } from '@/types/page';
import { masks } from '@/helpers/masks';

export const PurchaseTable = ({ page }: IPage) => {
  const { data: purchases } = useQueryPurchase(page || 1);
  console.log(purchases);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produtos</TableHead>
            <TableHead>Preço total</TableHead>
            <TableHead>Data de compra</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases?.content.map(purchase => {
            const address = purchase.address;
            return (
              <TableRow key={purchase.id}>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="underline underline-offset-2 hover:underline-offset-1">
                      Ver produtos
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Produtos</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-48 overflow-auto">
                        {purchase.cart.productCart.map(product => (
                          <DropdownMenuItem key={product.id}>
                            {product.book.name}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>{' '}
                </TableCell>
                <TableCell>{formaters.money(purchase.totalValue)}</TableCell>
                <TableCell>{formaters.date(purchase.purchasedAt)}</TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      {address.clientAddress.name}
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      {address.street}, {address.number} -{' '}
                      {address.neighborhood} <br /> {address.city.name} -{' '}
                      {address.city.state.uf}, {masks.zipcode(address.zipCode)}
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{purchase.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/compras/troca/${purchase.id}`}
                            data-test="request-switch"
                          >
                            <ArrowLeftRight />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Trocar produto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Paginate pageCount={purchases?.totalPages || 1} />
      </div>{' '}
    </>
  );
};
