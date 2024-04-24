import { CouponController } from '@/server/controllers/CouponController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const couponController = SingletonClass.getInstance(CouponController);

// Publica
router.put(couponController.updateStatus);

export default router.handler();
