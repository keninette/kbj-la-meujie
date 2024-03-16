import { Player } from '@/model/session/player.class';
import { Adventure } from '@/model/Adventure.class';
import { v4 } from 'uuid';
import { Seance } from '@/model/session/seance.class';

// todo refactor this into groups
// Groups will have sessions, that will bear progression data
export class Session {
  uuid: string;
  name: string;
  players: Player[];
  adventure: Partial<Adventure>;
  seances: Seance[];

  constructor(adventure: Partial<Adventure>, players: Player[]) {
    this.uuid = v4();
    this.name = '';
    this.players = players;
    this.adventure = adventure;
    this.seances = [];
  }
}
