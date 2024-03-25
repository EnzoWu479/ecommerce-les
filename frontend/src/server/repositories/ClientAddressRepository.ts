import { ClientAddress, ClientAddressType, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { AddressFormDTO } from '@/validations/address.schema';
import { AddressRepository } from './AddressRepository';
import { ResponseData } from '../shared/ResponseDataImp';
@injectable()
export class ClientAddressRepository {
  prisma: PrismaClient;

  constructor(
    @inject(AddressRepository) private addressRepository: AddressRepository
  ) {
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
  async findAllByClientId(clientId: string) {
    return this.prisma.clientAddress.findMany({
      where: {
        clientId
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
