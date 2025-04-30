import { INotificationRepository } from '../../domain/repositories/notification.repository.interface';
import { Notification } from '../../domain/entities/notification.entity';

export class AddNotificationUseCase {
  constructor(private readonly repo: INotificationRepository) {}

  async execute(title: string, message: string) {
    const newNotification = new Notification(
      Math.floor(Math.random() * 10000),
      title,
      message,
    );
    await this.repo.create(newNotification);
    return newNotification;
  }
}
