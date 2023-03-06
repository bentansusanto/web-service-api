import {
  Body,
  Controller,
  Get,
  // Headers,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Auth> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Auth | any> {
    // const { email, password } = loginDto;

    // const user = await this.authService.validateUser(email, password);

    // if (!user) {
    //   throw new UnauthorizedException('Invalid email or password');
    // }

    const token = this.authService.login(loginDto);

    const cookieOption = {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    };

    res.cookie('jwt', token, cookieOption);
    return {
      message: 'Login success',
      token,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async getProfile(
    @Req()
    req: Request,
  ) {
    return await this.authService.userProfile(req);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout successs',
    };
  }
}
