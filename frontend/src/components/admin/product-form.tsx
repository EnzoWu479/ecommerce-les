'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Listbox } from '@headlessui/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { Icon, ItemIndicator } from '@radix-ui/react-select';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectMultiple } from '../ui/select-multiple';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const people = [
  { value: '1', label: 'Durward Reynolds' },
  { value: '2', label: 'Kenton Towne' },
  { value: '3', label: 'Therese Wunsch' },
  { value: '4', label: 'Benedict Kessler' },
  { value: '5', label: 'Katelyn Rohan' }
];
export const ProductForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Produto salvo com sucesso',
      description: 'O produto foi salvo com sucesso'
    });
    router.back();
  });
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Nome da produto</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>ISBN</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Fabricante</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {/* {field.options.map((option, index) => ( */}
              <SelectItem value={'a'}>{'ab'}</SelectItem>
              {/* ))} */}
            </SelectContent>
          </Select>
        </div>
        <div className="w-72">
          <Label>Categorias</Label>
          <SelectMultiple
            value={selectedPeople}
            onChange={setSelectedPeople}
            options={people}
          />
        </div>
        <div className="w-72">
          <Label>Autor</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Ano</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Editora</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Edição</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Nº de páginas</Label>
          <Input />
        </div>

        <div className="w-72">
          <Label>Código de barras</Label>
          <Input />
        </div>
        <div className="w-full">
          <Label>Sinopse</Label>
          <Textarea />
        </div>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">Dimensões</h3>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Altura</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Largura</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Peso</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Profundidade</Label>
          <Input />
        </div>
      </div>
      <h3 className="text-2xl font-bold tracking-tight">
        Detalhes de precificação
      </h3>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <div className="w-72">
          <Label>Custo</Label>
          <Input />
        </div>
        <div className="w-72">
          <Label>Grupo de precificação</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {/* {field.options.map((option, index) => ( */}
              <SelectItem value={'a'}>{'Lucrando muito (50%)'}</SelectItem>
              {/* ))} */}
            </SelectContent>
          </Select>
        </div>
        <div className="w-72">
          <Label>Preço de venda</Label>
          <Input />
        </div>
      </div>
      <div>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};
