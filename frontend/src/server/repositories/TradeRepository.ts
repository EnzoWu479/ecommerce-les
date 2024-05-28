import { prisma } from '@/server/lib/prisma';
import {
  PrismaClient,
  PurchaseStatus,
  TradeRequest,
  TradeStatus
} from '@prisma/client';
import { TradeSchema } from '../validations/trade.schema';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
import { ITrade } from '@/types/trade';
import { TradeReturn } from '../types/trade';

export class TradeRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async create(userId: string, values: TradeSchema) {
    console.log(userId);
    console.log(values);

    const client = await this.prisma.account.findUnique({
      where: {
        id: userId
      },
      include: {
        client: true
      }
    });

    if (!client || !client.client) {
      throw new Error('Client not found');
    }
    const purchase = await this.prisma.purchase.findFirst({
      where: {
        cart: {
          productCart: {
            some: {
              id: {
                in: values.productsId.map(p => p.id)
              }
            }
          }
        }
      }
    });
    if (!purchase) {
      throw new Error('Compra não encontrada');
    }
    if (purchase.status !== PurchaseStatus.ENTREGUE) {
      throw new Error('Compra não entregue');
    }

    return this.prisma.tradeRequest.create({
      data: {
        status: TradeStatus.EM_TROCA,
        books: {
          // connect: values.productsId.map(id => ({ id }))
          createMany: {
            data: values.productsId.map(p => ({
              // product: {
              //   connect: {
              //     id: p.id
              //   }
              // },
              productId: p.id,
              amount: p.amount
            }))
          }
        },
        clientId: client.client.id
      },
      include: {
        books: {
          include: {
            product: {
              include: {
                book: {
                  include: {
                    priceGroup: true
                  }
                }
              }
            }
          }
        },
        client: true,
        coupon: true
      }
    });
  }
  async updateStatus(id: string, status: TradeStatus) {
    return this.prisma.tradeRequest.update({
      where: {
        id
      },
      data: {
        status
      },
      include: {
        books: {
          include: {
            product: {
              include: {
                book: {
                  include: {
                    priceGroup: true
                  }
                }
              }
            }
          }
        },
        client: true,
        coupon: true
      }
    });
  }
  public async list({
    limit,
    page
  }: PageRequest): Promise<PageResponse<TradeReturn>> {
    const [total, trades] = await Promise.all([
      this.prisma.tradeRequest.count(),
      this.prisma.tradeRequest.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          books: {
            include: {
              product: {
                include: {
                  book: {
                    include: {
                      priceGroup: true
                    }
                  }
                }
              }
            }
          },
          client: true,
          coupon: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      content: trades,
      limit,
      page,
      totalPages
    };
  }
}
