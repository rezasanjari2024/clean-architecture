import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
async function bootstrap() {
  Sentry.init({
    dsn: 'https://71d70e20996bcfbc6d3f7bab0855b09e@o4509249232633856.ingest.us.sentry.io/4509249236107264',
    tracesSampleRate: 1.0,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // یا مشخص‌تر مثلاً http://localhost:5500
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
