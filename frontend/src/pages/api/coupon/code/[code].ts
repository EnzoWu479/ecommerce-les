import { ClientController } from '@/server/controllers/ClientController';
import { CouponController } from '@/server/controllers/CouponController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const couponController = SingletonClass.getInstance(CouponController);

// Publica
router
  // .use(validationMiddleware(clientSchema))
  .get(couponController.getByCode);

export default router.handler();
