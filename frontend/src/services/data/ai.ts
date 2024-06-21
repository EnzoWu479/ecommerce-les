import { api } from '@/lib/axios';
import { BookDTO } from '@/server/repositories/dto/BookDTO';
import { ChatMessage, ChatResponse } from '@/types/chat';
import { IProduct } from '@/types/product';
import { BookForm } from '@/validations/bookForm.schema';

export const aiData = {
  async suggest(book: BookForm) {
    const { data } = await api.get<{
      name: string;
      synopsis: string;
      categories: string[];
      author: string;
    }>(`/api/ai/suggest`, {
      params: {
        name: book.name || undefined,
        synopsis: book.synopsis || undefined,
        categories: book.categories || undefined
      }
    });
    return data;
  },
  async gramaticalImprovement(book: BookForm) {
    const { data } = await api.get<string>(`/api/ai/gramatical-improvement`, {
      params: {
        message: book.synopsis
      }
    });
    return data;
  },
  async complementarBookSuggestion() {
    const { data } = await api.get<IProduct[]>('/api/ai/cart');
    return data;
  },
  async bookSuggestion(message: string, messages: ChatMessage[]) {
    const { data } = await api.post<ChatResponse>('/api/ai/chat-assist', {
      message,
      messages: messages.slice(-3),
    });
    return data;
  }
};
