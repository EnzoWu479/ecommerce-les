import { AccountController } from '@/server/controllers/AccountController';
import { ClientController } from '@/server/controllers/ClientController';
import { AccountRepository } from '@/server/repositories/AccountRepository';
import { AddressRepository } from '@/server/repositories/AddressRepository';
import { CityRepository } from '@/server/repositories/CityRepository';
import { ClientAddressRepository } from '@/server/repositories/ClientAddressRepository';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { CreditCardBrandRepository } from '@/server/repositories/CreditCardBrandRepository';
import { CreditCardRepository } from '@/server/repositories/CreditCardRepository';
import { StateRepository } from '@/server/repositories/StateRepository';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

const container = new Container();

container.bind<ClientRepository>(ClientRepository).toSelf();
container.bind<AccountRepository>(AccountRepository).toSelf();
container.bind<ClientAddressRepository>(ClientAddressRepository).toSelf();
container.bind<AddressRepository>(AddressRepository).toSelf();
container.bind<CityRepository>(CityRepository).toSelf();
container.bind<StateRepository>(StateRepository).toSelf();
container.bind<CreditCardRepository>(CreditCardRepository).toSelf();
container.bind<CreditCardBrandRepository>(CreditCardBrandRepository).toSelf();
container.bind<ClientController>(ClientController).toSelf();
container.bind<AccountController>(AccountController).toSelf();

export default container;
