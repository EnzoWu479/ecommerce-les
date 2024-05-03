import { NotificationController } from '@/server/controllers/NotificationController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const notificationController = SingletonClass.getInstance(NotificationController);
// Publica
router
  // .use(authorizationMiddleware([AccountRoles.USER]))
  .get(notificationController.list)

export default router.handler();
