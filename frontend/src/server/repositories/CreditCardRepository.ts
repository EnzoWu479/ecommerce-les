import { CreditCard, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { CreditCardFormDTO } from '@/validations/creditCard.schema';
import { CreditCardBrandRepository } from './CreditCardBrandRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
// @injectable()
export class CreditCardRepository {
  prisma: PrismaClient;
  private creditCardBrandRepository: CreditCardBrandRepository;

  constructor() {
    this.creditCardBrandRepository = new CreditCardBrandRepository();
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
        },
        ...(data.clientId && {
          client: {
            connect: {
              id: data.clientId
            }
          }
        })
      }
    });
  }
  async findById(id: string) {
    return this.prisma.creditCard.findUnique({
      where: {
        id
      },
      include: {
        brand: true
      }
    });
  }
  async findAllByUserId(userId: string) {
    return await this.prisma.creditCard.findMany({
      where: {
        client: {
          account: {
            id: userId
          }
        }
      }
    });
  }
  async listAllByClientId(
    clientId: string,
    { page, limit }: PageRequest<unknown>
  ): Promise<PageResponse<unknown>> {
    const [total, content] = await Promise.all([
      this.prisma.creditCard.count({
        where: {
          client: {
            account: {
              id: clientId
            }
          }
        }
      }),
      this.prisma.creditCard.findMany({
        where: {
          client: {
            account: {
              id: clientId
            }
          }
        },
        include: {
          brand: true,
          mainCard: true
          // mainCard: true
        },
        take: limit,
        skip: (page - 1) * limit
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      content,
      page,
      limit,
      totalPages
    };
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
