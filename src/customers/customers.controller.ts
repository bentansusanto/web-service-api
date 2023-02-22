import { Controller, Post, Body, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersDto } from './dto/customer.dto';

@Controller('api')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('customers')
  findAllCustomer() {
    return this.customersService.findAllCustomer();
  }

  @Post('customers')
  createCustomer(@Body() customersDto: CustomersDto) {
    return this.customersService.createCustomer(customersDto);
  }
}
