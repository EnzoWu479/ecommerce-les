import { PrismaClient, PurchaseStatus } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { PurchaseSchema } from '../validations/purchase.schema';
import { ICart, IProductCart } from '@/types/cart';
import { BookDTO } from './dto/BookDTO';
import { IProduct } from '@/types/product';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';

export class PurchaseRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async create({ details, cart }: { details: PurchaseSchema; cart: ICart }) {
    const total = cart.productCart.reduce((acc, product) => {
      return acc + product.book.priceSell * product.amount;
    }, 0);

    return this.prisma.purchase.create({
      data: {
        address: {
          connect: {
            id: details.addressId
          }
        },
        cards: {
          createMany: {
            data: details.cards.map(card => ({
              cardId: card.cardId,
              percent: card.percent
            }))
          }
        },
        totalValue: total,
        totalDiscount: 0,
        cart: {
          connect: {
            id: cart.id
          }
        },
        purchasedAt: new Date(),
        status: PurchaseStatus.EM_PROCESSAMENTO,
        coupons: {
          connect: []
        }
        // coupons: {
        //   createMany: {
        //     data: data.coupons.map(coupon => ({
        //       coupon: {
        //         connect: {
        //           id: coupon.couponId
        //         }
        //       },
        //       type: coupon.type
        //     }))
        //   }
        // }
      }
    });
  }
  async listByUserId(
    { page, limit }: PageRequest<unknown>,
    userId?: string
  ): Promise<PageResponse<unknown>> {
    const [purchases, total] = await Promise.all([
      this.prisma.purchase.findMany({
        where: {
          cart: {
            client: {
              account: {
                id: userId
              }
            }
          }
        },
        include: {
          address: {
            include: {
              clientAddress: true,
              city: {
                include: {
                  state: true
                }
              }
            }
          },
          cart: {
            include: {
              productCart: {
                include: {
                  book: true
                }
              }
            }
          }
        },
        take: limit,
        skip: (page - 1) * limit
      }),
      this.prisma.purchase.count({
        where: {
          cart: {
            client: {
              account: {
                id: userId
              }
            }
          }
        }
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      content: purchases,
      total,
      page,
      limit,
      totalPages
    };
  }
  async listAll({
    page,
    limit
  }: PageRequest<unknown>): Promise<PageResponse<unknown>> {
    const [purchases, total] = await Promise.all([
      this.prisma.purchase.findMany({
        include: {
          address: {
            include: {
              clientAddress: true,
              city: {
                include: {
                  state: true
                }
              }
            }
          },
          cart: {
            include: {
              client: {
                include: {
                  account: true
                }
              },
              productCart: {
                include: {
                  book: true
                }
              }
            }
          }
        },
        take: limit,
        skip: (page - 1) * limit
      }),
      this.prisma.purchase.count()
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      content: purchases,
      total,
      page,
      limit,
      totalPages
    };
  }
  public async updateStatus(id: string, status: PurchaseStatus) {
    return this.prisma.purchase.update({
      where: {
        id
      },
      data: {
        status
      }
    });
  }
}
