import { NextApiRequest, NextApiResponse } from 'next';
// import { ClientRepository } from '../repositories/ClientRepository';
// import { inject, injectable } from 'inversify';
// import { AccountRepository } from '../repositories/AccountRepository';
import { ClientDTO } from '../validations/client.schema';

export class ClientController {
  // private accountRepository: AccountRepository;
  // private clientRepository: ClientRepository;

  constructor(
    // @inject(ClientRepository) clientRepository: ClientRepository,
    // @inject(AccountRepository) accountRepository: AccountRepository
  ) {
    // this.clientRepository = clientRepository;
    // this.accountRepository = accountRepository;
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as ClientDTO;
  }
  public async update(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body as ClientDTO;
  }
  public async delete(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
  }
  public async get(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    res.json({ name: 'get', id });
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    const page = req.query.page as string;
    const limit = req.query.limit as string;
    res.json({ name: 'list' });
  }
}
