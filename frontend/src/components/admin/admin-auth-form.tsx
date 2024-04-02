'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { auth } from '@/features/authentication';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginDTO, loginSchema } from '@/validations/login.schema';
import { toast } from 'react-toastify';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  async function onSubmit(values: LoginDTO) {
    const isAuthenticated = await auth.authenticateAdmin(
      values.email,
      values.password
    );

    if (isAuthenticated) {
      router.push('/admin/dashboard');
      // redirect('/admin/dashboard');
    } else {
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
              {...register('email')}
            />
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
            />
          </div>
          <Button>Fazer login</Button>
        </div>
      </form>
    </div>
  );
}
