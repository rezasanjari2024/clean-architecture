import { Message } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';
import { v4 as uuid } from 'uuid';

export class SendMessageUseCase {
  constructor(private readonly repo: IMessageRepository) {}

  async execute(from: string, to: string, content: string): Promise<Message> {
    const message = new Message(uuid(), from, to, content, new Date());
    return this.repo.save(message);
  }
}
