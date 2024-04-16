import { IBook, ICategory, IStock } from '@/server/types/book';
import { getSellPrice } from '@/utils/getSellPrice';
import { $Enums, Book } from '@prisma/client';

export class BookDTO {
  constructor(book: IBook) {
    this.id = book.id;
    this.name = book.name;
    this.isbn = book.isbn;
    this.author = book.author;
    this.year = book.year;
    this.publisher = book.publisher;
    this.edition = book.edition;
    this.numberPages = book.numberPages;
    this.synopsis = book.synopsis;
    this.height = book.height;
    this.width = book.width;
    this.weight = book.weight;
    this.depth = book.depth;
    this.priceCost = book.priceCost;
    this.manufacturer = book.manufacturer;
    this.status = book.status;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
    this.categories = book.categories || [];
    this.stock = book.stock || null;
    this.priceSell = getSellPrice(
      book.priceCost,
      book.priceGroup?.profitPercent || 0
    );
  }
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
  priceSell: number;
  manufacturer: string;
  status: $Enums.BookStatus;
  createdAt: Date;
  updatedAt: Date;
  categories: ICategory[];
  stock: IStock | null;
}
