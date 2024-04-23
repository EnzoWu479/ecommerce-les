import { PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { NotificationSchema } from '../validations/notification.schema';
export class NotificationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  public async create(
    values: NotificationSchema & {
      clientId: string;
      tradeId?: string;
      couponId: string;
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
}
