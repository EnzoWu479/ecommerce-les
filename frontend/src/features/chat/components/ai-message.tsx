import { ChatMessage } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LittleProductCard } from '@/components/client/little-product-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const AiMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div
          className={cn(
            'mr-auto w-fit text-wrap rounded-md rounded-tl-none border bg-slate-100 px-4 py-2 text-sm text-slate-950',
            !!message.bookName && `rounded-none rounded-tr-md`
          )}
        >
          {message.message}
        </div>
        {message.bookName && (
          <Link
            href={`/pesquisa?q=${message.bookName}`}
            className="w-full rounded-b-md bg-slate-950 py-2 text-center text-sm text-white"
          >
            Pesquisar livro
          </Link>
        )}
      </div>
    </div>
  );
};
