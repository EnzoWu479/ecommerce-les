import { ClientNavigationMenu } from '@/components/client/client-navigation-menu';
import { ShoppingCart } from '@/components/client/shopping-cart';
import { PropsWithChildren } from 'react';

export const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ClientNavigationMenu />
      {children}
      <ShoppingCart />
    </>
  );
};
