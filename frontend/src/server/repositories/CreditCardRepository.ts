import { CreditCard, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { CreditCardFormDTO } from '@/validations/creditCard.schema';
import { CreditCardBrandRepository } from './CreditCardBrandRepository';
import { SingletonClass } from '../singleton/SingletonClass';
// @injectable()
export class CreditCardRepository {
  prisma: PrismaClient;
  private creditCardBrandRepository: CreditCardBrandRepository;

  constructor() {
    this.creditCardBrandRepository = SingletonClass.getInstance(
      CreditCardBrandRepository
    );
    this.prisma = prisma;
  }

  async create(data: CreditCardFormDTO) {
    const brand = await this.creditCardBrandRepository.findOrCreateByName(
      data.brand
    );
    return this.prisma.creditCard.create({
      data: {
        cvv: data.cvv,
        name: data.name,
        expDate: data.expiration,
        holderName: data.holderName,
        number: data.number,
        brand: {
          connect: {
            id: brand.id
          }
        }
      }
    });
  }
  async findById(id: string) {
    return this.prisma.creditCard.findUnique({
      where: {
        id
      }
    });
  }
  async findAllByUserId(userId: string) {
    return this.prisma.creditCard.findMany({
      where: {
        client: {
          accountId: userId
        }
      }
    });
  }

  async update(id: string, data: CreditCardFormDTO) {
    const brand = await this.creditCardBrandRepository.findOrCreateByName(
      data.brand
    );
    return await this.prisma.creditCard.update({
      where: {
        id
      },
      data: {
        cvv: data.cvv,
        name: data.name,
        expDate: data.expiration,
        holderName: data.holderName,
        number: data.number,
        brand: {
          connect: {
            id: brand.id
          }
        }
      }
    });
  }
  async delete(id: string) {
    return this.prisma.creditCard.delete({
      where: {
        id
      }
    });
  }
}
