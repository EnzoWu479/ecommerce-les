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
  accountId: string;
  gender: string;
  mainCardId: null;
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
