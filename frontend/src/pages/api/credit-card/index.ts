import { AddressController } from '@/server/controllers/AddressController';
import { CreditCardController } from '@/server/controllers/CreditCardController';
import { authorizationMiddleware } from '@/server/middlewares/authorizationMiddleware';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const creditCardController = SingletonClass.getInstance(CreditCardController);
// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .get(creditCardController.list)
  .post(creditCardController.create)

export default router.handler();
