'use client';
import { useState } from 'react';
import { ChatAssistentTrigger } from './trigger';
import { Chat } from './chat';

export const ChatAssistent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-0 right-20 shadow-2xl">
      <ChatAssistentTrigger toggleOpen={() => setIsOpen(prev => !prev)} />
      <Chat isOpen={isOpen} />
    </div>
  );
};
