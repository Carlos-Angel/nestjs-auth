import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerUserDto: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUserDto;
    const user = this.create({ name, email, password });
    await this.save(user);
  }
}
