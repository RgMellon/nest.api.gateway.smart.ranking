import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsMobilePhone('pt-BR')
  phone: string;
}
