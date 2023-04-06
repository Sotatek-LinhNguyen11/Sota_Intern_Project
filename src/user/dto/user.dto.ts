import {
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value.trim())
  address: string;

  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  age: number;

  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
