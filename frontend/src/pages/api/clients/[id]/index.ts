import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const clientController = SingletonClass.getInstance(ClientController);

// Publica
router
  .get(clientController.get)
  .put(clientController.update)
  .delete(clientController.delete);

export default router.handler();
