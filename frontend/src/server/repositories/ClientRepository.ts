import { AccountRoles, Client, Gender, PrismaClient } from '@prisma/client';
import { prisma } from '@/server/lib/prisma';
import { inject, injectable } from 'inversify';
import { IClientCreate } from './dto/RepositoriesDTO';
import { ClientFormSchema } from '@/validations/clientForm.schema';
import { AccountRepository } from './AccountRepository';
import { ClientAddressRepository } from './ClientAddressRepository';
import { CreditCardRepository } from './CreditCardRepository';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
import { ResponseData } from '../shared/ResponseDataImp';
@injectable()
export class ClientRepository {
  prisma: PrismaClient;

  constructor(
    @inject(AccountRepository) private accountRepository: AccountRepository,

    @inject(ClientAddressRepository)
    private clientAddressRepository: ClientAddressRepository,

    @inject(CreditCardRepository)
    private creditCardRepository: CreditCardRepository
  ) {
    this.prisma = prisma;
  }

  async create(data: Omit<ClientFormSchema, 'id'>) {
    // const promises
    const accountPromise = await this.accountRepository.create({
      email: data.email,
      password: data.password,
      roles: [AccountRoles.USER]
    });
    const addressesPromise = Promise.all(
      data.addresses.map(async address =>
        this.clientAddressRepository.create(address)
      )
    );
    const creditCardPromise = Promise.all(
      data.creditCards.map(async creditCard =>
        this.creditCardRepository.create(creditCard)
      )
    );
    const [account, addresses, creditCards] = await Promise.all([
      accountPromise,
      addressesPromise,
      creditCardPromise
    ]);
    const mainCard = creditCards.find(card => card.isMain);
    return this.prisma.client.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        birthDate: new Date(data.birthDate).toISOString(),
        gender: data.gender as Gender,
        account: {
          connect: {
            id: account.id
          }
        },
        addresses: {
          connect: addresses.map(address => ({
            id: address.id
          }))
        },
        cards: {
          connect: creditCards.map(card => ({
            id: card.id
          }))
        },
        ...(mainCard && {
          mainCard: {
            create: {
              creditCardId: mainCard.id
            }
          }
        })
      }
    });
  }
  async update(id: string, data: Omit<ClientFormSchema, 'id'>) {
    const accountFound = await this.accountRepository.findByClientId(id);
    if (!accountFound) {
      throw new ResponseData(null, 'Cliente não encontrado', 404);
    }
    const accountPromise = await this.accountRepository.update(
      accountFound?.id,
      {
        email: data.email
      }
    );
    const addressesPromise = Promise.all(
      data.addresses.map(async address =>
        address.id
          ? this.clientAddressRepository.update(address.id, address)
          : this.clientAddressRepository.create(address)
      )
    );
    const creditCardPromise = Promise.all(
      data.creditCards.map(async creditCard =>
        creditCard.id
          ? this.creditCardRepository.update(creditCard.id, creditCard)
          : this.creditCardRepository.create(creditCard)
      )
    );
    const [account, addresses, creditCards] = await Promise.all([
      accountPromise,
      addressesPromise,
      creditCardPromise
    ]);
    const mainCard = creditCards.find(card => card.isMain);
    return this.prisma.client.update({
      where: {
        id
      },
      data: {
        name: data.name,
        cpf: data.cpf,
        birthDate: new Date(data.birthDate).toISOString(),
        gender: data.gender as Gender,
        account: {
          connect: {
            id: account.id
          }
        },
        addresses: {
          connect: addresses.map(address => ({
            id: address.id
          }))
        },
        cards: {
          connect: creditCards.map(card => ({
            id: card.id
          }))
        },
        ...(mainCard && {
          mainCard: {
            create: {
              creditCardId: mainCard.id
            }
          }
        })
      }
    });
  }

  async findById(id: string) {
    console.log(id);

    return this.prisma.client.findUnique({
      where: {
        id
      },
      include: {
        account: true,
        addresses: {
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
        },
        cards: {
          include: {
            brand: true,
            mainCard: true
          }
        }
      }
    });
  }
  async list({
    page,
    limit,
    search
  }: PageRequest<Client>): Promise<PageResponse<Client>> {
    const [total, content] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.client.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          account: true
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

  async findByCpf(cpf: string) {
    return this.prisma.client.findFirst({
      where: {
        cpf
      }
    });
  }
  async delete(id: string) {
    return this.prisma.client.delete({
      where: {
        id
      }
    });
  }
}
