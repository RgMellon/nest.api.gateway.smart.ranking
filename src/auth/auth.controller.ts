import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRegisterDto } from './dtos/auth-register-user.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth-login-user.dto';

type Props = {
  code: string;
  email: string;
};

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() body: AuthRegisterDto): Promise<any> {
    return await this.authService.register(body);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: AuthLoginDto): Promise<any> {
    return await this.authService.login(body);
  }

  @Post('/validate-code')
  async validateCode(@Body() body: Props): Promise<any> {
    const { code, email } = body;
    return await this.authService.validateCode(code, email);
  }
}
