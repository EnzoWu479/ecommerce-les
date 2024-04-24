import { ClientController } from '@/server/controllers/ClientController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const clientController = SingletonClass.getInstance(ClientController);

// Publica
router.put(clientController.updateStatus);

export default router.handler();
