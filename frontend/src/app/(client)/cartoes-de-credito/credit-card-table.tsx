'use client';
import { useQueryCreditCardList } from '@/services/query/useQueryCreditCard';
import { IPage } from '@/types/page';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
import { PencilLine } from 'lucide-react';
import { ModalWarning } from '@/components/modal-warning';
import { ICreditCard } from '@/types/creditCard';
import { creditCardData } from '@/services/data/credit-card';
import { useRouter } from 'next/navigation';

export const CreditCardTable = ({ page }: IPage) => {
  const { data: cards } = useQueryCreditCardList({ page });
  const router = useRouter();

  const handleDelete = async (card: ICreditCard) => {
    try {
      await creditCardData.delete(card.id);
      router.refresh();
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do cartão</TableHead>
            <TableHead>Nome do portador</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Bandeira</TableHead>
            <TableHead className="flex items-center justify-end">
              Opções
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards?.content?.map(card => (
            <TableRow key={card.id}>
              <TableCell>
                {card.name} {!!card.mainCard && <>(Principal)</>}
              </TableCell>
              <TableCell>{card.holderName}</TableCell>
              <TableCell>
                **** **** ****{' '}
                {card.number.slice(card.number.length - 4, card.number.length)}
              </TableCell>
              <TableCell>{card.brand.name}</TableCell>

              <TableCell className="flex items-center justify-end">
                <div className="flex gap-2">
                  <Link href={`/cartoes-de-credito/${card.id}`}>
                    <PencilLine />
                  </Link>
                  <ModalWarning
                    title="Tem certeza que deseja excluir esse endereço?"
                    description="Essa ação não poderá ser desfeita."
                    acceptButton="Excluir"
                    onAccept={async () => await handleDelete(card)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
