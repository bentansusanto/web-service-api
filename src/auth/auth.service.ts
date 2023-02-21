import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

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
    const userId = await this.userModel.create({
      fullName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    const user = await this.userModel.findOne({ _id: userId });

    return user;
  }

  async login(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestException('Invalid Password');
    }
    const jwt = await this.jwtService.signAsync({ _id: user._id });

    return {
      message: 'Success Login',
      token: jwt,
    };
  }
}
