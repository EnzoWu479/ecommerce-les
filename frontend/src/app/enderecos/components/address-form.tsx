'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export const AddressForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Endereço salvo com sucesso',
      description: 'O endereço foi salvo com sucesso'
    });
    router.back();
  });

  return (
    <div className="flex flex-col space-y-2">
      <form onSubmit={onSubmit}>
        <Card className="grid grid-cols-3 gap-4 p-4">
          <div>
            <Label>Nome do endereço</Label>
            <Input />
          </div>
          <div>
            <Label>CEP</Label>
            <Input />
          </div>
          <div>
            <Label>Logradouro</Label>
            <Input />
          </div>
          <div>
            <Label>Tipo de logradouro</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="street">Rua</SelectItem>
                <SelectItem value="Av">Avenida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Número</Label>
            <Input />
          </div>
          <div>
            <Label>Bairro</Label>
            <Input />
          </div>
          <div>
            <Label>Tipo de residência</Label>
            <Input />
          </div>
          <div>
            <Label>Cidade</Label>
            <Input />
          </div>
          <div>
            <Label>Estado</Label>
            <Input />
          </div>
          <div>
            <Label>País</Label>
            <Input />
          </div>
          <div className="col-span-3">
            <h3>Tipo de endereço</h3>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>Endereço residencial</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>Endereço comercial</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox />
            <Label>Endereço de entrega</Label>
          </div>
          <div className="col-span-3 flex justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
