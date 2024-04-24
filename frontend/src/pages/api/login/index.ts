import { AccountController } from '@/server/controllers/AccountController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const accountController = SingletonClass.getInstance(AccountController);

router
  .post((...props) => accountController.login(...props, AccountRoles.USER))
  .delete((...props) => accountController.logout(...props, AccountRoles.USER));

export default router.handler();
