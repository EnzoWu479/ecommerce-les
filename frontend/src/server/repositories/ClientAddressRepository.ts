import { ClientAddress, PrismaClient } from "@prisma/client";
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class ClientAddressRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async create(data: ClientAddress) {
    return this.prisma.clientAddress.create({
      data
    });
  }
  async findById(id: string) {
    return this.prisma.clientAddress.findUnique({
      where: {
        id
      }
    });
  }
  async findAllByClientId(clientId: string) {
    return this.prisma.clientAddress.findMany({
      where: {
        clientId
      }
    });
  }
  async delete(id: string) {
    return this.prisma.clientAddress.delete({
      where: {
        id
      }
    });
  }
}