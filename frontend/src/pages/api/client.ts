import { validationMiddleware } from '@/server/middlewares/validationMiddleware';
import { clientSchema } from '@/server/validations/client.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(validationMiddleware(clientSchema));

export default router.handler();
