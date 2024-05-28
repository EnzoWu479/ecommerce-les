import { NextApiRequest, NextApiResponse } from 'next';
import { jwtService } from '../lib/jwt';
import { COOKIES_NAME } from '@/config/constants';
import { SingletonClass } from '../singleton/SingletonClass';
import { ResponseData } from '../shared/ResponseDataImp';
import { NotificationRepository } from '../repositories/NotificationRepository';

export class NotificationController {
    private notificationRepository: NotificationRepository;
    constructor() {
        this.notificationRepository = SingletonClass.getInstance(NotificationRepository);
        this.list = this.list.bind(this);
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
            // console.log(search);
    
            const notifications = await this.notificationRepository.list({ page, limit, clientId: infos.clientId! });
            return res.status(200).json(notifications);
        } catch (error: any) {
            return res.status(500).json(new ResponseData(null, error.message, 400));
        }
    }
}
