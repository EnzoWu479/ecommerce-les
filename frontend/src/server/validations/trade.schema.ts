import { z } from 'zod';

export const tradeSchema = z.object({
  productsId: z.array(
    z.object({
      id: z.string(),
      amount: z.number()
    })
  )
});
export type TradeSchema = z.infer<typeof tradeSchema>;
