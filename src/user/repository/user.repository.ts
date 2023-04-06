import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async registerUser(user: Partial<UserDto>): Promise<UserEntity> {
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

  async getUser(user: Partial<UserDto>): Promise<UserEntity[]> {
    return await this.repository.find({
      where: {
        username: user.username,
        password: user.password,
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
}
