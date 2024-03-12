import { City, PrismaClient } from "@prisma/client";
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
@injectable()
export class CityRepository {
  prisma: PrismaClient;

  constructor() {
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