import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Card, CardContent } from '@/components/ui/card';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formaters } from '@/helpers/formaters';
import { masks } from '@/helpers/masks';
import { ClientLayout } from '@/layouts/client-layout';
import { ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Bought() {
  return (
    <ClientLayout>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Compras</h2>
        </div>
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
            <TableRow>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="underline underline-offset-2 hover:underline-offset-1">
                    Ver produtos
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Produtos</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-48 overflow-auto">
                      <DropdownMenuItem>Harry Potter 1</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 2</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 3</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 4</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 5</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 6</DropdownMenuItem>
                      <DropdownMenuItem>Harry Potter 7</DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>{' '}
              </TableCell>
              <TableCell>{formaters.money(10)}</TableCell>
              <TableCell>{formaters.date(new Date().toISOString())}</TableCell>
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer hover:underline">
                    Endereço 1
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    Estacionamento <br /> Av. Armando Salles de Oliveira, 1200 -
                    Parque Suzano <br /> Suzano - SP, 08673-000
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>Em processamento</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/compras/troca/1">
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
          </TableBody>
        </Table>
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
      </div>
    </ClientLayout>
  );
}
