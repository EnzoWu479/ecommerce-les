import { BookForm } from '@/validations/bookForm.schema';
import { useMutation } from '@tanstack/react-query';
import { aiData } from '../data/ai';
import { ChatMessage } from '@/types/chat';

export const useMutationAi = () => {
  const suggest = useMutation({
    mutationKey: ['ai', 'suggest'],
    mutationFn: async (book: BookForm) => {
      return aiData.suggest(book);
    }
  });
  const gramaticalImprovement = useMutation({
    mutationKey: ['ai', 'gramaticalImprovement'],
    mutationFn: async (book: BookForm) => {
      return aiData.gramaticalImprovement(book);
    }
  });

  return {
    suggest,
    gramaticalImprovement
  };
};
export const useMutationChatAI = (messages: ChatMessage[]) => {
  const bookChat = useMutation({
    mutationKey: ['ai', 'bookChat'],
    mutationFn: async (message: string) => {
      return aiData.bookSuggestion(message, messages);
    }
  });

  return bookChat;
};
