import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SendMessageUseCase } from 'src/application/use-cases/send-message.usecase';
import { MessageRepositoryImpl } from 'src/infrastructure/repositories/message.repository.impl';

@Controller('messages')
export class MessageController {
  private useCase = new SendMessageUseCase(new MessageRepositoryImpl());

  @Post()
  async send(@Body() body: { from: string; to: string; content: string }) {
    return this.useCase.execute(body.from, body.to, body.content);
  }

  @Get()
  async get(@Query('user1') user1: string, @Query('user2') user2: string) {
    const repo = new MessageRepositoryImpl();
    return repo.findBetweenUsers(user1, user2);
  }
}
