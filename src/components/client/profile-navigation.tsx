import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { placeholderImage } from '@/lib/placeholderImage';

export const ProfileNavigation = () => {
  const profileInfos = {
    name: 'John Doe'
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative z-10 -mb-px flex h-full items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 outline-none transition-colors duration-200 ease-out hover:text-gray-800">
        <div className="flex items-center  gap-2 rounded-3xl border p-1">
          <Avatar>
            <AvatarImage
              src={placeholderImage({
                preview: profileInfos.name[0],
                size: 40
              })}
            />
          </Avatar>

          {profileInfos.name}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className='hover:bg-slate-100 cursor-pointer'>
          <Link
            href={{
              pathname: '/livros',
              query: { category: 'Ação' }
            }}
          >
            Endereços
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='hover:bg-slate-100 cursor-pointer'>
          <Link
            href={{
              pathname: '/livros',
              query: { category: 'Ação' }
            }}
          >
            Cartões de crédito
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='hover:bg-slate-100 cursor-pointer'>
          <Link
            href={{
              pathname: '/livros',
              query: { category: 'Ação' }
            }}
          >
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
