import { IProductCart } from '@/types/cart';
import { IClient } from '@/types/client';
import { IProductTrade, ITrade } from '@/types/trade';
import { $Enums, Prisma, PrismaClient } from '@prisma/client';
import { BookDTO } from './BookDTO';
import { IBook } from '@/server/types/book';
import { ICoupon } from '@/types/coupon';
import { TradeReturn } from '@/server/types/trade';

export class TradeDTO {
  constructor(trade: TradeReturn) {
    this.id = trade.id;
    this.clientId = trade.clientId;
    this.notificationId = trade.notificationId;
    this.couponId = trade.couponId;
    this.status = trade.status;
    this.createdAt = trade.createdAt.toISOString();
    this.updatedAt = trade.updatedAt.toISOString();
    this.books = trade.books.map(book => ({
      id: book.id,
      amount: book.amount,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      product: {
        ...book.product,
        book: new BookDTO({
          ...book.product.book,
          categories: [],
          stock: null
        }),
        amount: book.amount
      }
    }));
    this.client = {
      ...trade.client,
      birthDate: trade.client.birthDate.toISOString(),
      createdAt: trade.client.createdAt.toISOString(),
      updatedAt: trade.client.updatedAt.toISOString()
    };
    this.coupon = trade.coupon
      ? {
          ...trade.coupon,
          expiresAt: trade.coupon?.expiresAt?.toISOString() || null,
          createdAt: trade.coupon?.createdAt.toISOString(),
          updatedAt: trade.coupon?.updatedAt.toISOString()
        }
      : null;
    this.totalValue = this.books.reduce(
      (acc, book) => 
        acc + book.amount * book.product.book.priceSell,
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
  books: IProductTrade[];
  client: IClient;
  coupon: ICoupon | null;
  totalValue: number;
}
