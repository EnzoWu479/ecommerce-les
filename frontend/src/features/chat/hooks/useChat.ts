import { useMutationChatAI } from '@/services/query/useMutationAi';
import { ChatMessage } from '@/types/chat';
import { useState } from 'react';
import { useChatStore } from '../store';

export const useChat = () => {
  const { messages, setMessages } = useChatStore();
  const { mutateAsync, isPending } = useMutationChatAI();

  const sendMessage = async (message: string) => {
    if (!message.trim()) return false;
    const newMessages = [...messages];
    newMessages.push({
      message,
      isUser: true
    });
    setMessages(newMessages);
    try {
      const response = await mutateAsync(message);
      newMessages.push({
        message: response.message,
        book: response.book,
        isUser: false
      });
      setMessages(newMessages);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    messages,
    sendMessage,
    isPending
  };
};
