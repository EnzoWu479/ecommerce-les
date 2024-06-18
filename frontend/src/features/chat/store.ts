import { ICart } from '@/types/cart';
import { ChatMessage } from '@/types/chat';
import { create } from 'zustand';

export interface chatStore {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}

export const useChatStore = create<chatStore>(set => ({
  messages: [],
  setMessages: messages => set({ messages })
}));
