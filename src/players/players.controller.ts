import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() body: CreatePlayerDto) {
    this.playerService.createPlayer(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllPlayers(@Req() request: Request): Promise<any> {
    const { user } = request;
    console.log(user);
    return await this.playerService.getAllPlayers();
  }
}
