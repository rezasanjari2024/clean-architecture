import { Body, Controller, Post } from '@nestjs/common';
import { AddNotificationUseCase } from '../../application/use-cases/add-notification.usecase';
import { NotificationRepository } from '../../infrastructure/repositories/notification.repository';
import { NotificationGateway } from '../gateways/notification.gateway';

@Controller('notifications')
export class NotificationController {
  private readonly addNotificationUseCase: AddNotificationUseCase;

  constructor(
    private readonly repo: NotificationRepository,
    private readonly gateway: NotificationGateway,
  ) {
    this.addNotificationUseCase = new AddNotificationUseCase(repo);
  }

  @Post()
  async add(@Body() body: { title: string; message: string }) {
    console.log('body:', body);

    const notif = await this.addNotificationUseCase.execute(
      body.title,
      body.message,
    );
    this.gateway.broadcast(notif); // ارسال به همه کلاینت‌ها
    return notif;
  }
}
