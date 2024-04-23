import { NextApiRequest, NextApiResponse } from 'next';
import { ClientAddressRepository } from '../repositories/ClientAddressRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { COOKIES_NAME } from '@/config/constants';
import { jwtService } from '../lib/jwt';
import { addressSchema } from '@/validations/address.schema';
import { ResponseData } from '../shared/ResponseDataImp';

export class AddressController {
  private clientAddressRepository: ClientAddressRepository;
  constructor() {
    this.clientAddressRepository = SingletonClass.getInstance(
      ClientAddressRepository
    );
    this.list = this.list.bind(this);
    this.listDelivery = this.listDelivery.bind(this);
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const addressParsed = addressSchema.parse(req.body);

      const address = await this.clientAddressRepository.create(addressParsed);
      await this.clientAddressRepository.connectAddressToClient(
        infos.id,
        address.id
      );
      return res.status(201).json(address);
    } catch (error: any) {
      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      const addresses = await this.clientAddressRepository.listAllByClientId(
        infos.id,
        {
          page,
          limit
        }
      );

      return res.status(200).json(addresses);
    } catch (error: any) {
      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async listDelivery(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const addresses = await this.clientAddressRepository.getDeliveryAddress(
        infos.id
      );

      return res.status(200).json(addresses);
    } catch (error: any) {
      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async findById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }

      const { infos } = jwtService.extract(jwt);

      const address = await this.clientAddressRepository.findById(
        req.query.id as string
      );

      if (address?.clientId !== infos.clientId) {
        throw new Error('Address not found');
      }

      return res.status(200).json(address);
    } catch (error: any) {
      console.log(error);

      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const addressParsed = addressSchema.parse(req.body);

      const address = await this.clientAddressRepository.findById(
        req.query.id as string
      );

      if (address?.clientId !== infos.clientId) {
        throw new Error('Address not found');
      }

      await this.clientAddressRepository.update(
        req.query.id as string,
        addressParsed
      );
      return res.status(200).json(address);
    } catch (error: any) {
      console.log(error);

      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async delete(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const address = await this.clientAddressRepository.findById(
        req.query.id as string
      );

      if (address?.clientId !== infos.id) {
        throw new Error('Address not found');
      }

      await this.clientAddressRepository.delete(req.query.id as string);
    } catch (error: any) {
      return res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
}
