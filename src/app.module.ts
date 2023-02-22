import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://tansusanto194:y1Zh9FkX8X0v0iPD@cluster0.ahxme83.mongodb.net/web_server?retryWrites=true&w=majority',
    ),
    AuthModule,
    CustomersModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthModule, CustomersModule],
})
export class AppModule {}
