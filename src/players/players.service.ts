import { Injectable } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Injectable()
export class PlayersService {
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  async createPlayer(body: CreatePlayerDto) {
    this.clientAdminBackend.emit('create-player', body);
  }

  async getAllPlayers(): Promise<any> {
    return await this.clientAdminBackend.send('get-players', {}).toPromise();
  }
}
