import { BookStatus, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { BookCategoryRepository } from './BookCategoryRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { BookForm, BookFormData } from '@/validations/bookForm.schema';
import { PageRequest } from '../shared/PageRequest';

export class BookRepository {
  prisma: PrismaClient;
  bookCategoryRepository: BookCategoryRepository;
  constructor() {
    this.prisma = prisma;
    this.bookCategoryRepository = new BookCategoryRepository();
  }
  public async create(data: BookFormData) {
    return this.prisma.book.create({
      data: {
        name: data.name,
        isbn: data.isbn,
        manufacturer: data.manufacturer,
        categories: {
          // connect: categories.map(category => ({
          //   id: category.id
          // }))
          connectOrCreate: data.categories.map(category => ({
            where: {
              name: category
            },
            create: {
              name: category
            }
          }))
        },
        stock: {
          create: {
            quantity: 0
          }
        },
        author: data.author,
        year: data.year,
        depth: data.depth,
        edition: data.edition,
        height: data.height,
        numberPages: data.numberPages,
        priceCost: data.priceCost,
        publisher: data.publisher,
        synopsis: data.synopsis,
        weight: data.weight,
        width: data.width,
        priceGroupId: data.priceGroupId
      }
    });
  }
  public async findById(id: string) {
    return this.prisma.book.findUnique({
      where: {
        id
      },
      include: {
        categories: true,
        priceGroup: true,
        stock: true
      }
    });
  }
  public async findAvailableBooks({
    page,
    limit,
    search
  }: PageRequest<{
    name?: string;
    category?: string;
  }>) {
    const [total, content] = await Promise.all([
      this.prisma.book.count({
        where: {
          status: BookStatus.ACTIVE,
          name: search?.name
            ? {
                contains: search.name,
                mode: 'insensitive'
              }
            : undefined,
          categories: search?.category
            ? {
                some: {
                  name: search.category
                }
              }
            : undefined
        }
      }),
      this.prisma.book.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          status: BookStatus.ACTIVE,
          name: search?.name
            ? {
                contains: search.name,
                mode: 'insensitive'
              }
            : undefined,
          categories: search?.category
            ? {
                some: {
                  name: search.category
                }
              }
            : undefined
        },
        include: {
          categories: true,
          priceGroup: true,
          stock: true
        }
      })
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      content,
      page,
      limit,
      total,
      totalPages
    };
  }
  public async getAll() {
    const content = await this.prisma.book.findMany({
      where: {
        status: BookStatus.ACTIVE,
        stock: {
          quantity: {
            gt: 0
          }
        }
      },
      take: 50,
      // select: {
      //   id: true,
      //   name: true,
      //   priceCost: true,
      //   priceGroup: true,
      // }
      include: {
        categories: true,
        priceGroup: true,
        stock: true
      }
    });
    return content;
  }
  public async list({ page, limit, search }: PageRequest<unknown>) {
    const [total, content] = await Promise.all([
      this.prisma.book.count({
        // where: where
      }),
      this.prisma.book.findMany({
        skip: (page - 1) * limit,
        take: limit,
        // where: where,
        include: {
          categories: true,
          priceGroup: true,
          stock: true,
          statusReason: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      })
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      content,
      page,
      limit,
      total,
      totalPages
    };
  }
  public async update(id: string, data: BookFormData) {
    const categories = await Promise.all(
      data.categories.map(category =>
        this.bookCategoryRepository.findOrCreate(category)
      )
    );
    return this.prisma.book.update({
      where: {
        id
      },
      data: {
        name: data.name,
        isbn: data.isbn,
        manufacturer: data.manufacturer,
        author: data.author,
        priceGroupId: data.priceGroupId,
        depth: data.depth,
        edition: data.edition,
        height: data.height,
        numberPages: data.numberPages,
        priceCost: data.priceCost,
        synopsis: data.synopsis,
        weight: data.weight,
        width: data.width,
        year: data.year,
        categories: {
          set: categories.map(category => ({
            id: category.id
          }))
        }
      }
    });
  }
  public async updateStatus(
    id: string,
    {
      reason,
      status
    }: {
      status: BookStatus;
      reason: string;
    }
  ) {
    return this.prisma.book.update({
      where: {
        id
      },
      data: {
        status,
        statusReason: {
          create: {
            reason,
            status
          }
        }
      }
    });
  }
}
