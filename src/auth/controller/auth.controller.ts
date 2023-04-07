import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUserDto } from 'src/user/dto/signin_user.dto';
import { SignUpUserDto } from 'src/user/dto/signup.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: SignUpUserDto) {
    return await this.authService.register(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
