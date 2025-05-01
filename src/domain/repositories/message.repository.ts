import { Message } from 'src/domain/entities/message.entity';

export interface IMessageRepository {
  save(message: Message): Promise<Message>;
  findBetweenUsers(user1: string, user2: string): Promise<Message[]>;
}
