import { Account, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { injectable } from 'inversify';
import container from '../lib/inversify/container';
import { IAccountCreate } from './dto/RepositoriesDTO';
@injectable()
export class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: Omit<IAccountCreate, 'id'>) {
    return this.prisma.account.create({
      data: {
        email: data.email,
        password: data.password,
        roles: data.roles
      }
    });
  }

  async findById(id: string) {
    return this.prisma.account.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.account.findFirst({
      where: {
        email
      },
      include: {
        client: true
      }
    });
  }
  async findByClientId(clientId: string) {
    return this.prisma.account.findFirst({
      where: {
        client: {
          id: clientId
        }
      }
    });
  }
  async update(id: string, data: Partial<Account>) {
    return this.prisma.account.update({
      where: {
        id
      },
      data: {
        email: data.email
      }
    });
  }
  async delete(id: string) {
    return this.prisma.account.delete({
      where: {
        id
      }
    });
  }
}
