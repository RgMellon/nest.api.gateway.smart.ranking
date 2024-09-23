import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';
import { CreateChallengeDto } from './dtos/criar-desafio.dto';
import { UpdateChallengeDto } from './dtos/update.challenge';
import { ChallengeStatus } from './challenge.status.enum';
import { CreateMatchDto } from './dtos/create.match.dto';
import { Match } from './interfaces/match.interface';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);
  private clientChallenge =
    this.clientProxySmartRanking.getClientProxyChallengesInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  async createChallenge(body: CreateChallengeDto) {
    this.logger.log(
      `Recebendo chamada para criação de desafio ${JSON.stringify(body)}`,
    );
    this.clientChallenge.emit('create-challenge', body);
  }

  async getChallenge() {
    this.logger.log('Recebendo chamada para recuperar todos desafios');
    return this.clientChallenge.send('get-challenges', { _id: '' });
  }

  async acceptChallenge(_id: string, body: UpdateChallengeDto) {
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

  async syncChallengeWithMatch(challenge: CreateMatchDto, _id: string) {
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

    this.clientChallenge.emit('create-match', match);
  }
}
