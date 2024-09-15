import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../challenge.status.enum';

export interface Challenge {
  dateTimeChallenge: Date;
  status: ChallengeStatus;
  dateTimeRequest: Date;
  dateTimeAnswer: Date;
  requester: Player;
  category: string;
  match?: string;
  players: Player[];
}
