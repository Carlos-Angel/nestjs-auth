import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
