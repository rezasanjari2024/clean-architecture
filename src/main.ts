import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // یا مشخص‌تر مثلاً http://localhost:5500
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
