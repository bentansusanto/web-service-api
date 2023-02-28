import { IsEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsEmpty()
  @IsString()
  readonly names: string;

  @IsEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
