import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
