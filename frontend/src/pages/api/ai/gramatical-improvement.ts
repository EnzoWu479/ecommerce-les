import { AIController } from '@/server/controllers/AIController';
import { BookController } from '@/server/controllers/BookController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const aiController = SingletonClass.getInstance(AIController);
// Publica
router.get(aiController.gramaticalImprovement);

export default router.handler();
