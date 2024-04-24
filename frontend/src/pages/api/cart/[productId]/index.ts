import { CartController } from '@/server/controllers/CartController';
import { authorizationMiddleware } from '@/server/middlewares/authorizationMiddleware';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const cartController = SingletonClass.getInstance(CartController);
// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .delete(cartController.removeProductFromCart);

export default router.handler();
