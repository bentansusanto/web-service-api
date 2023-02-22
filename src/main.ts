import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
              {cors : {credentials : true}});

  app.use(cookieParser());

  // app.enableCors({
  //   origin: 'http://localhost:8000',
  //   credentials: true,
  // });

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
