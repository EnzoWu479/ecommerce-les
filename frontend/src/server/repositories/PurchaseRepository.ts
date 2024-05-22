import { PrismaClient, PurchaseStatus } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { PurchaseSchema } from '../validations/purchase.schema';
import { ICart, IProductCart } from '@/types/cart';
import { BookDTO } from './dto/BookDTO';
import { IProduct } from '@/types/product';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
import { CouponRepository } from './CouponRepository';
import { SingletonClass } from '../singleton/SingletonClass';

export class PurchaseRepository {
  private prisma: PrismaClient;
  private couponRepository: CouponRepository;
  constructor() {
    this.prisma = prisma;
    this.couponRepository = new CouponRepository();
  }

  async create({
    details,
    cart,
    totalDiscount,
    totalProducts
  }: {
    details: PurchaseSchema;
    cart: ICart;
    totalDiscount: number;
    totalProducts: number;
  }) {
    console.log(details.shipping);

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
        totalValue: Math.max(
          totalProducts + details.shipping - totalDiscount,
          0
        ),
        totalDiscount: totalDiscount,
        totalShipping: details.shipping,
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
        orderBy: {
          createdAt: 'desc'
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
        orderBy: {
          createdAt: 'desc'
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
  public async getById(id: string) {
    return this.prisma.purchase.findUnique({
      where: {
        id
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
                tradeRequest: true,
                book: {
                  include: {
                    categories: true,
                    priceGroup: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}
