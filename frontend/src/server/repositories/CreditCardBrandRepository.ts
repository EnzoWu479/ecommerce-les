import { CreditCardBrand, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
// @injectable()
export class CreditCardBrandRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  async findAll() {
    return this.prisma.creditCardBrand.findMany();
  }
  async findOne(id: string) {
    return this.prisma.creditCardBrand.findUnique({
      where: {
        id
      }
    });
  }
  async findByName(name: string) {
    return this.prisma.creditCardBrand.findFirst({
      where: {
        name
      }
    });
  }
  async create(data: CreditCardBrand) {
    return this.prisma.creditCardBrand.create({
      data
    });
  }
  async findOrCreateByName(name: string) {
    const brand = await this.findByName(name);
    if (brand) {
      return brand;
    }
    return this.prisma.creditCardBrand.create({
      data: {
        name
      }
    });
  }
}
