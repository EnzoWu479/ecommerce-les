'use client';
import Link from 'next/link';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  ArrowLeftRight,
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
  Trash2,
  Users2,
  UsersRound
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Separator } from '../ui/separator';
import { Nav } from './navbar/nav';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';

interface Props {
  isCollapsed: boolean;
}

export const AdminNavigationMenu = ({ isCollapsed }: Props) => {
  return (
    <div className="h-full">
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
            href: '/admin/auth/dashboard'
          },
          {
            title: 'Clientes',
            icon: UsersRound,
            href: '/admin/auth/clientes',
          },
          {
            title: 'Produtos',
            label: '',
            icon: Target,
          },
          {
            title: 'Categorias',
            label: '',
            icon: Shapes,
          },
          {
            title: 'Vendas',
            icon: ShoppingBasket,
          },
          {
            title: 'Estoque',
            label: '',
            icon: Layers,
          },
          {
            title: 'Trocas',
            label: '',
            icon: ArrowLeftRight,
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
          }
        ]}
      />
    </div>
  );
};
