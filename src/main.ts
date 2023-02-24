import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:8080',
      credentials: true,
    },
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
