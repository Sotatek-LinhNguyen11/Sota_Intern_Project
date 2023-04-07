import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpUserDto } from '../dto/signup.dto';
import { UserDto } from '../dto/user.dto';
import { AuthService } from 'src/auth/service/auth.service';
import { SignIpUserDto } from '../dto/signin_user.dto';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async signUpUser(@Body() user: SignUpUserDto) {
    // Trong register minh chi yeu cau nhan vao name, age, address, username, password
    await this.userService.signUpUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: SignIpUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  // Sign In trong User chuyen sang Auth Controller
  // @Post('/signin')
  // async signInUser(@Body() user: Partial<UserDto>) {
  //   await this.userService.signInUser(user);
  //   // using authenticaton to check from db
  //   // If ok -> log: 200, success else log : Error
  // }

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
