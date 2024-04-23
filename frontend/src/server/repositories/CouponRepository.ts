import { CouponStatus, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { CouponSchema } from '../validations/coupon.schema';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
export class CouponRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  public async create(
    values: CouponSchema & {
      tradeId?: string;
      purchaseId?: string;
    }
  ) {
    return this.prisma.coupon.create({
      data: {
        code: values.code,
        value: values.value,
        type: values.type,
        expiresAt: values.expiresAt,
        status: values.status,
        tradeId: values.tradeId,
        purchaseId: values.purchaseId
      }
    });
  }
  public async getById(id: string) {
    return this.prisma.coupon.findUnique({
      where: {
        id
      }
    });
  }
  public async getByCode(code: string) {
    return this.prisma.coupon.findUnique({
      where: {
        code
      }
    });
  }
  public async list({
    limit,
    page
  }: PageRequest<unknown>): Promise<PageResponse<unknown>> {
    const [total, coupons] = await Promise.all([
      this.prisma.coupon.count(),
      this.prisma.coupon.findMany({
        take: limit,
        skip: (page - 1) * limit
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      content: coupons,
      limit,
      page,
      totalPages
    };
  }
  public async updateStatus(id: string, status: CouponStatus) {
    return this.prisma.coupon.update({
      where: {
        id
      },
      data: {
        status
      }
    });
  }
}
