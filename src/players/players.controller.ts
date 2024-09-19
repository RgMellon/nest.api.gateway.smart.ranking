import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';

@Controller('api/v1/players')
export class PlayersController {
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDto) {
    this.clientAdminBackend.emit('create-player', body);
  }

  @Get()
  getAllPlayers(): Observable<any> {
    console.log('getAllPlayers');
    return this.clientAdminBackend.send('get-players', {});
  }
}
