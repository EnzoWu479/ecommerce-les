'use client';

import AuthProvider from '@/hooks/useAuth';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <AuthProvider>{children}</AuthProvider>
);
