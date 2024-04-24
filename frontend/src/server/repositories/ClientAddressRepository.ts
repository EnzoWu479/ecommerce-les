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
    this.addressRepository = new AddressRepository();
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
          address: {
            include: {
              city: {
                include: {
                  state: true
                }
              }
            }
          }
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
  async connectAddressToClient(userId: string, clientAddressId: string) {
    const clientAccount = await this.prisma.client.findFirst({
      where: {
        account: {
          id: userId
        }
      }
    });
    return this.prisma.clientAddress.update({
      where: {
        id: clientAddressId
      },
      data: {
        client: {
          connect: {
            id: clientAccount?.id
          }
        }
      }
    });
  }
  async update(id: string, data: AddressFormDTO) {
    if (!id) throw new Error('Endereço não encontrado');
    const address = await this.prisma.address.findUnique({
      where: {
        clientAddressId: id
      }
    });
    if (!address) throw new Error('Endereço não encontrado');
    const [clientAddress] = await Promise.all([
      this.prisma.clientAddress.update({
        where: {
          id
        },
        data: {
          types: data.types as ClientAddressType[],
          name: data.name
        }
      }),
      this.addressRepository.update(address.id, data)
    ]);
    return clientAddress;
  }
  async delete(id: string) {
    return this.prisma.clientAddress.delete({
      where: {
        id
      }
    });
  }
}
