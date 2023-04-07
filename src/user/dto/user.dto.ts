import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';
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

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value.trim())
  interest: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;
}
