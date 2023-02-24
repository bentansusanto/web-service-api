import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(signUpDto: SignUpDto): Promise<any> {
    const { fullName, phoneNumber, email, password } = signUpDto;
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('email allready exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.userModel.create({
      fullName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    return {
      message: 'Success register',
      user,
    };
  }

  async login(signInDto: SignInDto, res: Response): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestException('Invalid Password');
    }
    const jwt = this.jwtService.sign({ _id: user._id });

    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Success Login',
      token: jwt,
    };
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verify(cookie);
      if (!data) {
        throw new UnauthorizedException({
          message: 'Please login',
        });
      }
      const user = await this.userModel.findOne({ _id: data['_id'] });
      return {
        user,
      };
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Please login',
      });
    }
  }

  async logout(res: Response) {
    res.clearCookie('jwt');

    return {
      message: 'Success logout',
    };
  }
}
