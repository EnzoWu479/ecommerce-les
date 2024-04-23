'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { auth } from '@/features/authentication';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/features/authentication/auth-store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginDTO, loginSchema } from '@/validations/login.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../ui/error-message';
import { useAuthStoreClient } from '@/features/authentication/auth-store-client';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLogin?: () => void;
}

export function ClientAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { login } = useAuthStoreClient();
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  // async function onSubmit(formData: FormData) {
  //   setIsAuthenticated(true);
  //   ('use server');
  //   const isAuthenticated = await auth.authenticateAdmin(
  //     formData.get('email') as string,
  //     formData.get('password') as string
  //   );

  //   if (isAuthenticated) {
  //     redirect('/');
  //   }
  // }
  async function onSubmit(values: LoginDTO) {
    try {
      const user = await auth.authenticateClient(values.email, values.password);

      if (!!user) {
        login(user);
        router.push('/');

        // redirect('/admin/auth/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.log(error);

      toast.error('Credenciais inválidas');
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              error={errors.email?.message}
              {...register('email')}
            />
            <ErrorMessage error={errors.email?.message} />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password')}
              error={errors.password?.message}
            />
            <ErrorMessage error={errors.password?.message} />
          </div>
          <Button data-test="submit-button">Fazer login</Button>
        </div>
      </form>
    </div>
  );
}
