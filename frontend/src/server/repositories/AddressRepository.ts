import { Address, PrismaClient } from '@prisma/client';

export class AddressRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
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
