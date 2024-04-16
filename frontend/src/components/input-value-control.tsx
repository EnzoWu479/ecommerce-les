import { Minus, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface Props {
  onChange?: (value: number) => void;
  value: string | number;
  max?: number;
  min?: number;
  step?: number;
  tooltip?: string;
}
export const InputValueControl = ({
  onChange,
  tooltip,
  max,
  min = 0,
  step = 1,
  value
}: Props) => {
  const handleChange = (newValue: number) => {
    if (onChange) {
      onChange(Math.max(min, Math.min(max || Infinity, newValue)));
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="aspect-square rounded-sm border p-1"
        data-test="decrement"
        onClick={() => handleChange(Number(value) - step)}
      >
        <Minus size={18} />
      </button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-sm">{value}</span>
          </TooltipTrigger>
          {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>

      <button
        type="button"
        className="aspect-square rounded-sm border p-1"
        data-test="increment"
        onClick={() => handleChange(Number(value) + step)}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};
