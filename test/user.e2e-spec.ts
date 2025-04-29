import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { User } from '../src/domain/entities/user.entity';
import { GenericRepository } from '../src/infrastructure/repositories/generic.repository';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let repository: GenericRepository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // دسترسی به Repository برای اضافه کردن دیتا
    repository = moduleFixture.get<GenericRepository<User>>(GenericRepository);
    await repository.save(new User(1, 'Ali', 'ali@example.com'));
    await repository.save(new User(2, 'Sara', 'sara@example.com'));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/1 (GET) --> should return Ali', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          name: 'Ali',
          email: 'ali@example.com',
        });
      });
  });

  it('/users/99 (GET) --> should return not found', () => {
    return request(app.getHttpServer())
      .get('/users/99')
      .expect(404)
      .expect((res) => {
        expect(res.body).toMatchObject({ message: 'User not found' });
      });
  });
});
