import { Notification } from '../entities/notification.entity';

export interface INotificationRepository {
  create(notification: Notification): Promise<void>;
  findAll(): Promise<Notification[]>;
}
