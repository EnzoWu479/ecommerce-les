import { AccountController } from '@/server/controllers/AccountController';
import container from '@/server/lib/inversify/container';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const accountController = container.resolve(AccountController);

router
    .post((...props) => accountController.login(...props, AccountRoles.ADMIN))
    .delete((...props) => accountController.logout(...props, AccountRoles.ADMIN))

export default router.handler();
