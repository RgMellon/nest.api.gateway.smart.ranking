import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Observable } from 'rxjs';

@Controller('api/v1/players')
export class PlayersController {
  private clientAdminBackend: ClientProxy;
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://renan:naner994@18.217.224.224:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

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
