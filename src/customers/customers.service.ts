import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllCustomer(): Promise<any> {
    const customers = await this.customerModel.find();
    return {
      customers,
    };
  }

  async findCustomerById(id: string): Promise<any> {
    const customerId = await this.customerModel.findById(id);
    if (!customerId) {
      throw new NotFoundException('Customer not found');
    }

    return {
      customerId,
    };
  }

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

  async updateCustomer(id: string, customerDto: CustomersDto): Promise<any> {
    const customer = await this.customerModel.findByIdAndUpdate(
      id,
      customerDto,
    );
    if (!customer) {
      throw new NotFoundException('Custommer not found');
    }
    return {
      message: 'Success Updated',
      customer,
    };
  }

  async deleteCustomer(id: string): Promise<any> {
    const customer = await this.customerModel.findByIdAndDelete(id);

    if (!customer) {
      throw new NotFoundException('Custommer not found');
    }

    return {
      message: 'Delete data success',
    };
  }
}
