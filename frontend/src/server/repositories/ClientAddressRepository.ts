import { ClientAddress, ClientAddressType, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { AddressFormDTO } from '@/validations/address.schema';
import { AddressRepository } from './AddressRepository';
import { ResponseData } from '../shared/ResponseDataImp';
import { SingletonClass } from '../singleton/SingletonClass';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
// @injectable()
export class ClientAddressRepository {
  prisma: PrismaClient;
  private addressRepository: AddressRepository;

  constructor() {
    this.addressRepository = SingletonClass.getInstance(AddressRepository);
    this.prisma = prisma;
  }
  async create(data: AddressFormDTO) {
    const address = await this.addressRepository.create(data);
    return this.prisma.clientAddress.create({
      data: {
        types: data.types as ClientAddressType[],
        name: data.name,
        address: {
          connect: {
            id: address.id
          }
        }
      }
    });
  }
  async findById(id: string) {
    return this.prisma.clientAddress.findUnique({
      where: {
        id
      }
    });
  }
  async listAllByClientId(
    clientId: string,
    { page, limit }: PageRequest<unknown>
  ): Promise<PageResponse<unknown>> {
    console.log(clientId);

    const [total, content] = await Promise.all([
      this.prisma.clientAddress.count({
        where: {
          client: {
            account: {
              id: clientId
            }
          }
        }
      }),
      this.prisma.clientAddress.findMany({
        where: {
          client: {
            account: {
              id: clientId
            }
          }
        },
        include: {
          address: true
        },
        take: limit,
        skip: (page - 1) * limit
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
  async getDeliveryAddress(clientId: string) {
    return this.prisma.clientAddress.findMany({
      where: {
        client: {
          account: {
            id: clientId
          }
        },
        types: {
          has: ClientAddressType.SHIPPING
        }
      },
      include: {
        address: {
          include: {
            city: {
              include: {
                state: true
              }
            }
          }
        }
      }
    });
  }
  async connectAddressToClient(clientId: string, clientAddressId: string) {
    return this.prisma.clientAddress.update({
      where: {
        id: clientAddressId
      },
      data: {
        client: {
          connect: {
            id: clientId
          }
        }
      }
    });
  }
  async update(id: string, data: AddressFormDTO) {
    if (!data.addressId)
      throw new ResponseData(null, 'Endereço não encontrado', 404);
    const address = await this.addressRepository.update(data.addressId, data);
    return this.prisma.clientAddress.update({
      where: {
        id
      },
      data: {
        types: data.types as ClientAddressType[],
        name: data.name,
        address: {
          connect: {
            id: address.id
          }
        }
      }
    });
  }
  async delete(id: string) {
    return this.prisma.clientAddress.delete({
      where: {
        id
      }
    });
  }
}
