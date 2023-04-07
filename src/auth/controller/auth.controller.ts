import {
  Controller,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('register')
  // async register(@Body() createUserDto: UserDto) {
  //   return await this.authService.register(createUserDto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
