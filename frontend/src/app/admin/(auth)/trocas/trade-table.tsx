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
import { formaters } from '@/helpers/formaters';
import { useState } from 'react';
import { Paginate } from '@/components/paginate';
import { Button } from '@/components/ui/button';
import { ITrade } from '@/types/trade';
import { PageResponse } from '@/server/shared/PageResponse';
import { TradeDTO } from '@/server/repositories/dto/TradeDTO';
import { TradeStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { tradeData } from '@/services/data/trade';

interface Props {
  trades: PageResponse<TradeDTO>;
}

export const TradeTable = ({ trades }: Props) => {
  const router = useRouter();
  const handleStatusChange = async (id: string, status: TradeStatus) => {
    try {
      console.log(id, status);

      await tradeData.updateStatus(id, status);
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
              <TableHead>Cliente</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Valor trocado</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cupom gerado</TableHead>
              <TableHead className="flex items-center justify-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.content.map(trade => (
              <TableRow key={trade.id}>
                <TableCell>{trade.client.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:underline">
                      Ver produtos
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Produtos</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-48 overflow-auto">
                        {trade.books.map(book => (
                          <DropdownMenuItem key={book.id}>
                            {book.book.name}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{formaters.money(trade.totalValue)}</TableCell>
                <TableCell>{formaters.date(trade.createdAt)}</TableCell>
                <TableCell>
                  {
                    {
                      [TradeStatus.EM_TROCA]: 'Em troca',
                      [TradeStatus.TROCA_AUTORIZADA]: 'Troca autorizada',
                      [TradeStatus.TROCA_REALIZADA]: 'Trocado',
                      [TradeStatus.TROCA_RECUSADA]: 'Troca recusada'
                    }[trade.status]
                  }
                </TableCell>
                <TableCell>{trade.coupon?.code || '-'}</TableCell>
                <TableCell className="w-[180px]">
                  {trade.status === TradeStatus.EM_TROCA && (
                    <div className="flex gap-2">
                      <Button
                        data-test="accept-button"
                        onClick={() =>
                          handleStatusChange(
                            trade.id,
                            TradeStatus.TROCA_AUTORIZADA
                          )
                        }
                      >
                        Aceitar
                      </Button>
                      <Button
                        variant={'destructive'}
                        data-test="reject-button"
                        onClick={() =>
                          handleStatusChange(
                            trade.id,
                            TradeStatus.TROCA_RECUSADA
                          )
                        }
                      >
                        Recusar
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
