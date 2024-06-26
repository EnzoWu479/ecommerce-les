import { BookCategory, BookStatus, Prisma } from '@prisma/client';

export interface IBook {
  id: string;
  name: string;
  isbn: string;
  author: string;
  year: number;
  publisher: string;
  edition: string;
  numberPages: number;
  synopsis: string;
  height: number;
  width: number;
  weight: number;
  depth: number;
  priceCost: number;
  manufacturer: string;
  status: BookStatus;
  priceGroupId: string | null;
  createdAt: Date;
  updatedAt: Date;
  categories?: ICategory[];
  priceGroup: IPriceGroup | null;
  stock?: IStock | null;
}

export interface IPriceGroup {
  id: string;
  name: string;
  profitPercent: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
// Generated by https://quicktype.io

export interface IStock {
  id: string;
  bookId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
export type BookReturn = Prisma.BookGetPayload<{
  include: {
    priceGroup: true;
    categories: true;
    stock: true;
  };
}>;
