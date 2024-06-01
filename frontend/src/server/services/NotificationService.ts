import { NotificationRepository } from '../repositories/NotificationRepository';
import { SingletonClass } from '../singleton/SingletonClass';
import { NotificationSchema } from '../validations/notification.schema';
import { Server as SocketIOServer } from "socket.io";

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = SingletonClass.getInstance(
      NotificationRepository
    );
  }

  public async create(
    values: NotificationSchema & {
      clientId: string;
      tradeId?: string;
      couponId?: string;
      // io: SocketIOServer;
    }
  ) {
    // const io = values.io;
    const created = await this.notificationRepository.create(values);
    // io.emit(`NOTIFICATION_CREATED, CLIENT[${values.clientId}]`, created);

    return created;
  }
}
