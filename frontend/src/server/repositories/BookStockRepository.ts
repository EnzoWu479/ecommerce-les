import { PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';

export class BookStockRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  public async changeStockFromProduct(productId: string, quantity: number) {
    const stock = await this.prisma.bookStock.findFirst({
      where: {
        book: {
          id: productId
        }
      }
    });
    if (!stock) throw new Error('Estoque não encontrado');
    const result = stock.quantity + quantity;
    if (result < 0) throw new Error('Estoque insuficiente');
    await this.prisma.bookStock.update({
      where: {
        id: stock.id
      },
      data: {
        quantity: stock.quantity + quantity
      }
    });
  }
}
