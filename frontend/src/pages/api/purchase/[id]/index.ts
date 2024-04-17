import { CartController } from '@/server/controllers/CartController';
import { PurchaseController } from '@/server/controllers/PurchaseController';
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

const purchaseController = SingletonClass.getInstance(PurchaseController);
// Publica
router.patch(purchaseController.updateStatus).get(purchaseController.getById);

export default router.handler();
