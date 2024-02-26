import { CreditCard, PrismaClient } from '@prisma/client';

export class CreditCardRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
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
