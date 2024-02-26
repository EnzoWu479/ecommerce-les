import { City, PrismaClient } from "@prisma/client";

export class StateRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: City) {
    return this.prisma.city.create({
      data
    });
  }

  async findByName(name: string) {
    return this.prisma.city.findFirst({
      where: {
        name
      }
    });
  }
}