'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

export const CoupomForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Cupom salvo com sucesso',
      description: 'O cupom foi salvo com sucesso'
    });
    router.back();
  });
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-6">
      <div className="w-96">
        <Label>Código de cupom</Label>
        <Input />
      </div>
      <div className="w-96">
        <Label>Valor do cupom</Label>
        <Input />
      </div>
      <div className="w-96">
        <Label>Status</Label>
        <Select>
          <SelectTrigger className="w-96 ">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status do cupom</SelectLabel>
              <SelectItem value="a">Ativo</SelectItem>
              <SelectItem value="i">Inativo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
