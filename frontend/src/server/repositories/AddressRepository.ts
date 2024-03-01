import { Address, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class AddressRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: Address) {
    return this.prisma.address.create({
      data
    });
  }
  async findById(id: string) {
    return this.prisma.address.findUnique({
      where: {
        id
      }
    });
  }
  async findByUserId(userId: string) {
    return this.prisma.address.findMany({
      where: {
        clientAddress: {
          client: {
            accountId: userId
          }
        }
      }
    });
  }
}
