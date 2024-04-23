import { NextApiRequest, NextApiResponse } from 'next';
import { CreditCardRepository } from '../repositories/CreditCardRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { COOKIES_NAME } from '@/config/constants';
import { jwtService } from '../lib/jwt';
import { ResponseData } from '../shared/ResponseDataImp';
import { creditCardSchema } from '@/validations/creditCard.schema';

export class CreditCardController {
  private creditCardRepository: CreditCardRepository;
  constructor() {
    this.creditCardRepository =
      SingletonClass.getInstance(CreditCardRepository);
    this.getAll = this.getAll.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
  }
  async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      // console.log(search);

      const creditCards = await this.creditCardRepository.listAllByClientId(
        infos.id,
        {
          page,
          limit
        }
      );

      res.status(200).json(creditCards);
    } catch (error: any) {

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const creditCards = await this.creditCardRepository.findAllByUserId(
        infos.id
      );

      res.status(200).json(creditCards);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  async findById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const creditCard = await this.creditCardRepository.findById(
        req.query.id as string
      );

      res.status(200).json(creditCard);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const validBody = creditCardSchema.parse(req.body);

      const creditCard = await this.creditCardRepository.create({
        ...validBody,
        clientId: infos.clientId
      });

      res.status(201).json(creditCard);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const validBody = creditCardSchema.parse(req.body);

      const creditCard = await this.creditCardRepository.update(
        req.query.id as string,
        validBody
      );

      res.status(200).json(creditCard);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      await this.creditCardRepository.delete(req.query.id as string);

      res.status(200).json(new ResponseData(null, 'Credit card deleted', 200));
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
}
