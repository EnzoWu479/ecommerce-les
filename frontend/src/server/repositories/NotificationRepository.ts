import { NotificationType, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { NotificationSchema } from '../validations/notification.schema';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
export class NotificationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  public async create(
    values: NotificationSchema & {
      clientId: string;
      tradeId?: string;
      couponId?: string;
    }
  ) {
    return this.prisma.notification.create({
      data: {
        title: values.title,
        message: values.message,
        type: values.type,
        clientId: values.clientId,
        tradeId: values.tradeId
      }
    });
  }
  public async list({page, limit, clientId }: PageRequest & {clientId: string}): Promise<PageResponse> {
    const [content, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: {
          clientId
        },
        orderBy: {
          createdAt: "desc"
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.notification.count({
        where: {
          clientId
        }
      })
    ])
    return {
      content,
      page,
      limit,
      total,
      totalPages: Math.ceil(total/limit)
    }
  } 
  public async update(
    id: string,
    values: {
      view?: boolean
    }
  ) {
    return this.prisma.notification.update({
      where: {
        id
      },
      data: {
        read: values.view,
      }
    });
  }
  public async delete(id: string) {
    await this.prisma.notification.delete({
      where: {
        id,
      }
    })
  }
  public async deleteByTrade(tradeId: string) {
    await this.prisma.notification.delete({
      where: {
        tradeId,
      }
    })
  }
}
