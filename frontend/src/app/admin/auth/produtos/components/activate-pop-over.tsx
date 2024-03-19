'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  active: boolean;
}

export const ActivatePopOver = ({ active }: Props) => {
  const { toast } = useToast();
  const handleSubmit = () => {
    if (active) {
      toast({
        title: 'Produto desativado',
        description: 'Produto desativado com sucesso'
      });
    } else {
      toast({
        title: 'Produto ativado',
        description: 'Produto ativado com sucesso'
      });
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <span className="hover:underline">{active ? 'Ativo' : 'Inativo'}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h2>{active ? 'Desativar' : 'Ativar'} produto</h2>
          <Textarea
            placeholder={`Digite o motivo da ${active ? 'desativação' : 'ativação'}`}
          />
          <Button type="button" onClick={handleSubmit}>
            {active ? 'Desativar' : 'Ativar'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
