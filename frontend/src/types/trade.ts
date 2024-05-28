import { TradeStatus } from '@prisma/client';
import { IProductCart } from './cart';
import { IClient } from './client';
import { ICoupon } from './coupon';

export interface ITrade {
  id: string;
  clientId: string;
  notificationId: string | null;
  couponId: string | null;
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
  books: IProductTrade[];
  client: IClient;
  coupon: ICoupon | null;
}
export interface IProductTrade {
  id: string;
  product: IProductCart;
  amount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
