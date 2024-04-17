import { refineBiggerThan } from '@/utils/validations';
import { z } from 'zod';

export const couponFormSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório').max(255),
  value: z.string().min(1, 'Valor é obrigatório').refine(refineBiggerThan(0), {
    message: 'Valor deve ser maior que 0'
  }),
  expiresAt: z
    .string()
    .min(1, 'Data de expiração é obrigatória')
    .refine(value => new Date(value) > new Date(), {
      message: 'Data de expiração deve ser maior que a data atual'
    })
});
export type CouponFormSchema = z.infer<typeof couponFormSchema>;
