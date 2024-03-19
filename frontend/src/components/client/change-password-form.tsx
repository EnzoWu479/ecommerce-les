'use client';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { useAuthStore } from '@/features/authentication/auth-store';

export const ChangePasswordForm = () => {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = handleSubmit(async () => {
    toast({
      title: 'Senha alterada com sucesso',
      description: 'A sua senha foi alterada com sucesso'
    });
    setIsAuthenticated(false);
    router.push('/login');
  });
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-6">
      <div className="w-96">
        <Label>Senha antiga</Label>
        <Input type="password" />
      </div>
      <div className="w-96">
        <Label>Nova senha</Label>
        <Input type="password" />
      </div>
      <div className="w-96">
        <Label>Confirmar nova senha</Label>
        <Input type="password" />
      </div>
      <Button type="submit">Alterar</Button>
    </form>
  );
};
