import { z } from 'zod';

export const tradeSchema = z.object({
  productsId: z.array(z.string())
});
export type TradeSchema = z.infer<typeof tradeSchema>;
