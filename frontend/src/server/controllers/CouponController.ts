import {
  CouponFormSchema,
  couponFormSchema
} from '@/validations/couponForm.schema';
import { CouponRepository } from '../repositories/CouponRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { CouponStatus, CouponType } from '@prisma/client';
import { PageRequest } from '../shared/PageRequest';
import { PageResponse } from '../shared/PageResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../shared/ResponseDataImp';

export class CouponController {
  private couponRepository: CouponRepository;
  constructor() {
    this.couponRepository = SingletonClass.getInstance(CouponRepository);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCode = this.getByCode.bind(this);
    this.list = this.list.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  public async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const values = couponFormSchema.parse(req.body);
      const coupon = await this.couponRepository.create({
        code: values.code,
        value: Number(values.value),
        expiresAt: new Date(values.expiresAt),
        status: CouponStatus.ACTIVE,
        type: CouponType.PROMOTIONAL
      });
      res.status(201).json(coupon);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async getById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;
      const coupon = await this.couponRepository.getById(id);
      if (!coupon) {
        throw new Error('Cupom não encontrado');
      }
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async getByCode(req: NextApiRequest, res: NextApiResponse) {
    try {
      const code = req.query.code as string;
      const coupon = await this.couponRepository.getByCode(code);
      if (!coupon) {
        throw new Error('Cupom não encontrado');
      }
      res.status(200).json(coupon);
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const coupons = await this.couponRepository.list({ limit, page });
      console.log(coupons);

      res.status(200).json(coupons);
    } catch (error: any) {
      console.log(error);

      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
  public async updateStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
      const id = req.query.id as string;
      const status = req.body.status as CouponStatus;
      await this.couponRepository.updateStatus(id, status);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json(new ResponseData(null, error.message, 400));
    }
  }
}
