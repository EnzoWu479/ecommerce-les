import { IMask } from '.';

export const maskCreditCardNumber: IMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
    .slice(0, 19);
};
