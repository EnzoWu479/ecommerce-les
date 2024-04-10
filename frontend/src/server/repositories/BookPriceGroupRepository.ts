import { PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { BookCategoryRepository } from './BookCategoryRepository';
import { SingletonClass } from '../singleton/SingletonClass';

export class BookPriceGroupRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  public async create(data: { name: string; profitPercent: number }) {
    return this.prisma.bookPriceGroup.create({
      data: {
        name: data.name,
        profitPercent: data.profitPercent
      }
    });
  }
  public async findById(id: string) {
    return this.prisma.bookPriceGroup.findUnique({
      where: {
        id
      }
    });
  }
  public async findByName(name: string) {
    return this.prisma.bookPriceGroup.findFirst({
      where: {
        name
      }
    });
  }
  public async update(
    id: string,
    data: { name: string; profitPercent: number }
  ) {
    return this.prisma.bookPriceGroup.update({
      where: {
        id
      },
      data: {
        name: data.name,
        profitPercent: data.profitPercent
      }
    });
  }
  public async getAll() {
    return this.prisma.bookPriceGroup.findMany();
  }
  public async delete(id: string) {
    return this.prisma.bookPriceGroup.delete({
      where: {
        id
      }
    });
  }
}
