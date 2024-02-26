import { Account, PrismaClient } from "@prisma/client";

export class AccountRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Account) {
    return this.prisma.account.create({
      data
    });
  }

  async findById(id: string) {
    return this.prisma.account.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.account.findFirst({
      where: {
        email
      }
    });
  }
  async delete(id: string) {
    return this.prisma.account.delete({
      where: {
        id
      }
    });
  }
}