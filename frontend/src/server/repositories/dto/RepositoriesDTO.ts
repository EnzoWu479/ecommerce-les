import { AccountRoles, Gender } from '@prisma/client';

export interface IAccountCreate {
  id: string;
  email: string;
  password: string;
  roles: AccountRoles[];
}
export interface IClientCreate {
  id: string;
  name: string;
  cpf: string;
  birth: Date;
  gender: Gender;
  account_id: string;
  mainCard_id: string;
  addresses_id: string[];
  cards_id: string[];
}
export interface ICityCreate {
  name: string;
  uf: string;
}
