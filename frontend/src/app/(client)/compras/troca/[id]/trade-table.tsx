'use client';
import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ProductCard } from '@/components/client/product-card';
import { InputValueControl } from '@/components/input-value-control';
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
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  purchase: IPurchase;
}
1;
interface ISelectedItem {
  id: string;
  amount: number;
}
export const TradeTable = ({ purchase }: Props) => {
  const router = useRouter();
  const products = purchase.cart.productCart;

  const [selected, setSelected] = useState<ISelectedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAmountChange = async (id: string, amount: number) => {
    setSelected(prev => prev.map(i => (i.id === id ? { ...i, amount } : i)));
  };

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
          {products.map((product, index) => {
            const isChecked = selected.some(i => i.id === product.id);
            const value = selected.find(i => i.id === product.id)?.amount || 1;
            const amount = product.amount - (product.trades?.length || 0);
            return (
              <TableRow key={product.id}>
                <TableCell className="w-10">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      data-test={`checkbox-${index}`}
                      disabled={amount <= 0}
                      checked={isChecked}
                      onCheckedChange={() => {
                        setSelected(prev =>
                          prev.some(i => i.id === product.id)
                            ? prev.filter(i => i.id !== product.id)
                            : [...prev, { id: product.id, amount: 1 }]
                        );
                      }}
                    />
                    {isChecked && (
                      <InputValueControl
                        value={value}
                        tooltip={String(
                          formaters.money(product.book.priceSell * value)
                        )}
                        onChange={value =>
                          handleAmountChange(product.id, value)
                        }
                        step={1}
                        max={amount}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="flex gap-4">
                  {product.book.name}
                </TableCell>
                <TableCell>
                  {product.amount} x {formaters.money(product.book.priceSell)}
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
            );
          })}
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
