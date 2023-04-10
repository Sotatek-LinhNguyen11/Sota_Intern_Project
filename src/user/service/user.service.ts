import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SignUpUserDto } from '../dto/signup.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(page = 1, limit = 10): Promise<UserDto[]> {
    const skip = (page - 1) * limit;
    const usersEntity = await this.userRepository.findAll(limit, skip);
    return this.mapEntitiesToDtos(usersEntity);
  }
  async signUpUser(registerUserDto: SignUpUserDto): Promise<UserEntity> {
    try {
      const user = await this.getUserByUsername(registerUserDto.username);
      if (user) throw new BadRequestException('Username existed!');
      return await this.userRepository.registerUser(registerUserDto);
    } catch (error) {
      throw error;
    }
  }

  mapEntityToDto(user: UserEntity): UserDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...userdto } = user;
    return userdto;
  }

  mapEntitiesToDtos(users: UserEntity[]): UserDto[] {
    return users.map((user) => this.mapEntityToDto(user));
  }

  async getUsersByName(name: string): Promise<UserDto[]> {
    try {
      const listUsers = await this.userRepository.getUsersByName(name);
      return plainToInstance(UserDto, listUsers, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateData: Partial<UserDto>) {
    try {
      const updateUser = await this.userRepository.updateUser(id, updateData);
      console.log('Update successfully!', updateUser);
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(name: string): Promise<UserEntity> {
    try {
      return await this.userRepository.getUserByUsername(name);
    } catch (error) {
      throw error;
    }
  }
}
