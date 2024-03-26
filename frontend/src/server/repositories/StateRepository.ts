import { PrismaClient, State } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
// @injectable()
export class StateRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async findByUf(uf: string) {
    return this.prisma.state.findFirst({
      where: {
        uf
      }
    });
  }
  async findOrCreateByUf(uf: string) {
    const state = await this.findByUf(uf);
    if (state) {
      return state;
    }
    return this.prisma.state.create({
      data: {
        uf
      }
    });
  }
}
