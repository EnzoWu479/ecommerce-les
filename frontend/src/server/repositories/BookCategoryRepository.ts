import { PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { PageRequest } from '../shared/PageRequest';

export class BookCategoryRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  public async create(data: { name: string }) {
    return this.prisma.bookCategory.create({
      data: {
        name: data.name
      }
    });
  }
  public async findById(id: string) {
    return this.prisma.bookCategory.findUnique({
      where: {
        id
      }
    });
  }
  public async findByName(name: string) {
    return this.prisma.bookCategory.findFirst({
      where: {
        name
      }
    });
  }
  public async findOrCreate(name: string) {
    const category = await this.findByName(name);
    if (category) {
      return category;
    }
    return this.create({ name });
  }
  public async update(id: string, data: { name: string }) {
    return this.prisma.bookCategory.update({
      where: {
        id
      },
      data: {
        name: data.name
      }
    });
  }
  public async list({ page, limit, search }: PageRequest<unknown>) {
    const [total, content] = await Promise.all([
      this.prisma.bookCategory.count({
        // where: where
      }),
      this.prisma.bookCategory.findMany({
        skip: (page - 1) * limit,
        take: limit
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      content
    };
  }
  public async getAll() {
    return this.prisma.bookCategory.findMany();
  }
  public async delete(id: string) {
    return this.prisma.bookCategory.delete({
      where: {
        id
      }
    });
  }
}
