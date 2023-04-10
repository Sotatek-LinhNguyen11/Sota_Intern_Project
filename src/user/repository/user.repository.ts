import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from '../dto/signup.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(limit: number, skip: number): Promise<UserEntity[]> {
    return await this.repository.find({
      take: limit,
      skip: skip,
    });
  }
  async registerUser(user: SignUpUserDto): Promise<UserEntity> {
    console.log(user);
    const saveUser = await this.repository.create({
      name: user.name,
      age: user.age,
      address: user.address,
      username: user.username,
      password: user.password,
    });
    return await this.repository.save(saveUser);
  }

  async getUser(username: string, password: string): Promise<UserEntity[]> {
    return await this.repository.find({
      where: {
        username: username,
        password: password,
      },
    });
  }

  async getUsersByName(name: string): Promise<UserEntity[]> {
    return await this.repository.find({
      where: {
        name: name,
      },
    });
  }

  async updateUser(
    id: number,
    updateData: Partial<UserDto>,
  ): Promise<UserEntity> {
    const user = await this.repository.findOneById(id);
    Object.assign(user, updateData);
    return await this.repository.save(user);
  }

  async getUserByUsername(name: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        username: name,
      },
    });
  }
}
