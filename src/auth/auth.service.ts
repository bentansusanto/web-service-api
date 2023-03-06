/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Auth | any> {
    const { names, phoneNumber, email, password } = registerDto;

    if (!names || !phoneNumber || !email || !password) {
      throw new BadRequestException('Cannot register, try again');
    }

    if (phoneNumber.length <= 12) {
      throw new BadRequestException('please input phone number');
    }

    if (password.length <= 6) {
      throw new BadRequestException('please input');
    }

    const existUser = await this.authModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('User allready exist');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.authModel.create({
      names,
      phoneNumber,
      email,
      password: hashPassword,
    });
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }

  async login(loginDto: LoginDto, response: Response): Promise<Auth | any> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    return {
      message: 'Login success',
      token,
    };
  }

  async userProfile(request: Request) {
    try {
      const data = request.user;

      const user = await this.authModel.findOne({ id: data['id'] });

      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorization');
    }
  }

  async logout(response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout successs',
    };
  }
}
