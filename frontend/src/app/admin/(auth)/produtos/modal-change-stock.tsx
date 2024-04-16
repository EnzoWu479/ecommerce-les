import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { productData } from '@/services/data/product';
import { ResponseData } from '@/server/shared/ResponseDataImp';
import { IProduct } from '@/types/product';
import { ArrowUpLeftFromSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: IProduct;
}

export const ModalChangeStock = ({ product }: Props) => {
  const [quantity, setQuantity] = useState<number>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangeStock = async (operation: 'add' | 'remove') => {
    if (!quantity) return;
    setLoading(true);
    try {
      await productData.changeStock(
        product.id,
        operation === 'add' ? quantity : -quantity
      );
      setQuantity(0);
      dialogClose();
      router.refresh();
    } catch (error: any) {
      const response = error.response.data as ResponseData;

      toast.error(response.error || 'Erro ao alterar estoque');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <ArrowUpLeftFromSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Entre com a quantidade que deseja adicionar ou remover do estoque
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={quantity}
            onChange={e => setQuantity(Math.max(Number(e.target.value), 0))}
            disabled={loading}
            type="number"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={() => handleChangeStock('add')} disabled={loading}>
              Adicionar
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => handleChangeStock('remove')}
              disabled={loading}
            >
              Remover
            </Button>
            <DialogClose asChild>
              <Button variant={'ghost'}>Cancelar</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
