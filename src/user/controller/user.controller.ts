import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
// console.log(AuthGuard);

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/search/users')
  async getUsersByName(@Param('name') name: string): Promise<UserDto[]> {
    return await this.userService.getUsersByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/user')
  async updateUser(@Request() req: any, @Body() updateData: Partial<UserDto>) {
    await this.userService.updateUser(req.user.id, updateData);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
