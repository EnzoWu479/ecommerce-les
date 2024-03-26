import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const clientController = SingletonClass.getInstance(ClientController);
console.log('oi');

// Publica
router
  // .use(validationMiddleware(clientSchema))
  .get(clientController.list)
  .post(clientController.create)
  .put(clientController.update)
  .delete(clientController.delete);

export default router.handler();
