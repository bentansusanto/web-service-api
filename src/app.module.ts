import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CustomersModule } from './customers/customers.module';
import { DestinationModule } from './destination/destination.module';

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
    CustomersModule,
    BlogsModule,
    AuthModule,
    DestinationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, CustomersModule, BlogsModule, AuthModule],
})
export class AppModule {}
