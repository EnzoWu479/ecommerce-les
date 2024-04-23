'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreditCardFormDTO,
  creditCardSchema
} from '@/validations/creditCard.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreditCardForm as RealCreditCardForm } from '@/components/creditCard-form';
import { creditCardData } from '@/services/data/credit-card';
import { useQueryCreditCardItem } from '@/services/query/useQueryCreditCard';
import { useEffect } from 'react';
interface Props {
  id?: string;
}
export const CreditCardForm = ({ id }: Props) => {
  const { data: creditCard } = useQueryCreditCardItem(id);
  const {
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm<CreditCardFormDTO>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      id: ''
    }
  });
  const router = useRouter();

  console.log(errors);

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await creditCardData.update(id, data);
      } else {
        await creditCardData.create(data);
      }
      toast.success('Cartão de crédito salvo com sucesso');
      router.back();
    } catch (error) {}
  });
  useEffect(() => {
    if (creditCard) {
      reset({
        id: creditCard.id,
        name: creditCard.name,
        holderName: creditCard.holderName,
        number: creditCard.number,
        expiration: creditCard.expDate,
        cvv: creditCard.cvv,
        brand: creditCard.brand.name
      });
    }
  }, [creditCard]);
  return (
    <form onSubmit={onSubmit}>
      <RealCreditCardForm value={watch()} onChange={reset} errors={errors} />
      <div className="col-span-3 flex justify-end mt-4">
        <Button type="submit" data-test="submit-button">
          Salvar
        </Button>
      </div>
    </form>
  );
};
