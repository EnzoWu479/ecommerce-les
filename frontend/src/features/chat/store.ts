import { ICart } from '@/types/cart';
import { ChatMessage } from '@/types/chat';
import { create } from 'zustand';

export interface chatStore {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}

export const useChatStore = create<chatStore>(set => ({
  messages: [
    {
      message:
        'Olá, eu sou o assistente virtual da Livraria LerMundo. Como posso te ajudar?',
      isUser: false
    }
  ],
  setMessages: messages => set({ messages })
}));
