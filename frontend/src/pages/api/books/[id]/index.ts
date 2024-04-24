import { BookController } from '@/server/controllers/BookController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const bookController = SingletonClass.getInstance(BookController);

// Publica
router
  .get(bookController.get)
  .put(bookController.update);

export default router.handler();
