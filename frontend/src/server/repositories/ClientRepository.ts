import {
  AccountRoles,
  AccountStatus,
  Client,
  Gender,
  PrismaClient
} from '@prisma/client';
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
import { ClientSearchParams } from '@/types/client';
import { SingletonClass } from '../singleton/SingletonClass';
// @injectable()
export class ClientRepository {
  prisma: PrismaClient;
  private accountRepository: AccountRepository;
  private clientAddressRepository: ClientAddressRepository;
  private creditCardRepository: CreditCardRepository;

  constructor() {
    this.prisma = prisma;
    this.accountRepository = SingletonClass.getInstance(AccountRepository);
    this.clientAddressRepository = SingletonClass.getInstance(
      ClientAddressRepository
    );
    this.creditCardRepository =
      SingletonClass.getInstance(CreditCardRepository);
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
    const mainCard = creditCards[Number(data.mainCard || 0)];
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
    const clientFound = await this.prisma.client.findUnique({
      where: {
        id
      },
      include: {
        account: true,
        addresses: true,
        cards: true,
        mainCard: true
      }
    });
    if (!clientFound || !clientFound.account) {
      throw new ResponseData(null, 'Cliente não encontrado', 404);
    }
    const accountPromise = await this.accountRepository.update(
      clientFound.account?.id,
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
    const deletedAddressesPromises = clientFound.addresses.map(
      async address => {
        if (!data.addresses.find(a => a.id === address.id)) {
          return this.clientAddressRepository.delete(address.id);
        }
      }
    );
    const deletedCreditCardsPromises = clientFound.cards.map(async card => {
      if (!data.creditCards.find(c => c.id === card.id)) {
        return this.creditCardRepository.delete(card.id);
      }
    });

    const [account, addresses, creditCards] = await Promise.all([
      accountPromise,
      addressesPromise,
      creditCardPromise,
      deletedAddressesPromises,
      deletedCreditCardsPromises
    ]);
    // update main card
    const mainCard = creditCards[Number(data.mainCard || 0)];
    console.log(mainCard);
    console.log(data.creditCards);
    console.log(creditCards);
    console.log(data.mainCard);

    await this.prisma.mainCard.update({
      where: {
        id: clientFound.mainCard?.id
      },
      data: {
        creditCardId: mainCard.id
      }
    });
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
        }
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
        mainCard: true,
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
  }: PageRequest<ClientSearchParams>): Promise<PageResponse<Client>> {
    const where = {
      ...(search?.name && {
        name: {
          contains: search.name
        }
      }),
      ...(search?.cpf && {
        cpf: {
          contains: search.cpf
        }
      }),
      ...((search?.email || search?.status) && {
        account: {
          ...(search?.email && {
            email: {
              contains: search.email
            }
          }),
          ...(search?.status && {
            status: search.status as AccountStatus
          })
        }
      }),
      ...(search?.birth_date && {
        birthDate: {
          equals: new Date(search.birth_date)
        }
      })
      // ...(search?.status && {
      //   account: {
      //     status: search.status
      //   }
      // })
    };
    const [total, content] = await Promise.all([
      this.prisma.client.count({
        where: where
      }),
      this.prisma.client.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: where,
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
