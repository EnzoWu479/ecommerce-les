import { NotificationRepository } from "../repositories/NotificationRepository";
import { SingletonClass } from "../singleton/SingletonClass";
import { NotificationSchema } from "../validations/notification.schema";

export class NotificationService {
    private notificationRepository: NotificationRepository;

    constructor() {
        this.notificationRepository = SingletonClass.getInstance(NotificationRepository);
    }

    public async create(
        values: NotificationSchema & {
            clientId: string;
            tradeId?: string;
            couponId?: string;
        }
    ) {
        return await this.notificationRepository.create(values);
    }
}