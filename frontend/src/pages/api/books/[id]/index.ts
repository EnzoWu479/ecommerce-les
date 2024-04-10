import { BookController } from '@/server/controllers/BookController';
import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const bookController = SingletonClass.getInstance(BookController);

// Publica
router
  .get(bookController.get)
  .put(bookController.update);

export default router.handler();
