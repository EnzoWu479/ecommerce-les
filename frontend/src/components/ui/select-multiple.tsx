import { Listbox } from '@headlessui/react';
import { IOption } from '@/types/search';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';

interface Props {
  options: IOption[];
  value: string[];
  onCreateOption?: (name: string) => void;
  onChange: (value: string[]) => void;
}

export const SelectMultiple = ({
  options,
  value,
  onChange,
  onCreateOption
}: Props) => {
  return (
    <div className="relative w-full">
      <CreatableSelect
        isMulti
        placeholder="Selecione"
        onCreateOption={name => {
          onCreateOption?.(name);
          onChange([...value, name]);
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              'flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 !py-0 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 !border-slate-300 !shadow-none',
              isFocused && 'border-slate-950'
            ),

          valueContainer: () => '!p-0 !m-0',
          indicatorSeparator: () => '!p-0 hidden',

          dropdownIndicator: () => 'h-4 w-4 min-w-4 opacity-50',
          menu: () =>
            'absolute left-0 right-0 top-[100%] z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          option: ({ isSelected }) =>
            cn(
              'select-option data-[disabled] :pointer-events-none relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50',
              isSelected && 'bg-slate-100'
            ),
          multiValue: () =>
            'flex items-center bg-slate-100 rounded-md text-sm mr-1 !p-0',
          multiValueLabel: () => 'text-sm',
          multiValueRemove: () => 'flex items-center justify-center ml-1',

          input: () => '!p-0 !m-0 input-select-multiple'
        }}
        options={options}
        formatCreateLabel={name => `Criar "${name}"`}
        value={value.map(v => options.find(o => o.value === v))}
        onChange={newValue =>
          onChange(newValue.filter(Boolean).map(o => o!.value))
        }
      />
    </div>
  );
};
