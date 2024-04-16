import { IAddress } from './address';
import { ICart } from './cart';

export interface IPurchase {
  id: string;
  cartId: string;
  totalValue: number;
  totalDiscount: number;
  purchasedAt: string;
  status: string;
  addressId: string;
  createdAt: string;
  updatedAt: string;
  address: IAddress;
  cart: ICart;
}
