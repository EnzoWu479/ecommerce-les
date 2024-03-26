import * as yup from 'yup';
import { z } from 'zod';
import { addressSchema } from './address.schema';
import { ClientAddressType } from '@prisma/client';
import { creditCardSchema } from './creditCard.schema';

export const clientFormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    isEdit: z.boolean().optional(),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/(?=.*[A-Z])/g, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/(?=.*[a-z])/g, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/g,
        'Senha deve conter pelo menos um caractere especial'
      ),
    passwordConfirmation: z
      .string()
      .min(1, 'Confirmação de senha é obrigatório'),
    birthDate: z.string().min(1, 'Data de nascimento é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    gender: z.string().min(1, 'Gênero é obrigatório'),
    creditCards: z
      .array(creditCardSchema)
      .min(1, 'Cartão de crédito é obrigatório'),
    mainCard: z.string(),
    addresses: z
      .array(addressSchema)
      .refine(data => data.length > 0, {
        message: 'Endereço é obrigatório',
        path: ['addresses']
      })
      .refine(
        data =>
          data.filter(address =>
            address.types.includes(ClientAddressType.BILLING)
          ).length > 0,
        {
          message: 'Endereço de cobrança é obrigatório'
          // path: ['addresses']
        }
      )
      .refine(
        data =>
          data.filter(address =>
            address.types.includes(ClientAddressType.SHIPPING)
          ).length > 0,
        {
          message: 'Endereço de entrega é obrigatório'
          // path: ['addresses']
        }
      )
      .refine(
        data =>
          data.filter(address =>
            address.types.includes(ClientAddressType.RESIDENCE)
          ).length > 0,
        {
          message: 'Endereço de residência é obrigatório'
          // path: ['addresses']
        }
      )
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation']
  });
export type ClientFormSchema = z.infer<typeof clientFormSchema>;
