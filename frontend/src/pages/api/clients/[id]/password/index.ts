import { AccountController } from '@/server/controllers/AccountController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const accountController = SingletonClass.getInstance(AccountController);

// Publica
router.put(accountController.changeClientPassword);

export default router.handler();
