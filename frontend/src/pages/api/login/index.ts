import { AccountController } from '@/server/controllers/AccountController';
import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { AccountRoles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const accountController = container.resolve(AccountController);

router
    .post((...props) => accountController.login(...props, AccountRoles.USER))
    .delete((...props) => accountController.logout(...props, AccountRoles.USER))

export default router.handler();
