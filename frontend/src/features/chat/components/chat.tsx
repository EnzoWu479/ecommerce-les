import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '../hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import { AiMessage } from './ai-message';
import { MyMessage } from './my-message';
import { LoadingMessage } from './loading-message';

interface Props {
  isOpen: boolean;
}

export const Chat = ({ isOpen }: Props) => {
  const [message, setMessage] = useState('');
  const refScroll = useRef<HTMLDivElement>(null);
  const { isPending, messages, sendMessage } = useChat();

  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [messages])
  return (
    <div className={cn(`grid grid-rows-[0fr]`, isOpen && 'grid-rows-1')}>
      <div className="overflow-hidden">
        <div className="flex h-80 w-80 flex-col justify-between gap-2 border border-t-0 bg-white p-4">
          <div
            className=" flex w-full flex-col gap-2 overflow-auto px-2"
            ref={refScroll}
          >
            {messages.map((message, index) => (
              <>
                {message.isUser ? (
                  <MyMessage message={message} />
                ) : (
                  <AiMessage message={message} />
                )}
              </>
            ))}
            {isPending && <LoadingMessage />}
          </div>
          <form
            className="flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              if (isPending) return;
              sendMessage(message);
              setMessage('');
            }}
          >
            <Input
              className="h-12 max-h-12 min-h-0 resize-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button className="h-12" disabled={isPending || !message.trim()}>
              <SendHorizonal />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
