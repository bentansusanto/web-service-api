import { IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmpty()
  @IsString()
  readonly email: string;
  readonly password: string;
}
