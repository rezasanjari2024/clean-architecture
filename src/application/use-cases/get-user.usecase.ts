import { IGenericRepository } from '../../domain/repositories/generic.repository.interface';
import { User } from '../../domain/entities/user.entity';

export class GetUserUseCase {
  constructor(private readonly userRepository: IGenericRepository<User>) {}

  async execute(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
  async findAll(): Promise<User[] | null> {
    return await this.userRepository.findAll();
  }
}
