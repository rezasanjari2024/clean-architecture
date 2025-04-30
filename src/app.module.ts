import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './presentation/controllers/user.controller';
import { GenericRepository } from './infrastructure/repositories/generic.repository';
import { User } from './domain/entities/user.entity';
import { NotificationGateway } from './presentation/gateways/notification.gateway';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { NotificationController } from './presentation/controllers/notification.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, NotificationController],
  providers: [
    AppService,
    {
      provide: GenericRepository,
      useClass: GenericRepository<User>,
    },
    NotificationGateway,
    NotificationRepository,
  ],
})
export class AppModule {}
