import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customers } from './schema/customer.schema';
import { Model } from 'mongoose';
import { CustomersDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customerModel: Model<Customers>,
  ) {}

  async createCustomer(customersDto: CustomersDto): Promise<any> {
    const { names, email, phoneNumber, companyName, description, filePrd } =
      customersDto;

    const customer = await this.customerModel.create({
      names,
      email,
      phoneNumber,
      companyName,
      description,
      filePrd,
    });

    return {
      message: 'Success created customers',
      data: customer,
    };
  }
}
