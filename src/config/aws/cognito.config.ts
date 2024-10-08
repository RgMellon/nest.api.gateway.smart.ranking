import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsCognitoConfig {
  constructor(private configService: ConfigService) {}

  public userPoolId: string = this.configService.get<string>(
    'COGNITO_USER_POOL_ID',
  );
  public clientId: string = this.configService.get<string>('COGNITO_CLIENT_ID');
  public region: string = this.configService.get<string>('AWS_REGION');
  public authority =
    'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_pJh3oTr93';
}
