import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateChallengeDto } from './dtos/criar-desafio.dto';
import { CreateMatchDto } from './dtos/create.match.dto';

import { UpdateChallengeDto } from './dtos/update.challenge';
import { ChallengeStatusPipeValidation } from './pipe/challenge.status.validation.pipe';
import { ChallengesService } from './challenges.service';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private challengeService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() body: CreateChallengeDto) {
    this.challengeService.createChallenge(body);
  }

  @Get()
  async getChallenge() {
    return this.challengeService.getChallenge();
  }

  @Post('/:challenge/match')
  async syncChallengeWithMatch(
    @Body() challenge: CreateMatchDto,
    @Param('challenge') _id: string,
  ) {
    await this.challengeService.syncChallengeWithMatch(challenge, _id);
  }

  @Put('/:challenge/accept')
  async acceptChallenge(
    @Param('challenge') _id: string,
    @Body(ChallengeStatusPipeValidation) body: UpdateChallengeDto,
  ) {
    await this.challengeService.acceptChallenge(_id, body);
  }
}
