import { BookController } from '@/server/controllers/BookController';
import { DashboardController } from '@/server/controllers/DashboardController';
import { SingletonClass } from '@/server/singleton/SingletonClass';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const dashboardController = SingletonClass.getInstance(DashboardController);
// Publica
router.get(dashboardController.getDashboardChart);

export default router.handler();
