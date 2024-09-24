import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDto) {
    this.playerService.createPlayer(body);
  }

  @Get()
  async getAllPlayers(): Promise<any> {
    return await this.playerService.getAllPlayers();
  }
}
