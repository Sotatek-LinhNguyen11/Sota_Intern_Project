import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
// console.log(AuthGuard);

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const users = await this.userService.findAll(page, limit);
    console.log(users);

    return {
      data: users,
      page: Number(page),
      limit: Number(limit),
    };
  }
  @Get('/name/users')
  async getUsersByName(@Param('name') name: string): Promise<UserDto[]> {
    return await this.userService.getUsersByName(name);
  }

  @UseGuards(AuthGuard)
  @Put('/user')
  async updateUser(@Request() req: any, @Body() updateData: Partial<UserDto>) {
    await this.userService.updateUser(req.user.id, updateData);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
