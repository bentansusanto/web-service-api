import { IsString, IsEmpty } from 'class-validator';

export class CustomersDto {
  @IsEmpty()
  @IsString()
  readonly names: string;

  @IsEmpty()
  @IsString()
  readonly email: string;

  @IsEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsEmpty()
  @IsString()
  readonly companyName: string;

  @IsEmpty()
  @IsString()
  readonly description: string;

  @IsEmpty()
  @IsString()
  readonly filePrd: string;
}
