import { api } from '@/lib/axios';
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
  }
};
