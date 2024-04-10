import { BookCategoryController } from '@/server/controllers/BookCategoryController';
import { BookController } from '@/server/controllers/BookController';
import { BookPriceGroupController } from '@/server/controllers/BookPriceGroupController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const bookPriceGroupController = SingletonClass.getInstance(
  BookPriceGroupController
);
// Publica
router
  .get(bookPriceGroupController.list)
  .delete(bookPriceGroupController.delete);

export default router.handler();
