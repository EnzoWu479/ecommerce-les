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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ClientAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
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
    const isAuthenticated = await auth.authenticateClient(
      values.email,
      values.password
    );

    if (isAuthenticated) {
      router.push('/admin/auth/dashboard');
      // redirect('/admin/auth/dashboard');
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
            />
          </div>
          <Button>Fazer login</Button>
        </div>
      </form>
    </div>
  );
}
