import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { validationMiddleware } from '@/server/middlewares/validationMiddleware';
import { clientSchema } from '@/server/validations/client.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import 'reflect-metadata';

const router = createRouter<NextApiRequest, NextApiResponse>();

const clientController = container.resolve<ClientController>(ClientController);

router
  // .use(validationMiddleware(clientSchema))
  .get('/:id', clientController.get)
  .get(clientController.list)
  .post(clientController.create)
  .put(clientController.update)
  .delete(clientController.delete);

export default router.handler();
