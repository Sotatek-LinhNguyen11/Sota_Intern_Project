import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUpUser(registerUserDto: Partial<UserDto>) {
    try {
      const user = await this.userRepository.getUser(registerUserDto);
      if (user == null) {
        const saveUser = await this.userRepository.registerUser(
          registerUserDto,
        );
        console.log('Save successfully!', saveUser);
      } else {
        console.log('User existed in database!');
      }
    } catch (error) {
      throw error;
    }
  }

  async signInUser(signInUserDto: Partial<UserDto>) {
    try {
      const user = await this.userRepository.getUser(signInUserDto);
      if (user != null) {
        console.log('Sign in successfully!', user);
      } else {
        console.log('User account has not registered!');
      }
    } catch (error) {
      throw error;
    }
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
}
