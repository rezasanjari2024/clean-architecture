import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  constructor(id: number, name: string, email: string) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
