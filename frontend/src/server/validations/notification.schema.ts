import { NotificationType } from '@prisma/client';
import { z } from 'zod';

export const notificationSchema = z.object({
  title: z.string(),
  message: z.string(),
  type: z.enum([
    NotificationType.PURCHASE,
    NotificationType.PURCHASE_CANCEL,
    NotificationType.RETRIEVE_REQUEST,
    NotificationType.TRADE_COUPON,
    NotificationType.TRADE_REQUEST
  ])
});
export type NotificationSchema = z.infer<typeof notificationSchema>;
