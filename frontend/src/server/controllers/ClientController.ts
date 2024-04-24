import { NextApiRequest, NextApiResponse } from 'next';
import { ClientRepository } from '../repositories/ClientRepository';
import { inject, injectable } from 'inversify';
import { AccountRepository } from '../repositories/AccountRepository';
import { clientFormSchema } from '@/validations/clientForm.schema';
import { AccountRoles, AccountStatus } from '@prisma/client';
import { hashService } from '../lib/bcrypt';
import container from '../lib/inversify/container';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { ClientSearchParams } from '@/types/client';
import { SingletonClass } from '../singleton/SingletonClass';
import { ResponseData } from '../shared/ResponseDataImp';
import { parseCookies } from 'nookies';
// @injectable()
export class ClientController {
  private accountRepository: AccountRepository;
  private clientRepository: ClientRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.clientRepository = new ClientRepository();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = clientFormSchema.parse(req.body);
      body.cpf = body.cpf.replace(/\D/g, '');

      const [clientEmail, clientCpf] = await Promise.all([
        this.accountRepository.findByEmail(body.email),
        this.clientRepository.findByCpf(body.cpf)
      ]);

      if (clientEmail) {
        throw new Error('Email já está em uso');
      }
      if (clientCpf) {
        throw new Error('CPF já está em uso');
      }
      const hashPassword = await hashService.generateHash(body.password);
      body.password = hashPassword;

      const client = await this.clientRepository.create(body);

      // res.revalidate('/admin/clientes');
      api.get('/admin/clientes/revalidate');

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = clientFormSchema.parse(req.body);
      const id = req.query.id as string;
      body.cpf = body.cpf.replace(/\D/g, '');

      const [clientEmail, clientCpf] = await Promise.all([
        this.accountRepository.findByEmail(body.email),
        this.clientRepository.findByCpf(body.cpf)
      ]);

      if (clientEmail && clientEmail.client?.id !== id) {
        throw new Error('Email já está em uso');
      }
      if (clientCpf && clientCpf.id !== id) {
        throw new Error('CPF já está em uso');
      }

      const client = await this.clientRepository.update(id, body);

      // await res.revalidate('/admin/clientes');
      // await res.revalidate(`/admin/clientes/${id}`);
      api.get('/admin/clientes/revalidate', {
        params: {
          id
        }
      });

      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async delete(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    await this.clientRepository.delete(id);
    await api.get('/admin/clientes/revalidate', {
      params: {
        id
      }
    });
    res.status(204).end();
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
      const search = req.query.search
        ? (JSON.parse(String(req.query.search)) as
            | ClientSearchParams
            | undefined)
        : undefined;
      // console.log(search);

      const clients = await this.clientRepository.list({ page, limit, search });

      res.status(200).json(clients);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
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
    if (!client.account?.id) {
      res.status(404).json({ error: 'Account not found' });
      return;
    }

    await this.accountRepository.update(client.account?.id, { status });
    res.status(204).end();
  }
}
