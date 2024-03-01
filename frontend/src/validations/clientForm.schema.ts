import { z } from 'zod';

export const clientFormSchema = z.object({
  personal: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    // passwordConfirmation: z
    //   .string()
    //   .min(6, 'Senha deve ter no mínimo 6 caracteres')
    //   .refine((data) => data === this.password, {
    //     message: 'Senhas não conferem'
    //   }),
    birthDate: z.string().min(1, 'Data de nascimento é obrigatório')
  })
});
