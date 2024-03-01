import { PrismaClient, State } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class StateRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async findOne(id: string) {
    return this.prisma.state.findUnique({
      where: {
        id
      }
    });
  }
  async findByUf(uf: string) {
    return this.prisma.state.findFirst({
      where: {
        uf
      }
    });
  }
  async create(data: State) {
    return this.prisma.state.create({
      data
    });
  }
}
