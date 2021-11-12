import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';

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
    const activationToken = v4();

    return this.userRepository.createUser(
      name,
      email,
      hashedPassword,
      activationToken,
    );
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

  async activateUser(activateUserDto: ActivateUserDto): Promise<void> {
    const { id, code } = activateUserDto;
    const user: User =
      await this.userRepository.findOneInactiveByIdAndActivationToken(id, code);

    if (!user) {
      throw new UnprocessableEntityException('This action can not be done');
    }

    await this.userRepository.activateUser(user);
  }
}
