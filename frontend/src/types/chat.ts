import { BookDTO } from "@/server/repositories/dto/BookDTO";
import { IProduct } from "./product";

export interface ChatResponse {
  message: string;
  book?: IProduct;
}
export interface ChatMessage {
  message?: string;
  book?: IProduct;
  isUser: boolean;
}