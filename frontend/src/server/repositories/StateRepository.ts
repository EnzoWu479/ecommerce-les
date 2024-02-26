import { PrismaClient, State } from '@prisma/client';

export class StateRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
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
