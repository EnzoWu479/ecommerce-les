import { NextApiRequest, NextApiResponse } from 'next';
import { CartRepository } from '../repositories/CartRepository';
import { BookDTO } from '../repositories/dto/BookDTO';
import { jwtService } from '../lib/jwt';
import { COOKIES_NAME } from '@/config/constants';
import { SingletonClass } from '../singleton/SingletonClass';
import { ResponseData } from '../shared/ResponseDataImp';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { purchaseSchema } from '../validations/purchase.schema';
import { BookStockRepository } from '../repositories/BookStockRepository';
import { AccountRoles, CouponStatus, CouponType } from '@prisma/client';
import { IBook } from '../types/book';
import { CouponRepository } from '../repositories/CouponRepository';
import cuid from 'cuid';

export class PurchaseController {
  private cartRepository: CartRepository;
  private purchaseRepository: PurchaseRepository;
  private bookStockRepository: BookStockRepository;
  private couponRepository: CouponRepository;
  constructor() {
    this.cartRepository = new CartRepository();
    this.purchaseRepository = new PurchaseRepository();
    this.bookStockRepository = new BookStockRepository();
    this.couponRepository = new CouponRepository();
    this.purchase = this.purchase.bind(this);
    this.listByUserId = this.listByUserId.bind(this);
    this.list = this.list.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.getById = this.getById.bind(this);
  }
  public async purchase(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const purchaseValid = purchaseSchema.parse(req.body);

      const cart = await this.cartRepository.getCurrentCart(infos.id);
      const coupons = await Promise.all(
        purchaseValid.coupons.map(coupon =>
          this.couponRepository.getById(coupon)
        )
      );
      await Promise.all(
        cart.productCart.map(
          async product =>
            await this.bookStockRepository.changeStockFromProduct(
              product.book.id,
              -product.amount
            )
        )
      );
      const products = cart.productCart.map(product => {
        return {
          ...product,
          book: new BookDTO(product.book)
        };
      });
      const totalDiscount = coupons.reduce(
        (acc, coupon) => acc + (coupon?.value || 0),
        0
      );
      const totalProducts = products.reduce((acc, product) => {
        return acc + product.book.priceSell * product.amount;
      }, 0);
      const purchase = await this.purchaseRepository.create({
        details: purchaseValid,
        cart: {
          ...cart,
          productCart: products,
          createdAt: cart.createdAt.toISOString(),
          updatedAt: cart.updatedAt.toISOString()
        },
        totalDiscount,
        totalProducts
      });
      if (totalProducts - totalDiscount < 0) {
        this.couponRepository.create({
          value: totalProducts - totalDiscount,
          type: CouponType.TRADE,
          code: cuid(),
          expiresAt: null,
          status: CouponStatus.ACTIVE,
          purchaseId: purchase.id
        });
      }

      return res.status(200).json(purchase);
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async listByUserId(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      const carts = await this.purchaseRepository.listByUserId(
        {
          page,
          limit
        },
        infos.id
      );

      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      const carts = await this.purchaseRepository.listAll({
        page,
        limit
      });

      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async updateStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;
      const { status } = req.body;
      const purchase = await this.purchaseRepository.updateStatus(id, status);
      return res.status(200).json(purchase);
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;
      const purchase = await this.purchaseRepository.getById(id);
      const products = purchase?.cart.productCart.map(product => {
        return {
          ...product,
          book: new BookDTO(product.book as IBook)
        };
      });
      return res.status(200).json({
        ...purchase,
        cart: { ...purchase?.cart, productCart: products }
      });
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
}
