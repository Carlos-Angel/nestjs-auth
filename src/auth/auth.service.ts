import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private encodeService: EncoderService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUserDto;
    const hashedPassword = await this.encodeService.encodePassword(password);

    return this.userRepository.createUser(name, email, hashedPassword);
  }
}
