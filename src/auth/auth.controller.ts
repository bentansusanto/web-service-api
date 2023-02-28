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
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Auth> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth> {
    return await this.authService.login(loginDto, response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @HttpCode(200)
  async getProfile(
    @Req()
    req: Request,
  ) {
    return await this.authService.getProfile(req);
  }
}
