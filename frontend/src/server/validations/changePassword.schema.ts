import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    accountId: z.string(),
    password: z.string().min(1, 'Senha atual é obrigatório'),
    newPassword: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/(?=.*[A-Z])/g, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/(?=.*[a-z])/g, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(
        /(?=.*[!@#$%^&*(),.?":{}|<>])/g,
        'Senha deve conter pelo menos um caractere especial'
      ),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatório')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword']
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
