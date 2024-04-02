'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const PriceGroupForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async () => {
    toast.success('Categoria salva com sucesso');
    router.back();
  });
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-6">
      <div className="w-96">
        <Label>Nome do grupo</Label>
        <Input />
      </div>
      <div className="w-96">
        <Label>Margem de lucro (%)</Label>
        <Input />
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
