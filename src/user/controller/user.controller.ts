import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUpUser(@Body() user: Partial<UserDto>) {
    // Trong register minh chi yeu cau nhan vao name, age, address, username, password
    await this.userService.signUpUser(user);
  }

  @Post('/signin')
  async signInUser(@Body() user: Partial<UserDto>) {
    await this.userService.signInUser(user);
    // using authenticaton to check from db
    // If ok -> log: 200, success else log : Error
  }

  @Get('/users')
  async getUsersByName(@Param('name') name: string): Promise<UserDto[]> {
    return await this.userService.getUsersByName(name);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<UserDto>,
  ) {
    await this.userService.updateUser(id, updateData);
  }
}
