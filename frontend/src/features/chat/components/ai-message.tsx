import { ChatMessage } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LittleProductCard } from '@/components/client/little-product-card';

export const AiMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div>
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="mr-auto w-fit text-wrap rounded-md rounded-tl-none border bg-slate-100 px-4 py-2 text-sm text-slate-950">
          {message.message}
        </div>
      </div>
      <div className="mt-2">
        {message.book && <LittleProductCard product={message?.book} />}
      </div>
    </div>
  );
};
