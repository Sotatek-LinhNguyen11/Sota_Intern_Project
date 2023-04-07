import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  // @Post('/signup')
  // async signUpUser(@Body() user: SignUpUserDto) {
  //   // Trong register minh chi yeu cau nhan vao name, age, address, username, password
  //   await this.userService.signUpUser(user);
  // }

  // Sign In trong User chuyen sang Auth Controller
  // @Post('/signin')
  // async signInUser(@Body() user: Partial<UserDto>) {
  //   await this.userService.signInUser(user);
  //   // using authenticaton to check from db
  //   // If ok -> log: 200, success else log : Error
  // }

  @Get('/search/users')
  async getUsersByName(@Param('name') name: string): Promise<UserDto[]> {
    return await this.userService.getUsersByName(name);
  }
  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Request() req: any, @Body() updateData: Partial<UserDto>) {
    await this.userService.updateUser(req.user.id, updateData);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
