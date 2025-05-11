import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './presentation/controllers/user.controller';
import { GenericRepository } from './infrastructure/repositories/generic.repository';
import { User } from './domain/entities/user.entity';
import { NotificationGateway } from './presentation/gateways/notification.gateway';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { NotificationController } from './presentation/controllers/notification.controller';
import { MessageController } from './presentation/controllers/message.controller';
import { ChatGateway } from './presentation/gateways/chat.gateway';

import { PriceGateway } from './presentation/gateways/price.gateway';
import { NobitexService } from './services/nobitex.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    NotificationController,
    MessageController,
  ],
  providers: [
    AppService,
    {
      provide: GenericRepository,
      useClass: GenericRepository<User>,
    },
    NotificationGateway,
    ChatGateway,
    NotificationRepository,
    PriceGateway,
    NobitexService,
  ],
})
export class AppModule {}
