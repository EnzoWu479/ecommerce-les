import { prisma } from '@/server/lib/prisma';
import { PrismaClient, TradeRequest, TradeStatus } from '@prisma/client';
import { TradeSchema } from '../validations/trade.schema';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
import { ITrade } from '@/types/trade';

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
    console.log(client);

    return this.prisma.tradeRequest.create({
      data: {
        status: TradeStatus.EM_TROCA,
        books: {
          connect: values.productsId.map(id => ({ id }))
        },
        clientId: client.client.id
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
            book: true
          }
        }
      }
    });
  }
  public async list({
    limit,
    page
  }: PageRequest): Promise<PageResponse<TradeRequest>> {
    const [total, trades] = await Promise.all([
      this.prisma.tradeRequest.count(),
      this.prisma.tradeRequest.findMany({
        take: limit,
        skip: (page - 1) * limit,
        include: {
          books: {
            include: {
              book: true
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
