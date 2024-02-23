import { Minus, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface Props {
  onIncrement?: () => void;
  onDecrement?: () => void;
  value: string | number;
  tooltip?: string;
}
export const InputValueControl = ({
  onDecrement,
  onIncrement,
  tooltip,
  value
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="aspect-square rounded-sm border p-1"
        onClick={onDecrement}
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
        onClick={onIncrement}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};
