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

interface Props {
  fields: SearchField[];
}

export const ModalSearch = ({ fields }: Props) => {
  const renderField = (field: SearchField) => {
    if (field.type === SearchType.STRING) {
      return <Input id={field.name} />;
    }
    if (field.type === SearchType.OPTION) {
      return (
        <Select name={field.name}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option, index) => (
              <SelectItem value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (field.type === SearchType.DATE) {
      return <DatePicker />;
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
          <Button>Pesquisar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
