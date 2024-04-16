import { AddressController } from '@/server/controllers/AddressController';
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

const addressController = SingletonClass.getInstance(AddressController);
// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .get(addressController.findById)
  .get(addressController.update)
  .post(addressController.delete);

export default router.handler();
