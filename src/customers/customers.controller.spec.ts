import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CustomersService,
          useValue: {},
        },
      ],
      controllers: [CustomersController],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllCustomers', () => {
    it('should return an array of customers', async () => {
      const customers = [
        {
          id: 1,
          name: 'ben',
          email: 'ben@ben.com',
          phoneNumber: '089',
          companyName: 'ben',
          filePrd: 'ben',
        },
      ];
      jest
        .spyOn(service, 'findAllCustomer')
        .mockImplementation(() => Promise.resolve(customers));

      const result = await controller.findAllCustomer();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Blogs retrieved successfully',
        data: customers,
      });
    });
  });
});
