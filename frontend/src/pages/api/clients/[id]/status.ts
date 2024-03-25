import { ClientController } from '@/server/controllers/ClientController';
import container from '@/server/lib/inversify/container';
import { ClientRepository } from '@/server/repositories/ClientRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

const clientController = container.resolve(ClientController);

// Publica
router.put(clientController.updateStatus);

export default router.handler();
