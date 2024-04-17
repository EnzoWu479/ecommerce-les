import { IProductCart } from '@/types/cart';
import { IClient } from '@/types/client';
import { ITrade } from '@/types/trade';
import { $Enums } from '@prisma/client';
import { BookDTO } from './BookDTO';
import { IBook } from '@/server/types/book';
import { ICoupon } from '@/types/coupon';

export class TradeDTO implements ITrade {
  constructor(trade: ITrade) {
    this.id = trade.id;
    this.clientId = trade.clientId;
    this.notificationId = trade.notificationId;
    this.couponId = trade.couponId;
    this.status = trade.status;
    this.createdAt = trade.createdAt;
    this.updatedAt = trade.updatedAt;
    this.books = trade.books;
    this.client = trade.client;
    this.coupon = trade.coupon;
    this.totalValue = trade.books.reduce(
      (acc, book) =>
        acc + book.amount * new BookDTO(book.book as any as IBook).priceSell,
      0
    );
  }

  id: string;
  clientId: string;
  notificationId: string | null;
  couponId: string | null;
  status: $Enums.TradeStatus;
  createdAt: string;
  updatedAt: string;
  books: IProductCart[];
  client: IClient;
  coupon: ICoupon | null;
  totalValue: number;
}
