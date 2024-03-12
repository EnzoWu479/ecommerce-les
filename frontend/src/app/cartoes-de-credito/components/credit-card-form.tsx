'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const CreditCardForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Cartão de crédito salvo com sucesso',
      description: 'O cartão de crédito foi salvo com sucesso'
    });
    router.back();
  });
  return (
    <form onSubmit={onSubmit}>
      <Card className="grid grid-cols-3 gap-4 p-4">
        <div>
          <Label>Nome do cartão de crédito</Label>
          <Input />
        </div>
        <div>
          <Label>Número</Label>
          <Input />
        </div>
        <div>
          <Label>Nome do titular</Label>
          <Input />
        </div>
        <div>
          <Label>CVV</Label>
          <Input />
        </div>
        <div>
          <Label>Data de validade</Label>
          <Input />
        </div>
        <div>
          <Label>Bandeira</Label>
          <Input />
        </div>

        <div className="col-span-3 flex justify-end">
          <Button>Salvar</Button>
        </div>
      </Card>
    </form>
  );
};
