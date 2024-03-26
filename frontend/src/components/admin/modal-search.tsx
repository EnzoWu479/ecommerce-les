'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { SearchField, SearchType } from '@/types/search';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { DatePicker } from '../date-picker';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  fields: SearchField[];
  currentSearch?: Record<string, any>;
}
export const EMPTY_VALUE = 'Nenhum';
export const ModalSearch = ({ fields, currentSearch }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(currentSearch as Record<string, any>);

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
      newSearchParams.append(key, value === EMPTY_VALUE ? '' : value);
    });
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const renderField = (field: SearchField) => {
    if (field.type === SearchType.STRING) {
      return (
        <Input
          id={field.name}
          value={search?.[field.name] || ''}
          onChange={e => setSearch({ ...search, [field.name]: e.target.value })}
        />
      );
    }
    if (field.type === SearchType.OPTION) {
      return (
        <Select
          name={field.name}
          value={search?.[field.name]}
          onValueChange={value =>
            setSearch({
              ...search,
              [field.name]: value
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {/* empty option */}
            <SelectItem value={EMPTY_VALUE}>Selecione</SelectItem>

            {field.options.map((option, index) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (field.type === SearchType.DATE) {
      return (
        <Input
          type="date"
          value={search?.[field.name]}
          onChange={e => setSearch({ ...search, [field.name]: e.target.value })}
        />
      );
    }
    return <></>;
  };
  return (
    <Drawer>
      <DrawerTrigger>
        <Search />
      </DrawerTrigger>
      <DrawerContent className="px-10">
        <DrawerHeader>
          <DrawerTitle>Filtre</DrawerTitle>
          {/* <DrawerDescription></DrawerDescription> */}
        </DrawerHeader>
        <div className="mx-4 grid gap-x-4 gap-y-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {fields.map((field, index) => (
            <div className="w-full" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <DrawerFooter className="flex flex-row">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={handleSearch}>Pesquisar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
