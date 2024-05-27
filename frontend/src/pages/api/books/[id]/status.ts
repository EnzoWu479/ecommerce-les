import { BookController } from '@/server/controllers/BookController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const bookController = SingletonClass.getInstance(BookController);

// Publica
router.put(bookController.updateStatus);

export default router.handler();
