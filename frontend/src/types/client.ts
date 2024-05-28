import {
  AccountRoles,
  AccountStatus,
  ClientAddressType,
  Gender
} from '@prisma/client';
import { IAddress } from './address';
import { ICreditCard } from './creditCard';

export interface IClient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  accountId: string | null;
  gender: string;
  mainCardId: string | null;
  mainCard?: MainCard;
  createdAt: string;
  updatedAt: string;
  account?: IAccount;
  addresses?: IClientAddress[];
  cards?: ICreditCard[];
}

export interface IAccount {
  id: string;
  email: string;
  password: string;
  roles: AccountRoles[];
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
  client?: IClient;
}

export interface IClientAddress {
  id: string;
  clientId: string;
  addressId: string;
  name: string;
  types: ClientAddressType[];
  createdAt: string;
  updatedAt: string;
  address: IAddress;
}
export type ClientSearchParams = {
  name?: string;
  email?: string;
  birth_date?: string;
  cpf?: string;
  status?: string;
};
export interface MainCard {
  id: string;
  creditCardId: string;
  clientId: string;
}
