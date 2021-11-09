import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private encodeService: EncoderService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUserDto;
    const hashedPassword = await this.encodeService.encodePassword(password);

    return this.userRepository.createUser(name, email, hashedPassword);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneByEmail(email);
    if (
      user &&
      (await this.encodeService.checkPassword(password, user.password))
    ) {
      const payload: JwtPayload = { id: user.id, email, active: user.active };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your credentials');
  }
}
