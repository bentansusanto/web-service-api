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

  async login(loginDto: LoginDto, response: Response): Promise<Auth | any> {
    const { email, password } = loginDto;

    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    response.cookie('jwt', token, { httpOnly: true });

    delete user.password;

    return {
      message: 'Login success',
      token,
    };
  }

  async getProfile(req: Request) {
    return req.user;
  }
}
