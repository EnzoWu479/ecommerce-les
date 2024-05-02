import { AddressController } from '@/server/controllers/AddressController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const addressController = SingletonClass.getInstance(AddressController);
// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .get(addressController.listDelivery);

export default router.handler();
