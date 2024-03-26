'use client';

import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordSchema,
  changePasswordSchema
} from '@/server/validations/changePassword.schema';
import { ErrorMessage } from './ui/error-message';
import { useToast } from './ui/use-toast';
import { api } from '@/lib/axios';

interface Props {
  id: string;
}

export const ChangePasswordForm = ({ id }: Props) => {
  const { toast } = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      accountId: ''
    }
  });

  console.log(errors);

  const onSubmit = handleSubmit(async (data: ChangePasswordSchema) => {
    try {
      await api.put(`/api/clients/${id}/password`, data);
      toast({
        title: 'Senha alterada com sucesso',
        description: 'A senha do cliente foi alterada com sucesso'
      });
      reset({
        accountId: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: 'Erro ao alterar senha',
        description: 'Não foi possível alterar a senha do cliente',
        variant: 'destructive'
      });
    }
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl">Alterar senha</h2>
      <form className="w-96 space-y-2" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="current-password">Senha atual</Label>
          <Input
            type="password"
            id="current-password"
            {...register('password')}
            error={errors.password?.message as string}
          />
          <ErrorMessage error={errors?.password?.message as string} />
        </div>
        <div>
          <Label htmlFor="new-password">Nova senha</Label>
          <Input
            type="password"
            id="new-password"
            {...register('newPassword')}
            error={errors.newPassword?.message as string}
          />
          <ErrorMessage error={errors?.newPassword?.message as string} />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirmar nova senha</Label>
          <Input
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message as string}
          />
          <ErrorMessage error={errors?.confirmPassword?.message as string} />
        </div>
        <Button type="submit">Alterar senha</Button>
      </form>
    </div>
  );
};
