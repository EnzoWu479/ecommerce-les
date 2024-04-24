import { CouponController } from '@/server/controllers/CouponController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const couponController = SingletonClass.getInstance(CouponController);

// Publica
router
  // .use(validationMiddleware(clientSchema))
  .get(couponController.getById);

export default router.handler();
