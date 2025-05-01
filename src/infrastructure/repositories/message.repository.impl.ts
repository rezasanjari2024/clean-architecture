import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

@Injectable()
export class MessageRepositoryImpl implements IMessageRepository {
  private messages: Message[] = [];

  async save(message: Message): Promise<Message> {
    this.messages.push(message);
    return message;
  }

  async findBetweenUsers(user1: string, user2: string): Promise<Message[]> {
    return this.messages.filter(
      (m) =>
        (m.fromUserId === user1 && m.toUserId === user2) ||
        (m.fromUserId === user2 && m.toUserId === user1),
    );
  }
}
