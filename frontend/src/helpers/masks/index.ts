import { maskCPF } from './maskCPF';
import { maskCreditCardNumber } from './maskCreditCardNumber';
import { maskExpireDateCard } from './maskExpireDateCard';
import { maskTelephone } from './maskTelephone';
import { maskZipcode } from './maskZipcode';

export type IMask = (value: string) => string;

export const masks = {
  cpf: maskCPF,
  phone: maskTelephone,
  zipcode: maskZipcode,
  creditCardNumber: maskCreditCardNumber,
  expireDateCard: maskExpireDateCard
};
