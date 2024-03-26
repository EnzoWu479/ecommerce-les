import { AccountController } from '@/server/controllers/AccountController';
import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const accountController = SingletonClass.getInstance(AccountController);

// Publica
router.put(accountController.changeClientPassword);

export default router.handler();
