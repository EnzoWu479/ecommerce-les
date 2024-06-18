import { ChatMessage } from '@/types/chat';

export const MyMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div className="ml-auto w-fit text-wrap rounded-md rounded-tr-none border bg-slate-950 px-4 py-2 text-sm text-slate-50">
      {message.message}
    </div>
  );
};
