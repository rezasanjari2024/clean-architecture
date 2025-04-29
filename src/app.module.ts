import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './presentation/controllers/user.controller';
import { GenericRepository } from './infrastructure/repositories/generic.repository';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: GenericRepository,
      useClass: GenericRepository<User>,
    },
  ],
})
export class AppModule {}
