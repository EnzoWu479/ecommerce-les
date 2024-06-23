import { BookDTO } from "@/server/repositories/dto/BookDTO";
import { IProduct } from "./product";

export interface ChatResponse {
  message: string;
  bookName?: string;
}
export interface ChatMessage {
  message?: string;
  bookName?: string;
  isUser: boolean;
}