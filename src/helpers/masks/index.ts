import { maskCPF } from './maskCPF';
import { maskTelephone } from './maskTelephone';
import { maskZipcode } from './maskZipcode';

export type IMask = (value: string) => string;

export const masks = {
  cpf: maskCPF,
  phone: maskTelephone,
  zipcode: maskZipcode
};
