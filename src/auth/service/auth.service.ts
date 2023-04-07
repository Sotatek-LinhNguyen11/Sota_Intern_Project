import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from 'src/user/dto/signup.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here instead of the user object
    const payload = { id: user.id, ...result };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(signUpUserDto: SignUpUserDto): Promise<any> {
    const saveUser = await this.userService.signUpUser(signUpUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = saveUser;
    // TODO: Generate a JWT and return it here instead of the user object
    const payload = { id: saveUser.id, ...result };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
