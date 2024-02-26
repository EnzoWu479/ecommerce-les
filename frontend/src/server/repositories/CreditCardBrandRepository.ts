import { CreditCardBrand, PrismaClient } from "@prisma/client";

export class CreditCardBrandRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
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
}