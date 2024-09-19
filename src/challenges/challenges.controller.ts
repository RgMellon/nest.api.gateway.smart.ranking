import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';

import { CreateChallengeDto } from './dtos/criar-desafio.dto';
import { CreateMatchDto } from './dtos/create.match.dto';
import { ChallengeStatus } from './challenge.status.enum';
import { Match } from './interfaces/match.interface';
import { UpdateChallengeDto } from './dtos/update.challenge';
import { ChallengeStatusPipeValidation } from './pipe/challenge.status.validation.pipe';

@Controller('api/v1/challenges')
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);
  private clientChallenge =
    this.clientProxySmartRanking.getClientProxyChallengesInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() body: CreateChallengeDto) {
    this.logger.log('Recebendo chamada para criação de desafio');
    this.clientChallenge.emit('create-challenge', body);
  }

  @Get()
  async getChallenge() {
    return this.clientChallenge.send('get-challenges', { _id: '' });
  }

  @Post('/:challenge/match')
  async syncChallengeWithMatch(
    @Body() challenge: CreateMatchDto,
    @Param('challenge') _id: string,
  ) {
    this.logger.log('Recebendo chamada para sincronizar desafio com partida');

    const challengeResponse = await this.clientChallenge
      .send('get-challenges', { _id })
      .toPromise();

    this.logger.log(`ChallengeResponse ${challengeResponse}`);

    if (!challengeResponse) {
      throw new BadRequestException(`Desafio não cadastrado!`);
    }

    if (challengeResponse.status == ChallengeStatus.COMPLETED) {
      throw new BadRequestException(`Desafio já realizado!`);
    }

    if (challengeResponse.status != ChallengeStatus.ACCEPTED) {
      throw new BadRequestException(
        `Partidas somente podem ser lançadas em desafios aceitos pelos adversários!`,
      );
    }

    if (!challengeResponse.players.includes(challenge.def)) {
      throw new BadRequestException(
        `O jogador vencedor da partida deve fazer parte do desafio!`,
      );
    }

    const match: Match = {};
    match.category = challengeResponse.category;
    match.def = challenge.def;
    match.challenge = _id;
    match.players = challengeResponse.players;
    match.score = challenge.result;

    await this.clientChallenge.emit('create-match', match);
  }

  @Put('/:challenge/accept')
  async acceptChallenge(
    @Param('challenge') _id: string,
    @Body(ChallengeStatusPipeValidation) body: UpdateChallengeDto,
  ) {
    const challenge = await this.clientChallenge
      .send('get-challenges', { _id })
      .toPromise();

    this.logger.debug(`challenge recovered ${JSON.stringify(challenge)}`);

    if (!challenge) {
      throw new BadRequestException(`Desafio não cadastrado!`);
    }

    if (challenge.status != ChallengeStatus.PENDING) {
      throw new BadRequestException(
        'Somente desafios com status PENDENTE podem ser atualizados!',
      );
    }

    this.clientChallenge.emit('accept-challenge', {
      _id,
      challengeStatus: body,
    });
  }
}
