import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
