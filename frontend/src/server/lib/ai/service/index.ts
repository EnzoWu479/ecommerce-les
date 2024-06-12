import { AI_ADAPTER } from '@/config/constants';
import { AIAdapter } from '../adapter/interface';
import { badWordsPrompt } from '../prompts/bad-words-prompt';
import { IBook } from '@/server/types/book';
import { bookDetailsSuggestionPrompt } from '../prompts/book-details-suggestion-prompt';
import { BookFormData } from '@/validations/bookForm.schema';
import { gramaticalImprovementPrompt } from '../prompts/gramatical-improvement-prompt';

export class AiService {
  private aiAdapter: AIAdapter;

  constructor() {
    this.aiAdapter = AI_ADAPTER;
  }

  async verifyMessage(message: string) {
    if (message === '') return false;
    try {
      const answer = await this.aiAdapter.getReply(
        badWordsPrompt({ description: message })
      );
      return answer.toLowerCase() === 'true';
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          '[GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY'
        ) {
          return true;
        }
      }
      return false;
    }
  }
  async suggest(book: Partial<BookFormData>) {
    if (
      book.name === '' &&
      book.categories?.length === 0 &&
      book.synopsis === ''
    ) {
      throw new Error('Book is empty');
    }
    return await this.aiAdapter.getReply(bookDetailsSuggestionPrompt(book));
  }

  async gramaticalImprovement(message: string) {
    if (message === '') return '';
    return await this.aiAdapter.getReply(
      gramaticalImprovementPrompt({ description: message })
    );
  }
}
