import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../domain/repositories/generic.repository.interface';
import { BaseEntity } from '../../domain/entities/base.entity';

@Injectable()
export class GenericRepository<T extends BaseEntity>
  implements IGenericRepository<T>
{
  private entities: T[] = [];

  async findById(id: number): Promise<T | null> {
    return this.entities.find((entity) => entity.id === id) || null;
  }

  async findAll(): Promise<T[]> {
    return this.entities;
  }

  async save(entity: T): Promise<void> {
    this.entities.push(entity);
  }

  async delete(id: number): Promise<void> {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }
}
