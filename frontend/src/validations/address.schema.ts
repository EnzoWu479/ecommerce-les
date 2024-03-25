import { z } from 'zod';

export const addressSchema = z.object({
  id: z.string().nullable(),
  addressId: z.string().nullable(),
  name: z.string().min(1, 'Nome é obrigatório'),
  street: z.string().min(1, 'Rua é obrigatório'),
  streetType: z.string().min(1, 'Tipo de rua é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  residenceType: z.string().min(1, 'Tipo de residência é obrigatório'),
  zipcode: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-\d{3}$/g, 'CEP inválido'),
  city: z.string().min(1, 'Cidade é obrigatório'),
  state: z.string().min(1, 'Estado é obrigatório'),
  types: z.array(z.string()).min(1, 'Pelo menos um tipo é obrigatório')
});
export type AddressFormDTO = z.infer<typeof addressSchema> & {
  clientId?: string;
};

export const addressEmpty: AddressFormDTO = {
  id: null,
  addressId: null,
  name: '',
  street: '',
  streetType: '',
  number: '',
  neighborhood: '',
  residenceType: '',
  zipcode: '',
  city: '',
  state: '',
  types: []
};
