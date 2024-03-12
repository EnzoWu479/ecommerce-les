'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

export const CategoryForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Categoria salva com sucesso',
      description: 'A categoria foi salva com sucesso'
    });
    router.back();
  });
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-6">
      <div className="w-96">
        <Label>Nome da categoria</Label>
        <Input />
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
