import { NextApiRequest, NextApiResponse } from 'next';
import { CouponRepository } from '../repositories/CouponRepository';
import { TradeRepository } from '../repositories/TradeRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { COOKIES_NAME } from '@/config/constants';
import { jwtService } from '../lib/jwt';
import { tradeSchema } from '../validations/trade.schema';
import { ResponseData } from '../shared/ResponseDataImp';
import { TradeDTO } from '../repositories/dto/TradeDTO';
import { ITrade } from '@/types/trade';
import { CouponStatus, CouponType, NotificationType, TradeStatus } from '@prisma/client';
import cuid from 'cuid';
import { NotificationService } from '../services/NotificationService';
import { formaters } from '@/helpers/formaters';
import { NotificationRepository } from '../repositories/NotificationRepository';

export class TradeController {
  private tradeRepository: TradeRepository;
  private couponRepository: CouponRepository;
  private notificationService: NotificationService;
  private notificationRepository: NotificationRepository;
  constructor() {
    this.tradeRepository = new TradeRepository();
    this.couponRepository = new CouponRepository();
    this.notificationService = new NotificationService();
    this.notificationRepository = new NotificationRepository();
    this.request = this.request.bind(this);
    this.list = this.list.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  public async request(req: NextApiRequest, res: NextApiResponse) {
    try {
      const jwt = req.cookies[COOKIES_NAME.TOKEN];
      if (!jwt) {
        throw new Error('Token not found');
      }
      const { infos } = jwtService.extract(jwt);

      const tradeValid = tradeSchema.parse(req.body);
      const trade = await this.tradeRepository.create(infos.id, {
        productsId: tradeValid.productsId
      });
      return res.status(201).json(trade);
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async list(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const trades = await this.tradeRepository.list({
        limit: limit,
        page: page
      });
      return res.status(200).json({
        ...trades,
        content: trades.content.map(
          trade => new TradeDTO(trade as any as ITrade)
        )
      });
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
  public async updateStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const { status } = req.body;
      const trade = await this.tradeRepository.updateStatus(
        id as string,
        status
      );
      const tradeDTO = new TradeDTO(trade as any as ITrade);

      switch(status) {
        case TradeStatus.TROCA_REALIZADA:
          
          const [coupon] = await Promise.all([
            this.couponRepository.create({
              code: cuid(),
              expiresAt: null,
              status: CouponStatus.ACTIVE,
              type: CouponType.TRADE,
              value: tradeDTO.totalValue
            }),
            this.notificationRepository.deleteByTrade(trade.id)
          ])
          
          await this.notificationService.create({
            clientId: trade.clientId,
            title: `A troca de ${formaters.money(tradeDTO.totalValue)} foi aprovada`,
            message: `Foi criado o cupom de troca: ${coupon.code}`,
            type: NotificationType.TRADE_COUPON,
            tradeId: trade.id,
            couponId: coupon.id
          })
          break;
        case TradeStatus.TROCA_RECUSADA:
          await this.notificationService.create({
            clientId: trade.clientId,
            title: `A troca foi recusada`,
            message: ``,
            type: NotificationType.TRADE_COUPON,
          })
          break;
        case TradeStatus.TROCA_AUTORIZADA:
          await this.notificationService.create({
            clientId: trade.clientId,
            title: `A troca foi autorizada`,
            message: `Devolva os itens solicitados para troca`,
            tradeId: trade.id,
            type: NotificationType.RETRIEVE_REQUEST,
          })
          break;
      }

      if (status === TradeStatus.TROCA_REALIZADA) {
        const coupon = await this.couponRepository.create({
          code: cuid(),
          expiresAt: null,
          status: CouponStatus.ACTIVE,
          type: CouponType.TRADE,
          value: tradeDTO.totalValue
        });
      }

      return res
        .status(200)
        .json(new ResponseData(null, 'Status updated', 200));
    } catch (error: any) {
      return res.status(500).json(new ResponseData(null, error.message, 400));
    }
  }
}
