'use client';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { placeholderImage } from '@/lib/placeholderImage';
import { useAuthStoreClient } from '@/features/authentication/auth-store-client';

export const ProfileNavigation = () => {
  const { user, logout } = useAuthStoreClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative z-10 -mb-px flex h-full items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 outline-none transition-colors duration-200 ease-out hover:text-gray-800">
        <div className="flex items-center  gap-2 rounded-3xl border p-1">
          <Avatar>
            <AvatarImage
              src={placeholderImage({
                preview: user?.client?.name[0] ?? 'U',
                size: 40
              })}
            />
          </Avatar>
          <span className="max-sm:sr-only">{user?.client?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-100">
          <Link
            href={{
              pathname: '/enderecos'
            }}
          >
            Endereços
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-100">
          <Link
            href={{
              pathname: '/cartoes-de-credito'
            }}
          >
            Cartões de crédito
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-100">
          <Link
            href={{
              pathname: '/compras'
            }}
          >
            Compras
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-100">
          <Link
            href={{
              pathname: '/alterar-senha'
            }}
          >
            Alterar senha
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer hover:bg-slate-100"
        >
          <button type="button" onClick={logout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
