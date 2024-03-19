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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ClientAuthForm({ className, ...props }: UserAuthFormProps) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  async function onSubmit(formData: FormData) {
    setIsAuthenticated(true);
    ('use server');
    const isAuthenticated = await auth.authenticateAdmin(
      formData.get('email') as string,
      formData.get('password') as string
    );

    if (isAuthenticated) {
      redirect('/');
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={onSubmit}>
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
