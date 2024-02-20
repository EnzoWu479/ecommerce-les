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

const people = [
  { value: '1', label: 'Durward Reynolds' },
  { value: '2', label: 'Kenton Towne' },
  { value: '3', label: 'Therese Wunsch' },
  { value: '4', label: 'Benedict Kessler' },
  { value: '5', label: 'Katelyn Rohan' }
];
export const ProductForm = () => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  return (
    <form className="flex flex-wrap gap-x-8 gap-y-4">
      <div className="min-w-72 max-w-96">
        <Label>Nome da produto</Label>
        <Input />
      </div>
      <div className="min-w-72 max-w-96">
        <Label>Código SKU</Label>
        <Input />
      </div>
      <div className="min-w-72 max-w-96">
        <Label>Preço</Label>
        <Input />
      </div>
      <div className="min-w-72 max-w-96">
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
      <div className="min-w-72 max-w-96">
        <Label>Categorias</Label>
        <SelectMultiple
          value={selectedPeople}
          onChange={setSelectedPeople}
          options={people}
        />
      </div>
    </form>
  );
};
