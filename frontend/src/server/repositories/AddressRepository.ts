import { Address, ClientAddressType, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { AddressFormDTO } from '@/validations/address.schema';
import { CityRepository } from './CityRepository';
import { SingletonClass } from '../singleton/SingletonClass';
// @injectable()
export class AddressRepository {
  prisma: PrismaClient;
  private cityRepository: CityRepository;

  constructor() {
    this.cityRepository = SingletonClass.getInstance(CityRepository);
    this.prisma = prisma;
  }

  async create(data: AddressFormDTO) {
    const city = await this.cityRepository.findOrCreateByName({
      name: data.city,
      uf: data.state
    });
    const address = this.prisma.address.create({
      data: {
        zipCode: data.zipcode,
        street: data.street,
        number: data.number,
        streetType: data.streetType,
        observation: '',
        residenceType: data.residenceType,
        neighborhood: data.neighborhood,
        city: {
          connect: {
            id: city.id
          }
        }
      }
    });
    return address;
  }
  async update(id: string, data: AddressFormDTO) {
    const city = await this.cityRepository.findOrCreateByName({
      name: data.city,
      uf: data.state
    });
    return this.prisma.address.update({
      where: {
        id
      },
      data: {
        zipCode: data.zipcode,
        street: data.street,
        number: data.number,
        streetType: data.streetType,
        observation: '',
        residenceType: data.residenceType,
        city: {
          connect: {
            id: city.id
          }
        }
      }
    });
  }
  async findById(id: string) {
    return this.prisma.address.findUnique({
      where: {
        id
      }
    });
  }
  async findByUserId(userId: string) {
    return this.prisma.address.findMany({
      where: {
        clientAddress: {
          client: {
            accountId: userId
          }
        }
      }
    });
  }
}
