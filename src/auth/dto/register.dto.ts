import { IsEmpty, IsString } from 'class-validator';

export class RegisterDto {
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
  readonly password: string;
}
