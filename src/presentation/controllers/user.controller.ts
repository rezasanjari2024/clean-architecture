import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { GenericRepository } from '../../infrastructure/repositories/generic.repository';
import { User } from '../../domain/entities/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('users')
export class UserController {
  private readonly getUserUseCase: GetUserUseCase;

  constructor(private readonly genericRepository: GenericRepository<User>) {
    // دستی دیتا اضافه می‌کنیم برای تست
    const dummyUsers = [
      new User(1, 'Ali', 'ali@example.com'),
      new User(2, 'Sara', 'sara@example.com'),
    ];
    dummyUsers.forEach((user) => this.genericRepository.save(user));

    this.getUserUseCase = new GetUserUseCase(this.genericRepository);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Get()
  async get() {
    const user = await this.getUserUseCase.findAll();
    return user;
  }
}
