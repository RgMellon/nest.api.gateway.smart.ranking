import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dtos/auth-register-user.dto';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthLoginDto } from './dtos/auth-login-user.dto';
import { AwsCognitoConfig } from 'src/config/aws/cognito.config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private readonly awsCognitoConfig: AwsCognitoConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.awsCognitoConfig.userPoolId,
      ClientId: this.awsCognitoConfig.clientId,
    });
  }
  async register(user: AuthRegisterDto) {
    const { email, name, password, phone } = user;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
          new CognitoUserAttribute({ Name: 'name', Value: name }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async login(authLogin: AuthLoginDto) {
    const { email, password } = authLogin;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          resolve(session);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async validateCode(code: string, email: string) {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err); // Erro ao confirmar o código
        } else {
          resolve(result); // Código confirmado com sucesso
        }
      });
    });
  }
}
