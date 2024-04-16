import { NextApiRequest, NextApiResponse } from 'next';
import { CreditCardRepository } from '../repositories/CreditCardRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { COOKIES_NAME } from '@/config/constants';
import { jwtService } from '../lib/jwt';
import { ResponseData } from '../shared/ResponseDataImp';

export class CreditCardController {
  private creditCardRepository: CreditCardRepository;
  constructor() {
    this.creditCardRepository =
      SingletonClass.getInstance(CreditCardRepository);
    this.getAll = this.getAll.bind(this);
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
      console.log(error);

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
}
