'use client';
import Link from 'next/link';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  ArrowLeftRight,
  CircleDollarSign,
  File,
  Inbox,
  Layers,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  Shapes,
  ShoppingBasket,
  ShoppingCart,
  Target,
  TicketPercent,
  Trash2,
  Users2,
  UsersRound
} from 'lucide-react';
import { ResizablePanel, ResizablePanelGroup } from '../../ui/resizable';
import { Separator } from '../../ui/separator';
import { Nav } from './nav';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  isCollapsed: boolean;
}

export const AdminNavigationMenu = ({ isCollapsed }: Props) => {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/admin');
  };
  return (
    <div className="h-[100dvh]">
      <div
        className={cn(
          'flex h-[52px] items-center gap-2',
          isCollapsed ? 'h-[52px] justify-center' : 'px-2'
        )}
      >
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/75583251?s=400&u=5db2fc7b5b78e3846f0880bb3fb5622bd1aa6326&v=4" />
        </Avatar>
        {!isCollapsed && <span className="text-sm">Administrador</span>}
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Dashboard',
            icon: LayoutDashboard,
            href: '/admin/dashboard'
          },
          {
            title: 'Clientes',
            icon: UsersRound,
            href: '/admin/clientes'
          },
          {
            title: 'Produtos',
            label: '',
            icon: Target,
            href: '/admin/produtos'
          },
          {
            title: 'Vendas',
            href: '/admin/vendas',
            icon: ShoppingBasket
          },
          {
            title: 'Cupons',
            label: '',
            href: '/admin/cupons',
            icon: TicketPercent
          },
          {
            title: 'Trocas',
            label: '',
            href: '/admin/trocas',
            icon: ArrowLeftRight
          }
        ]}
      />
      <Separator className="flex" />

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Logout',
            icon: LogOut,
            onClick: handleLogout
          }
        ]}
      />
    </div>
  );
};
