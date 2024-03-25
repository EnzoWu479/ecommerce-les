import { City, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { ICityCreate } from './dto/RepositoriesDTO';
import { StateRepository } from './StateRepository';
@injectable()
export class CityRepository {
  prisma: PrismaClient;
  private stateRepository: StateRepository;

  constructor(@inject(StateRepository) stateRepository: StateRepository) {
    this.prisma = prisma;
    this.stateRepository = stateRepository;
  }

  async findOrCreateByName({ name, uf }: ICityCreate) {
    const city = await this.prisma.city.findFirst({
      where: {
        name: name
      }
    });
    if (city) {
      return city;
    }
    const state = await this.stateRepository.findOrCreateByUf(uf);
    return this.prisma.city.create({
      data: {
        name: name,
        state: {
          connect: {
            id: state.id
          }
        }
      }
    });
  }
}
