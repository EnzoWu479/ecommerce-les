import { z } from 'zod';

export const creditCardSchema = z.object({
  id: z.string().nullable(),
  number: z.string().min(1, 'Número é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  holderName: z.string().min(1, 'Nome do titular é obrigatório'),
  expiration: z.string().min(1, 'Data de expiração é obrigatória'),
  cvv: z.string().min(1, 'CVV é obrigatório'),
  brand: z.string().min(1, 'Bandeira é obrigatória'),
  isMain: z.boolean()
});
export type CreditCardFormDTO = z.infer<typeof creditCardSchema>;
export const creditCardEmpty: CreditCardFormDTO = {
  id: null,
  number: '',
  name: '',
  holderName: '',
  expiration: '',
  cvv: '',
  brand: '',
  isMain: false
};
