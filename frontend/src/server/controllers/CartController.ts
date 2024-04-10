import { NextApiRequest, NextApiResponse } from 'next';
import { CartRepository } from '../repositories/CartRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { jwtService } from '../lib/jwt';
import { COOKIES_NAME } from '@/config/constants';
import { ResponseData } from '../shared/ResponseDataImp';

export class CartController {
  private cartRepository: CartRepository;
  constructor() {
    this.cartRepository = SingletonClass.getInstance(CartRepository);
    this.getCurrentCart = this.getCurrentCart.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.updateProductAmount = this.updateProductAmount.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
  }
  public async getCurrentCart(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const cart = await this.cartRepository.getCurrentCart(infos.id);
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async addProductToCart(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const { productId, quantity } = req.body;
      const cart = await this.cartRepository.addProductToCart(
        infos.id,
        productId,
        quantity
      );
      res.status(201).json(cart);
    } catch (error: any) {
      res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async updateProductAmount(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const { productId, quantity } = req.body;
      const cart = await this.cartRepository.updateProductQuantity(
        infos.id,
        productId,
        quantity
      );
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async removeProductFromCart(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      console.log(jwt);

      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const productId = req.query.productId as string;
      const cart = await this.cartRepository.removeProductFromCart(
        infos.id,
        productId
      );
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
}
