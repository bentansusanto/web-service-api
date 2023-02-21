import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web_server',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthModule],
})
export class AppModule {}
