import { NextApiRequest, NextApiResponse } from 'next';
import { ClientRepository } from '../repositories/ClientRepository';
import { inject, injectable } from 'inversify';
import { AccountRepository } from '../repositories/AccountRepository';
import { ClientDTO } from '../validations/client.schema';
import { clientFormSchema } from '@/validations/clientForm.schema';
import { AccountRoles, AccountStatus } from '@prisma/client';
import { hashService } from '../lib/bcrypt';
import container from '../lib/inversify/container';
import { z } from 'zod';
import { api } from '@/lib/axios';

@injectable()
export class ClientController {
  private accountRepository: AccountRepository;
  private clientRepository: ClientRepository;

  constructor(
    @inject(ClientRepository) clientRepository: ClientRepository,
    @inject(AccountRepository) accountRepository: AccountRepository
  ) {
    console.log(clientRepository !== undefined);
    console.log(accountRepository !== undefined);

    this.clientRepository = clientRepository;
    this.accountRepository = accountRepository;
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = clientFormSchema.parse(req.body);
      console.log(this.accountRepository !== undefined);
      console.log(this.clientRepository !== undefined);

      const hasEmail = await this.accountRepository.findByEmail(body.email);
      const hasCpf = await this.clientRepository.findByCpf(body.cpf);

      if (hasEmail) {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }
      if (hasCpf) {
        res.status(400).json({ error: 'CPF already in use' });
        return;
      }
      const hashPassword = await hashService.generateHash(body.password);
      body.password = hashPassword;
      body.cpf = body.cpf.replace(/\D/g, '');

      const client = await this.clientRepository.create(body);

      res.revalidate('/admin/auth/clientes');

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  public async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = clientFormSchema.parse(req.body);
      const id = req.query.id as string;

      const clientEmail = await this.accountRepository.findByEmail(body.email);
      const clientCpf = await this.clientRepository.findByCpf(body.cpf);

      if (clientEmail && clientEmail.client?.id !== id) {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }
      if (clientCpf && clientCpf.id !== id) {
        res.status(400).json({ error: 'CPF already in use' });
        return;
      }
      body.cpf = body.cpf.replace(/\D/g, '');

      const client = await this.clientRepository.update(id, body);

      // res.revalidate('/admin/auth/clientes');
      api.get('/admin/auth/clientes/revalidate', {
        params: {
          id
        }
      });

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  public async delete(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
  }
  public async get(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    const client = await this.clientRepository.findById(id);
    console.log(client);

    res.status(200).json(client);
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      const clients = await this.clientRepository.list({ page, limit });

      res.status(200).json(clients);
    } catch (error: any) {
      console.log(error);

      res.status(400).json({ error: error.message });
    }
  }
  public async updateStatus(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    const status = req.body.status as AccountStatus;

    const schema = z.object({
      status: z.nativeEnum(AccountStatus)
    });

    try {
      schema.parse({ status });
    } catch (error: any) {
      res.status(400).json({ error: error.errors });
      return;
    }

    const client = await this.clientRepository.findById(id);

    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }

    await this.accountRepository.update(client.accountId, { status });
    res.status(204).end();
  }
}
