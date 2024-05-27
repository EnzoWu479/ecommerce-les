import { BookStatus, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { BookRepository } from './BookRepository';

export class BookStockRepository {
  private prisma: PrismaClient;
  private bookRepository: BookRepository;
  constructor() {
    this.prisma = prisma;
    this.bookRepository = new BookRepository();
  }
  public async changeStockFromProduct(productId: string, quantity: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: productId
      },
      include: {
        stock: true
      }
    });
    const stock = book?.stock;
    if (!stock) throw new Error('Estoque não encontrado');
    const result = stock.quantity + quantity;
    if (result < 0) throw new Error('Estoque insuficiente');
    if (result === 0) {
      await this.bookRepository.updateStatus(productId, {
        status: BookStatus.INACTIVE,
        reason: 'Estoque zerado'
      });
    }
    await this.prisma.bookStock.update({
      where: {
        id: stock.id
      },
      data: {
        quantity: result
      }
    });
  }
}
