'use client';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { formaters } from '@/helpers/formaters';
import { tradeData } from '@/services/data/trade';
import { IPurchase } from '@/types/purchase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  purchase: IPurchase;
}

export const TradeTable = ({ purchase }: Props) => {
  const router = useRouter();
  const products = purchase.cart.productCart;
  console.log(purchase);
  
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    setLoading(true);
    try {
      await tradeData.request({
        productsId: selected
      });
      toast.success('Troca solicitada com sucesso');
      router.push('/compras');
    } catch (error) {
      toast.error('Erro ao solicitar troca');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Fabricante</TableHead>
            <TableHead>Categorias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="w-10">
                <Checkbox
                  data-test={`checkbox-${index}`}
                  disabled={!!product.TradeRequest}
                  checked={selected.includes(product.id)}
                  onCheckedChange={() => {
                    setSelected(prev =>
                      prev.includes(product.id)
                        ? prev.filter(i => i !== product.id)
                        : [...prev, product.id]
                    );
                  }}
                />
              </TableCell>
              <TableCell className="flex gap-4">{product.book.name}</TableCell>
              <TableCell>
                {formaters.money(Math.floor(product.book.priceSell) * product.amount)}
              </TableCell>
              <TableCell>{product.book.publisher}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:underline">
                    Ver categorias
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-48 overflow-auto">
                      {product.book.categories.map(category => (
                        <DropdownMenuItem key={category.id}>
                          {category.name}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/compras">Voltar</Link>
        </Button>
        <Button
          onClick={handleTrade}
          data-test="submit-button"
          disabled={selected.length <= 0 || loading}
        >
          Trocar
        </Button>
      </div>
    </>
  );
};
