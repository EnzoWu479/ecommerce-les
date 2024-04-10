import { BookCategoryController } from '@/server/controllers/BookCategoryController';
import { BookController } from '@/server/controllers/BookController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const bookCategoryController = SingletonClass.getInstance(
  BookCategoryController
);
// Publica
router
  // .use(validationMiddleware(clientSchema))
  .get(bookCategoryController.list)
  .post(bookCategoryController.create)
  .put(bookCategoryController.update)
  .delete(bookCategoryController.delete);

export default router.handler();
