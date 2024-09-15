import { Player } from 'src/players/interfaces/player.interface';

export interface Match {
  category?: string;
  players?: Player[];
  challenge?: string;
  def?: Player;
  score?: Result[];
}

export interface Result {
  set: string;
}
