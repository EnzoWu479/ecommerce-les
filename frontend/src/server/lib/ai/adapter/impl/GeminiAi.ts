import { GoogleGenerativeAI, HarmCategory } from '@google/generative-ai';
import { AIAdapter } from '../interface';
import { ENV } from '@/config/env';

const genAI = new GoogleGenerativeAI(ENV.geminiApiKey);

export class GeminiAi implements AIAdapter {
  async getReply(message: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();
    return text;
  }
}
