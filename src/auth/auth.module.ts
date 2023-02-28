import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Auth, AuthSchema } from './schema/auth.schema';
import { LocalStrategy } from './local.strategy';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_KEY'),
    signOptions: { expiresIn: '1h' },
  }),
  inject: [ConfigService],
};
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtFactory),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
