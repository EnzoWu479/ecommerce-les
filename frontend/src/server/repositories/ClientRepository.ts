import { Client, PrismaClient } from "@prisma/client";
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class ClientRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: Client) {
    return this.prisma.client.create({
      data
    });
  }

  async findById(id: string) {
    return this.prisma.client.findUnique({
      where: {
        id
      }
    });
  }
  async delete(id: string) {
    return this.prisma.client.delete({
      where: {
        id
      }
    });
  }
}