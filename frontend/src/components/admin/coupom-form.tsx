'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CouponFormSchema,
  couponFormSchema
} from '@/validations/couponForm.schema';
import { ErrorMessage } from '../ui/error-message';
import { couponData } from '@/services/data/coupon';

export const CoupomForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<CouponFormSchema>({
    resolver: zodResolver(couponFormSchema)
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async value => {
    try {
      await couponData.create(value);
      toast.success('Cupom salvo com sucesso');
      router.back();
    } catch (error) {
      toast.error('Erro ao salvar cupom');
    }
  });
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-6">
      <div className="w-96">
        <Label>Código de cupom</Label>
        <Input {...register('code')} error={errors.code?.message} />
        <ErrorMessage error={errors.code?.message} />
      </div>
      <div className="w-96">
        <Label>Valor do cupom</Label>
        <Input
          {...register('value')}
          error={errors.value?.message}
          type="number"
          step="0.1"
        />
        <ErrorMessage error={errors.value?.message} />
      </div>
      <div className="w-96">
        <Label>Expira em</Label>
        <Input
          type="date"
          {...register('expiresAt')}
          error={errors.expiresAt?.message}
        />
        <ErrorMessage error={errors.expiresAt?.message} />
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
