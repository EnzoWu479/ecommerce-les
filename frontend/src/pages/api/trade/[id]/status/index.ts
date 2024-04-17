import { CartController } from '@/server/controllers/CartController';
import { PurchaseController } from '@/server/controllers/PurchaseController';
import { TradeController } from '@/server/controllers/TradeController';
import { authorizationMiddleware } from '@/server/middlewares/authorizationMiddleware';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

export const config = {
  api: {
    externalResolver: true
  }
};

const router = createRouter<NextApiRequest, NextApiResponse>();

const tradeController = SingletonClass.getInstance(TradeController);
// Publica
router.put(tradeController.updateStatus);

export default router.handler();
