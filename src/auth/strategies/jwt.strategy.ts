import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '@authModule/repositories/user.repository';
import { JwtPayload } from '@authModule/interfaces/jwt-payload.interface';
import { User } from '@authModule/entities/user.entity';

@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'super-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    try {
      return this.userRepository.findOneByEmail(email);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
