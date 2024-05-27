'use client';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { formaters } from '@/helpers/formaters';
import { productData } from '@/services/data/product';
import { IProduct, IProductStatusReason } from '@/types/product';
import {
  BookStatusReason,
  bookStatusReasonSchema
} from '@/validations/bookStatusReason.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  active: boolean;
  product: IProduct;
  reason?: IProductStatusReason;
}

export const ActivatePopOver = ({ active, product, reason }: Props) => {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<BookStatusReason>({
    resolver: zodResolver(bookStatusReasonSchema)
  });
  const onSubmit = async ({ reason }: BookStatusReason) => {
    try {
      await productData.changeStatus(product.id, {
        status: active ? BookStatus.INACTIVE : BookStatus.ACTIVE,
        reason
      });
      if (active) {
        toast.success('Produto desativado');
      } else {
        toast.success('Produto ativado');
      }
      reset();
      router.refresh();
    } catch (error) {
      toast.error('Erro ao desativar produto');
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <span className="hover:underline">{active ? 'Ativo' : 'Inativo'}</span>
      </PopoverTrigger>
      <PopoverContent>
        {!!reason && (
          <>
            <div>
              <h2>Motivo para estar {active ? 'Ativo' : 'Inativo'}</h2>
              <p className="mb-2 text-xs">{formaters.date(reason.createdAt)}</p>
              <p className="text-sm text-slate-700">{reason?.reason}</p>
            </div>
            <div className="mx-[-1rem] my-2 border-b" />
          </>
        )}
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2>{active ? 'Desativar' : 'Ativar'} produto</h2>
          <Textarea
            placeholder={`Digite o motivo da ${active ? 'desativação' : 'ativação'}`}
            className="text-sm"
            {...register('reason')}
            error={errors.reason?.message}
          />
          <ErrorMessage error={errors.reason?.message} />
          <Button type="submit">{active ? 'Desativar' : 'Ativar'}</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
