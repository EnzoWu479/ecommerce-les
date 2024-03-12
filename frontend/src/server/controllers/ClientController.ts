import { NextApiRequest, NextApiResponse } from "next";
import { ClientRepository } from "../repositories/ClientRepository";
import { inject } from "inversify";
import { AccountRepository } from "../repositories/AccountRepository";
export class ClientController {
  private accountRepository: AccountRepository;
  private clientRepository: ClientRepository;

  constructor(
    @inject(ClientRepository) clientRepository: ClientRepository,
    @inject(AccountRepository) accountRepository: AccountRepository
  ) {
    this.clientRepository = clientRepository;
    this.accountRepository = accountRepository;
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    
  }
}