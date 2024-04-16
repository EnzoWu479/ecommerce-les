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

export const CreditCardForm = () => {
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

  const onSubmit = handleSubmit(async () => {
    toast.success('Cartão de crédito salvo com sucesso');
    router.back();
  });
  return (
    <form onSubmit={onSubmit}>
      <RealCreditCardForm value={watch()} onChange={reset} errors={errors} />
      <div className="col-span-3 flex justify-end">
        <Button type="submit" data-test="submit-button">
          Salvar
        </Button>
      </div>
    </form>
  );
};
