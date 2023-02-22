import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
