import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersDto } from './dto/customer.dto';

@Controller('api')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('customers')
  findAllCustomer() {
    return this.customersService.findAllCustomer();
  }

  @Get('customers/:id')
  findCustomerById(@Param('id') id: string) {
    return this.customersService.findCustomerById(id);
  }

  @Post('customers')
  createCustomer(@Body() customersDto: CustomersDto) {
    return this.customersService.createCustomer(customersDto);
  }

  @Put('customers/:id')
  updateCustomer(@Param('id') id: string, @Body() customersDto: CustomersDto) {
    return this.customersService.updateCustomer(id, customersDto);
  }

  @Delete('customers/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
