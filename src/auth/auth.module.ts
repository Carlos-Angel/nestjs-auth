import { JWtStrategy } from '@authModule/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@authModule/auth.controller';
import { AuthService } from '@authModule/services/auth.service';
import { EncoderService } from '@authModule/services/encoder.service';
import { UserRepository } from '@authModule/repositories/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JWtStrategy],
  exports: [JWtStrategy, PassportModule],
})
export class AuthModule {}
