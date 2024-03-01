import { CreditCard, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class CreditCardRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreditCard) {
    return this.prisma.creditCard.create({
      data
    });
  }
  async findById(id: string) {
    return this.prisma.creditCard.findUnique({
      where: {
        id
      }
    });
  }
  async findAllByUserId(userId: string) {
    return this.prisma.creditCard.findMany({
      where: {
        client: {
          accountId: userId
        }
      }
    });
  }
  async delete(id: string) {
    return this.prisma.creditCard.delete({
      where: {
        id
      }
    });
  }
}
