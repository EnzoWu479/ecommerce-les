import { Listbox } from '@headlessui/react';
import { IOption } from '@/types/search';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface Props {
  options: IOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const SelectMultiple = ({ options, value, onChange }: Props) => {
  return (
    <Listbox value={value} onChange={onChange} multiple>
      <Listbox.Button
        className={
          'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
        }
      >
        <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {value
            .map(person => options.find(o => o.value === person)?.label)
            .join(', ') || 'Selecione'}
        </div>

        <CaretSortIcon className="h-4 w-4 min-w-4 opacity-50" />
      </Listbox.Button>
      <Listbox.Options
        className={
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        }
      >
        {options.map(option => (
          <Listbox.Option key={option.value} value={option.value}>
            {({ selected }) => (
              <div
                className={cn(
                  'data-[disabled] :pointer-events-none relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50',
                  selected && 'bg-slate-100'
                )}
              >
                {option.label}
                {selected && (
                  <span className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center">
                    <>
                      <CheckIcon className="h-4 w-4" />
                    </>
                  </span>
                )}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
