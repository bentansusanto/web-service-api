import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customers, CustomersSchema } from './schema/customer.schema';
import { CustomersService } from './customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customers.name, schema: CustomersSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
